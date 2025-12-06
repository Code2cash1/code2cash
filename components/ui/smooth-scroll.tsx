"use client";

import { ReactLenis } from "lenis/react";
import { useState, useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            // Check if device is mobile/tablet using window width or matchMedia
            // Increased threshold to include some tablets for better performance
            const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
            const isSmallScreen = window.innerWidth < 1024;
            setIsMobile(isTouchDevice || isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Don't render Lenis on mobile - use native scroll
    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <ReactLenis root options={{
            lerp: 0.08, // Smoother, less jerky than 0.12
            duration: 1.2, // Balanced duration
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        }}>
            {children}
        </ReactLenis>
    );
}
