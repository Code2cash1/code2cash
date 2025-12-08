"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    useCarousel,
    CarouselProvider
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Program {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
}

function CarouselButtons() {
    const { index, setIndex, itemsCount, visibleItemsCount } = useCarousel();
    const maxIndex = Math.max(0, itemsCount - visibleItemsCount);

    return (
        <div className="flex gap-4 mt-8 md:mt-0">
            <Button
                variant="outline"
                size="icon"
                onClick={() => index > 0 && setIndex(index - 1)}
                disabled={index === 0}
                className="h-12 w-12 rounded-full border-[#31a39c]/30 text-white hover:bg-[#31a39c]/10 hover:text-[#31a39c] bg-transparent transition-all duration-300 disabled:opacity-30"
            >
                <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
                variant="outline"
                size="icon"
                onClick={() => index < maxIndex && setIndex(index + 1)}
                disabled={index >= maxIndex}
                className="h-12 w-12 rounded-full border-[#31a39c]/30 text-white hover:bg-[#31a39c]/10 hover:text-[#31a39c] bg-transparent transition-all duration-300 disabled:opacity-30"
            >
                <ChevronRight className="h-6 w-6" />
            </Button>
        </div>
    );
}

export default function GalleryHoverCarousel({
    heading = "Code2Cash Internship Program"
}: {
    heading?: string;
}) {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/programs`);
                const data = await res.json();
                setPrograms(data);
            } catch (error) {
                console.error("Failed to fetch programs", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPrograms();
    }, []);

    if (isLoading) {
        return (
            <section className="py-24 bg-[#030303] relative overflow-hidden">
                <div className="container mx-auto px-6 text-center text-white/50">
                    Loading Programs...
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-[#030303] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#31a39c]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <CarouselProvider>
                    <div className="mb-12 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16">
                        <div className="max-w-3xl">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                {heading}{" "}
                                <span className="block mt-4 text-white/50 text-base sm:text-lg lg:text-xl font-normal max-w-2xl">
                                    Join our elite internship program and work on real-world projects.
                                    Shape the future of technology with <span className="text-[#31a39c]">Code2Cash</span>.
                                </span>
                            </h3>
                        </div>
                        <CarouselButtons />
                    </div>

                    <div className="w-full max-w-full">
                        <CarouselContent className="hide-scrollbar w-full max-w-full md:ml-4 md:-mr-4 gap-6">
                            {programs.map((item) => (
                                <CarouselItem key={item._id} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3 max-w-[400px]">
                                    <Link href={`/careers/${item._id}`} className="group block relative w-full h-[400px]">
                                        <Card className="overflow-hidden h-full w-full rounded-3xl border border-white/10 bg-[#0a0a0a] group-hover:border-[#31a39c]/50 transition-colors duration-500">
                                            {/* Image */}
                                            <div className="relative h-full w-full transition-all duration-700 group-hover:h-3/5">
                                                <Image
                                                    width={400}
                                                    height={400}
                                                    src={item.imageUrl || "/images/programs/frontend.png"}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                                />
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                                                {/* Initial Text Overlay */}
                                                <div className="absolute bottom-6 left-6 right-6 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                                    <div className="h-1 w-12 bg-[#31a39c] rounded-full" />
                                                </div>
                                            </div>

                                            {/* Hover Text Section */}
                                            <div className="absolute bottom-0 left-0 w-full p-5 h-1/2 flex flex-col justify-start pt-2 bg-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                                <h3 className="text-xl font-bold text-[#31a39c] mb-2">{item.title}</h3>
                                                <p className="text-white/60 text-xs leading-relaxed mb-3 line-clamp-3">
                                                    {item.description}
                                                </p>

                                                <div className="mt-auto w-full">
                                                    <Button
                                                        size="sm"
                                                        className="w-full h-9 bg-[#31a39c] text-white hover:bg-[#288a84] transition-colors rounded-full font-medium text-xs"
                                                    >
                                                        View Program
                                                        <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </div>
                </CarouselProvider>
            </div>
        </section>
    );
}
