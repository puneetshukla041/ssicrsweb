// app/aboutus/page.tsx
"use client";

import React from "react";
import Section1 from "@/components/programspage/section1";
import Section2 from "@/components/programspage/section2";
import Section3 from "@/components/programspage/section3";
import Section4 from "@/components/programspage/section4";
import Section5 from "@/components/programspage/section5";
import Section6 from "@/components/programspage/section6";
import Footer from "@/components/Footer";
export default function ProgramsPage() {
  return (
    <div className="w-full bg-[#FBFAF2]">
    <Section1 />
    <Section2 />
    <Section3 />
    <Section4 />
    <Section5 />
    <Section6 />
      <Footer />
    </div>
  );
}
