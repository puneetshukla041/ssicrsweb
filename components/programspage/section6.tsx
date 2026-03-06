"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { useRouter } from "next/navigation"; // 1. Import useRouter

export default function SeventhSection() {
  const router = useRouter(); // 2. Initialize router

  const handleRegisterClick = () => {
    router.push("/Register"); // 3. Navigation logic
  };

  return (
    <section className="w-full bg-[#FBFAF2] relative flex justify-center items-center py-12 md:py-0">
      
{/* ---------------- Mobile view - small card ---------------- */}
<div className="md:hidden w-11/12 max-w-sm mx-auto relative rounded-lg overflow-hidden min-h-[350px] flex flex-col items-center justify-center">
  
  {/* Image with zoom */}
  <div className="absolute inset-0 scale-[1.5]">
    <Image
      src="/Images/homepage/section8/image1.webp"
      alt="Mobile Background"
      fill
      className="object-cover object-center"
      priority
    />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/30 z-10 rounded-lg"></div>

  {/* Content */}
  <div className="relative z-20 text-center flex flex-col items-center px-4">
    <h2
      className="text-2xl sm:text-3xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#D9A05B] via-[#EFE8D6] to-[#F2F0E4] mb-3 sm:mb-4 leading-snug"
      style={{ fontFamily: "DM Serif Text, serif" }}
    >
      Ready to Begin Your Journey?
    </h2>

    <p
      className="text-sm sm:text-base font-medium text-[#FBFAF2] mb-8 sm:mb-10"
      style={{ fontFamily: "Lato, sans-serif" }}
    >
      Take the next step toward transforming your surgical practice. Explore 
      our programs and secure your seat in an upcoming training batch.
    </p>

    <button
      onClick={handleRegisterClick}
      className="flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,234,210,0.5)] px-6 py-2"
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

      
      {/* ---------------- Desktop view ---------------- */}
      <div className="hidden md:block relative flex flex-col justify-center items-center min-h-screen">
        <Image
          src="/Images/homepage/section8/image1.webp"
          alt="Seventh Section Image"
          width={1306}
          height={724}
          className="object-contain mt-32" 
        />

        {/* Heading */}
        <h2
          className="absolute text-center text-4xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#D9A05B] via-[#EFE8D6] to-[#F2F0E4] whitespace-nowrap"
          style={{
            fontFamily: "DM Serif Text, serif",
            top: "40%", 
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Ready to Begin Your Journey?
        </h2>
        
        {/* Subtitle */}
        <p
          className="absolute text-center text-[24px] font-medium"
          style={{
            fontFamily: "Lato, sans-serif",
            color: "#FBFAF2",
            top: "48%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90%",
            whiteSpace: "nowrap", 
          }}
        >
          Take the next step toward transforming your surgical practice. Explore <br />
          our programs and secure your seat in an upcoming training batch.
        </p>

        {/* Button (Desktop) */}
        <button
          onClick={handleRegisterClick} 
          className="absolute flex items-center justify-center rounded-full transition-shadow duration-300 hover:shadow-[0_0_15px_rgba(255,234,210,0.5)]"
          style={{
            top: "58%", 
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

    </section>
  );
}