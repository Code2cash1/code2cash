"use client";

import Link from "next/link";
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { MobileNavMenu } from "@/components/ui/mobile-nav-menu";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { SplineSceneBasic } from "@/components/ui/demo";
import { FeatureDemo } from "@/components/ui/feature-demo";
import { Feature108Demo } from "@/components/ui/feature108-demo";
import { OurVision } from "@/components/ui/our-vision";
import { CodeShowcaseDemo } from "@/components/ui/code-showcase-demo";
import { DisplayCardsDemo } from "@/components/ui/display-cards-demo";
import DisplayCardsSection from "@/components/ui/orbital-timeline-section";
import TechStackMarqueeNew from "@/components/ui/tech-stack-marquee-new";
import { ShuffleCards } from "@/components/ui/testimonial-demo-final";
import { SplineCallToAction } from "@/components/ui/3d-call-to-action";
import { TestimonialsSectionDemo } from "@/components/ui/testimonials-section-demo";
import { LampSection } from "@/components/ui/lamp-section-demo";
import { ContactSectionDemo } from "@/components/ui/contact-section-demo";
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <>
      {/* Logo - Scrollable with page - ALIGNED WITH HEADER & LARGE (Negative top for tight fit) */}
      <div className="absolute -top-6 left-2 md:-top-10 md:left-6 z-50">
        <Link href="/" className="group flex items-start gap-3">
          <div className="h-48 w-auto md:h-52 md:w-auto flex items-center justify-start transition-transform group-hover:scale-105">
            <img
              src="/logo-final.png"
              alt="Code2Cash"
              className="h-full w-auto object-contain filter invert hue-rotate-180 mix-blend-screen origin-top-left"
            />
          </div>
        </Link>
      </div>

      {/* Navbar */}
      <Code2CashNavbar />

      <main className="min-h-screen bg-[#030303] pt-16 md:pt-20 relative pb-24 md:pb-0 overflow-x-hidden w-full max-w-[100vw]">
        <HeroGeometric
          badge="Code2Cash - where technology meets excellence"
          title1="Transform Your Digital Vision"
          title2="Into Reality"
        />

        {/* About Section with 3D */}
        <section id="about" className="py-12 md:py-24 bg-[#030303] overflow-x-hidden w-full">
          <div className="container mx-auto px-4 md:px-6 max-w-full">
            <SplineSceneBasic />
          </div>
        </section>

        {/* Feature Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full">
          <FeatureDemo />
        </section>

        {/* Services Section */}
        <section id="services" className="bg-[#030303] overflow-x-hidden w-full">
          <Feature108Demo />
        </section>

        {/* Our Vision Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full">
          <OurVision />
        </section>

        {/* Code Showcase Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full">
          <CodeShowcaseDemo />
        </section>

        {/* Display Cards Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full">
          <DisplayCardsSection />
        </section>

        {/* Testimonial Cards Section - Careers */}
        <section id="careers" className="bg-[#030303] overflow-x-hidden w-full">
          <ShuffleCards />
        </section>

        {/* Tech Stack Marquee Section */}
        <section id="tech-stack" className="bg-[#030303] overflow-x-hidden w-full">
          <TechStackMarqueeNew />
        </section>

        {/* 3D Call To Action Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5">
          <SplineCallToAction />
        </section>

        {/* Testimonials Marquee Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5">
          <TestimonialsSectionDemo />
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5">
          <ContactSectionDemo />
        </section>

        {/* Lamp Section */}
        <section className="bg-[#030303] overflow-x-hidden w-full">
          <LampSection />
        </section>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Mobile Navigation Menu */}
      <MobileNavMenu />
    </>
  );
}
