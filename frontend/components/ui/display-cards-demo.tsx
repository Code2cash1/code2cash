"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, Code, Zap, Shield } from "lucide-react";

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

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20 bg-[#030303]">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
