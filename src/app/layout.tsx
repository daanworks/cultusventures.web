import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import StoreProvider from '@/store/provider'
import Header from '@/components/Header'

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
      <body>
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  )
}
