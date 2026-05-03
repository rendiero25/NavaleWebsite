import type { Metadata } from 'next'
import { LayananSections } from '@/components/layanan/LayananSections'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Layanan',
  description:
    'Layanan maintenance perkapalan CV Navale Mitratama: overhaul turbocharger, mesin 2-tak & 4-tak, pompa sea water, kalibrasi governor, inspection, dan instalasi kelistrikan kapal.',
}

export default function LayananPage() {
  return (
    <>
      <LayananSections />
      <Footer />
    </>
  )
}
