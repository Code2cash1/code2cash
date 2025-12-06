"use client";

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';
import { Briefcase, Code, PenTool, Users, ArrowRight, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

// Job Data
const jobs = [
    {
        id: 1,
        title: "Senior React Developer",
        department: "Engineering",
        location: "Remote / Hybrid",
        type: "Full-time",
        salary: "$90k - $140k",
        description: "We are looking for an experienced React Developer to lead our frontend initiatives.",
        tags: ["React", "TypeScript", "Next.js"],
        icon: Code,
        color: "blue" as const
    },
    {
        id: 2,
        title: "MERN Stack Developer",
        department: "Engineering",
        location: "On-site",
        type: "Full-time",
        salary: "$80k - $120k",
        description: "Build robust full-stack applications using MongoDB, Express, React, and Node.js.",
        tags: ["MongoDB", "Express", "Node.js"],
        icon: Code,
        color: "green" as const
    },
    {
        id: 3,
        title: "Frontend Engineer",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        salary: "$70k - $100k",
        description: "Create pixel-perfect, responsive user interfaces. Passion for UI/UX is a must.",
        tags: ["Vue.js", "Tailwind", "Animation"],
        icon: Code,
        color: "purple" as const
    },
    {
        id: 4,
        title: "Social Media Manager",
        department: "Marketing",
        location: "Remote",
        type: "Part-time",
        salary: "$40k - $60k",
        description: "Manage our social presence and create engaging content for the developer community.",
        tags: ["Social Media", "Content", "Strategy"],
        icon: Users,
        color: "red" as const
    },
    {
        id: 5,
        title: "HR Manager",
        department: "HR",
        location: "Hybrid",
        type: "Full-time",
        salary: "$65k - $85k",
        description: "Oversee recruitment, employee relations, and company culture initiatives.",
        tags: ["Recruitment", "Culture", "Management"],
        icon: Briefcase,
        color: "orange" as const
    },
    {
        id: 6,
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Contract",
        salary: "$50/hr",
        description: "Design intuitive and beautiful user experiences for web and mobile applications.",
        tags: ["Figma", "Prototyping", "User Research"],
        icon: PenTool,
        color: "purple" as const
    }
];

const categories = ["All", "Engineering", "Marketing", "HR", "Design"];

export default function JobOpenings() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredJobs = activeCategory === "All"
        ? jobs
        : jobs.filter(job => job.department === activeCategory);

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
                <div className="flex flex-wrapjustify-center gap-3 mb-12 overflow-x-auto pb-4 hide-scrollbar justify-center">
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
                    {filteredJobs.map((job) => (
                        <GlowCard
                            key={job.id}
                            glowColor={job.color}
                            customSize={true}
                            className="w-full min-h-[400px] flex flex-col group items-start text-left"
                        >
                            <div className="relative z-10 w-full h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 text-${job.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                        <job.icon size={24} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/5 text-white/50">
                                        {job.department}
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
                                        <Briefcase size={14} />
                                        {job.type}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock size={14} />
                                        {job.salary}
                                    </div>
                                </div>

                                <p className="text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
                                    {job.description}
                                </p>

                                <div className="mt-auto pt-6 border-t border-white/10 w-full">
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {job.tags.map((tag, idx) => (
                                            <span key={idx} className="text-xs px-2 py-1 rounded bg-[#31a39c]/10 text-[#31a39c] border border-[#31a39c]/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Button
                                        className="w-full bg-white text-black hover:bg-[#31a39c] hover:text-white transition-colors duration-300 rounded-lg group/btn"
                                    >
                                        Apply Now
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
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
