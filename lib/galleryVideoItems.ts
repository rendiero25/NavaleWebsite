import { galleryPublicUrl } from '@/lib/galleryPublicUrl'

export type GalleryVideoItem = {
  id: string
  title: string
  category: string
  youtubeId?: string
  videoSrc?: string
  description?: string
}

/** Video / embed — tetap didefinisikan manual (bukan scan folder). */
export const GALLERY_VIDEO_ITEMS: GalleryVideoItem[] = [
  {
    id: 'v1',
    title: 'Video — Overhaul Turbocharger VTR500 MT',
    category: 'Turbocharger',
    videoSrc: galleryPublicUrl(
      'gallery',
      'videos',
      'Video - OverhaulTurbocharger-VTR500MT-Sultan Mahmud ',
      'VIDEO-2026-05-01-18-46-18.mp4'
    ),
    description: 'Cuplikan dokumentasi pekerjaan overhaul turbocharger.',
  },
  {
    id: 'v2',
    title: 'Video — Overhaul Mesin Terbakar KM Abusamah',
    category: 'Mesin',
    videoSrc: galleryPublicUrl(
      'gallery',
      'videos',
      'Video - OverhaulEngineYangTerbakar-KMAbusamah',
      'VIDEO-2026-05-01-18-27-22.mp4'
    ),
    description: 'Proses penanganan dan overhaul mesin.',
  },
  {
    id: 'v3',
    title: 'Video — General Overhaul Yanmar S185L-ST',
    category: 'Mesin',
    videoSrc: galleryPublicUrl(
      'gallery',
      'videos',
      'Video - GeneralOverhaulEngine-YanmarS185LS-T-KM.ABUSAMAH',
      'VIDEO-2026-05-01-18-08-01.mp4'
    ),
    description: 'Dokumentasi general overhaul mesin Yanmar.',
  },
  {
    id: 'v4',
    title: 'Video — Proses Balancing Rotor Shaft',
    category: 'Lainnya',
    videoSrc: galleryPublicUrl('gallery', 'ProsesBalancing-RotorShaft501', 'VIDEO-2026-05-01-19-23-30.mp4'),
    description: 'Proses balancing rotor shaft.',
  },
]
