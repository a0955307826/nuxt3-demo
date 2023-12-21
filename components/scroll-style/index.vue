<template>
	<div class="scrollbar_scrollbar overflow-hidden" ref="scrollbar">
		<div class="scrollbar_thumb" ref="scrollbarThumbEl"></div>
	</div>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { useGlobalStore } from "~/store";
const store = useGlobalStore();
const { height } = useWindowSize();
const scrollbarThumbEl = ref(null);
const scrollbar = ref(null);
const scrollbar_h = ref(0);

watch( () => store.scrollPosition, (val) => { 
        console.log(val);
        // let scrollPercentage = (scroll / (document.body.scrollHeight - height.value)) * 100;
        scrollbar.value.style.setProperty('--vh', `${((window.innerHeight) / (document.body.scrollHeight)) * val}px`);
	} 
);

watch(height, () => {
	scrollbar.value.style.setProperty(
		"--height",
		`${document?.body?.scrollHeight}px`
	);
});

onMounted(() => {
	scrollbar.value.style.setProperty(
		"--height",
		`${document?.body?.clientHeight}px`
	);
	scrollbar_h.value = window.innerHeight * (window.innerHeight / document.body.clientHeight);
	scrollbar.value.style.setProperty("--h", `${scrollbar_h.value}px`);
});
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
