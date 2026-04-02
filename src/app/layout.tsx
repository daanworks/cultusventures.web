import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import StoreProvider from '@/store/provider'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Smart Money Management',
  description: 'Smart Money Management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">
        <StoreProvider>{children}</StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
