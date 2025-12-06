"use client";

import { Home, Info, Briefcase, Users, Mail } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export function Code2CashNavbar() {
    const navItems = [
        { name: 'Home', url: '#', icon: Home },
        { name: 'About', url: '#about', icon: Info },
        { name: 'Services', url: '#services', icon: Briefcase },
        { name: 'Careers', url: '#careers', icon: Users },
        { name: 'Contact', url: '#contact', icon: Mail }
    ]

    return <NavBar items={navItems} />
}
