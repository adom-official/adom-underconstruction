"use client";

import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto text-center px-4 pt-6 sm:pt-12 pb-6 select-none">
      {/* 1. Brand Tagline with #A6CE39 accent */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-3 mb-6 sm:mb-8 font-sans"
      >
        <span className="h-[1px] w-6 sm:w-12 bg-[#A6CE39]/50" />
        <span className="text-xs sm:text-sm tracking-[0.45em] sm:tracking-[0.6em] text-[#A6CE39] uppercase font-bold">
          CHÚNG TÔI
        </span>
        <span className="h-[1px] w-6 sm:w-12 bg-[#A6CE39]/50" />
      </motion.div>

      {/* 2. Monumental Sculptural Typography Block (Retaining display/serif on Hero banner as instructed) */}
      <div className="space-y-1 sm:space-y-2 mb-8 sm:mb-10">
        {/* Massive Bold Geometric Display Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display font-extrabold uppercase text-[12vw] sm:text-[9vw] md:text-[6.5rem] lg:text-[7.8rem] leading-[0.88] tracking-[-0.03em] text-white"
        >
          ĐANG XÂY DỰNG
        </motion.h1>

        {/* High-Contrast Editorial Serif Italic with subtle #A6CE39 glow reflection */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-editorial italic font-normal text-[13vw] sm:text-[10vw] md:text-[7.2rem] lg:text-[8.5rem] leading-[0.88] tracking-[-0.02em] text-neutral-300"
        >
          WEBSITE
        </motion.div>
      </div>

      {/* 3. Refined Hairline Crosshair Separator with #A6CE39 accent */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative my-8 sm:my-10 flex items-center justify-center max-w-sm sm:max-w-md mx-auto"
      >
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#A6CE39]/60 to-transparent" />
        <div className="absolute px-3 bg-[#060608] text-[#A6CE39] text-[11px] font-sans font-bold">
          ✦
        </div>
      </motion.div>

      {/* 4. Spaced Out Baseline Subtitle (sans-serif) */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-sans text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] sm:tracking-[0.45em] text-neutral-200 uppercase mb-4"
      >
        C Á C &nbsp; B Ạ N &nbsp; H Ã Y &nbsp; T R Ở &nbsp; L Ạ I &nbsp; S A U .
      </motion.p>

      {/* 5. Clean Sans-serif Manifesto */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-sans text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto leading-relaxed font-normal px-4"
      >
        Chúng tôi đang hoàn thiện không gian trực tuyến với phong cách nghệ thuật độc bản. Xin hãy kiên nhẫn đón chờ trải nghiệm hoàn hảo nhất.
      </motion.p>
    </div>
  );
}
