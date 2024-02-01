// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
        defaultLocale: "en",
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
