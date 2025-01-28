'use client';

import { useState } from 'react';
import { Send, MessageCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Have questions about our deepfake detection technology? Want to learn more about our innovative solutions? We're here to help!
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Features */}
            {[
              {
                icon: <MessageCircle className="w-6 h-6 text-cyan-400" />,
                title: "24/7 Support",
                description: "Our team is always ready to assist you with any questions or concerns."
              },
              {
                icon: <Clock className="w-6 h-6 text-cyan-400" />,
                title: "Quick Response",
                description: "We aim to respond to all inquiries within 24 hours or less."
              },
              {
                icon: <Shield className="w-6 h-6 text-cyan-400" />,
                title: "Secure Communication",
                description: "Your messages are protected with end-to-end encryption."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-6 rounded-xl backdrop-blur-sm border border-blue-500/20">
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold ml-3 text-blue-200">{feature.title}</h3>
                </div>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-2xl backdrop-blur-sm border border-blue-500/20">
            <h2 className="text-3xl font-bold text-center text-blue-200 mb-8">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              <div>
                <label className="block text-blue-200 mb-2 font-medium">Your Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-blue-900/30 border-blue-500/20 text-blue-100 placeholder:text-blue-400/50 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-blue-200 mb-2 font-medium">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-blue-900/30 border-blue-500/20 text-blue-100 placeholder:text-blue-400/50 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-blue-200 mb-2 font-medium">Your Message</label>
                <Textarea
                  name="message"
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-blue-900/30 border-blue-500/20 text-blue-100 placeholder:text-blue-400/50 focus:ring-cyan-400 focus:border-cyan-400 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold py-6 flex items-center justify-center transition-all duration-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}