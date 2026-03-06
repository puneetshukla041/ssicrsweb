"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Section1() {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <Image
        src="/Images/homepage/section1/image1.webp"
        alt="Section 1 Background"
        fill
        priority
        className="object-cover"
      />

      {/* Centered Text with scroll-triggered animation */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1
          style={{
            fontFamily: "DM Serif Text, serif",
            fontWeight: 400,
            lineHeight: "1.2",
          }}
          className="
            text-white
            text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px]
          "
        >
          Shaping the Future of <br className="hidden sm:block" /> Robotic Surgery Training
        </h1>

        <p
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 400,
            lineHeight: "1.5",
          }}
          className="
            text-white
            mt-5
            text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
            px-2 sm:px-8 md:px-16
          "
        >
          Empowering healthcare professionals worldwide to master the SSI Mantra system and deliver safer, smarter care.
        </p>
      </motion.div>
    </section>
  );
}
