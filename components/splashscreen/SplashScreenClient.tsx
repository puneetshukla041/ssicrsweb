"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setMounted(true); // prevents SSR flash
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setShow(false); // triggers exit animation
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete(); // only call after exit finishes
      }}
    >
      {show && (
        <motion.div
          className="fixed inset-0 bg-white flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // smooth fade out
          transition={{ duration: 1 }}
        >
          <motion.img
            src="/Logos/splashscreen/splashlogo.png"
            alt="Splash Logo"
            className="w-40 h-40 object-contain"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
