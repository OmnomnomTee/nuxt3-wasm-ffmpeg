// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/styles.scss'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'WASM demo',
    },
  },
  srcDir: 'src',

  nitro: {
    // Enable WASM support
    experimental: {
      wasm: true,
    },
  },

  /**
   * Required for FFMPEG to work, IF you want to self-host the WASM in the public folder.
   * This is required since the spectre vulnerability.
   * Set headers for static assets (e.g. worker.js).
   * Also take a loot at the middleware/setSameOriginHeader.server.ts
   *
   * See https://github.com/ffmpegwasm/react-app/issues/3
   */
  routeRules: {
    '/**': {
      headers: {
        // your headers
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },
  },

  /**
   * Download and preload Google Fonts
   * https://google-fonts.nuxtjs.org/
   */
  googleFonts: {
    families: {
      Raleway: true,
    },
    subsets: 'latin',
    download: true,
    preload: true,
  },

  /**
   * Make sure that the HTML is valid
   * https://html-validator.nuxtjs.org/
   */
  htmlValidator: {
    failOnError: true,
    options: {
      rules: {
        'wcag/h37': 'warn',
        'element-permitted-content': 'warn',
        'element-required-attributes': 'warn',
        'attribute-empty-style': 'off',
      },
    },
  },

  modules: ['@nuxtjs/google-fonts', '@nuxtjs/html-validator'],
})
