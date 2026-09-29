import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
  metadataBase: new URL('https://finesa.id'),
  title: 'Finesa — Belajar Finansial Jadi Lebih Seru',
  description:
    'Platform edukasi finansial berbasis gamifikasi untuk membangun masa depan yang lebih bermakna.',
  openGraph: {
    title: 'Finesa — Belajar Finansial Jadi Lebih Seru',
    description: 'Platform edukasi finansial berbasis gamifikasi untuk generasi muda Indonesia.',
    url: 'https://finesa.id',
    siteName: 'Finesa',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finesa — Belajar Finansial Jadi Lebih Seru',
    description: 'Platform edukasi finansial berbasis gamifikasi untuk generasi muda Indonesia.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} antialiased`}>
        <a
          href="#konten"
          className="focus:bg-brand sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Lompat ke konten utama
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
