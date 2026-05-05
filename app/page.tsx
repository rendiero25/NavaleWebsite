import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteUrl } from '@/lib/siteConfig'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal'
import { AnimatedCounter } from '@/components/AnimatedCounter'
import { HomeHeroSection } from '@/components/HomeHeroSection'
import { getGalleryProjects } from '@/lib/getGalleryProjects'

export const metadata: Metadata = {
  title: 'Beranda',
  description:
    'CV Navale Mitratama — mitra maintenance perkapalan: overhaul turbocharger, mesin & pompa, governor, kelistrikan. Konsultasi cepat dari Bekasi & Jakarta.',
  keywords: [
    'maintenance kapal Indonesia',
    'overhaul turbocharger profesional',
    'Navale Mitratama Bekasi',
  ],
  openGraph: {
    title: 'CV Navale Mitratama — Maintenance Perkapalan',
    description:
      'Solusi overhaul & perawatan sistem kapal: turbocharger, mesin, pompa, governor, dan listrik — tim berpengalaman sejak 2018.',
    url: siteUrl,
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Navale Mitratama',
  },
}

const services = [
  {
    id: '01',
    title: 'Maintenance Perkapalan',
    desc: 'Perawatan menyeluruh untuk seluruh sistem kapal, memastikan operasional optimal dan aman.',
    icon: '⚓',
  },
  {
    id: '02',
    title: 'Overhaul Turbocharger',
    desc: 'Pembongkaran, pemeriksaan, perbaikan, dan perakitan kembali turbocharger kapal secara profesional.',
    icon: '⚙️',
  },
  {
    id: '03',
    title: 'Overhaul Mesin 2-Tak & 4-Tak',
    desc: 'Rekondisi mesin utama kapal jenis 2-tak dan 4-tak dengan standar kualitas tinggi.',
    icon: '🔧',
  },
  {
    id: '04',
    title: 'Overhaul Pompa & Pendingin',
    desc: 'Perbaikan pompa sea water cooling, attack pump oli, dan sistem pendingin kapal.',
    icon: '💧',
  },
  {
    id: '05',
    title: 'Kalibrasi Governor',
    desc: 'Kalibrasi dan penyetelan governor untuk performa mesin yang presisi dan stabil.',
    icon: '🎯',
  },
  {
    id: '06',
    title: 'Instalasi & Kelistrikan',
    desc: 'Instalasi, inspection, repair sistem kelistrikan kapal oleh tenaga ahli bersertifikat.',
    icon: '⚡',
  },
]

const stats = [
  { value: 8, suffix: '+', label: 'Tahun Pengalaman', sub: 'Berdiri sejak 2018' },
  { value: 6, suffix: '+', label: 'Tahun Mitra', sub: 'Bekerjasama dengan pemerintah' },
  { value: 2, suffix: '', label: 'Kantor', sub: 'Bekasi & Jakarta Utara' },
  { value: 100, suffix: '%', label: 'Komitmen', sub: 'Kepuasan pelanggan' },
]

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export default function HomePage() {
  const projects = getGalleryProjects()
  const allPhotos = projects.flatMap(p => p.photos)
  const homeGalleryPreview = pickRandom(allPhotos, 4).map(p => p.src)

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <HomeHeroSection />

        {/* ─── STATS STRIP ─── */}
        <section className="bg-navy-800">
          <div className="container-custom py-0">
            <StaggerReveal className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-10 px-6 border-white/20 ${i < stats.length - 1 ? 'lg:border-r' : ''} ${i >= 2 ? 'border-t lg:border-t-0' : ''}`}
                >
                  <div className="font-display font-extrabold text-5xl text-white leading-none mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-display font-semibold text-white/90 text-sm mb-0.5">{stat.label}</div>
                  <div className="font-mono text-[12px] text-white/60 uppercase tracking-wide">{stat.sub}</div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* ─── ABOUT PREVIEW ─── */}
        <section className="section-pad bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <div className="label-tag mb-4 font-bold">Tentang Perusahaan</div>
                <h2 className="font-display font-bold text-display text-navy-900 mb-6">
                  Dedikasi 8 Tahun Melayani Industri Maritim
                </h2>
                <p className="font-body text-navy-950 leading-relaxed mb-4">
                  CV Navale Mitratama berdiri pada 8 Januari 2018, berkomitmen menjadi partner maintenance perkapalan yang kokoh dan handal. Didirikan oleh Leonardo Ari Tua, kami telah dipercaya oleh berbagai pihak termasuk lembaga pemerintah selama lebih dari 6 tahun.
                </p>
                <p className="font-body text-navy-950 leading-relaxed mb-8">
                  Setiap proyek dikerjakan oleh tenaga profesional berpengalaman di bidang teknik mekanikal, elektrikal, dan maritim — dengan hasil optimal, harga kompetitif, dan penyelesaian tepat waktu.
                </p>
                <Link href="/tentang-kami" className="btn-outline-dark">
                  Selengkapnya
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative">
                  <div className="bg-navy-900 p-10 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-brand" />
                    <div className="label-tag-light mb-6">Visi & Misi</div>
                    <div className="mb-8">
                      <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Visi</div>
                      <p className="font-display font-medium text-white text-lg leading-snug">
                        Menjadi Partner Terbaik sebagai Perdagangan Nasional
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-8">
                      <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-2">Misi</div>
                      <p className="font-display font-medium text-white text-lg leading-snug">
                        Memberikan kepuasan pelanggan dengan hasil pekerjaan yang bermutu, harga kompetitif, dan penyelesaian tepat waktu.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 -z-10 w-full h-full bg-blue-muted" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── SERVICES PREVIEW ─── */}
        <section className="section-pad bg-neutral-50">
          <div className="container-custom">
            <ScrollReveal className="mb-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="label-tag mb-3 font-bold">Layanan Kami</div>
                  <h2 className="font-display font-bold text-display text-navy-900">
                    Solusi Lengkap<br />Maintenance Kapal
                  </h2>
                </div>
                <Link href="/layanan" className="btn-outline-dark shrink-0">
                  Semua Layanan →
                </Link>
              </div>
            </ScrollReveal>

            <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
              {services.map((svc) => (
                <div key={svc.id} className="service-card group bg-white">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-3xl">{svc.icon}</div>
                    <span className="font-mono text-xs text-navy-950">{svc.id}</span>
                  </div>
                  <h3 className="font-display font-bold text-navy-900 text-lg mb-3 group-hover:text-blue-brand transition-colors">
                    {svc.title}
                  </h3>
                  <p className="font-body text-navy-950 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="mt-6 w-8 h-0.5 bg-blue-brand transition-all duration-300 group-hover:w-16" />
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* ─── GALLERY TEASER ─── */}
        <section className="section-pad bg-navy-900">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="label-tag-light mb-4 font-bold">Galeri Pekerjaan</div>
                <h2 className="font-display font-bold text-display text-white mb-6">
                  Lihat Hasil Kerja Kami
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-8">
                  Dokumentasi sebelum dan sesudah pengerjaan maintenance, overhaul, dan instalasi.
                  Kualitas dan profesionalisme tercermin dari setiap hasil pekerjaan kami.
                </p>
                <Link href="/galeri" className="btn-outline">
                  Lihat Galeri
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.15}>
                <div className="grid grid-cols-2 gap-3">
                  {homeGalleryPreview.map((src) => (
                    <Link
                      key={src}
                      href="/galeri"
                      className="aspect-square relative overflow-hidden border border-white/10 bg-navy-800 group hover:border-blue-brand/50 transition-all duration-300"
                    >
                      <Image
                        src={src}
                        alt="Cuplikan dokumentasi galeri CV Navale Mitratama"
                        fill
                        sizes="(max-width: 1024px) 25vw, 180px"
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </Link>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── CONTACT CTA ─── */}
        <section className="section-pad bg-blue-brand relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
          <div className="container-custom relative z-10 text-center">
            <ScrollReveal>
              <div className="label-tag-light mb-4 font-bold">Mulai Sekarang</div>
              <h2 className="font-display font-extrabold text-display text-white mb-6">
                Siap Menjadi Partner<br />Maintenance Kapal Anda
              </h2>
              <p className="font-body text-white text-lg mb-10 max-w-xl mx-auto">
                Konsultasi gratis, respon cepat, solusi tepat. Hubungi kami sekarang untuk kebutuhan maintenance perkapalan Anda.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/6281219445330?text=Halo%20Navale%20Mitratama%2C%20saya%20ingin%20konsultasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                  WhatsApp Sekarang
                </a>
                <Link href="/kontak" className="btn-outline">
                  Form Kontak
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
