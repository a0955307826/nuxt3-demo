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
	css: [ '~/assets/css/index.css' ],
	modules: [
		'@nuxtjs/tailwindcss',
		// '@vueuse/nuxt',
	],
	build: {
		transpile: ['gsap'],
	},
});
