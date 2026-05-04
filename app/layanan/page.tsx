import type { Metadata } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { LayananSections } from '@/components/layanan/LayananSections'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Layanan',
  description:
    'Daftar layanan maintenance perkapalan: overhaul turbocharger & mesin, pompa sea water, kalibrasi governor, inspection, serta instalasi kelistrikan kapal profesional.',
  keywords: [
    'overhaul turbocharger kapal',
    'maintenance mesin 2 tak kapal',
    'kalibrasi governor marine',
    'overhaul pompa sea water',
    'instalasi listrik kapal',
  ],
  openGraph: {
    title: 'Layanan | CV Navale Mitratama',
    description:
      'Overhaul turbocharger, mesin, pompa, governor & kelistrikan — solusi maintenance maritim untuk operasional kapal Anda.',
    url: `${siteUrl}/layanan`,
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Navale Mitratama',
  },
}

export default function LayananPage() {
  return (
    <>
      <LayananSections />
      <Footer />
    </>
  )
}
