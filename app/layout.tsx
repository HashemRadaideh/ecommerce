import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import "./globals.css";
import Providers from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Simple ecommerce app for the software project course task",
};

const getTheme = () => {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("theme");

  if (storedTheme) return storedTheme as "dark" | "light";

  const newTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  localStorage.setItem("theme", newTheme);

  return newTheme;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={getTheme()} lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
