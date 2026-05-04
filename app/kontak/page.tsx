'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
}

const serviceOptions = [
  'Maintenance Perkapalan',
  'Overhaul Turbocharger',
  'Overhaul Mesin 2-Tak & 4-Tak',
  'Overhaul Pompa & Sistem Pendingin',
  'Kalibrasi Governor',
  'Inspection & Repair',
  'Instalasi & Kelistrikan',
  'Lainnya',
]

export default function Kontak() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const watchedFields = watch()

  const buildWhatsAppMessage = (data: FormData) =>
    encodeURIComponent(
      `Halo CV Navale Mitratama,\n\n` +
      `*Nama:* ${data.name}\n` +
      (data.company ? `*Perusahaan:* ${data.company}\n` : '') +
      `*Email:* ${data.email}\n` +
      `*No. HP:* ${data.phone}\n` +
      `*Layanan:* ${data.service}\n\n` +
      `*Pesan:*\n${data.message}`
    )

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Navbar />
      <main id="main-content">
        {/* ─── PAGE HEADER ─── */}
        <section className="bg-neutral-50 pt-36 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
          <div className="container-custom relative z-10">
            <ScrollReveal>
              <div className="label-tag mb-4 font-bold">Kontak</div>
              <h1 className="font-display font-extrabold text-display text-navy-900 mb-6 max-w-2xl">
                Mari Berdiskusi
              </h1>
              <p className="font-body text-navy-950 text-lg max-w-xl leading-relaxed">
                Konsultasi gratis untuk kebutuhan maintenance kapal Anda. Tim kami siap merespons dalam waktu 1×24 jam.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── MAIN CONTENT ─── */}
        <section className="section-pad bg-white">
          <div className="container-custom grid lg:grid-cols-3 gap-16">
            {/* ─── Left: Info ─── */}
            <ScrollReveal direction="left" className="lg:col-span-1">
              <div className="space-y-10">
                {/* WhatsApp CTA */}
                <div className="bg-[#25D366]/10 border border-[#25D366]/30 p-6">
                  <div className="font-mono text-[11px] text-[#25D366] uppercase tracking-widest mb-3">Respons Cepat</div>
                  <p className="font-body text-navy-900 text-sm mb-4 leading-relaxed">
                    Untuk respon lebih cepat, hubungi kami langsung via WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/6281219445330?text=Halo%20Navale%20Mitratama%2C%20saya%20ingin%20konsultasi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp text-sm w-full justify-center py-3"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                    </svg>
                    Chat Sekarang — 0812-1944-5330
                  </a>
                </div>

                {/* Contact details */}
                <div className="space-y-6">
                  <div>
                    <div className="label-tag mb-2">Office 1 — Bekasi</div>
                    <p className="font-body text-navy-950 text-sm leading-relaxed">
                      Jl. Mawar Raya No. 27 RT/RW 005/002<br />
                      Margahayu, Bekasi Timur<br />
                      Kota Bekasi, Jawa Barat 17113
                    </p>
                    <a href="tel:081219445330" className="inline-block mt-2 font-mono text-sm text-blue-brand hover-underline">
                      0812-1944-5330
                    </a>
                  </div>
                  <div className="border-t border-neutral-200 pt-6">
                    <div className="label-tag mb-2">Office 2 — Jakarta</div>
                    <p className="font-body text-navy-950 text-sm leading-relaxed">
                      Jl. Perjuangan No. 60<br />
                      Jakarta Utara
                    </p>
                    <a href="tel:081110109627" className="inline-block mt-2 font-mono text-sm text-blue-brand hover-underline">
                      0811-1010-9627
                    </a>
                  </div>
                  <div className="border-t border-neutral-200 pt-6">
                    <div className="label-tag mb-2">Email</div>
                    <a href="mailto:cv.navalemitratama@gmail.com" className="font-body text-sm text-blue-brand hover-underline break-all">
                      cv.navalemitratama@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* ─── Right: Form ─── */}
            <ScrollReveal direction="right" delay={0.15} className="lg:col-span-2">
              {status === 'success' ? (
                <div role="status" className="border border-green-200 bg-green-50 p-10 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-display font-bold text-navy-900 text-xl mb-2">Pesan Terkirim!</h3>
                  <p className="font-body text-navy-950 mb-6">
                    Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1×24 jam.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn-outline-dark">
                    Kirim Pesan Lagi
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="label-tag mb-6">Form Kontak</div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        id="name"
                        {...register('name', { required: 'Nama wajib diisi' })}
                        type="text"
                        placeholder="Budi Santoso"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        className={`w-full px-4 py-3 border font-body text-sm text-navy-900 placeholder-neutral-400
                          focus:outline-none focus:border-blue-brand transition-colors bg-white
                          ${errors.name ? 'border-red-400' : 'border-neutral-300'}`}
                      />
                      {errors.name && <p id="name-error" role="alert" className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                        Nama Perusahaan
                      </label>
                      <input
                        id="company"
                        {...register('company')}
                        type="text"
                        placeholder="PT. Maju Bersama (opsional)"
                        className="w-full px-4 py-3 border border-neutral-300 font-body text-sm text-navy-900 placeholder-neutral-400 focus:outline-none focus:border-blue-brand transition-colors bg-white"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        {...register('email', {
                          required: 'Email wajib diisi',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Format email tidak valid' },
                        })}
                        type="email"
                        placeholder="budi@example.com"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                        className={`w-full px-4 py-3 border font-body text-sm text-navy-900 placeholder-neutral-400
                          focus:outline-none focus:border-blue-brand transition-colors bg-white
                          ${errors.email ? 'border-red-400' : 'border-neutral-300'}`}
                      />
                      {errors.email && <p id="email-error" role="alert" className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                        No. Telepon / WhatsApp *
                      </label>
                      <input
                        id="phone"
                        {...register('phone', { required: 'No. telepon wajib diisi' })}
                        type="tel"
                        placeholder="081234567890"
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        aria-invalid={!!errors.phone}
                        className={`w-full px-4 py-3 border font-body text-sm text-navy-900 placeholder-neutral-400
                          focus:outline-none focus:border-blue-brand transition-colors bg-white
                          ${errors.phone ? 'border-red-400' : 'border-neutral-300'}`}
                      />
                      {errors.phone && <p id="phone-error" role="alert" className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                      Layanan yang Dibutuhkan *
                    </label>
                    <select
                      id="service"
                      {...register('service', { required: 'Pilih layanan' })}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      aria-invalid={!!errors.service}
                      className={`w-full px-4 py-3 border font-body text-sm text-navy-900
                        focus:outline-none focus:border-blue-brand transition-colors bg-white appearance-none
                        ${errors.service ? 'border-red-400' : 'border-neutral-300'}`}
                    >
                      <option value="">-- Pilih layanan --</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p id="service-error" role="alert" className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block font-mono text-[11px] text-navy-950 uppercase tracking-widest mb-2">
                      Detail Kebutuhan *
                    </label>
                    <textarea
                      id="message"
                      {...register('message', { required: 'Pesan wajib diisi', minLength: { value: 20, message: 'Pesan minimal 20 karakter' } })}
                      rows={5}
                      placeholder="Ceritakan kebutuhan maintenance kapal Anda: jenis kapal, mesin, masalah yang dihadapi, dll."
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-3 border font-body text-sm text-navy-900 placeholder-neutral-400
                        focus:outline-none focus:border-blue-brand transition-colors bg-white resize-none
                        ${errors.message ? 'border-red-400' : 'border-neutral-300'}`}
                    />
                    {errors.message && <p id="message-error" role="alert" className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>

                  {status === 'error' && (
                    <div role="alert" className="bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-body">
                      Terjadi kesalahan. Silahkan kirim pesan via WhatsApp atau email langsung.
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    {/* Submit via email */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Kirim via Email
                        </>
                      )}
                    </button>

                    {/* Send via WhatsApp (pre-filled) */}
                    <a
                      href={
                        watchedFields.name && watchedFields.phone
                          ? `https://wa.me/6281219445330?text=${buildWhatsAppMessage(watchedFields as FormData)}`
                          : 'https://wa.me/6281219445330'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp flex-1 justify-center"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.526 5.847L0 24l6.335-1.508A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      Kirim via WhatsApp
                    </a>
                  </div>

                  <p className="font-mono text-[14px] text-navy-950 text-center">
                    Dengan mengirim pesan, Anda setuju dihubungi kembali oleh tim kami.
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
