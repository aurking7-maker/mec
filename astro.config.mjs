// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // SSG static output
  output: 'static',
  // 🔧 When you buy maestroedilcarpi.it domain, change to:
  // site: 'https://www.maestroedilcarpi.it',
  // base: '/',
  site: 'https://www.maestroedilcarpi.it',
  base: '/',

  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/grazie'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },

  build: {
    assets: '_astro',
    // Inline all critical CSS for fastest First Paint
    inlineStylesheets: 'always',
  },

  // Compress HTML output
  compressHTML: true,

  // 🔧 Server config for preview
  server: {
    port: 4321,
  },
});