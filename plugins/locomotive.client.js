import LocomotiveScroll from 'locomotive-scroll';
export default defineNuxtPlugin(() => {
	function onScroll({ scroll, limit, velocity, direction, progress }) {
		console.log(scroll, limit, velocity, direction, progress);
	}

	const locomotiveScroll = new LocomotiveScroll({
		scrollCallback: onScroll,
		lenisOptions: {
			wrapper: window,
			content: document.documentElement,
			lerp: 0.03,
		},
	});
})