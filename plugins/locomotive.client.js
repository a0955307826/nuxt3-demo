import LocomotiveScroll from 'locomotive-scroll';
import { useGlobalStore } from '~/store';
export default defineNuxtPlugin(() => {
	const store = useGlobalStore();

	function onScroll({ scroll, limit, velocity, direction, progress }) {
		store.scrollPosition = scroll;
		window.direction = direction;
		window.progress = progress;
	}

	const locomotiveScroll = new LocomotiveScroll({
		scrollCallback: onScroll,
		lenisOptions: {
			wrapper: window,
			content: document.documentElement,
			lerp: 0.3,
		},
	});
})