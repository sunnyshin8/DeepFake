'use client';

import { GraduationCap, Users, Shield, Brain } from 'lucide-react';

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            About ShaniAegis
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-8" />
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto mb-16 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
          <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Welcome to ShaniAegis
          </h3>
          <p className="text-lg text-blue-100">
            Welcome to ShaniAegis, where innovation meets security. Our mission is to redefine biometric authentication by introducing cutting-edge solutions that prioritize accuracy, privacy, and resilience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 text-cyan-400 mr-3" />
              <h3 className="text-2xl font-bold text-blue-200">Who We Are</h3>
            </div>
            <p className="text-blue-100">
              We, the students of VIT Bhopal, are proud to present ShaniAegis, a project aimed at building next-generation authentication systems that address the growing challenges of digital security.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-cyan-400 mr-3" />
              <h3 className="text-2xl font-bold text-blue-200">What We Do</h3>
            </div>
            <p className="text-blue-100">
              We have developed a revolutionary Hybrid Authentication System that combines Gait Dynamics and Deepfake Detection, ensuring unparalleled security in biometric authentication.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20 mb-16">
          <div className="flex items-center mb-6">
            <Brain className="w-8 h-8 text-cyan-400 mr-3" />
            <h3 className="text-2xl font-bold text-blue-200">Our Technology</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-900/30 rounded-xl">
              <h4 className="text-xl font-semibold text-cyan-300 mb-3">Gait Recognition</h4>
              <p className="text-blue-100">Utilizing motion sensors to analyze walking patterns and generate a robust biometric identity.</p>
            </div>
            <div className="p-6 bg-blue-900/30 rounded-xl">
              <h4 className="text-xl font-semibold text-cyan-300 mb-3">Deepfake Detection</h4>
              <p className="text-blue-100">Safeguarding against synthetic identity manipulation by identifying subtle anomalies in biometric media.</p>
            </div>
            <div className="p-6 bg-blue-900/30 rounded-xl">
              <h4 className="text-xl font-semibold text-cyan-300 mb-3">Privacy-First Design</h4>
              <p className="text-blue-100">Processing sensitive biometric data locally with GDPR-compliant security measures.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-8 h-8 text-cyan-400 mr-3" />
            <h3 className="text-3xl font-bold text-blue-200">Meet the Team</h3>
          </div>
          <p className="text-blue-100 mb-12 max-w-2xl mx-auto">
            Behind this innovation is a group of passionate and dedicated students working together to create something meaningful.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Hemal Shingloo",
              "Aditya Bhaumik",
              "Vedang Maheshwari",
              "Akshyansu Pritam"
            ].map((name) => (
              <div key={name} className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20">
                <h4 className="text-xl font-semibold text-cyan-300 mb-2">{name}</h4>
                <p className="text-blue-200">Computer Science & Engineering</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}