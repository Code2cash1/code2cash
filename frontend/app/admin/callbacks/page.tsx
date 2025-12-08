"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Trash2, Phone, CheckCircle, Clock, Home, Menu, PhoneCall } from "lucide-react"
import { Badge } from "@/components/ui/badge"



interface Callback {
    _id: string;
    name: string;
    phone: string;
    notes: string;
    status: string;
    createdAt: string;
}

export default function AdminCallbacksPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [callbacks, setCallbacks] = useState<Callback[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchCallbacks = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/callback`);
            const data = await res.json();
            setCallbacks(data);
        } catch (error) {
            console.error("Failed to fetch callbacks", error);
        }
    }

    useEffect(() => {
        fetchCallbacks();
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/callback/${id}`, { method: 'DELETE' });
            setCallbacks(callbacks.filter(cb => cb._id !== id))
        } catch (error) {
            console.error("Error deleting", error);
        }
    }

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "pending" ? "contacted" : "pending";
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/callback/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            setCallbacks(callbacks.map(cb =>
                cb._id === id ? { ...cb, status: newStatus } : cb
            ))
        } catch (error) {
            console.error("Error updating", error);
        }
    }

    const filteredCallbacks = callbacks.filter(cb =>
        cb.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cb.phone.includes(searchQuery)
    )

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

                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight">Callback Requests</h1>
                                <p className="text-white/60">Manage phone callback requests from clients.</p>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                                <Input
                                    placeholder="Search callbacks..."
                                    className="pl-9 bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#31a39c]/50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <Card className="bg-[#0a0a0a] border-white/10">
                            <CardContent className="p-0">
                                <div className="space-y-1">
                                    {filteredCallbacks.length === 0 ? (
                                        <div className="p-8 text-center text-white/40">No callback requests found.</div>
                                    ) : (
                                        filteredCallbacks.map((cb) => (
                                            <div
                                                key={cb._id}
                                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/5 border border-white/10 shrink-0">
                                                    <PhoneCall className="h-5 w-5 text-[#31a39c]" />
                                                </div>

                                                <div className="flex-1 min-w-0 space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <h4 className="text-sm font-medium text-white truncate">{cb.name}</h4>
                                                        <Badge variant={cb.status === 'pending' ? 'destructive' : 'secondary'} className={`text-[10px] h-5 px-1.5 ${cb.status === 'pending' ? 'bg-orange-500/20 text-orange-500 hover:bg-orange-500/30' : 'bg-[#31a39c]/20 text-[#31a39c] hover:bg-[#31a39c]/30'}`}>
                                                            {cb.status === 'pending' ? 'Pending' : 'Contacted'}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-white/80 font-mono">{cb.phone}</p>
                                                    <p className="text-xs text-white/50">{cb.notes}</p>
                                                </div>

                                                <div className="flex items-center justify-between md:justify-end gap-2 pl-16 md:pl-0 mt-2 md:mt-0">
                                                    <div className="text-xs text-white/40 hidden md:flex items-center gap-1 w-28 justify-end mr-4">
                                                        <Clock className="h-3 w-3" /> {new Date(cb.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className={`h-8 w-8 ${cb.status === 'pending' ? 'text-white/60 hover:text-[#31a39c]' : 'text-[#31a39c]'}`}
                                                            onClick={() => handleToggleStatus(cb._id, cb.status)}
                                                            title={cb.status === 'pending' ? "Mark as Contacted" : "Mark as Pending"}
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <a href={`tel:${cb.phone}`}>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-white/60 hover:text-green-400"
                                                                title="Call Now"
                                                            >
                                                                <Phone className="h-4 w-4" />
                                                            </Button>
                                                        </a>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-white/60 hover:text-red-400"
                                                            onClick={() => handleDelete(cb._id)}
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
