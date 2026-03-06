// app/aboutus/page.tsx
"use client";

import React from "react";
import Section1 from "@/components/aboutpage/section1";
import Section2 from "@/components/aboutpage/section2";
import Section3 from "@/components/aboutpage/section3";
import Section4 from "@/components/aboutpage/section4";
import Section5 from "@/components/aboutpage/section5";
import Section6 from "@/components/aboutpage/section6";
import Footer from "@/components/Footer";
export default function AboutUsPage() {
  return (
    <div className="w-full bg-[#FBFAF2]">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section5 />
      <Section6 />
      <Footer />
    </div>
  );
}
