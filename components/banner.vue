<template>
	<section ref="hero" class="hero">
		<div class="hero-banner"></div>
		<div class="hero-banner-title">HELLO WORLD!</div>
	</section>
</template>

<script setup>
import { gsap } from "gsap";
import { useGlobalStore } from "~/store";
import { watchThrottled } from "@vueuse/core";
const hero = ref();
const store = useGlobalStore();
let time1;

watchThrottled(
	() => store.scrollPosition,
	(val) => {
		if (val >= 50) {
            document.querySelector(".hero-banner-title").classList.add("hero-banner-title--animation");
		} else {
			document.querySelector(".hero-banner-title").classList.remove("hero-banner-title--animation");
		}
	},
	{ throttle: 500 }
);

onMounted(() => {
	gsap.context((self) => {
		const title = self.selector(".hero-banner-title");
		time1 = gsap.timeline({
			scrollTrigger: {
				trigger: title,
				start: "top 60%",
				end: "bottom 0",
				scrub: true,
				// markers: true
			},
		});
		time1
			.to(title, {
				scale: 1,
				y: 0,
				duration: 2,
			})
			.to(title, {
				scale: 2,
				y: 200,
				duration: 2,
			})
			.to(title, {
				scale: 3,
				y: 300,
				opacity: 0.5,
				duration: 2,
			})
			.to(title, {
				scale: 4,
				y: 400,
				opacity: 0,
				display: "none",
				duration: 2,
			});
	}, hero.value);
});
</script>

<style lang="scss" scoped>
.hero {
	@apply w-full h-[100dvh] overflow-x-hidden;
}
.hero-banner {
	@apply relative w-full h-full bg-cover bg-no-repeat bg-fixed bg-[url('https://picsum.photos/1440/900')];
}

@keyframes rainbow {
	0% {
		background-position: left;
	}
	50% {
		background-position: right;
	}
	100% {
		background-position: left;
	}
}
.hero-banner-title {
	background: linear-gradient(to right, crimson, pink, springgreen);
	background-size: 200% 200%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@apply fixed text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:text-[120px] sm:text-[68px] text-[48px] xl:whitespace-nowrap;
	&--animation {
		animation: rainbow 1.5s ease-in-out infinite;
	}
}
</style>
