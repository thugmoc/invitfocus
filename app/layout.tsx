import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'INVITEFOCUS — Your Business Copilot',
  description: 'Manage your business with the clarity of a large enterprise. Accounting, legal services, strategic guidance and AI simulations unified.',
  viewport: 'width=device-width, initial-scale=1',
  metadataBase: new URL('https://invitfocus.vercel.app'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="bg-[#FAFAFA] text-[#0F172A]">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
