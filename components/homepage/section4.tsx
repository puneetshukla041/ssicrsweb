"use client";

import Image from "next/image";
import React from "react";
// 1. Import the hook from the library
import { useInView } from "react-intersection-observer";

// Common data structure for card content
const cardsData = [
  {
    title: "Surgeons",
    subtitle:
      "Build advanced skills in multi-specialty robotic surgery and gain global certification.",
    imageSrc: "/Images/homepage/section4/image1.webp", // CHANGED from .png to .webp
  },
  {
    title: "Residents & Fellows",
    subtitle:
      "Access mentorship, training pathways, and exposure to the SSI Mantra platform early in your careers.",
    imageSrc: "/Images/homepage/section4/image5.webp", // CHANGED from .png to .webp
  },

  {
    title: "Anesthesiologists",
    subtitle:
      "Master the unique considerations of anesthesia in robotic surgery for safer patient outcomes.",
    imageSrc: "/Images/homepage/section4/image3.webp", // CHANGED from .png to .webp
  },
  {
    title: "Medical Institutions & Hospitals",
    subtitle:
      "Partner with SSICRS to upskill teams, expand surgical capabilities, and bring world-class robotic care to communities.",
    imageSrc: "/Images/homepage/section4/image4.webp", // CHANGED from .png to .webp
  },
  {
    title: "Surgical Staff",
    subtitle:
      "Learn the essential workflows, patient preparation, and teamwork required in robotic ORs.",
    imageSrc: "/Images/homepage/section4/image2.webp", // CHANGED from .png to .webp
  },
];

// Define the base animation class once
const animationClass = "transition-all duration-1000 ease-out";

export default function FourthSection() {
  // 2. Setup Intersection Observer for the section
  const { ref, inView } = useInView({
    // FIX: Set to false to re-animate every time the user scrolls back into the view
    triggerOnce: false, 
    threshold: 0.001,    // Start animation when 10% of the component is visible
  });

  return (
    // 3. Attach the observer ref to the main section container
    <section 
      ref={ref} 
      className="w-full bg-[#FBFAF2] pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-20 lg:pb-5 flex flex-col items-start justify-start relative"
    >

      {/* =====================================================================================
        RESPONSIVE MOBILE/TABLET/SMALL LAPTOP LAYOUT (Visible on screens LESS THAN md)
        Apply animation classes
        =====================================================================================
      */}
      <div 
        className={`md:hidden w-full flex flex-col items-center justify-center text-center px-6 py-10 gap-12 sm:px-12 sm:py-16 ${animationClass} ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2
          style={{
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                fontStyle: "normal",
                color: "#A67950",
                whiteSpace: "pre-line",
          }}
          className="text-3xl sm:text-4xl" // Responsive font size
        >
          For Whom
        </h2>

        {/* Cards Container: Flexible Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start justify-center gap-12 sm:gap-10 w-full max-w-6xl">
          {cardsData.map((card, index) => (
            // Apply staggered animation to cards
            <div 
              key={index} 
              className={`flex flex-col items-center w-full transition-all duration-1000 ease-out ${
                inView 
                  ? `opacity-100 translate-y-0 delay-[${400 + index * 100}ms]` 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${400 + index * 100}ms` : '0ms' }}
            >
              {/* Image Container */}
              <div className="w-full max-w-sm rounded-xl overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={373}
                  height={378}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>

              {/* Card Content Overlay */}
              <div
                className="mt-[-25px] rounded-lg flex flex-col items-start p-4 w-full max-w-[300px] z-10 shadow-xl mx-auto"
                style={{
                  backgroundColor: "#70493B",
                }}
              >
                <h3
                  className="mt-4 text-white text-lg w-full text-left" 
                  style={{
                    fontFamily: "DM Serif Text, serif",
                    fontWeight: "200",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="mt-2 text-sm text-white leading-tight mb-2 w-full text-left" 
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontWeight: "400",
                  }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================================================
        RESPONSIVE DESKTOP/LAPTOP LAYOUT (Visible on screens md and up)
        Apply animation classes
        =====================================================================================
      */}
      <div 
        className={`hidden md:flex flex-col items-center justify-start w-full px-6 py-16 md:px-12 lg:px-24 xl:px-32 ${animationClass} ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Heading */}
        <div className="max-w-7xl mx-auto w-full">
          <h2
            className="text-3xl sm:text-4xl lg:text-4xl text-center lg:text-left leading-snug mb-6"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontWeight: 400,
              fontStyle: "normal",
              color: "#A67950",
              whiteSpace: "pre-line",
            }}
          >
            For Whom
          </h2>
        </div>

        {/* --- First Row (Surgeons, Residents & Fellows, Anesthesiologists) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 xl:gap-x-12 2xl:gap-x-16 w-full max-w-7xl">
          {cardsData.slice(0, 3).map((card, index) => (
            // Apply staggered animation to cards
            <div
              key={`desktop-row1-${index}`}
              className={`relative flex flex-col items-center transition-all duration-1000 ease-out ${
                inView 
                  ? `opacity-100 translate-y-0 delay-[${400 + index * 150}ms]` 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${400 + index * 150}ms` : '0ms' }}
            >
              {/* Image and Content... (rest of the card structure) */}
              <div className="w-full max-w-xs xl:max-w-sm rounded-xl overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={373}
                  height={378}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>

              {/* Card Content Overlay */}
              <div
                className="absolute bottom-[-15%] md:bottom-[-20%] lg:bottom-[-10%] rounded-lg flex flex-col items-start p-4 w-11/12 max-w-[300px] z-10 shadow-xl mx-auto"
                style={{
                  backgroundColor: "#70493B",
                  height: "111px",
                }}
              >
                <h3
                  className="text-lg text-white mb-1 w-full text-left"
                  style={{ fontFamily: "DM Serif Text, serif", fontWeight: 200 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs text-white leading-tight w-full text-left"
                  style={{ fontFamily: "Lato, sans-serif", fontWeight: 400 }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Second Row (Medical Institutions, Surgical Staff) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-12 2xl:gap-x-16 w-full max-w-4xl mt-[160px] md:mt-[180px] lg:mt-[120px] 2xl:mt-[160px]">
          {cardsData.slice(3, 5).map((card, index) => (
            // Apply staggered animation to cards, continuing the delay
            <div
              key={`desktop-row2-${index}`}
              className={`relative flex flex-col items-center transition-all duration-1000 ease-out ${
                inView 
                  ? `opacity-100 translate-y-0 delay-[${850 + index * 150}ms]` 
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${850 + index * 150}ms` : '0ms' }}
            >
              {/* Image and Content... (rest of the card structure) */}
              <div className="w-full max-w-xs xl:max-w-sm rounded-xl overflow-hidden">
                <Image
                  src={card.imageSrc}
                  alt={card.title}
                  width={373}
                  height={378}
                  layout="responsive"
                  className="rounded-xl"
                />
              </div>

              {/* Card Content Overlay */}
              <div
                className="absolute bottom-[-15%] md:bottom-[-20%] lg:bottom-[-10%] rounded-lg flex flex-col items-start p-4 w-11/12 max-w-[300px] z-10 shadow-xl mx-auto"
                style={{
                  backgroundColor: "#70493B",
                  height: "111px",
                }}
              >
                <h3
                  className="text-lg text-white mb-1 w-full text-left"
                  style={{ fontFamily: "DM Serif Text, serif", fontWeight: 200 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-xs text-white leading-tight w-full text-left"
                  style={{ fontFamily: "Lato, sans-serif", fontWeight: 400 }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}