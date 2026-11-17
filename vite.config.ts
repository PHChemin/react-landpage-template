import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { seo } from './scripts/seo-plugin'
import { site } from './src/site.config'

/**
 * base: './' keeps asset paths relative so the site works both on
 * username.github.io/repo and on a custom domain at the apex.
 */
export default defineConfig({
  base: process.env.VITE_BASE_PATH || './',
  plugins: [react(), tailwindcss(), seo(site)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
