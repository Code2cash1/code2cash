import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import StructuredData from "@/components/seo/structured-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.code2cash.in'),
  title: {
    default: "Code2Cash - where technology meets excellence",
    template: "%s | Code2Cash"
  },
  description: "Code2Cash is a leading MSME-registered web development agency in India offering custom website design, mobile app development, and digital solutions. Get a free quote today!",
  keywords: [
    "web development agency India",
    "custom website design",
    "mobile app development",
    "MSME registered web company",
    "e-commerce solutions",
    "UI/UX design services",
    "digital marketing",
    "React Next.js development",
    "Code2Cash",
    "web development Bihar"
  ],
  authors: [{ name: "Code2Cash" }],
  creator: "Code2Cash",
  publisher: "Code2Cash",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/c2c.png',
    apple: '/c2c.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.code2cash.in',
    title: 'Code2Cash - Web Development Agency in India',
    description: 'Leading MSME-registered web development agency offering custom websites, mobile apps, and digital solutions. Transform your ideas into reality.',
    siteName: 'Code2Cash',
    images: [
      {
        url: '/logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Code2Cash - Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code2Cash - Web Development Agency in India',
    description: 'Leading MSME-registered web development agency offering custom websites, mobile apps, and digital solutions.',
    images: ['/logo-final.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.code2cash.in',
  },
  verification: {
    // Add your verification codes here after claiming
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
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
