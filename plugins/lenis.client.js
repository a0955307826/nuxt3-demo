import Lenis from '@studio-freight/lenis';
export default defineNuxtPlugin((nuxtApp) => {
	const lenis = new Lenis()

	lenis.on('scroll', (e) => {
		console.log(lenis.lerp);
	})

	function raf(time) {
		lenis.raf(time)
		
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
})
