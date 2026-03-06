// components/aboutus/Section8.tsx
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

// 1. Define the animation variants for the boxes
const boxVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

// 2. Define the container variants for staggered animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each box's animation
    },
  },
};

export default function Section8() {
  const ref = useRef(null);
  // Trigger when 20% of the component is visible
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Mobile Boxes Data (reused for consistency)
  const mobileBoxesData = [
    "Deliver specialized training across surgical specialties for true proficiency.",
    "Blend theory with hands-on practice using the SSI Mantra system.",
    "Make robotic surgery education accessible worldwide, with focus on underserved regions.",
    "Create continuous learning pathways to keep professionals at the forefront of innovation.",
  ];

  // Set the animation state based on visibility
  const animationState = isInView ? "visible" : "hidden";


  return (
<section 
  ref={ref}
  className="w-full min-h-[70vh] bg-[#FBFAF2] flex flex-col justify-center" // reduced further to 70vh
>
  <div
    className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-4 lg:py-12" 
    // reduced padding more: py-4 lg:py-12
  >


        {/* --- Mobile View --- */}
        <div className="md:hidden flex flex-col items-center">
          
          {/* Mobile Vision Card (FIX: Removed motion.div to ensure image/heading are visible instantly) */}
          <div
            className="relative w-full mb-8 overflow-hidden rounded-lg"
          >
            {/* Background Image */}
            <Image
              src="/Images/aboutpage/section3/image1.png"
              alt="Our Vision"
              width={650}
              height={550}
              className="w-full h-auto object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center bg-black/40 p-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-snug">
                Our Vision
              </h2>

              <p className="mt-3 text-sm sm:text-base text-white leading-relaxed">
                To become the global leader in robotic surgery education by
                providing comprehensive, cutting-edge training that equips
                healthcare professionals with the skills needed to excel in
                robotic-assisted surgery using the SSI Mantra.
              </p>
            </div>
          </div>

          {/* Mobile Boxes (Still animated with stagger effect) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={animationState} // Use the state to control animation
            className="w-full space-y-4"
          >
            {mobileBoxesData.map((text, idx) => (
              <motion.div
                key={idx}
                variants={boxVariants} // Apply variants to each child
                className="w-full h-auto min-h-[70px] bg-[#FBFAF2] rounded-lg border-2 border-[#724B3C] shadow-lg cursor-pointer p-4"
              >
                <p className="text-[#724B3C] font-sans font-medium text-base sm:text-lg leading-5 sm:leading-6">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- Desktop View (Modified for Animation) --- */}
        <motion.div
          variants={containerVariants} // Apply container variants to the main desktop wrapper
          initial="hidden"
          animate={animationState} // Use the state to control animation
          className="hidden md:flex flex-col md:flex-row items-start w-full" // REMOVED: pt-16 md:pt-24 lg:pt-26 as padding is now on the parent div
        >
          {/* Left side: Image + overlay (Animate the entire block) */}
          <motion.div
            variants={boxVariants}
            className="relative w-full md:w-1/2 lg:w-[650px] mb-8 md:mb-0"
          >
            <Image
              src="/Images/aboutpage/section3/image1.png"
              alt="Our Vision"
              width={650}
              height={550}
              className="w-full h-auto rounded-lg"
            />

            <div className="absolute top-10 left-6 md:top-20 md:left-8 text-white max-w-[80%]">
              <h2 className="font-serif text-3xl lg:text-[40px] font-normal leading-[1.5]">
                Our Vision
              </h2>
              <p className="mt-4 text-sm sm:text-base lg:text-[16px] font-sans font-normal leading-6 whitespace-pre-line">
                To become the global leader in robotic surgery
                <br />
                education by providing comprehensive, cutting-edge
                <br />
                training that equips healthcare professionals with the
                <br />
                skills needed to excel in robotic-assisted surgery using
                <br />
                the SSI Mantra.
              </p>
            </div>

            <Image
              src="/Images/aboutpage/section3/image2.png"
              alt="Image 2"
              width={85}
              height={60}
              className="absolute top-0 left-[calc(100%-85px)]"
            />
          </motion.div>

          {/* Right side: Bordered Boxes (Staggered animation through parent container) */}
          <motion.div className="flex-1 md:ml-8 lg:ml-0 space-y-6 lg:space-y-10 w-full mt-4">
            {mobileBoxesData.map((text, idx) => (
              <motion.div
                key={idx}
                variants={boxVariants} // Apply variants to each child box
                className="w-full h-auto min-h-[95px] bg-white rounded-lg border-1.5 border-[#000000] shadow-lg p-4 cursor-default flex items-center"
              >
                <p className="text-[#724B3C] font-sans font-medium text-base sm:text-lg leading-5 sm:leading-6 w-full">
                  {text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}