"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
    name: string
    url: string
    icon: LucideIcon
}

interface NavBarProps {
    items: NavItem[]
    className?: string
}

import { usePathname } from "next/navigation"

export function NavBar({ items, className }: NavBarProps) {
    const pathname = usePathname() || ""
    const [activeTab, setActiveTab] = useState(items[0].name)
    const [isMobile, setIsMobile] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        handleResize()
        handleScroll()
        window.addEventListener("resize", handleResize)
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    useEffect(() => {
        // Handle active tab based on path and hash
        const handleActiveTab = () => {
            const isHomePage = pathname === '/';
            // Safe check for window
            const hash = typeof window !== 'undefined' ? window.location.hash : '';

            if (isHomePage) {
                // Check if there is a hash that matches a nav item
                if (hash) {
                    const matchingItem = items.find(item => item.url === `/${hash}`);
                    if (matchingItem) {
                        setActiveTab(matchingItem.name);

                        // Force scroll to element as fallback for cross-page navigation
                        setTimeout(() => {
                            const id = hash.replace('#', '');
                            const element = document.getElementById(id);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 500);
                        return;
                    }
                }
                // If no hash or no match, default to first item (Home)
                // But only if we are strictly on home without a known hash sub-section
                const homeItem = items.find(item => item.url === '/');
                if (homeItem) {
                    setActiveTab(homeItem.name);
                } else {
                    setActiveTab(items[0].name);
                }
            } else {
                // Sub-pages logic (e.g. /careers)
                // Check for exact match or prefix match for sub-pages
                // Special case: /jobs and /careers should both highlight Careers if Jobs is not in the menu
                const isJobsOrCareers = pathname.startsWith('/jobs') || pathname.startsWith('/careers');
                const careersItem = items.find(item => item.url === '/careers');

                if (isJobsOrCareers && careersItem) {
                    setActiveTab(careersItem.name);
                } else {
                    const matchingItem = items.find(item =>
                        item.url !== '/' && (item.url === pathname || pathname.startsWith(item.url))
                    );

                    if (matchingItem) {
                        setActiveTab(matchingItem.name);
                    }
                }
            }
        };

        handleActiveTab();

        // Listen for hash changes
        window.addEventListener('hashchange', handleActiveTab);
        return () => window.removeEventListener('hashchange', handleActiveTab);
    }, [pathname, items])

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block",
                scrolled ? "pt-2" : "pt-6",
                className,
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className={cn(
                    "flex items-center justify-center gap-3 border border-border backdrop-blur-lg py-3 px-4 md:px-6 rounded-full shadow-lg transition-all duration-300 overflow-visible max-w-fit mx-auto",
                    scrolled ? "bg-background/95" : "bg-background/80"
                )}>
                    {/* Navigation Items */}
                    <div className="flex items-center gap-1 md:gap-2">
                        {items.map((item) => {
                            const Icon = item.icon
                            const isActive = activeTab === item.name

                            return (
                                <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={(e) => {
                                        setActiveTab(item.name);
                                        // Force robust navigation for cross-page hash links
                                        if (pathname !== '/' && item.url.startsWith('/#')) {
                                            // This ensures the browser handles the jump reliably
                                            window.location.href = item.url;
                                        }
                                    }}
                                    className={cn(
                                        "relative cursor-pointer text-xs md:text-sm font-semibold px-3 md:px-6 py-2 rounded-full transition-colors overflow-visible",
                                        "text-foreground/80 hover:text-primary",
                                        isActive && "bg-muted text-primary",
                                    )}
                                >
                                    <span className="hidden md:inline relative z-10">{item.name}</span>
                                    <span className="md:hidden relative z-10">
                                        <Icon size={18} strokeWidth={2.5} />
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="lamp"
                                            className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 overflow-visible"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        >
                                            {/* Tubelight Effect - Top Glow */}
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-2 bg-[#31a39c] rounded-full shadow-[0_0_20px_#31a39c,0_0_40px_#31a39c]">
                                                {/* Outer glow layers for realistic tubelight effect */}
                                                <div className="absolute w-16 h-8 bg-[#31a39c]/30 rounded-full blur-xl -top-3 -left-2 animate-pulse" />
                                                <div className="absolute w-12 h-6 bg-[#31a39c]/40 rounded-full blur-lg -top-2 left-0" />
                                                <div className="absolute w-8 h-4 bg-[#31a39c]/50 rounded-full blur-md -top-1 left-2" />
                                            </div>
                                        </motion.div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
