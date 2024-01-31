<template>
	<section ref="main_skill" class="skill">
		<div ref="skill" class="skill-title">
			<p 
				:class="targetIsVisible ? 'skill-animation' : 'remove-skill-animation'"
				>SKILLS
			</p>
		</div>
		<div class="grid lg:gap-5 gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
			<div 
				v-for="(item, index) in skill_list" 
				:key="`skill-${index}`"
				class="skill-item"
			>
				<div class="sm:max-w-[100px] max-w-[50px] w-full sm:max-h-[100px] max-h-[50px] h-full">
					<img 
						class="w-full h-full object-contain" 
						:src="`/images/${item.img}`" 
						:alt="item.alt"
					>
				</div>
				<p class="tracking-wider font-medium">{{ item.name }}</p>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { useIntersectionObserver } from '@vueuse/core';
	import { useGlobalStore } from "~/store"; 
	const store = useGlobalStore();
    const skill = ref();
	const main_skill = ref();
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
			name: 'SCSS',
			img: 'icon-sass.svg',
			alt: 'sass'
		},
		{
			name: 'GSAP',
			img: 'icon-gsap.svg',
			alt: 'gsap'
		},
	])

	const initObserver = () => {
		const skill_item = document.querySelectorAll('.skill-item');
		const options = {
			rootMargin: '100px 0px',
			threshold: 0.8
		}
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if(entry.isIntersecting) {
						entry.target.classList.add('skill-card-animation');
						entry.target.classList.remove('remove-skill-card-animation');
					} 
					else {
						entry.target.classList.add('remove-skill-card-animation');
						entry.target.classList.remove('skill-card-animation');
					}
				});
			},
			options
		);
		skill_item.forEach((el) => {
			observer.observe(el);
		});
	}

	onMounted(() => {
		initObserver();
	});
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
		@apply border-[2px] border-solid border-white lg:gap-5 gap-3 flex items-center justify-center flex-col sm:py-[50px] py-[30px] sm:px-[20px] px-[10px] duration-300;
		&:hover {
			@apply border-[#2e2e2e] bg-white;
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

	@keyframes imageOpacity {
		0% {
			transform: translateY(50px);
			opacity: 0;
		}

		100% {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes removeOpacity {
		0% {
			transform: translateY(0);
			opacity: 1;
		}

		100% {
			transform: translateY(50px);
			opacity: 0;
		}
	}

	.skill-animation {
		animation: project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}

	.remove-skill-animation {
		animation: remove-project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}

	.skill-card-animation {
		animation: imageOpacity 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}

	.remove-skill-card-animation {
		animation: removeOpacity 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
	}
</style>