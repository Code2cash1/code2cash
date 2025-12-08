"use client";

import { useState } from "react";
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { Footer } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, Phone, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function CallbackPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({ name: "", mobile: "" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/callback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: (document.getElementById('name') as HTMLInputElement).value,
                    phone: (document.getElementById('mobile') as HTMLInputElement).value,
                }),
            });

            if (response.ok) {
                setShowSuccess(true);
                // Clear form
                (document.getElementById('name') as HTMLInputElement).value = '';
                (document.getElementById('mobile') as HTMLInputElement).value = '';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
            } else {
                toast.error("Failed to submit request.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error submitting request.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col">
            <Code2CashNavbar />

            <div className="flex-grow pt-24 pb-12 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#31a39c]/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
                    {/* Back Button */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-[#31a39c] transition-colors mb-8 group relative z-[60]"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <div className="mb-10 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#31a39c]/10 border border-[#31a39c]/20 mb-4">
                            <Phone className="w-8 h-8 text-[#31a39c]" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            Request a Callback
                        </h1>
                        <p className="text-white/60 max-w-lg mx-auto">
                            Share your details and our team will get back to you within 24 hours to discuss your project requirements.
                        </p>
                    </div>

                    {/* Success Alert */}
                    {showSuccess && (
                        <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-green-500 font-bold text-lg mb-1">
                                        Request Submitted Successfully!
                                    </h3>
                                    <p className="text-green-400/80 text-sm">
                                        Thank you for your interest! Our team will contact you within 24 hours to discuss your project requirements.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        <Card className="bg-[#0a0a0a] border border-white/10 p-2 md:p-6">
                            <CardContent className="space-y-6 pt-4">
                                {/* Name Field */}
                                <div className="space-y-3">
                                    <Label htmlFor="name" className="text-white font-medium text-sm">
                                        Full Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        required
                                        placeholder="John Doe"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                    />
                                </div>

                                {/* Mobile Number Field */}
                                <div className="space-y-3">
                                    <Label htmlFor="mobile" className="text-white font-medium text-sm">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="mobile"
                                        type="tel"
                                        required
                                        placeholder="+91 98765 43210"
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#31a39c] focus-visible:border-[#31a39c] focus-visible:ring-offset-0 focus-visible:shadow-[0_0_8px_rgba(49,163,156,0.4)] transition-all duration-300"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-between pt-4">
                                    <Link
                                        href="/"
                                        className="text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                                    >
                                        <ArrowLeft size={16} /> Cancel
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
                                        ) : (
                                            "Request Callback"
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info Box */}
                        <div className="mt-8 bg-[#31a39c]/10 rounded-2xl p-6 border border-[#31a39c]/20">
                            <h4 className="text-[#31a39c] font-bold text-lg mb-4">What happens next?</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Our team will review your request within 24 hours
                                </li>
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    We'll call you at your preferred time to discuss your needs
                                </li>
                                <li className="flex gap-3 text-sm text-white/80">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#31a39c] mt-2 shrink-0" />
                                    Get a free consultation and project estimate
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </main>
    );
}
