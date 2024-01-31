<template>
	<section ref="hero" class="hero h-[150vh]">
		<div 
			class="hero-banner"
			:class="{ 'banner-anmation': is_banner_show}"
		>
			<img 
				width="1440"
				height="900"
				class="w-full h-full object-cover" 
				src="/images/banner.webp" 
				alt="cover_image"
			>
		</div>
		<div 
			class="hero-banner-title">
			<div class="title1">I'm Ray</div>
			<div class="title2">A Frontend</div>
			<div class="title3">Developer</div>
		</div>
		<div class="hero-banner-title--move hidden">
			<div>I'm Ray</div>
			<div>A Frontend</div>
			<div>Developer</div>
		</div>
		<ScrollDown :is_scroll_down="is_scroll_down"/>
	</section>
</template>

<script setup>
import { gsap } from "gsap";
import { useGlobalStore } from "~/store";
import { watchThrottled, useWindowSize } from "@vueuse/core";
const { width, height } = useWindowSize();
const hero = ref();
const store = useGlobalStore();
const is_scroll_down = ref(false);
const is_banner_show = ref(false);
let time1;
let timeout;

const initGsap = () => {
	gsap.context((self) => {
		const title = self.selector(".hero-banner-title--move");
		const hero = self.selector(".hero");
		time1 = gsap.timeline({
			scrollTrigger: {
				trigger: hero,
				start: "start center",
				end: `+=${store.getIntroHeight - 150}px center`,
				scrub: true,
				// markers: true
			},
		});
		time1
			.to(title, {
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
				opacity: 1,
				scale: 1,
			})
			.to(title, {
				opacity: 0.5,
				scale: 1.5,
			})
			.to(title, {
				opacity: 0,
				scale: 2,
			})
	}, hero.value);
}

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

watchThrottled(
	width,
	() => {
		if(time1) {
			time1.kill();
			initGsap();
		}
	},
	{ throttle: 500 }
);

watchThrottled(
	() => store.getIntroHeight,
	() => {
		if(time1) {
			time1.kill();
			initGsap();
		}
	},
	{ throttle: 500 }
);

onMounted(() => {
	const animationEnd = document.querySelector('.title3');
	const is_banner_title = document.querySelector(".hero-banner-title .hidden")?.classList.contains('hidden')
	if(store.scrollPosition > 0) {
		document.querySelector(".hero-banner-title")?.classList.add("hidden");
		document.querySelector(".hero-banner-title--move")?.classList.remove("hidden");
	}
	if(!is_banner_title) {
		document.body.classList.add('scroll-lock');
		animationEnd.addEventListener('animationend', () => {
			document.body.classList.remove('scroll-lock');
			is_scroll_down.value = true;
			is_banner_show.value = true;
			store.is_header_display = true;
			initGsap();
		});
	}
});

onBeforeUnmount(() => {
	if(time1) {
		time1.kill();
	}
	clearTimeout(timeout);
})
</script>

<style lang="scss" scoped>

@keyframes textWidth {
	0% {
		width: 0;
		transform: scale(2.5);
	}
	100% {
		width: 100%;
		transform: scale(1);
	}
}

@keyframes bannerInitAnimation {
	0% {
		opacity: 0;
	}
	100% {
		opacity: .4;
	}
}

.hero-banner {
	@apply fixed top-0 left-0 w-full h-full overflow-hidden opacity-0;
}

.banner-anmation {
	animation: bannerInitAnimation 2s forwards;
}

.hero-banner-title {
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
	text-shadow: 0px 3px 0px #F0f0f0, 0px 14px 10px rgba(0, 0, 0, 0.15),
		0px 24px 2px rgba(0, 0, 0, 0.1), 0px 24px 30px rgba(0, 0, 0, 0.1);
		@apply mx-auto fixed tracking-widest font-black lg:leading-[150px] ms:leading-[100px] xs:leading-[80px] leading-[60px] lg:text-[120px] ms:text-[80px] sm:text-[60px] text-[40px] whitespace-nowrap;
}

.title1 {
	overflow: hidden;
	animation: textWidth 1s both steps(50);
	// animation: textWidth 1.2s both steps(50);
}

.title2 {
	overflow: hidden;
	animation: textWidth .8s both steps(50) .8s;
	// animation: textWidth 1s both steps(50) 1s;
}

.title3 {
	overflow: hidden;
	animation: textWidth .8s both steps(50) 1.6s;
	// animation: textWidth 1s both steps(50) 2s;
}

.hero-banner-title--move {
	text-shadow: 0px 3px 0px #F0f0f0, 0px 14px 10px rgba(0, 0, 0, 0.15),
		0px 24px 2px rgba(0, 0, 0, 0.1), 0px 24px 32px rgba(0, 0, 0, 0.1);
	@apply mx-auto fixed tracking-widest font-black lg:leading-[150px] ms:leading-[100px] xs:leading-[80px] leading-[60px] lg:text-[120px] ms:text-[80px] sm:text-[60px] text-[40px] whitespace-nowrap;
}
</style>
