// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  modules: [
      '@nuxt/ui',
      '@nuxt/image',
      '@nuxt/icon',
      '@nuxt/fonts',
  ],

  app: {
    head: {
      title: "WanderLust Adventures",
      meta: [{ name: "A Product by Mohamed Humaam Athif" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },

  compatibilityDate: "2025-03-22",
})