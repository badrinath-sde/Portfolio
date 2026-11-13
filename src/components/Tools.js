"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CATEGORIES = [
  { id: "all", name: "All Toolkit", shortName: "All", count: 21, color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.4)" },
  { id: "Languages", name: "Languages", shortName: "Languages", count: 4, color: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)" },
  { id: "Frontend", name: "Frontend", shortName: "Frontend", count: 4, color: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)" },
  { id: "Backend", name: "Backend", shortName: "Backend", count: 4, color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
  { id: "Database", name: "Database", shortName: "Database", count: 2, color: "#8b5cf6", glow: "rgba(139, 92, 246, 0.4)" },
  { id: "DevOps & Tools", name: "DevOps & Tools", shortName: "DevOps", count: 3, color: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)" },
  { id: "Architecture", name: "Architecture", shortName: "Arch", count: 4, color: "#3b82f6", glow: "rgba(59, 130, 246, 0.4)" },
];

const INITIAL_TOOLS_CONFIG = [
  // Sector 1: Languages (Top-Left quadrant - Amber/Gold)
  {
    id: "javascript",
    name: "JavaScript",
    category: "Languages",
    size: "large",
    radius: 48,
    level: "Core (ES6+)",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.45)",
    wobble: "wobble-1",
    delay: "0s",
    initAngle: (-135 * Math.PI) / 180,
    initDist: 165,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    size: "large",
    radius: 48,
    level: "Type-Safe Core",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.42)",
    wobble: "wobble-2",
    delay: "0.8s",
    initAngle: (-160 * Math.PI) / 180,
    initDist: 235,
  },
  {
    id: "python",
    name: "Python",
    category: "Languages",
    size: "medium",
    radius: 40,
    level: "Scripting & Backend",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.38)",
    wobble: "wobble-3",
    delay: "1.4s",
    initAngle: (-115 * Math.PI) / 180,
    initDist: 230,
  },
  {
    id: "php",
    name: "PHP",
    category: "Languages",
    size: "small",
    radius: 34,
    level: "ERP & Legacy",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.32)",
    wobble: "wobble-4",
    delay: "2.1s",
    initAngle: (-140 * Math.PI) / 180,
    initDist: 250,
  },

  // Sector 2: Frontend (Top-Right quadrant - Cyan)
  {
    id: "react",
    name: "React.js",
    category: "Frontend",
    size: "large",
    radius: 48,
    level: "Hooks & SPA",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.5)",
    wobble: "wobble-2",
    delay: "0.5s",
    initAngle: (-45 * Math.PI) / 180,
    initDist: 165,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    size: "large",
    radius: 48,
    level: "SSR & App Router",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.45)",
    wobble: "wobble-1",
    delay: "1.1s",
    initAngle: (-65 * Math.PI) / 180,
    initDist: 235,
  },
  {
    id: "redux",
    name: "Redux",
    category: "Frontend",
    size: "medium",
    radius: 40,
    level: "State Mgmt",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.38)",
    wobble: "wobble-4",
    delay: "1.7s",
    initAngle: (-25 * Math.PI) / 180,
    initDist: 230,
  },
  {
    id: "html-css",
    name: "HTML/CSS",
    category: "Frontend",
    size: "small",
    radius: 34,
    level: "Semantic Layout",
    color: "#06b6d4",
    glow: "rgba(6, 182, 212, 0.32)",
    wobble: "wobble-3",
    delay: "2.3s",
    initAngle: (-45 * Math.PI) / 180,
    initDist: 250,
  },

  // Sector 3: Backend (Right / Mid-Right quadrant - Emerald Green)
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    size: "large",
    radius: 48,
    level: "Runtime & API",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.5)",
    wobble: "wobble-3",
    delay: "0.3s",
    initAngle: (15 * Math.PI) / 180,
    initDist: 165,
  },
  {
    id: "expressjs",
    name: "Express.js",
    category: "Backend",
    size: "large",
    radius: 48,
    level: "REST Framework",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.45)",
    wobble: "wobble-1",
    delay: "0.9s",
    initAngle: (-5 * Math.PI) / 180,
    initDist: 235,
  },
  {
    id: "socketio",
    name: "Socket.io",
    category: "Backend",
    size: "medium",
    radius: 40,
    level: "Real-Time Engine",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.38)",
    wobble: "wobble-2",
    delay: "1.5s",
    initAngle: (35 * Math.PI) / 180,
    initDist: 230,
  },
  {
    id: "auth-session",
    name: "Auth & Sessions",
    category: "Backend",
    size: "medium",
    radius: 40,
    level: "RBAC & Security",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.36)",
    wobble: "wobble-4",
    delay: "2.2s",
    initAngle: (55 * Math.PI) / 180,
    initDist: 235,
  },

  // Sector 4: Database (Bottom quadrant - Purple / Violet)
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    size: "large",
    radius: 48,
    level: "Mongoose & NoSQL",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.5)",
    wobble: "wobble-4",
    delay: "0.6s",
    initAngle: (80 * Math.PI) / 180,
    initDist: 170,
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Database",
    size: "medium",
    radius: 40,
    level: "Relational Schemas",
    color: "#8b5cf6",
    glow: "rgba(139, 92, 246, 0.42)",
    wobble: "wobble-2",
    delay: "1.3s",
    initAngle: (100 * Math.PI) / 180,
    initDist: 235,
  },

  // Sector 5: DevOps & Tools (Bottom-Left quadrant - Rose / Coral)
  {
    id: "git",
    name: "Git",
    category: "DevOps & Tools",
    size: "large",
    radius: 48,
    level: "Version Control",
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.5)",
    wobble: "wobble-1",
    delay: "0.7s",
    initAngle: (135 * Math.PI) / 180,
    initDist: 170,
  },
  {
    id: "postman",
    name: "Postman",
    category: "DevOps & Tools",
    size: "medium",
    radius: 40,
    level: "API Testing",
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.38)",
    wobble: "wobble-3",
    delay: "1.6s",
    initAngle: (120 * Math.PI) / 180,
    initDist: 235,
  },
  {
    id: "cpanel",
    name: "cPanel",
    category: "DevOps & Tools",
    size: "small",
    radius: 34,
    level: "Production Host",
    color: "#f43f5e",
    glow: "rgba(244, 63, 94, 0.32)",
    wobble: "wobble-2",
    delay: "2.4s",
    initAngle: (150 * Math.PI) / 180,
    initDist: 235,
  },

  // Sector 6: Architecture (Left quadrant - Royal Blue)
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Architecture",
    size: "large",
    radius: 48,
    level: "Scalable Endpoints",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.5)",
    wobble: "wobble-3",
    delay: "0.4s",
    initAngle: (180 * Math.PI) / 180,
    initDist: 165,
  },
  {
    id: "jwt",
    name: "JWT & RBAC",
    category: "Architecture",
    size: "medium",
    radius: 40,
    level: "Token Security",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.42)",
    wobble: "wobble-1",
    delay: "1.2s",
    initAngle: (165 * Math.PI) / 180,
    initDist: 230,
  },
  {
    id: "system-design",
    name: "System Design",
    category: "Architecture",
    size: "medium",
    radius: 40,
    level: "Modular Systems",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.38)",
    wobble: "wobble-4",
    delay: "1.8s",
    initAngle: (195 * Math.PI) / 180,
    initDist: 230,
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "Architecture",
    size: "small",
    radius: 34,
    level: "Live Data Streams",
    color: "#3b82f6",
    glow: "rgba(59, 130, 246, 0.32)",
    wobble: "wobble-2",
    delay: "2.5s",
    initAngle: (210 * Math.PI) / 180,
    initDist: 240,
  },
];

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredTool, setHoveredTool] = useState(null);
  const [isAnyDragging, setIsAnyDragging] = useState(false);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const dockRef = useRef(null);
  const stagePanelRef = useRef(null);

  const stageWrapperRef = useRef(null);
  const nodeRefs = useRef({});
  const physicsStateRef = useRef([]);
  const dragStateRef = useRef({
    isDragging: false,
    dragId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    hasMoved: false,
  });

  // Center-to-left scroll entrance animation with GSAP ScrollTrigger
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        if (!sectionRef.current || !headingRef.current || !dockRef.current || !stagePanelRef.current) return;

        // Dynamic center offset so heading begins right at horizontal center of section
        const getCenterOffset = () => {
          if (typeof window !== "undefined") {
            return Math.min(460, Math.max(280, window.innerWidth * 0.28));
          }
          return 360;
        };

        // Title starts in visual center of section, smoothly glides to the left column
        gsap.fromTo(
          headingRef.current,
          {
            x: getCenterOffset(),
            opacity: 0.9,
            scale: 1.04,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Category Matrix Dock follows & unfolds beneath the title
        gsap.fromTo(
          dockRef.current,
          {
            x: getCenterOffset() * 0.82,
            y: 20,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.05,
            delay: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Full-Size Physics Bubble Universe glides in from the right
        gsap.fromTo(
          stagePanelRef.current,
          { x: 90, opacity: 0, scale: 0.93 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  // Initialize physics particles
  useEffect(() => {
    physicsStateRef.current = INITIAL_TOOLS_CONFIG.map((t) => {
      const initX = Math.cos(t.initAngle) * t.initDist;
      const initY = Math.sin(t.initAngle) * t.initDist;
      return {
        id: t.id,
        x: initX,
        y: initY,
        vx: 0,
        vy: 0,
        radius: t.radius,
        targetAngle: t.initAngle,
        targetDist: t.initDist,
      };
    });
  }, []);

  // 60FPS Stable Position-Based Relaxation Physics Loop (Zero jitter, zero overload, zero overlapping)
  useEffect(() => {
    let animationFrameId;

    const R_HUB = 92; // Center radar exclusion boundary
    const R_MAX = 295; // Outer circle boundary
    const SPRING_RETURN = 0.016; // Gentle spring pull towards home sector
    const DAMPING = 0.88; // Smooth liquid resistance

    const updatePhysics = () => {
      const particles = physicsStateRef.current;
      const drag = dragStateRef.current;
      const time = performance.now() * 0.001;

      // Step 1: Smooth organic floating & gentle home return
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (drag.isDragging && drag.dragId === p.id) {
          continue;
        }

        // Home target position
        const targetX = Math.cos(p.targetAngle) * p.targetDist;
        const targetY = Math.sin(p.targetAngle) * p.targetDist;

        // Subtle ambient organic floating wave (bubbles feel alive)
        const waveX = Math.cos(time * 0.8 + i * 0.7) * 2.2;
        const waveY = Math.sin(time * 0.9 + i * 0.8) * 2.2;

        p.vx = (p.vx + (targetX + waveX - p.x) * SPRING_RETURN) * DAMPING;
        p.vy = (p.vy + (targetY + waveY - p.y) * SPRING_RETURN) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;
      }

      // Step 2: Multi-pass Position Relaxation Constraints (Guarantees zero overlap without velocity explosions)
      for (let pass = 0; pass < 3; pass++) {
        // A. Central Hub & Outer Boundary Constraints
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const distCenter = Math.hypot(p.x, p.y);

          // Push out of central radar hub
          const minCenterDist = R_HUB + p.radius + 4;
          if (distCenter < minCenterDist && distCenter > 0.001) {
            const overlap = minCenterDist - distCenter;
            p.x += (p.x / distCenter) * overlap;
            p.y += (p.y / distCenter) * overlap;
            p.vx *= 0.5;
            p.vy *= 0.5;
          }

          // Push inside outer circle boundary
          const maxCenterDist = R_MAX - p.radius;
          if (distCenter > maxCenterDist && distCenter > 0.001) {
            const overlap = distCenter - maxCenterDist;
            p.x -= (p.x / distCenter) * overlap;
            p.y -= (p.y / distCenter) * overlap;
            p.vx *= 0.5;
            p.vy *= 0.5;
          }
        }

        // B. Pairwise Circle-Circle Relaxation (Prevents any overlap)
        for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.hypot(dx, dy);
            const minDist = p1.radius + p2.radius + 5; // 5px cushion: strictly prevents overlap

            if (dist < minDist && dist > 0.0001) {
              const overlap = (minDist - dist) / dist;
              const shiftX = dx * overlap * 0.5;
              const shiftY = dy * overlap * 0.5;

              const isP1Dragged = drag.isDragging && drag.dragId === p1.id;
              const isP2Dragged = drag.isDragging && drag.dragId === p2.id;

              if (isP1Dragged) {
                p2.x += shiftX * 2;
                p2.y += shiftY * 2;
                p2.vx += shiftX * 0.2;
                p2.vy += shiftY * 0.2;
              } else if (isP2Dragged) {
                p1.x -= shiftX * 2;
                p1.y -= shiftY * 2;
                p1.vx -= shiftX * 0.2;
                p1.vy -= shiftY * 0.2;
              } else {
                p1.x -= shiftX;
                p1.y -= shiftY;
                p2.x += shiftX;
                p2.y += shiftY;
              }
            }
          }
        }
      }

      // Step 3: Hardware-Accelerated GPU Transform Updates
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const el = nodeRefs.current[p.id];
        if (el) {
          el.style.transform = `translate3d(calc(-50% + ${p.x.toFixed(1)}px), calc(-50% + ${p.y.toFixed(1)}px), 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer Drag Handlers (Scale-aware mouse & touch drag & fling)
  const handlePointerDown = (e, toolId) => {
    e.preventDefault();
    if (!stageWrapperRef.current) return;

    const rect = stageWrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const scale = rect.width / 660 || 1;

    const pointerX = (e.clientX - centerX) / scale;
    const pointerY = (e.clientY - centerY) / scale;

    dragStateRef.current = {
      isDragging: true,
      dragId: toolId,
      startX: pointerX,
      startY: pointerY,
      lastX: pointerX,
      lastY: pointerY,
      lastTime: performance.now(),
      hasMoved: false,
    };

    if (nodeRefs.current[toolId]) {
      nodeRefs.current[toolId].style.zIndex = "100";
    }

    setIsAnyDragging(true);

    const onPointerMove = (moveEvent) => {
      if (!dragStateRef.current.isDragging) return;

      const currentPointerX = (moveEvent.clientX - centerX) / scale;
      const currentPointerY = (moveEvent.clientY - centerY) / scale;
      const now = performance.now();
      const dt = Math.max(1, now - dragStateRef.current.lastTime);

      const dx = currentPointerX - dragStateRef.current.lastX;
      const dy = currentPointerY - dragStateRef.current.lastY;

      if (Math.hypot(currentPointerX - dragStateRef.current.startX, currentPointerY - dragStateRef.current.startY) > 4) {
        dragStateRef.current.hasMoved = true;
      }

      const particle = physicsStateRef.current.find((p) => p.id === dragStateRef.current.dragId);
      if (particle) {
        particle.x = currentPointerX;
        particle.y = currentPointerY;
        particle.vx = (dx / dt) * 14;
        particle.vy = (dy / dt) * 14;
      }

      dragStateRef.current.lastX = currentPointerX;
      dragStateRef.current.lastY = currentPointerY;
      dragStateRef.current.lastTime = now;
    };

    const onPointerUp = () => {
      if (!dragStateRef.current.hasMoved) {
        const toolObj = INITIAL_TOOLS_CONFIG.find((t) => t.id === toolId);
        setHoveredTool((prev) => (prev?.id === toolId ? null : toolObj));
      }

      if (nodeRefs.current[toolId]) {
        nodeRefs.current[toolId].style.zIndex = "8";
      }

      dragStateRef.current.isDragging = false;
      dragStateRef.current.dragId = null;
      setIsAnyDragging(false);

      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  const selectedCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section className="section pie-tools-section" id="about" ref={sectionRef}>
      <div className="container tools-stage-container">
        <div className="tools-desktop-layout">
          {/* Left Column: Heading, Lead & Category Matrix Dock */}
          <div className="tools-info-panel">
            {/* Animated Title & Lead (starts center, glides to left on scroll) */}
            <div className="tools-heading-block" ref={headingRef}>
              <div className="section-label">
                <span className="label-number">03</span>
                <span className="label-divider"></span>
                <span>TECHNICAL ARSENAL</span>
              </div>
              <h2 className="section-title tools-stage-title">Tools for the job</h2>
              <p className="tools-lead-subtitle">
                An interactive radial physics ecosystem. Drag & fling any bubble to see authentic liquid collisions and surface tension, or filter by category to inspect capabilities.
              </p>
            </div>

            {/* Redesigned Category Matrix Dock (The Tabs) */}
            <div className="tools-category-matrix-dock" ref={dockRef}>
              <div className="dock-matrix-header">
                <span className="matrix-filter-title">FILTER BY SPECIALIZATION</span>
                <span className="matrix-filter-count">
                  {activeCategory === "all" ? "21 / 21 Active" : `${selectedCategoryObj?.count} / 21 Active`}
                </span>
              </div>
              <div className="tools-matrix-pills-grid" role="tablist" aria-label="Tool Categories">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`matrix-pill-btn ${isActive ? "is-active" : ""}`}
                      style={{
                        "--pill-color": cat.color,
                        "--pill-glow": cat.glow,
                      }}
                    >
                      <span
                        className="matrix-pill-dot"
                        style={{ backgroundColor: cat.color }}
                      ></span>
                      <span className="matrix-pill-name">{cat.name}</span>
                      <span className="matrix-pill-badge">{cat.count}</span>
                      {isActive && <span className="matrix-pill-active-aura"></span>}
                    </button>
                  );
                })}
              </div>

              {/* Interactive physics hint card */}
              <div className="tools-physics-hint-card">
                <span className="physics-hint-sparkle">✦</span>
                <span className="physics-hint-text">
                  Interactive Physics • Drag, fling & collide bubbles freely
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Size Circular Physics Bubble Stage */}
          <div className="tools-stage-wrapper-panel" ref={stagePanelRef}>
            <div
              className={`pie-bubble-stage-wrapper ${isAnyDragging ? "stage-is-dragging" : ""}`}
              ref={stageWrapperRef}
            >
              <div className="pie-chart-ambient-backdrop">
                {/* Sector conic lighting backdrop */}
                <div className="pie-conic-glow-sectors"></div>
                <div className="pie-radial-core-glow"></div>
                <div className="pie-orbit-ring ring-outer"></div>
                <div className="pie-orbit-ring ring-mid"></div>
                <div className="pie-orbit-ring ring-inner"></div>
              </div>

              {/* CENTRAL RADAR HUB: Hover detail inspection core */}
              <div className="pie-center-radar-hub">
                {hoveredTool ? (
                  <div className="hub-content-active">
                    <span className="hub-category-tag" style={{ color: hoveredTool.color }}>
                      ● {hoveredTool.category}
                    </span>
                    <h3 className="hub-tool-title">{hoveredTool.name}</h3>
                    <span className="hub-level-badge">{hoveredTool.level}</span>
                    <span className="hub-instruction-hint">Drag bubble to collide</span>
                  </div>
                ) : activeCategory !== "all" ? (
                  <div className="hub-content-category">
                    <span
                      className="hub-category-tag"
                      style={{ color: selectedCategoryObj?.color }}
                    >
                      ● {selectedCategoryObj?.name}
                    </span>
                    <h3 className="hub-tool-title">{selectedCategoryObj?.count} Tools</h3>
                    <span className="hub-level-badge">Sector Active</span>
                    <span className="hub-instruction-hint">Drag or hover bubbles</span>
                  </div>
                ) : (
                  <div className="hub-content-idle">
                    <div className="hub-idle-sparkle">✦</div>
                    <h3 className="hub-idle-title">FULL-STACK CORE</h3>
                    <span className="hub-idle-sub">21 Physics Bubbles</span>
                    <span className="hub-idle-cue">Drag to collide & fling</span>
                  </div>
                )}
              </div>

              {/* DYNAMIC COLLIDING BUBBLES STAGE */}
              <div className="radial-bubble-sphere-stage">
                {INITIAL_TOOLS_CONFIG.map((tool) => {
                  const isHovered = hoveredTool?.id === tool.id;
                  const matchesFilter =
                    activeCategory === "all" || tool.category === activeCategory;
                  const isDimmed = !matchesFilter || (hoveredTool && !isHovered);

                  return (
                    <div
                      key={tool.id}
                      ref={(el) => {
                        nodeRefs.current[tool.id] = el;
                      }}
                      className={`radial-bubble-node ${
                        matchesFilter ? "node-in-filter" : "node-out-filter"
                      }`}
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      onPointerDown={(e) => handlePointerDown(e, tool.id)}
                      onMouseEnter={() => {
                        if (!dragStateRef.current.isDragging) {
                          setHoveredTool(tool);
                        }
                      }}
                      onMouseLeave={() => {
                        if (!dragStateRef.current.isDragging) {
                          setHoveredTool((prev) => (prev?.id === tool.id ? null : prev));
                        }
                      }}
                    >
                      <div
                        className={`unshaped-liquid-bubble bubble-size-${tool.size} ${tool.wobble} ${
                          isHovered ? "bubble-hovered" : ""
                        } ${isDimmed ? "bubble-dimmed" : ""} ${
                          matchesFilter && activeCategory !== "all" ? "bubble-filter-highlight" : ""
                        }`}
                        style={{
                          "--bubble-color": tool.color,
                          "--bubble-glow": tool.glow,
                          "--wobble-delay": tool.delay,
                        }}
                      >
                        {/* Soap-Bubble Iridescent Highlights */}
                        <div className="bubble-iridescent-rim"></div>
                        <div className="bubble-liquid-gloss"></div>

                        {/* Bubble Content Inside */}
                        <div className="bubble-content-inner">
                          <span
                            className="bubble-cat-indicator"
                            style={{ backgroundColor: tool.color }}
                          ></span>
                          <span className="bubble-tool-name">{tool.name}</span>
                          <span className="bubble-sub-level">{tool.level}</span>
                        </div>

                        {/* Surface Tension Sticking Membrane Aura */}
                        <div className="bubble-sticking-membrane"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
