"use client";

import React from "react";
import Image from "next/image";
// 1. Import useInView
import { useInView } from "react-intersection-observer";

// Data definitions (kept outside for clarity)
const logos = [
  "/Logos/Programs/section2/bottomlogo1.png",
  "/Logos/Programs/section2/bottomlogo2.png",
  "/Logos/Programs/section2/bottomlogo3.png",
  "/Logos/Programs/section2/bottomlogo4.png",
];

const containers = [
  {
    logoIndex: 0,
    title: "Surgeon Training",
    paragraph:
      "Master advanced robotic techniques across cardiac, urology, gynecology, thoracic, GI, colorectal, oncology, and head & neck specialties.",
  },
  {
    logoIndex: 1,
    title: "Residents & Fellows",
    paragraph:
      "Early exposure to robotic platforms with structured mentorship and research opportunities — shaping tomorrow's surgical leaders.",
  },
  {
    logoIndex: 2,
    title: "Surgical Staff Training",
    paragraph:
      "Learn essential OR workflows, system setup, and patient preparation.",
  },
  {
    logoIndex: 3,
    title: "Anesthesia Training",
    paragraph:
      "Specialized modules cover patient positioning, insufflation, and safety protocols unique to robotic-assisted surgery.",
  },
];

// 4. Animation classes for Heading/Image block (Fade up)
const fadeUpClasses = (isInView: boolean) =>
  `transition-all duration-700 ease-out ${
    isInView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`;

// --- FIX: Separate component for individual cards ---
interface ProgramCardProps {
  item: typeof containers[0];
  logoSrc: string;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ item, logoSrc, index }) => {
  // 5. useInView is now correctly called at the top level of this functional component
  const { ref: cardRef, inView: cardInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Calculate staggered delay
  const delay = index * 150;

  return (
    <div
      key={index}
      ref={cardRef} // 6. Attach the card's ref
      className={`flex-shrink-0 rounded-[8px] border-2 border-transparent
                  bg-white shadow-md hover:shadow-lg
                  relative cursor-pointer transform transition duration-400 ease-out
                  hover:scale-[1.03] sm:hover:scale-105 p-4 sm:p-6
                  min-h-[220px] sm:min-h-[241px] w-full max-w-full sm:max-w-[400px]
                  mx-auto sm:mx-0
                  // 7. Apply animation with stagger
                  transition-all duration-700 ease-out
                  ${cardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                  `}
      style={{ transitionDelay: cardInView ? `${delay}ms` : '0ms' }}
    >
      {/* Logo */}
      <div className="w-[40px] h-[40px] sm:w-[58px] sm:h-[58px] relative mb-2">
        <Image
          src={logoSrc}
          alt={`Logo for ${item.title}`}
          fill
          sizes="58px"
          className="object-contain"
        />
      </div>

      {/* Title */}
      <p className="mt-2 text-lg sm:text-[20px] font-[DM Serif Text] text-[#5B102B] capitalize font-normal leading-[150%]">
        {item.title}
      </p>

      {/* Paragraph */}
      <p className="mt-2 text-[#A67950] font-sans text-[16px] font-normal leading-[24px]">
        {item.paragraph}
      </p>
    </div>
  );
};
// -----------------------------------------------------------------------------


export default function Section2() {
  // 2. Observer for the Heading and Subheading
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Ensures re-animation on scroll up/down
  });

  // 3. Observer for the main Image
  const { ref: imageRef, inView: imageInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });


  return (
    <section
      className="w-full bg-[#FBFAF2] relative flex flex-col items-center p-4 sm:p-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32 pt-[60px] lg:pt-[130px] pb-12"
    >
      <div className="w-full max-w-7xl flex flex-col items-center lg:items-start">

        {/* Heading & Subheading Container - Attached headerRef */}
        <div ref={headerRef} className={`${fadeUpClasses(headerInView)} w-full`}>
            {/* Heading */}
            <div className="group relative cursor-pointer inline-block mx-auto lg:mx-0 text-center lg:text-left">
                <h2
                    className="
                        text-3xl sm:text-4xl lg:text-4xl
                        text-center lg:text-left
                        leading-snug mb-6
                        lg:ml-12 xl:ml-0
                    "
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontWeight: 400,
                        fontStyle: "normal",
                        color: "#A67950",
                        whiteSpace: "pre-line",
                    }}
                >
                    Training Pathways
                </h2>
            </div>

            {/* Subheading */}
            <p
                className="
                    text-base md:text-lg font-normal leading-7
                    mb-8 md:mb-10 lg:mb-14 mt-1
                    max-w-full mx-auto
                    text-center lg:text-left
                    lg:ml-12 xl:ml-0
                "
                style={{
                    marginTop: "0px",
                    color: "#401323",
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 400,
                    lineHeight: "44px",
                }}
            >
                A Balanced Approach: Theory, Practice, and Innovation.
            </p>
        </div>

        {/* Image + Cards Container */}
        <div className="mt-8 lg:mt-[20px] flex flex-col lg:flex-row gap-8 lg:gap-[40px] items-center lg:items-start">

          {/* Image - Attached imageRef */}
          <div
            ref={imageRef}
            className={`hidden sm:block relative w-full max-w-[400px] aspect-[465/632]
                        lg:w-5/12 lg:max-w-[465px] lg:min-w-[300px]
                        h-auto lg:max-h-[632px] rounded-[8px] overflow-hidden flex-shrink-0
                        ${fadeUpClasses(imageInView)}`} // Animation applied here
          >
            <Image
              src="/Images/programs/section2/image1.webp"
              alt="Surgeon operating with robotic-assisted surgery tools."
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 400px, 465px"
              className="object-cover"
            />
          </div>

          {/* Cards Grid */}
          <div
            className="grid w-full lg:flex-grow grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-[40px] max-w-full lg:mt-8"
          >
            {/* FIX: Map over data and render the new ProgramCard component */}
            {containers.map((item, index) => (
                <ProgramCard
                    key={index}
                    item={item}
                    logoSrc={logos[item.logoIndex]}
                    index={index}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}