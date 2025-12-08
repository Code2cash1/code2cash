"use client";

import React, { useState, useEffect } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, PenTool, Users, ArrowRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

interface Job {
    _id: string;
    title: string;
    domain: string;
    type: string;
    salary: string;
    description: string;
    skills: string[];
    experience: string;
    location: string;
}

export default function JobOpenings() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [programs, setPrograms] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/jobs`);
                const data = await res.json();
                setPrograms(data.jobs);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const categories = ["All", ...Array.from(new Set(programs.map(p => p.domain)))];

    const filteredJobs = activeCategory === "All"
        ? programs
        : programs.filter(job => job.domain === activeCategory);

    const getIcon = (domain: string) => {
        if (domain.toLowerCase().includes('design')) return PenTool;
        if (domain.toLowerCase().includes('marketing')) return Users;
        return Code;
    };

    const getColor = (domain: string) => {
        if (domain.toLowerCase().includes('design')) return "purple";
        if (domain.toLowerCase().includes('marketing')) return "red";
        return "blue";
    };

    if (isLoading) {
        return <div className="py-24 text-center text-white/50">Loading Opportunities...</div>;
    }

    return (
        <section className="py-24 relative px-4" id="openings">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Current <span className="text-[#31a39c]">Openings</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Join our visionary team. We are always looking for talented individuals to help us build the future.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-4 hide-scrollbar">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === category
                                ? "bg-[#31a39c] text-white border-[#31a39c] shadow-[0_0_20px_rgba(49,163,156,0.3)]"
                                : "bg-white/5 text-white/60 border-white/10 hover:border-[#31a39c]/50 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Jobs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredJobs.map((job) => {
                        const Icon = getIcon(job.domain);
                        const color = getColor(job.domain) as "blue" | "purple" | "red" | "green" | "orange";

                        return (
                            <GlowCard
                                key={job._id}
                                glowColor={color}
                                customSize={true}
                                className="w-full min-h-[400px] flex flex-col group items-start text-left"
                            >
                                <div className="relative z-10 w-full h-full flex flex-col">
                                    <Link href={`/jobs/${job._id}`} className="block flex-1">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-${color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                                <Icon size={24} />
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/50">
                                                {job.domain}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#31a39c] transition-colors">
                                            {job.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-6">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={14} />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={14} />
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[#31a39c]">
                                                <Briefcase size={14} />
                                                {job.salary}
                                            </div>
                                        </div>

                                        <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
                                            {job.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {job.skills.slice(0, 3).map((skill, idx) => (
                                                <span key={idx} className="text-xs px-2 py-1 rounded bg-[#31a39c]/10 text-[#31a39c] border border-[#31a39c]/20">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>

                                    <div className="mt-auto pt-6 border-t border-white/10 w-full">
                                        <Link href={`/jobs/${job._id}`}>
                                            <Button
                                                className="w-full bg-white text-black hover:bg-[#31a39c] hover:text-white transition-colors duration-300 rounded-lg group/btn"
                                            >
                                                Apply Now
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </GlowCard>
                        );
                    })}
                </div>

                {filteredJobs.length === 0 && (
                    <div className="text-center py-20 text-white/40">
                        <p>No openings found for this category at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
