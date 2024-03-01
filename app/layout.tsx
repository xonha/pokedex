import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Toaster } from "sonner";
import { Recoil } from "./components/Recoil";
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
      <body>
        <Recoil>
          <Toaster richColors />
          <main className={ubuntu.className + " overflow-hidden"}>
            {children}
          </main>
        </Recoil>
      </body>
    </html>
  );
}
