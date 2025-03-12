from typing import Union, Dict, Optional
from uuid import uuid4
from pydantic import BaseModel, HttpUrl
from fastapi import FastAPI, BackgroundTasks, HTTPException, status
from model import predict_deepfake

app = FastAPI()

# In-memory storage for job status (in production, use a proper database)
jobs_store = {}
job_queue = []

class ImageDetectionRequest(BaseModel):
    image_url: HttpUrl
    callback_url: Optional[HttpUrl] = None
    priority: Optional[bool] = False

class JobResponse(BaseModel):
    job_id: str
    status: str
    queue_position: Optional[int] = None

def process_detection_job(job_id: str, image_url: str, callback_url: Optional[str] = None):
    """
    Background task to process the deepfake detection job
    In a real implementation, this would call your actual detection model
    """
    # Update status to processing
    jobs_store[job_id]["status"] = "processing"
    jobs_store[job_id]["queue_position"] = None
    
    # Remove from queue
    if job_id in job_queue:
        job_queue.remove(job_id)

    result = predict_deepfake(image_url)
    
    # Update status to completed
    jobs_store[job_id]["status"] = "completed"
    jobs_store[job_id]["result"] = result
    
    # If callback URL provided, send the result
    if callback_url:
        # TODO: Implement callback functionality
        pass

@app.post("/detect-deepfake", response_model=JobResponse)
async def detect_deepfake(
    request: ImageDetectionRequest,
    background_tasks: BackgroundTasks
):
    # Generate unique job ID
    job_id = str(uuid4())
    
    # Store job details
    jobs_store[job_id] = {
        "status": "queued",
        "image_url": str(request.image_url),
        "callback_url": str(request.callback_url) if request.callback_url else None,
        "result": None
    }
    
    
    if request.priority:
        job_queue.insert(0, job_id)  
    else:
        job_queue.append(job_id)  
    
    # Update queue positions for all jobs
    for i, queued_job_id in enumerate(job_queue):
        if jobs_store[queued_job_id]["status"] == "queued":
            jobs_store[queued_job_id]["queue_position"] = i + 1
    
    # Start processing if it's the first job or priority is set
    if len(job_queue) == 1 or request.priority:
        background_tasks.add_task(
            process_detection_job,
            job_id=job_id,
            image_url=str(request.image_url),
            callback_url=str(request.callback_url) if request.callback_url else None
        )
    
    # Return job ID and current status
    return JobResponse(
        job_id=job_id,
        status=jobs_store[job_id]["status"],
        queue_position=jobs_store[job_id].get("queue_position")
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
    
    return job_info