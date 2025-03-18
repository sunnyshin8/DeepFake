import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    try {
        const response = await fetch(`${process.env.MODEL_API_URL}/job-status/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 404) {
            return NextResponse.json({ message: 'Job not found' }, { status: 404 });
        }

        if (!response.ok) {
            throw new Error('Failed to fetch deepfake job status');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}