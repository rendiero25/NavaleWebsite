'use client'

import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { ScrollReveal } from '@/components/ScrollReveal'

const services = [
  {
    id: '01',
    title: 'Maintenance Perkapalan',
    headline: 'Perawatan menyeluruh untuk semua sistem kapal',
    desc: 'Layanan maintenance terpadu mencakup inspeksi rutin, preventive maintenance, dan corrective maintenance untuk semua jenis dan ukuran kapal. Kami memastikan kapal Anda beroperasi pada kondisi optimal, aman, dan efisien.',
    features: [
      'Inspeksi sistem mesin secara menyeluruh',
      'Preventive & predictive maintenance',
      'Penggantian komponen aus',
      'Laporan kondisi kapal terperinci',
      'Rekomendasi perbaikan berkelanjutan',
    ],
    badge: 'Layanan Utama',
  },
  {
    id: '02',
    title: 'Overhaul Turbocharger',
    headline: 'Rekondisi turbocharger kapal secara profesional',
    desc: 'Proses overhaul turbocharger dilakukan secara lengkap meliputi pembongkaran total, pemeriksaan komponen, penggantian bagian yang rusak, balancing, dan perakitan kembali. Tersedia untuk berbagai merek dan tipe turbocharger kapal.',
    features: [
      'Disassembly & inspeksi komponen',
      'Cleaning & reconditioning',
      'Penggantian bearing & seal',
      'Dynamic balancing rotor',
      'Testing & commissioning',
    ],
    badge: 'Spesialis',
  },
  {
    id: '03',
    title: 'Overhaul Mesin 2-Tak & 4-Tak',
    headline: 'Rekondisi mesin utama kapal',
    desc: 'Overhaul menyeluruh mesin diesel kapal 2-tak dan 4-tak. Dikerjakan oleh teknisi berpengalaman dengan peralatan khusus untuk memastikan mesin kembali pada performa optimal setelah proses rekondisi.',
    features: [
      'Pembongkaran & pemeriksaan mesin total',
      'Grinding & lapping katup',
      'Overhaul pompa injeksi bahan bakar',
      'Penggantian ring piston & liner',
      'Setting & tuning mesin',
    ],
    badge: 'Layanan Utama',
  },
  {
    id: '04',
    title: 'Overhaul Pompa & Sistem Pendingin',
    headline: 'Perbaikan pompa sea water cooling dan attack pump oli',
    desc: 'Overhaul dan perbaikan berbagai jenis pompa kapal termasuk sea water cooling pump, attack pump oli, bilge pump, dan komponen sistem pendingin lainnya. Kami menangani semua merek dan kapasitas pompa.',
    features: [
      'Overhaul pompa sea water cooling',
      'Overhaul attack pump oli',
      'Penggantian mechanical seal & impeller',
      'Flushing sistem pendingin',
      'Pengujian kebocoran & tekanan',
    ],
    badge: 'Teknikal',
  },
  {
    id: '05',
    title: 'Kalibrasi Governor',
    headline: 'Kalibrasi presisi untuk performa mesin optimal',
    desc: 'Kalibrasi dan penyetelan governor mesin kapal untuk mengoptimalkan respons dan stabilitas putaran mesin. Proses dilakukan dengan alat ukur presisi oleh teknisi bersertifikat.',
    features: [
      'Kalibrasi governor mekanis & elektronik',
      'Setting speed droop & isochronous',
      'Testing respons governor',
      'Dokumentasi hasil kalibrasi',
      'Rekomendasi interval kalibrasi berikutnya',
    ],
    badge: 'Presisi',
  },
  {
    id: '06',
    title: 'Inspection & Repair',
    headline: 'Inspeksi, diagnosa, dan perbaikan komprehensif',
    desc: 'Layanan inspeksi menyeluruh untuk mengidentifikasi kerusakan dan keausan sebelum menjadi masalah serius. Kami menyediakan laporan inspeksi detail dan rekomendasi perbaikan yang komprehensif.',
    features: [
      'Inspeksi visual & pengukuran',
      'Diagnosa kerusakan komponen',
      'Repair & reconditioning on-site',
      'Laporan inspeksi lengkap',
      'Follow-up monitoring',
    ],
    badge: 'Diagnostik',
  },
  {
    id: '07',
    title: 'Instalasi & Pekerjaan Kelistrikan',
    headline: 'Instalasi dan perbaikan sistem kelistrikan kapal',
    desc: 'Layanan instalasi, perbaikan, dan pemeliharaan sistem kelistrikan kapal. Mulai dari panel distribusi, sistem penerangan, motor elektrik, hingga sistem kontrol. Dikerjakan oleh tenaga ahli kelistrikan bersertifikat.',
    features: [
      'Instalasi panel & distribusi listrik',
      'Perbaikan motor listrik',
      'Instalasi sistem penerangan',
      'Troubleshooting kelistrikan',
      'Inspeksi keselamatan sistem listrik',
    ],
    badge: 'Kelistrikan',
  },
]

export function LayananSections() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ─── PAGE HEADER ─── */}
        <section className="bg-neutral-100 pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="label-tag mb-4 font-bold">Layanan</div>
              <h1 className="font-display font-extrabold text-display text-navy-900 mb-6 max-w-3xl">
                Solusi Lengkap Maintenance & Overhaul Kapal
              </h1>
              <p className="font-body text-navy-950 text-lg max-w-2xl leading-relaxed">
                Tujuh layanan unggulan yang dirancang untuk memastikan kapal Anda beroperasi dengan aman, efisien, dan terpercaya.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── SERVICE LIST ─── */}
        <section className="section-pad bg-blue-brand">
          <div className="container-custom space-y-0">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.id} delay={0.05 * (i % 3)}>
                <div className={`grid lg:grid-cols-5 gap-8 py-16 border-b border-white/15 ${i === 0 ? 'border-t' : ''}`}>
                  <div className="lg:col-span-1">
                    <span className="font-mono text-6xl font-bold text-white/25 leading-none">{svc.id}</span>
                    <div className="mt-3">
                      <span className="inline-block font-mono font-medium text-[13px] text-white uppercase tracking-widest border border-white/30 px-2 py-0.5">
                        {svc.badge}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h2 className="font-display font-bold text-white text-2xl mb-2">{svc.title}</h2>
                    <p className="font-mono text-xs text-blue-pale uppercase tracking-wide mb-4">{svc.headline}</p>
                    <p className="font-body text-white/75 leading-relaxed text-sm">{svc.desc}</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="font-mono font-medium text-xs text-white/50 uppercase tracking-widest mb-4">Cakupan Layanan</div>
                    <ul className="space-y-2">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm font-body text-white/80">
                          <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-white/15 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="section-pad bg-navy-900">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <div className="label-tag-light mb-4">Konsultasi Gratis</div>
                <h2 className="font-display font-bold text-display text-white mb-6">
                  Butuh Layanan Spesifik?
                </h2>
                <p className="font-body text-white/60 leading-relaxed mb-8">
                  Tim ahli kami siap membantu menentukan solusi yang tepat sesuai kebutuhan maintenance kapal Anda. Hubungi kami untuk konsultasi gratis.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.15}>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/6281110109627?text=Halo%20Navale%20Mitratama%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                    Chat via WhatsApp
                  </a>
                  <Link href="/kontak" className="btn-outline w-full justify-center">
                    Kirim Pesan via Form
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
