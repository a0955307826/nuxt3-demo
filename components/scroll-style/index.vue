<template>
	<div class="scrollbar_scrollbar" ref="scrollbar">
		<div class="scrollbar_thumb" ref="scrollbarThumbEl"></div>
	</div>
</template>

<script setup>
import { useWindowSize, watchDebounced } from "@vueuse/core";
import { useGlobalStore } from "~/store";
const store = useGlobalStore();
const { height } = useWindowSize();
const scrollbarThumbEl = ref(null);
const scrollbar = ref(null);
const scrollbar_h = ref(0);
const isMouseDown = ref(false);
let y = 0;

const mouseDownEvent = (event) => {
	y = event.clientY;
	isMouseDown.value = true;
	// let percent = event.clientY / window.innerHeight;
	// console.log(document.body.scrollHeight * percent);
	// console.log(window.innerHeight / document.body.scrollHeight * percent * 1000);
	// window.scrollTo({ top: (window.innerHeight) * percent});
}

const mouseUpEvent = () => {
	isMouseDown.value = false;
}

const mousemoveEvent = (event) => {
	event.preventDefault();
	if(isMouseDown.value) {
		let limit = document.body.scrollHeight - window.innerHeight;
		let deltaY = event.clientY - y;
		console.log(limit);
		// let 
		// console.log();
		// window.scrollTo({ top: 1009 });
	}
}

const addDragEvents = () => {
	scrollbar.value.addEventListener('mousemove', mousemoveEvent);
	scrollbar.value.addEventListener('mousedown', mouseDownEvent);
	scrollbar.value.addEventListener('mouseup', mouseUpEvent);
}

const removeDragEvents = () => {
	scrollbar.value.removeEventListener('mousemove', mousemoveEvent);
	scrollbar.value.removeEventListener('mousedown', mouseDownEvent);
	scrollbar.value.removeEventListener('mouseup', mouseUpEvent);
}

watch( () => store.scrollPosition, (val) => { 
		// console.log((window.innerHeight / document.body.clientHeight));
        // let scrollPercentage = (scroll / (document.body.scrollHeight - height.value)) * 100;
        scrollbar.value.style.setProperty('--vh', `${((window.innerHeight) / (document.body.scrollHeight)) * val}px`);
	},
);

watchDebounced(
	height,
	() => { 
		scrollbar_h.value = window.innerHeight * (window.innerHeight / document.body.clientHeight);
		scrollbar.value.style.setProperty( "--height", `${document?.body?.scrollHeight}px`);
		scrollbar.value.style.setProperty("--h", `${scrollbar_h.value}px`);
	},
	{ debounce: 500, maxWait: 1000 },
)

onMounted(() => {
	scrollbar.value.style.setProperty( "--height", `${document?.body?.clientHeight}px`);
	scrollbar_h.value = window.innerHeight * (window.innerHeight / document.body.clientHeight);
	scrollbar.value.style.setProperty("--h", `${scrollbar_h.value}px`);
	addDragEvents();
});

onBeforeUnmount(() => {
	removeDragEvents();
})
</script>

<style lang="scss">
.scrollbar_scrollbar {
	position: fixed;
	width: 12px;
	right: 0;
	top: 0;
    bottom: 0;
}
.scrollbar_thumb {
    width: 12.5px;
	height: var(--h);
	position: absolute;
	right: 0;
	z-index: 1000;
    transform: translateY(var(--vh));
	cursor: grab;
	background: black;
	@apply rounded-t-full rounded-b-full;
}
</style>
