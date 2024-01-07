<template>
	<TheHeader />
	<slot />
</template>

<script setup>
	import gsap from "gsap";
	import { ScrollTrigger } from "gsap/ScrollTrigger";
	import { ScrollToPlugin } from "gsap/ScrollToPlugin";
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
</script>

<style lang="scss">

</style>
