/** URL kanonik situs (tanpa trailing slash). Override lewat env saat deploy / staging. */
export const siteUrl =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://navalemitratama.com').replace(/\/$/, '')
