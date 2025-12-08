"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Box,
    Home,
    Menu,
    Users,
    Wallet,
    MessageSquare,
    PhoneCall,
    GraduationCap
} from "lucide-react"

export default function AdminDashboardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [stats, setStats] = useState({ messages: 0, callbacks: 0, internships: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/stats`)
                const data = await res.json()
                setStats(data)
            } catch (error) {
                console.error("Error fetching stats:", error)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
            <AdminSidebar isOpen={isSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
                {/* Header */}
                <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 lg:px-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-white/60 hover:text-white"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="h-8 w-8 rounded-full bg-[#31a39c]/20 flex items-center justify-center">
                            <Home className="h-4 w-4 text-[#31a39c]" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-white/60">Welcome back to your admin panel.</p>
                        </div>

                        {/* Dynamic Stats */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <StatCard title="Total Messages" value={stats.messages.toString()} icon={MessageSquare} trend="All time" />
                            <StatCard title="Callbacks Pending" value={stats.callbacks.toString()} icon={PhoneCall} trend="Requires Action" />
                            <StatCard title="Internship Apps" value={stats.internships.toString()} icon={GraduationCap} trend="All time" />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="col-span-4 bg-[#0a0a0a] border border-white/10 rounded-xl min-h-[400px] flex items-center justify-center text-white/20">
                                Chart Placeholder (No Extra Logic)
                            </div>
                            <div className="col-span-3 bg-[#0a0a0a] border border-white/10 rounded-xl min-h-[400px] flex items-center justify-center text-white/20">
                                Recent Activity Placeholder
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-6 shadow-sm">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-white/60">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground text-[#31a39c]" />
            </div>
            <div className="pt-2">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-white/40 mt-1">{trend}</p>
            </div>
        </div>
    )
}
