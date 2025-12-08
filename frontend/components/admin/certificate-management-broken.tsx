"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Download, Loader2, Trash2, Award, FileCheck, Copy, Check, Save, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import { toast } from 'sonner'

interface Certificate {
    _id: string;
    certificateId: string;
    internName: string;
    email: string;
    domain: string;
    duration: string;
    college: string;
    startDate: string;
    endDate: string;
    issueDate: string;
}

interface ReissueRequest {
    _id: string;
    certificateId: string;
    internName: string;
    email: string;
    domain: string;
    college: string;
    duration: string;
    status: 'pending' | 'approved' | 'rejected';
    requestDate: string;
}

export default function CertificateManagement() {
    const [activeSubTab, setActiveSubTab] = useState("view")
    const [certificates, setCertificates] = useState<Certificate[]>([])
    const [reissueRequests, setReissueRequests] = useState<ReissueRequest[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [copiedId, setCopiedId] = useState("")

    const [certForm, setCertForm] = useState({
        internName: "",
        email: "",
        domain: "",
        duration: "",
        college: "",
        startDate: "",
        endDate: ""
    })

    useEffect(() => {
        if (activeSubTab === "view") {
            fetchCertificates()
        } else if (activeSubTab === "requests") {
            fetchReissueRequests()
        }
    }, [activeSubTab])

    const fetchCertificates = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/certificates')
            const data = await res.json()
            setCertificates(data)
        } catch (error) {
            console.error("Failed to fetch certificates", error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchReissueRequests = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/reissue')
            const data = await res.json()
            setReissueRequests(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateRequestStatus = async (id: string, status: string) => {
        try {
            await fetch(`http://localhost:5000/api/reissue/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            })
            fetchReissueRequests()
        } catch (error) {
            console.error(error)
            toast.error('Error updating status')
        }
    }

    const deleteReissueRequest = async (id: string) => {
        if (!confirm('Are you sure you want to delete this reissue request?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/reissue/${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchReissueRequests();
            } else {
                toast.error('Failed to delete request');
            }
        } catch (error) {
            console.error(error);
            toast.error('Error deleting request');
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(text)
        setTimeout(() => setCopiedId(""), 2000)
    }

    const saveCertificate = async () => {
        setIsSaving(true)
        try {
            const verifyUrl = `https://c2xcertificate.netlify.app`
            const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: 200 })

            const response = await fetch('http://localhost:5000/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    internName: certForm.internName,
                    email: certForm.email,
                    domain: certForm.domain,
                    duration: certForm.duration,
                    college: certForm.college,
                    startDate: certForm.startDate,
                    endDate: certForm.endDate,
                    qrCode: qrDataUrl
                })
                    < div className="bg-[#0a0a0a] border border-white/10 p-1 rounded-md inline-flex space-x-1" >
                <button onClick={() => setActiveSubTab("view")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeSubTab === "view" ? "bg-[#31a39c] text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <FileCheck className="h-4 w-4 inline mr-2" />View Certificates
                </button>
                <button onClick={() => setActiveSubTab("requests")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeSubTab === "requests" ? "bg-[#31a39c] text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <RefreshCw className="h-4 w-4 inline mr-2" />Reissue Requests
                </button>
                <button onClick={() => setActiveSubTab("generate")} className={`px-4 py-2 text-sm font-medium rounded-sm transition-all ${activeSubTab === "generate" ? "bg-[#31a39c] text-white" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                    <Award className="h-4 w-4 inline mr-2" />Generate New
                </button>
            </div >

        { activeSubTab === "view" && (
            <div className="space-y-4">
                {isLoading ? <div className="text-center py-12 text-white/40">Loading...</div> :
                    certificates.length === 0 ? (
                        <Card className="bg-[#0a0a0a] border-white/10">
                            <CardContent className="p-12 text-center">
                                <Award className="h-16 w-16 mx-auto mb-4 text-white/20" />
                                <p className="text-white/40 mb-4">No certificates yet</p>
                                <Button onClick={() => setActiveSubTab("generate")} className="bg-[#31a39c] hover:bg-[#288a84]">Generate First Certificate</Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="bg-[#0a0a0a] border-white/10">
                            <CardContent className="p-0">
                                <div className="divide-y divide-white/5">
                                    {certificates.map((cert) => (
                                        <div key={cert._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 hover:bg-white/5 transition-colors gap-4">
                                            <div className="flex-1 space-y-2 w-full">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <h4 className="text-white font-semibold text-base">{cert.internName}</h4>
                                                    <Badge className="bg-[#31a39c]/20 text-[#31a39c] text-xs">Certificate</Badge>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">ID:</span>
                                                        <span className="text-white font-mono text-xs">{cert.certificateId}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-5 w-5 p-0"
                                                            onClick={() => copyToClipboard(cert.certificateId)}
                                                        >
                                                            {copiedId === cert.certificateId ?
                                                                <Check className="h-3 w-3 text-green-400" /> :
                                                                <Copy className="h-3 w-3 text-white/60 hover:text-white" />
                                                            }
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">Email:</span>
                                                        <span className="text-white text-xs truncate">{cert.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">Domain:</span>
                                                        <span className="text-white text-xs">{cert.domain}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">College:</span>
                                                        <span className="text-white text-xs truncate">{cert.college}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">Duration:</span>
                                                        <span className="text-white text-xs">{cert.duration}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-white/40 text-xs">Issued:</span>
                                                        <span className="text-white text-xs">{new Date(cert.issueDate).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 md:flex-none border-white/10 hover:bg-[#31a39c] hover:text-white hover:border-[#31a39c]"
                                                    onClick={() => downloadCertificatePDF(cert)}
                                                >
                                                    <Download className="h-4 w-4 mr-1" />
                                                    Download
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                                                    onClick={() => deleteCertificate(cert._id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
            </div>
        )
}

{
    activeSubTab === "requests" && (
        <div className="space-y-4">
            {isLoading ? <div className="text-center py-12 text-white/40">Loading...</div> :
                reissueRequests.length === 0 ? (
                    <Card className="bg-[#0a0a0a] border-white/10">
                        <CardContent className="p-12 text-center">
                            <RefreshCw className="h-16 w-16 mx-auto mb-4 text-white/20" />
                            <p className="text-white/40">No reissue requests yet</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {reissueRequests.map((req) => (
                            <Card key={req._id} className="bg-[#0a0a0a] border-white/10">
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-4">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg text-white">{req.internName}</h3>
                                            <Badge variant={req.status === 'pending' ? 'default' : 'secondary'} className={req.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30' : req.status === 'approved' ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'}>
                                                {req.status?.toUpperCase() || 'PENDING'}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">Certificate ID:</span>
                                                <span className="text-white font-mono">{req.certificateId}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">Email:</span>
                                                <span className="text-white">{req.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">Domain:</span>
                                                <span className="text-white">{req.domain || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">College:</span>
                                                <span className="text-white">{req.college || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">Duration:</span>
                                                <span className="text-white">{req.duration || '-'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white/40 w-24">Requested:</span>
                                                <span className="text-white">{new Date(req.requestDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full md:w-auto">
                                        {req.status === 'pending' && (
                                            <Button onClick={() => updateRequestStatus(req._id, 'approved')} className="bg-[#31a39c] hover:bg-[#288a84] w-full shadow-lg shadow-[#31a39c]/20">
                                                <Check className="mr-2 h-4 w-4" /> Mark as Processed
                                            </Button>
                                        )}
                                        <Button onClick={() => deleteReissueRequest(req._id)} variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10 w-full">
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Request
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
        </div>
    )
}

{
    activeSubTab === "generate" && (
        <Card className="bg-[#0a0a0a] border-white/10">
            <CardHeader><CardTitle>Generate New Certificate</CardTitle></CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-white/80">Intern Name *</Label>
                        <Input value={certForm.internName} onChange={(e) => setCertForm({ ...certForm, internName: e.target.value })} placeholder="Full Name" className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Email *</Label>
                        <Input type="email" value={certForm.email} onChange={(e) => setCertForm({ ...certForm, email: e.target.value })} placeholder="email@example.com" className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Domain *</Label>
                        <Input value={certForm.domain} onChange={(e) => setCertForm({ ...certForm, domain: e.target.value })} placeholder="e.g. Web Development" className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Duration *</Label>
                        <Input value={certForm.duration} onChange={(e) => setCertForm({ ...certForm, duration: e.target.value })} placeholder="e.g. 3 Months" className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">College/University *</Label>
                        <Input value={certForm.college} onChange={(e) => setCertForm({ ...certForm, college: e.target.value })} placeholder="Institution Name" className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">Start Date *</Label>
                        <Input type="date" value={certForm.startDate} onChange={(e) => setCertForm({ ...certForm, startDate: e.target.value })} className="bg-[#030303] border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-white/80">End Date *</Label>
                        <Input type="date" value={certForm.endDate} onChange={(e) => setCertForm({ ...certForm, endDate: e.target.value })} className="bg-[#030303] border-white/10 text-white" />
                    </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                    <Button onClick={saveCertificate} disabled={isSaving || !certForm.internName || !certForm.domain || !certForm.college} className="bg-[#31a39c] hover:bg-[#288a84]">
                        {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : <><Save className="mr-2 h-4 w-4" />Save Certificate</>}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
        </div >
    )
}
