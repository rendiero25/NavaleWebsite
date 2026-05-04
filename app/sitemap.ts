import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['', '/tentang-kami', '/layanan', '/galeri', '/kontak'] as const

  return routes.map(path => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }))
}
