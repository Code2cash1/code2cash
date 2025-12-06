"use client"

import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu"
import { Menu as MenuIcon, X, Home, Info, Briefcase, Users, Mail } from "lucide-react"

export function MobileNavMenu() {
    const handleNavigation = (section: string) => {
        const element = document.getElementById(section)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        } else {
            window.location.href = `/#${section}`
        }
    }

    return (
        <div className="fixed top-4 right-4 z-50 md:hidden">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#31a39c]/20 to-transparent blur-2xl -z-10 rounded-full" />
                <MenuContainer>
                    <MenuItem
                        icon={
                            <div className="relative w-6 h-6">
                                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                                    <MenuIcon size={24} strokeWidth={1.5} className="text-[#31a39c]" />
                                </div>
                                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                                    <X size={24} strokeWidth={1.5} className="text-[#31a39c]" />
                                </div>
                            </div>
                        }
                    />
                    <MenuItem
                        icon={<Home size={24} strokeWidth={1.5} className="text-[#31a39c]" />}
                        onClick={() => window.location.href = '/'}
                    />
                    <MenuItem
                        icon={<Info size={24} strokeWidth={1.5} className="text-[#31a39c]" />}
                        onClick={() => handleNavigation('about')}
                    />
                    <MenuItem
                        icon={<Briefcase size={24} strokeWidth={1.5} className="text-[#31a39c]" />}
                        onClick={() => handleNavigation('services')}
                    />
                    <MenuItem
                        icon={<Users size={24} strokeWidth={1.5} className="text-[#31a39c]" />}
                        onClick={() => window.location.href = '/careers'}
                    />
                    <MenuItem
                        icon={<Mail size={24} strokeWidth={1.5} className="text-[#31a39c]" />}
                        onClick={() => handleNavigation('contact')}
                    />
                </MenuContainer>
            </div>
        </div>
    )
}
