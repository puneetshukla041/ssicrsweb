"use client";

import Image from "next/image";
import React from "react";
// 1. Import the hook from the library
import { useInView } from "react-intersection-observer";

// Define the base animation class
const animationClass = "transition-all duration-1000 ease-out";

export default function Section6() {
  const imageSrc = "/Images/homepage/section6/image1.webp";

  // 2. Setup Intersection Observer for the section
  const { ref, inView } = useInView({
    // FIX: Set to false so the animation runs every time the component enters the viewport
    triggerOnce: false, 
    threshold: 0.01,    // Start animation when 10% of the component is visible
  });

  return (
    // 3. Attach the observer ref to the main section container
    <section ref={ref} className="w-full flex justify-center items-center relative bg-white">
      
      {/* Desktop & Laptop View (visible on md and up) */}
      <div className="hidden md:flex relative w-full justify-center">
        <Image
          src={imageSrc}
          alt="Fifth Section Image"
          width={1906} 
          height={124}
          className="object-contain w-full"
        />

        {/* Content Wrapper - Apply animation classes */}
        <div 
          className={`absolute inset-0 flex flex-col justify-center items-center text-center ${animationClass} ${
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-white"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: "400",
              fontSize: "48px",
              lineHeight: "1.2",
            }}
          >
            Aligned with Core Mission<br />
            Each option references key SSICRS values—expert<br />training, accessibility, innovation.
          </h2>
        </div>
      </div>

      {/* Mobile & Tablet View (responsive below md) */}
      <div className="flex md:hidden relative w-full min-h-[300px] sm:min-h-[350px]">
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt="Mobile Background"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Centered Text - Apply animation classes */}
        <div 
          className={`relative z-20 flex flex-col justify-center items-center text-center w-full px-4 sm:px-6 ${animationClass} ${
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-white text-2xl sm:text-[28px] md:text-[32px] lg:text-[36px] leading-snug sm:leading-tight"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: "400",
            }}
          >
            Aligned with Core Mission<br />
            Each option references key SSICRS values—expert<br />training, accessibility, innovation.
          </h2>
        </div>
      </div>
    </section>
  );
}
