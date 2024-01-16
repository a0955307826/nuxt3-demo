// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	// 只有global資料夾有auto import
	// "components": {
	// 	"dirs": [
	// 		{
	// 			"path": "~/components/global",
	// 			"global": true
	// 		}
	// 	]
	// }
	css: [ '~/assets/scss/index.scss' ],
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
	],
	build: {
		transpile: ['gsap'],
	},
});
