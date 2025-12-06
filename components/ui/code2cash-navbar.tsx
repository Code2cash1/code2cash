"use client";

import Link from "next/link";
import { Home, Info, Briefcase, Users, Mail } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Code2CashNavbar() {
    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'About', url: '/#about', icon: Info },
        { name: 'Services', url: '/#services', icon: Briefcase },
        { name: 'Careers', url: '/careers', icon: Users },
        { name: 'Contact', url: '/#contact', icon: Mail }
    ]

    return (
        <>
            {/* Logo - Scrollable with page - ALIGNED WITH HEADER & LARGE (Negative top for tight fit) */}
            <div className="absolute -top-6 left-2 md:-top-10 md:left-6 z-50 pointer-events-none">
                <Link href="/" className="group flex items-start gap-3 pointer-events-auto">
                    <div className="h-48 w-auto md:h-52 md:w-auto flex items-center justify-start transition-transform group-hover:scale-105">
                        <img
                            src="/logo-final.png"
                            alt="Code2Cash"
                            className="h-full w-auto object-contain filter invert hue-rotate-180 mix-blend-screen origin-top-left"
                        />
                    </div>
                </Link>
            </div>

            <NavBar items={navItems} />
        </>
    )
}
