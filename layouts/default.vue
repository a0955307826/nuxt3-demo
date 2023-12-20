<template>
	<div>
		<TheHeader />
		<slot />
	</div>
</template>

<script setup>
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin";
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	// import LocomotiveScroll from 'locomotive-scroll';
	// const locomotiveScroll = new LocomotiveScroll();
</script>

<style scoped></style>
