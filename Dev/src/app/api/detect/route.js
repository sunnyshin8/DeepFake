import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const imageUrl = formData.get('imageUrl');

        var image_url = '';

        if (file) {
            // ensure that the file is an image
            if (!file.type.startsWith('image/')) {
                return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
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
                return NextResponse.json({ error: data.error.message || 'Image upload failed' }, { status: cloudinaryResponse.status });
            }

            image_url = data.secure_url;
        } else if (imageUrl) {
            // ensure that the imageUrl is a valid URL
            try {
                new URL(imageUrl);
            } catch (error) {
                return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
            }

            image_url = imageUrl;
        } else {
            return NextResponse.json({ error: 'No file uploaded or image URL provided' }, { status: 400 });
        }

        const response = await fetch(`${process.env.MODEL_API_URL}/detect-deepfake`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image_url: image_url}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch deepfake detection results');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return NextResponse.json({ error: 'An error occurred while uploading the image' }, { status: 500 });
    }
}