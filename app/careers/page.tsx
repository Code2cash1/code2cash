'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import GalleryHoverCarousel from '@/components/ui/gallery-hover-carousel';
import InternshipPerks from '@/components/ui/internship-perks';
import JobOpenings from '@/components/ui/job-openings';

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col">
            <Code2CashNavbar />

            <div className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 w-full">
                    {/* Header */}


                    {/* Internship Carousel */}
                    <GalleryHoverCarousel />

                    {/* Perks Section */}
                    <InternshipPerks />

                    {/* Job Openings Section */}
                    <JobOpenings />


                </div>
            </div>

            <Footer />
        </main>
    );
}
