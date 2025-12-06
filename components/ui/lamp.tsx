"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function LampDemo() {
    return (
        <LampContainer>
            <motion.h1
                initial={{ opacity: 0.5, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
            >
                We Light The Way <br /> To Your Success
            </motion.h1>
        </LampContainer>
    );
}

export const LampContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const lampWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["15rem", "35rem", "15rem"]);
    const lampOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
    const lampY = useTransform(scrollYProgress, [0, 0.5, 1], ["0rem", "-2rem", "0rem"]);

    // Additional decorative elements transformations
    const orbWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["8rem", "20rem", "8rem"]);
    const lineWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["15rem", "35rem", "15rem"]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [45, 0, -45]); // Subtle rotation for dynamic feel? No, maybe simpler is better.

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030303] w-full rounded-md z-0",
                className
            )}
        >
            <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
                <motion.div
                    style={{
                        opacity: lampOpacity,
                        width: lampWidth,
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute inset-auto right-1/2 h-56 overflow-visible bg-gradient-conic from-[#31a39c] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
                >
                    <div className="absolute  w-[100%] left-0 bg-[#030303] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                    <div className="absolute  w-40 h-[100%] left-0 bg-[#030303]  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
                </motion.div>
                <motion.div
                    style={{
                        opacity: lampOpacity,
                        width: lampWidth,
                        backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
                    }}
                    className="absolute inset-auto left-1/2 h-56 bg-gradient-conic from-transparent via-transparent to-[#31a39c] text-white [--conic-position:from_290deg_at_center_top]"
                >
                    <div className="absolute  w-40 h-[100%] right-0 bg-[#030303]  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
                    <div className="absolute  w-[100%] right-0 bg-[#030303] h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
                </motion.div>
                <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-[#030303] blur-2xl"></div>
                <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
                <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-[#31a39c] opacity-50 blur-3xl"></div>
                <motion.div
                    style={{
                        width: orbWidth,
                    }}
                    className="absolute inset-auto z-30 h-36 -translate-y-[6rem] rounded-full bg-[#31a39c] blur-2xl"
                ></motion.div>
                <motion.div
                    style={{
                        width: lineWidth,
                    }}
                    className="absolute inset-auto z-50 h-0.5 -translate-y-[7rem] bg-[#31a39c] "
                ></motion.div>

                <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-[#030303] "></div>
            </div>

            <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
                {children}
            </div>
        </div>
    );
};
