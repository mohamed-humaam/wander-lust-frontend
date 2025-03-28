// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},

    modules: [
        '@nuxt/ui',
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/fonts',
    ],

    plugins: [
        '~/plugins/click-outside.js',
        "~/plugins/query-params.js"
    ],

    app: {
        head: {
            title: "WanderLust Adventures",
            meta: [{name: "A Product by Mohamed Humaam Athif"}],
            link: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
                },
            ],
        },
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://wander-lust.test/api',
        },
    },

    compatibilityDate: "2025-03-22",
})