"use client";
import React, { useState, useEffect } from 'react';

// --- CookieSettingsModal Component (The Card from the image) ---
interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({ isOpen, onClose }) => {
  // Color palette based on the image:
  const CARD_BG = '#FBF2E3'; // Light background for the card
  const HEADER_COLOR = '#A67950'; // Header text color
  const LEGAL_TEXT_COLOR = '#401323'; // Legal text
  // const BUTTON_BG = '#E7B58B'; // Removed to fix unused variable warning
  // const BUTTON_TEXT = '#7A4822'; // Removed to fix unused variable warning

  // Local state for each cookie category's consent
  const [performance, setPerformance] = useState(false);
  const [functionality, setFunctionality, ] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  // Helper component for the Toggle Switch
  const CookieToggle: React.FC<{ label: string, description: string, alwaysActive?: boolean, checked: boolean, onChange?: (checked: boolean) => void }> = ({
    label,
    description,
    alwaysActive = false,
    checked,
    onChange,
  }) => {
    const isEnabled = alwaysActive || checked;

    return (
      <div className="flex flex-col border-b border-stone-200 py-4 last:border-b-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: LEGAL_TEXT_COLOR }}>
              {label}
            </h3>
            {alwaysActive && (
              <p className="text-sm text-gray-500 mt-1">
                Always Enabled
              </p>
            )}
          </div>

          <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isEnabled}
              disabled={alwaysActive}
              onChange={(e) => onChange && onChange(e.target.checked)}
            />
            {/* Toggle Track (Background) */}
            <div className={`w-11 h-6 rounded-full peer-focus:outline-none ${isEnabled ? 'bg-green-500' : 'bg-gray-300'} peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${alwaysActive ? 'opacity-100' : 'opacity-100'}`}></div>
          </label>
        </div>

        <p className="text-sm text-stone-700 mt-2">
          {description}
        </p>
      </div>
    );
  };

  if (!isOpen) return null;

  // The Modal Overlay and Card
  return (
    // 1. Modal Overlay (Responsive: uses full screen on small devices, fixed position)
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 flex items-center sm:items-start justify-center p-4 sm:p-8 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      {/* 2. Modal Card (Responsive: full width on small screens, wider on laptop screens) */}
      <div
        // *** FIX APPLIED: Set max-w-xl for small screens and md:max-w-3xl for laptop/desktop ***
        className={`w-full max-w-xl md:max-w-3xl mt-4 sm:mt-16 rounded-xl shadow-2xl transition-all duration-500 ease-out max-h-[90vh] overflow-y-auto
              ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'}`}
        style={{ backgroundColor: CARD_BG }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
      >
        {/* Content of the Settings Card (p-6 on mobile, p-8 on larger screens) */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Header */}
          <header>
            <h1 className="text-3xl font-normal mb-2" style={{ color: HEADER_COLOR, fontFamily: '"DM Serif Text", serif' }}>
              Cookie Settings
            </h1>
            <p className="text-sm text-stone-700 leading-relaxed">
              Where required, we place non-essential cookies only with your consent. For essential cookies, our legal basis is legitimate interests in running a secure, functional website. If you are in the EEA/UK, you&apos;ll see a consent banner before any non-essential cookies load.
            </p>
            <div className="my-4 h-px" style={{ backgroundColor: '#D4C3A3' }}></div> {/* Separator */}
          </header>

          {/* Cookie Categories */}
          <div className="space-y-2">

            <CookieToggle
              label="Always active"
              description="These cookies are essential for the website to function properly. They ensure basic operations like security, session management, and accessibility."
              alwaysActive={true}
              checked={true}
            />

            <CookieToggle
              label="Performance & Analytics Cookies"
              description="Help us improve our website by collecting anonymous data on how visitors use it. These cookies allow us to track which pages are popular and how users move around the site."
              checked={performance}
              onChange={setPerformance}
            />

            <CookieToggle
              label="Functionality Cookies"
              description="Remember your preferences, such as language, location, or previous selections, to provide a more personalized experience."
              checked={functionality}
              onChange={setFunctionality}
            />

            <CookieToggle
              label="Advertising & Targeting Cookies"
              description="Used to deliver relevant updates and measure the effectiveness of our communications. We only use these with your consent."
              checked={advertising}
              onChange={setAdvertising}
            />
          </div>

{/* Save & Accept Button */}
<div className="flex justify-end pt-4">
  <button
    onClick={() => {
      console.log('Settings Saved:', { performance, functionality, advertising });
      onClose(); // Close modal after saving
    }}
    className="flex justify-center items-center gap-2 text-sm font-medium transition-all duration-300"
    style={{
      display: 'flex',
      width: '142px',
      padding: '12px 16px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      borderRadius: '100px',
      border: '2px solid rgba(0, 0, 0, 0.00)',
      background: 'linear-gradient(117deg, #D9A05B 14.89%, #A67950 94.33%)',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
    }}
  >
    Save & Accept
  </button>
</div>

        </div>
      </div>
    </div>
  );
};


// --- Cookie Banner Component ---
const CookieBanner: React.FC<{ onSettingsClick: () => void }> = ({ onSettingsClick }) => {
  const BANNER_BG_COLOR = '#A67950';
  const TEXT_COLOR = 'text-white';
  const BUTTON_BORDER_COLOR = 'border-white';
  const BUTTON_TEXT_COLOR = 'text-white';

  const handleAcceptAll = () => {
    console.log('Accepting all cookies...');
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 shadow-2xl transition-all duration-500 ease-in-out z-50 rounded-t-xl"
      style={{ backgroundColor: BANNER_BG_COLOR }}
    >
      {/* Adjusted spacing for small screens */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8">

        {/* Text Content */}
        <p className={`text-sm ${TEXT_COLOR} leading-relaxed text-center md:text-left`}>
          We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking &quot;Accept All&quot;, you consent to the use of all the cookies. However, you may visit **&quot;Cookie Settings&quot;** to provide controlled consent.
        </p>

        {/* Buttons (Uses space-x-4, stacks naturally) */}
        <div className="flex space-x-4 flex-shrink-0">
          <button
            onClick={onSettingsClick}
            className={`px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-xl border-2 ${BUTTON_BORDER_COLOR} ${BUTTON_TEXT_COLOR} hover:bg-white hover:text-amber-900 transition-colors duration-300 ease-in-out`}
          >
            Settings
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 sm:px-6 sm:py-3 text-sm font-medium rounded-xl border-2 border-white bg-white text-amber-900 hover:bg-opacity-90 transition-colors duration-300 ease-in-out"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};


// --- Main component for the Cookie Policy page ---
const CookiesPage: React.FC = () => {
  const lastUpdated = '1 Oct 2025';

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  // Lock body scroll to prevent page content shift when modal is open
  useEffect(() => {
    if (isSettingsModalOpen) {
      document.body.style.overflow = 'hidden';
      // To prevent page content shifting when scrollbar is hidden, calculate and apply padding
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isSettingsModalOpen]);

  const handleRedirectToSettings = () => {
    openSettingsModal();
    console.log('Opening Cookie Settings Modal');
  };

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
          color: '#401323',
          fontFamily: '"DM Serif Text", serif',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: '100%',
        }}
      >
        {title}
      </h2>
      <div className={`text-stone-800 leading-relaxed space-y-4 transition-opacity duration-300`}>
        {children}
      </div>
    </div>
  );

  return (
    // Outer Container (Responsive padding: p-4 on small, p-8 on medium, p-12 on large)
    <div className="min-h-screen pt-20 sm:pt-40 pb-24 px-4 sm:px-8 md:px-12 font-sans" style={{ backgroundColor: '#FBFAF2' }}>

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
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl">

        {/* Header */}
        <header className={`flex justify-between items-center mb-10 transition-all duration-500`}>
          {/* Main H1 Heading Styles */}
          <h1
            style={{
              color: '#A67950',
              fontFamily: '"DM Serif Text", serif',
              fontSize: '36px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '100%',
            }}
          >
            Cookies
          </h1>
          <p className="text-xs text-stone-500">
            Last updated: {lastUpdated}
          </p>
        </header>

        {/* Policy Content Sections... (Structure preserved) */}
        <PolicySection title="Cookie Policy" delay={1}>
          <p>
            We use cookies and similar technologies to run our site, understand how it&apos;s used, and improve your experience with SSICRS programs and resources. You can manage your preferences at any time in the **Cookie Settings**.
            These technologies include local storage, session storage, and web beacons, all used to enhance site functionality and measure performance across various devices and platforms.
          </p>
        </PolicySection>

        <PolicySection title="How we use cookies" delay={2}>
          <ul className="list-disc pl-5 space-y-3 text-base">
            <li>
              Operate the site: security, load balancing, session management. We use essential cookies to identify you as a unique user across pages, prevent cross-site request forgery, and distribute traffic efficiently across our servers to ensure continuous service availability.
            </li>
            <li>
              Improve performance: analytics to see what content is helpful. We monitor which pages are viewed most often, the amount of time users spend on the site, and if any technical errors occur, allowing us to continuously optimize the user interface and content quality.
            </li>
            <li>
              Enhance experience: remember preferences (e.g., language, forms). This includes remembering your chosen text size, region, currency settings, and pre-filling forms with data you&apos;ve previously entered, reducing friction on return visits.
            </li>
            <li>
              Reach and relevance (optional): show SSICRS updates more effectively. Based on your consent, we may use these to understand your interests and deliver personalized updates, product recommendations, or informational content that is most relevant to your specific needs.
            </li>
            <li>
              Customer support: track issues and communicate service status. We use cookies to quickly identify logged-in users who report issues and track the resolution process to provide timely and targeted support.
            </li>
            <li>
              A/B testing: evaluate new features and changes. Before deploying major changes, cookies help us test small user groups on different versions of a feature to measure impact on engagement and performance metrics.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Types of cookies we use" delay={3}>
          <ul className="list-disc pl-5 space-y-3 text-base">
            <li>
              Strictly Necessary (always active): Required for core functionality (security, forms, session). These cookies cannot be turned off in our systems as they are fundamental for safe navigation and service access, such as maintaining items in a shopping cart or securely logging you in.
            </li>
            <li>
              Performance/Analytics: Help us understand usage to improve pages and navigation. These cookies collect aggregated and anonymous data, suchs as visitor count and traffic sources, to evaluate and report on the overall performance of the website.
            </li>
            <li>
              Functionality: Remember choices such as language or region. These are used to provide enhanced, more personal features, like remembering your username and custom settings. They may be set by us or by third-party providers whose services we have added to our pages.
            </li>
            <li>
              Advertising/Targeting (optional): Measure campaign effectiveness; only set with consent. These are set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other sites.
            </li>
            <li>
              Third-Party: Set by service providers (e.g., analytics, video players, form tools). These cookies originate from a domain different from the website you are visiting (e.g., Google, YouTube, social media platforms) and are used to provide content or functionality from those third parties.
            </li>
            <li>
              Session Cookies: These are temporary and expire immediately after you close your browser. They are crucial for maintaining the state of your session during your visit.
            </li>
            <li>
              Persistent Cookies: These remain on your device for a set period or until you manually delete them. They help us recognize you as a returning visitor and remember your choices over time.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Managing your preferences" delay={4}>
          <p>
            You control how non-essential cookies are used. This flexibility allows you to customize your privacy settings without impacting the site&apos;s necessary core functions.
          </p>
          <ul className="list-disc pl-5 space-y-3 text-base">
            <li>
              Cookie Settings Panel: Adjust categories anytime. <button onClick={handleRedirectToSettings} className={`text-amber-700 hover:text-amber-900 font-medium underline focus:outline-none transition-colors duration-200`}>[Open Cookie Settings]</button> This panel allows for granular control, giving you the power to enable or disable specific types of cookies beyond the strictly necessary ones.
            </li>
            <li>
              Browser controls: Most browsers let you block or delete cookies. See help pages for Chrome, Safari, Edge, or Firefox. Be aware that blocking all cookies, especially strictly necessary ones, may prevent certain parts of the site from working correctly.
            </li>
            <li>
              Do Not Track: We honor your selections made in the Cookie Settings; browser DNT signals may not be recognized by all services. While we respect DNT preferences, the effectiveness can vary depending on your browser and the specific third-party services integrated on our site.
            </li>
            <li>
              Mobile Device Settings: For mobile apps, your device&apos;s operating system (iOS or Android) typically offers settings to limit ad tracking and control the usage of identifiers for advertising purposes.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Legal bases & region notes" delay={5}>
          <p>
            Where required, we place non-essential cookies only with your consent. For essential cookies, our legal basis is legitimate interests in running a secure, functional website. If you are in the EEA/UK, you&apos;ll see a consent banner before any non-essential cookies load. The legal basis for processing data varies by cookie category and region.
          </p>
        </PolicySection>

        <PolicySection title="Changes to this notice" delay={6}>
          <p>
            We may update this page to reflect new cookies or providers. Significant changes will be highlighted in the banner or on this page with a new &quot;Last updated&quot; date. We encourage users to review this policy periodically to stay informed about how we are using these technologies.
          </p>
        </PolicySection>

      </div>

      {/* RENDER the Modal and Banner */}
      <CookieBanner onSettingsClick={openSettingsModal} />
      <CookieSettingsModal isOpen={isSettingsModalOpen} onClose={closeSettingsModal} />

    </div>
  );
};

export default CookiesPage;