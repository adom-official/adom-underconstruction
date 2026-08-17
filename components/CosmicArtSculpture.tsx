"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cosmicAudio } from "@/lib/sound";

export default function CosmicArtSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Motion tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [24, -24]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-28, 28]), springConfig);
  const glowX = useTransform(x, [-0.5, 0.5], ["25%", "75%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["25%", "75%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleInteract = () => {
    setPulseCount((prev) => prev + 1);
    cosmicAudio.playChime(528, 0.5);
  };

  // Gyroscope tilt on mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const normGamma = Math.max(-1, Math.min(1, e.gamma / 45));
        const normBeta = Math.max(-1, Math.min(1, (e.beta - 30) / 45));
        x.set(normGamma * 0.5);
        y.set(normBeta * 0.5);
      }
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      id="cosmic-art-sculpture"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        cosmicAudio.playHoverTone();
      }}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteract}
      className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] mx-auto cursor-pointer select-none flex items-center justify-center group"
      style={{ perspective: 1400 }}
    >
      {/* Background Giant Geometric Watermark Art Ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-full h-full rounded-full border border-white/20 border-dashed animate-[spin_60s_linear_infinite]" />
      </div>

      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Deep Aura Prism Halo */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.15, 1.08] : [1, 1.04, 1],
            opacity: isHovered ? [0.4, 0.6, 0.45] : [0.25, 0.35, 0.25],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(99, 102, 241, 0.25) 40%, rgba(6, 182, 212, 0.15) 70%, transparent 85%)",
            transform: "translateZ(-80px)",
          }}
        />

        {/* Outer Brutalist Square Frame */}
        <motion.div
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-88 md:h-88 border border-white/15 pointer-events-none flex items-center justify-center"
          style={{ transform: "translateZ(-20px)" }}
        >
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white/80" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white/80" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white/80" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white/80" />
          
          <span className="absolute top-2 left-3 font-mono text-[9px] tracking-[0.25em] text-slate-500 uppercase">
            FORM // 01
          </span>
          <span className="absolute bottom-2 right-3 font-mono text-[9px] tracking-[0.25em] text-slate-500 uppercase">
            VOID // 99
          </span>
        </motion.div>

        {/* Sculptural Giant Ring 1 - Vertical Titanium Slice */}
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-white/30 pointer-events-none"
          style={{
            transform: "rotateX(75deg) translateZ(0px)",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Typographic markers on the ring */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 bg-black border border-white/40 text-[9px] font-mono tracking-widest text-slate-300">
            AESTHETIC NOIR
          </div>
        </motion.div>

        {/* Sculptural Giant Ring 2 - Oblique Orbital Meridian */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
          className="absolute w-60 h-60 sm:w-76 sm:h-76 md:w-92 md:h-92 rounded-full border border-indigo-400/30 border-dashed pointer-events-none"
          style={{
            transform: "rotateX(40deg) rotateY(-35deg) translateZ(20px)",
          }}
        />

        {/* The Central Obsidian Monolith & Solar Eclipse Disc */}
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(circle at 35% 25%, #181528 0%, #080612 60%, #000000 100%)",
            boxShadow: "inset 0 0 50px rgba(168, 85, 247, 0.3), 0 0 60px rgba(99, 102, 241, 0.35), 0 25px 50px -12px rgba(0,0,0,0.9)",
            transform: "translateZ(50px)",
          }}
        >
          {/* Specular Light Crescent on Eclipse Rim */}
          <div 
            className="absolute inset-0 rounded-full border-t border-r border-white/70 opacity-80 pointer-events-none"
            style={{ filter: "drop-shadow(0 0 8px #ffffff)" }}
          />

          {/* Bold Minimalist Typographic Core */}
          <div className="flex flex-col items-center justify-center text-center z-10 select-none">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-indigo-300/90 font-bold uppercase">
              ORBITAL
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-white italic my-0.5">
              Nexus
            </span>
            <span className="font-mono text-[9px] tracking-[0.3em] text-slate-400 uppercase">
              2026 • VI
            </span>
          </div>

          {/* Interactive Light Pulse Wave */}
          {pulseCount > 0 && (
            <motion.div
              key={pulseCount}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 rounded-full border border-cyan-300 pointer-events-none"
            />
          )}

          {/* Subtle Grid Art Texture Inside Monolith */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
        </motion.div>

        {/* Minimalist Floating Label */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? 0 : 4,
          }}
          className="absolute -bottom-10 flex items-center gap-3 px-4 py-1.5 bg-black/90 border border-white/20 text-[10px] font-mono tracking-[0.3em] text-slate-300 uppercase backdrop-blur-xl"
          style={{ transform: "translateZ(70px)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>{isHovered ? "TOUCH TO TRIGGER HARMONIC PULSE" : "CELESTIAL MONOLITH // CLICK TO RESONATE"}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
