"use client";

import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";

export default function ThirdSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const animationClass = "transition-all duration-1000 ease-out";

  return (
    <section ref={ref} className="relative w-full min-h-screen">
      {/* Fullscreen Background Image */}
      <Image
        src="/Images/homepage/section3/section3image.webp"
        alt="Section 3 Background"
        fill
        priority
        className="
          object-cover 
          md:object-center 
          object-[30%_center] 
        "
      />

      {/* 5. Desktop Layout (min-width: 768px) - Animates on every entry */}
      <div
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
        // FIX: Added '2xl:max-w-[1440px] 2xl:mx-auto' to constrain the *entire* text block's container width on extra large screens (2xl and up).
        // This ensures the content doesn't get pushed too far right on very wide monitors, while still allowing the content to *end* at the right edge of this max-width.
        // The original `justify-end` and padding still apply *within* this max-width container.
        // ----------------------------------------------------------------------------------------------------------------------------------------------------
className={`hidden md:flex absolute inset-0 z-10 items-center justify-end 
px-8 lg:px-20 xl:px-16 2xl:px-20 2xl:max-w-[1440px] 2xl:mx-auto 
${animationClass} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}

      >
        <div className="w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl">
          {/* Heading */}
          <h2
            className="text-[#F2F0E4] text-3xl lg:text-4xl leading-snug mb-6"
            style={{
              fontFamily: "DM Serif Text, serif",
              fontWeight: 400,
            }}
          >
            Empowering the next generation of <br />surgeons to transform healthcare
            with innovation and compassion
          </h2>

          {/* Paragraph */}
          <p
            className="text-[#F2F0E4] text-base lg:text-lg leading-relaxed"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 500,
            }}
          >
            Dr. Sudhir Srivastava leads a global mission to democratize robotic
            surgery. His vision is shaping the future of healthcare—making
            advanced surgical techniques accessible worldwide and equipping
            surgeons to deliver precision and excellence in every procedure.
          </p>
        </div>
      </div>

      {/* 6. Mobile Layout (max-width: 767px) - Animates on every entry */}
      <div
        className={`md:hidden absolute inset-0 z-10 flex flex-col justify-end items-center text-center px-6 pb-12 ${animationClass} ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transform: inView ? "translateX(0)" : "translateY(2.5rem)" }}
      >
        <h2
          className="mb-4 text-[#F2F0E4] text-2xl sm:text-3xl leading-snug"
          style={{
            fontFamily: "DM Serif Text, serif",
            fontWeight: 400,
          }}
        >
          Empowering the next generation of surgeons to transform healthcare with
          innovation and compassion
        </h2>

        <p
          className="text-[#F2F0E4] text-base sm:text-lg leading-relaxed max-w-xs sm:max-w-md"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 500,
          }}
        >
          Dr. Sudhir Srivastava leads a global mission to democratize robotic
          surgery. His vision is shaping the future of healthcare—making advanced
          surgical techniques accessible worldwide and equipping surgeons to
          deliver precision and excellence in every procedure.
        </p>
      </div>
    </section>
  );
}