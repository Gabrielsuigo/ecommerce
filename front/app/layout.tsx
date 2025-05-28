import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "webpt21b",
  description: "Henry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html>
        <body>
          <CartProvider>
            <Navbar />
            <main className="container">{children}</main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
