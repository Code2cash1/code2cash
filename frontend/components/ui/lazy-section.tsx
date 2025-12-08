"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    className?: string;
    rootMargin?: string;
    fallback?: ReactNode;
}

export function LazySection({
    children,
    className = "",
    rootMargin = "800px",
    fallback = null
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Disconnect immediately after loading
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold: 0.001, // Very low threshold for earlier detection
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin]);

    return (
        <div ref={sectionRef} className={className}>
            {isVisible ? children : (fallback || <div className="w-full h-[400px]" />)}
        </div>
    );
}
