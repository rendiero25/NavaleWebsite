# CV Navale Mitratama — Company Profile Website

Website company profile modern untuk CV Navale Mitratama. Dibangun dengan Next.js 15, Tailwind CSS, GSAP, dan Resend.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Email**: Resend
- **Font**: Syne (display) + Source Sans 3 (body) + DM Mono (accent)
- **Language**: TypeScript

## 📁 Struktur Halaman

```
/               → Home (Hero, Stats, About, Services, Gallery, CTA)
/tentang-kami   → About (Story, Timeline, Values, Legal Docs)
/layanan        → Services (7 layanan lengkap)
/galeri         → Gallery (Before/After slider, foto, video)
/kontak         → Contact (Form email + WhatsApp)
```

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local dan isi RESEND_API_KEY

# 3. Jalankan development server
npm run dev

# 4. Buka di browser
# http://localhost:3000
```

## 📸 Cara Menambahkan Foto & Video ke Galeri

### Foto Before/After

1. Buat folder (sudah ada):
   ```
   /public/gallery/before/    ← foto sebelum
   /public/gallery/after/     ← foto sesudah
   ```

2. Taruh foto di folder tersebut (format: JPG, PNG, WebP)
   ```
   /public/gallery/before/turbo-01.jpg
   /public/gallery/after/turbo-01.jpg
   ```

3. Edit file `app/galeri/page.tsx`, uncomment dan sesuaikan contoh:
   ```tsx
   {
     id: '1',
     title: 'Overhaul Turbocharger MAN B&W',
     category: 'Turbocharger',
     type: 'before-after',
     before: '/gallery/before/turbo-01.jpg',
     after: '/gallery/after/turbo-01.jpg',
     description: 'Rekondisi turbocharger MAN B&W kapal tanker.',
   },
   ```

### Foto Biasa (tanpa before/after)

```tsx
{
  id: '2',
  title: 'Proses Overhaul Mesin',
  category: 'Mesin',
  type: 'photo',
  photo: '/gallery/mesin-01.jpg',
  description: 'Overhaul mesin 4-tak kapal KM. Maju Jaya.',
},
```

### Video YouTube

```tsx
{
  id: '3',
  title: 'Kalibrasi Governor',
  category: 'Governor',
  type: 'video',
  youtubeId: 'dQw4w9WgXcQ',  // ← ID dari URL YouTube
  description: 'Dokumentasi proses kalibrasi governor.',
},
```

### Video Lokal (.mp4)

```tsx
{
  id: '4',
  title: 'Pengujian Turbocharger',
  category: 'Turbocharger',
  type: 'video',
  videoSrc: '/gallery/videos/turbo-test.mp4',
  description: 'Testing turbocharger setelah overhaul.',
},
```

---

## 📧 Setup Email (Resend)

1. Daftar di [resend.com](https://resend.com)
2. Verifikasi domain Anda di Resend Dashboard
3. Buat API key di Settings → API Keys
4. Isi `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   ```
5. Update field `from` di `app/api/contact/route.ts`:
   ```ts
   from: 'Website Navale <noreply@domainanda.com>'
   ```

> **Testing tanpa domain**: Gunakan `@resend.dev` untuk testing — email hanya terkirim ke email Anda sendiri.

---

## 🎨 Kustomisasi

### Warna
Edit `tailwind.config.ts` bagian `colors`:
```ts
blue: {
  brand: '#1A56A0',   // warna utama biru
  light: '#2E86C1',   // hover state
  pale: '#7AB8E0',    // aksen terang
}
```

### Informasi Perusahaan
Edit konten langsung di masing-masing halaman:
- Hero text: `app/page.tsx`
- Profil perusahaan: `app/tentang-kami/page.tsx`
- Layanan: `app/layanan/page.tsx`
- Footer info: `components/Footer.tsx`

### Nomor WhatsApp
Ganti `6281219445330` di semua file dengan nomor WA aktif Navale.

---

## 📱 Fitur

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ GSAP animations (hero reveal, scroll trigger, stagger)
- ✅ Before/After slider (drag + touch)
- ✅ Form kontak (email via Resend + WhatsApp)
- ✅ Auto-reply email ke pengirim
- ✅ SEO optimized (metadata, OG tags)
- ✅ Swiss design system (Syne font, clean grid)
- ✅ Performance optimized (Next.js image, font optimization)
- ✅ Galeri foto & video (YouTube embed + file lokal)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Lalu set environment variable di Vercel Dashboard:
- `RESEND_API_KEY` = API key Resend Anda

### Manual Build

```bash
npm run build
npm start
```
