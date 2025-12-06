"use client";

import { useState } from "react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface FeatureItem {
    id: number;
    title: string;
    image: string;
    description: string;
}

interface FeatureAccordionProps {
    features: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
    {
        id: 1,
        title: "Ready-to-Use UI Blocks",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2669&auto=format&fit=crop",
        description:
            "Browse through our extensive collection of pre-built UI blocks designed with shadcn/ui. Each block is carefully crafted to be responsive, accessible, and easily customizable. Simply copy and paste the code into your project.",
    },
    // Add other defaults if needed, but we will pass props mostly
];

const FeatureAccordion = ({ features = defaultFeatures }: FeatureAccordionProps) => {
    const [activeTabId, setActiveTabId] = useState<number | null>(features[0]?.id || 1);
    const [activeImage, setActiveImage] = useState(features[0]?.image || "");

    // Update active image when features change (e.g. page navigation)
    // But we want to keep it interactive. 
    // Initial state covers the first render. 

    return (
        <section className="py-20 w-full">
            <div className="container mx-auto px-4">
                <div className="flex w-full flex-col-reverse lg:flex-row items-start justify-between gap-12">
                    <div className="w-full lg:w-1/2">
                        <Accordion type="single" className="w-full" defaultValue={`item-${features[0]?.id}`}>
                            {features.map((tab) => (
                                <AccordionItem key={tab.id} value={`item-${tab.id}`} className="border-white/10">
                                    <AccordionTrigger
                                        onClick={() => {
                                            setActiveImage(tab.image);
                                            setActiveTabId(tab.id);
                                        }}
                                        className="cursor-pointer py-5 !no-underline transition group"
                                    >
                                        <h6
                                            className={`text-xl font-semibold transition-colors duration-300 ${tab.id === activeTabId ? "text-[#31a39c]" : "text-white/70 group-hover:text-white"}`}
                                        >
                                            {tab.title}
                                        </h6>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="mt-3 text-white/60 leading-relaxed text-base">
                                            {tab.description}
                                        </p>
                                        <div className="mt-4 md:hidden">
                                            <img
                                                src={tab.image}
                                                alt={tab.title}
                                                className="h-full max-h-60 w-full rounded-xl object-cover border border-white/10"
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                    <div className="relative m-auto hidden w-full lg:w-1/2 overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 md:block aspect-[4/3]">
                        {/* Image with transition could be added here for smoothness */}
                        <img
                            src={activeImage}
                            alt="Feature preview"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { FeatureAccordion };
