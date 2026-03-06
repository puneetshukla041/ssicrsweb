"use client";

import React from 'react'; // Removed unused 'useEffect' import


// --- Main component for the Privacy Policy page ---
const PrivacyPolicyPage: React.FC = () => {
    const lastUpdated = '1 Oct 2025';

    // Color palette for consistency
    const PRIMARY_COLOR = '#A67950'; // Header color
    const HEADING_COLOR = '#401323'; // Section heading color
    const TEXT_COLOR = 'text-stone-800';
    const BG_COLOR = '#FBFAF2'; // Setting page background to white per user request
    const CARD_BG = 'white'; // Setting card background to white

    // Policy Section Component
    const PolicySection: React.FC<{ title: string; children: React.ReactNode; delay: number }> = ({ title, children, delay }) => (
        <div
            className={`mb-8 opacity-0 transform translate-y-4 animate-fade-in-up`}
            style={{ animationDelay: `${delay * 100}ms`, animationFillMode: 'forwards', transition: 'all 0.5s ease-out' }}
        >
            {/* Policy Section Heading Styles */}
            <h2
                className={`mb-4 transition-colors duration-300`}
                style={{
                    color: HEADING_COLOR,
                    fontFamily: '"DM Serif Text", serif',
                    fontSize: '24px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '100%',
                }}
            >
                {title}
            </h2>
            <div className={`${TEXT_COLOR} leading-relaxed space-y-4 transition-opacity duration-300 text-base`}>
                {children}
            </div>
        </div>
    );

    return (
        // Outer Container 
        <div className="min-h-screen pt-20 sm:pt-40 pb-24 px-4 sm:px-8 md:px-12 font-sans" style={{ backgroundColor: BG_COLOR }}>

            {/* Injecting keyframe styles and Google Font link */}
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

            {/* Policy Card Wrapper (Responsive padding: p-6 on small, p-12 on large) */}
            <div className="max-w-4xl mx-auto rounded-2xl shadow-xl" style={{ backgroundColor: CARD_BG }}>
                <div className="p-6 sm:p-8 md:p-12">

                    {/* Header */}
                    <header className={`flex justify-between items-center mb-10 transition-all duration-500`}>
                        {/* Main H1 Heading Styles */}
                        <h1
                            style={{
                                color: PRIMARY_COLOR,
                                fontFamily: '"DM Serif Text", serif',
                                fontSize: '36px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '100%',
                            }}
                        >
                            Privacy Policy
                        </h1>
                        <p className="text-xs text-stone-500">
                            Last updated: {lastUpdated}
                        </p>
                    </header>

                    {/* Policy Content Sections */}

                    {/* Introduction */}
                    <PolicySection title="Introduction" delay={1}>
                        <p>
                            Welcome to SS International Center for Robotic Surgery (SSICRS).
                        </p>
                        <p>
                            Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website, register for programs, or interact with our training services.
                        </p>
                        <p>
                            By using our website, you agree to the practices described in this policy.
                        </p>
                    </PolicySection>

                    {/* Information We Collect */}
                    <PolicySection title="Information We Collect" delay={2}>
                        <p>
                            We may collect the following types of information:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                <strong>Information You Provide:</strong> Personal details such as your name, email address, phone number, profession, and country of residence when you you register or contact us.
                            </li>
                            <li>
                                Payment and billing details (if applicable for course registration).
                            </li>
                            <li>
                                Communication details (e.g., questions submitted via email, feedback forms).
                            </li>
                            <li>
                                <strong>Information Collected Automatically:</strong> Technical data such as your IP address, browser type, device details, and pages visited, collected via cookies and analytics tools.
                            </li>
                            <li>
                                Usage data to help us understand how visitors interact with our website.
                            </li>
                        </ul>
                    </PolicySection>

                    {/* How We Use Your Information */}
                    <PolicySection title="How We Use Your Information" delay={3}>
                        <p>
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>Process your registrations and course enrollments.</li>
                            <li>Administer and personalize our training programs and informations.</li>
                            <li>Improve our website experience and service quality.</li>
                            <li>Respond to your inquiries and support requests.</li>
                            <li>Maintain records for internal administration, security, and compliance.</li>
                            <li>Send you relevant updates or newsletters (only with your consent).</li>
                        </ul>
                    </PolicySection>

                    {/* Legal Basis for Processing */}
                    <PolicySection title="Legal Basis for Processing" delay={4}>
                        <p>
                            We process personal data on the following legal bases:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                Consent: When you explicitly agree to processing (e.g., newsletter sign-up, forms).
                            </li>
                            <li>
                                Contractual necessity: When we process your registration or program participation.
                            </li>
                            <li>
                                Legitimate Interest: To improve our services and ensure security.
                            </li>
                            <li>
                                Legal Obligation: When required by law or regulation.
                            </li>
                        </ul>
                    </PolicySection>

                    {/* How We Share Your Information */}
                    <PolicySection title="How We Share Your Information" delay={5}>
                        <p>
                            We do not share your personal data with third parties except:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                As you may share it with us.
                            </li>
                            <li>
                                Authorized service providers (e.g., payment processors, I.T. systems tools).
                            </li>
                            <li>
                                Partner institutions and educational bodies involved in your training or certification.
                            </li>
                            <li>
                                Legal or regulatory authorities if required by law.
                            </li>
                        </ul>
                        <p>
                            All third-party partners are required to protect your data and use it only for the intended purpose.
                        </p>
                    </PolicySection>

                    {/* Data Retention */}
                    <PolicySection title="Data Retention" delay={6}>
                        <p>
                            We retain your data only as long as necessary for training, legal, or operational purposes. Once no longer needed, it will be securely deleted or anonymized.
                        </p>
                    </PolicySection>

                    {/* Your Rights */}
                    <PolicySection title="Your Rights" delay={7}>
                        <p>
                            Depending on your location, you may have the right to:
                        </p>
                        <ul className="list-disc pl-5 space-y-3">
                            <li>
                                Access a copy of your personal data.
                            </li>
                            <li>
                                Request correction or deletion of your data.
                            </li>
                            <li>
                                Withdraw consent for optional communications.
                            </li>
                            <li>
                                Object to our use of your data (where applicable).
                            </li>
                            <li>
                                Request data portability (where applicable).
                            </li>
                        </ul>
                    </PolicySection>

                    {/* Data Security */}
                    <PolicySection title="Data Security" delay={8}>
                        <p>
                            We use appropriate administrative, technical, and physical safeguards to protect your information from unauthorized access, loss, or misuse. While we strive for complete security, no online system can guarantee absolute protection.
                        </p>
                    </PolicySection>

                    {/* Cookies and Tracking Technologies */}
                    <PolicySection title="Cookies and Tracking Technologies" delay={9}>
                        <p>
                            Cookies are **used** to enhance site functionality, analyze traffic, and improve user experience. You can manage your preferences in the Cookie Settings panel or read our full Cookie Policy for more details.
                        </p>
                    </PolicySection>

                    {/* Links to Other Websites */}
                    <PolicySection title="Links to Other Websites" delay={10}>
                        <p>
                            Our website may include links to third-party platforms (e.g., partner hospitals, educational bodies). SSICRS is not responsible for the content or privacy practices of these sites.
                        </p>
                    </PolicySection>

                    {/* Updates to This Policy */}
                    <PolicySection title="Updates to This Policy" delay={11}>
                        <p>
                            We may update this Privacy Policy periodically to reflect changes in regulations or our operations. The updated version will be posted on this page with a revised &quot;Last updated&quot; date.
                        </p>
                    </PolicySection>

                </div>


            </div>

     

        </div>
    );
};

export default PrivacyPolicyPage;