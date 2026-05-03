/**
 * Path URL aman untuk asset di /public/gallery (encode spasi, kurung, dll.).
 * Contoh: galleryPublicUrl('gallery', 'before', 'folder name', 'photo.jpg')
 */
export function galleryPublicUrl(...segments: string[]): string {
  return '/' + segments.map((s) => encodeURIComponent(s)).join('/')
}
