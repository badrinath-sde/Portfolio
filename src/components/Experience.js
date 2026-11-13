"use client";

import { useState, useEffect, useRef } from "react";
import { experience, education } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const MILESTONES = [
  {
    id: "freelance",
    index: "01",
    shortName: "Freelance",
    phase: "PHASE 01 / CURRENT",
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    location: "Remote / Tamil Nadu, India",
    period: "05/2026 – Present",
    type: "Client Projects & Independent",
    statusBadge: "Currently Active",
    accent: "#38bdf8", // Sky / Cyan
    glow: "rgba(56, 189, 248, 0.45)",
    summary:
      "Delivered 6+ real-world client platforms spanning manufacturing ERPs, logistics systems, e-commerce automation, and scalable backend microservices.",
    stats: [
      { label: "Client Systems", value: "6+" },
      { label: "Core Stack", value: "MERN / Next.js" },
      { label: "Status", value: "Production" },
    ],
    highlights: [
      "Delivered 6+ real-world client projects across manufacturing, logistics, e-commerce automation, and business management systems.",
      "Designed and developed end-to-end web applications, including backend APIs, database architecture, authentication, admin workflows, and responsive user interfaces.",
      "Worked directly with clients to understand requirements, translate business workflows into software solutions, and independently manage development, testing, deployment, and production support.",
      "Built and integrated automation solutions for product listing and maintenance, logistics operations, billing, tracking, and other client-specific business processes.",
    ],
  },
  {
    id: "techvolt",
    index: "02",
    shortName: "Techvolt",
    phase: "PHASE 02 / ENTERPRISE",
    role: "Software Developer – MERN Stack",
    company: "Techvolt Software",
    location: "Tamil Nadu, India",
    period: "07/2023 – 05/2026",
    type: "Full-Time Enterprise",
    statusBadge: "2.8+ Yrs Tenured",
    accent: "#8b5cf6", // Purple / Violet
    glow: "rgba(139, 92, 246, 0.45)",
    summary:
      "Spearheaded backend architecture and operational workflow optimization for enterprise ERP and CRM platforms used in high-volume internal business operations.",
    stats: [
      { label: "Effort Saved", value: "40%" },
      { label: "Projects Mentored", value: "70+" },
      { label: "Tenure", value: "2.8+ Yrs" },
    ],
    highlights: [
      "Led backend development and workflow optimization for ERP and CRM systems used in internal business operations.",
      "Designed backend modules using PHP and MySQL, reducing manual workflow effort by approximately 40%.",
      "Guided junior developers in MERN Stack, Python, Embedded Systems, and IoT development while assisting in project architecture and debugging.",
      "Reviewed, debugged, and optimized application code while providing architectural guidance and production issue resolution.",
      "Guided and supported 70+ academic and client-based projects involving full-stack and hardware-integrated systems.",
      "Worked directly with clients to gather requirements and implement production enhancements.",
    ],
  },
  {
    id: "education",
    index: "03",
    shortName: "Education",
    phase: "PHASE 03 / FOUNDATION",
    role: education.degree,
    company: education.institution,
    location: education.location,
    period: education.period,
    type: "Academic Degree",
    statusBadge: "First Class Honors",
    accent: "#10b981", // Emerald Green
    glow: "rgba(10, 185, 129, 0.45)",
    summary:
      "Four years of core Computer Science and Engineering foundation spanning Data Structures, Algorithms, Relational & NoSQL Databases, System Design, and Hardware Integration.",
    stats: [
      { label: "Degree", value: "B.E. CSE" },
      { label: "Duration", value: "4 Years" },
      { label: "Focus", value: "Systems & DS" },
    ],
    highlights: [
      "Deep foundational coursework in Object-Oriented Programming, Database Management Systems, Operating Systems, and Computer Networks.",
      "Engineered multiple hardware-software capstone projects linking embedded IoT microcontrollers with web dashboards.",
      "Cultivated disciplined software engineering, architectural patterns, algorithmic thinking, and collaborative team problem-solving.",
    ],
  },
];

// SVG Curvy Track Path Definition (ViewBox 0 0 220 600)
// Station 1 at (60, 50), curves right to ~130 at y=175, Station 2 at (60, 300), curves left to ~0 at y=425, Station 3 at (60, 550)
const TRACK_PATH_D = "M 60 50 C 135 125, 135 225, 60 300 C -10 375, -10 475, 60 550";

export default function Experience() {
  const containerRef = useRef(null);
  const trackPathRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0.05); // 0 to 1
  const [trackPathProgress, setTrackPathProgress] = useState(0.05);
  const [activeIndex, setActiveIndex] = useState(0);
  const [puckPos, setPuckPos] = useState({ x: 60, y: 50 });
  const [totalPathLength, setTotalPathLength] = useState(600);

  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // GSAP ScrollTrigger for Desktop: Pins the section, smoothly scrubs puck along curvy path
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop Only (> 768px): Pinned interactive stage with energy puck
      mm.add("(min-width: 769px)", () => {
        if (!containerRef.current || !trackPathRef.current) return;

        const pathLen = trackPathRef.current.getTotalLength();
        setTotalPathLength(pathLen);

        const initPt = trackPathRef.current.getPointAtLength(pathLen * 0.05);
        setPuckPos({ x: initPt.x, y: initPt.y });
        setScrollProgress(0.05);

        const st = ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=4200", // Comfortable runway allowing natural pacing
          scrub: 0.12,   // Butter-smooth, instantaneous tracking without overshoot
          onUpdate: (self) => {
            const p = self.progress; // 0.0 to 1.0
            setScrollProgress(p);

            // 3 Distinct Milestone Zones with stable reading ranges:
            const nextIdx = p < 0.40 ? 0 : p < 0.75 ? 1 : 2;
            if (nextIdx !== activeIndexRef.current) {
              activeIndexRef.current = nextIdx;
              setActiveIndex(nextIdx);
            }

            // Piecewise smooth puck glide along curvy SVG track:
            let pathProgress = 0.05;
            if (p <= 0.15) {
              pathProgress = 0.05;
            } else if (p <= 0.55) {
              const t = (p - 0.15) / (0.55 - 0.15);
              pathProgress = 0.05 + t * (0.50 - 0.05);
            } else if (p <= 0.72) {
              pathProgress = 0.50;
            } else if (p <= 0.94) {
              const t = (p - 0.72) / (0.94 - 0.72);
              pathProgress = 0.50 + t * (0.98 - 0.50);
            } else {
              pathProgress = 0.98;
            }

            setTrackPathProgress(pathProgress);

            const pt = trackPathRef.current.getPointAtLength(pathLen * pathProgress);
            setPuckPos({ x: pt.x, y: pt.y });
          },
        });

        scrollTriggerRef.current = st;
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Jump to milestone (used by stage pips, stepper buttons, SVG station nodes on desktop)
  const scrollToMilestone = (index) => {
    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const targetP = index === 0 ? 0.05 : index === 1 ? 0.60 : 0.96;
      const targetY = st.start + (st.end - st.start) * targetP;
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(index);
    }
  };

  // Handle Stepper Footer navigation
  const handleNextStep = () => {
    if (activeIndex < 2) {
      scrollToMilestone(activeIndex + 1);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (activeIndex > 0) {
      scrollToMilestone(activeIndex - 1);
    } else {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currentMilestone = MILESTONES[activeIndex];

  return (
    <section className="experience-hijack-wrapper" ref={containerRef} id="experience">
      {/* =========================================================================
          1. DESKTOP VIEWPORT (> 768px): Pinned Interactive Curvy Rail with Energy Puck
          ========================================================================= */}
      <div className="experience-desktop-stage experience-sticky-viewport">
        {/* Subtle Ambient Section Glow */}
        <div
          className="experience-ambient-aura"
          style={{
            "--ambient-color": currentMilestone.accent,
            "--ambient-glow": currentMilestone.glow,
          }}
        ></div>

        <div className="container experience-layout-container">
          {/* Section Header */}
          <div className="experience-top-bar">
            <div>
              <h2 className="section-title experience-heading">Work Experience</h2>
            </div>

            {/* Direct Station Jumpers */}
            <div className="track-status-dock">
              <div className="track-stage-buttons">
                {MILESTONES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    className={`track-stage-btn ${activeIndex === idx ? "is-active" : ""}`}
                    style={{
                      "--stage-accent": item.accent,
                    }}
                    title={`Jump to ${item.role}`}
                  >
                    <span className="stage-num-pip">{item.index}</span>
                    <span className="stage-name-short">{item.shortName || item.company.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN INTERACTION STAGE: Curvy Track on Left, Experience Card on Right */}
          <div className="experience-stage-grid">
            {/* 1. CURVY VERTICAL TRACK RAIL SYSTEM */}
            <div className="curvy-track-column">
              <div className="curvy-svg-wrapper">
                <svg
                  viewBox="0 0 220 600"
                  className="curvy-track-svg"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="trackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>

                    <radialGradient id="puckGlowGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                      <stop offset="40%" stopColor={currentMilestone.accent} stopOpacity="0.85" />
                      <stop offset="100%" stopColor={currentMilestone.accent} stopOpacity="0" />
                    </radialGradient>

                    <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                      <feMerge>
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Curvy Outer Rail Guides */}
                  <path
                    d={TRACK_PATH_D}
                    className="curvy-rail-base-outer"
                    stroke="var(--border-color)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.3"
                  />

                  {/* Railroad Sleeper Ties */}
                  <path
                    d={TRACK_PATH_D}
                    className="curvy-rail-sleepers"
                    stroke="var(--border-color-light)"
                    strokeWidth="14"
                    strokeDasharray="2 12"
                    strokeLinecap="butt"
                    opacity="0.4"
                  />

                  {/* Base Unlit Track */}
                  <path
                    d={TRACK_PATH_D}
                    className="curvy-rail-path-base"
                    stroke="var(--bg-tag)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Illuminated Active Track (Reveals with Scroll Progress, synchronized with Puck) */}
                  <path
                    ref={trackPathRef}
                    d={TRACK_PATH_D}
                    className="curvy-rail-path-active"
                    stroke="url(#trackGradient)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    filter="url(#laserGlow)"
                    strokeDasharray={totalPathLength}
                    strokeDashoffset={totalPathLength * (1 - trackPathProgress)}
                  />

                  {/* STATION 1 NODE (y = 50, x = 60) */}
                  <g
                    className={`station-node ${activeIndex >= 0 ? "is-passed" : ""} ${
                      activeIndex === 0 ? "is-current" : ""
                    }`}
                    onClick={() => scrollToMilestone(0)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx="60" cy="50" r="16" className="station-ring" />
                    <circle cx="60" cy="50" r="9" className="station-core" fill="#38bdf8" />
                    <text x="92" y="55" className="station-label">
                      01 • Freelance
                    </text>
                  </g>

                  {/* STATION 2 NODE (y = 300, x = 60) */}
                  <g
                    className={`station-node ${activeIndex >= 1 ? "is-passed" : ""} ${
                      activeIndex === 1 ? "is-current" : ""
                    }`}
                    onClick={() => scrollToMilestone(1)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx="60" cy="300" r="16" className="station-ring" />
                    <circle cx="60" cy="300" r="9" className="station-core" fill="#8b5cf6" />
                    <text x="92" y="305" className="station-label">
                      02 • Techvolt
                    </text>
                  </g>

                  {/* STATION 3 NODE (y = 550, x = 60) */}
                  <g
                    className={`station-node ${activeIndex >= 2 ? "is-passed" : ""} ${
                      activeIndex === 2 ? "is-current" : ""
                    }`}
                    onClick={() => scrollToMilestone(2)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle cx="60" cy="550" r="16" className="station-ring" />
                    <circle cx="60" cy="550" r="9" className="station-core" fill="#10b981" />
                    <text x="92" y="555" className="station-label">
                      03 • Education
                    </text>
                  </g>

                  {/* TRAVELING GLOWING ENERGY PUCK */}
                  <g transform={`translate(${puckPos.x}, ${puckPos.y})`}>
                    <circle cx="0" cy="0" r="18" fill="url(#puckGlowGradient)" opacity="0.65" />
                    <circle
                      cx="0" cy="0" r="7"
                      fill="#ffffff"
                      stroke={currentMilestone.accent}
                      strokeWidth="2.5"
                      filter="url(#laserGlow)"
                    />
                    <circle cx="0" cy="0" r="2.5" fill={currentMilestone.accent} />
                  </g>
                </svg>
              </div>

              <div className="track-scroll-instruction">
                <span className="track-wheel-dot"></span>
                <span>Scroll to travel down track</span>
              </div>
            </div>

            {/* 2. THE HIJACKED EXPERIENCE DISPLAY (Desktop) */}
            <div className="experience-display-stage">
              <div
                key={currentMilestone.id}
                className="hijacked-experience-card"
                style={{
                  "--card-accent": currentMilestone.accent,
                  "--card-glow": currentMilestone.glow,
                }}
              >
                {/* Card Top Header */}
                <div className="card-top-row">
                  <div className="card-phase-tag">
                    <span
                      className="phase-pulse-pip"
                      style={{ backgroundColor: currentMilestone.accent }}
                    ></span>
                    <span>{currentMilestone.phase}</span>
                  </div>

                  <div className="card-meta-chips">
                    <span className="meta-badge-type">{currentMilestone.type}</span>
                    <span
                      className="meta-badge-period"
                      style={{ color: currentMilestone.accent }}
                    >
                      {currentMilestone.period}
                    </span>
                  </div>
                </div>

                {/* Role & Company Header */}
                <div className="card-identity-block">
                  <h3 className="card-role-title">{currentMilestone.role}</h3>
                  <div className="card-company-line">
                    <span className="company-name">{currentMilestone.company}</span>
                    <span className="company-divider">•</span>
                    <span className="company-location">{currentMilestone.location}</span>
                    <span className="company-badge-status">{currentMilestone.statusBadge}</span>
                  </div>
                </div>

                {/* Executive Summary */}
                <p className="card-summary-paragraph">{currentMilestone.summary}</p>

                {/* Stats Row */}
                <div className="card-stats-banner">
                  {currentMilestone.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="card-stat-pill">
                      <span className="stat-pill-value" style={{ color: currentMilestone.accent }}>
                        {stat.value}
                      </span>
                      <span className="stat-pill-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Deep Key Deliverables */}
                <div className="card-highlights-block">
                  <h4 className="highlights-header-title">KEY IMPACT & RESPONSIBILITIES</h4>
                  <ul className="card-highlights-list">
                    {currentMilestone.highlights.map((itemText, hIdx) => (
                      <li key={hIdx} className="card-highlight-item">
                        <span
                          className="highlight-arrow"
                          style={{ color: currentMilestone.accent }}
                        >
                          ▹
                        </span>
                        <span className="highlight-text">{itemText}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom Navigation Stepper */}
                <div className="card-footer-stepper">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="stepper-arrow-btn"
                    title={activeIndex === 0 ? "Return to Tools" : "Previous Milestone"}
                  >
                    <span className="stepper-btn-label-desktop">
                      {activeIndex === 0 ? "↑ Return to Tools" : "↑ Previous Milestone"}
                    </span>
                    <span className="stepper-btn-label-mobile">
                      {activeIndex === 0 ? "↑ Tools" : "↑ Prev"}
                    </span>
                  </button>

                  <div className="stepper-progress-pills">
                    {MILESTONES.map((item, dotIdx) => (
                      <button
                        key={dotIdx}
                        type="button"
                        onClick={() => goToMilestone(dotIdx)}
                        className={`stepper-dot ${activeIndex === dotIdx ? "is-active" : ""}`}
                        style={{
                          backgroundColor:
                            activeIndex === dotIdx
                              ? currentMilestone.accent
                              : "var(--border-color)",
                        }}
                        title={`Jump to ${item.role}`}
                        aria-label={`Jump to ${item.role}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="stepper-arrow-btn"
                    title={activeIndex === MILESTONES.length - 1 ? "Continue to Contact" : "Next Milestone"}
                  >
                    <span className="stepper-btn-label-desktop">
                      {activeIndex === MILESTONES.length - 1
                        ? "Continue to Contact ↓"
                        : "Next Milestone ↓"}
                    </span>
                    <span className="stepper-btn-label-mobile">
                      {activeIndex === MILESTONES.length - 1
                        ? "Contact ↓"
                        : "Next ↓"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE CONTINUOUS TIMELINE (<= 768px): Natural Scroll & Visible Neon Rail
          ========================================================================= */}
      <div className="experience-mobile-timeline container">
        <div className="experience-mobile-header">
          <h2 className="section-title experience-heading">Work Experience</h2>
          <p className="mobile-timeline-lead">
            Career path and production engineering milestones.
          </p>
        </div>

        <div className="mobile-timeline-track-flow">
          {MILESTONES.map((item, idx) => (
            <div
              key={item.id}
              className="mobile-timeline-item"
              style={{
                "--item-accent": item.accent,
                "--item-glow": item.glow,
              }}
            >
              {/* Visible Rail Track Column on Mobile */}
              <div className="mobile-timeline-track-col">
                <div className="mobile-timeline-node">
                  <span className="mobile-node-pip">{item.index}</span>
                </div>
                {idx < MILESTONES.length - 1 && (
                  <>
                    <div className="mobile-timeline-rail-line"></div>
                    <div className="mobile-timeline-rail-sleepers"></div>
                  </>
                )}
              </div>

              {/* Milestone Content Card */}
              <div className="mobile-timeline-content-col">
                <div className="mobile-experience-card">
                  {/* Top Phase & Period */}
                  <div className="card-top-row">
                    <div className="card-phase-tag">
                      <span
                        className="phase-pulse-pip"
                        style={{ backgroundColor: item.accent }}
                      ></span>
                      <span>{item.phase}</span>
                    </div>

                    <div className="card-meta-chips">
                      <span
                        className="meta-badge-period"
                        style={{ color: item.accent }}
                      >
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Role & Company */}
                  <div className="card-identity-block">
                    <h3 className="card-role-title">{item.role}</h3>
                    <div className="card-company-line">
                      <span className="company-name">{item.company}</span>
                      <span className="company-divider">•</span>
                      <span className="company-location">{item.location}</span>
                    </div>
                    <div style={{ marginTop: "4px" }}>
                      <span className="company-badge-status">{item.statusBadge}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="card-summary-paragraph">{item.summary}</p>

                  {/* Key Stats Banner */}
                  <div className="card-stats-banner">
                    {item.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="card-stat-pill">
                        <span className="stat-pill-value" style={{ color: item.accent }}>
                          {stat.value}
                        </span>
                        <span className="stat-pill-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlights List */}
                  <div className="card-highlights-block">
                    <h4 className="highlights-header-title">KEY IMPACT & RESPONSIBILITIES</h4>
                    <ul className="card-highlights-list">
                      {item.highlights.map((itemText, hIdx) => (
                        <li key={hIdx} className="card-highlight-item">
                          <span
                            className="highlight-arrow"
                            style={{ color: item.accent }}
                          >
                            ▹
                          </span>
                          <span className="highlight-text">{itemText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
