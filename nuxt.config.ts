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
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://admin.wanderlustadventuresmv.com/api',
            googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
        },
    },

    server: {
        allowedHosts: ['wanderlustadventuresmv.com'],
    },
    
    compatibilityDate: "2025-03-22",
})
