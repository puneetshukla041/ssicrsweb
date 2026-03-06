"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// 1. Import the hook from the library
import { useInView } from "react-intersection-observer";

// Helper component to safely render text with <br/> tags
const SafeTextRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p className="text-[#A67950] text-sm sm:text-base font-lato font-normal max-w-lg mx-auto lg:mx-0">
      {text.split(/<br\s*\/?>/i).map((line, idx) => (
        <React.Fragment key={idx}>
          {line.trim()}
          <br />
        </React.Fragment>
      ))}
    </p>
  );
};

const slides = [
  {
    heading: "Multi Specialty Focus",
    text: "Gain exposure across cardiac, thoracic, <br/> urology gynecology, and general surgery, all on the SSI Mantra platform.",
    image: "/Images/homepage/section5/slider1.webp",
  },
  {
    heading: "Hands-On Experience",
    text: "Train directly on simulators and live systems, <br/> building confidence through immersive <br/> practice.",
    image: "/Images/homepage/section5/slider3.webp",
  },
  {
    heading: "Expert Mentorship",
    text: "Learn from pioneering robotic surgeons and <br/> clinical leaders who guide every step <br/> of your journey.",
    image: "/Images/homepage/section5/slider2.webp",
  },
  {
    heading: "Global Certification Pathways",
    text: "Gain exposure across cardiac, thoracic, <br/> urology, gynecology, and general surgery, <br/> all on the SSI Mantra platform.",
    image: "/Images/homepage/section5/slider4.webp",
  },
];

const animationClass = "transition-all duration-1000 ease-out";

const Slider: React.FC = () => {
  // 2. Setup Intersection Observer for the section
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation plays every time the component enters the viewport
    threshold: 0,    // Start animation when 10% of the component is visible
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = slides.length;
  const autoPlayInterval = 3000;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => setCurrentIndex(index % totalSlides);

  // --- Touch Handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    // Only prevent default if swiping horizontally to avoid blocking vertical scroll
    const diff = touchStartX.current - e.touches[0].clientX;
    const absDiff = Math.abs(diff);
    if (absDiff > 10) e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // Swiped left
    else if (diff < -50) handlePrev(); // Swiped right
    touchStartX.current = null;
  };

  // --- Autoplay Effect ---
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [isHovered, handleNext]);

  // --- Transform Value for Carousel Movement ---
  const getTransformValue = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  return (
    // 3. Attach the observer ref to the main wrapper div
    <div 
      ref={ref} 
      className="w-full bg-[#FBFAF2] pt-28 sm:pt-30 pb-20 sm:pb-40 px-4 sm:px-8 lg:px-12 xl:px-20"
    >

      {/* Heading - Apply animation classes */}
<div 
  className={`max-w-7xl mx-auto ${animationClass} ${
    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  } lg:pl-10 xl:pl-0`}  // 👈 Add this
>

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
          Our Comprehensive Training Program
        </h2>
      </div>

      {/* Slider Container - Apply animation classes */}
      <div
        className={`max-w-7xl mx-auto relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${animationClass} ${
          inView ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-10"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Text Content (framer-motion handles its internal slide transitions) */}
       <div className="w-full lg:w-1/3 order-2 lg:order-1 flex justify-center lg:justify-start lg:pl-10 xl:pl-0">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 text-center lg:text-left max-w-sm lg:max-w-none"
            >
              <h3 className="text-[#5B102B] text-xl sm:text-2xl font-serif font-normal">
                {slides[currentIndex].heading}
              </h3>
              {/* Using the SafeTextRenderer */}
              <SafeTextRenderer text={slides[currentIndex].text} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Image Carousel (Internal transform handles the image movement) */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2 overflow-hidden relative lg:translate-x-[-30px] xl:translate-x-0 transition-transform duration-500">

          <div
            className="flex transition-transform duration-700 ease-in-out relative"
            style={{ transform: getTransformValue() }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, idx) => {
              // Determine zIndex and scale/translate values for the 'peek' effect on large screens
              const offset = idx - currentIndex;
              const isCurrent = offset === 0;

              // Tailwind classes for the 'peek' effect on large screens (lg:)
              const zIndexClass = isCurrent ? 'lg:z-20' : `lg:z-${10 - Math.abs(offset)}`;
              const scaleClass = isCurrent ? 'lg:scale-100' : 'lg:scale-[0.9]';
              const translateClass = isCurrent ? 'lg:translate-x-0' : (offset > 0 ? 'lg:translate-x-[30px]' : 'lg:-translate-x-[30px]');

              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-full px-4 sm:px-8 lg:px-6 flex justify-center relative transition-all duration-500 ease-in-out ${zIndexClass} ${scaleClass} ${translateClass}`}
                >
                  <div className="relative w-full max-w-3xl h-64 sm:h-[400px] lg:h-[450px] xl:h-[500px] rounded-2xl shadow-xl overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                      <Image
                        src={slide.image}
                        alt={`Slide ${idx + 1}`}
                        fill
                        className="object-cover" 
                      />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows (z-30 is already high enough) */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 sm:left-4 lg:left-0 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition z-30 opacity-70 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#A67950]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 sm:right-4 lg:right-0 transform -translate-y-1/2 bg-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-lg hover:bg-opacity-90 transition z-30 opacity-70 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#A67950]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  currentIndex === idx ? "bg-[#5B102B] scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
