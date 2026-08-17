"use client";

import { motion } from "motion/react";

interface FooterProps {
  brandName?: string;
  year?: number;
}

export default function Footer({
  brandName = "YOUR BRAND",
  year = 2026,
}: FooterProps) {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-12 pb-8 border-t border-white/10 select-none font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex items-center justify-center text-center text-xs text-neutral-400 tracking-wider uppercase font-medium"
      >
        <div className="flex items-center justify-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A6CE39] inline-block shadow-[0_0_8px_#A6CE39]" />
          <span>© {year} {brandName}. ALL RIGHTS RESERVED.</span>
        </div>
      </motion.div>
    </footer>
  );
}
