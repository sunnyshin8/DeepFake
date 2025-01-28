'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) {
      toast.error('Please fill in all fields');
      return;
    }

    // Handle form submission logic here (e.g., send email, etc.)
    toast.success('Message sent successfully!');
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
          <div className="flex flex-col space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-gray-300 placeholder-gray-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-gray-800 text-gray-300 placeholder-gray-500 p-4 h-40"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-black">
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
