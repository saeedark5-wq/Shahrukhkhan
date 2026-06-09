import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Pyramid Star Real Estate Brokerage | Luxury Properties in Dubai",
  description:
    "Discover luxury properties in Dubai with Shahrukh Khan at Pyramid Star Real Estate Brokerage. Premium villas, apartments, and commercial spaces for sale and rent.",
  keywords: [
    "Dubai real estate",
    "luxury properties Dubai",
    "Shahrukh Khan realtor",
    "Pyramid Star Real Estate",
    "buy property Dubai",
    "rent villa Dubai",
  ],
  openGraph: {
    title: "Pyramid Star Real Estate Brokerage | Luxury Properties in Dubai",
    description:
      "Discover luxury properties in Dubai with Shahrukh Khan at Pyramid Star Real Estate Brokerage. Premium villas, apartments, and commercial spaces.",
    type: "website",
    locale: "en_US",
    siteName: "Pyramid Star Real Estate Brokerage",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#f5f5f5",
              border: "1px solid #d4a853",
            },
          }}
        />
      </body>
    </html>
  );
}
