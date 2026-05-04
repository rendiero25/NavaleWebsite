'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap-client'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/kontak', label: 'Kontak' },
]

const waNavbarHref =
  'https://wa.me/6281219445330?text=' +
  encodeURIComponent(
    'Halo CV Navale Mitratama, saya ingin bertanya mengenai layanan maintenance perkapalan.'
  )

export function Navbar() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Scroll behavior: shrink + bg
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP entrance
  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [menuOpen])

  const isHome = pathname === '/'

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white backdrop-blur-md py-3 shadow-lg'
            : isHome
            ? 'bg-white py-6'
            : 'bg-white py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-45 shrink-0 overflow-hidden transition-opacity duration-300 group-hover:opacity-90">
              <Image
                src="/images/logo.jpeg"
                alt="CV Navale Mitratama"
                width={45}
                height={45}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-[14px] font-bold transition-colors duration-200 hover-underline
                  ${pathname === link.href ? 'text-blue-brand' : 'text-navy-900 hover:text-navy-900'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={waNavbarHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-3 px-6"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.031-1.385l-.36-.214-3.753.983.997-3.643-.234-.374A9.775 9.775 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
              </svg>
              Hubungi Kami
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 bg-navy-900 transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`block h-0.5 bg-navy-900 transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-0.5 bg-navy-900 transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 bg-navy-950 flex flex-col justify-center px-8"
        >
          <div className="mb-16">
            <div className="label-tag-light mb-8">Navigation</div>
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block font-display text-4xl font-bold py-3 border-b border-white/10 transition-colors hover:text-blue-pale
                  ${pathname === link.href ? 'text-blue-pale' : 'text-white'}`}
              >
                <span className="font-mono text-sm text-navy-950 mr-4">0{i + 1}</span>
                {link.label}
              </Link>
            ))}
          </div>
          <a
            href={waNavbarHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp self-start"
            onClick={() => setMenuOpen(false)}
          >
            Hubungi via WhatsApp
          </a>
        </div>
      )}
    </>
  )
}
