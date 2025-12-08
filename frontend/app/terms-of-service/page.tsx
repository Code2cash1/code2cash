'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code2CashNavbar } from '@/components/ui/code2cash-navbar';
import { Footer } from '@/components/ui/footer-section';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle, FileText, Building2, Award, Users, ArrowLeft } from 'lucide-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-[#31a39c] selection:text-white flex flex-col relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 w-full h-full">
                <SparklesCore
                    id="termsSparkles"
                    background="transparent"
                    minSize={0.3}
                    maxSize={0.8}
                    particleDensity={30}
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

                <div className="flex-grow pt-24 pb-12 px-4 md:px-6">
                    <div className="max-w-5xl mx-auto">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#31a39c]/50 rounded-xl text-white/80 hover:text-white transition-all duration-300 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-semibold">Back to Home</span>
                            </Link>
                        </motion.div>

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12 space-y-6"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/70">
                                    Terms of
                                </span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#31a39c] via-[#2dd4bf] to-[#31a39c] animate-gradient">
                                    Service
                                </span>
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                                Last Updated: December 8, 2024
                            </p>
                        </motion.div>

                        {/* Government Verification Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-12"
                        >
                            <Card className="bg-gradient-to-br from-[#31a39c]/20 to-[#31a39c]/10 border-2 border-[#31a39c]/30 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-16 h-16 rounded-2xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <Shield className="w-8 h-8 text-[#31a39c]" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Government of India Verified</h2>
                                            <p className="text-white/80">Officially Registered & Authenticated</p>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#31a39c] flex-shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">MSME Registered</h3>
                                                    <p className="text-white/70 text-sm">Officially registered with the Ministry of Micro, Small and Medium Enterprises, Government of India</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#31a39c] flex-shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">UDYAM Registration</h3>
                                                    <p className="text-white/70 text-sm font-mono">UDYAM-BR-26-0203793</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CheckCircle className="w-6 h-6 text-[#31a39c] flex-shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="font-semibold text-white mb-1">100% Authentic</h3>
                                                    <p className="text-white/70 text-sm">All our certificates and services are verified and legitimate</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Badges */}
                                        <div className="flex flex-col items-center justify-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                                            <h3 className="text-lg font-semibold text-white">Official Verification Badges</h3>
                                            <div className="flex items-center justify-center gap-8">
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.4 }}
                                                    className="relative group/badge"
                                                >
                                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 shadow-xl border-4 border-[#31a39c]/30 group-hover/badge:border-[#31a39c]/60 transition-all group-hover/badge:scale-110">
                                                        <Image
                                                            src="/code2cash-badge.png"
                                                            alt="Code2Cash Approved"
                                                            width={112}
                                                            height={112}
                                                            className="w-full h-full object-contain rounded-full"
                                                        />
                                                    </div>
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#31a39c] text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                                                        Code2Cash
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.6 }}
                                                    className="relative group/badge"
                                                >
                                                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 shadow-xl border-4 border-[#31a39c]/30 group-hover/badge:border-[#31a39c]/60 transition-all group-hover/badge:scale-110">
                                                        <Image
                                                            src="/msme-badge.png"
                                                            alt="MSME Registered"
                                                            width={112}
                                                            height={112}
                                                            className="w-full h-full object-contain rounded-full"
                                                        />
                                                    </div>
                                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#31a39c] text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                                                        MSME Registered
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <p className="text-white/60 text-sm text-center">These badges verify our authenticity and government registration</p>
                                        </div>
                                    </div>

                                    {/* QR Code for Verification */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.8 }}
                                        className="flex justify-center"
                                    >
                                        <div className="p-8 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center gap-4 max-w-sm">
                                            <h3 className="text-white font-semibold text-xl">MSME Registration QR Code</h3>
                                            <div className="w-56 h-56 bg-white p-4 rounded-xl shadow-2xl">
                                                <Image
                                                    src="/msme ql.png"
                                                    alt="MSME QR Code - Scan to Verify"
                                                    width={224}
                                                    height={224}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <p className="text-white/80 text-sm font-medium">Scan to verify our MSME registration</p>
                                                <p className="text-white/60 text-xs">UDYAM-BR-26-0203793</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            <strong className="text-[#31a39c]">Code2Cash</strong> is officially registered with the Government of India under the MSME (Micro, Small and Medium Enterprises) scheme. Our UDYAM registration number <strong className="font-mono text-white">UDYAM-BR-26-0203793</strong> can be verified on the official UDYAM portal. We are committed to providing authentic, government-recognized internship programs and certificates.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Terms Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="space-y-8"
                        >
                            {/* Transparency Section */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <Users className="w-6 h-6 text-[#31a39c]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">Our Commitment to Transparency</h2>
                                    </div>

                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            At Code2Cash, we believe in complete transparency and honesty in all our operations. We are proud to be a government-verified organization that operates with the highest standards of integrity.
                                        </p>
                                        <ul className="space-y-3 ml-6">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-[#31a39c] flex-shrink-0 mt-0.5" />
                                                <span><strong className="text-white">Clear Communication:</strong> We provide all program details, fees, and requirements upfront with no hidden charges</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-[#31a39c] flex-shrink-0 mt-0.5" />
                                                <span><strong className="text-white">Authentic Certificates:</strong> All certificates are government-recognized and can be verified through our online portal</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-[#31a39c] flex-shrink-0 mt-0.5" />
                                                <span><strong className="text-white">Real Projects:</strong> Interns work on genuine industry projects with practical applications</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-[#31a39c] flex-shrink-0 mt-0.5" />
                                                <span><strong className="text-white">Responsive Support:</strong> Our team is always available to address queries and concerns</span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Acceptance of Terms */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <FileText className="w-6 h-6 text-[#31a39c]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">1. Acceptance of Terms</h2>
                                    </div>

                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            By accessing and using Code2Cash's website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                                        </p>
                                        <p>
                                            These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Services Description */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <Award className="w-6 h-6 text-[#31a39c]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">2. Services Provided</h2>
                                    </div>

                                    <div className="space-y-6 text-white/80 leading-relaxed">
                                        <p className="text-lg">Code2Cash is a comprehensive technology solutions provider offering:</p>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-[#31a39c]"></span>
                                                    Internship & Training Programs
                                                </h3>
                                                <ul className="space-y-2 ml-6 list-disc">
                                                    <li>Online and offline internship programs in various technology domains (Web Development, Mobile Development, AI/ML, Data Science, etc.)</li>
                                                    <li>Industry-recognized certificates upon successful completion</li>
                                                    <li>Letter of Recommendation (LOR) for deserving candidates</li>
                                                    <li>Offer letters for selected internship programs</li>
                                                    <li>Practical training with real-world project experience</li>
                                                    <li>Career guidance and placement assistance</li>
                                                    <li>Exclusive merchandise for program participants</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-[#31a39c]"></span>
                                                    Web Development Services
                                                </h3>
                                                <ul className="space-y-2 ml-6 list-disc">
                                                    <li>Custom website design and development</li>
                                                    <li>E-commerce solutions and online stores</li>
                                                    <li>Corporate websites and business portfolios</li>
                                                    <li>Content Management Systems (CMS)</li>
                                                    <li>Web application development</li>
                                                    <li>Responsive and mobile-friendly designs</li>
                                                    <li>Website maintenance and support</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-[#31a39c]"></span>
                                                    Mobile App Development
                                                </h3>
                                                <ul className="space-y-2 ml-6 list-disc">
                                                    <li>Native iOS and Android app development</li>
                                                    <li>Cross-platform mobile applications (React Native, Flutter)</li>
                                                    <li>Progressive Web Apps (PWA)</li>
                                                    <li>App UI/UX design</li>
                                                    <li>App maintenance and updates</li>
                                                    <li>App Store and Play Store deployment</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-[#31a39c]"></span>
                                                    Digital Solutions & Consulting
                                                </h3>
                                                <ul className="space-y-2 ml-6 list-disc">
                                                    <li>Brand identity and logo design</li>
                                                    <li>Digital marketing and social media management</li>
                                                    <li>SEO and content optimization</li>
                                                    <li>UI/UX design services</li>
                                                    <li>Technology consulting and strategy</li>
                                                    <li>Cloud solutions and deployment</li>
                                                    <li>API development and integration</li>
                                                </ul>
                                            </div>

                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-[#31a39c]"></span>
                                                    Custom Software Development
                                                </h3>
                                                <ul className="space-y-2 ml-6 list-disc">
                                                    <li>Enterprise software solutions</li>
                                                    <li>SaaS (Software as a Service) applications</li>
                                                    <li>Database design and management</li>
                                                    <li>System integration services</li>
                                                    <li>Automation and workflow solutions</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="p-6 bg-[#31a39c]/10 rounded-xl border border-[#31a39c]/20 mt-6">
                                            <p className="text-white/90">
                                                <strong className="text-[#31a39c]">Our Commitment:</strong> We deliver high-quality, scalable, and innovative technology solutions tailored to meet the unique needs of our clients. From startups to established businesses, we transform ideas into successful digital products.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Eligibility */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-[#31a39c]/20 flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-[#31a39c]" />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">3. Eligibility</h2>
                                    </div>

                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            To be eligible for our internship programs, you must:
                                        </p>
                                        <ul className="space-y-3 ml-6 list-disc">
                                            <li>Be currently enrolled in or have completed a relevant educational program</li>
                                            <li>Provide accurate and truthful information during registration</li>
                                            <li>Be at least 18 years of age or have parental/guardian consent</li>
                                            <li>Agree to comply with all program requirements and guidelines</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Payment Terms */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">4. Payment and Fees</h2>
                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            All program fees are clearly stated on our website. Payment details will be shared after application review. We accept various payment methods and provide receipts for all transactions.
                                        </p>
                                        <p className="text-white/60 text-sm">
                                            Refund policies vary by program and will be communicated during enrollment.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Intellectual Property */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">5. Intellectual Property</h2>
                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            All content on this website, including text, graphics, logos, images, and software, is the property of Code2Cash and is protected by copyright and intellectual property laws.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Privacy */}
                            <Card className="bg-[#0a0a0a]/90 border-white/10 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">6. Privacy and Data Protection</h2>
                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            We are committed to protecting your privacy. All personal information collected is used solely for program administration and communication. We do not sell or share your data with third parties without consent.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card className="bg-gradient-to-br from-[#31a39c]/20 to-[#31a39c]/10 border-2 border-[#31a39c]/30 backdrop-blur-xl">
                                <CardContent className="p-8 md:p-10 space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Contact Us</h2>
                                    <div className="space-y-4 text-white/80 leading-relaxed">
                                        <p>
                                            If you have any questions about these Terms of Service, please contact us:
                                        </p>
                                        <div className="space-y-2">
                                            <p><strong className="text-white">Email:</strong> support@code2cash.in</p>
                                            <p><strong className="text-white">Website:</strong> www.code2cash.in</p>
                                            <p><strong className="text-white">UDYAM Registration:</strong> UDYAM-BR-26-0203793</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
