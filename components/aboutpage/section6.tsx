// components/SeventhSection.tsx
"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import React from "react";
// 1. Import the hook from the library
import { useInView } from "react-intersection-observer";

// Define the base animation class
const animationClass = "transition-all duration-1000 ease-out";

export default function SeventhSection() {
  // 2. Setup Intersection Observer for the section
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.01,
  });

  const router = useRouter();
  const mobileImageSrc = "/Images/homepage/section8/image1.webp";

  const handleRegisterClick = () => {
    router.push("/Register");
  };

  return (
    // 3. Attach the observer ref to the main section container
    <section 
      ref={ref}
      // MODIFIED: Changed 'h-screen' to 'h-[90vh]' to slightly reduce the section height, 
      // cutting space from the top and bottom.
      className="w-full h-[90vh] bg-[#FBFAF2] flex justify-center items-center overflow-hidden" 
    >
      {/* ---------------- Mobile & Tablet View ---------------- */}
      {/* This container already uses 'flex-col items-center justify-center' internally.
          The parent section's 'justify-center items-center' ensures this whole block is vertically centered.
          The internal 'py-12' ensures equal top/bottom padding on the content itself.
      */}
      <div className="md:hidden w-11/12 max-w-xl mx-auto relative rounded-lg overflow-hidden min-h-[300px] sm:min-h-[400px] flex flex-col items-center justify-center">
        
        {/* Image with 50% zoom effect */}
        <div className="absolute inset-0 scale-[1.5]">
          <Image
            src={mobileImageSrc}
            alt="Next Step Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-10"></div>

        {/* Content - Equal padding handled by py-12 */}
        <div 
          className={`relative z-20 text-center flex flex-col items-center max-w-lg px-4 py-12 ${animationClass} ${
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-2xl sm:text-3xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#D9A05B] via-[#EFE8D6] to-[#F2F0E4] mb-3 sm:mb-4 leading-snug"
            style={{ fontFamily: "DM Serif Text, serif" }}
          >
            Join the Robotic Surgery Revolution
          </h2>

          <p
            className="text-sm sm:text-base font-medium text-[#FBFAF2] mb-8 sm:mb-10"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            SSICRS invites you to be part of the movement that is transforming the future of surgery. Whether you&apos;re a surgeon looking to master robotic-assisted techniques, a nurse preparing to assist in robotic procedures, or an anesthesiologist ensuring robotic surgery patient safety—SSICRS is your gateway to expertise in the most advanced form of surgery today.
          </p>

          <button
            onClick={handleRegisterClick}
            className="flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,234,210,0.5)] px-8 py-3 w-48 sm:w-52"
            style={{
              background: "linear-gradient(90deg, #FBFAF2, #FFEAD2)",
              fontFamily: "Lato, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              color: "#000",
            }}
          >
            Register Now
            <FiArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>

      {/* ---------------- Desktop View ---------------- */}
      <div className="hidden md:block relative flex flex-col justify-center items-center w-full max-w-[1306px]">
        
        {/* The Image container itself serves as the main visual element. */}
        <div className="relative w-full h-auto">
          <Image
            src="/Images/homepage/section8/image1.webp"
            alt="Seventh Section Image"
            width={1306}
            height={724}
            className="object-contain w-full h-auto"
            priority
          />
        </div>

        {/* Content Overlay - This overlay is absolutely positioned and uses flex utilities to center its content */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 ${animationClass} ${
            inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
          }`}
        >
          <h2
            className="text-4xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#D9A05B] via-[#EFE8D6] to-[#F2F0E4] whitespace-nowrap mb-4 md:mb-8"
            style={{ fontFamily: "DM Serif Text, serif" }}
          >
            Join the Robotic Surgery Revolution
          </h2>

          <p
            className="text-xl md:text-[18px] font-medium text-[#FBFAF2] max-w-xl mb-16 md:mb-18 lg:max-w-2xl"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            SSICRS invites you to be part of the movement that is transforming the future of surgery. Whether you&apos;re a surgeon looking to master robotic-assisted techniques, a nurse preparing to assist in robotic procedures, or an anesthesiologist ensuring robotic surgery patient safety—SSICRS is your gateway to expertise in the most advanced form of surgery today.
          </p>

          <button
            onClick={handleRegisterClick}
            className="absolute flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,234,210,0.5)]"
            style={{
              // MODIFIED: Adjusted 'top' from 65% to 70% to lower the button slightly on the desktop image.
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "167px",
              height: "43px",
              background: "linear-gradient(90deg, #FBFAF2, #FFEAD2)",
              fontFamily: "Lato, sans-serif",
              fontWeight: "400",
              fontSize: "16px",
              color: "#000",
            }}
          >
            Register Now
            <FiArrowRight className="ml-2" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}