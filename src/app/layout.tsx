import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Bitcoin Strategy and Investment Solutions',
  description: 'Bitcoin Strategy and Investment Solutions',
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
