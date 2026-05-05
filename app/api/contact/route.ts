import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    const resend = new Resend(apiKey)

    const body = await req.json()
    const { name, company, email, phone, service, message } = body

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 })
    }

    const safeName    = escapeHtml(String(name))
    const safeCompany = company ? escapeHtml(String(company)) : ''
    const safeEmail   = escapeHtml(String(email))
    const safePhone   = escapeHtml(String(phone))
    const safeService = escapeHtml(String(service))
    const safeMessage = escapeHtml(String(message))
    const waPhone     = String(phone).replace(/[^0-9]/g, '').replace(/^0/, '')

    // Notifikasi ke Navale
    await resend.emails.send({
      from: 'Website Navale <onboarding@resend.dev>',
      to: ['cv.navalemitratama@gmail.com'],
      replyTo: email,
      subject: `[Website] Pesan baru dari ${safeName} — ${safeService}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #0B1824; padding: 32px; margin-bottom: 24px;">
            <h1 style="color: white; font-size: 24px; margin: 0 0 8px 0;">CV Navale Mitratama</h1>
            <p style="color: #7AB8E0; margin: 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Pesan Baru dari Website</p>
          </div>

          <div style="background: white; padding: 32px; border-left: 4px solid #1A56A0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #f0f4f8;">
                <td style="padding: 12px 0; color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Nama</td>
                <td style="padding: 12px 0; color: #0B1824; font-weight: 600;">${safeName}</td>
              </tr>
              ${safeCompany ? `
              <tr style="border-bottom: 1px solid #f0f4f8;">
                <td style="padding: 12px 0; color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Perusahaan</td>
                <td style="padding: 12px 0; color: #0B1824;">${safeCompany}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #f0f4f8;">
                <td style="padding: 12px 0; color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
                <td style="padding: 12px 0;"><a href="mailto:${safeEmail}" style="color: #1A56A0;">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f4f8;">
                <td style="padding: 12px 0; color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">No. HP / WA</td>
                <td style="padding: 12px 0;"><a href="https://wa.me/62${waPhone}" style="color: #25D366;">${safePhone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f4f8;">
                <td style="padding: 12px 0; color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Layanan</td>
                <td style="padding: 12px 0; color: #1A56A0; font-weight: 600;">${safeService}</td>
              </tr>
            </table>

            <div style="margin-top: 24px;">
              <div style="color: #6B7C93; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Pesan</div>
              <div style="background: #f8fafc; padding: 16px; color: #1A2535; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</div>
            </div>

            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #f0f4f8;">
              <a href="https://wa.me/62${waPhone}?text=Halo%20${encodeURIComponent(name)}%2C%20terima%20kasih%20telah%20menghubungi%20CV%20Navale%20Mitratama."
                 style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Balas via WhatsApp
              </a>
            </div>
          </div>

          <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px;">
            Email ini dikirim otomatis dari website CV Navale Mitratama
          </p>
        </div>
      `,
    })

    // Auto-reply ke pengirim
    await resend.emails.send({
      from: 'CV Navale Mitratama <onboarding@resend.dev>',
      to: [email],
      subject: 'Pesan Anda Telah Diterima — CV Navale Mitratama',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 20px;">
          <div style="background: #0B1824; padding: 32px; margin-bottom: 24px;">
            <h1 style="color: white; font-size: 24px; margin: 0 0 8px 0;">CV Navale Mitratama</h1>
            <p style="color: #7AB8E0; margin: 0; font-size: 13px;">Konfirmasi Pesan</p>
          </div>

          <div style="background: white; padding: 32px;">
            <p style="color: #1A2535; font-size: 16px;">Halo <strong>${safeName}</strong>,</p>
            <p style="color: #4B5563; line-height: 1.7;">
              Terima kasih telah menghubungi CV Navale Mitratama. Pesan Anda mengenai
              <strong style="color: #1A56A0;">${safeService}</strong> telah kami terima.
            </p>
            <p style="color: #4B5563; line-height: 1.7;">
              Tim kami akan menghubungi Anda dalam waktu <strong>1×24 jam</strong> melalui email atau nomor WhatsApp yang Anda daftarkan.
            </p>
            <p style="color: #4B5563; line-height: 1.7;">
              Atau Anda bisa langsung menghubungi kami via WhatsApp:
            </p>
            <a href="https://wa.me/6281219445330"
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
              Chat WhatsApp — 0812-1944-5330
            </a>
            <p style="color: #9CA3AF; font-size: 13px; border-top: 1px solid #f0f4f8; padding-top: 20px;">
              Hormat Kami,<br>
              <strong style="color: #1A2535;">CV Navale Mitratama</strong><br>
              Jl. Mawar Raya No. 27, Bekasi Timur
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Gagal mengirim pesan' }, { status: 500 })
  }
}
