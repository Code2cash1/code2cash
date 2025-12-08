"use client"

import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Trash2, Mail, MoreHorizontal, Eye, Home, Menu, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Message {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    projectType: string[];
    status: string;
    createdAt: string;
}

export default function AdminMessagesPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [messages, setMessages] = useState<Message[]>([])
    const [searchQuery, setSearchQuery] = useState("")

    const fetchMessages = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact`);
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    }

    useEffect(() => {
        fetchMessages();
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/${id}`, { method: 'DELETE' });
            setMessages(messages.filter(msg => msg._id !== id))
        } catch (error) {
            console.error("Error deleting", error);
        }
    }

    const handleMarkRead = async (id: string) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/contact/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'read' })
            });
            setMessages(messages.map(msg => msg._id === id ? { ...msg, status: "read" } : msg))
        } catch (error) {
            console.error("Error updating", error);
        }
    }

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                                <p className="text-white/60">Manage incoming inquiries and support requests.</p>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                                <Input
                                    placeholder="Search messages..."
                                    className="pl-9 bg-[#0a0a0a] border-white/10 text-white placeholder:text-white/30 focus-visible:ring-[#31a39c]/50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <Card className="bg-[#0a0a0a] border-white/10">
                            <CardContent className="p-0">
                                <div className="space-y-1">
                                    {filteredMessages.length === 0 ? (
                                        <div className="p-8 text-center text-white/40">No messages found.</div>
                                    ) : (
                                        filteredMessages.map((msg) => (
                                            <div
                                                key={msg._id}
                                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                            >
                                                <div className="flex items-start gap-4 flex-1">
                                                    <Avatar className="h-10 w-10 border border-white/10">
                                                        <AvatarFallback className="bg-[#31a39c]/10 text-[#31a39c] text-xs">
                                                            {msg.name.slice(0, 2).toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className={`text-sm font-medium ${msg.status === 'unread' ? 'text-white' : 'text-white/70'}`}>
                                                                {msg.name}
                                                            </h4>
                                                            {msg.status === 'unread' && (
                                                                <span className="w-2 h-2 rounded-full bg-[#31a39c]" />
                                                            )}
                                                            <span className="text-xs text-white/40 md:hidden ml-auto">{new Date(msg.createdAt).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-xs text-white/50">{msg.email}</p>
                                                        <p className={`text-sm ${msg.status === 'unread' ? 'text-white/90 font-medium' : 'text-white/60'}`}>
                                                            {msg.subject}
                                                        </p>
                                                        <p className="text-xs text-white/40 line-clamp-1">{msg.message}</p>
                                                        {msg.projectType && msg.projectType.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                {msg.projectType.map((tag, idx) => (
                                                                    <Badge key={idx} variant="secondary" className="text-[10px] px-1 py-0 h-5 bg-white/10 text-white hover:bg-white/20">
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between md:justify-end gap-2 pl-14 md:pl-0">
                                                    <div className="text-xs text-white/40 hidden md:block w-24 text-right mr-4">{new Date(msg.createdAt).toLocaleDateString()}</div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-white/60 hover:text-[#31a39c]"
                                                            onClick={() => handleMarkRead(msg._id)}
                                                            title="Mark as Read"
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-white/60 hover:text-red-400"
                                                            onClick={() => handleDelete(msg._id)}
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
