"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhatIsDeepfake from '@/components/WhatIsDeepfake';
import WhyDangerous from '@/components/WhyDangerous';
import Footer from '@/components/Footer';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="">
        <Hero />
        <About />
        <WhatIsDeepfake />
        <WhyDangerous />
      </main>
      <Footer />
    </div>
  );
}