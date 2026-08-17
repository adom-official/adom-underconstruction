"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cosmicAudio } from "@/lib/sound";
import { trackEvent } from "@/lib/analytics";

interface HeaderProps {
  lang: "vi" | "en";
  setLang: (l: "vi" | "en") => void;
}

export default function CosmicHeader({ lang, setLang }: HeaderProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    const newState = cosmicAudio.toggleSound();
    setAudioEnabled(newState);
    trackEvent("toggle_audio", "interface", newState ? "enabled" : "disabled");
  };

  const handleLangChange = (newLang: "vi" | "en") => {
    setLang(newLang);
    cosmicAudio.playChime(540, 0.15);
    trackEvent("change_language", "interface", newLang);
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between z-30 relative border-b border-white/10">
      {/* Brand Identity: Editorial Space Studio */}
      <div className="flex items-center gap-4">
        {/* Geometric Art Monogram */}
        <div className="w-9 h-9 border border-white flex items-center justify-center bg-black/80 font-mono text-sm font-bold tracking-widest text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]">
          ✦
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-sm sm:text-base font-extrabold tracking-[0.3em] text-white uppercase">
            ASTRON<span className="text-indigo-400">.</span>ART
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-slate-400 uppercase">
            {lang === "vi" ? "THỰC THỂ KHÔNG GIAN SỐ // ĐANG ĐỊNH HÌNH" : "DIGITAL COSMIC ENTITY // UNDER FORGE"}
          </span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sound toggle */}
        <button
          onClick={toggleAudio}
          title={audioEnabled ? "Tắt âm thanh tương tác" : "Bật âm thanh không gian"}
          className={`px-3 py-1.5 border font-mono text-xs tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            audioEnabled
              ? "bg-white text-black border-white"
              : "bg-black/70 border-white/20 text-slate-400 hover:text-white hover:border-white/40"
          }`}
        >
          {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{audioEnabled ? "AUDIO ON" : "AUDIO OFF"}</span>
        </button>

        {/* Language switch */}
        <div className="flex items-center border border-white/20 font-mono text-xs">
          <button
            onClick={() => handleLangChange("vi")}
            className={`px-3 py-1.5 transition-all cursor-pointer ${
              lang === "vi"
                ? "bg-white text-black font-bold"
                : "text-slate-400 hover:text-white bg-black/70"
            }`}
          >
            VI
          </button>
          <button
            onClick={() => handleLangChange("en")}
            className={`px-3 py-1.5 transition-all cursor-pointer ${
              lang === "en"
                ? "bg-white text-black font-bold"
                : "text-slate-400 hover:text-white bg-black/70"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
