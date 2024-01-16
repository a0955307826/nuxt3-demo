/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./composables/**/*.{js,ts}",
    ],
    // presets: [
    //     require("./vender/tailwind/project-preset.ts"),
    // ],
    theme: {
        screens: {
            xs: "375px",
			sm: "480px",
			ms: "576px",
			md: "768px",
			lg: "992px",
			'2lg': "1024px",
			xl: "1200px",
			'2xl': "1440px",
			'3xl': "1600px",
			'4xl': "1800px",
			'5xl': "1920px",
			'6xl': "2400px",
        },
        fontFamily: {
			sans: ['"Proxima Nova"', ...defaultTheme.fontFamily.sans],
		},
    },
    corePlugins: {
        aspectRatio: true,
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
    ],
};
