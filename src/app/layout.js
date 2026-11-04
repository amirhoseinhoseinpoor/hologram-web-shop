// app/layout.js
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/reset.css";
import "./Styles/globals.scss";

import StoreProvider from "./Store/storeProvider";
import LogVisit from "./Components/LogVisit";
import AuthBootstrap from "./Components/AuthBootstrap";
import JsonLd from "./Components/JsonLd";
import NavProvider from "./Components/NavProvider";
import { organizationLd, SITE_URL } from "./utils/seo";
import { fetchHeaderItems } from "./utils/serverApi";

const myFont = localFont({ src: "./Fonts/IRANSansXVF.woff2" });

const DEFAULT_TITLE = "تولید و چاپ هولوگرام و لیبل امنیتی در ایران | آذرهولوگرام";
const DEFAULT_DESCRIPTION =
  "آذرهولوگرام (خانه چاپ چکاوک) با خط کامل تولید در داخل کشور، انواع هولوگرام امنیتی، لیبل هولوگرام، برچسب پلمپ و اسکرچ را با طرح اختصاصی تولید می‌کند.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | آذرهولوگرام",
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "آذرهولوگرام" }],
  creator: "آذرهولوگرام",
  publisher: "آذرهولوگرام",
  icons: {
    icon: "/LOGO/azarhologram-favicon.png",
    apple: "/LOGO/azarhologram-favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "آذرهولوگرام",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/LOGO/azarhologram-icon.png",
        width: 512,
        height: 512,
        alt: "آذرهولوگرام",
      },
    ],
  },
  twitter: {
    card: "summary",
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
};

export default async function RootLayout({ children }) {
  const navItems = await fetchHeaderItems();

  return (
    <html lang="fa" dir="rtl">
      <head>
        <JsonLd data={organizationLd} />
      </head>
      <body className={`${myFont.className} h-100`}>
        <StoreProvider>
          <AuthBootstrap />
          <LogVisit />
          <NavProvider items={navItems}>{children}</NavProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
