"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Mail } from "lucide-react";

interface HeaderProps {
  brandName?: string;
  edition?: string;
  logoSrc?: string;
  onMailClick?: () => void;
}

export default function Header({
  brandName = "ADOM",
  edition,
  logoSrc = "/logo.png",
  onMailClick,
}: HeaderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 pb-4 flex items-center justify-between select-none font-sans">
      {/* Brand Identity: Prominent PNG Logo replacing the 'YOUR BRAND' text */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex items-center group cursor-pointer"
      >
        {!imageError ? (
          <div className="relative h-10 sm:h-12 md:h-14 w-auto min-w-[100px] max-w-[240px] sm:max-w-[300px] flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt={brandName}
              className="h-full w-auto max-h-12 sm:max-h-14 object-contain object-left drop-shadow-[0_2px_12px_rgba(166,206,57,0.2)] transition-transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          </div>
        ) : (
          /* Fallback when logo.png is not loaded yet */
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-[#A6CE39]/60 bg-white/5 flex items-center justify-center text-[#A6CE39] font-bold text-sm shadow-[0_0_15px_rgba(166,206,57,0.2)]">
              ✦
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-[0.2em] text-white uppercase group-hover:text-[#A6CE39] transition-colors">
              {brandName}
            </span>
          </div>
        )}
      </motion.div>

      {/* Direct Contact Button */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex items-center gap-3"
      >
        <button
          onClick={onMailClick}
          className="px-4 py-2 border border-[#A6CE39]/40 hover:border-[#A6CE39] bg-[#A6CE39]/10 hover:bg-[#A6CE39] text-white hover:text-black transition-all flex items-center gap-2 text-xs font-semibold tracking-wider uppercase cursor-pointer rounded-md shadow-[0_0_15px_rgba(166,206,57,0.15)]"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>LIÊN HỆ</span>
        </button>
      </motion.div>
    </header>
  );
}
