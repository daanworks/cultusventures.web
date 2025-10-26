import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Bitcoin Research & Investment',
  description: 'Bitcoin Research & Investment',
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
