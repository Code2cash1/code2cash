import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/ui/smooth-scroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code2Cash - Where Technology Meets Excellence",
  description: "Transform your digital vision into reality with our comprehensive web solutions. We provide web development, UI/UX design, mobile apps, and e-commerce solutions.",
  keywords: ["web development", "UI/UX design", "mobile apps", "e-commerce", "digital solutions"],
  icons: {
    icon: [
      { url: '/logo-final.png', sizes: 'any' },
      { url: '/logo-nobg.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/logo-final.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
