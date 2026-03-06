"use client";

import React from "react";
import Image from "next/image";
// 1. Import the hook from the library
import { useInView } from "react-intersection-observer";

// Define the base animation class
const animationClass = "transition-all duration-1000 ease-out";

export default function Section1() {
  // 2. Setup Intersection Observer for the section
  const { ref, inView } = useInView({
    // FIX: Set to false so the animation runs every time the component enters the viewport
    triggerOnce: false, 
    // FIX: Set threshold to 0.01 (1%) as requested
    threshold: 0.01,    
  });

  return (
    // 3. Attach the observer ref to the main section container
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      {/* Background Image: Uses Next.js Image component with fill and object-cover for full responsiveness. */}
      <Image
        src="/Images/aboutpage/section1/section1.webp"
        alt="puneet shukla"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Centered Content Container - Apply animation classes */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 z-10 ${animationClass} ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1
          className="
            text-white 
            text-[28px] sm:text-[36px] md:text-[56px] lg:text-[72px] 
            mb-4 sm:mb-6 md:mb-8 leading-snug md:leading-tight lg:leading-tight
            max-w-5xl
          "
          // Font style and weight preserved as requested
          style={{
            fontFamily: "DM Serif Display, serif",
            fontWeight: 400,
          }}
        >
          Global Excellence in <br className="hidden sm:block" /> Robotic Surgery Training
        </h1>

        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            lineHeight: "1.5",
          }}
          className="
            text-white
            mt-5
            text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
            px-2 sm:px-8 md:px-16
          "
        >
          Expanding access to cutting-edge education, from established centers to underserved regions.
        </p>
      </div>
    </section>
  );
}
