"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy } from "lucide-react";
import { cosmicAudio } from "@/lib/sound";
import { trackEvent } from "@/lib/analytics";

interface ContactData {
  phone: string;
  email: string;
  address: string;
}

export default function ContactInfo({
  phone = "0123 456 789",
  email = "hello@yourbrand.com",
  address = "Hà Nội, Việt Nam",
}: Partial<ContactData>) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    cosmicAudio.playChime(580, 0.15);
    trackEvent("copy_contact", "contact_interaction", type);

    setTimeout(() => {
      setCopiedItem(null);
    }, 2200);
  };

  const contacts = [
    {
      id: "phone",
      label: "HOTLINE",
      value: phone,
      href: `tel:${phone.replace(/\s+/g, "")}`,
    },
    {
      id: "email",
      label: "EMAIL",
      value: email,
      href: `mailto:${email}`,
    },
    {
      id: "address",
      label: "ĐỊA CHỈ",
      value: address,
      href: null,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center select-none font-sans"
    >
      {/* Section Header (Removed "KÊNH KẾT NỐI") */}
      <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-6">
        <span className="text-xs tracking-[0.2em] text-[#A6CE39] uppercase font-bold">
          LIÊN HỆ TRỰC TIẾP
        </span>
        <span className="text-xs text-[#A6CE39]">✦</span>
      </div>

      {/* 3-Column Modern Typographic Index Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/20 text-left rounded-lg overflow-hidden">
        {contacts.map((item) => {
          const isCopied = copiedItem === item.id;

          return (
            <div
              key={item.id}
              className="bg-[#08080c]/90 p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:bg-[#0c0c12] transition-colors group"
            >
              {/* Header Label */}
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wider text-[#A6CE39] font-bold uppercase">
                  {item.label}
                </span>
                <span className="text-xs text-neutral-500 group-hover:text-[#A6CE39] transition-colors">
                  ✦
                </span>
              </div>

              {/* Data Value Row with Copy Icon at Far Right */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-sans font-bold text-base sm:text-lg md:text-xl text-white group-hover:text-[#A6CE39] transition-colors block tracking-tight truncate flex-1"
                    title={`Bấm để mở ${item.label}`}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="font-sans font-bold text-base sm:text-lg md:text-xl text-white block tracking-tight truncate flex-1">
                    {item.value}
                  </span>
                )}

                {/* Copy icon button placed at the far right of the data box */}
                <button
                  onClick={() => handleCopy(item.value, item.id)}
                  title={`Sao chép ${item.label}`}
                  className="p-2 bg-white/5 hover:bg-[#A6CE39] text-neutral-400 hover:text-black border border-white/10 hover:border-[#A6CE39] transition-all cursor-pointer flex items-center justify-center rounded flex-shrink-0 shadow-sm"
                  aria-label={`Sao chép ${item.label}`}
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-black font-bold" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Status Pill */}
      <AnimatePresence>
        {copiedItem && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mt-5 border border-[#A6CE39]/50 bg-black/95 text-xs font-semibold tracking-wider text-[#A6CE39] rounded-full shadow-[0_0_15px_rgba(166,206,57,0.3)]"
          >
            <Check className="w-3.5 h-3.5 text-[#A6CE39]" />
            <span>ĐÃ SAO CHÉP VÀO BỘ NHỚ TẠM</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
