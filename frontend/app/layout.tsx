import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import StructuredData from "@/components/seo/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code2Cash — Where technology meets excellence",
  description:
    "Code2Cash is a digital service company providing web development, app development, SEO, and custom software solutions.",
  keywords: [
    "web development",
    "app development",
    "digital agency",
    "software development",
    "Code2Cash",
  ],
  openGraph: {
    title: "Code2Cash — Web Development & Digital Solutions",
    description:
      "We build high-quality websites, apps, and software with modern technologies.",
    url: "https://code2cash.in",
    siteName: "Code2Cash",
    images: [
      {
        url: "https://www.code2cash.in/logo-final.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Code2Cash — Web Development & Digital Solutions",
    description: "We build high-quality websites, apps, and software with modern technologies.",
    images: ["https://www.code2cash.in/logo-final.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
