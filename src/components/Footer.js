"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WaterFooter from "./WaterFooter";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [isFeeding, setIsFeeding] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleFoodState = (e) => {
      if (e && e.detail) {
        setIsFeeding(Boolean(e.detail.isFeeding));
      }
    };

    window.addEventListener("food-state-change", handleFoodState);
    return () => {
      window.removeEventListener("food-state-change", handleFoodState);
    };
  }, []);

  const handleTreatFish = () => {
    if (isFeeding) return;
    setIsFeeding(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("treat-fish"));
    }
  };

  return (
    <footer className="footer footer-with-water">
      <WaterFooter />
      <div className="container footer-inner">
        <p className="footer-copyright">
          © {currentYear} Badrinath M H. All rights reserved.
        </p>
        <div className="footer-links">
          <Link href="mailto:badrinath.sde@gmail.com" className="footer-link">
            Email
          </Link>
          <Link href="/projects" className="footer-link">
            Projects
          </Link>
          <a
            href="https://github.com/badrinath-sde"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/badrinathsde"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <button
            type="button"
            className={`treat-fish-btn ${isFeeding ? "disabled" : ""}`}
            onClick={handleTreatFish}
            disabled={isFeeding}
            title={
              isFeeding
                ? "Fishes are enjoying their feast!"
                : "Drop some treats for the fish!"
            }
          >
            <span className="treat-fish-icon">{isFeeding ? "🐟" : "🌾"}</span>
            <span className="treat-fish-label">
              {isFeeding ? "Feeding..." : "Treat Fish"}
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
