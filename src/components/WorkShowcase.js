"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function WorkShowcase() {
  const [activeCard, setActiveCard] = useState(0);
  const cardRef = useRef(0);
  const sectionRef = useRef(null);
  const isCooldownRef = useRef(false);

  const showcaseData = [
    {
      id: "prod-products",
      stat: "04+",
      title: "Production Products",
      subtitle: "Full-stack enterprise applications built for scale",
      items: ["ERP Systems", "CRM Modules", "Job Portal", "Resale Platform"],
      color: "#3b82f6",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
    },
    {
      id: "client-projects",
      stat: "06+",
      title: "Client Projects",
      subtitle: "Delivered real-world client production solutions",
      items: ["Logistics Automation", "Interior Business App", "Temple CMS", "Live Tracking"],
      color: "#10b981",
      gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    },
    {
      id: "projects-supported",
      stat: "70+",
      title: "Projects Supported",
      subtitle: "Guided developers & built academic/hardware systems",
      items: ["Full-Stack Dev", "Deep Debugging", "Backend Architecture", "Technical Mentoring"],
      color: "#8b5cf6",
      gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
    },
    {
      id: "efficiency-boost",
      stat: "40–60%",
      title: "Efficiency Improved",
      subtitle: "Reduced manual effort via automated workflows",
      items: ["Workflow Automation", "Scalable REST APIs", "DB Optimization", "Deployment Control"],
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    },
  ];

  const totalCards = showcaseData.length;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleWheel = (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is active in viewport
      const isInView = rect.top <= 120 && rect.bottom >= 250;
      if (!isInView) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 5) return;

      // SCROLLING DOWN -> Move spotlight to next card (Left to Right)
      if (delta > 0) {
        if (cardRef.current < totalCards - 1) {
          if (e.cancelable) e.preventDefault();

          if (!isCooldownRef.current) {
            isCooldownRef.current = true;
            cardRef.current += 1;
            setActiveCard(cardRef.current);
            setTimeout(() => {
              isCooldownRef.current = false;
            }, 200);
          }
        }
      }
      // SCROLLING UP -> Move spotlight to previous card (Right to Left)
      else if (delta < 0) {
        if (cardRef.current > 0 && rect.top >= -50) {
          if (e.cancelable) e.preventDefault();

          if (!isCooldownRef.current) {
            isCooldownRef.current = true;
            cardRef.current -= 1;
            setActiveCard(cardRef.current);
            setTimeout(() => {
              isCooldownRef.current = false;
            }, 200);
          }
        }
      }
    };

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const rect = sectionEl.getBoundingClientRect();
      const isInView = rect.top <= 120 && rect.bottom >= 250;
      if (!isInView) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (Math.abs(deltaY) < 15) return;

      if (deltaY > 0 && cardRef.current < totalCards - 1) {
        if (e.cancelable) e.preventDefault();
        if (!isCooldownRef.current) {
          isCooldownRef.current = true;
          cardRef.current += 1;
          setActiveCard(cardRef.current);
          setTimeout(() => { isCooldownRef.current = false; }, 220);
          touchStartY = touchY;
        }
      } else if (deltaY < 0 && cardRef.current > 0 && rect.top >= -50) {
        if (e.cancelable) e.preventDefault();
        if (!isCooldownRef.current) {
          isCooldownRef.current = true;
          cardRef.current -= 1;
          setActiveCard(cardRef.current);
          setTimeout(() => { isCooldownRef.current = false; }, 220);
          touchStartY = touchY;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [totalCards]);

  return (
    <section className="section showcase-section" id="work-showcase" ref={sectionRef}>
      <div className="container">
        {/* Header Grid: WORK THAT I'VE DONE typography */}
        <div className="showcase-header-grid">
          <div className="showcase-title-block">
            <div className="section-label">
              <span className="label-number">01</span>
              <span className="label-divider"></span>
              IMPACT & DELIVERABLES
            </div>
            <h2 className="showcase-giant-title">
              WORK<br />
              THAT<br />
              <span className="gradient-text">I&apos;VE DONE.</span>
            </h2>
          </div>

          <div className="showcase-intro-block">
            <p className="showcase-lead">
              A breakdown of production engineering, client platforms, project guidance, and workflow optimizations delivered across my career.
            </p>

            {/* Step Selector Controls */}
            <div className="showcase-step-pills">
              {showcaseData.map((data, idx) => (
                <button
                  key={data.id}
                  className={`step-pill ${activeCard === idx ? "pill-active" : ""}`}
                  onClick={() => {
                    cardRef.current = idx;
                    setActiveCard(idx);
                  }}
                  style={{
                    borderColor: activeCard === idx ? data.color : "transparent",
                  }}
                >
                  <span className="pill-num">{data.stat}</span>
                  <span className="pill-title">{data.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Track Spotlight Cards (Left to Right Motion) */}
        <div className="showcase-cards-wrapper">
          <div
            className="showcase-cards-track"
            style={{
              transform: `translateX(-${activeCard * 25}%)`,
            }}
          >
            {showcaseData.map((card, idx) => {
              const isSpotlight = activeCard === idx;

              return (
                <div
                  key={card.id}
                  className={`showcase-card ${isSpotlight ? "spotlight-active" : "spotlight-dim"}`}
                  onClick={() => {
                    cardRef.current = idx;
                    setActiveCard(idx);
                  }}
                  style={{
                    "--card-accent": card.color,
                    "--card-gradient": card.gradient,
                  }}
                >
                  {/* Spotlight ambient light glow effect */}
                  {isSpotlight && <div className="card-spotlight-glow"></div>}

                  <div className="card-header">
                    <span className="card-stat-big">{card.stat}</span>
                    <span className="card-index-tag">0{idx + 1} / 04</span>
                  </div>

                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-subtitle">{card.subtitle}</p>

                  <div className="card-items-grid">
                    {card.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="card-item-tag">
                        <span className="tag-dot" style={{ backgroundColor: card.color }}></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer">
                    <span className="card-status-label">
                      {isSpotlight ? "★ Spotlight Focused" : "Click to view"}
                    </span>
                    <span className="card-arrow">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Hint Footer */}
        <div className="showcase-scroll-hint">
          <span className="scroll-mouse-icon">
            <span className="scroll-wheel"></span>
          </span>
          <span>
            {activeCard < totalCards - 1
              ? `Spotlight ${activeCard + 1} / ${totalCards}`
              : "Spotlight complete ↓"}
          </span>
        </div>
      </div>
    </section>
  );
}
