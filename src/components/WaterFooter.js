"use client";

import { useEffect, useRef, useState } from "react";

export default function WaterFooter() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const duckRef = useRef(null);

  const [squeakCount, setSqueakCount] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const duckEl = duckRef.current;
    if (!container || !canvas || !duckEl) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Robust size initialization (prevents 0 or NaN)
    const rect = container.getBoundingClientRect();
    let width = (canvas.width = Math.max(
      320,
      rect.width || (typeof window !== "undefined" ? window.innerWidth : 1200)
    ));
    let height = (canvas.height = Math.max(200, rect.height || 230));

    // Visible, flowing wave mesh configuration
    const NODE_SPACING = 10;
    const BASELINE_Y = 44; // Positioned comfortably inside top padding
    let numNodes = Math.max(30, Math.ceil(width / NODE_SPACING) + 2);

    let nodes = Array.from({ length: numNodes }, () => ({
      y: BASELINE_Y
    }));

    // Interactive expanding ripples
    let ripples = [];
    const addRipple = (pxX, amplitude = 5, maxRadius = 140) => {
      ripples.push({
        x: pxX,
        radius: 0,
        maxRadius: maxRadius,
        amplitude: amplitude,
        speed: 65
      });
    };

    // Gyroscope tilt & motion state
    let targetGyroGamma = 0;
    let smoothGyroGamma = 0;
    let lastAccX = 0;
    let lastAccY = 0;
    let lastAccZ = 0;
    let lastShakeTime = 0;

    // Pointer state in water for fishes
    let pointer = {
      x: -1000,
      y: -1000,
      isInWater: false,
      isDown: false
    };

    // Splash particles
    let particles = [];
    const createSplash = (x, y, count = 8, intensity = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
        const speed = (Math.random() * 0.7 + 0.3) * intensity;
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2 + 1,
          alpha: 1
        });
      }
    };

    // Ambient floating bubbles
    let bubbles = Array.from({ length: 16 }, () => ({
      x: Math.random() * width,
      y: BASELINE_Y + Math.random() * (height - BASELINE_Y),
      r: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.25 + 0.12,
      wobble: Math.random() * Math.PI * 2
    }));

    // Rare jumping fish timer (first jump after ~2.5s, then every 6 to 8.5s)
    let jumpCooldown = 2.5;

    // SINKING FOOD PELLETS (Optimized to 10 crumbs: perfectly balanced, zero lag)
    let foodPellets = [];
    let isFeedingActive = false;

    const spawnFood = (count = 10) => {
      isFeedingActive = true;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("food-state-change", { detail: { isFeeding: true } })
        );
      }

      for (let i = 0; i < count; i++) {
        foodPellets.push({
          x: width * 0.1 + Math.random() * (width * 0.8),
          y: BASELINE_Y + Math.random() * 8,
          // Gentle slow sink: 0.14 to 0.28 px/frame so fishes can cruise over and grab
          vy: Math.random() * 0.14 + 0.14,
          vx: (Math.random() - 0.5) * 0.16,
          radius: Math.random() * 1.3 + 2.0,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.025 + 0.015,
          color: Math.random() > 0.4 ? "#facc15" : "#fbbf24"
        });
      }
    };

    const handleTreatEvent = () => {
      if (foodPellets.length === 0) {
        spawnFood(10);
        addRipple(width * 0.35, 4, 130);
        addRipple(width * 0.65, 4, 130);
      }
    };
    window.addEventListener("treat-fish", handleTreatEvent);

    // -----------------------------------------------------------
    // 10 NORMAL-FACING CUTE SIDE-VIEW POND FISHES
    // Clean, adorable side-profile swimming with cheerful colors
    // -----------------------------------------------------------
    const FISH_CONFIGS = [
      // 1. Mochi (Tangerine Kohaku) - Snowy white with bright orange mochi spots
      {
        name: "mochi",
        color: "#ffffff",
        accent: "#fb923c",
        secondary: "#fed7aa",
        blush: "rgba(251, 113, 133, 0.48)",
        length: 29,
        width: 14,
        speed: 0.44
      },
      // 2. Honey (Buttercup Carp) - Warm golden honey with sunshine glow
      {
        name: "honey",
        color: "#facc15",
        accent: "#fef08a",
        secondary: "#fde68a",
        blush: "rgba(249, 115, 22, 0.42)",
        length: 31,
        width: 15,
        speed: 0.4
      },
      // 3. Berry (Strawberry Goldfish) - Milk white with rosy strawberry spots
      {
        name: "berry",
        color: "#ffffff",
        accent: "#f43f5e",
        secondary: "#fbcfe8",
        blush: "rgba(244, 63, 94, 0.52)",
        length: 28,
        width: 14,
        speed: 0.45
      },
      // 4. Pebble (Sky Blue Guppy) - Soft baby blue with bright cyan fins
      {
        name: "pebble",
        color: "#7dd3fc",
        accent: "#38bdf8",
        secondary: "#bae6fd",
        blush: "rgba(251, 113, 133, 0.48)",
        length: 27,
        width: 13,
        speed: 0.48
      },
      // 5. Creamsicle (Peach Sherbet) - Soft apricot with warm peach blush
      {
        name: "creamsicle",
        color: "#ffedd5",
        accent: "#fb923c",
        secondary: "#fed7aa",
        blush: "rgba(244, 63, 94, 0.45)",
        length: 29,
        width: 14.5,
        speed: 0.42
      },
      // 6. Sakura (Cherry Blossom) - Soft pastel pink with sweet magenta spots
      {
        name: "sakura",
        color: "#fdf2f8",
        accent: "#ec4899",
        secondary: "#fbcfe8",
        blush: "rgba(244, 63, 94, 0.5)",
        length: 28,
        width: 13.5,
        speed: 0.46
      },
      // 7. Taro (Lavender Danio) - Sweet pastel lavender with violet glow
      {
        name: "taro",
        color: "#ede9fe",
        accent: "#a78bfa",
        secondary: "#ddd6fe",
        blush: "rgba(244, 114, 182, 0.48)",
        length: 27,
        width: 13,
        speed: 0.47
      },
      // 8. Minty (Peppermint Tetra) - Pastel mint turquoise with aqua fins
      {
        name: "minty",
        color: "#ccfbf1",
        accent: "#2dd4bf",
        secondary: "#99f6e4",
        blush: "rgba(251, 113, 133, 0.48)",
        length: 26,
        width: 12.5,
        speed: 0.5
      },
      // 9. Sunny (Lemon Drop) - Bright cheerful lemon with warm coral fins
      {
        name: "sunny",
        color: "#fef08a",
        accent: "#fb923c",
        secondary: "#fef9c3",
        blush: "rgba(248, 113, 113, 0.48)",
        length: 28,
        width: 14,
        speed: 0.43
      },
      // 10. Opal (Pearl Chibi) - Pearlescent white with rainbow pastel sheen
      {
        name: "opal",
        color: "#f8fafc",
        accent: "#c7d2fe",
        secondary: "#e0e7ff",
        blush: "rgba(251, 113, 133, 0.48)",
        length: 29,
        width: 14,
        speed: 0.44
      }
    ];

    let fishes = FISH_CONFIGS.map((cfg, idx) => ({
      ...cfg,
      id: idx,
      x: width * 0.1 + (idx * width) / FISH_CONFIGS.length,
      y: BASELINE_Y + 45 + Math.random() * (height - BASELINE_Y - 70),
      vx: (idx % 2 === 0 ? 1 : -1) * cfg.speed,
      vy: 0,
      facing: idx % 2 === 0 ? 1 : -1, // 1 = facing right, -1 = facing left
      tailPhase: Math.random() * Math.PI * 2,
      targetX: Math.random() * width,
      targetY: BASELINE_Y + 40 + Math.random() * (height - BASELINE_Y - 70),
      actionTimer: Math.random() * 5 + 3,
      isFleeing: false,
      isJumping: false,
      jumpP: 0,
      jumpDuration: 1.15,
      jumpStartX: 0,
      jumpTargetX: 0,
      jumpPeak: 26
    }));

    // -----------------------------------------------------------
    // THE DUCK (Floats Upright on Surface Waves)
    // -----------------------------------------------------------
    const duck = {
      x: width * 0.28,
      y: BASELINE_Y - 26,
      vx: 0,
      vy: 0,
      width: 52,
      height: 44,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      rotation: 0
    };

    // 100% Robust water height query (guaranteed safe against undefined/NaN)
    const getWaterHeightAt = (pxX) => {
      if (!nodes || nodes.length < 2) return BASELINE_Y;
      const safeX = typeof pxX === "number" && !isNaN(pxX) ? pxX : width * 0.28;
      const colIdx = Math.max(0, Math.min(nodes.length - 2, Math.floor(safeX / NODE_SPACING)));
      const n1 = nodes[colIdx] || { y: BASELINE_Y };
      const n2 = nodes[colIdx + 1] || n1;
      const colRatio = Math.max(0, Math.min(1, (safeX % NODE_SPACING) / NODE_SPACING));
      const res = (n1.y ?? BASELINE_Y) * (1 - colRatio) + ((n2?.y ?? n1.y) ?? BASELINE_Y) * colRatio;
      return isNaN(res) ? BASELINE_Y : res;
    };

    const handleResize = () => {
      if (!container || !canvas) return;
      const r = container.getBoundingClientRect();
      width = canvas.width = Math.max(
        320,
        r.width || (typeof window !== "undefined" ? window.innerWidth : 1200)
      );
      height = canvas.height = Math.max(200, r.height || 230);
      numNodes = Math.max(30, Math.ceil(width / NODE_SPACING) + 2);
      nodes = Array.from({ length: numNodes }, () => ({
        y: BASELINE_Y
      }));
    };
    window.addEventListener("resize", handleResize);

    // -----------------------------------------------------------
    // PHONE GYROSCOPE (TILT) & ACCELEROMETER (SHAKE)
    // -----------------------------------------------------------
    const handleOrientation = (e) => {
      let gamma = e.gamma; // left-to-right tilt in portrait (-90 to 90)
      let beta = e.beta;   // front-to-back tilt in portrait (-180 to 180)
      if (typeof gamma !== "number" || isNaN(gamma)) return;

      // Handle phone orientation (portrait vs landscape)
      let angle = 0;
      if (typeof window !== "undefined") {
        if (window.screen?.orientation?.angle !== undefined) {
          angle = window.screen.orientation.angle;
        } else if (typeof window.orientation === "number") {
          angle = window.orientation;
        }
      }

      let effectiveTilt = gamma;
      if (angle === 90) {
        effectiveTilt = typeof beta === "number" ? -beta : -gamma;
      } else if (angle === -90 || angle === 270) {
        effectiveTilt = typeof beta === "number" ? beta : gamma;
      } else if (angle === 180) {
        effectiveTilt = -gamma;
      }

      targetGyroGamma = Math.max(-42, Math.min(42, effectiveTilt));
    };

    const onDeviceShake = () => {
      // Energetic water slosh ripples across the pond
      addRipple(width * 0.22, 6.5, 160);
      addRipple(width * 0.78, 6.5, 160);
      createSplash(width * (0.25 + Math.random() * 0.5), BASELINE_Y, 12, 3.4);

      // Duck pops up with a playful bounce
      duck.vy = -5.4;

      // Fishes get startled into a flurry of excited swimming
      fishes.forEach((f) => {
        f.isFleeing = true;
        f.actionTimer = Math.random() * 2 + 1.8;
        f.targetX = width * 0.08 + Math.random() * (width * 0.84);
        f.targetY = BASELINE_Y + 45 + Math.random() * (height - BASELINE_Y - 70);
        f.vx = (Math.random() > 0.5 ? 1 : -1) * (f.speed * 2.8);
      });

      // Jump a fish if none is airborne
      if (!fishes.some((f) => f.isJumping)) {
        const candidate = fishes[Math.floor(Math.random() * fishes.length)];
        if (candidate) {
          let jumpDir = candidate.facing || (Math.random() > 0.5 ? 1 : -1);
          candidate.isJumping = true;
          candidate.jumpP = 0;
          candidate.jumpDuration = 1.15;
          candidate.jumpStartX = candidate.x;
          candidate.jumpTargetX = Math.max(
            40,
            Math.min(width - 40, candidate.x + jumpDir * 110)
          );
          candidate.jumpPeak = 28;
          candidate.facing = jumpDir;
          const sY = getWaterHeightAt(candidate.x);
          createSplash(candidate.x, sY, 8, 2.6);
          addRipple(candidate.x, 4, 120);
        }
      }
    };

    const handleMotion = (e) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc) return;
      const x = acc.x ?? 0;
      const y = acc.y ?? 0;
      const z = acc.z ?? 0;

      const delta =
        Math.abs(x - lastAccX) + Math.abs(y - lastAccY) + Math.abs(z - lastAccZ);
      lastAccX = x;
      lastAccY = y;
      lastAccZ = z;

      const now = performance.now();
      // High-energy phone shake threshold (delta > 22 m/s²) with cooldown
      if (delta > 22 && now - lastShakeTime > 750) {
        lastShakeTime = now;
        onDeviceShake();
      }
    };

    // Auto-listen on mount (Android, desktop, standard mobile browsers)
    if (typeof window !== "undefined") {
      if (
        window.DeviceOrientationEvent &&
        typeof DeviceOrientationEvent.requestPermission !== "function"
      ) {
        window.addEventListener("deviceorientation", handleOrientation, { passive: true });
      }
      if (
        window.DeviceMotionEvent &&
        typeof DeviceMotionEvent.requestPermission !== "function"
      ) {
        window.addEventListener("devicemotion", handleMotion, { passive: true });
      }
    }

    // iOS Safari permission handler (unlocked on first user touch anywhere)
    let sensorsRequested = false;
    const requestSensorPermissions = async () => {
      if (sensorsRequested) return;
      sensorsRequested = true;
      try {
        if (
          typeof DeviceOrientationEvent !== "undefined" &&
          typeof DeviceOrientationEvent.requestPermission === "function"
        ) {
          const res = await DeviceOrientationEvent.requestPermission();
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, { passive: true });
          }
        }
      } catch (err) {}
      try {
        if (
          typeof DeviceMotionEvent !== "undefined" &&
          typeof DeviceMotionEvent.requestPermission === "function"
        ) {
          const res = await DeviceMotionEvent.requestPermission();
          if (res === "granted") {
            window.addEventListener("devicemotion", handleMotion, { passive: true });
          }
        }
      } catch (err) {}
    };

    window.addEventListener("touchstart", requestSensorPermissions, { passive: true, once: true });
    window.addEventListener("pointerdown", requestSensorPermissions, { passive: true, once: true });

    const handleContainerPointerMove = (e) => {
      const r = container.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.isInWater = pointer.y > BASELINE_Y - 15;
    };

    const handleContainerPointerLeave = () => {
      pointer.isInWater = false;
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const handleContainerPointerDown = (e) => {
      pointer.isDown = true;
      const r = container.getBoundingClientRect();
      const pxX = e.clientX - r.left;
      const pxY = e.clientY - r.top;

      if (pxY > BASELINE_Y - 15) {
        addRipple(pxX, 4, 130);
        createSplash(pxX, BASELINE_Y, 5, 2.5);

        // Click/tap near a fish (<65px) to excite it into a joyful leap!
        if (!fishes.some((f) => f.isJumping)) {
          const nearFish = fishes.find(
            (f) => !f.isJumping && Math.hypot(f.x - pxX, f.y - pxY) < 65
          );
          if (nearFish) {
            let jumpDir = pxX < nearFish.x ? 1 : -1;
            if (nearFish.x < 120) jumpDir = 1;
            else if (nearFish.x > width - 120) jumpDir = -1;

            nearFish.isJumping = true;
            nearFish.jumpP = 0;
            nearFish.jumpDuration = 1.15;
            nearFish.jumpStartX = nearFish.x;
            nearFish.jumpTargetX = Math.max(
              40,
              Math.min(width - 40, nearFish.x + jumpDir * (Math.random() * 40 + 90))
            );
            nearFish.jumpPeak = Math.random() * 5 + 25;
            nearFish.facing = jumpDir;
            jumpCooldown = Math.random() * 2.5 + 6.0;

            const startSurf = getWaterHeightAt(nearFish.x);
            createSplash(nearFish.x, startSurf, 8, 2.6);
            addRipple(nearFish.x, 4, 120);
          }
        }
      }
    };

    const handleContainerPointerUp = () => {
      pointer.isDown = false;
    };

    container.addEventListener("pointermove", handleContainerPointerMove);
    container.addEventListener("pointerleave", handleContainerPointerLeave);
    container.addEventListener("pointerdown", handleContainerPointerDown);
    window.addEventListener("pointerup", handleContainerPointerUp);

    // Duck Drag & Push interactions
    const onDuckPointerDown = (e) => {
      e.preventDefault();
      e.stopPropagation();

      requestSensorPermissions();

      duck.isDragging = true;
      duckEl.classList.add("dragging");
      try {
        duckEl.setPointerCapture(e.pointerId);
      } catch (err) {}

      const r = container.getBoundingClientRect();
      duck.dragOffsetX = e.clientX - r.left - duck.x;
      duck.dragOffsetY = e.clientY - r.top - duck.y;

      setSqueakCount((c) => c + 1);
      createSplash(duck.x + duck.width / 2, duck.y + duck.height * 0.7, 7, 3);
      addRipple(duck.x + duck.width / 2, 4, 110);
    };

    const onDuckPointerMove = (e) => {
      if (!duck.isDragging) return;
      e.preventDefault();
      const r = container.getBoundingClientRect();
      const targetX = e.clientX - r.left - duck.dragOffsetX;
      const targetY = e.clientY - r.top - duck.dragOffsetY;

      duck.vx = (targetX - duck.x) * 0.25;
      duck.x = Math.max(15, Math.min(width - duck.width - 15, targetX));
      duck.y = Math.max(0, Math.min(height - duck.height, targetY));
    };

    const onDuckPointerUp = (e) => {
      if (!duck.isDragging) return;
      duck.isDragging = false;
      duckEl.classList.remove("dragging");
      try {
        duckEl.releasePointerCapture(e.pointerId);
      } catch (err) {}

      const waterAtDuck = getWaterHeightAt(duck.x + duck.width / 2);
      const submersion = duck.y + duck.height * 0.7 - waterAtDuck;

      if (submersion > 5) {
        duck.vy = -Math.min(7, Math.max(3, submersion * 0.3));
        addRipple(duck.x + duck.width / 2, 5, 130);
        createSplash(duck.x + duck.width / 2, waterAtDuck, 10, 3.5);
      }
    };

    duckEl.addEventListener("pointerdown", onDuckPointerDown);
    window.addEventListener("pointermove", onDuckPointerMove);
    window.addEventListener("pointerup", onDuckPointerUp);

    // -----------------------------------------------------------
    // 60FPS SMOOTH LAG-FREE ANIMATION LOOP
    // -----------------------------------------------------------
    let lastTime = performance.now();

    const loop = (time) => {
      try {
        const safeTime = typeof time === "number" && !isNaN(time) ? time : performance.now();
        const rawDt = (safeTime - lastTime) / 1000;
        const dt = Math.max(0.001, Math.min(rawDt, 0.05)) || 0.016;
        lastTime = safeTime;

        smoothGyroGamma += (targetGyroGamma - smoothGyroGamma) * 0.08;
        if (isNaN(smoothGyroGamma)) smoothGyroGamma = 0;

        // Dynamic slosh ripples when tilt angle shifts actively
        const gyroVel = targetGyroGamma - smoothGyroGamma;
        if (Math.abs(gyroVel) > 5.5 && Math.random() < 0.22) {
          const sloshX = gyroVel > 0 ? width * 0.78 : width * 0.22;
          addRipple(sloshX, Math.min(4.5, Math.abs(gyroVel) * 0.35), 115);
        }

        // Update interactive ripples
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += rip.speed * dt;
          if (rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
          }
        }

        // 1. VISIBLE FLOWING WATER SURFACE (Smooth, Rolling, Flowing Waves + Gyro Tilt)
        const waveTime = safeTime * 0.0018; // Complete wave cycle every ~3.5 seconds
        const nodeCount = nodes.length;

        for (let i = 0; i < nodeCount; i++) {
          const x = i * NODE_SPACING;
          const normalizedX = (i / Math.max(1, nodeCount - 1) - 0.5) * 2;
          // Natural fluid physics: tilting phone right (positive gamma) causes right side to rise (lower Y)
          const gyroSlope = (smoothGyroGamma / 35) * 16;
          const tiltDisp = -normalizedX * gyroSlope;

          // Rich, visible harmonic waves
          const wave1 = Math.sin(waveTime * 1.3 + x * 0.007) * 5.5; // primary crest
          const wave2 = Math.cos(waveTime * 0.8 - x * 0.005) * 3.5; // rolling swell
          const wave3 = Math.sin(waveTime * 1.9 + x * 0.011) * 1.8; // surface shimmer

          let rippleDisp = 0;
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const dist = Math.abs(x - rip.x);
            if (dist < rip.radius + 35 && dist > rip.radius - 35) {
              const falloff = 1 - rip.radius / rip.maxRadius;
              rippleDisp += Math.cos((dist - rip.radius) * 0.12) * rip.amplitude * falloff;
            }
          }

          nodes[i].y =
            BASELINE_Y + tiltDisp + wave1 + wave2 + wave3 + rippleDisp;
        }

        // 2. DUCK MOTION (Floats firmly upright on the wave surface)
        if (!duck.isDragging) {
          if (typeof duck.x !== "number" || isNaN(duck.x)) {
            duck.x = width * 0.28;
          }
          if (typeof duck.vx !== "number" || isNaN(duck.vx)) {
            duck.vx = 0;
          }

          const duckCenterX = duck.x + duck.width / 2;
          const surfaceY = getWaterHeightAt(duckCenterX);
          const targetDuckY = surfaceY - duck.height * 0.65;

          // Follow wave height smoothly with natural bobbing
          if (typeof duck.y !== "number" || isNaN(duck.y)) {
            duck.y = targetDuckY;
          } else {
            duck.y += (targetDuckY - duck.y) * 0.22;
          }

          // Natural gyro drift down the water slope towards tilted side
          const gyroAccel = Math.sin((smoothGyroGamma * Math.PI) / 180) * 125;
          duck.vx += (isNaN(gyroAccel) ? 0 : gyroAccel) * dt;
          duck.vx *= 0.94;
          duck.x += duck.vx * dt * 60;

          // Boundaries
          const minX = 20;
          const maxX = Math.max(minX + 40, width - duck.width - 20);
          if (duck.x < minX) {
            duck.x = minX;
            duck.vx = 0;
          } else if (duck.x > maxX) {
            duck.x = maxX;
            duck.vx = 0;
          }

          // Duck always floats firmly upright with a tiny gentle rock (max +/- 2 degrees)
          const gentleRock = Math.sin(safeTime * 0.0022 + duck.x * 0.01) * 0.035;
          duck.rotation = gentleRock;
        }

        // Update Duck DOM safely (guaranteed upright, valid CSS numbers)
        const safeDuckX = Math.round((isNaN(duck.x) ? width * 0.28 : duck.x) * 10) / 10;
        const safeDuckY =
          Math.round((isNaN(duck.y) ? BASELINE_Y - 26 : duck.y) * 10) / 10;
        const safeRot =
          Math.round((isNaN(duck.rotation) ? 0 : duck.rotation) * 1000) / 1000;
        duckEl.style.transform = `translate3d(${safeDuckX}px, ${safeDuckY}px, 0) rotate(${safeRot}rad)`;

        // 3. RENDER CANVAS
        ctx.clearRect(0, 0, width, height);

        // Deep Water Gradient
        const waterGrad = ctx.createLinearGradient(0, 0, 0, height);
        waterGrad.addColorStop(0, "rgba(8, 28, 46, 0.78)");
        waterGrad.addColorStop(0.35, "rgba(5, 20, 36, 0.92)");
        waterGrad.addColorStop(1, "rgba(3, 12, 22, 0.98)");

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, nodes[0].y);

        for (let i = 0; i < nodeCount - 1; i++) {
          const x1 = i * NODE_SPACING;
          const y1 = nodes[i].y;
          const x2 = (i + 1) * NODE_SPACING;
          const y2 = nodes[i + 1].y;
          const xc = (x1 + x2) / 2;
          const yc = (y1 + y2) / 2;
          ctx.quadraticCurveTo(x1, y1, xc, yc);
        }
        ctx.lineTo(width, nodes[nodeCount - 1].y);
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = waterGrad;
        ctx.fill();

        // Glowing Foam Crest Line (Optimized: light stroke with soft halo)
        ctx.beginPath();
        ctx.moveTo(0, nodes[0].y);
        for (let i = 0; i < nodeCount - 1; i++) {
          const x1 = i * NODE_SPACING;
          const y1 = nodes[i].y;
          const x2 = (i + 1) * NODE_SPACING;
          const y2 = nodes[i + 1].y;
          const xc = (x1 + x2) / 2;
          const yc = (y1 + y2) / 2;
          ctx.quadraticCurveTo(x1, y1, xc, yc);
        }
        ctx.lineTo(width, nodes[nodeCount - 1].y);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.88)";
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // 4. SINKING FOOD PELLETS (Ultra-fast concentric render, zero lag!)
        for (let i = foodPellets.length - 1; i >= 0; i--) {
          const pellet = foodPellets[i];
          pellet.y += pellet.vy;
          pellet.wobble += pellet.wobbleSpeed;
          pellet.x += Math.sin(pellet.wobble) * 0.25;

          // Outer glowing halo (fast alpha circle)
          ctx.fillStyle = "rgba(250, 204, 21, 0.22)";
          ctx.beginPath();
          ctx.arc(pellet.x, pellet.y, pellet.radius + 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Pellet core
          ctx.fillStyle = pellet.color;
          ctx.beginPath();
          ctx.arc(pellet.x, pellet.y, pellet.radius, 0, Math.PI * 2);
          ctx.fill();

          // Dissolve at bottom of pond
          if (pellet.y > height - 12) {
            foodPellets.splice(i, 1);
          }
        }

        // When ALL food pellets have disappeared/been eaten, re-enable button
        if (isFeedingActive && foodPellets.length === 0) {
          isFeedingActive = false;
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("food-state-change", { detail: { isFeeding: false } })
            );
          }
        }

        // TRIGGER RARE FISH JUMP (Every 6 to 8.5 seconds; initial jump at 2.5s)
        jumpCooldown -= dt;
        if (jumpCooldown <= 0) {
          if (!fishes.some((f) => f.isJumping)) {
            const available = fishes.filter((f) => !f.isJumping);
            if (available.length > 0) {
              const jumper = available[Math.floor(Math.random() * available.length)];
              let jumpDir = jumper.facing || 1;
              if (jumper.x < 120) jumpDir = 1;
              else if (jumper.x > width - 120) jumpDir = -1;

              const jumpDistance = Math.random() * 45 + 95;
              const targetX = Math.max(
                40,
                Math.min(width - 40, jumper.x + jumpDir * jumpDistance)
              );

              jumper.isJumping = true;
              jumper.jumpP = 0;
              jumper.jumpDuration = 1.15;
              jumper.jumpStartX = jumper.x;
              jumper.jumpTargetX = targetX;
              jumper.jumpPeak = Math.random() * 5 + 25; // 25 to 30px arc height above water
              jumper.facing = jumpDir;

              const startSurf = getWaterHeightAt(jumper.x);
              createSplash(jumper.x, startSurf, 7, 2.4);
              addRipple(jumper.x, 3.8, 110);

              jumpCooldown = Math.random() * 2.5 + 6.0; // Next jump in 6 to 8.5 seconds
            } else {
              jumpCooldown = 2.0;
            }
          } else {
            jumpCooldown = Math.random() * 2.5 + 6.0;
          }
        }

        // 5. UPDATE & DRAW 10 NORMAL-FACING CUTE SIDE-VIEW FISHES
        fishes.forEach((fish) => {
          const surfaceAtFish = getWaterHeightAt(fish.x);

          if (fish.isJumping) {
            // GRACEFUL PARABOLIC AERIAL JUMP ARC
            fish.tailPhase += 0.085;
            fish.jumpP += dt / (fish.jumpDuration || 1.15);
            const p = Math.min(1, Math.max(0, fish.jumpP));

            // Horizontal position
            fish.x = fish.jumpStartX + (fish.jumpTargetX - fish.jumpStartX) * p;

            // Parabolic vertical arc: 4 * p * (1 - p) peaks at 1.0 when p = 0.5
            const surfaceY = getWaterHeightAt(fish.x);
            const arcOffset = 4 * p * (1 - p) * (fish.jumpPeak || 26);
            fish.y = surfaceY - arcOffset;

            // Tangent velocities for natural tilt
            const travelDist = fish.jumpTargetX - fish.jumpStartX;
            fish.vx = travelDist / (fish.jumpDuration || 1.15);
            fish.vy =
              (-4 * (1 - 2 * p) * (fish.jumpPeak || 26)) / (fish.jumpDuration || 1.15);

            // Clean splashdown re-entry into water
            if (p >= 1) {
              fish.isJumping = false;
              fish.jumpP = 0;
              fish.y = surfaceY + 12;
              fish.vx = fish.facing * (fish.speed * 1.4);
              fish.vy = 0.45;
              fish.actionTimer = Math.random() * 4 + 3;
              fish.targetX = Math.max(
                30,
                Math.min(width - 30, fish.x + fish.facing * 100)
              );
              fish.targetY = BASELINE_Y + 50;

              // Splashdown visuals
              createSplash(fish.x, surfaceY, 14, 3.4);
              addRipple(fish.x, 5.5, 140);
              for (let b = 0; b < 5; b++) {
                bubbles.push({
                  x: fish.x + (Math.random() - 0.5) * 12,
                  y: surfaceY + 8,
                  r: Math.random() * 1.6 + 0.8,
                  speed: 0.45,
                  wobble: 0
                });
              }
            }
          } else {
            // NORMAL UNDERWATER SWIMMING & AI
            fish.actionTimer -= dt;

            let targetX = fish.targetX;
            let targetY = fish.targetY;
            let isExcitedByFinger = false;
            let excitementFactor = 0;

            // Food priority (grab closest food pellet)
            let nearestFood = null;
            let minFoodDist = 9999;
            for (let f = 0; f < foodPellets.length; f++) {
              const fp = foodPellets[f];
              const d = Math.hypot(fp.x - fish.x, fp.y - fish.y);
              if (d < minFoodDist) {
                minFoodDist = d;
                nearestFood = fp;
              }
            }

            if (nearestFood) {
              targetX = nearestFood.x;
              targetY = nearestFood.y;

              // Mouth reaches food crumb (< 18px)
              if (minFoodDist < 18) {
                const fpIdx = foodPellets.indexOf(nearestFood);
                if (fpIdx > -1) {
                  foodPellets.splice(fpIdx, 1);
                }
                for (let b = 0; b < 3; b++) {
                  bubbles.push({
                    x: fish.x + (Math.random() - 0.5) * 8,
                    y: fish.y - 2,
                    r: Math.random() * 1.5 + 0.8,
                    speed: 0.4 + 0.3,
                    wobble: Math.random() * Math.PI * 2
                  });
                }
              }
            }
            // Excited Finger Tracking
            else if (pointer.isInWater) {
              const distToPointer = Math.hypot(pointer.x - fish.x, pointer.y - fish.y);

              if (distToPointer < 340) {
                isExcitedByFinger = true;
                excitementFactor = Math.max(0, 1 - distToPointer / 340);

                // School gracefully around the finger
                const schoolAngle = (fish.id / fishes.length) * Math.PI * 2 + safeTime * 0.0012;
                const radiusOrbit = Math.max(18, Math.min(distToPointer * 0.35, 42));
                targetX = pointer.x + Math.cos(schoolAngle) * radiusOrbit;
                targetY = Math.max(
                  BASELINE_Y + 25,
                  Math.min(height - 25, pointer.y + Math.sin(schoolAngle) * (radiusOrbit * 0.6))
                );

                // Click / Tap startles the fishes
                if (distToPointer < 25 || pointer.isDown) {
                  fish.isFleeing = true;
                  targetX = fish.x + (fish.x - pointer.x) * 1.4;
                  targetY = fish.y + (Math.random() - 0.5) * 40;
                } else if (distToPointer < 45 && Math.random() < 0.015) {
                  // Occasional playful bubble when close to finger
                  bubbles.push({
                    x: fish.x,
                    y: fish.y,
                    r: Math.random() * 1.4 + 0.8,
                    speed: 0.45,
                    wobble: 0
                  });
                }
              }
            } else {
              // Calm wandering horizontally across the pond
              if (fish.actionTimer <= 0) {
                fish.actionTimer = Math.random() * 6 + 4;
                fish.targetX = width * 0.08 + Math.random() * (width * 0.84);
                fish.targetY = BASELINE_Y + 35 + Math.random() * (height - BASELINE_Y - 65);
                fish.isFleeing = false;
              }
            }

            // Tail wag rate: happy, enthusiastic wag when swimming or hunting
            const wagSpeed = isExcitedByFinger
              ? 0.04 + excitementFactor * 0.055
              : (nearestFood || fish.isFleeing ? 0.065 : 0.038);
            fish.tailPhase += wagSpeed;

            // Horizontal swimming dynamics (fish swim horizontally, gently rising/sinking)
            const dx = targetX - fish.x;
            const dy = targetY - fish.y;

            let speedMultiplier = 1.0;
            if (fish.isFleeing) {
              speedMultiplier = 2.4;
            } else if (nearestFood) {
              speedMultiplier = 1.6;
            } else if (isExcitedByFinger) {
              speedMultiplier = 1.1 + excitementFactor * 1.15;
            }

            const currentSpeed = fish.speed * speedMultiplier;

            // Target velocities: strong horizontal movement, gentle vertical drift
            const targetVx = (Math.abs(dx) > 6 ? Math.sign(dx) : dx / 6) * currentSpeed;
            const targetVy = Math.max(-0.45, Math.min(0.45, dy * 0.025)) * currentSpeed;

            fish.vx += (targetVx - fish.vx) * 0.04;
            fish.vy += (targetVy - fish.vy) * 0.04;

            // Update facing direction smoothly (1 = right, -1 = left)
            if (Math.abs(fish.vx) > 0.04) {
              fish.facing = fish.vx > 0 ? 1 : -1;
            }

            fish.x += fish.vx;
            fish.y += fish.vy;

            // Pond boundaries with smooth turns
            if (fish.x < 15) {
              fish.x = 15;
              fish.vx = Math.abs(fish.vx) * 0.8 + 0.15;
              fish.facing = 1;
              fish.targetX = width * 0.4 + Math.random() * (width * 0.5);
            } else if (fish.x > width - 15) {
              fish.x = width - 15;
              fish.vx = -Math.abs(fish.vx) * 0.8 - 0.15;
              fish.facing = -1;
              fish.targetX = width * 0.1 + Math.random() * (width * 0.5);
            }
            if (fish.y < BASELINE_Y + 22) {
              fish.y = BASELINE_Y + 22;
              fish.vy = 0.2;
            } else if (fish.y > height - 18) {
              fish.y = height - 18;
              fish.vy = -0.2;
            }
          }

          // ---------------------------------------------------------
          // NORMAL SIDE-PROFILE FISH RENDERING (CUTE & NATURAL)
          // ---------------------------------------------------------
          ctx.save();
          ctx.translate(fish.x, fish.y);

          // Mirror horizontally when moving left so fish ALWAYS faces head-first
          ctx.scale(fish.facing, 1);

          // Pitch angle: allows realistic leap arch during jump, gentle tilt during swim
          const maxPitch = fish.isJumping ? 0.65 : 0.35;
          const pitch = Math.max(
            -maxPitch,
            Math.min(maxPitch, Math.atan2(fish.vy, Math.abs(fish.vx) || 0.1))
          );
          ctx.rotate(pitch);

          const L = fish.length;
          const W = fish.width;
          const wag = Math.sin(fish.tailPhase) * 3.8;
          const finFlutter = Math.sin(fish.tailPhase * 1.5) * 1.8;

          // 1. Soft underwater depth shadow (only rendered when underwater)
          if (!fish.isJumping && fish.y > surfaceAtFish - 15) {
            ctx.fillStyle = "rgba(4, 18, 32, 0.35)";
            ctx.beginPath();
            ctx.ellipse(-L * 0.04, 7, L * 0.44, W * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          // 2. Caudal Tail Fin (Graceful flowing fan tail)
          ctx.fillStyle = `${fish.secondary}bb`;
          ctx.beginPath();
          ctx.moveTo(-L * 0.44, 0);
          // Upper fan lobe
          ctx.quadraticCurveTo(-L * 0.65, -W * 0.7 + wag * 0.5, -L * 0.85, -W * 0.75 + wag);
          // Tail notch
          ctx.quadraticCurveTo(-L * 0.68, wag * 0.3, -L * 0.85, W * 0.75 + wag);
          // Lower fan lobe
          ctx.quadraticCurveTo(-L * 0.65, W * 0.7 + wag * 0.5, -L * 0.44, 0);
          ctx.fill();

          // 3. Dorsal Fin (Graceful top crest on back)
          ctx.fillStyle = `${fish.secondary}aa`;
          ctx.beginPath();
          ctx.moveTo(L * 0.15, -W * 0.48);
          ctx.quadraticCurveTo(-L * 0.08, -W * 0.95 + finFlutter * 0.5, -L * 0.28, -W * 0.3);
          ctx.quadraticCurveTo(-L * 0.1, -W * 0.45, L * 0.15, -W * 0.48);
          ctx.fill();

          // 4. Anal / Ventral Fin (Bottom rear stabilizer)
          ctx.fillStyle = `${fish.secondary}99`;
          ctx.beginPath();
          ctx.moveTo(-L * 0.1, W * 0.4);
          ctx.quadraticCurveTo(-L * 0.2, W * 0.75, -L * 0.28, W * 0.25);
          ctx.fill();

          // 5. Main Hydrodynamic Side-View Fish Body
          ctx.fillStyle = fish.color;
          ctx.beginPath();
          // Cute rounded nose / snout
          ctx.moveTo(L * 0.48, 0);
          // Arched back to tail
          ctx.quadraticCurveTo(L * 0.22, -W * 0.54, -L * 0.05, -W * 0.5);
          ctx.quadraticCurveTo(-L * 0.3, -W * 0.35, -L * 0.45, wag * 0.15);
          // Curved belly to tail
          ctx.quadraticCurveTo(-L * 0.3, W * 0.35, -L * 0.05, W * 0.5);
          ctx.quadraticCurveTo(L * 0.22, W * 0.54, L * 0.48, 0);
          ctx.closePath();
          ctx.fill();

          // 6. Soft lighter belly highlight (3D volume)
          ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
          ctx.beginPath();
          ctx.ellipse(0, W * 0.18, L * 0.32, W * 0.2, 0, 0, Math.PI * 2);
          ctx.fill();

          // 7. Cute Species Markings on Side Body
          ctx.fillStyle = fish.accent;
          if (fish.name === "mochi") {
            // Orange mochi spots on back and head
            ctx.beginPath();
            ctx.ellipse(L * 0.18, -W * 0.2, 4.5, 3.2, -0.2, 0, Math.PI * 2);
            ctx.ellipse(-L * 0.1, -W * 0.18, 5, 3.5, 0.15, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "berry") {
            // Strawberry spots
            ctx.beginPath();
            ctx.ellipse(L * 0.15, -W * 0.18, 4.5, 3.5, -0.1, 0, Math.PI * 2);
            ctx.ellipse(-L * 0.12, -W * 0.12, 4, 3, 0.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "honey") {
            // Golden dorsal sheen
            ctx.beginPath();
            ctx.ellipse(0, -W * 0.22, L * 0.3, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "pebble") {
            // Sky blue cap
            ctx.beginPath();
            ctx.ellipse(L * 0.15, -W * 0.2, 5, 3.5, -0.15, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "creamsicle") {
            // Peach apricot band
            ctx.beginPath();
            ctx.ellipse(L * 0.12, -W * 0.15, 4, 4.5, 0.1, 0, Math.PI * 2);
            ctx.ellipse(-L * 0.12, -W * 0.12, 4, 4, -0.1, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "sakura") {
            // Sakura petal spots
            ctx.beginPath();
            ctx.ellipse(L * 0.16, -W * 0.18, 4.2, 3.2, 0.2, 0, Math.PI * 2);
            ctx.ellipse(-L * 0.1, -W * 0.14, 4.5, 3.2, -0.2, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "taro") {
            // Violet dorsal ribbon
            ctx.beginPath();
            ctx.ellipse(0, -W * 0.2, L * 0.26, 2.4, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "minty") {
            // Mint flank stripe
            ctx.beginPath();
            ctx.ellipse(0, -W * 0.15, L * 0.28, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "sunny") {
            // Warm coral cap
            ctx.beginPath();
            ctx.ellipse(L * 0.2, -W * 0.2, 4.5, 3, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (fish.name === "opal") {
            // Pearl luster
            ctx.beginPath();
            ctx.ellipse(0, -W * 0.18, L * 0.28, 2.8, 0, 0, Math.PI * 2);
            ctx.fill();
          }

          // 8. Pectoral Fin (Side Flipper that flaps gently)
          ctx.fillStyle = `${fish.secondary}cc`;
          ctx.beginPath();
          ctx.ellipse(
            L * 0.1,
            2 + Math.sin(fish.tailPhase * 1.5) * 1.2,
            5.5,
            3.2,
            0.35,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // 9. Adorable Rosy Blush Cheek
          ctx.fillStyle = fish.blush;
          ctx.beginPath();
          ctx.ellipse(L * 0.24, W * 0.12, 3.2, 2.2, 0, 0, Math.PI * 2);
          ctx.fill();

          // 10. Large, Expressive, Sparkly Anime Eye (Side View)
          const eyeX = L * 0.3;
          const eyeY = -W * 0.18;
          // Outer dark pupil
          ctx.fillStyle = "#0f172a";
          ctx.beginPath();
          ctx.arc(eyeX, eyeY, 2.8, 0, Math.PI * 2);
          ctx.fill();
          // Primary big white catchlight
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(eyeX + 0.9, eyeY - 0.7, 1.25, 0, Math.PI * 2);
          ctx.fill();
          // Secondary twinkle
          ctx.beginPath();
          ctx.arc(eyeX - 0.7, eyeY + 0.8, 0.65, 0, Math.PI * 2);
          ctx.fill();

          // 11. Tiny Sweet Smile at Snout
          ctx.strokeStyle = "rgba(15, 23, 42, 0.3)";
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(L * 0.44, 2, 1.8, -0.2, Math.PI * 0.4);
          ctx.stroke();

          ctx.restore();
        });

        // 6. AMBIENT UNDERWATER BUBBLES
        bubbles.forEach((b) => {
          b.y -= b.speed;
          b.wobble += 0.025;
          const currentX = b.x + Math.sin(b.wobble) * 1.3;

          if (b.y < BASELINE_Y) {
            b.y = height + Math.random() * 20;
            b.x = Math.random() * width;
          }

          ctx.beginPath();
          ctx.arc(currentX, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
          ctx.fill();
          ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });

        // 7. WATER SPLASH PARTICLES
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.vy += 9.8 * 0.028;
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= 0.022;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(186, 230, 253, ${p.alpha})`;
          ctx.fill();
        }
      } catch (err) {
        console.warn("Water animation loop error:", err);
      } finally {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("treat-fish", handleTreatEvent);
      container.removeEventListener("pointermove", handleContainerPointerMove);
      container.removeEventListener("pointerleave", handleContainerPointerLeave);
      container.removeEventListener("pointerdown", handleContainerPointerDown);
      window.removeEventListener("pointerup", handleContainerPointerUp);
      duckEl.removeEventListener("pointerdown", onDuckPointerDown);
      window.removeEventListener("pointermove", onDuckPointerMove);
      window.removeEventListener("pointerup", onDuckPointerUp);
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
        window.removeEventListener("devicemotion", handleMotion);
        window.removeEventListener("touchstart", requestSensorPermissions);
        window.removeEventListener("pointerdown", requestSensorPermissions);
      }
    };
  }, []);

  return (
    <div className="water-footer-system" ref={containerRef}>
      {/* Real-time WebGL/2D fluid & fish canvas */}
      <canvas ref={canvasRef} className="water-footer-canvas" />

      {/* Interactive Rubber Duck with True Buoyancy */}
      <div
        ref={duckRef}
        className="floating-rubber-duck"
        title="Squeak me! Push me down into water or drag me!"
      >
        <svg
          viewBox="0 0 64 56"
          width="52"
          height="44"
          className="rubber-duck-svg"
        >
          <defs>
            <linearGradient id="duckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="beakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <radialGradient id="duckWaterShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(4, 14, 26, 0.45)" />
              <stop offset="100%" stopColor="rgba(4, 14, 26, 0)" />
            </radialGradient>
          </defs>

          {/* Water Contact Shadow */}
          <ellipse cx="32" cy="46" rx="24" ry="4" fill="url(#duckWaterShadow)" />

          {/* Duck Chubby Body */}
          <path
            d="M 12 36 C 8 34 6 26 12 22 C 16 19 22 22 28 26 C 36 24 46 25 52 31 C 56 36 53 43 45 45 C 32 47 18 45 12 36 Z"
            fill="url(#duckGrad)"
            stroke="#ca8a04"
            strokeWidth="1.2"
          />

          {/* Cute Upward Tail Feather */}
          <path
            d="M 10 24 C 6 18 10 12 14 15 C 13 19 12 22 10 24 Z"
            fill="#facc15"
            stroke="#ca8a04"
            strokeWidth="1.2"
          />

          {/* Folded Wing */}
          <path
            d="M 22 34 C 20 28 26 27 34 30 C 38 32 37 38 31 40 C 25 41 22 38 22 34 Z"
            fill="#fde047"
            stroke="#ca8a04"
            strokeWidth="1"
          />

          {/* Duck Head */}
          <circle
            cx="44"
            cy="18"
            r="12"
            fill="url(#duckGrad)"
            stroke="#ca8a04"
            strokeWidth="1.2"
          />

          {/* Bright Cartoon Eye with White Shine */}
          <circle cx="48" cy="15" r="2.8" fill="#0f172a" />
          <circle cx="49" cy="14" r="1.1" fill="#ffffff" />

          {/* Cute Orange Beak */}
          <path
            d="M 54 18 C 61 17 63 21 57 23 C 53 23 52 21 54 18 Z"
            fill="url(#beakGrad)"
            stroke="#c2410c"
            strokeWidth="1"
          />

          {/* Cheek Blush */}
          <ellipse cx="44" cy="22" rx="2.5" ry="1.5" fill="#f87171" opacity="0.4" />
        </svg>

        {/* Squeak Text Reaction on Click */}
        {squeakCount > 0 && (
          <div key={squeakCount} className="duck-squeak-bubble">
            Squeak! 💦
          </div>
        )}
      </div>
    </div>
  );
}
