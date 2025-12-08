"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    BarChart3,
    Box,
    LayoutDashboard,
    LogOut,
    Settings,
    Users,
    Wallet,
    MessageSquare,
    PhoneCall,
    GraduationCap,
    Briefcase
} from "lucide-react"

interface SidebarProps {
    isOpen: boolean;
}

export function AdminSidebar({ isOpen }: SidebarProps) {
    const pathname = usePathname()
    const router = useRouter()

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}
        >
            <div className="h-full flex flex-col overflow-hidden">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-white/10 flex-shrink-0">
                    <div className="h-8 w-auto flex items-center justify-start gap-2">
                        {/* Small Logo Icon */}
                        <div className="h-8 w-8 bg-[#31a39c]/20 rounded-md flex items-center justify-center">
                            <span className="text-[#31a39c] font-bold">C</span>
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">Code2Cash</span>
                    </div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    <NavItem icon={LayoutDashboard} label="Dashboard" href="/admin/dashboard" active={pathname === "/admin/dashboard"} />
                    <NavItem icon={Briefcase} label="Jobs" href="/admin/jobs" active={pathname === "/admin/jobs"} />
                    <NavItem icon={MessageSquare} label="Messages" href="/admin/messages" active={pathname === "/admin/messages"} />
                    <NavItem icon={PhoneCall} label="Callbacks" href="/admin/callbacks" active={pathname === "/admin/callbacks"} />
                    <NavItem icon={GraduationCap} label="Internships" href="/admin/internships" active={pathname === "/admin/internships"} />
                    <NavItem icon={Settings} label="Settings" href="#" active={pathname === "/admin/settings"} />
                </nav>

                <div className="mt-auto p-4 border-t border-white/10 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <Avatar className="h-10 w-10 border border-white/10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Admin User</p>
                            <p className="text-xs text-white/40 truncate">admin@code2cash.in</p>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        className="w-full justify-start text-white/80 hover:text-white"
                        onClick={() => {
                            localStorage.removeItem('adminToken');
                            router.push('/admin/login');
                        }}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                    </Button>
                </div>
            </div>
        </aside >
    )
}

function NavItem({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
                flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors mb-1
                ${active
                    ? "bg-[#31a39c]/10 text-[#31a39c]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"}
            `}
        >
            <Icon className="mr-3 h-5 w-5" />
            {label}
        </Link>
    )
}
