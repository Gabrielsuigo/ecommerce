import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/authContexts";
import "./globals.css";
import { CartProvider } from "@/contexts/cartContext";



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
          <CartProvider>
    
          <html >
            <body>
              <Navbar/>
              <main className="container">{children}</main>
              <Footer/>
            </body>
          </html>
              </CartProvider>
        </AuthProvider>
      );
    }

          
