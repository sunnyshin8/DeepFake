import Image from 'next/image';

export default function WhatIsDeepfake() {
  return (
    <section id="what-is-deepfake" className="bg-gradient-to-r from-gray-800 via-gray-900 to-black py-20 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center text-primary">What is a DeepFake?</h2>
        <div className="flex flex-col md:flex-row-reverse items-center justify-center">
          <div className="mb-8 md:mb-0">
            <Image src="/images/face.svg" alt="Example of a deepfake" width={400} height={400} className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-4 text-gray-300">A deepfake is a type of artificial intelligence-based human image synthesis technique. It is used to combine and superimpose existing images and videos onto source images or videos using a machine learning technique called a "generative adversarial network" (GAN).</p>
            <p className="text-lg text-gray-300">Deepfakes can create convincing but entirely fictional photos, videos, and audio recordings, making it increasingly difficult to distinguish between real and manipulated media.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
