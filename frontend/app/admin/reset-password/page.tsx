"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Loader2, Lock } from "lucide-react"

export default function AdminResetPasswordPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
            // Redirect after showing success
            setTimeout(() => {
                router.push("/admin/login")
            }, 2000)
        }, 1500)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center p-4 overflow-hidden relative">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31a39c]/20 to-transparent pointer-events-none opacity-40 blur-3xl" />

                <Card className="w-full max-w-md bg-[#0a0a0a] border-[#31a39c]/20 shadow-[0_0_50px_-12px_rgba(49,163,156,0.15)] relative z-10">
                    <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="h-16 w-16 rounded-full bg-[#31a39c]/10 flex items-center justify-center">
                            <CheckCircle2 className="h-8 w-8 text-[#31a39c]" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Password Reset!</h2>
                        <p className="text-white/60 text-center max-w-xs">
                            Your password has been successfully updated. Redirecting to login...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31a39c]/20 to-transparent pointer-events-none opacity-40 blur-3xl" />

            <Card className="w-full max-w-md bg-[#0a0a0a] border-[#31a39c]/20 shadow-[0_0_50px_-12px_rgba(49,163,156,0.15)] relative z-10">
                <CardHeader className="space-y-1 text-center pb-8">
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Set New Password
                    </CardTitle>
                    <CardDescription className="text-white/60">
                        Create a strong password for your admin account.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white/80">New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-9 pr-9 bg-[#030303] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#31a39c]/50 focus-visible:border-[#31a39c]/50"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-white/40 hover:text-white/60 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-white/80">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-9 bg-[#030303] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#31a39c]/50 focus-visible:border-[#31a39c]/50"
                                    required
                                    minLength={8}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full bg-[#31a39c] hover:bg-[#31a39c]/90 text-white font-medium h-10 transition-all duration-300 shadow-[0_0_20px_-5px_#31a39c]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Password"
                            )}
                        </Button>
                        <Link
                            href="/admin/login"
                            className="flex items-center text-sm text-white/40 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
