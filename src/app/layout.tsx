import type { Metadata } from "next";
import "./globals.css";

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
      <body>
        {children}
      </body>
    </html>
  );
}
