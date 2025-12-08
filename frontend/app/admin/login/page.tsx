"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import { toast } from "sonner";

export default function AdminLoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('adminToken', data.token);
                toast.success("Login successful");
                router.push("/admin/dashboard");
            } else {
                setError(data.message || "Invalid credentials")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#030303] flex items-center justify-center p-4 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#31a39c]/20 to-transparent pointer-events-none opacity-40 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#31a39c]/5 rounded-full blur-[100px] pointer-events-none" />

            <Card className="w-full max-w-md bg-[#0a0a0a] border-[#31a39c]/20 shadow-[0_0_50px_-12px_rgba(49,163,156,0.15)] relative z-10">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 relative flex items-center justify-center">
                            <img
                                src="/logo-final.png"
                                alt="Code2Cash"
                                className="h-full w-full object-contain filter invert hue-rotate-180 mix-blend-screen scale-150"
                            />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-white">
                        Admin Login
                    </CardTitle>
                    <CardDescription className="text-white/60">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-md text-center">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white/80">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@code2cash.in"
                                    className="pl-9 bg-[#030303] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#31a39c]/50 focus-visible:border-[#31a39c]/50"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-white/80">Password</Label>
                                <Link
                                    href="/admin/forgot-password"
                                    className="text-xs text-[#31a39c] hover:text-[#31a39c]/80 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-9 pr-9 bg-[#030303] border-white/10 text-white placeholder:text-white/20 focus-visible:ring-[#31a39c]/50 focus-visible:border-[#31a39c]/50"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full bg-[#31a39c] hover:bg-[#31a39c]/90 text-white font-medium h-10 transition-all duration-300 shadow-[0_0_20px_-5px_#31a39c]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
