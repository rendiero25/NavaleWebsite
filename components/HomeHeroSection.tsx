'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap-client'

export function HomeHeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroSubRef = useRef<HTMLParagraphElement>(null)
  const heroCTARef = useRef<HTMLDivElement>(null)
  const heroTagRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(heroTagRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
        .fromTo(
          heroTitleRef.current?.querySelectorAll('.hero-line') ?? [],
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          '-=0.2'
        )
        .fromTo(heroSubRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo(heroCTARef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
        .fromTo(scrollIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

      gsap.to(heroRef.current, {
        backgroundColor: '#2E86C1',
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-blue-brand flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      {/* Gradient overlays */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-white/5 to-transparent" />

      {/* Content */}
      <div className="container-custom relative z-10 pt-28 pb-20">
        <div className="">
          {/* Tag */}
          <div ref={heroTagRef} className="flex items-center gap-3 mb-10" style={{ opacity: 0 }}>
            <div className="w-8 h-px bg-blue-pale" />
            <span className="label-tag-light">Maintenance Perkapalan Profesional · Berdiri 2018</span>
          </div>

          {/* Main title */}
          <h1
            ref={heroTitleRef}
            className="font-display font-extrabold text-hero text-white leading-none mb-8"
            style={{ overflow: 'hidden' }}
          >
            <span className="hero-line block" style={{ opacity: 0 }}>PARTNER</span>
            <span className="hero-line block text-white/80" style={{ opacity: 0 }}>TERPERCAYA</span>
            <span className="hero-line block" style={{ opacity: 0 }}>PERKAPALAN.</span>
          </h1>

          {/* Sub */}
          <p
            ref={heroSubRef}
            className="font-body text-white/70 text-lg leading-relaxed mb-10"
            style={{ opacity: 0 }}
          >
            Spesialis overhaul turbocharger, mesin 2-tak & 4-tak, pompa laut, kalibrasi governor,
            dan instalasi kelistrikan kapal. Lebih dari 8 tahun pengalaman melayani industri maritim Indonesia.
          </p>

          {/* CTA */}
          <div ref={heroCTARef} className="flex flex-wrap gap-4" style={{ opacity: 0 }}>
            <a
              href="https://wa.me/6281219445330?text=Halo%20Navale%20Mitratama%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20maintenance%20perkapalan."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.031-1.385l-.36-.214-3.753.983.997-3.643-.234-.374A9.775 9.775 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
              </svg>
              Hubungi via WhatsApp
            </a>
            <Link href="/layanan" className="btn-outline group">
              Lihat Layanan
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0 }}>
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse-slow" />
      </div>
    </section>
  )
}
