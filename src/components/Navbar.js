"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Read stored theme preference (default to 'light')
    const initTimer = setTimeout(() => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") ||
        localStorage.getItem("portfolio-theme") ||
        "light";
      setTheme(currentTheme);
      document.documentElement.setAttribute("data-theme", currentTheme);
    }, 0);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className="navbar"
        style={{
          borderBottomColor: scrolled
            ? "var(--border-color)"
            : "transparent",
        }}
      >
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo" onClick={closeMobile}>
            <span className="navbar-logo-name">Badrinath M H</span>
            <span className="navbar-logo-role">Software Developer</span>
          </Link>

          <div className="navbar-links">
            <Link href="/projects" className="navbar-link">
              Projects
            </Link>
            <Link href="/#about" className="navbar-link">
              About
            </Link>
            <Link href="/#contact" className="navbar-link">
              Contact
            </Link>

            {/* Top-Right Theme Switch Button */}
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                /* Moon Icon for Light -> Dark switch */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                /* Sun Icon for Dark -> Light switch */
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>
          </div>

          <button
            className={`navbar-mobile-toggle ${mobileOpen ? "active" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <Link
          href="/projects"
          className="mobile-menu-link"
          onClick={closeMobile}
        >
          Projects
        </Link>
        <Link
          href="/#about"
          className="mobile-menu-link"
          onClick={closeMobile}
        >
          About
        </Link>
        <Link
          href="/#contact"
          className="mobile-menu-link"
          onClick={closeMobile}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
