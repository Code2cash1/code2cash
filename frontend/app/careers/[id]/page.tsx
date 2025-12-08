"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Calendar, Users, Loader2 } from 'lucide-react';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import { Button } from '@/components/ui/button';
import { FeatureAccordion, FeatureItem } from '@/components/ui/accordion-feature-section';
import { useParams } from 'next/navigation';

interface Program {
    _id: string;
    title: string;
    department: string;
    duration: string;
    price: string;
    description: string;
    highlights: string[];
    projects: string[];
    imageUrl: string;
    createdAt?: string;
}

export default function ProgramDetailsPage() {
    const params = useParams();
    const programId = params?.id as string;
    const [program, setProgram] = useState<Program | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            if (!programId) return;
            try {
                // Try fetching by ID first
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs/${programId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProgram(data);
                } else {
                    // Fallback: If passed title slug or failed by ID, try finding in all (simplified)
                    const allRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs`);
                    const allData = await allRes.json();
                    // Basic fuzzy match attempt if needed, but primarily relying on ID now
                    const found = allData.find((p: Program) => p._id === programId || p.title.toLowerCase().replace(/\s+/g, '-') === programId);
                    if (found) setProgram(found);
                }
            } catch (error) {
                console.error("Failed to fetch program details", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgram();
    }, [programId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin text-[#31a39c]" />
            </div>
        );
    }

    if (!program) {
        return (
            <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center text-white space-y-4">
                <h1 className="text-2xl font-bold">Program Not Found</h1>
                <Link href="/careers">
                    <Button variant="outline">Back to Careers</Button>
                </Link>
            </div>
        );
    }

    // Adapt Backend Data for Accordion
    const features: FeatureItem[] = [
        ...program.highlights.map((h, i) => ({
            id: i + 1,
            title: `Key Concept ${i + 1}`,
            image: program.imageUrl || "/images/programs/frontend.png",
            description: h
        })),
        ...program.projects.map((p, i) => ({
            id: program.highlights.length + i + 1,
            title: `Project: ${p.split(':')[0] || 'Real-World App'}`, // Attempt to extract title if colon used
            image: program.imageUrl || "/images/programs/fullstack.png",
            description: p
        }))
    ];

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col">
            <Code2CashNavbar />

            <div className="flex-grow pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <Link
                        href="/careers"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-[#31a39c] transition-colors mb-8 group relative z-[60]"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </Link>

                    {/* Program Header */}
                    <div className="max-w-4xl mb-16">
                        <span className="text-[#31a39c] font-medium tracking-wider text-sm uppercase mb-4 block">
                            {program.department} Internship
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {program.title}
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-8">
                            {program.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm text-white/80 font-medium bg-white/5 inline-flex p-4 rounded-2xl border border-white/10 items-center">
                            <div className="flex items-center gap-2">
                                <Clock className="text-[#31a39c] w-5 h-5" />
                                {program.duration}
                            </div>
                            <div className="w-px h-5 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Users className="text-[#31a39c] w-5 h-5" />
                                {program.price}
                            </div>
                            <div className="w-px h-5 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Calendar className="text-[#31a39c] w-5 h-5" />
                                Posted: {new Date(program.createdAt || Date.now()).toLocaleDateString()}
                            </div>
                            <div className="w-px h-5 bg-white/10" />
                            <div className="flex items-center gap-2 text-white/50">
                                <span className="uppercase text-[10px] tracking-widest">ID:</span>
                                <span className="font-mono">{program._id.slice(-6).toUpperCase()}</span>
                            </div>
                        </div>
                    </div>

                    {/* What We Provide (Accordion) */}
                    {features.length > 0 && (
                        <div className="mb-20">
                            <h2 className="text-3xl font-bold mb-8">What You'll Learn & Build</h2>
                            <FeatureAccordion features={features} />
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="bg-[#31a39c]/10 border border-[#31a39c]/20 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Ready to kickstart your career?</h2>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto">
                            Join thousands of students who have transformed their careers with Code2Cash.
                        </p>
                        <Link href={`/careers/apply?program=${encodeURIComponent(program.title)}`}>
                            <Button
                                className="bg-[#31a39c] text-white hover:bg-[#288a84] px-8 py-6 text-lg rounded-full font-bold shadow-lg shadow-[#31a39c]/20 hover:shadow-[#31a39c]/40 transition-all transform hover:-translate-y-1"
                            >
                                Apply for this Position
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
