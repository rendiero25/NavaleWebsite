import Image from 'next/image'
import Link from 'next/link'

const services = [
  'Maintenance Perkapalan',
  'Overhaul Turbocharger',
  'Overhaul Mesin 2-Tak & 4-Tak',
  'Overhaul Pompa & Sistem Pendingin',
  'Kalibrasi Governor',
  'Inspection & Repair',
  'Instalasi Kelistrikan',
]

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/kontak', label: 'Kontak' },
]

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Top bar */}
      <div className="container-custom py-8 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.jpeg"
            alt="Logo CV Navale Mitratama"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 object-cover"
          />
          <p className="font-display font-bold text-2xl tracking-tight">
            CV NAVALE MITRATAMA
          </p>
        </div>
        <a
          href="https://wa.me/6281219445330"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp text-sm py-3"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.795 9.795 0 01-5.031-1.385l-.36-.214-3.753.983.997-3.643-.234-.374A9.775 9.775 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
          </svg>
          +62 812-1944-5330
        </a>
      </div>

      {/* Main grid */}
      <div className="container-custom py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About */}
        <div className="lg:col-span-1">
          <div className="label-tag-light mb-4">Tentang Perusahaan</div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Spesialis maintenance perkapalan dengan pengalaman 8 tahun. Didukung tenaga profesional dan berpengalaman untuk hasil kerja optimal.
          </p>
          <div className="space-y-1">
            <div className="font-mono text-[11px] text-navy-950 uppercase tracking-wider">Berdiri</div>
            <div className="font-display font-bold text-white text-xl">Sejak 2018</div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <div className="label-tag-light mb-4">Navigasi</div>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 text-sm hover:text-white hover-underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <div className="label-tag-light mb-4">Layanan Kami</div>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s} className="text-white/60 text-sm">{s}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="label-tag-light mb-4">Kontak</div>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-mono text-[11px] text-navy-950 uppercase tracking-wider mb-1">Office 1 — Bekasi</div>
              <p className="text-white/60 leading-relaxed">
                Jl. Mawar Raya No. 27 RT/RW 005/002<br />
                Margahayu, Bekasi Timur<br />
                Kota Bekasi, Jawa Barat 17113
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] text-navy-950 uppercase tracking-wider mb-1">Office 2 — Jakarta</div>
              <p className="text-white/60 leading-relaxed">
                Jl. Perjuangan No. 60<br />
                Jakarta Utara
              </p>
            </div>
            <div className="space-y-1">
              <a href="tel:081219445330" className="block text-white/60 hover:text-white transition-colors">
                📞 0812-1944-5330
              </a>
              <a href="mailto:cv.navalemitratama@gmail.com" className="block text-white/60 hover:text-white transition-colors break-all">
                ✉️ cv.navalemitratama@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-custom py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <p>© {new Date().getFullYear()} CV Navale Mitratama. All rights reserved.</p>
        
        <p>Developed by <a href="https://www.rendiero.site" target="_blank" rel="noopener noreferrer" className="font-bold text-white">rendiero.</a></p>
        
        <div className="flex items-center gap-4">
          <span>NIB: 0220304200164</span>
          <span>·</span>
          <span>NPWP: 83.741.681.7-407.000</span>
        </div>
      </div>
    </footer>
  )
}
