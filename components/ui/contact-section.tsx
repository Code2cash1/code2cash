"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Send, Facebook } from 'lucide-react';

interface ContactSectionProps {
    title?: string;
    mainMessage?: string;
    contactEmail?: string;
    onSubmit?: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
    title = "We can turn your dream project into reality",
    mainMessage = "Let's build something great! ",
    contactEmail = "hello@code2cash.com",
    onSubmit,
}) => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: '',
        projectType: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (type: string, checked: boolean) => {
        setFormData((prev) => {
            const currentTypes = prev.projectType;
            if (checked) {
                return { ...prev, projectType: [...currentTypes, type] };
            } else {
                return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
            }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(formData);
        // console.log("Form submitted:", formData);
    };

    const projectTypeOptions = [
        'Website', 'Mobile App', 'Web App', 'E-Commerce',
        'Brand Identity', '3D & Animation', 'Social Media Marketing',
        'Brand Strategy & Consulting', 'Other'
    ];

    return (
        <section className="relative min-h-screen py-12 md:py-24 w-full overflow-hidden bg-[#030303] flex items-center justify-center">
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#31a39c]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#31a39c]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 w-full max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Left Side: Header Info - Left aligned on desktop, centered on mobile */}
                    <div className="text-center lg:text-left space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                            {title}
                        </h1>
                        <p className="text-lg text-white/60 max-w-lg mx-auto lg:mx-0">
                            Ready to transform your digital vision into reality? We're here to help you every step of the way.
                        </p>
                    </div>

                    {/* Right Side: Form Container */}
                    <div className="w-full bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#31a39c]/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

                        <h2 className="text-2xl font-bold text-white mb-8">
                            {mainMessage}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-white/80 font-medium">Your name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="bg-[#1a1a1a] border border-[#31a39c]/30 text-white placeholder:text-white/30 h-14 px-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#31a39c] focus-visible:shadow-[0_0_20px_rgba(49,163,156,0.6)]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label htmlFor="email" className="text-white/80 font-medium">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="bg-[#1a1a1a] border border-[#31a39c]/30 text-white placeholder:text-white/30 h-14 px-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#31a39c] focus-visible:shadow-[0_0_20px_rgba(49,163,156,0.6)]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="message" className="text-white/80 font-medium">Tell us about your project</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Briefly describe your project idea..."
                                    className="min-h-[160px] bg-[#1a1a1a] border border-[#31a39c]/30 text-white placeholder:text-white/30 resize-none p-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#31a39c] focus-visible:shadow-[0_0_20px_rgba(49,163,156,0.6)]"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-5">
                                <p className="text-sm font-medium text-white/80">I'm interested in...</p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {projectTypeOptions.map((option) => (
                                        <div key={option} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={option.replace(/\s/g, '-').toLowerCase()}
                                                checked={formData.projectType.includes(option)}
                                                onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                                                className="border-[#31a39c]/30 data-[state=checked]:bg-[#31a39c] data-[state=checked]:border-[#31a39c] w-5 h-5 transition-all duration-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-[0_0_15px_rgba(49,163,156,0.6)]"
                                            />
                                            <Label htmlFor={option.replace(/\s/g, '-').toLowerCase()} className="text-sm font-normal text-white/70 cursor-pointer">
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button type="submit" className="w-full bg-[#31a39c] hover:bg-[#2a8a84] text-white font-medium py-6 text-lg shadow-lg shadow-[#31a39c]/20 hover:shadow-[#31a39c]/40 transition-all duration-300 rounded-lg">
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};
