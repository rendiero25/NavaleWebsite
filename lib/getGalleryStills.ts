import fs from 'node:fs'
import path from 'node:path'
import type { GalleryStill } from '@/lib/gallery-types'
import { galleryPublicUrl } from '@/lib/galleryPublicUrl'

const IMAGE_EXT = /\.(jpe?g|png|webp)$/i

function inferCategory(folderName: string): string {
  const s = folderName.toLowerCase()
  if (s.includes('turbo')) return 'Turbocharger'
  if (s.includes('pompa') || s.includes('pump')) return 'Pompa'
  if (s.includes('governor')) return 'Governor'
  if (s.includes('listrik') || s.includes('kelistrik')) return 'Kelistrikan'
  if (s.includes('mesin') || s.includes('engine') || s.includes('yanmar')) return 'Mesin'
  return 'Lainnya'
}

function collectImageFiles(dir: string): string[] {
  const out: string[] = []
  if (!fs.existsSync(dir)) return out
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.') || ent.name === '.gitkeep') continue
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) out.push(...collectImageFiles(full))
    else if (IMAGE_EXT.test(ent.name)) out.push(full)
  }
  return out
}

/**
 * Memindai `public/gallery/before` dan `public/gallery/after` — semua gambar ditampilkan di UI galeri.
 * Hanya di-call dari Server Component / route server.
 */
export function getGalleryStills(): GalleryStill[] {
  const publicDir = path.join(process.cwd(), 'public')
  const beforeRoot = path.join(publicDir, 'gallery', 'before')
  const afterRoot = path.join(publicDir, 'gallery', 'after')

  const stills: GalleryStill[] = []

  function pushFromRoot(root: string, phase: 'before' | 'after') {
    for (const abs of collectImageFiles(root)) {
      const relToPublic = path.relative(publicDir, abs)
      const parts = relToPublic.split(path.sep).filter(Boolean)
      const url = galleryPublicUrl(...parts)
      const inner = parts.slice(2, -1)
      const projectSlug = inner.length ? inner.join('/') : 'Umum'
      const fileName = parts[parts.length - 1] ?? ''
      stills.push({
        id: `${phase}:${url}`,
        src: url,
        phase,
        projectSlug,
        category: inferCategory(projectSlug),
        fileName,
      })
    }
  }

  pushFromRoot(beforeRoot, 'before')
  pushFromRoot(afterRoot, 'after')

  return stills.sort((a, b) => {
    const byProj = a.projectSlug.localeCompare(b.projectSlug, 'id')
    if (byProj !== 0) return byProj
    if (a.phase !== b.phase) return a.phase === 'before' ? -1 : 1
    return a.fileName.localeCompare(b.fileName, 'id', { numeric: true })
  })
}
