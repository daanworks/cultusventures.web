import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cultus Ventures | Bitcoin Strategy Platform',
  description: 'Bitcoin Strategy Platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden">{children}</body>
    </html>
  )
}
