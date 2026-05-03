import type { Metadata } from 'next'
import { GaleriClient } from '@/components/GaleriClient'
import { GALLERY_VIDEO_ITEMS } from '@/lib/galleryVideoItems'
import { getGalleryStills } from '@/lib/getGalleryStills'

/** Baca ulang folder galeri setiap request agar foto baru di `public/` langsung tampil tanpa rebuild. */
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Galeri',
  description:
    'Galeri dokumentasi CV Navale Mitratama — foto sebelum & sesudah maintenance dan overhaul perkapalan, serta video proses kerja.',
}

export default function GaleriPage() {
  const stills = getGalleryStills()
  return <GaleriClient stills={stills} videos={GALLERY_VIDEO_ITEMS} />
}
