import type { Metadata } from 'next'
import { Source_Sans_3, DM_Mono } from 'next/font/google'
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
  title: {
    default: 'CV Navale Mitratama — Maintenance Perkapalan & Overhaul Turbocharger',
    template: '%s | CV Navale Mitratama',
  },
  description:
    'CV Navale Mitratama adalah perusahaan spesialis maintenance perkapalan, overhaul turbocharger, mesin 2-tak & 4-tak, pompa, kalibrasi governor, dan instalasi listrik kapal. Berpengalaman 8 tahun, mitra pemerintah 6 tahun.',
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
    siteName: 'CV Navale Mitratama',
    title: 'CV Navale Mitratama — Maintenance Perkapalan Profesional',
    description:
      'Partner terpercaya maintenance perkapalan. Overhaul turbocharger, mesin 2-tak & 4-tak, pompa, kalibrasi governor. Berpengalaman sejak 2018.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: '/images/logo.jpeg',
    apple: '/images/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${sourceSans.variable} ${dmMono.variable}`}>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
