import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('imageUrl');

    try {
        const response = await fetch(`https://api.sightengine.com/1.0/check.json?url=${encodeURIComponent(imageUrl)}&models=deepfake&api_user=${process.env.SIGHTENGINE_USER}&api_secret=${process.env.SIGHTENGINE_SECRET}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch deepfake detection results');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in GET request:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}