'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Ultra-Smooth "Butter" Scroll
 * Refined for high-end aesthetic performance.
 */
export default function SmoothScroll(): null {
  useEffect(() => {
    const lenis = new Lenis({
      // LERP: 0.04 - Slightly slower than 0.05. 
      // This creates that "weighty" feel where the page glides rather than snaps.
      lerp: 0.04, 
      
      // DURATION: Increased to 1.5s. 
      // This allows the easing curve more time to breathe.
      duration: 1.5, 
      
      // EASING: The "Ease-Out-Expo" curve. 
      // It starts fast and has an incredibly long, smooth tail.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      
      // WHEEL MULTIPLIER: 0.7 - Lowered slightly.
      // High multipliers feel "twitchy". Lower makes the mouse wheel feel like a precision tool.
      wheelMultiplier: 0.7, 
      
      touchMultiplier: 1.5,
      syncTouch: false,
    });

    function raf(time: number): void {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}