"use client";

import { Target, Lightbulb, Rocket, Users } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function OurVision() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="py-24 bg-[#030303] relative overflow-hidden">
            {/* Background gradient effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#31a39c]/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#31a39c]/30 bg-[#31a39c]/10 backdrop-blur-sm">
                        <Target className="h-4 w-4 text-[#31a39c]" />
                        <span className="text-sm font-medium text-[#31a39c]">Our Vision</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                        Building the Future of
                        <span className="block bg-gradient-to-r from-[#31a39c] to-[#2a8a84] bg-clip-text text-transparent">
                            Digital Excellence
                        </span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        We envision a world where technology empowers businesses to achieve their full potential through innovative digital solutions.
                    </p>
                </div>

                {/* Vision Grid */}
                <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
                    <GridItem
                        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                        icon={<Target className="h-4 w-4" />}
                        title="Empowering Innovation"
                        description="We strive to be at the forefront of technological innovation, delivering cutting-edge solutions that transform businesses and drive growth in the digital age."
                        isMobile={isMobile}
                    />
                    <GridItem
                        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                        icon={<Lightbulb className="h-4 w-4" />}
                        title="Client-Centric Excellence"
                        description="Our vision is to create lasting partnerships by understanding unique business needs and delivering tailored solutions that exceed expectations every time."
                        isMobile={isMobile}
                    />
                    <GridItem
                        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                        icon={<Rocket className="h-4 w-4" />}
                        title="Sustainable Growth"
                        description="We believe in building scalable, future-proof solutions that grow with your business, ensuring long-term success and adaptability in an ever-changing digital landscape."
                        isMobile={isMobile}
                    />
                    <GridItem
                        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                        icon={<Users className="h-4 w-4" />}
                        title="Global Impact"
                        description="From India to the world, we aim to make a global impact by delivering world-class digital solutions that set new standards in quality and innovation."
                        isMobile={isMobile}
                    />
                    <GridItem
                        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                        icon={<Lightbulb className="h-4 w-4" />}
                        title="Continuous Learning"
                        description="We're committed to staying ahead of the curve, constantly learning and adapting to new technologies to provide the best solutions for our clients."
                        isMobile={isMobile}
                    />
                </ul>
            </div>
        </section>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    isMobile: boolean;
}

const GridItem = ({ area, icon, title, description, isMobile }: GridItemProps) => {
    return (
        <li className={cn("min-h-[14rem] list-none", area)}>
            <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 group hover:border-[#31a39c]/50 transition-all duration-300">
                {!isMobile && (
                    <GlowingEffect
                        spread={40}
                        glow={true}
                        disabled={false}
                        proximity={80}
                        inactiveZone={0.01}
                        borderWidth={2}
                        movementDuration={1.5}
                    />
                )}
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6 group-hover:bg-[#31a39c]/5 transition-all duration-300">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2 group-hover:border-[#31a39c]/50 group-hover:bg-[#31a39c]/10 transition-all duration-300">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground group-hover:text-[#31a39c] transition-colors duration-300">
                                {title}
                            </h3>
                            <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
