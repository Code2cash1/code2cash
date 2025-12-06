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
    const pathname = usePathname()
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
        // Find exact match first (handles /, /#about as distinct if pathname matched, but pathname ignores hash)
        // Since pathname ignores hash, / matches / and /#about's base. 
        // We rely on path segments.

        // Strategy:
        // 1. If we are on a known page route (like /careers), set that.
        // 2. If we are on root /, defaulting to Home is fine, but if user clicks About, local state handles it.
        // This effect runs on pathname change.

        const isHomePage = pathname === '/';

        if (!isHomePage) {
            // Check for exact match or prefix match for sub-pages
            const matchingItem = items.find(item =>
                item.url !== '/' && (item.url === pathname || pathname.startsWith(item.url))
            );

            if (matchingItem) {
                setActiveTab(matchingItem.name);
            }
        } else {
            // On home page, we generally want "Home" active unless we are handling scroll-spy which is complex here.
            // We will stick to defaulting to Home if we just navigated here.
            // But if we are just scrolling, this effect won't fire, so local state persists.
            // If we navigated FROM careers TO /, this fires.
            setActiveTab(items[0].name)
        }

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
                                    onClick={() => setActiveTab(item.name)}
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
