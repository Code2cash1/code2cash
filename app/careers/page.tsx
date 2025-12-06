'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col">
            <Code2CashNavbar />

            <div className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#31a39c]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#31a39c]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 text-center space-y-8 max-w-2xl px-4">
                    <div className="bg-[#31a39c]/10 p-6 rounded-full inline-block mb-4 shadow-[0_0_30px_rgba(49,163,156,0.2)] animate-pulse">
                        <Clock className="w-16 h-16 text-[#31a39c]" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                            Careers
                        </span>
                        <span className="block mt-2 text-[#31a39c]">
                            Awaiting
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mx-auto">
                        We are crafting something extraordinary. Future opportunities to join our visionary team will be announced here soon.
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-[#31a39c] transition-colors duration-300 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
