<template>
	<section ref="intro" class="intro overflow-hidden">
		<div 
			class="intro-left translate-x-[100vw]"
			:class="{'intro-animation': targetIsVisible}"
		>
			<div class="intro-left--image">
				<img
					width="400"
					height="400"
					src="https://fakeimg.pl/800x600/"
					alt="profile"
				/>
			</div>
		</div>
		<div 
			class="intro-right  translate-x-[100vw]"
			:class="{'intro-animation-text': targetIsVisible}"
		>
			<div class="intro-description lg:max-w-[800px]">
				<p class="text-[16px] font-semibold">{{ description }}</p>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { useIntersectionObserver } from "@vueuse/core";
	const intro = ref();
	const targetIsVisible = ref(false);
	const intersectionObserverOptions = {
        threshold: 0.6, 
	};

	const { stop } = useIntersectionObserver(
		intro,
		([{ isIntersecting }]) => {
			targetIsVisible.value = isIntersecting;
		},
		intersectionObserverOptions
	);
	watch(targetIsVisible, (val) => {
		if(val) {
			stop();
		}
	})

const description = ref(
	"Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at.Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at."
);
</script>

<style lang="scss" scoped>
.intro {
	@apply relative md:max-w-[1440px] md:mx-auto lg:px-10 px-4 md:mb-[80px] mb-10 flex lg:flex-row flex-col items-center justify-between gap-10 z-10;
}
.intro-subtitle {
	@apply flex items-center gap-2 md:mb-4 mb-2;
	&--icon {
		@apply w-8 h-8 rounded-full border-solid border-[3px] border-[#CCC];
	}
}

@keyframes intro-anamtion {
	0% {
		transform: translate(100vw, 0);
		opacity: .5;
	}
	100% {
		transform: translate(0, 0);
		opacity: 1;
	}
}

.intro-animation {
	animation: intro-anamtion .6s forwards ease-out;
}

.intro-animation-text {
	animation: intro-anamtion .6s forwards .3s ease-out;
}

.intro-title {
	@apply md:mb-4 mb-2;
}

.intro-right {
	@apply w-full h-full;
}

.intro-left {
	&--image {
		@apply sm:w-[400px] sm:h-[400px] w-[270px] h-[270px] mx-auto rounded-full overflow-hidden;
		img {
			@apply w-full h-full object-cover;
		}
	}
}
</style>
