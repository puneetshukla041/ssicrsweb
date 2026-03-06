'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll Component
 * Updated for Lenis v1.1+ (2026 Standards)
 */
export default function SmoothScroll(): null {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.05,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      // 'smoothTouch' is now 'syncTouch' in the latest versions
      syncTouch: false, 
    });

    // 2. Setup the Request Animation Frame (RAF) loop
    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // 3. Cleanup
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}