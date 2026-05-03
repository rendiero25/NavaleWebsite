# CLAUDE.md — CV Navale Mitratama Website

> File ini adalah konteks utama untuk Claude Code. Baca seluruh file ini sebelum mengerjakan task apapun.

---

## 🧭 Project Overview

**CV Navale Mitratama** — Company profile website untuk perusahaan spesialis maintenance perkapalan yang berdiri sejak 2018 di Bekasi, Jawa Barat.

| Atribut | Detail |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v3 |
| Animation | GSAP 3.12 + ScrollTrigger |
| Email | Resend v4 |
| Form | React Hook Form v7 |
| Font | Syne (display) · Source Sans 3 (body) · DM Mono (mono) |
| Language | TypeScript strict |
| Node | ≥ 18.17 |

---

## 📁 Struktur Direktori

```
navale-website/
├── app/
│   ├── layout.tsx              # Root layout, font, metadata global
│   ├── page.tsx                # Home page
│   ├── globals.css             # Design tokens, utility classes
│   ├── tentang-kami/
│   │   └── page.tsx            # About page
│   ├── layanan/
│   │   └── page.tsx            # Services page
│   ├── galeri/
│   │   └── page.tsx            # Gallery page (before/after, foto, video)
│   ├── kontak/
│   │   └── page.tsx            # Contact page (form + WA)
│   └── api/
│       └── contact/
│           └── route.ts        # POST endpoint — Resend email
├── components/
│   ├── Navbar.tsx              # Fixed nav, mobile menu, scroll behavior
│   ├── Footer.tsx              # Footer grid, legal info
│   ├── ScrollReveal.tsx        # GSAP scroll-triggered fade/slide
│   ├── AnimatedCounter.tsx     # GSAP number counter on scroll
│   └── BeforeAfterSlider.tsx   # Drag/touch before-after image compare
├── public/
│   └── gallery/
│       ├── before/             # Foto sebelum (before-after slider)
│       ├── after/              # Foto sesudah (before-after slider)
│       └── videos/             # Video lokal (.mp4)
├── .env.local                  # Secret keys (JANGAN commit)
├── .env.example                # Template env vars
├── tailwind.config.ts          # Color palette, font vars, spacing
└── CLAUDE.md                   # ← file ini
```

---

## 🎨 Design System

### Prinsip Utama
- **Swiss International Style** — grid ketat, tipografi kuat, whitespace lega
- **Apple UX feel** — transisi halus, feedback responsif, interaksi meaningful
- **Professional maritime** — palet navy-biru, tone industri tapi modern

### Color Palette
```
navy-950   #040C14    ← background gelap utama (hero, footer)
navy-900   #0B1824    ← card gelap, section dark
blue-brand #1A56A0    ← CTA, aksen, border aktif
blue-light #2E86C1    ← hover state
blue-pale  #7AB8E0    ← label terang di background gelap
white      #FFFFFF    ← teks di dark bg, background light section
neutral-50 #F7F9FC    ← background section terang
neutral-500 #6B7C93   ← body text secondary
```

### Typography Scale
```css
.font-display  → Syne (heading, nav, button, counter)
.font-body     → Source Sans 3 (paragraf, deskripsi)
.font-mono     → DM Mono (label, tag, nomor, code)
```

### Utility Classes Kustom (dari globals.css)
```css
.container-custom    → max-w-7xl mx-auto px-6 lg:px-10
.section-pad         → py-24 lg:py-32
.label-tag           → font-mono uppercase tracking-widest text-blue-brand (dark bg)
.label-tag-light     → font-mono uppercase tracking-widest text-blue-pale (light bg)
.btn-primary         → bg-blue-brand text-white, hover bg-blue-light
.btn-outline         → border border-white/30 text-white (di dark section)
.btn-outline-dark    → border border-navy-900 text-navy-900 (di light section)
.btn-whatsapp        → bg-[#25D366] text-white
.service-card        → p-8 border hover:border-blue-brand/40
.rule-line           → border-t border-neutral-200
.hover-underline     → pseudo-element underline animation
```

---

## 🎞️ GSAP — Aturan & Pola

### Wajib
- Selalu daftarkan plugin di atas komponen: `gsap.registerPlugin(ScrollTrigger)`
- Selalu gunakan `gsap.context()` dan `return () => ctx.revert()` untuk cleanup
- Gunakan `'use client'` di komponen yang menggunakan GSAP

### Pola Standar — ScrollReveal
```tsx
// Gunakan komponen <ScrollReveal> untuk fade-up elemen
<ScrollReveal delay={0.1} direction="up">
  <div>Content</div>
</ScrollReveal>

// Gunakan <StaggerReveal> untuk animasi berurutan pada children
<StaggerReveal stagger={0.12}>
  <Card />
  <Card />
  <Card />
</StaggerReveal>
```

### Pola Standar — Counter
```tsx
<AnimatedCounter end={8} suffix="+" />
```

### Pola Hero (kompleks)
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 0.5 })
    tl.fromTo(ref1, { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
      .fromTo(ref2, { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.4')
  }, containerRef)
  return () => ctx.revert()
}, [])
```

### Easing yang Digunakan
- Enter animations: `power3.out`
- Exit/subtle: `power2.out`
- Bounce: `back.out(1.7)` (gunakan sparingly)
- Infinite loop: `sine.inOut`

---

## 📧 Email API — Resend

### Endpoint
```
POST /api/contact
Content-Type: application/json
```

### Request Body
```ts
{
  name: string       // wajib
  company?: string   // opsional
  email: string      // wajib
  phone: string      // wajib
  service: string    // wajib — pilihan dari dropdown
  message: string    // wajib, min 20 char
}
```

### Behavior
1. Validasi field wajib
2. Kirim email notifikasi ke `cv.navalemitratama@gmail.com`
3. Kirim auto-reply ke email pengirim
4. Return `{ success: true }` atau error dengan status code

### Environment Variable
```bash
RESEND_API_KEY=re_xxxxxxxx   # di .env.local
```

---

## 📸 Galeri — Cara Kerja

### Tambah Konten Baru (edit `app/galeri/page.tsx`)

```ts
// BEFORE/AFTER
{
  id: '1',
  title: 'Judul Pekerjaan',
  category: 'Turbocharger',        // harus match salah satu dari `categories` array
  type: 'before-after',
  before: '/gallery/before/file.jpg',
  after: '/gallery/after/file.jpg',
  description: 'Deskripsi singkat.',
}

// FOTO TUNGGAL
{
  id: '2',
  type: 'photo',
  photo: '/gallery/file.jpg',
  category: 'Mesin',
  title: '...',
}

// VIDEO YOUTUBE
{
  id: '3',
  type: 'video',
  youtubeId: 'VIDEO_ID_DARI_URL',  // bukan full URL
  category: 'Governor',
  title: '...',
}

// VIDEO LOKAL
{
  id: '4',
  type: 'video',
  videoSrc: '/gallery/videos/file.mp4',
  category: 'Pompa',
  title: '...',
}
```

### Kategori yang Tersedia
`'Semua' | 'Turbocharger' | 'Mesin' | 'Pompa' | 'Governor' | 'Kelistrikan' | 'Lainnya'`

---

## 🔗 WhatsApp Integration

Semua link WA menggunakan format:
```
https://wa.me/6281219445330?text=PESAN_TERENCODED
```

Nomor aktif:
- Bekasi (utama): `6281219445330`
- Jakarta: `6281110109627`

Form kontak punya tombol "Kirim via WhatsApp" yang otomatis pre-fill pesan dari isian form.

---

## 📐 Konvensi Kode

### Komponen
- Server Component by default, tambah `'use client'` hanya jika butuh hooks/GSAP/event
- Props interface di atas komponen, gunakan nama `XxxProps`
- Export named, bukan default, kecuali page files (Next.js requirement)

### File Naming
```
PascalCase.tsx    → components
kebab-case/       → app routes (Next.js convention)
camelCase.ts      → utils, lib
```

### Import Order
```tsx
// 1. React/Next
import { useRef } from 'react'
import Link from 'next/link'
// 2. Third party
import { gsap } from 'gsap'
// 3. Internal components
import { ScrollReveal } from '@/components/ScrollReveal'
// 4. Types (jika ada)
```

### Tailwind Class Order
Gunakan urutan: layout → box model → visual → typography → interactive

---

## ⚠️ Hal yang JANGAN Dilakukan

```
❌ Jangan pakai <form> HTML native — gunakan react-hook-form
❌ Jangan hardcode warna di JSX — gunakan Tailwind class dari design system
❌ Jangan lupa 'use client' di komponen dengan GSAP atau useState
❌ Jangan lupa ctx.revert() untuk cleanup GSAP
❌ Jangan commit .env.local
❌ Jangan pakai font Inter, Roboto, atau Arial
❌ Jangan pakai inline style kecuali untuk GSAP initial state (opacity: 0)
❌ Jangan buat komponen baru tanpa cek apakah ScrollReveal sudah cukup
```

---

## ✅ Checklist Sebelum Deploy

- [ ] `RESEND_API_KEY` sudah diisi di environment Vercel
- [ ] Domain email di `route.ts` sudah diverifikasi di Resend
- [ ] Foto logo sudah ada di `/public/images/logo.png`
- [ ] Foto galeri sudah diupload dan entry di `galleryItems` sudah diisi
- [ ] Test form kontak end-to-end (email + WhatsApp)
- [ ] Test di mobile (responsiveness)
- [ ] Jalankan `npm run build` — pastikan tidak ada error TypeScript
- [ ] Check Lighthouse score (target: Performance ≥ 90)
