import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Code2Cash - Web Solutions Provider",
  description: "Transform your digital vision into reality with our comprehensive web solutions. We provide web development, UI/UX design, mobile apps, and e-commerce solutions.",
  keywords: ["web development", "UI/UX design", "mobile apps", "e-commerce", "digital solutions"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
