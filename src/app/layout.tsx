import type { Metadata } from "next";
import { Encode_Sans_Semi_Expanded } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";

const encodeSans = Encode_Sans_Semi_Expanded({
  variable: "--font-encode-sans-semi-expanded",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clicksign",
  description: "Frontend challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${encodeSans.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <header className="w-full z-50">
            <Navbar />
          </header>

          <main className="flex flex-col gap-[22px] py-[60px] px-[42px] flex-1 z-0">
            {children}
          </main>
        </div>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
