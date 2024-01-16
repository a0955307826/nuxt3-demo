<template>
	<section class="intro">
		<div class="intro-left">
			<div class="intro-description lg:max-w-[580px]">
				<p class="text-[16px]">{{ description }}</p>
			</div>
		</div>
		<div class="intro-right">
			<div class="intro-right--image">
				<img 
					width="400"
					height="400"
					src="https://fakeimg.pl/800x600/" 
					alt="profile"
				>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { useGlobalStore } from '~/store';
	import { useWindowSize, watchDebounced } from '@vueuse/core';
	
	const { width, height } = useWindowSize();
	const store = useGlobalStore();
	const description = ref("Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at.Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at.");
	onMounted(() => {
		store.getIntroHeight = document.querySelector('.intro').offsetTop;
	})
</script>

<style lang="scss" scoped>
	.intro {
		@apply relative md:max-w-[1440px] md:mx-auto lg:px-10 px-4 md:mb-[80px] mb-10 flex md:flex-row flex-col-reverse items-center justify-between gap-4 z-10;
	}
	.intro-subtitle {
		@apply flex items-center gap-2 md:mb-4 mb-2;
		&--icon {
			@apply w-8 h-8 rounded-full border-solid border-[3px] border-[#CCC];
		}
	}

	.intro-title {
		@apply md:mb-4 mb-2
	}

	.intro-left {
		@apply w-full h-full md:px-0 px-4;
	}

	.intro-right {
		&--image {
			@apply sm:w-[400px] sm:h-[400px] w-[270px] h-[270px] mx-auto rounded-full overflow-hidden;
			img {
				@apply  w-full h-full object-cover;
			}
		}
	}
</style>
