<template>
	<section 
		ref="intro" 
		class="intro"
	>
		<div 
			class="intro-wrap"
			:class="targetIsVisible ? 'intro-animation scale-0' : 'intro-animation-leave scale-100'"
		>
			<div class="intro-left">
				<div class="intro-left--image">
					<img
						width="400"
						height="400"
						src="https://picsum.photos/800/600"
						alt="profile"
					/>
				</div>
			</div>
			<div class="intro-right">
				<div class="font-bold text-[24px] pb-3">Hello, I'm Ray</div>
				<p class="text-[16px] font-semibold pb-4">{{ description }}</p>
				<button 
					class="btn sm:w-fit flex justify-center text-[#FFFFFF] px-4 py-3 font-medium rounded-[12px] duration-300"
					:style="{'background-color': 'rgba(29, 29, 29, .6)'}"
				>
					<p class="relative font-bold tracking-wider w-fit z-10">CONTACT ME</p>
				</button>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { useGlobalStore } from "~/store"; 
	import { useIntersectionObserver, watchThrottled, useWindowSize } from "@vueuse/core";
	const store = useGlobalStore();
	const intro = ref();
	const { width, height } = useWindowSize();
	const targetIsVisible = ref(false);
	const intersectionObserverOptions = {
        threshold: 0.5, 
	};

	const { stop } = useIntersectionObserver(
		intro,
		([{ isIntersecting }]) => {
			targetIsVisible.value = isIntersecting;
		},
		intersectionObserverOptions
	);

	watchThrottled(
		height,
		() => {
			store.getIntroHeight = intro.value.offsetTop;
		},
		{ throttle: 500 }
	);

	const description = ref(
		"Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at.Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at."
	);

	onMounted(() => {
		store.getIntroHeight = intro.value.offsetTop;
	})
</script>

<style lang="scss" scoped>
.intro {
	@apply lg:mx-10 mx-4 mb-[120px];
}
.intro-wrap {
	@media (min-width: 992px) {
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
	}
	@apply relative w-fit md:mx-auto md:mb-[80px] flex lg:flex-row flex-col items-center justify-center rounded-[12px] overflow-hidden;
}

@keyframes intro-animation {
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes intro-animation-leave {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}

.intro-animation {
	animation: intro-animation .5s forwards ease-in-out;
}

.intro-animation-leave {
	animation: intro-animation-leave .5s forwards ease-in-out;
}

.intro-title {
	@apply md:mb-4 mb-2;
}

.intro-right {
	@media (max-width: 992px) {
		box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
		border-radius: 12px;
	}
	background-color: rgba(255, 255, 255, .8);
	@apply flex justify-center flex-col lg:max-w-[800px] lg:min-h-[300px] w-full h-full text-[#1d1d1d] lg:p-6 p-4 lg:rounded-r-[12px];
}

.intro-left {
	&--image {
		@media (max-width: 992px) {
			box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
			border-radius: 12px;
		}
		@apply lg:w-[300px] lg:h-[300px] w-[200px] h-[200px] lg:rounded-l-[12px] lg:mb-0 mb-6  mx-auto overflow-hidden;
		img {
			@apply w-full h-full object-cover;
		}
	}
}

.btn {
	position: relative;
	overflow: hidden;
	&::after {
		@apply duration-300 lg:translate-x-[-200px];
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-radius: 12px;
		background: #1D1D1D;
	}
	&:hover {
		&::after {
			transform: translateX(0);
		}
	}
}
</style>
