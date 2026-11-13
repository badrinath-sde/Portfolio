"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
  useEffect(() => {
    // 1. Hero Scroll Emphasis Progress
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Progress from 0 (at top) to 1 (when scrolled down hero)
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - rect.top) / (windowHeight + rect.height * 0.5))
        );
        document.documentElement.style.setProperty(
          "--hero-scroll-progress",
          progress.toFixed(3)
        );

        if (window.scrollY > 40) {
          hero.classList.add("hero-scrolled-active");
        } else {
          hero.classList.remove("hero-scrolled-active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver for smooth section & card reveals
    const observerCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Optional: unobserve if single reveal desired
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -80px 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const revealElements = document.querySelectorAll(
      ".reveal-on-scroll, .section-title, .section-header, .project-thumbnail, .tool-category, .experience-item, .education-box, .contact-content"
    );

    revealElements.forEach((el, index) => {
      if (!el.classList.contains("reveal-on-scroll")) {
        el.classList.add("reveal-on-scroll");
      }
      // Add subtle stagger index if inside a grid
      if (el.parentElement && el.parentElement.classList.contains("tools-grid")) {
        el.style.setProperty("--stagger-delay", `${(index % 6) * 80}ms`);
      } else if (el.parentElement && el.parentElement.classList.contains("project-thumbnail-grid")) {
        el.style.setProperty("--stagger-delay", `${(index % 3) * 120}ms`);
      }
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return null;
}
