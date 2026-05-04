import type { Metadata } from 'next'
import { Source_Sans_3, DM_Mono } from 'next/font/google'
import { siteUrl } from '@/lib/siteConfig'
import './globals.css'

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['300', '400', '600'],
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CV Navale Mitratama — Maintenance Perkapalan & Overhaul Turbocharger',
    template: '%s | CV Navale Mitratama',
  },
  description:
    'Spesialis maintenance perkapalan & overhaul turbocharger, mesin 2/4-tak, pompa, governor, dan kelistrikan kapal. Tim berpengalaman sejak 2018 di Bekasi & Jakarta.',
  keywords: [
    'maintenance perkapalan',
    'overhaul turbocharger',
    'overhaul mesin kapal',
    'kalibrasi governor kapal',
    'overhaul pompa sea water',
    'instalasi listrik kapal',
    'CV Navale Mitratama',
    'Bekasi',
    'Jakarta Utara',
  ],
  authors: [{ name: 'CV Navale Mitratama' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'CV Navale Mitratama',
    title: 'CV Navale Mitratama — Maintenance Perkapalan Profesional',
    description:
      'Partner maintenance perkapalan: overhaul turbocharger, mesin, pompa, governor & kelistrikan. Respons cepat, standar industri, sejak 2018.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'CV Navale Mitratama',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV Navale Mitratama — Maintenance Perkapalan',
    description:
      'Overhaul turbocharger, mesin kapal, pompa & governor. Perusahaan maintenance maritim profesional di Indonesia.',
    images: ['/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${sourceSans.variable} ${dmMono.variable}`}>
      <body className="overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-blue-brand focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
        >
          Langsung ke konten utama
        </a>
        {children}
      </body>
    </html>
  )
}
