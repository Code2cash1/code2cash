"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            toast.error("Please login to access this page");
            router.push("/admin/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (!authorized) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#31a39c]"></div>
            </div>
        );
    }

    return <>{children}</>;
}
