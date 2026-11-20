"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Instantiate Lenis with normalized cross-device configuration
    const lenis = new Lenis({
      lerp: 0.085, // Controlled interpolation curve that eliminates trackpad acceleration spikes
      wheelMultiplier: 0.85, // Normalizes trackpad velocity with mouse wheel notch deltas
      touchMultiplier: 1.0, // Balanced touch multiplier
      smoothWheel: true, // Smooths mouse wheel and trackpad wheel events
      syncTouch: false, // Preserves 1:1 native touch responsiveness on mobile touchscreens
      autoResize: true,
    });

    lenisRef.current = lenis;

    // 2. Synchronize Lenis scroll updates directly with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Drive Lenis through GSAP master ticker (avoids competing RAF loops)
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);

    // Disable GSAP lag smoothing to guarantee exact frame-by-frame lockstep
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger calculations once initial layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Smooth anchor navigation for in-page section links (#hero, #projects, etc.)
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: 0, duration: 1.2 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
