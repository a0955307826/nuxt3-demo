<template>
	<section ref="hero" class="hero w-full h-[100dvh]">
		<div class="hero-banner aspect-w-[1440] aspect-h-[900]">
			<img 
				width="1440"
				height="900"
				class="absolute w-full h-full object-cover" 
				src="https://picsum.photos/1440/900?image=0" 
				alt="cover_image"
			>
		</div>
		<div 
			class="hero-banner-title">
			<div class="title1">I'm Ray,</div>
			<div class="title2">a coder.</div>
		</div>
		<div class="hero-banner-title--move hidden">
			<div>I'm Ray,</div>
			<div>a coder.</div>
		</div>
		<div 
			@click="go_to_intro"
			class="hero-scroll-down caret-transparent"
			:class="{ 'opacity-0 pointer-events-none': store.scrollPosition >= 80 }"
		>
			<img 
				class="md:w-[32px] w-[24px] md:h-[32px] h-[24px] pointer-events-none" 
				:class="{ 'opacity-0': store.scrollPosition >= 80 }"
				src="/images/icon-arrow-down.svg" 
				alt="icon-arrow-down"
			>
		</div>
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
		if (val >= 0) {
            document.querySelector(".hero-banner-title").classList.add("hidden");
			document.querySelector(".hero-banner-title--move").classList.remove("hidden");
		} 
	},
	{ throttle: 500 }
);

const go_to_intro = () => {
	window.scrollTo({ top: store.getIntroHeight - 100, behavior: "smooth" });
}

onMounted(() => {
	gsap.context((self) => {
		const title = self.selector(".hero-banner-title--move");
		const hero = self.selector(".hero");
		time1 = gsap.timeline({
			scrollTrigger: {
				trigger: hero,
				start: "10% center",
				end: "45% center",
				scrub: true,
				// markers: true
			},
		});
		time1
			.to(title, {
				scale: 1,
				opacity: 1,
			})
			.to(title, {
				scale: 2,
				opacity: 0.8,
			})
			.to(title, {
				scale: 2.5,
				opacity: 0.5,
			})
			.to(title, {
				scale: 3,
				opacity: 0,
			});
	}, hero.value);
});

onBeforeUnmount(() => {
	time1.kill();
})
</script>

<style lang="scss" scoped>

@keyframes scale-opacity {
	0% {
		scale: 1;
		opacity: 1;
	}
	100% {
		scale: 1.8;
		opacity: 0;
	}
}

.hero-banner {
	@apply relative w-full h-full;
}

@keyframes textWidth {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
.hero-banner-title {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	text-shadow: 5px 5px #8DAA9D;
	@apply absolute text-center text-white font-black lg:leading-[130px] sm:leading-[80px] leading-[60px] lg:text-[120px] sm:text-[80px] text-[60px] whitespace-nowrap;
}

.title1 {
	overflow: hidden;
	animation: textWidth 1s both steps(30) .5s;
}

.title2 {
	overflow: hidden;
	animation: textWidth 1s both steps(30) 1.5s;
}

.hero-banner-title--move {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	text-shadow: 5px 5px #8DAA9D;
	@apply fixed text-center text-white font-black lg:leading-[130px] sm:leading-[80px] leading-[60px] lg:text-[120px] sm:text-[80px] text-[60px] whitespace-nowrap;
}

.hero-scroll-down {
	@apply md:w-[80px] w-[50px] md:h-[80px] h-[50px] fixed bottom-[50px] left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-white cursor-pointer duration-200;
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0%;
		z-index: -1;
		@apply md:w-[80px] w-[50px] md:h-[80px] h-[50px] bg-white rounded-full;
	}
	&:hover {
		&::after {
			animation: scale-opacity 1s linear infinite;
		}
	}
}
</style>
