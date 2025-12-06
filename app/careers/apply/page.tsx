"use client";

import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import InternshipApplicationForm from '@/components/ui/internship-application-form';

export default function ApplyPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col">
            <Code2CashNavbar />
            <div className="flex-grow pt-24 pb-12 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 w-full">
                    <InternshipApplicationForm />
                </div>
            </div>
            <Footer />
        </main>
    );
}
