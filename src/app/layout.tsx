import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Investment Research Project',
  description: 'Investment Research Project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
