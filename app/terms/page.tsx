"use client";

import React from "react";

// --- Main component for the Terms of Use page, reusing the visual structure ---
const TermsOfUsePage = () => {
  const lastUpdated = "1 Oct 2025";

  // Color palette for consistency
  const PRIMARY_COLOR = "#A67950"; // Header color
  const HEADING_COLOR = "#401323"; // Section heading color
  const TEXT_COLOR = "text-stone-800";
  const BG_COLOR = "#FBFAF2"; // Page background color
  const CARD_BG = "white"; // Card background color

  // ✅ TypeScript interface for PolicySection props
  interface PolicySectionProps {
    title: string;
    children: React.ReactNode;
    delay: number;
  }

  // ✅ Reusable PolicySection component with proper typing
  const PolicySection: React.FC<PolicySectionProps> = ({ title, children, delay }) => (
    <div
      className={`mb-8 opacity-0 transform translate-y-4 animate-fade-in-up`}
      style={{
        animationDelay: `${delay * 100}ms`,
        animationFillMode: "forwards",
        transition: "all 0.5s ease-out",
      }}
    >
      <h2
        className={`mb-4 transition-colors duration-300`}
        style={{
          color: HEADING_COLOR,
          fontFamily: '"DM Serif Text", serif',
          fontSize: "24px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "100%",
        }}
      >
        {title}
      </h2>

      <div
        className={`${TEXT_COLOR} leading-relaxed space-y-4 transition-opacity duration-300 text-base`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen pt-20 sm:pt-40 pb-24 px-4 sm:px-8 md:px-12 font-sans"
      style={{ backgroundColor: BG_COLOR }}
    >
      {/* Keyframes and font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out;
        }
      `}</style>

      <div
        className="max-w-4xl mx-auto rounded-2xl shadow-xl"
        style={{ backgroundColor: CARD_BG }}
      >
        <div className="p-6 sm:p-8 md:p-12">
          {/* Header */}
          <header className={`flex justify-between items-center mb-10 transition-all duration-500`}>
            <h1
              style={{
                color: PRIMARY_COLOR,
                fontFamily: '"DM Serif Text", serif',
                fontSize: "36px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "100%",
              }}
            >
              Terms of Use
            </h1>
            <p className="text-xs text-stone-500">Last updated: {lastUpdated}</p>
          </header>

          {/* Sections */}
          <PolicySection title="Overview" delay={1}>
            <p>
              Welcome to SS International Centre for Robotic Surgery{" "}
              <strong>(SSICRS)</strong>. By accessing or using our website
              (www.ssicrs.com), you agree to these Terms of Use. Please read
              them carefully before proceeding.
            </p>
            <p>
              The website provides information about our robotic surgery
              training programs, faculty, and educational initiatives. All
              content is for informational and academic purposes only.
            </p>
          </PolicySection>

          <PolicySection title="Use of Our Website" delay={2}>
            <ul className="list-disc pl-5 space-y-3">
              <li>You may browse and use the site for personal or educational purposes.</li>
              <li>Do not copy, modify, distribute, or reproduce any material without written permission from SSICRS.</li>
              <li>You agree not to misuse the site, interfere with its operation, or attempt unauthorized access.</li>
              <li>
                All text, images, videos, and materials on this website are the{" "}
                <strong>intellectual property of SSICRS</strong> and protected
                by applicable copyright laws.
              </li>
            </ul>
          </PolicySection>

          <PolicySection title="Program Information & Registration" delay={3}>
            <p>When registering for training programs or events through the website:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li>You agree to provide accurate and current information.</li>
              <li>Fees, payment terms, and refund policies are outlined on the registration pages.</li>
              <li>SSICRS may update program schedules or course content as needed.</li>
            </ul>
          </PolicySection>

          {/* ✅ Fixed section below */}
          <PolicySection title="Disclaimer & Limitation of Liability" delay={4}>
            <p>
              The content on this website is provided &quot;as is&quot; for general
              informational use. While SSICRS strives for accuracy, we make no
              guarantees about completeness, reliability, or availability.
            </p>
            <p>
              SSICRS will not be liable for any direct or indirect losses resulting from
              your use of the website or reliance on its content.
            </p>
          </PolicySection>

          <PolicySection title="Governing Law" delay={5}>
            <p>
              These Terms of Use shall be governed by and construed in accordance
              with the laws of the jurisdiction where SSICRS is headquartered,
              without regard to its conflict of law provisions.
            </p>
          </PolicySection>

          <PolicySection title="Changes to Terms" delay={6}>
            <p>
              We reserve the right to modify these Terms of Use at any time. All
              changes will be effective immediately upon posting to the website.
              Your continued use of the website after changes are posted
              constitutes your acceptance of the new terms.
            </p>
          </PolicySection>

          <PolicySection title="Contact Information" delay={7}>
            <p>
              If you have any questions about these Terms of Use, please contact
              us through the contact details provided on our website.
            </p>
          </PolicySection>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
