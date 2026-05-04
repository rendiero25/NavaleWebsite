import fs from 'node:fs'
import path from 'node:path'
import type { GalleryProject, GalleryProjectPhoto } from '@/lib/gallery-types'
import { galleryPublicUrl } from '@/lib/galleryPublicUrl'

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i
const VIDEO_EXT = /\.mp4$/i

function inferCategory(name: string): string {
  const s = name.toLowerCase()
  if (s.includes('turbo')) return 'Turbocharger'
  if (s.includes('pompa') || s.includes('pump')) return 'Pompa'
  if (s.includes('governor')) return 'Governor'
  if (s.includes('listrik') || s.includes('kelistrik')) return 'Kelistrikan'
  if (s.includes('mesin') || s.includes('engine') || s.includes('yanmar')) return 'Mesin'
  return 'Lainnya'
}

function readImages(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => IMAGE_EXT.test(f) && !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'id', { numeric: true }))
}

function readVideos(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && VIDEO_EXT.test(e.name) && !e.name.startsWith('.'))
    .map(e => e.name)
    .sort((a, b) => a.localeCompare(b, 'id', { numeric: true }))
}

/**
 * Scan public/gallery/ — setiap subfolder adalah satu proyek.
 * Struktur yang diharapkan: ProjectName/Before/ | After/ | Video/
 * Video juga bisa diletakkan langsung di root ProjectName/ (tanpa subfolder Video/).
 */
export function getGalleryProjects(): GalleryProject[] {
  const galleryRoot = path.join(process.cwd(), 'public', 'gallery')
  if (!fs.existsSync(galleryRoot)) return []

  const projectDirs = fs
    .readdirSync(galleryRoot, { withFileTypes: true })
    .filter(e => e.isDirectory() && !e.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name, 'id'))

  const projects: GalleryProject[] = []

  for (const dir of projectDirs) {
    const projectPath = path.join(galleryRoot, dir.name)
    const slug = dir.name
    const entries = fs.readdirSync(projectPath, { withFileTypes: true })

    const findSub = (name: string) => {
      const found = entries.find(
        e => e.isDirectory() && e.name.toLowerCase() === name.toLowerCase()
      )
      return found
        ? { absPath: path.join(projectPath, found.name), dirName: found.name }
        : null
    }

    const beforeSub = findSub('before')
    const afterSub = findSub('after')
    const videoSub = findSub('video')

    const photos: GalleryProjectPhoto[] = []

    if (beforeSub) {
      for (const f of readImages(beforeSub.absPath)) {
        photos.push({
          id: `${slug}:before:${f}`,
          src: galleryPublicUrl('gallery', slug, beforeSub.dirName, f),
          phase: 'before',
          fileName: f,
        })
      }
    }

    if (afterSub) {
      for (const f of readImages(afterSub.absPath)) {
        photos.push({
          id: `${slug}:after:${f}`,
          src: galleryPublicUrl('gallery', slug, afterSub.dirName, f),
          phase: 'after',
          fileName: f,
        })
      }
    }

    const videoSrcs: string[] = []

    if (videoSub) {
      for (const f of readVideos(videoSub.absPath)) {
        videoSrcs.push(galleryPublicUrl('gallery', slug, videoSub.dirName, f))
      }
    }

    // Video langsung di root folder proyek (tanpa subfolder Video/)
    for (const e of entries) {
      if (e.isFile() && VIDEO_EXT.test(e.name) && !e.name.startsWith('.')) {
        videoSrcs.push(galleryPublicUrl('gallery', slug, e.name))
      }
    }

    if (photos.length === 0 && videoSrcs.length === 0) continue

    projects.push({
      slug,
      title: slug,
      category: inferCategory(slug),
      photos,
      videoSrcs,
    })
  }

  return projects
}
