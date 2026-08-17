"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { cosmicAudio } from "@/lib/sound";
import { trackEvent } from "@/lib/analytics";

interface SubscribeProps {
  onSuccess?: (email: string) => void;
}

export default function SubscribeCard({ onSuccess }: SubscribeProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Vui lòng nhập địa chỉ email hợp lệ.");
      cosmicAudio.playChime(320, 0.2);
      return;
    }

    setStatus("loading");
    cosmicAudio.playChime(540, 0.15);

    setTimeout(() => {
      setStatus("success");
      cosmicAudio.playSuccessTone();

      try {
        localStorage.setItem(
          "subscribed_email",
          JSON.stringify({
            email: email.trim(),
            timestamp: new Date().toISOString(),
          })
        );
      } catch {
        // fallback
      }

      trackEvent("submit_email", "lead_generation", email.trim());
      if (onSuccess) onSuccess(email.trim());
    }, 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45 }}
      className="relative z-10 w-full max-w-xl mx-auto px-4 font-sans"
    >
      {/* Modern Minimalist Frame with subtle #A6CE39 Brand accents */}
      <div className="relative border border-white/20 bg-black/80 p-6 sm:p-8 backdrop-blur-md rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Brand Accent Corner Markers (#A6CE39) */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#A6CE39]" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#A6CE39]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#A6CE39]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#A6CE39]" />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="py-4 space-y-3 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded border border-[#A6CE39] flex items-center justify-center text-[#A6CE39] bg-[#A6CE39]/10">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-xs tracking-wider text-[#A6CE39] uppercase font-bold">
                  ĐÃ TIẾP NHẬN THÔNG TIN
                </span>
              </div>
              <div className="border-l-2 border-[#A6CE39] pl-4 space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-normal">
                  ĐĂNG KÝ THÀNH CÔNG
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  Chúng tôi sẽ gửi email thông báo trực tiếp đến <span className="text-[#A6CE39] font-semibold underline">{email}</span> ngay khi website ra mắt.
                </p>
              </div>
              <button
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                }}
                className="text-xs text-neutral-400 hover:text-[#A6CE39] uppercase tracking-wider pt-2 block transition-colors cursor-pointer font-medium"
              >
                ← ĐĂNG KÝ VỚI EMAIL KHÁC
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6 text-left">
              {/* Header (Removed "01 // BẢN TIN KHỞI NGUYÊN" as requested) */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-normal">
                  NHẬN THÔNG BÁO KHI RA MẮT
                </h3>
                <span className="text-xs text-[#A6CE39] font-bold">✦</span>
              </div>

              {/* Form Input Container */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch gap-3">
                  <input
                    type="email"
                    id="user-email-input"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="Nhập địa chỉ email của bạn..."
                    required
                    className="flex-1 bg-white/5 border border-white/20 focus:border-[#A6CE39] px-4 py-3.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none tracking-normal rounded-md transition-colors"
                  />

                  {/* Submit Button with #A6CE39 Brand Color */}
                  <button
                    type="submit"
                    id="submit-subscribe-btn"
                    disabled={status === "loading"}
                    className="px-6 py-3.5 bg-[#A6CE39] hover:bg-[#b6df47] text-black active:scale-[0.98] text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all rounded-md shadow-[0_0_20px_rgba(166,206,57,0.3)] disabled:opacity-50 cursor-pointer flex-shrink-0 group"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        <span>ĐANG GỬI...</span>
                      </>
                    ) : (
                      <>
                        <span>GỬI ĐĂNG KÝ</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-xs text-rose-400 font-medium"
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
