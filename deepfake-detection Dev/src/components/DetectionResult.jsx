// components/DetectionResult.js

import Link from "next/link";

export default function DetectionResult({ result }) {
    if (!result) return null;

    const { request, type, media } = result;

    return (
        <div className="bg-secondary/10 p-6 rounded-lg shadow-lg w-full max-w-xl mt-8 text-left">
            <h2 className="text-2xl font-bold mb-4">Detection Result</h2>
            <div className="space-y-2">
                <p><strong>Timestamp:</strong> {new Date(request.timestamp * 1000).toLocaleString()}</p>
                <p><strong>Deepfake Confidence:</strong> {type.deepfake * 100}%</p>
                {media && (
                    <div className="mt-4">
                        <Link href={media.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            View Uploaded Image
                        </Link>
                        <img
                            src={media.uri}
                            alt="Uploaded Image"
                            className="mt-2 w-full h-auto rounded-lg shadow"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
