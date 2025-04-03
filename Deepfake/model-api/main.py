import os
import httpx
import asyncio
from datetime import datetime
from typing import Union, Dict, Optional
from uuid import uuid4
from pydantic import BaseModel, HttpUrl
from fastapi import FastAPI, BackgroundTasks, HTTPException, Request, status
from fastapi.concurrency import run_in_threadpool
import threading
from model import predict_deepfake

app = FastAPI()

# allowed origins for CORS from environment variable
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "")

# add cors middleware to only allow requests from the nextjs backend
@app.middleware("http")
async def add_cors_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = ALLOWED_ORIGINS
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "*"

    return response

jobs_store = {}
job_queue = []
queue_lock = threading.Lock()

cleanup_jobs = []

@app.on_event("startup")
async def startup_event():
    # Cleanup completed jobs every 5 minutes
    async def cleanup():
        while True:
            await asyncio.sleep(300)
            with queue_lock:
                # Remove old completed jobs
                for job_id, timestamp in list(cleanup_jobs):
                    if (datetime.now() - datetime.fromisoformat(timestamp)).total_seconds() > 300:
                        if job_id in jobs_store:
                            del jobs_store[job_id]
                        cleanup_jobs.remove((job_id, timestamp))
                
                # Check for stalled jobs (processing for too long)
                for job_id in list(job_queue):
                    if job_id in jobs_store and jobs_store[job_id]["status"] == JobStatus.PROCESSING:
                        if "processing_started" in jobs_store[job_id]:
                            started = datetime.fromisoformat(jobs_store[job_id]["processing_started"])
                            if (datetime.now() - started).total_seconds() > 600:  # 10 minutes timeout
                                jobs_store[job_id]["status"] = JobStatus.FAILED
                                jobs_store[job_id]["error"] = "Job processing timed out"
                                job_queue.remove(job_id)

    asyncio.create_task(cleanup())

class ImageDetectionRequest(BaseModel):
    image_url: HttpUrl
    callback_url: Optional[HttpUrl] = None
    priority: Optional[bool] = False

class JobResponse(BaseModel):
    job_id: str
    status: str
    queue_position: Optional[int] = None
    queue_count: Optional[int] = None

class JobStatus:
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

async def send_callback(job_id: str):
    """Send results to callback URL"""
    job = jobs_store[job_id]
    if not job.get("callback_url"):
        return
        
    async with httpx.AsyncClient() as client:
        await client.post(
            job["callback_url"],
            json={
                "job_id": job_id,
                "status": job["status"],
                "result": job["result"],
                "completed_at": job.get("completed_at")
            }
        )

async def process_detection_job(job_id: str):
    """
    Background task to process the deepfake detection job
    In a real implementation, this would call your actual detection model
    """
    with queue_lock:
        if job_id not in job_queue or job_id not in jobs_store:
            return
        
        # Update status to processing
        jobs_store[job_id]["status"] = JobStatus.PROCESSING
        jobs_store[job_id]["queue_position"] = None
        jobs_store[job_id]["processing_started"] = datetime.now().isoformat()
    
    
    try:
        # Process outside the lock
        result = await run_in_threadpool(predict_deepfake, jobs_store[job_id]["image_url"])
        
        with queue_lock:
            # Update status to completed
            jobs_store[job_id]["status"] = JobStatus.COMPLETED
            # change confidence from floar64 to float
            jobs_store[job_id]["result"] = {"is_deepfake": result["is_deepfake"], "confidence": float(result["confidence"])}
            jobs_store[job_id]["completed_at"] = datetime.now().isoformat()
            
            # Remove from queue
            if job_id in job_queue:
                job_queue.remove(job_id)
            
            timestamp = datetime.now().isoformat()
            cleanup_jobs.append((job_id, timestamp))
            
            # Process next job if queue not empty
            if len(job_queue) > 0:
                next_job_id = job_queue[0]
                # Launch next job without waiting
                asyncio.create_task(process_detection_job(next_job_id))
    except Exception as e:
        with queue_lock:
            jobs_store[job_id]["status"] = JobStatus.FAILED
            jobs_store[job_id]["error"] = str(e)
            
            # Remove from queue
            if job_id in job_queue:
                job_queue.remove(job_id)
            
            # Process next job if queue not empty
            if len(job_queue) > 0:
                next_job_id = job_queue[0]
                asyncio.create_task(process_detection_job(next_job_id))
                
    # If callback URL provided, send the result
    if jobs_store[job_id].get("callback_url"):
        try:
            # Implement callback functionality
            await send_callback(job_id)
        except Exception:
            # Log but don't fail the job if callback fails
            pass

@app.post("/detect-deepfake", response_model=JobResponse)
async def detect_deepfake(
    request: ImageDetectionRequest
):
    # Generate unique job ID
    job_id = str(uuid4())
    
    # Store job details
    jobs_store[job_id] = {
        "status": JobStatus.QUEUED,
        "image_url": str(request.image_url),
        "callback_url": str(request.callback_url) if request.callback_url else None,
        "priority": request.priority if request.priority else False,
        "created_at": datetime.now().isoformat(),
        "result": None
    }

    with queue_lock:
        if request.priority:
            insert_position = 0
            for i, _job_id in enumerate(job_queue):
                if jobs_store[job_id]["status"] == JobStatus.PROCESSING:
                    insert_position = i + 1
                elif jobs_store[job_id].get("priority"):
                    insert_position = i + 1
                else:
                    break
            job_queue.insert(insert_position, job_id)
        else:
            job_queue.append(job_id)

        if len(job_queue) == 1:
            asyncio.create_task(process_detection_job(job_id))

    # Return job ID and current status
    return JobResponse(
        job_id=job_id,
        status=jobs_store[job_id]["status"],
        queue_position=job_queue.index(job_id) + 1 if job_id in job_queue else None,
        queue_count=len(job_queue)
    )

@app.get("/job-status/{job_id}", response_model=Dict)
async def check_job_status(job_id: str):
    if job_id not in jobs_store:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Job with ID {job_id} not found"
        )
    
    job_info = jobs_store[job_id]
    
    # If job is queued, update queue position
    if job_info["status"] == "queued" and job_id in job_queue:
        job_info["queue_position"] = job_queue.index(job_id) + 1

    job_info['queue_count'] = len(job_queue)

    response_job_info = {
        "job_id": job_id,
        "status": job_info["status"],
        "queue_position": job_info["queue_position"],
        "queue_count": job_info["queue_count"]
    }

    if job_info["status"] == "completed":
        response_job_info["result"] = job_info["result"]
        response_job_info["completed_at"] = job_info["completed_at"]

    return response_job_info

@app.delete("/cancel-job/{job_id}")
async def cancel_job(job_id: str):
    """Cancel a queued job"""
    with queue_lock:
        if job_id not in jobs_store:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Job with ID {job_id} not found"
            )
        
        job_info = jobs_store[job_id]
        if job_info["status"] == "completed" or job_info["status"] == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Cannot cancel job with status {job_info['status']}"
            )
        
        # If job is processing, just mark as cancelled but don't interrupt
        # If job is queued, remove from queue
        if job_info["status"] == "queued" and job_id in job_queue:
            job_queue.remove(job_id)
        
        job_info["status"] = "cancelled"
        job_info["cancelled_at"] = datetime.now().isoformat()
        
        return {"status": "cancelled", "job_id": job_id}