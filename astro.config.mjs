// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * Canonical domein van de website.
 * - Stel SITE_URL in (bijv. https://www.uwdomein.sr) zodra het definitieve domein vaststaat.
 * - Zonder SITE_URL gebruikt Vercel automatisch het productiedomein van het project.
 * - Lokaal valt het terug op de preview-server.
 */
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  // Scripts als losse bestanden (niet inline), zodat de Content-Security-Policy
  // in vercel.json met script-src 'self' kan werken.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
