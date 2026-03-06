// components/programspage/section1.tsx

"use client";

import React from "react";
import Image from "next/image";
// 1. Import useInView
import { useInView } from "react-intersection-observer";

export default function Section1() {
  // 2. Setup observer for the heading container
  const { ref, inView } = useInView({
    // Since this is h-screen, a small threshold (0.01) is fine.
    threshold: 0.01,
    // Setting triggerOnce to false ensures it animates every time it comes into view
    triggerOnce: false,
  });

  // 3. Define animation classes
  const animationClasses = `
    transition-all duration-1000 ease-out 
    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
  `;

  return (
    <section className="w-full h-screen relative overflow-x-hidden">
      {/* Background Image: No animation needed for the background image */}
      <Image
        src="/Images/programs/section1/image1.webp"
        alt="SSI CRS"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Centered Heading Container 
          4. Attach the ref and the animation classes here.
      */}
      <div 
        ref={ref} 
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${animationClasses}`}
      >
        <h1
          className="text-white font-serif mb-6 
            text-3xl sm:text-4xl md:text-5xl lg:text-[64px]
            max-w-4xl mx-auto"
          style={{
            fontFamily: "DM Serif Display, serif",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: 1.2,
          }}
        >
          {/* Heading text remains one continuous line for optimal responsiveness. */}
          Explore Our Robotic Surgery Training Programs
        </h1>
      </div>
    </section>
  );
}
