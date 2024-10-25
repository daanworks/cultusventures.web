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
      <body className='flex flex-col min-h-screen overflow-x-hidden'>
        <Header />
        <main className="flex flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
