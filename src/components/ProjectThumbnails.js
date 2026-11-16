"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { projects, personalInfo } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Single Clean Project Item inside a desktop page
function ProjectCardItem({ project, indexNumber }) {
  if (!project) return null;
  const formattedIndex = String(indexNumber).padStart(2, "0");
  return (
    <div className="book-project-card-item">
      <div className="project-card-top-row">
        <span className="project-index-pill">{formattedIndex}</span>
        <span className="project-category-tag">{project.category}</span>
        {project.type && (
          <span
            className="project-type-pill"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: "4px",
              background: project.type === "Production" ? "rgba(59, 130, 246, 0.15)" : "rgba(16, 185, 129, 0.15)",
              color: project.type === "Production" ? "var(--accent-blue, #3b82f6)" : "var(--accent-green, #10b981)",
              border: `1px solid ${project.type === "Production" ? "rgba(59, 130, 246, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
            }}
          >
            {project.type}
          </span>
        )}
        {project.period && <span className="project-period-tag">{project.period}</span>}
      </div>

      <h4 className="project-item-title">{project.name}</h4>

      <p className="project-item-desc">{project.description}</p>

      <div className="project-card-bottom-row">
        <div className="project-mini-tags">
          {project.tags &&
            project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="book-tag-pill">
                {tag}
              </span>
            ))}
        </div>
        <Link
          href={`/projects#${project.id}`}
          className="project-item-link-btn"
          id={`book-project-link-${project.id}`}
        >
          <span>VIEW</span>
          <span className="btn-arrow-icon">↗</span>
        </Link>
      </div>
    </div>
  );
}

// 2 Projects per Page (Used on Desktop Horizontal Book)
function DoubleProjectPage({ projectA, projectB, indexA, indexB, side = "left" }) {
  return (
    <div className={`book-page page-${side} double-project-page`}>
      <ProjectCardItem project={projectA} indexNumber={indexA} />
      <div className="page-project-separator"></div>
      <ProjectCardItem project={projectB} indexNumber={indexB} />
      <div className={`inner-page-fold-shadow ${side}-fold`}></div>
    </div>
  );
}

// Final Project 9 + High-Impact Solution Card on Desktop Spread 3 Left
function FinalProjectPage({ project, indexNumber }) {
  return (
    <div className="book-page page-left double-project-page">
      <ProjectCardItem project={project} indexNumber={indexNumber} />
      <div className="page-project-separator"></div>
      <div className="book-project-card-item highlight-card-item">
        <div className="project-card-top-row">
          <span className="project-index-pill">★</span>
          <span className="project-category-tag">SYSTEM IMPACT</span>
          <span
            className="project-type-pill"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: "4px",
              background: "rgba(139, 92, 246, 0.15)",
              color: "var(--accent-purple, #8b5cf6)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            }}
          >
            Delivered
          </span>
        </div>
        <h4 className="project-item-title">Autonomous Production &amp; Client Solutions</h4>
        <p className="project-item-desc">
          3 enterprise production systems &amp; 6 independent freelance platforms delivering 40–95% workflow automation, billing, and API integrations.
        </p>
        <div className="project-card-bottom-row">
          <div className="project-mini-tags">
            <span className="book-tag-pill">End-to-End</span>
            <span className="book-tag-pill">Automation</span>
            <span className="book-tag-pill">APIs &amp; RBAC</span>
          </div>
          <Link href="/projects" className="project-item-link-btn" id="book-project-link-all">
            <span>ALL 9</span>
            <span className="btn-arrow-icon">➔</span>
          </Link>
        </div>
      </div>
      <div className="inner-page-fold-shadow left-fold"></div>
    </div>
  );
}

// Archive Summary Page on Desktop Spread 3 Right
function ArchiveSummaryPage() {
  return (
    <div className="book-page page-right double-project-page archive-summary-page">
      <div className="archive-summary-box">
        <div className="archive-summary-header">
          <span className="archive-tag">SYSTEMS ARCHIVE</span>
          <span className="archive-status-badge">● PRODUCTION READY</span>
        </div>

        <h4 className="archive-summary-title">Engineered For Real-World Scale</h4>
        <p className="archive-summary-desc">
          All 9 client platforms &amp; enterprise production systems engineered with clean architectures, secure session handling, and robust deployments.
        </p>

        <div className="archive-metrics-grid">
          <div className="archive-metric-item">
            <span className="metric-num">9+</span>
            <span className="metric-label">Production Deliverables</span>
          </div>
          <div className="archive-metric-item">
            <span className="metric-num">70+</span>
            <span className="metric-label">Projects Guided</span>
          </div>
          <div className="archive-metric-item">
            <span className="metric-num">2.8+</span>
            <span className="metric-label">Years SDE Exp</span>
          </div>
        </div>

        <div className="archive-actions-block">
          <Link href="/projects" className="book-creative-action-btn">
            <span>UNVEIL COMPLETE ARCHIVE</span>
            <span className="btn-arrow-icon">➔</span>
          </Link>
          <Link href="#contact" className="archive-contact-btn">
            <span>GET IN TOUCH WITH DEVELOPER</span>
            <span className="btn-arrow-icon">↗</span>
          </Link>
        </div>
      </div>
      <div className="inner-page-fold-shadow right-fold"></div>
    </div>
  );
}

// Touch-Swipeable Project Deck Component for Mobile & Tablet (<= 768px)
function MobileProjectDeck({
  projectsList,
  currentIndex,
  onNext,
  onPrev,
  onSelectIndex,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) {
  const isArchive = currentIndex === projectsList.length;
  const currentProject = !isArchive ? projectsList[currentIndex] : null;
  const totalCount = projectsList.length + 1; // 6 projects + 1 archive = 7

  return (
    <div
      className="mobile-only-deck"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top Deck Info Bar */}
      <div className="mobile-deck-header-row">
        <span className="mobile-deck-counter-badge">
          {isArchive
            ? "SYSTEMS ARCHIVE"
            : `PROJECT ${String(currentIndex + 1).padStart(2, "0")} OF ${String(projectsList.length).padStart(2, "0")}`}
        </span>
        <span className="mobile-deck-swipe-hint">
          <span>Swipe card</span>
          <span className="swipe-arrows">◄ ►</span>
        </span>
      </div>

      {/* Main Touch Card Container */}
      <div className="mobile-project-card-container">
        {!isArchive && currentProject ? (
          <div className="mobile-project-deck-card" key={currentProject.id}>
            <div className="mobile-deck-card-top">
              <span className="mobile-deck-num-pill">{String(currentIndex + 1).padStart(2, "0")}</span>
              <span className="mobile-deck-cat-pill">{currentProject.category}</span>
              {currentProject.type && (
                <span
                  className="mobile-deck-period-pill"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "4px",
                    background:
                      currentProject.type === "Production"
                        ? "rgba(59, 130, 246, 0.15)"
                        : "rgba(16, 185, 129, 0.15)",
                    color:
                      currentProject.type === "Production"
                        ? "var(--accent-blue, #3b82f6)"
                        : "var(--accent-green, #10b981)",
                    border: `1px solid ${
                      currentProject.type === "Production"
                        ? "rgba(59, 130, 246, 0.3)"
                        : "rgba(16, 185, 129, 0.3)"
                    }`,
                  }}
                >
                  {currentProject.type}
                </span>
              )}
              {currentProject.period && (
                <span className="mobile-deck-period-pill">{currentProject.period}</span>
              )}
            </div>

            <h3 className="mobile-deck-card-title">{currentProject.name}</h3>

            {currentProject.impact && (
              <div className="mobile-deck-impact-badge">
                <span className="impact-bullet">★</span>
                <span>{currentProject.impact}</span>
              </div>
            )}

            <p className="mobile-deck-card-desc">{currentProject.description}</p>

            <div className="mobile-deck-tags-cloud">
              {currentProject.tags &&
                currentProject.tags.slice(0, 5).map((t) => (
                  <span key={t} className="mobile-deck-tag-chip">
                    {t}
                  </span>
                ))}
            </div>

            <div className="mobile-deck-card-actions">
              <Link
                href={`/projects#${currentProject.id}`}
                className="mobile-deck-view-btn"
                id={`mobile-project-view-${currentProject.id}`}
              >
                <span>View Details &amp; Architecture</span>
                <span className="btn-arrow-icon">↗</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mobile-project-deck-card archive-deck-card" key="archive">
            <div className="archive-deck-badge-row">
              <span className="archive-deck-tag">SYSTEMS ARCHIVE</span>
              <span className="archive-deck-status">● PRODUCTION READY</span>
            </div>

            <h3 className="mobile-deck-card-title">Engineered For Real-World Scale</h3>

            <p className="mobile-deck-card-desc">
              All 9 client platforms &amp; enterprise production systems engineered with clean architectures, secure session handling, and robust deployments.
            </p>

            <div className="archive-deck-metrics-grid">
              <div className="archive-deck-metric">
                <span className="metric-val">9+</span>
                <span className="metric-txt">Production Deliverables</span>
              </div>
              <div className="archive-deck-metric">
                <span className="metric-val">70+</span>
                <span className="metric-txt">Projects Guided</span>
              </div>
              <div className="archive-deck-metric">
                <span className="metric-val">2.8+</span>
                <span className="metric-txt">Years SDE Exp</span>
              </div>
            </div>

            <div className="mobile-deck-archive-actions">
              <Link href="/projects" className="mobile-deck-view-btn primary-archive-btn">
                <span>Unveil Complete Projects Archive</span>
                <span className="btn-arrow-icon">➔</span>
              </Link>
              <Link href="#contact" className="mobile-deck-contact-btn">
                <span>Get In Touch With Developer</span>
                <span className="btn-arrow-icon">↗</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Tactile Bottom Navigation Dock */}
      <div className="mobile-deck-nav-bar">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="mobile-deck-nav-btn prev-btn"
          aria-label="Previous project"
        >
          <span>◀ PREV</span>
        </button>

        <div className="mobile-deck-dots-list">
          {Array.from({ length: totalCount }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className={`mobile-deck-dot-pip ${currentIndex === idx ? "active" : ""}`}
              aria-label={idx < projectsList.length ? `Go to project ${idx + 1}` : "Go to Archive"}
              title={idx < projectsList.length ? `Project 0${idx + 1}` : "Archive"}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex === totalCount - 1}
          className="mobile-deck-nav-btn next-btn"
          aria-label="Next project"
        >
          <span>NEXT ▶</span>
        </button>
      </div>
    </div>
  );
}

export default function ProjectThumbnails() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(0);
  const [targetSpreadIndex, setTargetSpreadIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState("next");
  const [isUserHovered, setIsUserHovered] = useState(false);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bookRef = useRef(null);

  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const flipTimerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!sectionRef.current || !headingRef.current || !bookRef.current) return;

        // Smooth Entrance from Left for Heading Panel on scroll
        gsap.fromTo(
          headingRef.current,
          { x: -75, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Smooth Entrance for 3D Book Binder
        gsap.fromTo(
          bookRef.current,
          { scale: 0.93, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Desktop book has 3 spreads (4 projects on spread 1, 4 projects on spread 2, 1 project + archive on spread 3)
  const totalSpreads = 3;
  const totalMobileItems = projects.length + 1; // 9 projects + 1 archive = 10

  const handleNextMobileProject = () => {
    if (mobileProjectIndex < totalMobileItems - 1) {
      setMobileProjectIndex((prev) => prev + 1);
    }
  };

  const handlePrevMobileProject = () => {
    if (mobileProjectIndex > 0) {
      setMobileProjectIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchStartRef.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.targetTouches && e.targetTouches.length > 0) {
      touchEndRef.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    if (distance > 40) {
      handleNextMobileProject();
    } else if (distance < -40) {
      handlePrevMobileProject();
    }
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // Auto-turn spread every 7s on desktop when open and idle
  useEffect(() => {
    if (!isOpen || isOpening || isUserHovered || isFlipping) return;

    const autoTurnInterval = setInterval(() => {
      const nextIdx = (activeSpreadIndex + 1) % totalSpreads;
      const direction = nextIdx > activeSpreadIndex ? "next" : "prev";
      goToSpread(nextIdx, direction);
    }, 7000);

    return () => clearInterval(autoTurnInterval);
  }, [isOpen, isOpening, isUserHovered, isFlipping, activeSpreadIndex, totalSpreads]);

  const handleOpenBook = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsOpening(false);
    }, 850);
  };

  const handleCloseBook = (e) => {
    e.stopPropagation();
    if (!isOpen || isOpening) return;
    setIsOpening(true);
    setIsOpen(false);
    setActiveSpreadIndex(0);
    setTimeout(() => {
      setIsOpening(false);
    }, 850);
  };

  const goToSpread = (targetIdx, dir) => {
    if (targetIdx === activeSpreadIndex || isFlipping) return;
    if (targetIdx < 0 || targetIdx >= totalSpreads) return;

    const direction = dir || (targetIdx > activeSpreadIndex ? "next" : "prev");
    setTargetSpreadIndex(targetIdx);
    setFlipDir(direction);
    setIsFlipping(true);

    if (flipTimerRef.current) clearTimeout(flipTimerRef.current);

    flipTimerRef.current = setTimeout(() => {
      setActiveSpreadIndex(targetIdx);
      setIsFlipping(false);
    }, 850);
  };

  const handleNextPage = () => {
    if (isFlipping) return;
    const nextIdx = (activeSpreadIndex + 1) % totalSpreads;
    goToSpread(nextIdx, "next");
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    const prevIdx = activeSpreadIndex === 0 ? totalSpreads - 1 : activeSpreadIndex - 1;
    goToSpread(prevIdx, "prev");
  };

  // Helper to render desktop pages
  const renderDesktopPage = (spreadIdx, side) => {
    if (spreadIdx === 0) {
      if (side === "left") {
        return (
          <DoubleProjectPage
            projectA={projects[0]}
            projectB={projects[1]}
            indexA={1}
            indexB={2}
            side="left"
          />
        );
      }
      return (
        <DoubleProjectPage
          projectA={projects[2]}
          projectB={projects[3]}
          indexA={3}
          indexB={4}
          side="right"
        />
      );
    }

    if (spreadIdx === 1) {
      if (side === "left") {
        return (
          <DoubleProjectPage
            projectA={projects[4]}
            projectB={projects[5]}
            indexA={5}
            indexB={6}
            side="left"
          />
        );
      }
      return (
        <DoubleProjectPage
          projectA={projects[6]}
          projectB={projects[7]}
          indexA={7}
          indexB={8}
          side="right"
        />
      );
    }

    if (spreadIdx === 2) {
      if (side === "left") {
        return (
          <FinalProjectPage
            project={projects[8]}
            indexNumber={9}
          />
        );
      }
      return <ArchiveSummaryPage />;
    }

    return null;
  };

  // Stationary pages behind the turn on desktop
  const stationaryLeftSpread = isFlipping && flipDir === "prev" ? targetSpreadIndex : activeSpreadIndex;
  const stationaryRightSpread = isFlipping && flipDir === "next" ? targetSpreadIndex : activeSpreadIndex;

  return (
    <section className="section project-book-section" id="projects" ref={sectionRef}>
      <div className="container project-book-stage-container">
        {/* =====================================================================
            1. DESKTOP ONLY: Side-by-Side Architectural Stage (> 768px)
            ===================================================================== */}
        <div className="project-desktop-layout">
          {/* Left Side: Animated Heading & Project Info Column */}
          <aside className="project-heading-side-panel" ref={headingRef}>
            <div className="section-label">
              <span className="label-number">02</span>
              <span className="label-divider"></span>
              <span>ARCHITECTURAL ARCHIVE</span>
            </div>

            <h2 className="section-title project-stage-title">Projects with purpose</h2>

            <p className="project-stage-lead">
              An architectural project binder featuring production engineering, client platforms, and scalable REST architectures.
            </p>

            <div className="project-side-stats-list">
              <div className="side-stat-item">
                <span className="side-stat-num">3</span>
                <span className="side-stat-text">Production Platforms</span>
              </div>
              <div className="side-stat-item">
                <span className="side-stat-num">6</span>
                <span className="side-stat-text">Client Freelance Systems</span>
              </div>
              <div className="side-stat-item">
                <span className="side-stat-num">9+</span>
                <span className="side-stat-text">Production Deliverables</span>
              </div>
            </div>

            <div className="project-side-actions">
              <Link href="/projects" className="project-stage-all-btn">
                <span>EXPLORE ALL 9 PROJECTS</span>
                <span className="btn-arrow-icon">➔</span>
              </Link>
            </div>
          </aside>

          {/* Right Side: 3D Architectural Book */}
          <div className="project-book-main-panel" ref={bookRef}>
            <div className="desktop-only-book">
              <div
                className={`unified-book-container ${
                  isOpen ? "book-state-open" : "book-state-closed"
                } book-orientation-horizontal`}
                onMouseEnter={() => setIsUserHovered(true)}
                onMouseLeave={() => setIsUserHovered(false)}
              >
                {/* Animated Floating Speech Bubble Prompt */}
                <div
                  className={`magic-book-speech-bubble ${isOpen ? "bubble-faded" : ""}`}
                  onClick={handleOpenBook}
                >
                  <span className="magic-sparkle-star">✦</span>
                  <p className="magic-instruction-text">
                    A bit heavy to open... click to help open the book!
                  </p>
                  <span className="magic-sparkle-star">✦</span>
                </div>

                {/* Close Book Action Button */}
                {isOpen && (
                  <button
                    className="book-close-trigger-btn"
                    onClick={handleCloseBook}
                    title="Close Book"
                  >
                    <span>✕ Close Book</span>
                  </button>
                )}

                {/* UNIFIED BOOK ASSEMBLY */}
                <div
                  className="unified-book-assembly"
                  onClick={!isOpen ? handleOpenBook : undefined}
                >
                  {/* Hardcover Outer Leather Base */}
                  <div className="book-leather-cover">
                    <div className="cover-gold-deboss-line"></div>
                    <div className="cover-inner-deboss-line"></div>
                  </div>

                  {/* Stacked Paper Block Pages Thickness */}
                  <div className="stacked-pages-block">
                    <div className="stacked-pages-edge edge-left"></div>
                    <div className="stacked-pages-edge edge-right"></div>
                    <div className="stacked-pages-edge edge-bottom"></div>
                    <div className="stacked-pages-edge edge-top"></div>
                  </div>

                  {/* INNER SPREAD (Desktop Left & Right) */}
                  <div className="open-book-spread">
                    <div className="spine-gutter-shadow"></div>

                    {/* Page Left */}
                    {renderDesktopPage(stationaryLeftSpread, "left")}

                    {/* Page Right */}
                    {renderDesktopPage(stationaryRightSpread, "right")}

                    {/* DESKTOP 3D TURNING PAPER SHEET */}
                    {isFlipping && (
                      <div className={`turning-paper-sheet turn-dir-${flipDir}`}>
                        <div className="turning-paper-inner">
                          <div className="sheet-face sheet-front">
                            {flipDir === "next"
                              ? renderDesktopPage(activeSpreadIndex, "right")
                              : renderDesktopPage(activeSpreadIndex, "left")}
                            <div className="paper-highlight-sweep"></div>
                          </div>
                          <div className="sheet-face sheet-back">
                            {flipDir === "next"
                              ? renderDesktopPage(targetSpreadIndex, "left")
                              : renderDesktopPage(targetSpreadIndex, "right")}
                            <div className="paper-back-shadow"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SWINGING FRONT COVER */}
                  {(!isOpen || isOpening) && (
                    <div
                      className={`swinging-front-cover ${
                        isOpen ? "cover-swing-open" : "cover-swing-closed"
                      }`}
                    >
                      <div className="front-cover-face front-cover-exterior">
                        <div className="magic-cover-inner-border">
                          <div className="magic-emblem-badge">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 2L2 7l10 5 10-5-10-5z" />
                              <path d="M2 17l10 5 10-5" />
                              <path d="M2 12l10 5 10-5" />
                            </svg>
                          </div>
                          <span className="magic-cover-vol">VOL. I • ARCHITECTURAL ARCHIVE</span>
                          <h3 className="magic-cover-title">PROJECTS WITH PURPOSE</h3>
                          <span className="magic-cover-author">{personalInfo?.name || "BADRINATH M H"}</span>

                          <div className="magic-click-cue">
                            <span className="magic-hand-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle" }}>
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                              </svg>
                            </span>
                            <span className="magic-cue-text">CLICK TO UNLOCK</span>
                          </div>
                        </div>

                        <div className="magic-page-crack-glow"></div>
                      </div>
                    </div>
                  )}

                  {/* DESKTOP SIDE NAVIGATION ARROWS */}
                  {isOpen && !isOpening && (
                    <>
                      <button
                        className="book-side-arrow arrow-left"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevPage();
                        }}
                        disabled={activeSpreadIndex === 0 && !isFlipping}
                        aria-label="Previous Page Spread"
                        title="Previous Page Spread"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <button
                        className="book-side-arrow arrow-right"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextPage();
                        }}
                        disabled={activeSpreadIndex === totalSpreads - 1 && !isFlipping}
                        aria-label="Next Page Spread"
                        title="Next Page Spread"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </>
                  )}

                  <div className="book-ground-shadow"></div>
                </div>

                {/* SPREAD INDICATOR DOTS */}
                {isOpen && !isOpening && (
                  <div className="book-page-indicator-bar">
                    <div className="spread-dots-row">
                      {Array.from({ length: totalSpreads }).map((_, idx) => (
                        <button
                          key={idx}
                          className={`spread-dot-pill ${activeSpreadIndex === idx ? "active" : ""}`}
                          onClick={() => goToSpread(idx)}
                          title={`Spread ${idx + 1}`}
                        >
                          {idx === 0
                            ? "SPREAD 1 (PG 1-4)"
                            : idx === 1
                            ? "SPREAD 2 (PG 5-8)"
                            : "SPREAD 3 (PG 9 / ARCHIVE)"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. MOBILE & TABLET ONLY: Touch-Swipeable Project Deck (<= 768px)
            ===================================================================== */}
        <div className="project-mobile-layout">
          <div className="projects-header-wrapper">
            <div className="section-label">
              <span className="label-number">02</span>
              <span className="label-divider"></span>
              <span>PROJECTS</span>
            </div>
            <h2 className="section-title">Projects with purpose</h2>
            <p className="projects-header-lead">
              An architectural project binder featuring production engineering, client platforms, and scalable REST architectures.
            </p>
          </div>

          <MobileProjectDeck
            projectsList={projects}
            currentIndex={mobileProjectIndex}
            onNext={handleNextMobileProject}
            onPrev={handlePrevMobileProject}
            onSelectIndex={setMobileProjectIndex}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
    </section>
  );
}
