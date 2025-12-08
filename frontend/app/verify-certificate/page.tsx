"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Search, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function VerifyCertificate() {
    const [certificateId, setCertificateId] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationResult, setVerificationResult] = useState<any>(null)
    const [isRequesting, setIsRequesting] = useState(false)

    const verifyCertificate = async () => {
        if (!certificateId.trim()) {
            toast.error("Please enter a certificate ID")
            return
        }

        setIsVerifying(true)
        setVerificationResult(null)

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/certificates/verify/${certificateId.trim().toUpperCase()}`)
            const data = await res.json()
            setVerificationResult(data)
        } catch (error) {
            console.error(error)
            setVerificationResult({ success: false, verified: false, message: "Error verifying certificate" })
        } finally {
            setIsVerifying(false)
        }
    }

    const requestReissue = async () => {
        if (!verificationResult?.data) return

        setIsRequesting(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reissue`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    certificateId: verificationResult.data.certificateId,
                    internName: verificationResult.data.internName,
                    email: verificationResult.data.email
                })
            })

            if (res.ok) {
                toast.success("Reissue request submitted successfully! Hum aapka request review karenge aur aapko email ke through certificate denge.", { duration: 5000 })
            } else {
                toast.error("Failed to submit request. Please try again.")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error submitting request")
        } finally {
            setIsRequesting(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#030303] py-20">
            <div className="container mx-auto px-4 max-w-2xl">
                <Card className="bg-[#0a0a0a] border-white/10">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl mb-2">Verify Certificate</CardTitle>
                        <CardDescription className="text-white/60">
                            Enter your certificate ID to verify its authenticity
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-white/80">Certificate ID</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={certificateId}
                                    onChange={(e) => setCertificateId(e.target.value)}
                                    placeholder="e.g. C2C-XXXXX-XXXX"
                                    className="bg-[#030303] border-white/10 text-white uppercase"
                                    onKeyPress={(e) => e.key === 'Enter' && verifyCertificate()}
                                />
                                <Button
                                    onClick={verifyCertificate}
                                    disabled={isVerifying}
                                    className="bg-[#31a39c] hover:bg-[#288a84]"
                                >
                                    {isVerifying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        {verificationResult && (
                            <div className={`p-6 rounded-lg border ${verificationResult.verified ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    {verificationResult.verified ? (
                                        <>
                                            <CheckCircle className="h-8 w-8 text-green-400" />
                                            <div>
                                                <h3 className="text-xl font-bold text-green-400">Certificate Verified ✓</h3>
                                                <p className="text-white/60 text-sm">This certificate is authentic</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="h-8 w-8 text-red-400" />
                                            <div>
                                                <h3 className="text-xl font-bold text-red-400">Not Verified ✗</h3>
                                                <p className="text-white/60 text-sm">{verificationResult.message}</p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {verificationResult.verified && verificationResult.data && (
                                    <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-white/60 text-xs">Name</Label>
                                                <p className="text-white font-medium">{verificationResult.data.internName}</p>
                                            </div>
                                            <div>
                                                <Label className="text-white/60 text-xs">Certificate ID</Label>
                                                <p className="text-white font-mono text-sm">{verificationResult.data.certificateId}</p>
                                            </div>
                                            <div>
                                                <Label className="text-white/60 text-xs">Domain</Label>
                                                <p className="text-white">{verificationResult.data.domain}</p>
                                            </div>
                                            <div>
                                                <Label className="text-white/60 text-xs">Duration</Label>
                                                <p className="text-white">{verificationResult.data.duration}</p>
                                            </div>
                                            <div>
                                                <Label className="text-white/60 text-xs">College</Label>
                                                <p className="text-white text-sm">{verificationResult.data.college}</p>
                                            </div>
                                            <div>
                                                <Label className="text-white/60 text-xs">Issue Date</Label>
                                                <p className="text-white">{new Date(verificationResult.data.issueDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-white/10">
                                            <Button
                                                onClick={requestReissue}
                                                disabled={isRequesting}
                                                variant="outline"
                                                className="w-full border-white/10 hover:bg-white/5"
                                            >
                                                {isRequesting ? (
                                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>
                                                ) : (
                                                    <><RefreshCw className="mr-2 h-4 w-4" />Request Certificate Reissue</>
                                                )}
                                            </Button>
                                            <p className="text-xs text-white/40 text-center mt-2">
                                                Certificate will be sent to your registered email
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
