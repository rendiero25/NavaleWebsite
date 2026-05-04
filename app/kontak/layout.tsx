import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteUrl } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    'Hubungi CV Navale Mitratama untuk konsultasi maintenance perkapalan, overhaul turbocharger, dan layanan mesin kapal. Kantor Bekasi & Jakarta, WhatsApp & formulir kontak.',
  keywords: [
    'kontak Navale Mitratama',
    'maintenance kapal Bekasi',
    'konsultasi overhaul turbocharger',
    'CV Navale Mitratama WhatsApp',
  ],
  openGraph: {
    title: 'Kontak | CV Navale Mitratama',
    description:
      'Konsultasi maintenance perkapalan, overhaul turbocharger, dan layanan mesin kapal. Hubungi tim kami di Bekasi atau Jakarta.',
    url: `${siteUrl}/kontak`,
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Navale Mitratama',
  },
}

export default function KontakLayout({ children }: { children: ReactNode }) {
  return children
}
