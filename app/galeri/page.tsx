import type { Metadata } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { GaleriClient } from '@/components/GaleriClient'
import { getGalleryProjects } from '@/lib/getGalleryProjects'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Galeri',
  description:
    'Galeri dokumentasi proyek: foto sebelum & sesudah overhaul turbocharger, mesin, pompa, governor, dan video proses maintenance perkapalan.',
  keywords: [
    'galeri overhaul turbocharger',
    'dokumentasi maintenance kapal',
    'foto before after marine',
    'CV Navale Mitratama galeri',
  ],
  openGraph: {
    title: 'Galeri | CV Navale Mitratama',
    description:
      'Foto & video dokumentasi hasil kerja maintenance dan overhaul perkapalan — kualitas kerja nyata dari tim kami.',
    url: `${siteUrl}/galeri`,
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Navale Mitratama',
  },
}

export default function GaleriPage() {
  const projects = getGalleryProjects()
  return <GaleriClient projects={projects} />
}
