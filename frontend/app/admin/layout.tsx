"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import { Toaster } from "sonner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const publicRoutes = [
        "/admin/login",
        "/admin/forgot-password",
        "/admin/reset-password",
        "/admin/verify-otp",
    ];

    const isPublicRoute = publicRoutes.some((route) =>
        pathname?.startsWith(route)
    );

    return (
        <>
            {isPublicRoute ? (
                children
            ) : (
                <AuthGuard>{children}</AuthGuard>
            )}
            <Toaster position="top-right" theme="dark" />
        </>
    );
}
