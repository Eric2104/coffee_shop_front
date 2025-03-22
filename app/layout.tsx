import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Ecommerce - CoffeeShop",
  description: "Sitio web para portafolio de Eric Soto",
};

const urbanist = Urbanist({ subsets: ['latin'] })

export default function RootLayout({children,}: Readonly<{children: React.ReactNode; }> ) {
  return (
    <html lang="en">
      <body className={`${urbanist.className} antialiased`} >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}