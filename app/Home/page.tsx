// app/Home/page.tsx
"use client";

import Section1 from "@/components/homepage/section1";
import Section2 from "@/components/homepage/section2";
import Section3 from "@/components/homepage/section3";
import Section4 from "@/components/homepage/section4";
import Section5 from "@/components/homepage/section5";
import Section6 from "@/components/homepage/section6";
import Section7 from "@/components/homepage/section7";
import Section8 from "@/components/homepage/section8";
import Footer from "@/components/Footer";
// Later you can import Section2, Section3, ... Section6

export default function HomePage() {
  return (
    <div className="w-full">
      <Section1 /> 
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Section8 />
      <Footer />
    </div>
  );
}



