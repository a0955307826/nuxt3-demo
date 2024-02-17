// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            meta: [
                { charset: "utf-8" },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
            ],
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.png",
                },
            ],
            
        },
    },
	devtools: { enabled: false },
	css: [ '~/assets/scss/index.scss' ],
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@nuxtjs/i18n',
	],
	build: {
		transpile: ['gsap'],
	},
	i18n: {
        defaultLocale: "zh-tw",
        strategy: "prefix_except_default",
        detectBrowserLanguage: false,
        langDir: "locales",
        lazy: true,
        baseUrl: 'http://localhost:3000',
        locales: [
            {
                code: "zh-tw",
                iso: "zh-TW",
                name: "繁",
                file: "tc.json",
            },
            {
                code: "en",
                iso: "en-US",
                name: "EN",
                file: "en.json",
            },
        ],
    },
});
