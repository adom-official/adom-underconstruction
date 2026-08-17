"use client";

import { useState } from "react";
import CosmicBackground from "@/components/CosmicBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SubscribeCard from "@/components/SubscribeCard";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";

export default function Home() {
  const [brandInfo] = useState({
    name: "YOUR BRAND",
    edition: "ẤN BẢN 2026",
    logoSrc: "/logo.png",
    backgroundImageSrc: "/background.png", // Tệp ảnh nền (đã được cấu hình trỏ đến /background.png)
    phone: "0123 456 789",
    email: "hello@yourbrand.com",
    address: "Hà Nội, Việt Nam",
    year: 2026,
  });

  const handleMailClick = () => {
    window.location.href = `mailto:${brandInfo.email}`;
  };

  return (
    <main className="relative min-h-screen w-full bg-[#060608] text-white flex flex-col justify-between overflow-x-hidden selection:bg-[#A6CE39] selection:text-black font-sans">
      {/* 1. Atmospheric Deep Noir Cosmic Canvas (or Custom Background Image) */}
      <CosmicBackground backgroundImageSrc={brandInfo.backgroundImageSrc || undefined} />

      {/* 2. Architectural Header Navigation with PNG Logo Support */}
      <Header
        brandName={brandInfo.name}
        edition={brandInfo.edition}
        logoSrc={brandInfo.logoSrc}
        onMailClick={handleMailClick}
      />

      {/* 3. Main Monumental Content Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16 flex flex-col items-center justify-center gap-12 sm:gap-16 md:gap-20 my-auto">
        {/* Monumental Sculptural Typography Headline */}
        <HeroSection />

        {/* Minimalist Subscription Register */}
        <SubscribeCard />

        {/* 3-Column Direct Contact Directory */}
        <ContactInfo
          phone={brandInfo.phone}
          email={brandInfo.email}
          address={brandInfo.address}
        />
      </div>

      {/* 4. Centered Colophon Footer */}
      <Footer brandName={brandInfo.name} year={brandInfo.year} />
    </main>
  );
}
