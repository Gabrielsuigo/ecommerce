import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/authContexts";
import "./globals.css";
import { CartProvider } from "@/contexts/cartContext";

const primeryFond = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--primary-font",
});
const secondaryFond = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--secondary-font",
});

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
        <body
          className={`${primeryFond.variable} ${secondaryFond.variable} antialiased`}
          >
          <Navbar/>
          <main className="container">{children}</main>
          <Footer/>
        </body>
      </html>
          </CartProvider>
    </AuthProvider>
  );
}
