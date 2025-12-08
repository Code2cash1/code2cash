"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Search, Plus, FileText, Download, User, Briefcase, GraduationCap, Building2, Menu, Home, Loader2, Trash2, Eye, X, Mail, Phone, Calendar, Image as ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import CertificateManagement from "@/components/admin/certificate-management"
import { toast } from "sonner"

interface InternshipApp {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    program: string;
    college: string;
    branch: string;
    course: string;
    rollNo?: string;
    status: string;
    createdAt: string;
}

interface Program {
    _id: string;
    title: string;
    department: string;
    duration: string;
    price: string;
    description: string;
    highlights: string[];
    projects: string[];
    imageUrl: string;
    active: boolean;
}

export default function AdminInternshipsPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [applications, setApplications] = useState<InternshipApp[]>([])
    const [programs, setPrograms] = useState<Program[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("applications")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedApp, setSelectedApp] = useState<InternshipApp | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [editingProgramId, setEditingProgramId] = useState<string | null>(null)

    const [programForm, setProgramForm] = useState({
        title: "",
        department: "",
        duration: "",
        price: "",
        description: "",
        highlights: "",
        projects: "",
        imageUrl: ""
    })

    const fetchApplications = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internship`);
            const data = await res.json();
            setApplications(data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [])

    useEffect(() => {
        if (activeTab === "manage") {
            fetchPrograms();
        }
    }, [activeTab])

    const fetchPrograms = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs`);
            const response = await res.json();
            setPrograms(response.data || []);
        } catch (error) {
            console.error("Failed to fetch programs", error);
        }
    }

    const handleEditProgram = (program: Program) => {
        setProgramForm({
            title: program.title,
            department: program.department,
            duration: program.duration,
            price: program.price,
            description: program.description,
            highlights: program.highlights.join('\n'),
            projects: program.projects.join('\n'),
            imageUrl: program.imageUrl
        });
        setEditingProgramId(program._id);
        setActiveTab("add-new");
    }

    const handleCreateProgram = async () => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('title', programForm.title);
            formData.append('department', programForm.department);
            formData.append('duration', programForm.duration);
            formData.append('price', programForm.price);
            formData.append('description', programForm.description);
            formData.append('highlights', JSON.stringify(programForm.highlights.split('\n').filter(line => line.trim() !== '')));
            formData.append('projects', JSON.stringify(programForm.projects.split('\n').filter(line => line.trim() !== '')));

            if (imageFile) {
                formData.append('image', imageFile);
            } else if (programForm.imageUrl) {
                formData.append('imageUrl', programForm.imageUrl);
            }

            const url = editingProgramId
                ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs/${editingProgramId}`
                : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs`;
            const method = editingProgramId ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: formData });

            if (res.ok) {
                toast.success(editingProgramId ? "Program Updated Successfully!" : "Internship Program Published Successfully!");
                setProgramForm({ title: "", department: "", duration: "", price: "", description: "", highlights: "", projects: "", imageUrl: "" });
                setImageFile(null);
                setEditingProgramId(null);
                setActiveTab("manage");
                fetchPrograms();
            } else {
                toast.error("Failed to save program.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error saving program.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDeleteProgram = async (id: string) => {
        if (!confirm("Are you sure you want to delete this program?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Program deleted successfully!");
                fetchPrograms();
            } else {
                toast.error("Failed to delete program.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting program.");
        }
    }

    const handleDeleteApplication = async (id: string) => {
        if (!confirm("Are you sure you want to delete this application?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internship/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Application deleted successfully!");
                fetchApplications();
                setIsDialogOpen(false);
            } else {
                toast.error("Failed to delete application.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error deleting application.");
        }
    }

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/internship/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                toast.success("Status updated successfully!");
                fetchApplications();
                if (selectedApp && selectedApp._id === id) {
                    setSelectedApp({ ...selectedApp, status: newStatus });
                }
            } else {
                toast.error("Failed to update status.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating status.");
        }
    }

    const handleViewDetails = (app: InternshipApp) => {
        setSelectedApp(app);
        setIsDialogOpen(true);
    }

    const filteredApps = applications.filter(app =>
        app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.program.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'applied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'reviewed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-white/10 text-white/60 border-white/20';
        }
    }

    return (
        <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
            <AdminSidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:ml-64">
                <header className="h-16 bg-[#0a0a0a]/50 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 lg:px-8">
                    <Button variant="ghost" size="icon" className="lg:hidden text-white/60 hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
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
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Internship Management</h1>
                            <p className="text-white/60">Manage applications, programs, and generate documents.</p>
                        </div>
                        <div className="bg-[#0a0a0a] border border-white/10 p-1 rounded-md inline-flex space-x-1 flex-wrap gap-1">
                            <button onClick={() => setActiveTab("applications")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeTab === "applications" ? "bg-[#31a39c] text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                Applications ({applications.length})
                            </button>
                            <button onClick={() => setActiveTab("manage")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeTab === "manage" ? "bg-[#31a39c] text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                Manage Programs
                            </button>
                            <button onClick={() => { setActiveTab("add-new"); setEditingProgramId(null); setProgramForm({ title: "", department: "", duration: "", price: "", description: "", highlights: "", projects: "", imageUrl: "" }); }} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeTab === "add-new" ? "bg-[#31a39c] text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                {editingProgramId ? "Edit Program" : "Add New Program"}
                            </button>
                            <button onClick={() => setActiveTab("certificates")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeTab === "certificates" ? "bg-[#31a39c] text-white shadow-sm" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                                Certificates
                            </button>
                        </div>
                        {activeTab === "applications" && (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-lg border border-white/10">
                                    <Search className="h-4 w-4 text-white/40" />
                                    <Input placeholder="Search applicants by name, email, or program..." className="bg-transparent border-none text-white placeholder:text-white/30 p-0 focus-visible:ring-0" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                                </div>
                                <Card className="bg-[#0a0a0a] border-white/10">
                                    <CardContent className="p-0">
                                        <div className="space-y-1">
                                            {isLoading ? (
                                                <div className="p-8 text-center text-white/40">Loading applications...</div>
                                            ) : filteredApps.length === 0 ? (
                                                <div className="p-8 text-center text-white/40">No applications found.</div>
                                            ) : (
                                                filteredApps.map((app) => (
                                                    <div key={app._id} className="flex flex-col md:flex-row gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                                        <div className="flex items-start gap-4 flex-1">
                                                            <div className="h-10 w-10 rounded-full bg-[#31a39c]/10 flex items-center justify-center text-[#31a39c] font-bold border border-[#31a39c]/20">
                                                                {app.fullName.slice(0, 2).toUpperCase()}
                                                            </div>
                                                            <div className="space-y-1 flex-1">
                                                                <div className="flex flex-wrap items-center gap-2">
                                                                    <h4 className="text-sm font-medium text-white">{app.fullName}</h4>
                                                                    <Badge variant="outline" className="text-[10px] border-[#31a39c]/30 text-[#31a39c] bg-[#31a39c]/5">{app.program}</Badge>
                                                                    <Badge className={`text-[10px] ${getStatusColor(app.status)}`}>{app.status}</Badge>
                                                                </div>
                                                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                                                                    <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {app.email}</span>
                                                                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {app.phone}</span>
                                                                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {app.college}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-end gap-2 pl-14 md:pl-0">
                                                            <div className="text-xs text-white/40 hidden md:block">{new Date(app.createdAt).toLocaleDateString()}</div>
                                                            <Button variant="outline" size="sm" className="h-8 border-white/10 hover:bg-[#31a39c] hover:text-white hover:border-[#31a39c] transition-colors" onClick={() => handleViewDetails(app)}>
                                                                <Eye className="h-3 w-3 mr-1" />View
                                                            </Button>
                                                            <Button variant="outline" size="sm" className="h-8 border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleDeleteApplication(app._id)}>
                                                                <Trash2 className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                        {activeTab === "manage" && (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {programs.map((program) => (
                                        <Card key={program._id} className="bg-[#0a0a0a] border-white/10 hover:border-[#31a39c]/50 transition-colors">
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <CardTitle className="text-lg">{program.title}</CardTitle>
                                                        <CardDescription className="text-white/60 mt-1">{program.department}</CardDescription>
                                                    </div>
                                                    <Badge variant={program.active ? "default" : "secondary"} className="bg-[#31a39c]/20 text-[#31a39c]">{program.active ? "Active" : "Inactive"}</Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-white/60">Duration:</span>
                                                    <span className="text-white">{program.duration}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-white/60">Price:</span>
                                                    <span className="text-[#31a39c] font-semibold">{program.price}</span>
                                                </div>
                                                <p className="text-sm text-white/60 line-clamp-2">{program.description}</p>
                                                <div className="flex gap-2 pt-4">
                                                    <Button variant="outline" size="sm" className="flex-1 border-white/10 hover:bg-white/5" onClick={() => handleEditProgram(program)}>
                                                        <FileText className="h-4 w-4 mr-1" />Edit
                                                    </Button>
                                                    <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleDeleteProgram(program._id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                {programs.length === 0 && (
                                    <div className="text-center py-12 text-white/40">
                                        <p>No programs found. Create your first program!</p>
                                        <Button onClick={() => setActiveTab("add-new")} className="mt-4 bg-[#31a39c] hover:bg-[#288a84]">
                                            <Plus className="h-4 w-4 mr-2" />Add New Program
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "add-new" && (
                            <Card className="bg-[#0a0a0a] border-white/10 animate-in fade-in zoom-in-95 duration-200">
                                <CardHeader>
                                    <CardTitle>{editingProgramId ? "Edit Internship Program" : "Create New Internship Program"}</CardTitle>
                                    <CardDescription className="text-white/60">{editingProgramId ? "Update the details of the internship program." : "Fill in the details to create a new internship opportunity."}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-white/80">Program Title</Label>
                                        <Input value={programForm.title} onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })} placeholder="e.g. Frontend React Developer Internship" className="bg-[#030303] border-white/10 text-white" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-white/80">Department</Label>
                                            <Select onValueChange={(val) => setProgramForm({ ...programForm, department: val })}>
                                                <SelectTrigger className="bg-[#030303] border-white/10 text-white"><SelectValue placeholder="Select Department" /></SelectTrigger>
                                                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                                    <SelectItem value="Design">Design</SelectItem>
                                                    <SelectItem value="Marketing">Marketing</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white/80">Duration</Label>
                                            <Input value={programForm.duration} onChange={(e) => setProgramForm({ ...programForm, duration: e.target.value })} placeholder="e.g. 3 Months" className="bg-[#030303] border-white/10 text-white" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-white/80">Program Fee</Label>
                                            <Input value={programForm.price} onChange={(e) => setProgramForm({ ...programForm, price: e.target.value })} placeholder="e.g. ₹2,999" className="bg-[#030303] border-white/10 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white/80">Program Image</Label>
                                            <div className="space-y-2">
                                                <Input type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setImageFile(file); }} className="bg-[#030303] border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#31a39c] file:text-white hover:file:bg-[#288a84]" />
                                                <p className="text-xs text-white/40">Or provide an image URL below</p>
                                                <Input value={programForm.imageUrl} onChange={(e) => setProgramForm({ ...programForm, imageUrl: e.target.value })} placeholder="https://example.com/image.png" className="bg-[#030303] border-white/10 text-white" />
                                                {imageFile && <p className="text-xs text-green-400">✓ File selected: {imageFile.name}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white/80">Description</Label>
                                        <Textarea value={programForm.description} onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })} placeholder="Describe the internship program..." className="bg-[#030303] border-white/10 text-white min-h-[100px]" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-white/80">What You'll Learn (Highlights)</Label>
                                            <Textarea value={programForm.highlights} onChange={(e) => setProgramForm({ ...programForm, highlights: e.target.value })} placeholder="React.js Fundamentals&#10;State Management&#10;API Integration" className="bg-[#030303] border-white/10 text-white min-h-[120px]" />
                                            <p className="text-xs text-white/40">Enter each point on a new line.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-white/80">What You'll Build (Projects)</Label>
                                            <Textarea value={programForm.projects} onChange={(e) => setProgramForm({ ...programForm, projects: e.target.value })} placeholder="E-commerce Dashboard&#10;Social Media App" className="bg-[#030303] border-white/10 text-white min-h-[120px]" />
                                            <p className="text-xs text-white/40">Enter each point on a new line.</p>
                                        </div>
                                    </div>
                                    <Button onClick={handleCreateProgram} disabled={isSubmitting} className="bg-[#31a39c] hover:bg-[#288a84] text-white w-full md:w-auto">
                                        {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {editingProgramId ? "Updating..." : "Publishing..."}</> : <><Plus className="mr-2 h-4 w-4" /> {editingProgramId ? "Update Program" : "Publish Program"}</>}
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                        {activeTab === "certificates" && (
                            <div className="animate-in fade-in zoom-in-95 duration-200">
                                <CertificateManagement />
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Application Details</DialogTitle>
                        <DialogDescription className="text-white/60">Complete information about the applicant</DialogDescription>
                    </DialogHeader>
                    {selectedApp && (
                        <div className="space-y-6 mt-4">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#31a39c]">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Full Name</Label>
                                        <p className="text-white font-medium">{selectedApp.fullName}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Email</Label>
                                        <p className="text-white font-medium flex items-center gap-2"><Mail className="h-4 w-4 text-[#31a39c]" />{selectedApp.email}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Phone</Label>
                                        <p className="text-white font-medium flex items-center gap-2"><Phone className="h-4 w-4 text-[#31a39c]" />{selectedApp.phone}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Applied For</Label>
                                        <Badge className="bg-[#31a39c]/20 text-[#31a39c] border-[#31a39c]/30">{selectedApp.program}</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#31a39c]">Educational Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">College/University</Label>
                                        <p className="text-white font-medium">{selectedApp.college}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Branch</Label>
                                        <p className="text-white font-medium">{selectedApp.branch}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Course</Label>
                                        <p className="text-white font-medium">{selectedApp.course}</p>
                                    </div>
                                    {selectedApp.rollNo && (
                                        <div className="space-y-1">
                                            <Label className="text-white/60 text-xs">Roll Number</Label>
                                            <p className="text-white font-medium">{selectedApp.rollNo}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-[#31a39c]">Application Status</h3>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Current Status</Label>
                                        <Badge className={`${getStatusColor(selectedApp.status)}`}>{selectedApp.status}</Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-white/60 text-xs">Applied On</Label>
                                        <p className="text-white font-medium flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-[#31a39c]" />
                                            {new Date(selectedApp.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                                <Select onValueChange={(val) => handleUpdateStatus(selectedApp._id, val)}>
                                    <SelectTrigger className="bg-[#030303] border-white/10 text-white"><SelectValue placeholder="Update Status" /></SelectTrigger>
                                    <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                                        <SelectItem value="applied">Applied</SelectItem>
                                        <SelectItem value="reviewed">Reviewed</SelectItem>
                                        <SelectItem value="accepted">Accepted</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10" onClick={() => handleDeleteApplication(selectedApp._id)}>
                                    <Trash2 className="h-4 w-4 mr-2" />Delete Application
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
