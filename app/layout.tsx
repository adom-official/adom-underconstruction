import type { Metadata, Viewport } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const viewport: Viewport = {
  themeColor: "#030208",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Website Đang Xây Dựng | Cosmic Launch - Hãy Trở Lại Sau",
  description:
    "Website đang trong quá trình nâng cấp và xây dựng hệ thống mới. Đăng ký email nhận thông báo khi ra mắt chính thức và kết nối với đội ngũ phát triển.",
  keywords: [
    "website đang xây dựng",
    "coming soon landing page",
    "under construction",
    "thông báo ra mắt",
    "đăng ký nhận tin",
    "cosmic space landing page",
  ],
  authors: [{ name: "Space Innovation Team" }],
  creator: "Nova Space",
  publisher: "Nova Space",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Website Đang Xây Dựng | Vũ Trụ Đang Được Định Hình",
    description:
      "Một không gian số mang tính đột phá đang được hoàn thiện. Đăng ký nhận thông báo để trở thành những nhà du hành đầu tiên khi website chính thức ra mắt.",
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "Nova Cosmic Launch",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Đang Xây Dựng | Cosmic Launch",
    description:
      "Website đang trong quá trình xây dựng. Đăng ký nhận thông báo khi website chính thức ra mắt.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nova Space - Website Đang Xây Dựng",
    description:
      "Website đang trong giai đoạn phát triển và xây dựng. Nhận thông báo khi ra mắt.",
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Đăng ký nhận thông báo ra mắt",
    },
  };

  return (
    <html lang="vi" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030208] text-slate-100 antialiased min-h-screen" suppressHydrationWarning>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
