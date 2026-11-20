"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const [prevCardIndex, setPrevCardIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const stepRef = useRef(0);
  const heroRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });

  // 3D Mouse parallax tracking across the entire viewport for desktop/laptop
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (typeof window === "undefined" || window.innerWidth < 960) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) / centerX;
      const y = (e.clientY - centerY) / centerY;
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));
      setHeroMouse({ x: Number(clampedX.toFixed(3)), y: Number(clampedY.toFixed(3)) });
    };

    const handleMouseLeave = () => {
      setHeroMouse({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setCardTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  // Phase 1: 3 Phrase Steps (Steps 1, 2, 3)
  const phraseGroups = [
    {
      stepIndex: 1,
      words: [
        { text: "2.8+ years", highlight: false },
        { text: "building", highlight: false },
        { text: "scalable,", highlight: true },
      ],
    },
    {
      stepIndex: 2,
      words: [{ text: "production-grade", highlight: true }],
    },
    {
      stepIndex: 3,
      words: [
        { text: "web", highlight: false },
        { text: "solutions.", highlight: false },
      ],
    },
  ];

  // Phase 2: 4 Showcase Cards (Steps 5, 6, 7, 8)
  const showcaseCards = [
    {
      id: "prod-products",
      stat: "04+",
      title: "Production Products",
      shortTitle: "Products",
      subtitle: "Full-stack enterprise applications built for scale & operations",
      items: ["ERP Systems", "CRM Modules", "Job Portal", "Resale Platform"],
    },
    {
      id: "client-projects",
      stat: "06+",
      title: "Client Projects",
      shortTitle: "Clients",
      subtitle: "Delivered real-world client production solutions",
      items: ["Logistics Automation", "Interior Business App", "Temple CMS", "Live Tracking"],
    },
    {
      id: "projects-supported",
      stat: "70+",
      title: "Projects Supported",
      shortTitle: "Mentoring",
      subtitle: "Guided developers & built academic/hardware systems",
      items: ["Full-Stack Dev", "Deep Debugging", "Backend Architecture", "Technical Mentoring"],
    },
    {
      id: "efficiency-boost",
      stat: "40–60%",
      title: "Efficiency Improved",
      shortTitle: "Efficiency",
      subtitle: "Reduced manual effort via automated workflows",
      items: ["Workflow Automation", "Scalable REST APIs", "DB Optimization", "Deployment Control"],
    },
  ];

  // Total steps = 9 (1..3 phrase, 4 phrase complete holding step, 5 intro title, 6..9 cards)
  const totalSteps = 9;

  // GSAP ScrollTrigger: Pins Hero to the top of the viewport,
  // with a generous 5400px runway giving each count card plenty of slow, comfortable reading time!
  useGSAP(
    () => {
      if (!heroRef.current) return;

      const cardSnapPoints = [0, 0.10, 0.17, 0.24, 0.365, 0.52, 0.66, 0.80, 0.935];

      const st = ScrollTrigger.create({
        trigger: heroRef.current,
        pin: true,
        start: "top top",
        end: "+=5000", // Well-balanced runway: neither rushed nor lingering too long
        scrub: 0.16,   // Smooth and responsive tracking
        snap: {
          snapTo: cardSnapPoints,
          duration: { min: 0.18, max: 0.38 },
          delay: 0.20, // 200ms natural resting pause
          ease: "power1.out",
        },
        onUpdate: (self) => {
          const p = self.progress; // 0.0 to 1.0

          // Balanced plateaus:
          // Phrase steps (0.00 to 0.28) (~1400px)
          // "WORK THAT I'VE DONE" intro title (0.28 to 0.45) (~850px: balanced sweet spot)
          // 4 Count Showcase Cards (0.45 to 1.00) (~2750px total, ~690px per card)
          let step = 0;
          if (p < 0.07) {
            step = 0;
          } else if (p < 0.14) {
            step = 1;
          } else if (p < 0.21) {
            step = 2;
          } else if (p < 0.28) {
            step = 3;
          } else if (p < 0.45) {
            step = 5; // Stage 2 "WORK THAT I'VE DONE." (~850px runway, fast enough to not drag)
          } else if (p < 0.59) {
            step = 6; // Card 0: "04+ Production Products" (~700px runway)
          } else if (p < 0.73) {
            step = 7; // Card 1: "06+ Client Projects" (~700px runway)
          } else if (p < 0.87) {
            step = 8; // Card 2: "70+ Projects Supported" (~700px runway)
          } else {
            step = 9; // Card 3: "40–60% Efficiency Boost" (~650px runway)
          }

          if (step !== stepRef.current) {
            setSlideDirection(step > stepRef.current ? "next" : "prev");
            stepRef.current = step;
            setActiveStep(step);
          }
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        st.kill();
      };
    },
    { scope: heroRef }
  );

  // Stage determinations:
  const isStage1 = activeStep <= 4;
  const isStage2 = activeStep === 5;
  const isStage3 = activeStep >= 6;

  const cardIndex = Math.max(0, Math.min(3, activeStep - 6));

  useEffect(() => {
    if (activeStep >= 6) {
      const currentIdx = activeStep - 6;
      if (prevCardIndex !== null && prevCardIndex !== currentIdx) {
        const startTimer = setTimeout(() => {
          setIsTransitioning(true);
        }, 0);
        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        transitionTimeoutRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setPrevCardIndex(currentIdx);
        }, 520);
        return () => clearTimeout(startTimer);
      } else if (prevCardIndex === null) {
        const initTimer = setTimeout(() => {
          setPrevCardIndex(currentIdx);
        }, 0);
        return () => clearTimeout(initTimer);
      }
    }
  }, [activeStep, prevCardIndex]);

  const handlePrevCard = () => {
    if (cardIndex > 0 && scrollTriggerRef.current) {
      const cardCenters = [0.52, 0.66, 0.80, 0.935];
      const targetP = cardCenters[cardIndex - 1];
      const st = scrollTriggerRef.current;
      window.scrollTo({
        top: st.start + (st.end - st.start) * targetP,
        behavior: "smooth",
      });
    } else if (cardIndex > 0) {
      setSlideDirection("prev");
      setActiveStep(6 + (cardIndex - 1));
    }
  };

  const handleNextCard = () => {
    if (cardIndex < 3 && scrollTriggerRef.current) {
      const cardCenters = [0.52, 0.66, 0.80, 0.935];
      const targetP = cardCenters[cardIndex + 1];
      const st = scrollTriggerRef.current;
      window.scrollTo({
        top: st.start + (st.end - st.start) * targetP,
        behavior: "smooth",
      });
    } else if (cardIndex < 3) {
      setSlideDirection("next");
      setActiveStep(6 + (cardIndex + 1));
    }
  };

  const renderCardContent = (card, idx) => (
    <div className="card-ambient-jiggle">
      <div
        className="showcase-card spotlight-active tilt-card-3d"
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        style={{
          transform:
            cardTilt.x !== 0 || cardTilt.y !== 0
              ? `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) scale3d(1.025, 1.025, 1.025)`
              : undefined,
        }}
      >
        <div className="card-header">
          <span className="card-stat-big">{card.stat}</span>
        </div>

        <h3 className="card-title">{card.title}</h3>
        <p className="card-subtitle">{card.subtitle}</p>

        <div className="card-items-grid">
          {card.items.map((item, itemIdx) => (
            <div key={itemIdx} className="card-item-tag">
              <span className="tag-dot"></span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-glow-bg hero-glow-1"></div>
      <div className="hero-glow-bg hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-stage-viewport">
          {/* STAGE 1: HEADLINE PHRASE, BIO & PARALLAX LASSO ART */}
          {isStage1 && (
            <div className="hero-stage-block stage-active stage-fade-enter hero-stage-split">
              {/* Left Column: Headline Phrase & Bio */}
              <div className="hero-stage-text-col">
                <h1 className="hero-title">
                  <span className="name-emphasis">{personalInfo.name}</span>
                  <span className="hero-title-separator">—</span>

                  <span className="word-reveal-container">
                    {phraseGroups.map((group) => {
                      const isGroupActive = activeStep >= group.stepIndex;

                      return group.words.map((item, wordIdx) => (
                        <span
                          key={`${group.stepIndex}-${wordIdx}`}
                          className={`word-item ${
                            isGroupActive
                              ? item.highlight
                                ? "word-item-highlight"
                                : "word-item-active"
                              : "word-item-dim"
                          }`}
                        >
                          {item.text}{" "}
                        </span>
                      ));
                    })}
                  </span>
                </h1>

                <p className="hero-description">{personalInfo.bio}</p>
              </div>

              {/* Right Column: 3D Overlapping Translucent Glass Architecture Showcase (Laptop & Desktop Only) */}
              <div className="hero-stage-visual-col" aria-hidden="true">
                <div
                  className="hero-3d-glass-stage"
                  style={{
                    transform: `perspective(1100px) rotateY(${heroMouse.x * 16}deg) rotateX(${-heroMouse.y * 16}deg)`,
                  }}
                >
                  {/* Atmospheric soft glow orbs behind the translucent glass */}
                  <div
                    className="glass-stage-glow glow-cyan"
                    style={{
                      transform: `translate(${heroMouse.x * -35}px, ${heroMouse.y * -35}px)`,
                    }}
                  ></div>
                  <div
                    className="glass-stage-glow glow-violet"
                    style={{
                      transform: `translate(${heroMouse.x * 30}px, ${heroMouse.y * 30}px)`,
                    }}
                  ></div>

                  {/* Layer 1: Back Overlapping Translucent Terminal Panel (Clean JSON inside box) */}
                  <div
                    className="glass-card glass-card-back"
                    style={{
                      transform: `translate3d(${heroMouse.x * -16}px, ${heroMouse.y * -16}px, 0px)`,
                    }}
                  >
                    <div className="glass-card-top-bar">
                      <div className="window-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <span className="glass-card-tag">developer.json</span>
                    </div>
                    <div className="glass-terminal-body">
                      <p className="code-line">
                        <span className="json-brace">&#123;</span>
                      </p>
                      <p className="code-line code-indent">
                        <span className="json-key">&quot;name&quot;</span>: <span className="json-val">&quot;Badrinath M H&quot;</span>,
                      </p>
                      <p className="code-line code-indent">
                        <span className="json-key">&quot;role&quot;</span>: <span className="json-val">&quot;Full-Stack SDE&quot;</span>,
                      </p>
                      <p className="code-line code-indent">
                        <span className="json-key">&quot;status&quot;</span>: <span className="json-val-green">&quot;Ready for SDE&quot;</span>
                      </p>
                      <p className="code-line">
                        <span className="json-brace">&#125;</span>
                      </p>
                    </div>
                  </div>

                  {/* Layer 2: Middle Translucent Architecture Canvas (Overlapping Layer 1) */}
                  <div
                    className="glass-card glass-card-main"
                    style={{
                      transform: `translate3d(${heroMouse.x * 24}px, ${heroMouse.y * 24}px, 50px)`,
                    }}
                  >
                    <div className="glass-card-header">
                      <div className="glass-badge-status">
                        <span className="pulse-beacon"></span>
                        <span>SYSTEM ARCHITECTURE</span>
                      </div>
                      <span className="glass-latency">18ms latency</span>
                    </div>

                    <div className="architecture-nodes-flow">
                      <div className="arch-node-box">
                        <span className="node-icon">⚡</span>
                        <span className="node-label">Frontend UI</span>
                      </div>
                      <div className="arch-flow-arrow">➔</div>
                      <div className="arch-node-box is-active">
                        <span className="node-icon">⚙</span>
                        <span className="node-label">REST API</span>
                      </div>
                      <div className="arch-flow-arrow">➔</div>
                      <div className="arch-node-box">
                        <span className="node-icon">🗄</span>
                        <span className="node-label">DB Cluster</span>
                      </div>
                    </div>

                    <div className="glass-metrics-bar">
                      <div className="metric-cell">
                        <span className="metric-val">2.8+</span>
                        <span className="metric-lbl">Years Exp</span>
                      </div>
                      <div className="metric-cell">
                        <span className="metric-val">6+</span>
                        <span className="metric-lbl">Production</span>
                      </div>
                      <div className="metric-cell">
                        <span className="metric-val">70+</span>
                        <span className="metric-lbl">Guided</span>
                      </div>
                    </div>
                  </div>

                  {/* Layer 3: Front Overlapping Translucent Floating Pill Badge (Interactive Button to Contact) */}
                  <Link
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const contactEl = document.getElementById("contact");
                      if (contactEl) {
                        contactEl.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.hash = "#contact";
                      }
                    }}
                    className="glass-card glass-card-front"
                    style={{
                      transform: `translate3d(${heroMouse.x * 48}px, ${heroMouse.y * 48}px, 100px)`,
                    }}
                    aria-label="Scroll to contact section"
                  >
                    <span className="front-badge-dot"></span>
                    <span className="front-badge-text">Available For SDE Roles</span>
                    <span className="front-badge-arrow">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 2: "WORK THAT I'VE DONE." STAGGERED INTRO (Active for step 4) */}
          {isStage2 && (
            <div className="hero-stage-block stage-active stage-fade-enter">
              <div className="stage-title-intro">
                <h2 className="showcase-giant-title">
                  <div className="title-word-line">WORK</div>
                  <div className="title-word-line">THAT</div>
                  <div className="title-word-line"><span className="gradient-text">I&apos;VE DONE.</span></div>
                </h2>

                <p className="showcase-lead" style={{ marginTop: "1.5rem" }}>
                  Key achievements & production deliverables.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 3: SINGLE SPOTLIGHT CARD STAGE (Active steps 5..8, 1 card per step!) */}
          {isStage3 && (
            <div className="hero-stage-block stage-active stage-fade-enter">
              <div className="stage-single-card">
                {/* Atmospheric ambient glows in the outer empty space */}
                <div className="spotlight-outer-glow glow-left" aria-hidden="true"></div>
                <div className="spotlight-outer-glow glow-right" aria-hidden="true"></div>

                {/* SPOTLIGHT CARD CONTAINER WITH SIDE ARROWS & OUTER LABELS */}
                <div className="spotlight-card-container-with-arrows">
                  <div className="spotlight-outer-meta left-meta" aria-hidden="true">
                    <span>DELIVERABLES</span>
                  </div>

                  <button
                    className="card-nav-arrow arrow-left"
                    onClick={handlePrevCard}
                    disabled={cardIndex === 0}
                    aria-label="Previous card"
                    title="Previous card"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  {/* SINGLE CENTERED CARD STAGE WITH 3D DECK SILHOUETTES */}
                  <div className="single-spotlight-wrapper">
                    {/* Stack silhouette layer 2 (deepest card in stack) */}
                    {cardIndex < 3 && <div className="stacked-card-bg stack-layer-2"></div>}
                    {/* Stack silhouette layer 1 (directly behind top card) */}
                    {cardIndex < 3 && <div className="stacked-card-bg stack-layer-1"></div>}

                    {/* EXITING CARD ANIMATION */}
                    {isTransitioning && prevCardIndex !== null && prevCardIndex !== cardIndex && showcaseCards[prevCardIndex] && (
                      <div
                        key={`exit-${showcaseCards[prevCardIndex].id}-${slideDirection}`}
                        className={`single-full-card card-exit card-exit-${slideDirection}`}
                      >
                        {renderCardContent(showcaseCards[prevCardIndex], prevCardIndex)}
                      </div>
                    )}

                    {/* ENTERING / ACTIVE CARD */}
                    {showcaseCards[cardIndex] && (
                      <div
                        key={`enter-${showcaseCards[cardIndex].id}-${slideDirection}`}
                        className={`single-full-card card-active card-slide-${slideDirection}`}
                      >
                        {renderCardContent(showcaseCards[cardIndex], cardIndex)}
                      </div>
                    )}
                  </div>

                  <button
                    className="card-nav-arrow arrow-right"
                    onClick={handleNextCard}
                    disabled={cardIndex === 3}
                    aria-label="Next card"
                    title="Next card"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  <div className="spotlight-outer-meta right-meta" aria-hidden="true">
                    <span>IMPACT</span>
                  </div>
                </div>

                {/* OUTSIDE THE CARD: Interactive Milestone Pills */}
                <div className="stage-milestone-strip">
                  {showcaseCards.map((c, i) => (
                    <button
                      key={c.id}
                      className={`milestone-pill-btn ${i === cardIndex ? "active" : ""}`}
                      onClick={() => {
                        if (scrollTriggerRef.current) {
                          const cardCenters = [0.52, 0.66, 0.80, 0.935];
                          const targetP = cardCenters[i];
                          const st = scrollTriggerRef.current;
                          window.scrollTo({
                            top: st.start + (st.end - st.start) * targetP,
                            behavior: "smooth",
                          });
                        } else {
                          setSlideDirection(i > cardIndex ? "next" : "prev");
                          setActiveStep(6 + i);
                        }
                      }}
                      aria-label={`Switch to ${c.title}`}
                    >
                      <span className="milestone-dot"></span>
                      <span className="milestone-label milestone-label-full">{c.title}</span>
                      <span className="milestone-label milestone-label-short">{c.shortTitle || c.title.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Hint at Bottom */}
        <div className="hero-scroll-hint">
          <span className="scroll-mouse-icon">
            <span className="scroll-wheel"></span>
          </span>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
