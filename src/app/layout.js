// app/layout.js
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/reset.css";
import "./Styles/globals.scss";

import StoreProvider from "./Store/storeProvider";
import LogVisit from "./Components/LogVisit";
import JsonLd from "./Components/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "آذرهولوگرام",
  url: "https://azarhologram.ir",
  logo: "https://azarhologram.ir/LOGO/logo.png",
  description:
    "آذرهولوگرام پیشرو در تولید و چاپ هولوگرام‌های امنیتی، برچسب‌های هولوگرامی و محصولات ضد جعل در ایران.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Persian",
  },
};

const myFont = localFont({ src: "./Fonts/IRANSansXVF.ttf" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://azarhologram.ir";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "آذرهولوگرام | چاپ و تولید هولوگرام امنیتی",
    template: "%s | آذرهولوگرام",
  },
  description:
    "آذرهولوگرام پیشرو در تولید و چاپ هولوگرام‌های امنیتی، برچسب‌های هولوگرامی و محصولات ضد جعل. کیفیت بالا، تحویل سریع و قیمت مناسب.",
  keywords: [
    "هولوگرام",
    "هولوگرام امنیتی",
    "چاپ هولوگرام",
    "برچسب هولوگرام",
    "ضد جعل",
    "آذرهولوگرام",
  ],
  authors: [{ name: "آذرهولوگرام" }],
  creator: "آذرهولوگرام",
  publisher: "آذرهولوگرام",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "آذرهولوگرام",
    title: "آذرهولوگرام | چاپ و تولید هولوگرام امنیتی",
    description:
      "آذرهولوگرام پیشرو در تولید و چاپ هولوگرام‌های امنیتی، برچسب‌های هولوگرامی و محصولات ضد جعل.",
    images: [
      {
        url: "/LOGO/logo.png",
        width: 1200,
        height: 630,
        alt: "آذرهولوگرام",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "آذرهولوگرام | چاپ و تولید هولوگرام امنیتی",
    description:
      "آذرهولوگرام پیشرو در تولید و چاپ هولوگرام‌های امنیتی، برچسب‌های هولوگرامی و محصولات ضد جعل.",
    images: ["/LOGO/logo.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${myFont.className} h-100`}>
        <JsonLd data={organizationSchema} />
        <StoreProvider>
          <LogVisit />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
