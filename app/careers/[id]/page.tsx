"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Calendar, Users } from 'lucide-react';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import { Button } from '@/components/ui/button';
import { FeatureAccordion, FeatureItem } from '@/components/ui/accordion-feature-section';

// Dummy data for different programs
const programsData: Record<string, {
    title: string;
    description: string;
    duration: string;
    type: string;
    features: FeatureItem[];
}> = {
    "item-1": { // Frontend
        title: "Frontend Development Internship",
        description: "Master the art of building beautiful, responsive, and interactive user interfaces using modern web technologies.",
        duration: "3 Months",
        type: "Remote / Hybrid",
        features: [
            {
                id: 1,
                title: "React & Next.js Fundamentals",
                image: "/images/programs/frontend.png",
                description: "Deep dive into component-based architecture, state management, and server-side rendering with Next.js 14.",
            },
            {
                id: 2,
                title: "Modern Styling with Tailwind CSS",
                image: "/images/programs/htmlcss.png",
                description: "Learn to build rapid, responsive designs using utility-first CSS framework Tailwind, including animations and dark mode.",
            },
            {
                id: 3,
                title: "Real-world Project Implementation",
                image: "/images/programs/frontend.png",
                description: "Work on live industry projects like dashboard, e-commerce platforms, and landing pages to build your portfolio.",
            }
        ]
    },
    "item-2": { // Backend
        title: "Backend Engineering Internship",
        description: "Build robust, scalable and secure server-side applications and APIs.",
        duration: "3 Months",
        type: "Remote",
        features: [
            {
                id: 1,
                title: "API Development with Node.js",
                image: "/images/programs/backend.png",
                description: "Learn to create RESTful and GraphQL APIs using Node.js, Express, and modern backend practices.",
            },
            {
                id: 2,
                title: "Database Management",
                image: "/images/programs/backend.png",
                description: "Master MongoDB and SQL databases, including schema design, indexing, and aggregation pipelines.",
            },
            {
                id: 3,
                title: "Microservices Architecture",
                image: "/images/programs/backend.png",
                description: "Understand the principles of microservices, dockerization, and deploying scalable applications.",
            }
        ]
    },
    "item-3": { // Full Stack
        title: "Full Stack Web Development Internship",
        description: "Become a versatile developer capable of handling both frontend and backend challenges.",
        duration: "6 Months",
        type: "Hybrid",
        features: [
            {
                id: 1,
                title: "Complete MERN Stack",
                image: "/images/programs/fullstack.png",
                description: "Integrated learning of MongoDB, Express, React, and Node.js to build full-fledged web applications.",
            },
            {
                id: 2,
                title: "Authentication & Security",
                image: "/images/programs/fullstack.png",
                description: "Implement JWT, OAuth, and secure coding practices to protect user data and application integrity.",
            },
            {
                id: 3,
                title: "Deployment & DevOps",
                image: "/images/programs/fullstack.png",
                description: "Deploy your applications to valid cloud platforms (AWS/Vercel) and set up CI/CD pipelines.",
            }
        ]
    },
    "item-4": { // HTML CSS
        title: "HTML & CSS Mastery Internship",
        description: "Craft pixel-perfect, responsive websites and animations from scratch.",
        duration: "2 Months",
        type: "Remote",
        features: [
            {
                id: 1,
                title: "Semantic HTML5",
                image: "/images/programs/htmlcss.png",
                description: "Master document structure, accessibility standards, and SEO-friendly markup practices.",
            },
            {
                id: 2,
                title: "Advanced CSS3 & Animations",
                image: "/images/programs/htmlcss.png",
                description: "Create stunning layouts with Flexbox/Grid and meaningful micro-interactions using Keyframes.",
            },
            {
                id: 3,
                title: "Responsive Web Design",
                image: "/images/programs/htmlcss.png",
                description: "Build websites that look flawless on any device, from mobile phones to 4k monitors.",
            }
        ]
    },
    "item-5": { // Python
        title: "Python & Automation Internship",
        description: "Unlock the power of Python for scripting, automation, and backend development.",
        duration: "3 Months",
        type: "Remote",
        features: [
            {
                id: 1,
                title: "Python Core Concepts",
                image: "/images/programs/python.png",
                description: "Master data structures, algorithms, and object-oriented programming in Python.",
            },
            {
                id: 2,
                title: "Backend Development",
                image: "/images/programs/python.png",
                description: "Build robust web services using frameworks like Django or FastAPI.",
            },
            {
                id: 3,
                title: "Automation Scripting",
                image: "/images/programs/python.png",
                description: "Automate boring tasks, scrape web data, and streamline workflows with powerful scripts.",
            }
        ]
    },
    // Default fallback
    "default": {
        title: "Code2Cash Internship Program",
        description: "Join our comprehensive internship program designed to kickstart your tech career.",
        duration: "Variable",
        type: "Remote / Hybrid",
        features: [
            {
                id: 1,
                title: "Expert Mentorship",
                image: "/images/programs/fullstack.png",
                description: "Get guided by industry veterans who will review your code and help you navigate complex challenges.",
            },
            {
                id: 2,
                title: "Career Guidance",
                image: "/images/programs/frontend.png",
                description: "Resume building, mock interviews, and career path planning to ensure you land your dream job.",
            }
        ]
    }
};

import { useParams } from 'next/navigation';

export default function ProgramDetailsPage() {
    const params = useParams();
    const programId = params?.id as string;

    // Simple lookup, fallback to default if not found or typical ID match
    const program = (programId && programsData[programId]) ||
        (programId && programsData[Object.keys(programsData).find(k => programId.includes(k)) || "default"]) ||
        programsData["default"];

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
                            Internship Program
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {program.title}
                        </h1>
                        <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-8">
                            {program.description}
                        </p>

                        <div className="flex flex-wrap gap-6 text-sm text-white/80 font-medium bg-white/5 inline-flex p-4 rounded-2xl border border-white/10">
                            <div className="flex items-center gap-2">
                                <Clock className="text-[#31a39c] w-5 h-5" />
                                {program.duration}
                            </div>
                            <div className="w-px h-5 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Users className="text-[#31a39c] w-5 h-5" />
                                {program.type}
                            </div>
                            <div className="w-px h-5 bg-white/10" />
                            <div className="flex items-center gap-2">
                                <Calendar className="text-[#31a39c] w-5 h-5" />
                                Open Batches
                            </div>
                        </div>
                    </div>

                    {/* What We Provide (Accordion) */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-8">What You'll Learn & Build</h2>
                        <FeatureAccordion features={program.features} />
                    </div>

                    {/* Call to Action */}
                    <div className="bg-[#31a39c]/10 border border-[#31a39c]/20 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Ready to kickstart your career?</h2>
                        <p className="text-white/70 mb-8 max-w-xl mx-auto">
                            Join thousands of students who have transformed their careers with Code2Cash.
                        </p>
                        <Link href="/careers/apply">
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
