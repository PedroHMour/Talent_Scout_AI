import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { UIProvider } from "../context/UIContext"; // Importe o Provider

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: "Talent Scout AI",
  description: "Intelligent platform for resume screening and candidate ranking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body className={inter.className}>
        <UIProvider> {/* Envolva tudo com o Provider */}
          <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
