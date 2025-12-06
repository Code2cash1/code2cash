"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { MobileNavMenu } from "@/components/ui/mobile-nav-menu";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

// Heavy 3D/Canvas components loaded dynamically
const SplineSceneBasic = dynamic(() => import("@/components/ui/demo").then(mod => mod.SplineSceneBasic), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-transparent" />
});

const FeatureDemo = dynamic(() => import("@/components/ui/feature-demo").then(mod => mod.FeatureDemo));
const Feature108Demo = dynamic(() => import("@/components/ui/feature108-demo").then(mod => mod.Feature108Demo), { ssr: false });
const OurVision = dynamic(() => import("@/components/ui/our-vision").then(mod => mod.OurVision));
const CodeShowcaseDemo = dynamic(() => import("@/components/ui/code-showcase-demo").then(mod => mod.CodeShowcaseDemo));
const DisplayCardsDemo = dynamic(() => import("@/components/ui/display-cards-demo").then(mod => mod.DisplayCardsDemo));
const DisplayCardsSection = dynamic(() => import("@/components/ui/orbital-timeline-section"));
const TechStackMarqueeNew = dynamic(() => import("@/components/ui/tech-stack-marquee-new"));
const ShuffleCards = dynamic(() => import("@/components/ui/testimonial-demo-final").then(mod => mod.ShuffleCards));
const SplineCallToAction = dynamic(() => import("@/components/ui/3d-call-to-action").then(mod => mod.SplineCallToAction), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-transparent" />
});
const TestimonialsSectionDemo = dynamic(() => import("@/components/ui/testimonials-section-demo").then(mod => mod.TestimonialsSectionDemo));
const LampSection = dynamic(() => import("@/components/ui/lamp-section-demo").then(mod => mod.LampSection), {
  ssr: false
});
const ContactSectionDemo = dynamic(() => import("@/components/ui/contact-section-demo").then(mod => mod.ContactSectionDemo));
import { Footer } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <>


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
