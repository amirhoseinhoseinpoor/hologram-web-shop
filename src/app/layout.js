// app/layout.js
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/reset.css";
import "./Styles/globals.scss";

import StoreProvider from "./Store/storeProvider";
import LogVisit from "./Components/LogVisit";
import AuthBootstrap from "./Components/AuthBootstrap";

const myFont = localFont({ src: "./Fonts/IRANSansXVF.ttf" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.co";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "آذرهولوگرام | تولید و چاپ هولوگرام در ایران",
    template: "%s | آذرهولوگرام",
  },
  description:
    "شرکت آذرهولوگرام (خانه چاپ چکاوک) تولیدکننده انواع هولوگرام، لیبل هولوگرام و محصولات امنیتی با بالاترین سطح کیفیت و فناوری روز در ایران.",
  keywords: [
    "هولوگرام",
    "چاپ هولوگرام",
    "لیبل هولوگرام",
    "تولید هولوگرام",
    "هولوگرام امنیتی",
    "آذرهولوگرام",
    "خانه چاپ چکاوک",
    "هولوگرافی",
    "برچسب هولوگرام",
    "hologram",
  ],
  authors: [{ name: "آذرهولوگرام" }],
  creator: "آذرهولوگرام",
  publisher: "آذرهولوگرام",
  icons: {
    icon: "/LOGO/cropped-com.chakavak.adv_512x512.png",
    apple: "/LOGO/cropped-com.chakavak.adv_512x512.png",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteUrl,
    siteName: "آذرهولوگرام",
    title: "آذرهولوگرام | تولید و چاپ هولوگرام در ایران",
    description:
      "شرکت آذرهولوگرام تولیدکننده انواع هولوگرام، لیبل هولوگرام و محصولات امنیتی با بالاترین سطح کیفیت در ایران.",
    images: [
      {
        url: "/LOGO/cropped-com.chakavak.adv_512x512.png",
        width: 512,
        height: 512,
        alt: "آذرهولوگرام",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آذرهولوگرام | تولید و چاپ هولوگرام در ایران",
    description:
      "شرکت آذرهولوگرام تولیدکننده انواع هولوگرام، لیبل هولوگرام و محصولات امنیتی در ایران.",
    images: ["/LOGO/cropped-com.chakavak.adv_512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your Google Search Console verification code here when you have it
    // google: "your-verification-code",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "آذرهولوگرام",
    alternateName: "خانه چاپ چکاوک",
    url: siteUrl,
    logo: `${siteUrl}/LOGO/cropped-com.chakavak.adv_512x512.png`,
    description:
      "شرکت آذرهولوگرام (خانه چاپ چکاوک) تولیدکننده انواع هولوگرام، لیبل هولوگرام و محصولات امنیتی با بالاترین سطح کیفیت و فناوری روز در ایران.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Persian",
    },
  };

  return (
    <html lang="fa" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${myFont.className} h-100`}>
        <StoreProvider>
          <AuthBootstrap />
          <LogVisit />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
