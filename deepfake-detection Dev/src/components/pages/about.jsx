'use client';

export default function About() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8">About Us</h2>

        <div className="text-xl mb-6 text-gray-400">
          <h3 className="text-3xl font-semibold text-white">Welcome to ShaniAegis</h3>
          <p>
            Welcome to ShaniAegis, where innovation meets security. Our mission is to redefine biometric authentication by introducing cutting-edge solutions that prioritize accuracy, privacy, and resilience.
          </p>
        </div>

        <div className="text-xl mb-6 text-gray-400">
          <h3 className="text-3xl font-semibold text-white">Who We Are</h3>
          <p>
            We, the students of VIT Bhopal, are proud to present ShaniAegis, a project aimed at building next-generation authentication systems that address the growing challenges of digital security. Our team of enthusiastic learners and innovators is dedicated to crafting solutions that safeguard users against spoofing attacks, synthetic identity manipulation, and other modern threats.
          </p>
        </div>

        <div className="text-xl mb-6 text-gray-400">
          <h3 className="text-3xl font-semibold text-white">What We Do</h3>
          <p>
            We have developed a revolutionary Hybrid Authentication System that combines two powerful biometric modalities—Gait Dynamics and Deepfake Detection. By leveraging the unique characteristics of an individual’s gait and advanced techniques to detect synthetic media, our system ensures unparalleled accuracy and security.
          </p>
          <ul className="list-disc ml-8 mt-4 text-gray-300">
            <li><strong>Gait Recognition:</strong> Utilizing motion sensors to analyze walking patterns and generate a robust biometric identity.</li>
            <li><strong>Deepfake Detection:</strong> Safeguarding against synthetic identity manipulation by identifying subtle anomalies in biometric media.</li>
            <li><strong>Privacy-First Design:</strong> Processing sensitive biometric data locally or securely anonymized to ensure compliance with privacy regulations such as GDPR.</li>
          </ul>
        </div>

        <div className="text-xl text-gray-400">
          <h3 className="text-3xl font-semibold text-white">Meet the Team</h3>
          <p className="mb-6">Know who we are. Behind this innovation is a group of passionate and dedicated students working together to create something meaningful. Here’s a glimpse of our team:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="font-semibold text-lg text-white">Hemal Shingloo</h4>
              <p className="text-gray-400">Branch: Computer Science & Engineering</p>
              <p className="text-gray-400">Specialization: Cybersecurity and AI Enthusiast</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg text-white">Aditya Bhaumik</h4>
              <p className="text-gray-400">Branch: Computer Science & Engineering</p>
              <p className="text-gray-400">Specialization: Data Analytics and Machine Learning</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg text-white">Vedang Maheshwari</h4>
              <p className="text-gray-400">Branch: Computer Science & Engineering</p>
              <p className="text-gray-400">Specialization: Software Development and System Design</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg text-white">Akshyansu Pritam</h4>
              <p className="text-gray-400">Branch: Computer Science & Engineering</p>
              <p className="text-gray-400">Specialization: User Experience and Interface Design</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
