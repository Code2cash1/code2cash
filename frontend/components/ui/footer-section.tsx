'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { InstagramIcon, LinkedinIcon, Mail } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
    label: string;
    links: FooterLink[];
}

const footerLinks: FooterSection[] = [
    {
        label: 'Product',
        links: [
            { title: 'Services', href: '#services' },
            { title: 'Testimonials', href: '#testimonials' },
            { title: 'Process', href: '#process' },
            { title: 'Contact', href: '#contact' },
        ],
    },
    {
        label: 'Company',
        links: [
            { title: 'About Us', href: '#about' },
            { title: 'Careers', href: '/careers' },
            { title: 'Privacy Policy', href: '#' },
            { title: 'Terms of Services', href: '/terms-of-service' },
        ],
    },
    {
        label: 'Connect',
        links: [
            { title: 'Instagram', href: 'https://www.instagram.com/code2cash_co/', icon: InstagramIcon },
            { title: 'LinkedIn', href: 'https://www.linkedin.com/company/code2cash', icon: LinkedinIcon },
            { title: 'Email', href: 'mailto:code2cash1@gmail.com', icon: Mail },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative w-full border-t border-[#31a39c]/20 bg-[#030303] pt-16 pb-8 overflow-hidden">
            {/* Greenish Light Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31a39c]/20 to-transparent pointer-events-none opacity-60 blur-3xl" />

            <div className="absolute top-0 right-1/2 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#31a39c]/50 to-transparent blur-[1px]" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Brand Section */}
                    <AnimatedContainer className="flex flex-col">
                        <Link href="/" className="inline-block">
                            <div className="h-44 w-auto flex items-center justify-start -ml-5 -mt-12">
                                <img
                                    src="/logo-final.png"
                                    alt="Code2Cash"
                                    className="h-full w-auto object-contain filter invert hue-rotate-180 mix-blend-screen scale-125 origin-left"
                                />
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs -mt-10 pl-2">
                            Transforming visionary ideas into digital reality.
                            We build high-performance web and mobile solutions tailored to your success.
                        </p>
                    </AnimatedContainer>

                    {/* Links Sections */}
                    {footerLinks.map((section, index) => (
                        <AnimatedContainer key={section.label} delay={0.1 + index * 0.1} className="flex flex-col space-y-6">
                            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">{section.label}</h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className="group flex items-center text-sm text-white/60 hover:text-[#31a39c] transition-colors duration-300"
                                        >
                                            {link.icon && <link.icon className="mr-2 size-4 group-hover:scale-110 transition-transform" />}
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedContainer>
                    ))}
                </div>

                {/* Bottom Bar */}
                <AnimatedContainer delay={0.4} className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-xs">
                        © {new Date().getFullYear()} Code2Cash. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-white/40 hover:text-[#31a39c] text-xs transition-colors">Privacy</a>
                        <a href="/terms-of-service" className="text-white/40 hover:text-[#31a39c] text-xs transition-colors">Terms</a>
                        <a href="#" className="text-white/40 hover:text-[#31a39c] text-xs transition-colors">Sitemap</a>
                    </div>
                </AnimatedContainer>
            </div>
        </footer>
    );
};

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: 10, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
