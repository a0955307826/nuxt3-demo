<template>
	<section class="skill">
		<div ref="skill" class="skill-title">
			<p 
				:class="targetIsVisible ? 'skill-animation' : 'remove-skill-animation'"
				>SKILLS
			</p>
		</div>
		<div class="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
			<div 
				v-for="(item, index) in skill_list" 
				:key="`skill-${index}`"
				class="skill-item"
			>
				<div class="max-w-[100px] h-[100px]">
					<img 
						class="w-full h-full object-contain" 
						:src="`/images/${item.img}`" 
						:alt="item.alt"
					>
				</div>
				<p>{{ item.name }}</p>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { useIntersectionObserver } from '@vueuse/core';
    const skill = ref();
    const targetIsVisible = ref(false);
	const intersectionObserverOptions = {
        threshold: 0.5, 
	};

    const { stop } = useIntersectionObserver(
		skill,
		([{ isIntersecting }]) => {
			targetIsVisible.value = isIntersecting;
		},
		intersectionObserverOptions
	);
	// html css js vue nuxt tailwind GSAP scss
	const skill_list = ref([
		{
			name: 'HTML',
			img: 'icon-html.svg',
			alt: 'html'
		},
		{
			name: 'CSS',
			img: 'icon-css.svg',
			alt: 'css'
		},
		{
			name: 'JAVASCRIPT',
			img: 'icon-javascript.svg',
			alt: 'javascript'
		},
		{
			name: 'VUE',
			img: 'icon-vue.svg',
			alt: 'vue'
		},
		{
			name: 'NUXT',
			img: 'icon-nuxt.svg',
			alt: 'nuxt'
		},
		{
			name: 'TAILWIND',
			img: 'icon-tailwind.svg',
			alt: 'tailwind'
		},
		{
			name: 'SASS / SCSS',
			img: 'icon-sass.svg',
			alt: 'sass'
		},
		{
			name: 'GSAP',
			img: 'icon-gsap.svg',
			alt: 'gsap'
		},
	])
</script>

<style lang="scss" scoped>
	.skill {
		@apply relative max-w-[1440px] mx-auto lg:px-10 px-4;
	}

	.skill-title {
		@apply relative w-fit max-w-[1440px] mx-auto font-bold tracking-wider lg:text-[120px] sm:text-[60px] text-[48px] z-10 lg:px-0 px-4 lg:mb-0 mb-6 overflow-hidden;
		text-shadow: 0px 3px 0px #F0f0f0, 0px 14px 10px rgba(0, 0, 0, 0.15),
		0px 24px 2px rgba(0, 0, 0, 0.1), 0px 24px 30px rgba(0, 0, 0, 0.1);
        p {
            overflow: hidden;
        }
	}

	.skill-item {
		box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
		font-weight: bold;
		cursor: pointer;
		border-radius: 12px;
		background-color: rgba(255, 255, 255, .8);
		@apply border-[2px] border-solid border-white gap-5 flex items-center justify-center flex-col py-[50px] px-[20px] duration-300;
		img {
			@media (min-width: 992px) {
				filter: invert(0.3);
				@apply duration-300;
			}
		}
		&:hover {
			@apply border-[#2e2e2e] bg-white;
			img {
				filter: invert(0);
			}
		}
	}

	@keyframes project-animation {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes remove-project-animation {
		0% {
			width: 100%;
		}
		100% {
			width: 0;
		}
	}

	.skill-animation {
		animation: project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}

	.remove-skill-animation {
		animation: remove-project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}
</style>