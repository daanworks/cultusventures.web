import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Independent research on the psychology behind people and markets',
  description: 'Independent research on the psychology behind people and markets',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <div className="absolute inset-0 z-[-2] h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        {children}
      </body>
    </html>
  )
}
