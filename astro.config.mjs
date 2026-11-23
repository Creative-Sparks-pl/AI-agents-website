// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://agents.creativesparks.pl',
  adapter: vercel(),
  compressHTML: true,

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // The email answer page (/answer/, /en/answer/) is reached only from email links and carries
      // noindex, so it stays out of the sitemap.
      filter: (page) => !['/answer/', '/en/answer/'].includes(new URL(page).pathname),
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl-PL',
          en: 'en-US',
        },
      },
    }),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
    // Astro 7 builds CSS for esnext, which drops prefixes Safari before 18 needs
    // (e.g. -webkit-backdrop-filter); target Vite's default browser baseline instead.
    build: {
      cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16.4', 'ios16.4'],
    },
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
