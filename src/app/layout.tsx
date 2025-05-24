import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Analyzing crowd psychology and market data for smarter Bitcoin investing',
  description: 'Analyzing crowd psychology and market data for smarter Bitcoin investing',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_50%_50%_at_50%_-20%,rgba(127,17,224,0.1),rgba(255,255,255,0))]"></div>
        {children}
      </body>
    </html>
  )
}
