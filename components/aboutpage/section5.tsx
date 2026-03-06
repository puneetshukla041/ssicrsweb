// components/aboutus/Section9.tsx
"use client";

import Image from "next/image";
import React from "react";
// 1. Import useInView from react-intersection-observer
import { useInView } from "react-intersection-observer";

interface Section2Props {
  children?: React.ReactNode;
}

interface LogoItem {
  src: string;
  heading: string; // HTML allowed
  text: React.ReactNode;
  textColor?: string;
}

export default function Section9({ children }: Section2Props) {
  const logos: LogoItem[] = [
    {
      src: "/Images/aboutpage/section5/bottomlogo1.webp",
      heading: "Expert-Led Faculty &<br>Mentorship",
      text: (
        <>
          Learn from top robotic surgeons and surgical technologists.
        </>
      ),
      textColor: "#A67950",
    },
    {
      src: "/Images/aboutpage/section5/bottomlogo2.webp",
      heading: "Live Surgery Observations&  Teleproctoring",
      text: (
        <>
          Experience real-world procedures remotely.
        </>
      ),
      textColor: "#A67950",
    },
    {
      src: "/Images/aboutpage/section5/bottomlogo3.webp",
      heading: "Engineering-Integrated <br>Learning",
      text: (
        <>
          Understand robotic mechanics alongside clinical applications.
        </>
      ),
      textColor: "#A67950",
    },
    {
      src: "/Images/aboutpage/section5/bottomlogo4.webp",
      heading: "Comprehensive Post-Training Support",
      text: (
        <>
          Access digital resources, case discussions, and ongoing mentorship.
        </>
      ),
      textColor: "#A67950",
    },
  ];

  const headingStyle: React.CSSProperties = {
    color: "#5B102B",
    fontFamily: "DM Serif Text",
    fontSize: "clamp(16px, 2vw, 20px)",
    fontWeight: 400,
    lineHeight: 1.4,
    textAlign: "center",
    marginBottom: "8px",
  };

  // 2. Setup observer for the main heading/text block
  const { ref: headerRef, inView: headerInView } = useInView({
    // Trigger once the element is 10% visible
    threshold: 0.1,
    // Setting triggerOnce to false ensures it animates every time it comes into view
    triggerOnce: false, 
  });
  
  // 3. Setup observer for the entire logos grid
  const { ref: logosRef, inView: logosInView } = useInView({
    threshold: 0.01,
    triggerOnce: false, 
  });
  
  return (
<section 
  className="w-full bg-[#FBFAF2] flex flex-col justify-center min-h-[85vh]" // use flex for perfect centering
>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-10 lg:pt-1 lg:pb-16 w-full">
    {children && <div className="w-full h-full">{children}</div>}

    {/* Main Heading Block */}
    <div 
      ref={headerRef} 
      className={`transition-all duration-700 ease-out flex flex-col items-center md:items-start ${
        headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Main Heading */}
      <h2
        className="text-3xl sm:text-4xl lg:text-4xl text-center md:text-left leading-snug"
        style={{
          fontFamily: "'DM Serif Display', serif",
          fontWeight: 400,
          color: "#A67950",
          whiteSpace: "pre-line",
          marginBottom: "1.5rem",
          marginLeft: "-30px",
        }}
      >
        Our Approach
      </h2>

      {/* Subtext */}
      <div
        className="text-center md:text-left text-[#401323] font-sans"
        style={{
          fontSize: "clamp(14px, 1.5vw, 16px)",
          lineHeight: 1.6,
          marginLeft: "-30px",
        }}
      >
        SSICRS is equipped with world-class infrastructure, combining theoretical education with practical,
        <br className="hidden md:inline-block" />
        hands-on experience. Our training approach includes:
      </div>
    </div>

    {/* Logos Section - Updated for White Curved Cards */}
    <div 
      ref={logosRef} 
      className={`w-full flex justify-center md:justify-start mt-14 transition-all duration-700 delay-200 ease-out ${
        logosInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4 sm:gap-x-10 md:gap-x-8 lg:gap-x-12 w-full">
        {logos.map((logo, index) => (
          <div
            key={index}
            // The outer container for the animation delay
            className="flex flex-col items-center text-center transition-transform duration-700 ease-out"
            style={{
              transitionDelay: logosInView ? `${index * 50}ms` : "0ms",
            }}
          >
            {/* The new White Curved Card container */}
            <div 
                className="w-full h-full bg-white rounded-xl shadow-lg flex flex-col items-center p-4 sm:p-6 lg:p-8 transform hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            >
                <Image
                    src={logo.src}
                    alt={`Logo ${index + 1}`}
                    width={48}
                    height={50}
                    className="mt-2 mb-4 relative z-10"
                />

                <div
                    dangerouslySetInnerHTML={{ __html: logo.heading }}
                    style={{
                        ...headingStyle, // Use the existing heading style
                        marginBottom: "10px", // Increased margin for better spacing
                    }}
                />

                <p
                    className="font-lato font-normal text-xs sm:text-sm md:text-base leading-snug"
                    style={{ color: logo.textColor }}
                >
                    {logo.text}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

  );
}