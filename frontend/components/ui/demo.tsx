'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { useEffect, useState } from "react";

export function SplineSceneBasic() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Card className="w-full min-h-[600px] md:h-[500px] bg-transparent border-0 relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />

      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center order-2 md:order-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-center md:text-left">
            About Code2Cash
          </h1>
          <p className="mt-4 text-white/60 leading-relaxed text-center md:text-left text-sm md:text-base">
            Code2Cash is a premier web solutions provider based in India, specializing in transforming digital visions into reality.
            Founded with a mission to empower businesses through technology, we've successfully delivered over 1000+ projects
            for clients worldwide. Our team of 50+ expert developers, designers, and digital strategists work tirelessly to create
            innovative solutions that drive measurable results and business growth.
          </p>
          <div className="mt-6 space-y-3 flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#31a39c] rounded-full"></div>
              <div>
                <span className="text-white/80 text-sm md:text-base font-semibold">Innovation & Excellence</span>
                <p className="text-white/50 text-xs md:text-sm mt-1">Pushing boundaries with cutting-edge solutions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#31a39c] rounded-full"></div>
              <div>
                <span className="text-white/80 text-sm md:text-base font-semibold">Cutting-edge Technology</span>
                <p className="text-white/50 text-xs md:text-sm mt-1">Latest frameworks and modern development practices</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#31a39c] rounded-full"></div>
              <div>
                <span className="text-white/80 text-sm md:text-base font-semibold">Client Success Focus</span>
                <p className="text-white/50 text-xs md:text-sm mt-1">98% success rate with long-term partnerships</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-[#31a39c] rounded-full"></div>
              <div>
                <span className="text-white/80 text-sm md:text-base font-semibold">24/7 Support</span>
                <p className="text-white/50 text-xs md:text-sm mt-1">Round-the-clock assistance and maintenance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right content - 3D Scene or Fallback */}
        <div className="flex-1 relative h-[300px] md:h-auto order-1 md:order-2">
          {isMobile ? (
            // Lightweight fallback for mobile
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#31a39c]/20 to-transparent rounded-lg">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#31a39c]/30 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#31a39c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <p className="text-[#31a39c] font-semibold">Code2Cash</p>
                <p className="text-white/40 text-xs mt-2">Premium Web Solutions</p>
              </div>
            </div>
          ) : (
            // Full 3D scene for desktop
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </Card>
  )
}

