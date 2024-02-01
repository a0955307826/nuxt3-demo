<template>
    <TheHeader :key="store.is_header_display" />
    <slot />
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGlobalStore } from "~/store";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const store = useGlobalStore();
</script>

<style>

</style>
