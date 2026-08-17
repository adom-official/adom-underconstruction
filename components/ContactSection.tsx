"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight } from "lucide-react";
import { cosmicAudio } from "@/lib/sound";
import { trackEvent } from "@/lib/analytics";

interface ContactProps {
  lang: "vi" | "en";
}

export default function ContactSection({ lang }: ContactProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const contactData = {
    email: "contact@swifcom.vn",
    phone: "+84 90 123 4567",
    locationVi: "TP. HỒ CHÍ MINH & HÀ NỘI, VIỆT NAM",
    locationEn: "HO CHI MINH CITY & HANOI, VIETNAM",
    responseVi: "TRỰC TUYẾN 24/7 (PHẢN HỒI DƯỚI 2 GIỜ)",
    responseEn: "DIRECT LINE 24/7 (RESPONSE < 2 HOURS)",
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    cosmicAudio.playChime(600, 0.2);
    trackEvent("copy_contact_info", "contact_interaction", type);

    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const t = {
    vi: {
      sectionNum: "03 // LIÊN LẠC",
      title: "KÊNH KẾT NỐI TRỰC TIẾP",
      desc: "Mọi đề xuất hợp tác, tài trợ và giao lưu nghệ thuật số xin gửi về các kênh truyền thông chính thức.",
      mailLabel: "ĐỊA CHỈ HỘP THƯ",
      phoneLabel: "ĐƯỜNG DÂY TÍN HIỆU",
      locLabel: "TỌA ĐỘ VẬN HÀNH",
      respLabel: "THỜI GIAN PHẢN HỒI",
      copyText: "SAO CHÉP",
      copiedText: "ĐÃ SAO CHÉP",
      networkTitle: "MẠNG LƯỚI KHÔNG GIAN NGHỆ THUẬT",
    },
    en: {
      sectionNum: "03 // DIRECTORY",
      title: "COMMUNICATION FREQUENCIES",
      desc: "Inquiries regarding artistic collaboration, enterprise sponsorship, and digital design should be directed here.",
      mailLabel: "ELECTRONIC MAIL",
      phoneLabel: "TELECOMMUNICATION",
      locLabel: "GEOGRAPHICAL BASE",
      respLabel: "OPERATIONAL CYCLE",
      copyText: "COPY",
      copiedText: "COPIED",
      networkTitle: "ARTISTIC SPACE NETWORK",
    },
  }[lang];

  const socials = [
    { name: "GITHUB", url: "https://github.com" },
    { name: "LINKEDIN", url: "https://linkedin.com" },
    { name: "X / TWITTER", url: "https://x.com" },
    { name: "TELEGRAM", url: "https://t.me" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" id="contact-section">
      {/* Header Line */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/20 pb-4 gap-2">
        <div className="space-y-1">
          <div className="font-mono text-xs tracking-[0.3em] text-indigo-400 font-bold uppercase">
            {t.sectionNum}
          </div>
          <h2 className="text-xl sm:text-2xl font-serif tracking-tight text-white uppercase italic">
            {t.title}
          </h2>
        </div>
        <p className="text-xs font-mono text-slate-400 max-w-md tracking-wider">
          {t.desc}
        </p>
      </div>

      {/* Avant-Garde Editorial Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/15 border border-white/20">
        {/* Email Box */}
        <div className="bg-black/85 p-6 sm:p-8 flex flex-col justify-between space-y-4 group hover:bg-black transition-all">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
              [ 01 ] {t.mailLabel}
            </span>
            <a
              href={`mailto:${contactData.email}`}
              className="text-lg sm:text-2xl font-mono text-white hover:text-cyan-300 block transition-colors tracking-tight"
            >
              {contactData.email}
            </a>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <a
              href={`mailto:${contactData.email}`}
              className="text-xs font-mono tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <span>GỬI THƯ NGAY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => copyToClipboard(contactData.email, "email")}
              className="px-3 py-1 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedType === "email" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{t.copiedText}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{t.copyText}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Phone Box */}
        <div className="bg-black/85 p-6 sm:p-8 flex flex-col justify-between space-y-4 group hover:bg-black transition-all">
          <div className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
              [ 02 ] {t.phoneLabel}
            </span>
            <a
              href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
              className="text-lg sm:text-2xl font-mono text-white hover:text-cyan-300 block transition-colors tracking-tight"
            >
              {contactData.phone}
            </a>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <a
              href={`tel:${contactData.phone.replace(/\s+/g, "")}`}
              className="text-xs font-mono tracking-wider text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <span>KẾT NỐI THOẠI</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => copyToClipboard(contactData.phone, "phone")}
              className="px-3 py-1 bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[10px] tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedType === "phone" ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>{t.copiedText}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{t.copyText}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Location Box */}
        <div className="bg-black/85 p-6 sm:p-8 space-y-2">
          <span className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
            [ 03 ] {t.locLabel}
          </span>
          <div className="text-sm sm:text-base font-mono text-slate-200 tracking-wider">
            {lang === "vi" ? contactData.locationVi : contactData.locationEn}
          </div>
        </div>

        {/* Operational Cycle Box */}
        <div className="bg-black/85 p-6 sm:p-8 space-y-2">
          <span className="font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase font-semibold">
            [ 04 ] {t.respLabel}
          </span>
          <div className="text-sm sm:text-base font-mono text-slate-200 tracking-wider">
            {lang === "vi" ? contactData.responseVi : contactData.responseEn}
          </div>
        </div>
      </div>

      {/* Social Bar */}
      <div className="border border-white/15 p-4 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
        <span className="text-slate-400 tracking-[0.2em] uppercase">{t.networkTitle}</span>
        <div className="flex flex-wrap items-center gap-4">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                cosmicAudio.playChime(480, 0.1);
                trackEvent("click_social_link", "navigation", s.name);
              }}
              className="text-slate-300 hover:text-white transition-colors tracking-widest flex items-center gap-1 group"
            >
              <span>{s.name}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
