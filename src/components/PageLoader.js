"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsExiting(false);
    setIsMounted(true);
    setProgress(0);

    const startTime = performance.now();
    const duration = 650;
    let frameId;

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed < duration) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsExiting(true);
        const timer = setTimeout(() => {
          setIsMounted(false);
        }, 320);
        return () => clearTimeout(timer);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [pathname]);

  if (!isMounted) return null;

  return (
    <div
      className={`formal-page-loader ${isExiting ? "exiting" : ""}`}
      aria-hidden="true"
    >
      <div className="loader-inner-content">
        <div className="loader-brand-label">BADRINATH M H</div>
        <div className="loader-counter">
          <span className="counter-value">{progress.toString().padStart(2, "0")}</span>
          <span className="counter-symbol">%</span>
        </div>
        <div className="loader-track">
          <div
            className="loader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="loader-status-meta">
          <span className="loader-pulse-dot" />
          <span className="loader-status-text">INITIALIZING</span>
        </div>
      </div>
    </div>
  );
}

