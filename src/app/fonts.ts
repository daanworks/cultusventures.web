import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google'

export const ibmSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm-sans',
  display: 'swap',
})

export const ibmSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-serif',
  display: 'swap',
})

export const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-mono',
  display: 'swap',
})
