import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-20 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
            <div className="mx-auto px-4">
                <h2 className="text-4xl font-extrabold mb-8 text-center text-glow">About Our DeepFake Detection</h2>
                <div className="flex flex-col md:flex-row items-center justify-center md:gap-8">
                    <div className="mb-8 md:mb-0">
                        <Image 
                            src="/images/robot.svg" 
                            alt="Robot Head" 
                            width={400} 
                            height={400} 
                            className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" 
                        />
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-lg mb-4 text-gray-300">Our cutting-edge AI technology analyzes images to detect signs of manipulation and deepfake creation. We use advanced algorithms to scrutinize pixel patterns, inconsistencies, and other telltale signs of artificial generation.</p>
                        <p className="text-lg text-gray-300">With our tool, you can quickly determine whether an image is authentic or a sophisticated deepfake, helping you stay informed and protected in the digital age.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
