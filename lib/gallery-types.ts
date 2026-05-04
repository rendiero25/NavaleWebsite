export type GalleryStill = {
  id: string
  src: string
  phase: 'before' | 'after'
  /** Nama folder proyek (relatif terhadap before/ atau after/) */
  projectSlug: string
  category: string
  fileName: string
}

export type GalleryProjectPhoto = {
  id: string
  src: string
  phase: 'before' | 'after'
  fileName: string
}

export type GalleryProject = {
  slug: string
  title: string
  category: string
  photos: GalleryProjectPhoto[]
  videoSrcs: string[]
}
