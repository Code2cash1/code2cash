'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, CheckCircle2, XCircle, Shield, Download, Share2, Calendar, User, Building2, FileCheck, Sparkles, Trophy, ArrowLeft } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { motion } from 'framer-motion';

export default function VerifyCertificatePage() {
    const [certificateId, setCertificateId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationResult, setVerificationResult] = useState<'valid' | 'invalid' | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock verification
        const isValid = certificateId.length > 5;
        setVerificationResult(isValid ? 'valid' : 'invalid');
        setIsVerifying(false);
    };

    const handleDownload = () => {
        alert('Your certificate will be downloaded shortly!');
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Verification link copied to clipboard!');
    };

    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 w-full h-full">
                <SparklesCore
                    id="certificateSparkles"
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={50}
                    className="w-full h-full"
                    particleColor="#31a39c"
                    speed={0.3}
                />
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(49,163,156,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(49,163,156,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Gradient Orbs */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-[#31a39c]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#31a39c]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="relative z-10">
                <Code2CashNavbar />

                <div className="flex-grow flex flex-col items-center justify-center p-4 pt-32 md:pt-40 pb-20 min-h-screen">
                    <div className="w-full max-w-5xl">
                        {/* Back to Careers Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/careers"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#31a39c]/50 rounded-xl text-white/80 hover:text-white transition-all duration-300 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-semibold">Back to Careers</span>
                            </Link>
                        </motion.div>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16 space-y-6"
                        >
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70">
                                        Certificate
                                    </span>
                                    <br />
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#31a39c] via-[#2dd4bf] to-[#31a39c] animate-gradient">
                                        Verification
                                    </span>
                                </h1>
                                <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                    Instantly verify the authenticity of Code2Cash certificates. Our secure verification system ensures complete transparency and trust.
                                </p>
                            </div>
                        </motion.div>

                        {/* Main Card with shadcn */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative group"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#31a39c]/20 via-[#31a39c]/30 to-[#31a39c]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-75" />

                            <Card className="relative border-white/20 bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-2xl shadow-2xl">
                                <CardHeader className="space-y-3">
                                    <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <FileCheck className="w-6 h-6 text-[#31a39c]" />
                                        </div>
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                                            Verify Certificate
                                        </span>
                                    </CardTitle>
                                    <CardDescription className="text-white/60 text-base">
                                        Enter your certificate ID to verify its authenticity and view complete details
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-8">
                                    <form onSubmit={handleVerify} className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="relative group/input">
                                                <input
                                                    type="text"
                                                    id="certificateId"
                                                    value={certificateId}
                                                    onChange={(e) => setCertificateId(e.target.value)}
                                                    placeholder="C2C-2024-XXXXX"
                                                    className="w-full px-6 py-5 bg-white/5 border-2 border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#31a39c] focus:ring-4 focus:ring-[#31a39c]/20 transition-all text-lg font-mono tracking-wider group-hover/input:border-white/30 group-hover/input:bg-white/10"
                                                    required
                                                />
                                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40 group-hover/input:text-[#31a39c] transition-colors" />
                                            </div>
                                            <p className="text-white/50 text-sm flex items-center gap-2">
                                                <Sparkles className="w-4 h-4" />
                                                Enter the unique certificate ID found on your certificate document
                                            </p>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isVerifying || !certificateId}
                                            className="w-full py-5 px-8 bg-gradient-to-r from-[#31a39c] via-[#2dd4bf] to-[#31a39c] bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-bold rounded-2xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-[#31a39c]/40 hover:scale-[1.02] active:scale-[0.98] text-lg relative overflow-hidden group/btn"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {isVerifying ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Verifying Certificate...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Shield className="w-5 h-5" />
                                                        Verify Certificate
                                                    </>
                                                )}
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                                        </button>
                                    </form>

                                    {/* Verification Result */}
                                    {verificationResult && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ duration: 0.5, type: "spring" }}
                                            className="mt-10"
                                        >
                                            {verificationResult === 'valid' ? (
                                                <div className="space-y-6">
                                                    {/* Success Header */}
                                                    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 rounded-2xl">
                                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                                                            <CheckCircle2 className="w-9 h-9 text-green-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-2xl text-green-400 mb-1">Certificate Verified Successfully!</h3>
                                                            <p className="text-white/80">This certificate is authentic and issued by Code2Cash</p>
                                                        </div>
                                                    </div>

                                                    {/* Approval Badges */}
                                                    <div className="flex items-center justify-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.6, delay: 0.2 }}
                                                            className="relative group/badge"
                                                        >
                                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-2 shadow-xl border-4 border-[#31a39c]/30 group-hover/badge:border-[#31a39c]/60 transition-all group-hover/badge:scale-110">
                                                                <Image
                                                                    src="/code2cash-badge.png"
                                                                    alt="Code2Cash Approved"
                                                                    width={96}
                                                                    height={96}
                                                                    className="w-full h-full object-contain rounded-full"
                                                                />
                                                            </div>
                                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#31a39c] text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                                                                Approved
                                                            </div>
                                                        </motion.div>

                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ duration: 0.6, delay: 0.4 }}
                                                            className="relative group/badge"
                                                        >
                                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white p-2 shadow-xl border-4 border-[#31a39c]/30 group-hover/badge:border-[#31a39c]/60 transition-all group-hover/badge:scale-110">
                                                                <Image
                                                                    src="/msme-badge.png"
                                                                    alt="MSME Registered"
                                                                    width={96}
                                                                    height={96}
                                                                    className="w-full h-full object-contain rounded-full"
                                                                />
                                                            </div>
                                                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#31a39c] text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                                                                Registered
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    {/* Certificate Details */}
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group/card">
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                                                    <User className="w-6 h-6 text-[#31a39c]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-white/50 text-sm mb-1">Recipient Name</p>
                                                                    <p className="text-white font-semibold text-lg">Rahul Kumar Sharma</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group/card">
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                                                    <Trophy className="w-6 h-6 text-[#31a39c]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-white/50 text-sm mb-1">Program Completed</p>
                                                                    <p className="text-white font-semibold text-lg">Full Stack Web Development</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group/card">
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                                                    <Calendar className="w-6 h-6 text-[#31a39c]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-white/50 text-sm mb-1">Issue Date</p>
                                                                    <p className="text-white font-semibold text-lg">December 15, 2024</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group/card">
                                                            <div className="flex items-start gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center group-hover/card:scale-110 transition-transform">
                                                                    <Building2 className="w-6 h-6 text-[#31a39c]" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-white/50 text-sm mb-1">Issued By</p>
                                                                    <p className="text-white font-semibold text-lg">Code2Cash Pvt. Ltd.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Additional Info */}
                                                    <div className="p-6 bg-gradient-to-br from-[#31a39c]/10 to-transparent rounded-2xl border border-[#31a39c]/20">
                                                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                            <Shield className="w-5 h-5 text-[#31a39c]" />
                                                            Verification Details
                                                        </h4>
                                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="text-white/50">Certificate ID:</span>
                                                                <span className="text-white font-mono ml-2">{certificateId}</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-white/50">Verification Status:</span>
                                                                <span className="text-green-400 font-semibold ml-2">✓ Verified</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-white/50">Security Level:</span>
                                                                <span className="text-white ml-2">Secure & Verified</span>
                                                            </div>
                                                            <div>
                                                                <span className="text-white/50">Verified On:</span>
                                                                <span className="text-white ml-2">{new Date().toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex flex-col sm:flex-row gap-4">
                                                        <button
                                                            onClick={handleDownload}
                                                            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-[#31a39c] hover:bg-[#2a8a84] text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#31a39c]/30 hover:scale-105 active:scale-95"
                                                        >
                                                            <Download className="w-5 h-5" />
                                                            Download Certificate
                                                        </button>
                                                        <button
                                                            onClick={handleShare}
                                                            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
                                                        >
                                                            <Share2 className="w-5 h-5" />
                                                            Share Verification
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/30 rounded-2xl">
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">
                                                            <XCircle className="w-9 h-9 text-red-400" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-2xl text-red-400 mb-2">Certificate Not Found</h3>
                                                            <p className="text-white/80 mb-4">
                                                                We couldn&apos;t find a certificate matching this ID in our database. This could mean:
                                                            </p>
                                                            <ul className="space-y-2 text-white/70 text-sm">
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-red-400 mt-1">•</span>
                                                                    <span>The certificate ID was entered incorrectly</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-red-400 mt-1">•</span>
                                                                    <span>The certificate has not been issued yet</span>
                                                                </li>
                                                                <li className="flex items-start gap-2">
                                                                    <span className="text-red-400 mt-1">•</span>
                                                                    <span>The certificate may have been revoked</span>
                                                                </li>
                                                            </ul>
                                                            <p className="text-white/60 text-sm mt-4">
                                                                Please verify the ID and try again, or contact our support team at{' '}
                                                                <a href="mailto:certificates@code2cash.com" className="text-[#31a39c] hover:underline">
                                                                    certificates@code2cash.com
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Info Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="grid md:grid-cols-3 gap-6 mt-12"
                        >
                            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <Shield className="w-10 h-10 text-[#31a39c] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-white mb-2">Secure & Verified</h3>
                                <p className="text-white/60 text-sm">All certificates are securely stored and verified for maximum authenticity</p>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <Sparkles className="w-10 h-10 text-[#31a39c] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-white mb-2">Instant Verification</h3>
                                <p className="text-white/60 text-sm">Verify certificates in seconds with our advanced verification system</p>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                                <FileCheck className="w-10 h-10 text-[#31a39c] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="font-semibold text-white mb-2">MSME Registered</h3>
                                <p className="text-white/60 text-sm">Code2Cash is officially registered with MSME, Government of India</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <Footer />
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </main>
    );
}
