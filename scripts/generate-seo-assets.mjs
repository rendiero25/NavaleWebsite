/**
 * Menghasilkan placeholder brand: public/images/logo.png, icon.png, apple-icon.png, favicon.ico
 * Ganti logo.png dengan aset resmi perusahaan bila sudah tersedia.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const publicDir = path.join(root, 'public')
const imagesDir = path.join(publicDir, 'images')

const size = 512
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect fill="#040C14" width="100%" height="100%"/>
  <circle cx="256" cy="256" r="132" fill="#1A56A0"/>
  <text x="256" y="292" text-anchor="middle" fill="#ffffff" font-family="system-ui,sans-serif" font-size="140" font-weight="700">N</text>
</svg>`)

fs.mkdirSync(imagesDir, { recursive: true })

const logoPng = await sharp(svg).png().toBuffer()
await sharp(logoPng).png().toFile(path.join(imagesDir, 'logo.png'))
await sharp(logoPng).resize(512, 512).png().toFile(path.join(publicDir, 'icon.png'))
await sharp(logoPng).resize(180, 180).png().toFile(path.join(publicDir, 'apple-icon.png'))

const buf32 = await sharp(logoPng).resize(32, 32).png().toBuffer()
const buf16 = await sharp(logoPng).resize(16, 16).png().toBuffer()
const ico = await pngToIco([buf16, buf32])
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico)

console.log('SEO assets written to public/ and public/images/logo.png')
