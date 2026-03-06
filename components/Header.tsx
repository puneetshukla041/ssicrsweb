// components/Header.tsx

"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  className?: string;
}

// Define the common text classes (excluding font-weight) for reusability
const commonTextClasses = "text-[14px] leading-[32px]";

export default function Header({ className = "" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isRegisterPage = pathname === "/Register";
  const loginPath = "/Login";

  useEffect(() => {
    if (isRegisterPage) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRegisterPage]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const goToRegister = () => {
    router.push("/Register");
    setMobileOpen(false);
  };

  const goToLogin = () => {
    router.push(loginPath);
    setMobileOpen(false);
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const goHome = () => {
    router.push("/Home");
    setMobileOpen(false);
  };

  // Helper function to determine if a path is active, including checking for root path for 'Home'
  const checkIsActive = (path: string) => {
    if (path === "/Home" && pathname === "/") return true;
    return pathname === path;
  };

  const headerBgColor = isRegisterPage
    ? "bg-white"
    : scrolled
    ? "bg-[#FBFAF2]"
    : "bg-gradient-to-b from-black/50 to-transparent";

  const headerShadow = isRegisterPage
    ? "shadow-md"
    : scrolled
    ? "shadow-md"
    : "shadow-none";

  const headerTextColor = isRegisterPage
    ? "text-gray-800"
    : scrolled
    ? "text-gray-800"
    : "text-white";

  const mobileMenuIconColor =
    isRegisterPage || scrolled ? "text-gray-800" : "text-white";

  const logoSrc =
    isRegisterPage || scrolled
      ? "/Logos/Header/ssicrshead1.png"
      : "/Logos/Header/ssicrshead2.png";

  const navItems = [
    { label: "Home", path: "/Home" },
    { label: "About Us", path: "/AboutUs" },
    { label: "Programs", path: "/Programs" },
  ];

  return (
    <header
      className={`w-full py-3 md:py-4 flex items-center justify-between fixed top-0 left-0 z-50 transition-all duration-500
        ${headerBgColor} ${headerShadow} ${className}
        px-4 sm:px-6 md:px-10
        lg:px-20 xl:px-36 2xl:px-[290px] // laptops only expanded, desktop untouched
      `}
    >
      {/* Logo */}
      <button
        onClick={goHome}
        className="flex-shrink-0 flex items-center h-10 sm:h-12 focus:outline-none transition-transform duration-300 hover:scale-[1.02]"
        aria-label="Go to Home"
      >
        <Image
          src={logoSrc}
          alt="SSI CRS Logo"
          width={220}
          height={0}
          className="w-auto h-8 sm:h-10 md:h-16 lg:h-18 xl:h-20 2xl:h-16 object-contain transition-all duration-500"
          priority
        />
      </button>

      {/* Desktop Navigation */}
      <nav
        className="hidden md:flex items-center space-x-8 lg:space-x-14 xl:space-x-16 2xl:space-x-10 ml-8"
        style={{ fontFamily: "Lato, sans-serif" }} // Maintain Lato font family
      >
        {navItems.map((item) => {
          const isActive = checkIsActive(item.path); // Use the helper function
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`transition-colors duration-300
                ${commonTextClasses} // Apply common font properties
                ${isActive
                  ? "text-[#C59D73] font-extrabold" // 👈 Changed from font-bold to font-extrabold (800)
                  : `font-normal ${headerTextColor}` // NORMAL (400) when inactive
                }
                hover:text-[#C59D73]`}
            >
              {item.label}
            </button>
          );
        })}

        {/* Log In Button */}
        <button
          onClick={goToLogin}
          className={`px-6 py-2 rounded-[5px] transition-colors duration-300 border
            ${commonTextClasses} font-normal // Apply font-normal explicitly for buttons
            ${isRegisterPage || scrolled
              ? "bg-transparent text-[#A67950] border-[#A67950] hover:border-[#A67950]"
              : "bg-transparent text-[#A67950] border-[#A67950] hover:border-[#A67950]"
            }
          `}
        >
          Log In
        </button>

        {/* Register Now Button */}
        <div className="relative flex items-center">
          <div
            className="absolute top-[-20] left-0 w-full"
            style={{
              height: "140%",
              backgroundColor: "#A67950",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              zIndex: 0,
            }}
          ></div>
          <button
            onClick={goToRegister}
            className={`relative z-10 px-3 py-2 rounded-full cursor-pointer text-white transition-colors duration-500
              ${commonTextClasses} font-normal // Apply font-normal explicitly for buttons
            `}
            style={{ backgroundColor: "transparent" }}
          >
            Register Now
          </button>
        </div>
      </nav>

      {/* Mobile Button - Icon color is handled by mobileMenuIconColor, no text classes needed here */}
      <button
        className={`md:hidden z-50 transition-colors duration-300 ${mobileMenuIconColor}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 pt-[72px] bg-white transition-transform duration-300 md:hidden z-40
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col items-center space-y-8 p-6 overflow-y-auto`}
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {navItems.map((item) => {
          const isActive = checkIsActive(item.path); // Use the helper function
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.path)}
              className={`transition-colors duration-300 w-full text-center py-2
                ${commonTextClasses} // Apply common font properties
                ${isActive
                  ? "text-[#C59D73] font-extrabold" // 👈 Changed from font-bold to font-extrabold (800)
                  : "text-gray-800 font-normal" // NORMAL (400) when inactive
                }
                hover:text-[#C59D73]`}
            >
              {item.label}
            </button>
          );
        })}

        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        {/* Log In Button (Mobile) */}
        <button
          onClick={goToLogin}
          className={`w-full max-w-xs px-6 py-3 rounded-[5px] transition-colors duration-300 border bg-transparent text-[#A67950] border-[#A67950] hover:bg-[#F2F2F2]
            ${commonTextClasses} font-normal
          `}
        >
          Log In
        </button>

        {/* Register Now Button (Mobile) */}
        <button
          onClick={goToRegister}
          className={`w-full max-w-xs px-6 py-3 rounded-[5px] cursor-pointer text-white transition-colors duration-300 bg-[#A67950] hover:bg-[#8e613f]
            ${commonTextClasses} font-normal
          `}
        >
          Register Now
        </button>
      </div>
    </header>
  );
}