// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';

// export default function Hero() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleFileChange = (e) => {
//     if (imageUrl) {
//       alert('Please clear the URL input first');
//       e.target.value = '';
//       return;
//     }
//     setFile(e.target.files[0]);
//   };

//   const handleUrlChange = (e) => {
//     if (file) {
//       alert('Please clear the file input first');
//       e.target.value = '';
//       return;
//     }
//     setImageUrl(e.target.value);
//   };

//   const clearFile = () => {
//     setFile(null);
//     const fileInput = document.getElementById('file-upload');
//     if (fileInput) fileInput.value = '';
//   };

//   const clearUrl = () => {
//     setImageUrl('');
//   };

//   const handleFileUpload = async (file) => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.error || 'Failed to upload image');
//       }

//       return { success: true, imageUrl: data.imageUrl };
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message || 'Failed to upload image',
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       let imageUrlToCheck = imageUrl;

//       if (file) {
//         const uploadData = await handleFileUpload(file);
//         console.log(uploadData);
//         if (!uploadData.success) {
//           throw new Error(uploadData.error);
//         }
//         imageUrlToCheck = uploadData.imageUrl;
//       }

//       const response = await fetch(`/api/detect?imageUrl=${encodeURIComponent(imageUrlToCheck)}`, {
//         method: 'GET',
//       });

//       const data = await response.json();
//       toast.success("Deepfake detected successfully");
//       setResult(data);
//     } catch (error) {
//       console.error('Error detecting deepfake:', error);
//       toast.error("Failed to detect deepfake: " + error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative w-full h-screen">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         className="absolute inset-0 w-full h-full object-cover z-0"
//       >
//         <source src="/bgvideo.mp4" type="video/mp4" />
//       </video>

//       {/* Hero Content */}
//       <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
//         <div className="max-w-3xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-glow">DeepFake Detection Tool</h1>
//           <p className="text-xl mb-8 text-gray-400">Upload an image or provide a link to identify potential deepfakes.</p>

//           <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
//             <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4 justify-center items-center">
//               <div className="flex items-center space-x-2">
//                 <Button
//                   type="button"
//                   asChild
//                   className="w-48 bg-gray-800 hover:bg-gray-700"
//                   disabled={!!imageUrl}
//                 >
//                   <label htmlFor="file-upload" className="cursor-pointer flex items-center">
//                     <span className="mr-2">Upload Image</span>
//                     <input
//                       id="file-upload"
//                       name="file"
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                     />
//                   </label>
//                 </Button>
//                 {file && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={clearFile}
//                     className="flex-shrink-0"
//                   >
//                     <span className="text-red-500">X</span>
//                   </Button>
//                 )}
//               </div>

//               <div className="flex items-center space-x-2 w-full md:w-96">
//                 <Input
//                   type="text"
//                   name="imageUrl"
//                   placeholder="Or paste image URL"
//                   value={imageUrl}
//                   onChange={handleUrlChange}
//                   disabled={!!file}
//                   className="w-full bg-gray-800 text-gray-300 placeholder-gray-500 border-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                 />
//                 {imageUrl && (
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="icon"
//                     onClick={clearUrl}
//                     className="flex-shrink-0"
//                   >
//                     <span className="text-red-500">X</span>
//                   </Button>
//                 )}
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-48 bg-primary hover:bg-primary-dark text-black"
//               disabled={loading || (!file && !imageUrl)}
//             >
//               {loading ? 'Processing...' : 'Detect DeepFake'}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Progress } from '@/components/pages/Progress';

export default function Hero() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [queueStatus, setQueueStatus] = useState(null);

  // Poll for job status when we have a jobId but no result yet
  useEffect(() => {
    if (!jobId || result) return;
    
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`/api/job-status?jobId=${jobId}`);

        if (response.status === 404) {
          clearInterval(intervalId);
          toast.error("An error occurred while checking job status. Please stay on the page and wait for the result.");
          setLoading(false);
          setJobId(null);
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch deepfake job status');
        }

        const data = await response.json();
        
        setQueueStatus(data);
        
        if (data.status === 'completed') {
          clearInterval(intervalId);
          setResult(data.result);
          toast.success("Deepfake detection completed");
          setLoading(false);
          setJobId(null);
        } else if (data.status === 'failed') {
          clearInterval(intervalId);
          toast.error("Detection failed: " + (data.error || "Unknown error"));
          setLoading(false);
          setJobId(null);
        }
      } catch (error) {
        console.error('Error checking job status:', error);
      }
    }, 2000); // Poll every 2 seconds
    
    return () => clearInterval(intervalId);
  }, [jobId, result]);

  const handleFileChange = (e) => {
    if (imageUrl) {
      alert('Please clear the URL input first');
      e.target.value = '';
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleUrlChange = (e) => {
    if (file) {
      alert('Please clear the file input first');
      e.target.value = '';
      return;
    }
    setImageUrl(e.target.value);
  };

  const clearFile = () => {
    setFile(null);
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  const clearUrl = () => {
    setImageUrl('');
  };

  const resetDetection = () => {
    setResult(null);
    setJobId(null);
    setQueueStatus(null);
  };

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      return { success: true, imageUrl: data.imageUrl };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to upload image',
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setJobId(null);
    setQueueStatus(null);

    try {
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
      } else {
        throw new Error('No file uploaded or image URL provided');
      }

      const response = await fetch(`/api/detect`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch deepfake detection results');
      }

      const data = await response.json();
      
      if (data.job_id) {
        setJobId(data.job_id);
        toast.success("Image submitted for detection");
        setQueueStatus({
          status: data.status,
          queue_position: data.queue_position,
          queue_count: data.queue_count
        });
      } else {
        throw new Error(data.error || 'Failed to submit image for detection');
      }
    } catch (error) {
      console.error('Error detecting deepfake:', error);
      toast.error("Failed to detect deepfake: " + error);
      setLoading(false);
    }
  };

  // Queue Status Component
  const QueueStatusComponent = () => {
    if (!queueStatus) return null;
    
    if (queueStatus.status === 'processing') {
      return (
        <div className="mt-8 p-4 bg-gray-800 bg-opacity-70 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Processing Your Image</h3>
          <p className="mb-4">Your image is currently being analyzed by our AI model.</p>
          <Progress value={50} className="w-full h-2 bg-gray-600" indicatorClassName="bg-blue-500" />
        </div>
      );
    }
    
    if (queueStatus.status === 'queued' && queueStatus.queue_position) {
      const queueProgress = 100 - ((queueStatus.queue_position / queueStatus.queue_count) * 100);
      
      return (
        <div className="mt-8 p-4 bg-gray-800 bg-opacity-70 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">In Queue</h3>
          <p className="mb-2">Your position: <span className="font-bold text-primary">{queueStatus.queue_position}</span> of {queueStatus.queue_count}</p>
          <p className="mb-4 text-sm text-gray-400">Please wait while we process the images ahead of you</p>
          <Progress value={queueProgress} className="w-full h-2 bg-gray-600" indicatorClassName="bg-amber-500" />
        </div>
      );
    }
    
    return null;
  };
  
  // Results Component
  const ResultsComponent = () => {
    if (!result) return null;
    
    const confidence = result.confidence * 100;
    const isDeepfake = result.is_deepfake;
    
    return (
      <div className="mt-8 p-6 bg-gray-800 bg-opacity-70 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Detection Results</h3>
        
        <div className="mb-6">
          <p className="text-xl mb-2">
            Verdict: {isDeepfake ? (
              <span className="text-red-500 font-bold">Deepfake Detected</span>
            ) : (
              <span className="text-green-500 font-bold">Authentic Image</span>
            )}
          </p>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Confidence Level: {confidence.toFixed(1)}%</span>
            </div>
            <Progress 
              value={confidence} 
              className="w-full h-3 bg-gray-600" 
              indicatorClassName={isDeepfake ? "bg-red-500" : "bg-green-500"}
            />
          </div>
          
          <p className="text-sm text-gray-400 mt-4">
            {isDeepfake 
              ? "Our AI model has determined this image is likely a deepfake." 
              : "Our AI model has determined this image is likely authentic."}
          </p>
        </div>
        
        <Button
          onClick={resetDetection}
          className="mt-4 bg-gray-600 hover:bg-gray-500"
        >
          Check Another Image
        </Button>
      </div>
    );
  };

  return (
    <section className="relative w-full h-screen">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-glow">DeepFake Detection Tool</h1>
          <p className="text-xl mb-8 text-gray-400">Upload an image or provide a link to identify potential deepfakes.</p>

          {/* Show form only if no result is displayed */}
          {!result && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
              <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 md:space-x-4 justify-center items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    asChild
                    className="w-48 bg-gray-800 hover:bg-gray-700"
                    disabled={!!imageUrl || loading}
                  >
                    <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                      <span className="mr-2">Upload Image</span>
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </Button>
                  {file && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={clearFile}
                      className="flex-shrink-0"
                      disabled={loading}
                    >
                      <span className="text-red-500">X</span>
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2 w-full md:w-96">
                  <Input
                    type="text"
                    name="imageUrl"
                    placeholder="Or paste image URL"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    disabled={!!file || loading}
                    className="w-full bg-gray-800 text-gray-300 placeholder-gray-500 border-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  />
                  {imageUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={clearUrl}
                      className="flex-shrink-0"
                      disabled={loading}
                    >
                      <span className="text-red-500">X</span>
                    </Button>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-48 bg-primary hover:bg-primary-dark text-black"
                disabled={loading || (!file && !imageUrl)}
              >
                {loading ? 'Processing...' : 'Detect DeepFake'}
              </Button>
            </form>
          )}
          
          {/* Show queue status while processing */}
          <QueueStatusComponent />
          
          {/* Show results if available */}
          <ResultsComponent />
        </div>
      </div>
    </section>
  );
}