import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "300"] });

export const metadata: Metadata = {
  title: "Pokédex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className + " overflow-hidden"}>{children}</body>
    </html>
  );
}
