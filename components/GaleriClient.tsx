'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { GalleryProject, GalleryProjectPhoto } from '@/lib/gallery-types'

const categories = ['Semua', 'Turbocharger', 'Mesin', 'Pompa', 'Governor', 'Kelistrikan', 'Lainnya']

interface GaleriClientProps {
  projects: GalleryProject[]
}

export function GaleriClient({ projects }: GaleriClientProps) {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  const filteredProjects =
    activeCategory === 'Semua'
      ? projects
      : projects.filter(p => p.category === activeCategory)

  const allPhotos: GalleryProjectPhoto[] = filteredProjects.flatMap(p => p.photos)

  useEffect(() => {
    setViewerOpen(false)
  }, [activeCategory])

  const openViewer = useCallback((index: number) => {
    lastFocusedRef.current = document.activeElement as HTMLElement
    setViewerIndex(index)
    setViewerOpen(true)
  }, [])

  const goPrev = useCallback(() => setViewerIndex(i => Math.max(0, i - 1)), [])
  const goNext = useCallback(
    () => setViewerIndex(i => Math.min(allPhotos.length - 1, i + 1)),
    [allPhotos.length]
  )
  const closeViewer = useCallback(() => {
    setViewerOpen(false)
    lastFocusedRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!viewerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { closeViewer(); return }
      if (e.key === 'ArrowLeft') { goPrev(); return }
      if (e.key === 'ArrowRight') { goNext(); return }
      if (e.key === 'Tab') {
        const dialog = document.getElementById('gallery-lightbox')
        if (!dialog) return
        const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        ))
        if (focusable.length < 2) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [viewerOpen, closeViewer, goPrev, goNext])

  useEffect(() => {
    if (viewerOpen) requestAnimationFrame(() => closeBtnRef.current?.focus())
  }, [viewerOpen])

  useEffect(() => {
    if (!viewerOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [viewerOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? goNext() : goPrev()
    touchStartX.current = null
  }

  const current = allPhotos[viewerIndex]

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ─── PAGE HEADER ─── */}
        <section className="bg-neutral-100 pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-50" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="label-tag mb-4 font-bold">Galeri</div>
              <h1 className="font-display font-extrabold text-display text-navy-900 mb-6 max-w-3xl">
                Dokumentasi Hasil Kerja
              </h1>
              <p className="font-body text-navy-950 text-lg max-w-2xl leading-relaxed">
                Dokumentasi foto dan video per proyek — foto sebelum &amp; sesudah, dan rekaman proses pengerjaan.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── CONTENT ─── */}
        <section className="section-pad bg-neutral-50">
          <div className="container-custom">

            {/* Category filter */}
            <ScrollReveal className="mb-12">
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-200 border ${
                      activeCategory === cat
                        ? 'bg-blue-brand text-white border-blue-brand'
                        : 'bg-white text-navy-950 border-neutral-200 hover:border-blue-brand/40 hover:text-blue-brand'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Empty: no projects at all */}
            {projects.length === 0 ? (
              <ScrollReveal>
                <div className="border-2 border-dashed border-neutral-300 bg-white p-16 text-center">
                  <div className="text-5xl mb-6">📷</div>
                  <h3 className="font-display font-bold text-navy-900 text-2xl mb-4">Belum Ada Konten</h3>
                  <p className="font-body text-neutral-500 text-sm max-w-lg mx-auto leading-relaxed">
                    Tambahkan folder proyek di{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand font-mono text-xs">
                      /public/gallery/NamaProyek/
                    </code>{' '}
                    dengan subfolder{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand font-mono text-xs">Before/</code>,{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand font-mono text-xs">After/</code>, dan{' '}
                    <code className="bg-neutral-100 px-2 py-0.5 text-blue-brand font-mono text-xs">Video/</code>.
                  </p>
                </div>
              </ScrollReveal>

            ) : filteredProjects.length === 0 ? (
              <ScrollReveal>
                <p className="font-body text-neutral-500 text-center py-16">
                  Tidak ada proyek pada kategori ini.
                </p>
              </ScrollReveal>

            ) : (
              <div className="space-y-10">
                {filteredProjects.map(project => {
                  const beforePhotos = project.photos.filter(p => p.phase === 'before')
                  const afterPhotos = project.photos.filter(p => p.phase === 'after')
                  const hasBoth = beforePhotos.length > 0 && afterPhotos.length > 0

                  return (
                    <ScrollReveal key={project.slug}>
                      <div className="bg-white border border-neutral-200">

                        {/* Project header */}
                        <div className="border-b border-neutral-200 px-8 py-5 flex items-start justify-between gap-4">
                          <h2 className="font-display font-bold text-navy-900 text-lg leading-snug capitalize">
                            {project.title}
                          </h2>
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-blue-brand border border-blue-brand/30 px-3 py-1">
                            {project.category}
                          </span>
                        </div>

                        <div className="p-8 space-y-8">

                          {/* Photos: Before | After */}
                          {project.photos.length > 0 && (
                            <div className={`grid gap-8 ${hasBoth ? 'md:grid-cols-2' : ''}`}>
                              {beforePhotos.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="font-mono text-[14px] uppercase tracking-widest bg-amber-100 text-amber-700 px-2 py-0.5">
                                      Sebelum
                                    </span>
                                    <span className="font-mono text-[10px] text-navy-950">
                                      {beforePhotos.length} foto
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {beforePhotos.map(photo => (
                                      <button
                                        key={photo.id}
                                        type="button"
                                        onClick={() => openViewer(allPhotos.indexOf(photo))}
                                        className="group relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand focus-visible:ring-offset-2"
                                      >
                                        <Image
                                          src={photo.src}
                                          alt={`${project.title} — sebelum: ${photo.fileName}`}
                                          fill
                                          sizes="(max-width: 640px) 50vw, 33vw"
                                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {afterPhotos.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="font-mono text-[14px] uppercase tracking-widest bg-blue-brand/10 text-blue-brand px-2 py-0.5">
                                      Sesudah
                                    </span>
                                    <span className="font-mono text-[10px] text-navy-950">
                                      {afterPhotos.length} foto
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {afterPhotos.map(photo => (
                                      <button
                                        key={photo.id}
                                        type="button"
                                        onClick={() => openViewer(allPhotos.indexOf(photo))}
                                        className="group relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-brand focus-visible:ring-offset-2"
                                      >
                                        <Image
                                          src={photo.src}
                                          alt={`${project.title} — sesudah: ${photo.fileName}`}
                                          fill
                                          sizes="(max-width: 640px) 50vw, 33vw"
                                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Videos */}
                          {project.videoSrcs.length > 0 && (
                            <div>
                              <div className="flex items-center gap-2 mb-3">
                                <span className="font-mono text-[14px] uppercase tracking-widest bg-navy-900/10 text-navy-900 px-2 py-0.5">
                                  Video
                                </span>
                                <span className="font-mono text-[10px] text-navy-950">
                                  {project.videoSrcs.length} video
                                </span>
                              </div>
                              <div className={`grid gap-4 ${project.videoSrcs.length === 1 ? 'max-w-xl' : 'sm:grid-cols-2'}`}>
                                {project.videoSrcs.map(src => (
                                  <video
                                    key={src}
                                    src={src}
                                    controls
                                    preload="metadata"
                                    className="w-full border border-neutral-200 bg-navy-950"
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </ScrollReveal>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ─── LIGHTBOX ─── */}
      {viewerOpen && current && (
        <div
          id="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Tampilan foto proyek"
          className="fixed inset-0 z-[60] flex flex-col bg-navy-950/95 backdrop-blur-sm"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 ${
                current.phase === 'before'
                  ? 'bg-amber-500/90 text-navy-950'
                  : 'bg-blue-brand/90 text-white'
              }`}>
                {current.phase === 'before' ? 'Sebelum' : 'Sesudah'}
              </span>
              <span className="font-mono text-xs text-white/40">
                {viewerIndex + 1} / {allPhotos.length}
              </span>
            </div>
            <button
              ref={closeBtnRef}
              onClick={closeViewer}
              className="w-9 h-9 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Tutup"
            >
              ✕
            </button>
          </div>

          {/* Main image */}
          <div className="flex-1 flex items-center justify-center px-16 py-6 min-h-0 relative w-full">
            <button
              onClick={goPrev}
              disabled={viewerIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30 z-10"
              aria-label="Sebelumnya"
            >
              ←
            </button>

            <div className="relative mx-auto w-full max-w-[1200px] h-[min(85vh,900px)]">
              <Image
                src={current.src}
                alt={current.fileName}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <button
              onClick={goNext}
              disabled={viewerIndex === allPhotos.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors disabled:opacity-30 z-10"
              aria-label="Berikutnya"
            >
              →
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 border-t border-white/10 px-4 py-3 overflow-x-auto">
            <div className="flex gap-2 w-max mx-auto">
              {allPhotos.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setViewerIndex(idx)}
                  className={`relative w-14 h-14 shrink-0 overflow-hidden border-2 transition-all ${
                    idx === viewerIndex
                      ? 'border-blue-brand opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-75'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={`Miniatur ${idx + 1}: ${photo.fileName}`}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
