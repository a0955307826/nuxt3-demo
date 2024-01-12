/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const { screensTailwind: screens } = require("./vender/tailwind/screens.ts");

module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
		"./composables/**/*.{js,ts}",
	],
	theme: {
		extend: {
			screens,
			fontFamily: {
				sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	corePlugins: {
		aspectRatio: false,
	},
	plugins: [
		require("@tailwindcss/aspect-ratio"),
		// ...
	],
};
