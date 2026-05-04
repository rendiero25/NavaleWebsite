import type { Metadata } from 'next'
import { siteUrl } from '@/lib/siteConfig'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal, StaggerReveal } from '@/components/ScrollReveal'
import { AnimatedCounter } from '@/components/AnimatedCounter'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Profil CV Navale Mitratama: 8+ tahun maintenance perkapalan, overhaul turbocharger & mesin, legalitas lengkap, kantor Bekasi & Jakarta Utara.',
  keywords: [
    'profil Navale Mitratama',
    'perusahaan maintenance kapal Bekasi',
    'legalitas NIB overhaul maritim',
    'sejarah perusahaan maritim Indonesia',
  ],
  openGraph: {
    title: 'Tentang Kami | CV Navale Mitratama',
    description:
      'Tim ahli maintenance perkapalan, visi-misi, milestone 2018–2026, dan legalitas usaha — CV Navale Mitratama.',
    url: `${siteUrl}/tentang-kami`,
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Navale Mitratama',
  },
}

const milestones = [
  { year: '2018', event: 'Perusahaan Didirikan', desc: 'CV Navale Mitratama resmi berdiri tanggal 8 Januari 2018 oleh Leonardo Ari Tua.' },
  { year: '2019', event: 'Ekspansi Layanan', desc: 'Memperluas layanan ke overhaul turbocharger dan kalibrasi governor.' },
  { year: '2020', event: 'NIB Terdaftar', desc: 'Terdaftar resmi di sistem OSS dengan NIB 0220304200164.' },
  { year: '2021', event: 'Mitra Pemerintah', desc: 'Mulai menjalin kerjasama dengan lembaga-lembaga pemerintah.' },
  { year: '2023', event: 'Penguatan Legalitas', desc: 'Pembaruan TDP dan perizinan usaha untuk kelancaran operasional.' },
  { year: '2026', event: 'Sekarang', desc: 'Melayani klien pemerintah dan swasta di seluruh wilayah Indonesia.' },
]

const values = [
  {
    title: 'Kualitas',
    desc: 'Setiap pekerjaan mengacu pada standar internasional dengan pemeriksaan ketat di setiap tahap.',
    icon: '◈',
  },
  {
    title: 'Ketepatan Waktu',
    desc: 'Komitmen menyelesaikan pekerjaan sesuai jadwal yang telah disepakati tanpa kompromi.',
    icon: '◉',
  },
  {
    title: 'Keselamatan K3',
    desc: 'Menerapkan standar K3 ketat, menciptakan lingkungan kerja yang aman dan bebas risiko.',
    icon: '◎',
  },
  {
    title: 'Profesionalisme',
    desc: 'Didukung tenaga ahli berpengalaman di bidang mekanikal, elektrikal, dan maritim.',
    icon: '◆',
  },
]

const team = [
  {
    name: 'Leonardo Ari Tua',
    role: 'Direktur & Pendiri',
    desc: 'Memimpin perusahaan sejak berdiri pada 2018 dengan keahlian di bidang teknik mesin dan manajemen proyek perkapalan.',
  },
]

const legalDocs = [
  { label: 'NIB', value: '0220304200164' },
  { label: 'NPWP', value: '83.741.681.7-407.000' },
  { label: 'SIUP Kecil', value: '510/01517/PK./DPMPTSP.PPJU/OL' },
  { label: 'Akta Pendirian', value: 'No. 05, Tgl. 08-01-2018' },
  { label: 'SK Kemenkumham', value: 'No. AHU-00707.AH.02.01 Tahun 2016' },
  { label: 'TDP', value: '102633300667/OL, 31 Januari 2023' },
]

export default function TentangKami() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ─── PAGE HEADER ─── */}
        <section className="bg-neutral-50 pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="label-tag mb-4 font-bold">Tentang Kami</div>
              <h1 className="font-display font-extrabold text-display text-navy-900 mb-6 max-w-3xl">
                8 Tahun Membangun Kepercayaan di Industri Maritim
              </h1>
              <p className="font-body text-navy-950 text-lg max-w-2xl leading-relaxed">
                Dari kantor di Bekasi hingga melayani klien di seluruh perairan Indonesia, CV Navale Mitratama terus berkembang sebagai partner maintenance perkapalan yang terpercaya.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="bg-blue-brand">
          <StaggerReveal className="container-custom grid grid-cols-2 lg:grid-cols-4 py-0">
            {[
              { val: 8, suf: '+', label: 'Tahun Berdiri' },
              { val: 6, suf: '+', label: 'Tahun Mitra Pemerintah' },
              { val: 2, suf: '', label: 'Kantor Operasional' },
              { val: 7, suf: '', label: 'Jenis Layanan' },
            ].map((s, i) => (
              <div key={s.label} className={`py-10 px-6 ${i < 3 ? 'border-r border-white/20' : ''} ${i >= 2 ? 'border-t lg:border-t-0 border-white/20' : ''}`}>
                <div className="font-display font-extrabold text-4xl text-white">
                  <AnimatedCounter end={s.val} suffix={s.suf} />
                </div>
                <div className="font-mono text-xs text-white/70 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </section>

        {/* ─── STORY ─── */}
        <section className="section-pad bg-white">
          <div className="container-custom grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="label-tag mb-4 font-bold">Pendahuluan</div>
              <h2 className="font-display font-bold text-headline text-navy-900 mb-6">
                Kokoh, Handal, dan Terpercaya
              </h2>
              <div className="space-y-4 font-body text-navy-950 leading-relaxed">
                <p>
                  CV Navale Mitratama adalah perusahaan penyedia perdagangan alat teknik mekanikal elektrikal, mesin-mesin industri suku cadang dan perlengkapannya, serta jasa reparasi, perawatan mesin-mesin, dan instalasi listrik.
                </p>
                <p>
                  Berkat ketekunan dan keuletan pengurus perusahaan beserta tenaga ahli profesional yang dimiliki dan berpengalaman dalam menangani sekian banyak proyek, CV Navale Mitratama telah banyak mendapatkan kepercayaan dari berbagai klien.
                </p>
                <p>
                  Kami bertekad memperbaiki mutu kerja dan hasil kerja secara berkesinambungan serta berusaha untuk memenuhi harapan dan kepuasan pelanggan melalui penerapan sistem manajemen yang berkelanjutan.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.title} className="p-6 border border-neutral-200 hover:border-blue-brand/40 transition-all duration-300">
                    <div className="font-display text-3xl text-blue-brand mb-3">{v.icon}</div>
                    <h3 className="font-display font-bold text-navy-900 text-md mb-2">{v.title}</h3>
                    <p className="font-body text-navy-950 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── TIMELINE ─── */}
        <section className="section-pad bg-neutral-50">
          <div className="container-custom">
            <ScrollReveal className="mb-16">
              <div className="label-tag mb-3 font-bold">Perjalanan Kami</div>
              <h2 className="font-display font-bold text-display text-navy-900">
                Milestone Perusahaan
              </h2>
            </ScrollReveal>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 -translate-x-1/2" />

              <StaggerReveal className="space-y-12">
                {milestones.map((m, i) => (
                  <div key={m.year} className={`relative flex gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-16 md:pl-0`}>
                      <div className="font-mono text-blue-brand text-xs uppercase tracking-widest mb-1">{m.year}</div>
                      <h3 className="font-display font-bold text-navy-900 text-lg mb-2">{m.event}</h3>
                      <p className="font-body text-navy-950 text-md leading-relaxed">{m.desc}</p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-brand border-4 border-neutral-50 z-10" />

                    {/* Empty half */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        {/* ─── LEGAL DOCS ─── */}
        <section className="section-pad bg-white">
          <div className="container-custom">
            <ScrollReveal className="mb-12">
              <div className="label-tag mb-3 font-bold">Legalitas Perusahaan</div>
              <h2 className="font-display font-bold text-display text-navy-900">
                Dokumen & Perizinan
              </h2>
            </ScrollReveal>
            <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {legalDocs.map((doc) => (
                <div key={doc.label} className="p-6 bg-neutral-50 border border-neutral-200">
                  <div className="font-mono text-xs font-medium text-navy-950 uppercase tracking-widest mb-1">{doc.label}</div>
                  <div className="font-display font-semibold text-navy-900 text-sm">{doc.value}</div>
                </div>
              ))}
            </StaggerReveal>

            <ScrollReveal className="mt-12">
              <div className="bg-navy-900 p-8 relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-brand" />
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="label-tag-light mb-3">Kantor 1 — Bekasi</div>
                    <p className="font-body text-white text-sm leading-relaxed">
                      Jl. Mawar Raya No. 27 RT/RW 005/002<br />
                      Margahayu, Bekasi Timur<br />
                      Kota Bekasi, Jawa Barat 17113<br />
                      Telp: 0812-1944-5330
                    </p>
                  </div>
                  <div>
                    <div className="label-tag-light mb-3">Kantor 2 — Jakarta</div>
                    <p className="font-body text-white text-sm leading-relaxed">
                      Jl. Perjuangan No. 60<br />
                      Jakarta Utara<br />
                      Telp: 0811-1010-9627
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
