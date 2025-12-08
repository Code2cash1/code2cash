"use client";

import { FileText, Award, Medal, Shirt, Presentation, Briefcase } from "lucide-react";
import { StardustButton } from "@/components/ui/stardust-button";
import { useRouter } from "next/navigation";

const perks = [
    {
        icon: FileText,
        title: "Official Offer Letter",
        description: "Kickstart your professional journey with a formal offer letter welcoming you to the team."
    },
    {
        icon: Award,
        title: "Letter of Recommendation",
        description: "Stand out with a Letter of Recommendation awarded to top performers, endorsing your skills."
    },
    {
        icon: Medal,
        title: "Completion Certificate",
        description: "Earn a verified certificate upon successful completion to validate your internship experience."
    },
    {
        icon: Shirt,
        title: "Exclusive Merchandise",
        description: "Get your hands on cool Code2Cash swag and merchandise to show off your community spirit."
    },
    {
        icon: Presentation,
        title: "Expert Trainings",
        description: "Learn directly from industry experts through dedicated training sessions and mentorship."
    },
    {
        icon: Briefcase,
        title: "Real-World Projects",
        description: "Gain invaluable hands-on experience by working on live, impactful projects from day one."
    }
];

export default function InternshipPerks() {
    const router = useRouter();

    const handleVerifyCertificate = () => {
        // Navigate to certificate verification page
        router.push('/careers/verify-certificate');
    };

    return (
        <section className="py-20 relative px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Program <span className="text-[#31a39c]">Benefits</span>
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Discover what makes the Code2Cash Internship Program a career-defining experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {perks.map((perk, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#31a39c]/50 hover:bg-[#31a39c]/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-[#31a39c]/20 flex items-center justify-center mb-6 text-[#31a39c] group-hover:scale-110 transition-transform duration-300">
                                    <perk.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#31a39c] transition-colors">
                                    {perk.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {perk.description}
                                </p>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#31a39c]/0 via-[#31a39c]/5 to-[#31a39c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Verify Certificate Button */}
                <div className="flex justify-center mt-16">
                    <StardustButton
                        onClick={handleVerifyCertificate}
                        className="transform hover:scale-105 transition-transform"
                    >
                        Verify Your Certificates Now
                    </StardustButton>
                </div>
            </div>
        </section>
    );
}
