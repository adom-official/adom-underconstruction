"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cosmicAudio } from "@/lib/sound";

export default function CosmicSphere3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Mouse tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-22, 22]), springConfig);

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
    cosmicAudio.playChime(659.25, 0.5); // E5
  };

  // Device orientation support for mobile gyro 3D tilt if supported
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp angles
        const normGamma = Math.max(-1, Math.min(1, e.gamma / 45));
        const normBeta = Math.max(-1, Math.min(1, (e.beta - 30) / 45));
        x.set(normGamma * 0.4);
        y.set(normBeta * 0.4);
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
      id="cosmic-sphere-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        cosmicAudio.playHoverTone();
      }}
      onMouseLeave={handleMouseLeave}
      onClick={handleInteract}
      className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto cursor-pointer select-none flex items-center justify-center group"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="w-full h-full relative flex items-center justify-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Ambient Outer Aura */}
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.15, 1.08] : [1, 1.05, 1],
            opacity: isHovered ? [0.35, 0.5, 0.4] : [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.4) 0%, rgba(168, 85, 247, 0.2) 45%, transparent 70%)",
            transform: "translateZ(-40px)",
          }}
        />

        {/* Orbit Ring 1 - Deep Equatorial Angle */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border border-indigo-400/30 border-dashed pointer-events-none"
          style={{
            transform: "rotateX(72deg) rotateY(15deg) translateZ(0px)",
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.15)",
          }}
        >
          {/* Satellite Beacon */}
          <motion.div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Orbit Ring 2 - Polar Incline Angle */}
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          className="absolute w-60 h-60 sm:w-76 sm:h-76 md:w-88 md:h-88 rounded-full border border-purple-400/25 pointer-events-none"
          style={{
            transform: "rotateX(45deg) rotateY(-40deg) translateZ(10px)",
          }}
        >
          <motion.div
            className="absolute top-1/4 right-0 w-2.5 h-2.5 rounded-full bg-purple-300 shadow-[0_0_10px_#c084fc]"
          />
        </motion.div>

        {/* Orbit Ring 3 - Outer Thin Gyro Horizon */}
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border border-blue-500/20 border-dotted pointer-events-none"
          style={{
            transform: "rotateX(25deg) rotateY(60deg) translateZ(-15px)",
          }}
        >
          <div className="absolute bottom-2 left-1/3 w-2 h-2 rounded-full bg-indigo-300 shadow-[0_0_8px_#818cf8]" />
        </motion.div>

        {/* Central Core Celestial Body */}
        <motion.div
          animate={{
            scale: isHovered ? 1.06 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 35% 30%, #4338ca 0%, #1e1b4b 55%, #050410 100%)",
            boxShadow: "inset 0 0 35px rgba(129, 140, 248, 0.6), 0 0 45px rgba(99, 102, 241, 0.4)",
            transform: "translateZ(30px)",
          }}
        >
          {/* Surface Texture Grid Lines */}
          <div
            className="absolute inset-1 rounded-full opacity-35 overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Glowing Celestial Singularity Icon / Core Light */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #ffffff 0%, #a5b4fc 40%, rgba(99, 102, 241, 0) 70%)",
              filter: "blur(0.5px)",
            }}
          />

          {/* Interactive Click Ripple Waves */}
          {pulseCount > 0 && (
            <motion.div
              key={pulseCount}
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-cyan-400 pointer-events-none"
            />
          )}

          {/* Horizon Specular Glint */}
          <div className="absolute top-4 left-6 w-8 h-4 bg-white/40 rounded-full blur-[3px] rotate-[-25deg] pointer-events-none" />
        </motion.div>

        {/* Hover Cue Tag */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.6,
            y: isHovered ? 0 : 3,
          }}
          className="absolute -bottom-8 px-3 py-1 rounded-full bg-slate-900/80 border border-indigo-500/30 text-[11px] font-mono tracking-widest text-indigo-300 backdrop-blur-md"
          style={{ transform: "translateZ(45px)" }}
        >
          {isHovered ? "CLICK TO TRANSMIT PULSE" : "ORBITAL NODE • 3D"}
        </motion.div>
      </motion.div>
    </div>
  );
}
