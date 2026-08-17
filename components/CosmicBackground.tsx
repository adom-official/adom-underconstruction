"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
}

interface CosmicBackgroundProps {
  backgroundImageSrc?: string;
  overlayOpacity?: number; // 0 to 1
}

export default function CosmicBackground({
  backgroundImageSrc,
  overlayOpacity = 0.5,
}: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgFailed, setBgFailed] = useState(false);

  useEffect(() => {
    if (!backgroundImageSrc) return;

    let isMounted = true;
    const img = new window.Image();
    img.src = backgroundImageSrc;
    img.onload = () => {
      if (!isMounted) return;
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        setBgLoaded(true);
        setBgFailed(false);
      } else {
        setBgFailed(true);
      }
    };
    img.onerror = () => {
      if (!isMounted) return;
      setBgFailed(true);
      setBgLoaded(false);
    };

    return () => {
      isMounted = false;
    };
  }, [backgroundImageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Fine celestial stars (subtle, non-distracting)
    const starCount = Math.floor(Math.min(Math.max((width * height) / 6000, 60), 180));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.12 + Math.random() * 0.45;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.85 ? 0.6 + Math.random() * 0.6 : 1.2 + Math.random() * 0.6,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.008 + Math.random() * 0.02,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Only draw default dark gradient if no custom background image is loaded
      if (!bgLoaded) {
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.3,
          20,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.85
        );
        bgGrad.addColorStop(0, "#0c0d12");
        bgGrad.addColorStop(0.4, "#07070a");
        bgGrad.addColorStop(0.8, "#040406");
        bgGrad.addColorStop(1, "#020203");

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Render subtle poetic stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha = star.baseAlpha + Math.sin(time * 3 + i * 1.8) * 0.2;
        if (star.alpha < 0.08) star.alpha = 0.08;
        if (star.alpha > 0.85) star.alpha = 0.85;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 240, 250, ${star.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [bgLoaded]);

  const showCustomBg = backgroundImageSrc && bgLoaded && !bgFailed;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" id="cosmic-canvas-scene">
      {/* 1. Custom Background Image if active */}
      {showCustomBg && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url(${backgroundImageSrc})`,
          }}
        >
          {/* Refined dark overlay to maintain sharp readability on text */}
          <div
            className="absolute inset-0 bg-[#060608]"
            style={{ opacity: overlayOpacity }}
          />
        </div>
      )}

      {/* 2. Ambient Canvas (Stars overlay) */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-[1]" />

      {/* 3. Celestial Disc & Mountain Silhouette (Shown when no custom bg is loaded) */}
      {!showCustomBg && (
        <>
          <div className="absolute top-[-10vw] sm:top-[-6vw] left-1/2 -translate-x-1/2 w-[90vw] max-w-[860px] aspect-square rounded-full pointer-events-none select-none flex items-center justify-center opacity-70 z-[2]">
            <div
              className="absolute inset-[-4%] rounded-full pointer-events-none blur-3xl opacity-20"
              style={{
                background: "radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.4) 0%, rgba(166, 206, 57, 0.15) 30%, transparent 70%)",
              }}
            />

            <div
              className="relative w-full h-full rounded-full overflow-hidden"
              style={{
                background: "radial-gradient(circle at 50% 10%, #151720 0%, #0c0d12 40%, #050508 80%, #020204 100%)",
                boxShadow: "inset 0 4px 18px rgba(255, 255, 255, 0.4), inset 0 20px 60px rgba(200, 215, 240, 0.15), 0 0 60px rgba(0, 0, 0, 0.9)",
              }}
            >
              <div
                className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[80%] h-[30%] rounded-full pointer-events-none opacity-80"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.8) 0%, rgba(220, 230, 250, 0.4) 35%, transparent 80%)",
                  filter: "blur(1px)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(3, 3, 5, 0.7) 40%, rgba(2, 2, 4, 0.98) 85%)",
                }}
              />
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 h-32 sm:h-48 pointer-events-none select-none z-[2] overflow-hidden opacity-85">
            <svg
              className="absolute bottom-0 inset-x-0 w-full h-full object-cover pointer-events-none"
              viewBox="0 0 1440 240"
              preserveAspectRatio="none"
            >
              <path
                d="M0,240 L0,120 L60,95 L140,130 L220,80 L310,140 L450,165 L600,180 L760,175 L920,135 L1080,75 L1210,120 L1340,70 L1440,95 L1440,240 Z"
                fill="#030305"
              />
              <path
                d="M0,120 L60,95 L140,130 L220,80 L310,140 L450,165 L600,180 L760,175 L920,135 L1080,75 L1210,120 L1340,70 L1440,95"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />
            </svg>
          </div>
        </>
      )}

      {/* 4. Fine Atmospheric Film Grain / Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-[3]"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
    </div>
  );
}
