'use client';

import { motion } from 'motion/react';
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { Footer } from "@/components/ui/footer-section";
import { Shield, Award, BookOpen, CheckCircle, FileText, AlertCircle } from 'lucide-react';

export default function AICTEGuidelinesPage() {
    return (
        <>
            <Code2CashNavbar />
            <div className="min-h-screen bg-[#030303] text-white">
                {/* Hero Section */}
                <div className="relative overflow-hidden pt-32 pb-16">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31a39c]/20 via-transparent to-transparent opacity-50" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#31a39c]/10 to-transparent blur-3xl" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#31a39c]/10 border border-[#31a39c]/20 mb-6">
                                <Award className="w-8 h-8 text-[#31a39c]" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                AICTE{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31a39c] to-[#2d9488]">
                                    Guidelines
                                </span>
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                                CODE2CASH – AICTE GUIDELINES COMPLIANCE LETTER
                            </p>
                            <p className="text-white/50 text-sm md:text-base mt-2">
                                (For Internship & Training Programs)
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Compliance Declaration */}
                        <Section icon={Shield} title="Compliance Declaration">
                            <p className="text-white/70 leading-relaxed mb-4">
                                This is to formally declare that Code2Cash follows the AICTE Internship Guidelines (2018, revised 2022) for issuing internship certificates, conducting training programs, and evaluating student performance.
                            </p>
                        </Section>

                        {/* Internship Framework */}
                        <Section icon={BookOpen} title="1. Internship Framework (as per AICTE Guidelines)">
                            <p className="text-white/70 leading-relaxed mb-4">
                                Our internship structure includes:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Defined learning objectives</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Minimum required working hours</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Weekly reporting</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Task-based evaluation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Mentor assessment</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Project submission at the end of internship</span>
                                </li>
                            </ul>
                        </Section>

                        {/* Certificate Format */}
                        <Section icon={FileText} title="2. Certificate Format">
                            <p className="text-white/70 leading-relaxed mb-4">
                                All internship certificates issued by Code2Cash follow the AICTE-recommended format, which includes:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Student's Name & Institution</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Internship Duration</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Domain/Department</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Responsibilities & Skills Learned</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Authorized Signature</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Unique Certificate ID</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Certificate verification available at <a href="https://www.code2cash.in/careers/verify-certificate" className="text-[#31a39c] hover:text-[#2dd4bf] underline" target="_blank" rel="noopener noreferrer">www.code2cash.in/careers/verify-certificate</a></span>
                                </li>
                            </ul>
                        </Section>

                        {/* Quality Standards */}
                        <Section icon={Award} title="3. Quality Standards">
                            <p className="text-white/70 leading-relaxed mb-4">
                                Code2Cash ensures:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Structured learning</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Real-world project exposure</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Industry-standard tools</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Ethical & transparent evaluation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#31a39c] mt-0.5 flex-shrink-0" />
                                    <span className="text-white/70">Student-based support system</span>
                                </li>
                            </ul>
                        </Section>

                        {/* Disclaimer */}
                        <Section icon={AlertCircle} title="4. Disclaimer">
                            <p className="text-white/70 leading-relaxed mb-4">
                                This letter states that Code2Cash follows the AICTE-prescribed guidelines, but is not directly affiliated with or approved by AICTE.
                            </p>
                            <p className="text-white/70 leading-relaxed mb-4">
                                The purpose of this compliance letter is to assure students and institutions that our internship structure and certification format align with the standards recommended by the All India Council for Technical Education (AICTE).
                            </p>
                            <div className="bg-[#31a39c]/10 border border-[#31a39c]/20 rounded-lg p-4 mt-6">
                                <p className="text-white/80 italic text-center">
                                    "Code2Cash is an MSME-registered company and provides internship certificates in AICTE-compliant format as per the Official AICTE Internship Guidelines (2018, Revised 2022)."
                                </p>
                            </div>
                        </Section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

interface SectionProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    children: React.ReactNode;
}

function Section({ icon: Icon, title, children }: SectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
        >
            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-8 hover:border-[#31a39c]/30 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#31a39c]/10 border border-[#31a39c]/20">
                        <Icon className="w-5 h-5 text-[#31a39c]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
                </div>
                <div className="space-y-4">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
