import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cultus Ventures",
  description: "Lorem ipsum dolor simet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        <div className='min-h-screen flex flex-col'>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
