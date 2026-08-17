"use client";

import { motion } from "motion/react";

interface MarqueeProps {
  text: string;
  repeat?: number;
  speed?: number;
  reverse?: boolean;
}

export default function KineticTextMarquee({
  text,
  repeat = 6,
  speed = 28,
  reverse = false,
}: MarqueeProps) {
  const items = Array.from({ length: repeat });

  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-white/10 select-none bg-black/40 backdrop-blur-sm pointer-events-none">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-8 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-slate-400">
            <span className="text-white/80 font-bold">{text}</span>
            <span className="text-indigo-400">✦</span>
            <span className="text-slate-500">PHASE // INITIALIZING</span>
            <span className="text-cyan-400">❖</span>
            <span className="text-slate-400">THE UNIVERSE TAKES SHAPE</span>
            <span className="text-indigo-400">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
