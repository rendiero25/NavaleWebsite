'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal'
import type { GalleryStill } from '@/lib/gallery-types'
import type { GalleryVideoItem } from '@/lib/galleryVideoItems'

const categories = ['Semua', 'Turbocharger', 'Mesin', 'Pompa', 'Governor', 'Kelistrikan', 'Lainnya']

interface GaleriClientProps {
  stills: GalleryStill[]
  videos: GalleryVideoItem[]
}

export function GaleriClient({ stills, videos }: GaleriClientProps) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const filteredStills =
    activeCategory === 'Semua' ? stills : stills.filter((s) => s.category === activeCategory)

  const filteredVideos =
    activeCategory === 'Semua' ? videos : videos.filter((v) => v.category === activeCategory)

  useEffect(() => {
    setViewerOpen(false)
  }, [activeCategory])

  const openViewer = useCallback((index: number) => {
    setViewerIndex(index)
    setViewerOpen(true)
  }, [])

  const goPrev = useCallback(() => {
    setViewerIndex((i) => Math.max(0, i - 1))
  }, [])

  const goNext = useCallback(() => {
    setViewerIndex((i) => Math.min(filteredStills.length - 1, i + 1))
  }, [filteredStills.length])

  const closeViewer = useCallback(() => setViewerOpen(false), [])

  useEffect(() => {
    if (!viewerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeViewer()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewerOpen, closeViewer, goPrev, goNext])

  useEffect(() => {
    if (!viewerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [viewerOpen])

  const current = filteredStills[viewerIndex]
  const hasPhotos = filteredStills.length > 0
  const hasVideos = filteredVideos.length > 0
  const showGlobalEmpty = stills.length === 0 && videos.length === 0

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy-950 pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="label-tag-light mb-4">Galeri</div>
              <h1 className="font-display font-extrabold text-display text-white mb-6 max-w-3xl">
                Dokumentasi Hasil Kerja
              </h1>
              <p className="font-body text-white/60 text-lg max-w-2xl leading-relaxed">
                Semua foto sebelum dan sesudah dari folder <span className="text-blue-pale font-mono text-sm">/public/gallery/</span>.
                Klik foto untuk membuka tampilan geser (slideshow).
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-pad bg-neutral-50">
          <div className="container-custom">
            <ScrollReveal className="mb-12">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 border
                      ${
                        activeCategory === cat
                          ? 'bg-blue-brand text-white border-blue-brand'
                          : 'bg-white text-neutral-600 border-neutral-200 hover:border-blue-brand/40 hover:text-blue-brand'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {showGlobalEmpty ? (
              <ScrollReveal>
                <div className="border-2 border-dashed border-neutral-300 bg-white p-16 text-center">
                  <div className="text-5xl mb-6">📷</div>
                  <h3 className="font-display font-bold text-navy-900 text-2xl mb-4">Belum Ada Konten</h3>
                  <p className="font-body text-neutral-500 text-sm max-w-lg mx-auto leading-relaxed">
                    Tambahkan gambar di{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand rounded font-mono text-xs">
                      /public/gallery/before/
                    </code>{' '}
                    dan{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand rounded font-mono text-xs">
                      /public/gallery/after/
                    </code>
                    — halaman ini akan memuat semua file secara otomatis.
                  </p>
                </div>
              </ScrollReveal>
            ) : (
              <>
                {/* ─── FOTO ─── */}
                <ScrollReveal className="mb-6">
                  <h2 className="font-display font-bold text-navy-900 text-xl mb-2">Foto sebelum & sesudah</h2>
                  <p className="font-body text-neutral-500 text-sm mb-8">
                    {hasPhotos
                      ? `${filteredStills.length} foto — klik untuk slideshow`
                      : 'Tidak ada foto pada filter ini.'}
                  </p>
                </ScrollReveal>

                {hasPhotos && (
                  <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-16">
                    {filteredStills.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => openViewer(idx)}
                        className="group relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand focus-visible:ring-offset-2"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.src}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent pt-12 pb-3 px-3">
                          <span
                            className={`inline-block font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 mb-1 ${
                              item.phase === 'before'
                                ? 'bg-amber-500/90 text-navy-950'
                                : 'bg-blue-brand/90 text-white'
                            }`}
                          >
                            {item.phase === 'before' ? 'Sebelum' : 'Sesudah'}
                          </span>
                          <p className="font-display text-white text-xs font-semibold line-clamp-2 leading-snug">
                            {item.projectSlug}
                          </p>
                        </div>
                      </button>
                    ))}
                  </StaggerReveal>
                )}

                {/* ─── VIDEO ─── */}
                {hasVideos && (
                  <>
                    <ScrollReveal className="mb-6">
                      <h2 className="font-display font-bold text-navy-900 text-xl mb-2">Video</h2>
                      <p className="font-body text-neutral-500 text-sm">{filteredVideos.length} video</p>
                    </ScrollReveal>
                    <StaggerReveal className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredVideos.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-neutral-200 overflow-hidden hover:border-blue-brand/40 transition-all duration-300"
                        >
                          <div className="aspect-video bg-neutral-100 overflow-hidden">
                            {item.youtubeId && (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                                title={item.title}
                                allowFullScreen
                              />
                            )}
                            {item.videoSrc && (
                              <video src={item.videoSrc} controls className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="p-5">
                            <span className="font-mono text-[10px] text-blue-brand uppercase tracking-widest border border-blue-brand/30 px-2 py-0.5">
                              {item.category}
                            </span>
                            <h3 className="font-display font-bold text-navy-900 text-base mt-2 mb-1">{item.title}</h3>
                            {item.description && (
                              <p className="font-body text-neutral-500 text-sm leading-relaxed">{item.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </StaggerReveal>
                  </>
                )}

                {!hasPhotos && !hasVideos && !showGlobalEmpty && (
                  <ScrollReveal>
                    <p className="text-center font-body text-neutral-500 py-12">
                      Tidak ada konten untuk kategori ini. Pilih &quot;Semua&quot; atau kategori lain.
                    </p>
                  </ScrollReveal>
                )}
              </>
            )}
          </div>
        </section>

        {/* ─── Slideshow / lightbox ─── */}
        {viewerOpen && current && filteredStills.length > 0 && (
          <div
            className="fixed inset-0 z-[60] flex flex-col bg-navy-950/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Slideshow galeri"
            onClick={closeViewer}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <div className="min-w-0 pr-4">
                <p className="font-mono text-[10px] text-blue-pale uppercase tracking-widest">
                  {current.phase === 'before' ? 'Sebelum' : 'Sesudah'} · {viewerIndex + 1} / {filteredStills.length}
                </p>
                <p className="font-display text-white text-sm font-semibold truncate">{current.projectSlug}</p>
              </div>
              <button
                type="button"
                className="shrink-0 text-white/80 hover:text-white text-3xl leading-none px-3 py-1"
                onClick={closeViewer}
                aria-label="Tutup"
              >
                ×
              </button>
            </div>

            <div
              className="flex-1 flex items-center justify-center px-4 md:px-12 py-4 relative touch-pan-y"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0].clientX
              }}
              onTouchEnd={(e) => {
                if (touchStartX.current === null) return
                const dx = e.changedTouches[0].clientX - touchStartX.current
                touchStartX.current = null
                if (dx > 60) goPrev()
                else if (dx < -60) goNext()
              }}
            >
              <button
                type="button"
                aria-label="Foto sebelumnya"
                disabled={viewerIndex <= 0}
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={`${current.phase === 'before' ? 'Sebelum' : 'Sesudah'} — ${current.projectSlug}`}
                className="max-h-[calc(100vh-180px)] max-w-full object-contain shadow-2xl select-none"
              />

              <button
                type="button"
                aria-label="Foto berikutnya"
                disabled={viewerIndex >= filteredStills.length - 1}
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="shrink-0 border-t border-white/10 px-4 py-3 overflow-x-auto">
              <div className="flex gap-2 justify-center min-h-[44px] items-center">
                {filteredStills.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setViewerIndex(i)
                    }}
                    className={`shrink-0 w-2.5 h-2.5 rounded-full transition-colors ${
                      i === viewerIndex ? 'bg-blue-pale' : 'bg-white/25 hover:bg-white/45'
                    }`}
                    aria-label={`Lihat foto ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-center font-mono text-[10px] text-white/40 mt-2">
                ← → keyboard · geser di layar sentuh
              </p>
            </div>
          </div>
        )}

        <section className="py-20 bg-navy-900">
          <div className="container-custom text-center">
            <ScrollReveal>
              <div className="label-tag-light mb-4">Ingin Tahu Lebih?</div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">
                Diskusikan Kebutuhan Maintenance Kapal Anda
              </h2>
              <a
                href="https://wa.me/6281219445330?text=Halo%20Navale%20Mitratama%2C%20saya%20tertarik%20dengan%20layanan%20maintenance%20perkapalan."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
                Hubungi via WhatsApp
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
