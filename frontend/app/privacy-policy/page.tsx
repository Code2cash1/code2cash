'use client';

import { motion } from 'motion/react';
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { Footer } from "@/components/ui/footer-section";
import { Shield, Lock, Eye, UserCheck, FileText, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
                                <Shield className="w-8 h-8 text-[#31a39c]" />
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                Privacy{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#31a39c] to-[#2d9488]">
                                    Policy
                                </span>
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
                                Last Updated: December 9, 2025
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction */}
                        <Section icon={FileText} title="Introduction">
                            <p className="text-white/70 leading-relaxed mb-4">
                                At Code2Cash, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>
                            <p className="text-white/70 leading-relaxed">
                                By accessing or using our services, you agree to the terms outlined in this Privacy Policy. If you do not agree with our practices, please do not use our services.
                            </p>
                        </Section>

                        {/* Information We Collect */}
                        <Section icon={Eye} title="Information We Collect">
                            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
                            <p className="text-white/70 leading-relaxed mb-4">
                                We may collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li>Fill out contact forms or request information</li>
                                <li>Apply for job positions or internships</li>
                                <li>Subscribe to our newsletter or communications</li>
                                <li>Engage with our services or support</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed mb-4">
                                This information may include:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                                <li>Name, email address, and phone number</li>
                                <li>Postal address and location information</li>
                                <li>Professional information (resume, work experience, education)</li>
                                <li>Payment information (for service transactions)</li>
                                <li>Any other information you choose to provide</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
                            <p className="text-white/70 leading-relaxed mb-4">
                                When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                                <li>IP address and browser type</li>
                                <li>Operating system and device information</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website and search terms used</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>
                        </Section>

                        {/* How We Use Your Information */}
                        <Section icon={UserCheck} title="How We Use Your Information">
                            <p className="text-white/70 leading-relaxed mb-4">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                                <li>Providing, operating, and maintaining our services</li>
                                <li>Improving and personalizing user experience</li>
                                <li>Processing job applications and recruitment</li>
                                <li>Communicating with you about services, updates, and promotions</li>
                                <li>Responding to inquiries and providing customer support</li>
                                <li>Analyzing website usage and performance</li>
                                <li>Detecting, preventing, and addressing technical issues or fraud</li>
                                <li>Complying with legal obligations and enforcing our terms</li>
                            </ul>
                        </Section>

                        {/* Cookies and Tracking */}
                        <Section icon={Eye} title="Cookies and Tracking Technologies">
                            <p className="text-white/70 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device that help us:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li>Remember your preferences and settings</li>
                                <li>Understand how you interact with our website</li>
                                <li>Improve website functionality and performance</li>
                                <li>Deliver personalized content and advertisements</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.
                            </p>
                        </Section>

                        {/* Data Protection */}
                        <Section icon={Lock} title="Data Protection and Security">
                            <p className="text-white/70 leading-relaxed mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Regular security assessments and updates</li>
                                <li>Access controls and authentication mechanisms</li>
                                <li>Employee training on data protection practices</li>
                                <li>Secure data storage and backup systems</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to using industry-standard practices.
                            </p>
                        </Section>

                        {/* Third-Party Disclosure */}
                        <Section icon={Shield} title="Third-Party Disclosure">
                            <p className="text-white/70 leading-relaxed mb-4">
                                We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted third parties in the following circumstances:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li><strong className="text-white">Service Providers:</strong> We may share information with vendors and service providers who assist us in operating our website and delivering services (e.g., hosting, analytics, payment processing).</li>
                                <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental request, or to protect our rights and safety.</li>
                                <li><strong className="text-white">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                All third parties are required to maintain the confidentiality of your information and use it only for the purposes for which it was disclosed.
                            </p>
                        </Section>

                        {/* Your Rights */}
                        <Section icon={UserCheck} title="Your Rights">
                            <p className="text-white/70 leading-relaxed mb-4">
                                You have certain rights regarding your personal information, including:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li><strong className="text-white">Access:</strong> You can request access to the personal information we hold about you.</li>
                                <li><strong className="text-white">Correction:</strong> You can request correction of inaccurate or incomplete information.</li>
                                <li><strong className="text-white">Deletion:</strong> You can request deletion of your personal information, subject to legal obligations.</li>
                                <li><strong className="text-white">Opt-Out:</strong> You can opt out of receiving marketing communications from us at any time.</li>
                                <li><strong className="text-white">Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe.
                            </p>
                        </Section>

                        {/* Changes to Privacy Policy */}
                        <Section icon={FileText} title="Changes to This Privacy Policy">
                            <p className="text-white/70 leading-relaxed mb-4">
                                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:
                            </p>
                            <ul className="list-disc list-inside text-white/70 space-y-2 mb-6 ml-4">
                                <li>Posting the updated policy on this page</li>
                                <li>Updating the "Last Updated" date at the top of this policy</li>
                                <li>Sending you an email notification (for significant changes)</li>
                            </ul>
                            <p className="text-white/70 leading-relaxed">
                                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                            </p>
                        </Section>

                        {/* Contact Information */}
                        <Section icon={Mail} title="Contact Us">
                            <p className="text-white/70 leading-relaxed mb-6">
                                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6">
                                <div className="space-y-2">
                                    <p><strong className="text-white">Phone:</strong> +91 7061838495</p>
                                    <p><strong className="text-white">Email:</strong> code2cash1@gmail.com</p>
                                    <p><strong className="text-white">Website:</strong> www.code2cash.in</p>
                                    <p><strong className="text-white">UDYAM Registration:</strong> UDYAM-BR-26-0203793</p>
                                </div>
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
