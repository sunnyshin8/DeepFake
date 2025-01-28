'use client';

import Link from 'next/link';
import { Eye, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white shadow-lg">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    {/* Use the correct path for the image */}
                    <img src="/logo.png" alt="ShaniAegis Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold text-white">ShaniAegis</span>
                </Link>
                <div className="hidden md:flex space-x-8">
                    <Link href="#about" className="text-gray-300 hover:text-primary">About</Link>
                    <Link href="#what-is-deepfake" className="text-gray-300 hover:text-primary">What is Deepfake</Link>
                    <Link href="#why-dangerous" className="text-gray-300 hover:text-primary">Why it's Dangerous</Link>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden bg-gray-800 hover:bg-gray-700">
                            <Menu className="h-6 w-6 text-gray-300" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="bg-gray-900 text-gray-300">
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link href="#about" className="hover:text-primary">About</Link>
                            <Link href="#what-is-deepfake" className="hover:text-primary">What is Deepfake</Link>
                            <Link href="#why-dangerous" className="hover:text-primary">Why it's Dangerous</Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
}
