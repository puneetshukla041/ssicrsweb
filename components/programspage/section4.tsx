"use client";

import React from "react";
// 1. Import the Image component from next/image
import Image from "next/image";
// 2. Import useInView
import { useInView } from "react-intersection-observer";

// 4. Animation classes for fade-up effect
const fadeUpClasses = (isInView: boolean, delay = 0) =>
  `transition-all duration-700 ease-out ${
    isInView
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  } ${delay > 0 ? `delay-${delay}` : ''}`;

// Card data (moved outside the component for clarity)
const cardData = [
  {
    src: "/Images/programs/section4/image1.webp",
    title: "Classroom Learning",
    text: "Interactive sessions led by expert faculty build strong foundations in robotic surgery.",
  },
  {
    src: "/Images/programs/section4/image2.webp",
    title: "Lab-Based Practice",
    text: "From dry labs to wet labs, participants develop hands-on skills in realistic surgical conditions.",
  },
  {
    src: "/Images/programs/section4/image3.webp",
    title: "Online Modules",
    text: "Flexible, self-paced learning with pre-training modules, recorded lectures, quizzes, and ongoing support.",
  },
  {
    src: "/Images/programs/section4/image4.webp",
    title: "Certification & Mentorship",
    text: "Graduates earn globally recognized certification with CME credits, plus continued access to mentors for long-term growth.",
  },
];


// --- FIX: New TrainingCard component to encapsulate the useInView Hook ---
interface TrainingCardProps {
    item: typeof cardData[0];
    index: number;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ item, index }) => {
    // 5. useInView is now called correctly at the top level of this component
    const { ref: cardRef, inView: cardInView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    // Calculate staggered delay (0ms, 150ms, 300ms, 450ms)
    const delay = index * 150;

    return (
        <div
            key={index}
            ref={cardRef} // 6. Attach the card's ref
            className={`relative group rounded-lg overflow-hidden cursor-pointer
                            ${fadeUpClasses(cardInView)}`} // Apply base animation
            style={{ transitionDelay: cardInView ? `${delay}ms` : '0ms' }} // Apply stagger delay
        >
            <div
                className="w-full relative"
                style={{
                    paddingTop: "72.71%", // Maintains the original 634x461 aspect ratio
                    borderRadius: "8px",
                }}
            >
                <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{
                        borderRadius: "8px",
                    }}
                />
            </div>
            {/* Text Overlay */}
            <div
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2 rounded-lg py-4 px-4 flex flex-col items-start justify-start w-[90%] max-w-[534px] min-h-[120px]"
                style={{
                    background: "#381205",
                    opacity: 0.7,
                    backdropFilter: "blur(50px)",
                }}
            >
                <p
                    className="text-xl"
                    style={{
                        color: "#FFF",
                        fontFamily: '"DM Serif Text", serif',
                        fontWeight: 400,
                        lineHeight: "30px",
                        marginBottom: "6px",
                    }}
                >
                    {item.title}
                </p>
                <p
                    className="text-base"
                    style={{
                        color: "#FFF",
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 400,
                        lineHeight: "24px",
                    }}
                >
                    {item.text}
                </p>
            </div>
        </div>
    );
};
// -----------------------------------------------------------------------------


export default function Section4() {

  // 3. Observer for the Heading and Subheading
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Ensures re-animation on scroll up/down
  });

  return (
    <section
      className="w-full bg-[#FBFAF2] flex flex-col items-center pl-4 pr-4 md:pl-8 md:pr-8 lg:pl-12 lg:pr-12 xl:pl-20 xl:pr-20"
      style={{
        minHeight: "100vh",
        paddingTop: "20px",
        paddingBottom: "160px",
      }}
    >
      <div className="w-full max-w-7xl">

        {/* Heading & Subheading Block - Attached headerRef */}
        <div ref={headerRef} className={fadeUpClasses(headerInView)}>
            {/* Heading with hover + line */}
            <div
                className="group relative cursor-pointer inline-block mt-10"
                style={{ paddingTop: "0px" }}
            >
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
                    How We Train
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

        {/* 2x2 Image Grid: 1 column on small, 2 columns on medium/large. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-10 mt-6 w-full">

            {/* FIX: Use the new TrainingCard component */}
            {cardData.map((item, index) => (
                <TrainingCard key={index} item={item} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
}