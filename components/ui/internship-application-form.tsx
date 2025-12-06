"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const programs = [
    "Frontend Development Internship",
    "Backend Engineering Internship",
    "Full Stack Web Development Internship",
    "HTML & CSS Mastery Internship",
    "Python & Automation Internship"
];

export default function InternshipApplicationForm() {
    const searchParams = useSearchParams();
    // Get pre-selected program if available, but for now we just default to empty or generic
    // If we had IDs mapped to names we could pre-select. 

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        alert("Application submitted successfully! (This is a demo)");
    };

    return (
        <div className="flex items-center justify-center px-4 py-8 w-full max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-10 text-center space-y-4">
                    <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Apply for Internship
                    </h3>
                    <p className="text-white/60 max-w-lg mx-auto">
                        Fill out the form below to start your journey with Code2Cash. We're excited to learn more about you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Main Form Fields */}
                    <div className="lg:col-span-8">
                        <Card className="bg-[#0a0a0a] border border-white/10 p-2 md:p-6">
                            <CardContent className="space-y-8 pt-4">

                                {/* Name & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Label htmlFor="fullName" className="text-white font-medium text-sm">Full Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="fullName"
                                            required
                                            placeholder="John Doe"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label htmlFor="email" className="text-white font-medium text-sm">Email Address <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Phone & Program */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Label htmlFor="phone" className="text-white font-medium text-sm">Phone Number <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            placeholder="+91 98765 43210"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label htmlFor="program" className="text-white font-medium text-sm">Applying For <span className="text-red-500">*</span></Label>
                                        <Select required>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white focus:outline-none focus:ring-1 focus:ring-[#31a39c] focus:border-[#31a39c] focus:ring-offset-0 focus:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300">
                                                <SelectValue placeholder="Select a program" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                                                {programs.map(p => (
                                                    <SelectItem key={p} value={p} className="focus:bg-[#31a39c]/20 focus:text-[#31a39c]">{p}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <Separator className="bg-white/10 my-4" />

                                {/* College Details Header */}
                                <h4 className="text-lg font-semibold text-white/80">Educational Details</h4>

                                {/* College Name */}
                                <div className="space-y-4">
                                    <Label htmlFor="college" className="text-white font-medium text-sm">College / University Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="college"
                                        required
                                        placeholder="xyz Institute of Technology"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                    />
                                </div>

                                {/* Roll No, Branch, Course */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <Label htmlFor="rollno" className="text-white font-medium text-sm">Roll Number</Label>
                                        <Input
                                            id="rollno"
                                            placeholder="CS-21-001"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label htmlFor="branch" className="text-white font-medium text-sm">Branch <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="branch"
                                            required
                                            placeholder="Computer Science"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label htmlFor="course" className="text-white font-medium text-sm">Course <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="course"
                                            required
                                            placeholder="B.Tech / BCA"
                                            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                        />
                                    </div>
                                </div>

                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-between mt-8">
                            <Link href="/careers" className="text-white/50 hover:text-white flex items-center gap-2 transition-colors">
                                <ArrowLeft size={16} /> Back to Careers
                            </Link>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#31a39c] hover:bg-[#288a84] text-white font-bold py-6 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(49,163,156,0.3)] transition-all hover:scale-105"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                    </>
                                ) : "Submit Application"}
                            </Button>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#31a39c]/10 rounded-2xl p-6 border border-[#31a39c]/20">
                            <h4 className="text-[#31a39c] font-bold text-lg mb-4">Why Code2Cash?</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Industry-ready curriculum designed by experts.
                                </li>
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Hands-on experience with real-world projects.
                                </li>
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Placement assistance and career guidance.
                                </li>
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Certificate of completion and Letter of Recommendation.
                                </li>
                            </ul>
                        </div>


                    </div>

                </div>
            </form>
        </div>
    );
}
