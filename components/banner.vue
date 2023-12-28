<template>
	<section ref="hero" class="hero">
		<div class="hero-banner"></div>
		<div class="hero-banner-title">HELLO WORLD</div>
		<div 
			@click="go_to_intro"
			class="hero-scroll-down"
			:class="{ 'opacity-0 pointer-events-none': store.scrollPosition >= 80 }"
		>
			<img 
				class="md:w-[32px] w-[24px] md:h-[32px] h-[24px]" 
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

const go_to_intro = () => {
	window.scrollTo({ top: store.getIntroHeight - 50, behavior: "smooth" });
}

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
				trigger: '.hero',
				start: "10% center",
				end: "72% center",
				scrub: true,
				// markers: true
			},
		});
		time1
			.to(title, {
				scale: 1,
				duration: 1,
			})
			.to(title, {
				scale: 2,
				opacity: 0.8,
				duration: 1,
			})
			.to(title, {
				scale: 3,
				opacity: 0.5,
				duration: 1,
			})
			.to(title, {
				scale: 4,
				opacity: 0,
				duration: 1,
			});
	}, hero.value);
});

onBeforeUnmount(() => {
	time1.kill();
})
</script>

<style lang="scss" scoped>
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
.hero {
	@apply relative w-full h-[100dvh] overflow-x-hidden;
}
.hero-banner {
	@apply relative w-full h-full bg-cover bg-no-repeat bg-fixed bg-[url('https://picsum.photos/1440/900?image=0')];
}

.hero-banner-title {
	background: linear-gradient(to right, crimson, pink, springgreen);
	background-size: 200% 200%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	@apply fixed text-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:leading-none sm:leading-[80px] leading-[60px] lg:text-[120px] sm:text-[80px] text-[60px] lg:whitespace-nowrap pointer-events-none;
	&--animation {
		animation: rainbow 1s ease-in-out infinite;
	}
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
