"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Code, Zap, Shield, Rocket } from "lucide-react";

const defaultCards = [
  {
    icon: <Code className="size-4 text-teal-300" />,
    title: "Custom Development",
    description: "Tailored solutions for your business",
    date: "Available now",
    iconClassName: "text-teal-500",
    titleClassName: "text-teal-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Zap className="size-4 text-teal-300" />,
    title: "Fast Performance",
    description: "Lightning-fast web applications",
    date: "Optimized daily",
    iconClassName: "text-teal-500",
    titleClassName: "text-teal-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Shield className="size-4 text-teal-300" />,
    title: "Secure Solutions",
    description: "Enterprise-grade security built-in",
    date: "Always protected",
    iconClassName: "text-teal-500",
    titleClassName: "text-teal-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export default function DisplayCardsSection() {
  return (
    <div className="min-h-screen bg-[#030303] flex flex-col md:flex-row overflow-x-hidden w-full relative">
      {/* Display Cards - Top on mobile, Right on desktop */}
      <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 py-12 md:py-0 relative z-10">
        <div className="w-full max-w-3xl px-4 md:px-0 scale-75 md:scale-100">
          <DisplayCards cards={defaultCards} />
        </div>
      </div>

      {/* Content - Bottom on mobile, Left on desktop */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 space-y-6 md:space-y-8 order-2 md:order-1 py-8 md:py-0 relative z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Innovative Solutions
        </h2>
        <p className="text-base md:text-xl text-gray-400 max-w-md">
          We create cutting-edge digital experiences that transform your business.
          Our custom solutions are designed to scale and adapt to your unique needs.
        </p>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center space-x-3">
            <Rocket className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
            <span className="text-sm md:text-base text-gray-300">Rapid Development</span>
          </div>
          <div className="flex items-center space-x-3">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
            <span className="text-sm md:text-base text-gray-300">High Performance</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-4 h-4 md:w-5 md:h-5 text-teal-500" />
            <span className="text-sm md:text-base text-gray-300">Enterprise Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
