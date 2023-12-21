<template>
	<TheHeader />
	<slot />
	<ScrollStyle />
</template>

<script setup>
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin";
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	

</script>

<style lang="scss">
	html, body {
		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
