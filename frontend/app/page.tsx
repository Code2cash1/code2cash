"use client";

import dynamic from "next/dynamic";
import { Code2CashNavbar } from "@/components/ui/code2cash-navbar";
import { MobileNavMenu } from "@/components/ui/mobile-nav-menu";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { LazySection } from "@/components/ui/lazy-section";
import { useEffect, useState } from "react";

// ULTRA PERFORMANCE: All heavy components with SSR disabled
const SplineSceneBasic = dynamic(() => import("@/components/ui/demo").then(mod => mod.SplineSceneBasic), {
  ssr: false,
});

const FeatureDemo = dynamic(() => import("@/components/ui/feature-demo").then(mod => mod.FeatureDemo), {
  ssr: false
});

const Feature108Demo = dynamic(() => import("@/components/ui/feature108-demo").then(mod => mod.Feature108Demo), {
  ssr: false
});

const OurVision = dynamic(() => import("@/components/ui/our-vision").then(mod => mod.OurVision), {
  ssr: false
});

const CodeShowcaseDemo = dynamic(() => import("@/components/ui/code-showcase-demo").then(mod => mod.CodeShowcaseDemo), {
  ssr: false
});

const DisplayCardsSection = dynamic(() => import("@/components/ui/orbital-timeline-section"), {
  ssr: false
});

const TechStackMarqueeNew = dynamic(() => import("@/components/ui/tech-stack-marquee-new"), {
  ssr: false
});

const ShuffleCards = dynamic(() => import("@/components/ui/testimonial-demo-final").then(mod => mod.ShuffleCards), {
  ssr: false
});

const SplineCallToAction = dynamic(() => import("@/components/ui/3d-call-to-action").then(mod => mod.SplineCallToAction), {
  ssr: false,
});

const TestimonialsSectionDemo = dynamic(() => import("@/components/ui/testimonials-section-demo").then(mod => mod.TestimonialsSectionDemo), {
  ssr: false
});

const LampSection = dynamic(() => import("@/components/ui/lamp-section-demo").then(mod => mod.LampSection), {
  ssr: false
});

const ContactSectionDemo = dynamic(() => import("@/components/ui/contact-section-demo").then(mod => mod.ContactSectionDemo), {
  ssr: false
});

import { Footer } from "@/components/ui/footer-section";

export default function Home() {
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
    <>
      <Code2CashNavbar />

      <main className="min-h-screen bg-[#030303] pt-16 md:pt-20 relative pb-24 md:pb-0 overflow-x-hidden w-full max-w-[100vw]">
        {/* Hero - ONLY thing that loads immediately */}
        <HeroGeometric
          badge="Code2Cash - where technology meets excellence"
          title1="Transform Your Digital Vision"
          title2="Into Reality"
        />

        {/* About Section - 3D on Desktop, Text on Mobile */}
        <div id="about" className="w-full">
          <LazySection className="py-12 md:py-24 bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
            <section>
              {!isMobile ? (
                <div className="container mx-auto px-4 md:px-6 max-w-full">
                  <SplineSceneBasic />
                </div>
              ) : (
                <div className="container mx-auto px-4 pt-4">
                  {/* Mobile About Content */}
                  <div className="space-y-4 text-center">
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                      About Code2Cash
                    </h2>
                    <p className="text-white/60 max-w-md mx-auto">
                      We are a premier platform bridging the gap between top-tier developer talent and global opportunities. Join us to transform your digital vision into reality.
                    </p>
                  </div>
                </div>
              )}
            </section>
          </LazySection>
        </div>

        {/* Features */}
        <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1000px">
          <section><FeatureDemo /></section>
        </LazySection>

        {/* Services */}
        <div id="services" className="w-full">
          <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1000px">
            <Feature108Demo />
          </LazySection>
        </div>

        {/* Our Vision - Simplified on mobile */}
        <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1000px">
          <section><OurVision /></section>
        </LazySection>

        {/* Code Showcase - Desktop only */}
        {!isMobile && (
          <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
            <section><CodeShowcaseDemo /></section>
          </LazySection>
        )}

        {/* Display Cards - Desktop only */}
        {!isMobile && (
          <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
            <section><DisplayCardsSection /></section>
          </LazySection>
        )}

        {/* Careers - Simplified */}
        <div id="careers" className="w-full">
          <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
            <ShuffleCards />
          </LazySection>
        </div>

        {/* Tech Stack */}
        <div id="tech-stack" className="w-full">
          <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
            <TechStackMarqueeNew />
          </LazySection>
        </div>

        {/* 3D CTA */}
        <LazySection className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5" rootMargin="1500px">
          <section><SplineCallToAction /></section>
        </LazySection>

        {/* Testimonials - Desktop only */}
        {!isMobile && (
          <LazySection className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5" rootMargin="1200px">
            <section><TestimonialsSectionDemo /></section>
          </LazySection>
        )}

        {/* Contact */}
        <div id="contact" className="w-full">
          <LazySection className="bg-[#030303] overflow-x-hidden w-full border-t border-white/5" rootMargin="1000px">
            <ContactSectionDemo />
          </LazySection>
        </div>

        {/* Lamp */}
        <LazySection className="bg-[#030303] overflow-x-hidden w-full" rootMargin="1200px">
          <section><LampSection /></section>
        </LazySection>
      </main>

      <Footer />
      <MobileNavMenu />
    </>
  );
}
