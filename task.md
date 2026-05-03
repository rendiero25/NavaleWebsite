# TASK.MD — CV Navale Mitratama Website
## Development Roadmap & Checklist

> **Cara pakai:** Centang task `[x]` setiap selesai. Kerjakan secara berurutan per fase.  
> **Stack:** Next.js 15 · Tailwind CSS · GSAP · Resend · TypeScript

---

## 📊 Progress Overview

```
Phase 1 — Setup & Foundation        [ 6/8  ]
Phase 2 — Design System             [ 6/6  ]
Phase 3 — Core Components           [ 15/15 ]
Phase 4 — Pages                     [ 20/20 ]
Phase 5 — Galeri & Media            [ 0/8  ]
Phase 6 — Kontak & Email            [ 0/7  ]
Phase 7 — SEO & Performance         [ 0/8  ]
Phase 8 — Testing & QA              [ 0/9  ]
Phase 9 — Deployment                [ 0/6  ]
Phase 10 — Post-Launch              [ 0/5  ]
```

---

## Phase 1 — Setup & Foundation

> Target: Project bisa jalan di `localhost:3000`

- [x] **1.1** Clone / extract project: `unzip navale-website.zip`
- [x] **1.2** Install dependencies: `npm install`
- [x] **1.3** Copy environment file: `cp .env.example .env.local`
- [x] **1.4** Buat akun Resend di [resend.com](https://resend.com) → copy API key → isi `RESEND_API_KEY` di `.env.local`
- [x] **1.5** Jalankan dev server: `npm run dev` → pastikan bisa buka `http://localhost:3000`
- [x] **1.6** Cek semua 5 halaman bisa diakses: `/`, `/tentang-kami`, `/layanan`, `/galeri`, `/kontak`
- [x] **1.7** Init Git repository: `git init && git add . && git commit -m "initial commit"`
- [x] **1.8** Push ke GitHub / GitLab (untuk deployment nanti)

---

## Phase 2 — Design System

> Target: Semua token warna, font, dan utility class terdefinisi dan konsisten

- [x] **2.1** Verifikasi Tailwind config — cek semua custom colors (`navy-*`, `blue-brand`, `blue-pale`) bisa dipakai
- [x] **2.2** Verifikasi font — display: stack Helvetica (`tailwind.config.ts` · `font-display`); body & mono: Source Sans 3 + DM Mono via `next/font/google` di `layout.tsx`
- [x] **2.3** Test utility classes di browser — `.container-custom`, `.section-pad`, `.label-tag`, `.btn-primary`, `.btn-whatsapp`
- [x] **2.4** Pastikan CSS Variables terdefinisi di `:root` di `globals.css`
- [x] **2.5** Test `::selection` styling (highlight teks warna biru)
- [x] **2.6** Test custom scrollbar (track navy, thumb biru)

---

## Phase 3 — Core Components

> Target: Semua reusable component berfungsi sempurna

### Navbar
- [x] **3.1** Test scroll behavior — background berubah setelah scroll 60px
- [x] **3.2** Test GSAP entrance animation navbar (slide down dari atas)
- [x] **3.3** Test mobile hamburger menu (open/close + animasi GSAP)
- [x] **3.4** Test active state link sesuai halaman aktif (`.text-blue-pale`)
- [x] **3.5** Test tombol WhatsApp di navbar → buka WA dengan pesan pre-filled

### ScrollReveal & StaggerReveal
- [x] **3.6** Test `<ScrollReveal direction="up">` — elemen fade+slide dari bawah
- [x] **3.7** Test `<StaggerReveal>` — children muncul berurutan dengan delay
- [x] **3.8** Verifikasi cleanup `ctx.revert()` — tidak ada memory leak di console

### AnimatedCounter
- [x] **3.9** Test counter triggered saat masuk viewport
- [x] **3.10** Test counter tidak repeat saat scroll balik

### BeforeAfterSlider
- [x] **3.11** Test drag dengan mouse (desktop)
- [x] **3.12** Test swipe dengan touch (mobile/tablet)
- [x] **3.13** Test handle knob posisi: `3% – 97%` (tidak keluar bounds)

### Footer
- [x] **3.14** Verifikasi semua link navigasi berfungsi
- [x] **3.15** Verifikasi link email & telepon berfungsi (`mailto:`, `tel:`)

---

## Phase 4 — Pages

### 4A. Home Page (`/`)

- [x] **4.1** **Hero Section**
  - GSAP timeline berjalan: tag → title baris 1 → baris 2 → baris 3 → subtitle → CTA
  - Text gradient `.text-gradient` tampil di "TERPERCAYA"
  - Floating decorative circles animasi (float up-down)
  - Scroll indicator muncul di bawah hero
  - Tombol WhatsApp + Tombol "Lihat Layanan" berfungsi

- [x] **4.2** **Stats Strip** (biru)
  - 4 stat tampil dalam grid
  - AnimatedCounter trigger saat scroll ke section ini
  - Responsive: 2 kolom di mobile, 4 kolom di desktop

- [x] **4.3** **About Preview**
  - Grid 2 kolom: teks kiri, card visi-misi kanan
  - Card visi-misi dengan top accent line biru
  - Tombol "Selengkapnya" → `/tentang-kami`

- [x] **4.4** **Services Preview**
  - Grid 6 kartu layanan (2 kolom mobile, 3 kolom desktop)
  - Hover effect: border biru, garis bawah melebar
  - Tombol "Semua Layanan →" → `/layanan`

- [x] **4.5** **Gallery Teaser**
  - Tampilkan placeholder 4 kotak (ganti dengan foto nyata di Phase 5)
  - Tombol "Lihat Galeri" → `/galeri`

- [x] **4.6** **CTA Section** (biru brand)
  - Background grid pattern tampil
  - Dua tombol: WhatsApp + Form Kontak

### 4B. Tentang Kami (`/tentang-kami`)

- [x] **4.7** **Page Header** — dark hero dengan grid bg pattern
- [x] **4.8** **Stats Strip** — 4 stat animasi counter
- [x] **4.9** **Story Section**
  - Paragraf company story (3 paragraf)
  - Grid 4 values (Kualitas, Ketepatan Waktu, K3, Profesionalisme)

- [x] **4.10** **Timeline Perusahaan**
  - 6 milestone (2018 → 2026)
  - Vertical line di tengah
  - Alternating left-right (desktop)
  - Linear (mobile)

- [x] **4.11** **Legalitas**
  - Grid 6 dokumen (NIB, NPWP, SIUP, Akta, SK, TDP)
  - Dark card 2 kantor (Bekasi + Jakarta)

### 4C. Layanan (`/layanan`)

- [x] **4.12** **Page Header** — dark hero
- [x] **4.13** **Service List** — 7 layanan dengan format 3-kolom (nomor | judul+desc | fitur)
  - Setiap service punya badge kategori
  - List fitur dengan dot indicator biru
  - Border separator antar service

- [x] **4.14** **CTA Section** — dark navy, 2 tombol (WA + Form)

### 4D. Galeri (`/galeri`)

- [x] **4.15** **Page Header** — dark hero
- [x] **4.16** **Filter Tabs** — category filter berfungsi (klik ganti tampilan)
- [x] **4.17** **Empty State** — tampil dengan panduan cara menambah foto
- [x] **4.18** **Gallery Grid** — tampil setelah foto ditambahkan (Phase 5)

### 4E. Kontak (`/kontak`)

- [x] **4.19** **Page Header** — dark hero
- [x] **4.20** **Contact Layout**
  - Kolom kiri: WhatsApp CTA + 2 alamat kantor + email
  - Kolom kanan: Form 6 field

---

## Phase 5 — Galeri & Media

> Target: Halaman galeri terisi dengan foto dan video nyata

- [ ] **5.1** Kumpulkan foto-foto hasil pekerjaan dari tim Navale
  - Minimum: 6 foto before/after
  - Minimum: 4 foto dokumentasi proses
  - Minimal: 1 video (YouTube atau lokal)

- [ ] **5.2** Optimasi semua foto sebelum upload
  - Resize ke max 1200×675px (16:9)
  - Compress ke WebP atau JPG max 500KB
  - Tools: [Squoosh](https://squoosh.app) atau `sharp` CLI

- [ ] **5.3** Upload foto ke folder yang benar:
  ```
  /public/gallery/before/    ← foto sebelum
  /public/gallery/after/     ← foto sesudah (nama sama dengan before)
  /public/gallery/           ← foto proses/single
  /public/gallery/videos/    ← video lokal
  ```

- [ ] **5.4** Edit `app/galeri/page.tsx` → isi array `galleryItems` dengan entry foto nyata

- [ ] **5.5** Test BeforeAfterSlider dengan foto nyata (drag/touch)

- [ ] **5.6** Test lightbox foto single (klik → fullscreen → klik luar/× untuk tutup)

- [ ] **5.7** Test video embed YouTube (pastikan video public/unlisted)

- [ ] **5.8** Update gallery teaser di homepage (`app/page.tsx`) — ganti placeholder dengan foto nyata

---

## Phase 6 — Kontak & Email

> Target: Form kontak berfungsi end-to-end

- [ ] **6.1** Setup Resend account — verifikasi domain di dashboard Resend
  - Jika belum punya domain: gunakan `@resend.dev` untuk testing sementara

- [ ] **6.2** Update `from` email di `app/api/contact/route.ts`:
  ```ts
  from: 'Website Navale <noreply@yourdomain.com>'
  ```

- [ ] **6.3** Test form submission — isi semua field → klik "Kirim via Email"
  - Cek email masuk di `cv.navalemitratama@gmail.com`
  - Cek auto-reply diterima di email pengirim

- [ ] **6.4** Test validasi form:
  - Submit kosong → semua error muncul
  - Email format salah → error
  - Pesan < 20 karakter → error

- [ ] **6.5** Test loading state — spinner muncul saat submit

- [ ] **6.6** Test success state — halaman berubah ke konfirmasi

- [ ] **6.7** Test tombol "Kirim via WhatsApp" — form otomatis pre-fill pesan dari input form
  - Isi nama + telepon → klik WA → pesan sudah terisi

---

## Phase 7 — SEO & Performance

> Target: Lighthouse score ≥ 90 semua kategori

- [ ] **7.1** Isi metadata lengkap di setiap halaman:
  ```ts
  export const metadata: Metadata = {
    title: '...',
    description: '...',  // 120-160 karakter
    keywords: [...],
    openGraph: { ... },
  }
  ```

- [ ] **7.2** Tambahkan logo perusahaan ke `/public/images/logo.png`
  - Gunakan di metadata OpenGraph
  - Update `<Navbar>` untuk tampilkan logo gambar (opsional)

- [ ] **7.3** Tambahkan favicon:
  - `/public/favicon.ico`
  - `/public/icon.png` (512×512)
  - `/public/apple-icon.png` (180×180)

- [ ] **7.4** Buat `app/sitemap.ts` untuk sitemap otomatis:
  ```ts
  import { MetadataRoute } from 'next'
  export default function sitemap(): MetadataRoute.Sitemap {
    return [
      { url: 'https://domain.com', lastModified: new Date() },
      { url: 'https://domain.com/tentang-kami', lastModified: new Date() },
      // ...
    ]
  }
  ```

- [ ] **7.5** Buat `app/robots.ts`:
  ```ts
  import { MetadataRoute } from 'next'
  export default function robots(): MetadataRoute.Robots {
    return {
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://domain.com/sitemap.xml',
    }
  }
  ```

- [ ] **7.6** Pastikan semua `<img>` pakai `next/image` (tidak ada `<img>` telanjang)

- [ ] **7.7** Jalankan `npm run build` — pastikan 0 error, 0 TypeScript error

- [ ] **7.8** Jalankan Lighthouse di Chrome DevTools (mode Incognito):
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 95

---

## Phase 8 — Testing & QA

> Target: Tidak ada bug di semua device dan browser

### Responsiveness
- [ ] **8.1** Test di mobile 375px (iPhone SE)
- [ ] **8.2** Test di mobile 390px (iPhone 14)
- [ ] **8.3** Test di tablet 768px (iPad)
- [ ] **8.4** Test di desktop 1280px
- [ ] **8.5** Test di desktop 1920px (large)

### Cross-browser
- [ ] **8.6** Chrome / Edge (latest)
- [ ] **8.7** Safari / Safari iOS
- [ ] **8.8** Firefox

### Functional
- [ ] **8.9** Semua link internal tidak 404
- [ ] **8.10** Semua link eksternal (WA, email) buka di tab baru
- [ ] **8.11** GSAP animations tidak crash di Safari
- [ ] **8.12** BeforeAfterSlider berfungsi di iOS Safari (touch events)
- [ ] **8.13** Form kontak error states tampil dengan benar
- [ ] **8.14** Filter galeri berfungsi (klik category → update grid)
- [ ] **8.15** Lightbox galeri berfungsi (open + close)

### Accessibility
- [ ] **8.16** Semua gambar punya `alt` text bermakna
- [ ] **8.17** Navigasi keyboard berfungsi (Tab, Enter)
- [ ] **8.18** Warna kontras cukup (WCAG AA minimum)

---

## Phase 9 — Deployment

> Target: Website live di domain nyata

- [ ] **9.1** Daftarkan domain di Domainesia / Niagahoster (rekomendasi: `navalemitratama.com`)

- [ ] **9.2** Setup project di Vercel:
  ```bash
  npm i -g vercel
  vercel
  ```
  Atau push ke GitHub → import di [vercel.com](https://vercel.com)

- [ ] **9.3** Set environment variable di Vercel Dashboard:
  - `RESEND_API_KEY` = API key Resend

- [ ] **9.4** Connect custom domain di Vercel Dashboard → update DNS di registrar

- [ ] **9.5** Verifikasi domain di Resend Dashboard (untuk email dari domain sendiri):
  - Tambahkan DNS records (TXT + MX) sesuai instruksi Resend
  - Update `from` email di `route.ts` ke domain terverifikasi

- [ ] **9.6** Test production deployment:
  - Semua halaman load
  - Form kontak kirim email
  - HTTPS aktif
  - Domain `www` redirect ke non-www (atau sebaliknya)

---

## Phase 10 — Post-Launch

> Target: Website terpantau, konten terupdate

- [ ] **10.1** Submit sitemap ke Google Search Console:
  - Daftar di [search.google.com/search-console](https://search.google.com/search-console)
  - Verify domain ownership
  - Submit: `https://domain.com/sitemap.xml`

- [ ] **10.2** Setup Google Analytics 4 (opsional):
  ```tsx
  // app/layout.tsx — tambahkan Google Analytics script
  ```

- [ ] **10.3** Foto galeri — update berkala setiap selesai proyek baru
  - Buat habit: foto before-after setiap kali overhaul

- [ ] **10.4** Test email production — kirim pesan dari form → konfirmasi diterima

- [ ] **10.5** Backup: pastikan repository GitHub/GitLab up-to-date

---

## 🔧 Troubleshooting Common Issues

| Problem | Solusi |
|---|---|
| GSAP animation tidak muncul | Cek apakah komponen punya `'use client'` |
| ScrollTrigger tidak trigger | Cek `gsap.registerPlugin(ScrollTrigger)` di atas file |
| Font tidak load | Cek internet connection, Google Fonts bisa slow di Indonesia |
| Email tidak terkirim | Cek `RESEND_API_KEY` di `.env.local`, cek domain verified |
| Form submit error 500 | Cek Resend API key valid dan domain terverifikasi |
| Image tidak muncul | Pastikan path dimulai dari `/public/` tapi diakses tanpa `/public` |
| TypeScript error | Jalankan `npm run build` untuk lihat semua error |
| GSAP flicker di Safari | Tambahkan `will-change: transform` pada elemen yang dianimasikan |

---

## 📌 Catatan Penting

```
Nomor WA utama   : 081219445330 (Bekasi)
Nomor WA Jakarta : 081110109627
Email perusahaan : cv.navalemitratama@gmail.com
NIB              : 0220304200164
Domain target    : navalemitratama.com (atau sesuaikan)
```

---

*Last updated: 2026 · CV Navale Mitratama Website Project*
