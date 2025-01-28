// app/api/upload/route.js
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const cloudinaryData = new FormData();
        cloudinaryData.append('file', file);
        cloudinaryData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET);
        cloudinaryData.append('api_key', process.env.CLOUDINARY_API_KEY);
        cloudinaryData.append('timestamp', Math.floor(Date.now() / 1000));

        const stringToSign = `timestamp=${cloudinaryData.get('timestamp')}&upload_preset=${process.env.CLOUDINARY_UPLOAD_PRESET}${process.env.CLOUDINARY_API_SECRET}`;
        const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');
        cloudinaryData.append('signature', signature);

        const cloudinaryResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: cloudinaryData,
            }
        );

        const data = await cloudinaryResponse.json();

        if (!cloudinaryResponse.ok) {
            return NextResponse.json({ error: data.error.message || 'Cloudinary upload failed' }, { status: cloudinaryResponse.status });
        }

        return NextResponse.json({ secure_url: data.secure_url });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
    }
}
