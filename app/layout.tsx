import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Numen',
  description: 'Personal Finance Tracker',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-[#0a0a0a] text-white min-h-screen font-sans ${GeistSans.variable} ${GeistMono.variable}`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
