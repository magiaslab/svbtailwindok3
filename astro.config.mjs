import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
const owner = "astrojs";


// https://astro.build/config
export default defineConfig({
  site: 'https://basketsanvincenzo.it',
  integrations: [tailwind(), sitemap(), robotsTxt()],
  vite: {
    build: {
      target: 'esnext',
      minify: 'esbuild',
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: ['apexcharts', 'flowbite']
    }
  }
});