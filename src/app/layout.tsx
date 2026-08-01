import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PremiumSpinner } from "@/components/PremiumSpinner";

export const metadata: Metadata = {
  title: "PizzaDash — Gourmet Wood-Fired Pizza Delivery",
  description: "Handcrafted artisan sourdough pizzas made with imported Italian ingredients, delivered piping hot in 15 minutes.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FFFDF9] text-[#1F2937]">
        <PremiumSpinner durationMs={3500} />
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
