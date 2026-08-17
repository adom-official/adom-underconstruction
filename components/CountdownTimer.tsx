"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface CountdownProps {
  lang: "vi" | "en";
}

export default function CountdownTimer({ lang }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 18,
    minutes: 36,
    seconds: 40,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 42);
    targetDate.setHours(targetDate.getHours() + 14);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const t = {
    vi: {
      sectionNum: "01 // THỜI KHẮC",
      title: "ĐẾM NGƯỢC NGÀY KHỞI NGUYÊN",
      days: "NGÀY",
      hours: "GIỜ",
      minutes: "PHÚT",
      seconds: "GIÂY",
      status: "TRẠNG THÁI HIỆU CHỈNH NGHỆ THUẬT",
      progressLabel: "GIAI ĐOẠN ĐIÊU KHẮC KHÔNG GIAN SỐ",
      percent: "82% COMPLETE",
    },
    en: {
      sectionNum: "01 // CHRONOS",
      title: "THE COUNTDOWN TO GENESIS",
      days: "DAYS",
      hours: "HOURS",
      minutes: "MINUTES",
      seconds: "SECONDS",
      status: "ARTISTIC CALIBRATION STATUS",
      progressLabel: "SCULPTING DIGITAL ARCHITECTURE",
      percent: "82% COMPLETE",
    },
  }[lang];

  const units = [
    { num: "01", label: t.days, value: timeLeft.days },
    { num: "02", label: t.hours, value: timeLeft.hours },
    { num: "03", label: t.minutes, value: timeLeft.minutes },
    { num: "04", label: t.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" id="countdown-section">
      {/* Top Architectural Header Line */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/20 pb-4 gap-2">
        <div className="space-y-1">
          <div className="font-mono text-xs tracking-[0.3em] text-indigo-400 font-bold uppercase">
            {t.sectionNum}
          </div>
          <h2 className="text-xl sm:text-2xl font-serif tracking-tight text-white uppercase italic">
            {t.title}
          </h2>
        </div>
        <div className="font-mono text-xs tracking-[0.2em] text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>T-MINUS // TIME MATRIX</span>
        </div>
      </div>

      {/* Monumental Typography Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/20">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="relative bg-black/80 p-6 sm:p-8 flex flex-col justify-between group hover:bg-black/95 transition-all min-h-[160px] sm:min-h-[200px]"
          >
            {/* Top Index Corner */}
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px] tracking-widest">
              <span>[{unit.num}]</span>
              <span className="text-indigo-400/80 group-hover:text-cyan-400 transition-colors">✦</span>
            </div>

            {/* Giant Monumental Number */}
            <div className="my-auto py-2">
              <span className="font-mono text-4xl sm:text-6xl md:text-7xl font-light tracking-tighter text-white tabular-nums group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 transition-all">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom Label */}
            <div className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-slate-400 uppercase font-semibold border-t border-white/10 pt-3">
              {unit.label}
            </div>
          </div>
        ))}
      </div>

      {/* Avant-Garde Progress Strip */}
      <div className="border border-white/15 p-4 sm:p-5 bg-black/60 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-mono text-[10px] tracking-[0.25em] text-indigo-400 uppercase font-bold">
            {t.status}
          </div>
          <div className="text-xs sm:text-sm font-sans tracking-wide text-slate-200">
            {t.progressLabel}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 md:max-w-md">
          <div className="w-full h-2 bg-white/10 p-[1px] border border-white/20">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "82%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-white via-indigo-300 to-cyan-300 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            />
          </div>
          <span className="font-mono text-xs tracking-wider text-white font-bold whitespace-nowrap">
            {t.percent}
          </span>
        </div>
      </div>
    </div>
  );
}
