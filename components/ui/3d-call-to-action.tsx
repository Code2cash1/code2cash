"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { PhoneCall } from 'lucide-react';
import { Button } from "@/components/ui/neon-button";

function HeroSplineBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '600px',
            pointerEvents: 'auto',
            overflow: 'hidden',
        }}>
            {isMobile ? (
                // Lightweight gradient fallback for mobile
                <div style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '600px',
                    background: 'radial-gradient(circle at 50% 50%, rgba(49, 163, 156, 0.15) 0%, transparent 70%)',
                }} />
            ) : (
                // Full 3D scene for desktop
                <Spline
                    style={{
                        width: '100%',
                        height: '100%',
                        minHeight: '600px',
                        pointerEvents: 'auto',
                    }}
                    scene="https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"
                />
            )}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
            linear-gradient(to right, rgba(3, 3, 3, 0.95), transparent 40%, transparent 60%, rgba(3, 3, 3, 0.95)),
            linear-gradient(to bottom, transparent 50%, rgba(3, 3, 3, 1))
          `,
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}

function HeroContent() {
    return (
        <div className="text-white px-4 max-w-4xl mx-auto w-full flex flex-col items-center text-center py-16 relative z-20">

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-wide">
                Ready to <span className="text-[#31a39c]">Transform</span><br />
                Your Business?
            </h2>

            <div className="flex justify-center gap-3 mb-8">
                <span className="bg-[#31a39c]/10 px-4 py-1.5 rounded-full border border-[#31a39c]/20 text-[#31a39c] text-sm font-medium">WEB3</span>
                <span className="bg-[#31a39c]/10 px-4 py-1.5 rounded-full border border-[#31a39c]/20 text-[#31a39c] text-sm font-medium">AI</span>
                <span className="bg-[#31a39c]/10 px-4 py-1.5 rounded-full border border-[#31a39c]/20 text-[#31a39c] text-sm font-medium">UI/UX</span>
            </div>

            <p className="text-base sm:text-xl opacity-80 mb-10 max-w-2xl text-gray-300">
                Let's build something extraordinary together. Our team of experts is ready to bring your vision to life with cutting-edge technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
                <Link
                    href="/callback"
                    className="inline-flex items-center justify-center gap-2 text-lg bg-[#31a39c]/10 hover:bg-[#31a39c]/20 border border-[#31a39c]/50 text-[#31a39c] min-w-[200px] px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 relative z-50 pointer-events-auto cursor-pointer"
                >
                    <PhoneCall className="w-5 h-5" />
                    <span>Request Call Back</span>
                </Link>
            </div>

        </div>
    );
}

export function SplineCallToAction() {
    return (
        <div className="relative w-full overflow-hidden bg-[#030303] border-t border-white/10">

            <div className="relative min-h-[600px] flex flex-col justify-center items-center">
                <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
                    <HeroSplineBackground />
                </div>

                <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
                    <HeroContent />
                </div>
            </div>
        </div>
    );
}
