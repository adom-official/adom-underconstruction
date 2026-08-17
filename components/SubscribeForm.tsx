"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Check, AlertCircle, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cosmicAudio } from "@/lib/sound";

interface SubscribeProps {
  lang: "vi" | "en";
}

interface StoredSubscriber {
  email: string;
  id: number;
  timestamp: string;
}

export default function SubscribeForm({ lang }: SubscribeProps) {
  const [initialData] = useState<StoredSubscriber | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("cosmic_launch_subscriber");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [email, setEmail] = useState(() => initialData?.email || "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(() =>
    initialData ? "success" : "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [subscriberNumber, setSubscriberNumber] = useState<number>(() => initialData?.id || 128);
  const [isSubscribed, setIsSubscribed] = useState(() => !!initialData);

  const t = {
    vi: {
      sectionNum: "02 // KẾT NỐI",
      title: "NHẬN THÔNG BÁO KHỞI KHẮC",
      desc: "Để lại thư điện tử của bạn để nhận bản tin duy nhất vào thời điểm thực thể không gian chính thức đi vào quỹ đạo.",
      placeholder: "ĐỊA CHỈ THƯ ĐIỆN TỬ (EMAIL)...",
      button: "GỬI TÍN HIỆU",
      loading: "ĐANG GHI NHẬN...",
      successTitle: "TÍN HIỆU ĐÃ ĐƯỢC LƯU TRỮ VĨNH CỬU",
      successDesc: (num: number) => `Bạn mang mã định danh #${String(num).padStart(3, "0")} trong danh sách khách mời đầu tiên.`,
      privacy: "QUY ƯỚC BẢO MẬT: CHỈ 01 EMAIL DUY NHẤT VÀO NGÀY RA MẮT • KHÔNG THƯ RÁC.",
      invalidEmail: "Vui lòng nhập định dạng email hợp lệ.",
      badge: "ĐÃ ĐĂNG KÝ VỊ TRÍ",
    },
    en: {
      sectionNum: "02 // TRANSMISSION",
      title: "RECEIVE THE GENESIS DISPATCH",
      desc: "Leave your transmission coordinates to receive a singular dispatch the moment this digital space entity becomes active.",
      placeholder: "ENTER YOUR ELECTRONIC MAIL (EMAIL)...",
      button: "TRANSMIT",
      loading: "RECORDING...",
      successTitle: "SIGNAL ARCHIVED IN THE REGISTRY",
      successDesc: (num: number) => `You hold entry code #${String(num).padStart(3, "0")} in the premiere exhibition roster.`,
      privacy: "PROTOCOL: EXACTLY ONE DISPATCH ON GENESIS DAY • STRICT PRIVACY.",
      invalidEmail: "Please provide a valid email format.",
      badge: "ROSTER CONFIRMED",
    },
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      setErrorMessage(t.invalidEmail);
      return;
    }

    setStatus("loading");
    cosmicAudio.playChime(520, 0.2);

    setTimeout(() => {
      const assignedId = Math.floor(130 + Math.random() * 25);
      setSubscriberNumber(assignedId);
      setStatus("success");
      setIsSubscribed(true);

      try {
        localStorage.setItem(
          "cosmic_launch_subscriber",
          JSON.stringify({
            email: email.trim(),
            id: assignedId,
            timestamp: new Date().toISOString(),
          })
        );
      } catch {
        // ignore
      }

      cosmicAudio.playSuccessTone();
      trackEvent("submit_lead_form", "lead_generation", email.trim(), 1, {
        subscriber_id: assignedId,
        locale: lang,
      });
    }, 700);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6" id="subscribe-form-container">
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

      {/* Main Architectural Form Box */}
      <div className="relative border border-white/20 bg-black/85 p-6 sm:p-10 backdrop-blur-xl">
        {/* Geometric Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />

        <AnimatePresence mode="wait">
          {status === "success" || isSubscribed ? (
            <motion.div
              key="success-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-4 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white bg-white/10">
                  <Check className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs tracking-[0.3em] text-cyan-300 font-bold uppercase">
                  {`${t.badge} • #${String(subscriberNumber).padStart(3, "0")}`}
                </span>
              </div>

              <div className="space-y-1 border-l-2 border-indigo-400 pl-4">
                <h3 className="text-lg sm:text-xl font-serif tracking-tight text-white uppercase">
                  {t.successTitle}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-slate-300 tracking-wider">
                  {t.successDesc(subscriberNumber)}
                </p>
                <p className="text-xs font-mono text-indigo-300 pt-2">
                  DISPATCH DESTINATION: {email}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form-state"
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                <div className="relative flex-1">
                  <input
                    type="email"
                    id="art-subscriber-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={t.placeholder}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/20 text-white placeholder-slate-500 font-mono text-xs sm:text-sm tracking-wider focus:outline-none focus:border-white focus:bg-white/10 transition-all uppercase"
                  />
                </div>

                <button
                  type="submit"
                  id="art-subscribe-btn"
                  disabled={status === "loading"}
                  className="px-8 py-4 bg-white text-black hover:bg-slate-200 font-mono text-xs sm:text-sm font-bold tracking-[0.25em] uppercase flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer group"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.loading}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.button}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 tracking-wider">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] font-mono tracking-widest text-slate-400 gap-2">
                <span>{t.privacy}</span>
                <span className="text-white/60">ENCRYPTION: QUANTUM 256</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
