<template>
    <section ref="projects_mobile" class="projects-mobile px-4 mb-[120px]">
		<div class="grid md:grid-cols-2 gap-5">
			<div
				class="main-mobile-image opacity-0 translate-y-[25px] lg:mb-10 rounded-[12px] overflow-hidden"
				v-for="(item, index) in image_list"
				:key="`main-mobile-image-${index}`"
			>
				<div class="relative aspect-w-16 aspect-h-12">
					<img
						class="w-full h-full object-cover"
						:src="item.image"
						alt="cover_image"
					/>
				</div>
				<div 
					class="content px-4 py-6"
					:style="{'background-color': 'rgba(255, 255, 255, .8)'}"
				>
					<div class="title font-bold leading-[24px] text-[36px] pb-3">{{ item.name }}</div>
					<div class="description font-medium text-[16px] pb-4">Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at.</div>
					<NuxtLink class="w-fit" :to="item.url" target="_blank">
						<button 
							class="text-[#FFFFFF] px-4 py-3 font-bold rounded-[12px]"
							:style="{'background-color': 'rgba(29, 29, 29, .8)'}"
							>VIEW MORE
						</button>
					</NuxtLink>
				</div>
			</div>
		</div>
    </section>
</template>

<script setup>
const projects_mobile = ref();
const image_list = computed(() => [
	{
		name: "Welend",
		image: "/images/welend.png",
		description: "",
		url: "https://www.welend.hk/",
	},
	{
		name: "Hkadc",
		image: "/images/hkadc.png",
		description: "",
		url: "https://hkadc-islandsouth.hk/",
	},
	{
		name: "Medisana",
		image: "/images/medisana.png",
		description: "",
		url: "https://hk.medisanaapac.com/",
	},
	{
		name: "Wynn",
		image: "/images/wynn.jpeg",
		description: "",
		url: "https://www.wynnresortsmacau.com/zh-hk/wynn-macau"
	},
	{
		name: "Yidan",
		image: "/images/yidan.png",
		description: "",
		url: "https://yidanprize.org/"
	},
	{
		name: "Ego",
		image: "/images/ego.png",
		description: "https://www.ego-finance.com/",
		url: "https://www.ego-finance.com/"
	},
	{
		name: "Muster",
		image: "/images/muster.png",
		description: "",
		url: "https://www.calligoapp.com/"
	},
]);

const initObserver = () => {
	const main_mobile_block = document.querySelectorAll('.main-mobile-image');
	const options = {
		rootMargin: '100px 0px',
		threshold: 0.8
	}
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
				if(entry.isIntersecting) {
					entry.target.classList.add('image-animation');
					entry.target.classList.remove('remove-image-animation');
				} 
				else {
					entry.target.classList.add('remove-image-animation');
					entry.target.classList.remove('image-animation');
				}
            });
        },
        options
    );
	main_mobile_block.forEach((el) => {
		observer.observe(el);
	});
}

onMounted(() => {
    // set_image_list();
	initObserver();
});
</script>

<style lang="scss" scoped>
@keyframes imageOpacity {
	0% {
		transform: translateY(25px);
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
		transform: translateY(25px);
		opacity: 0;
	}
}

.projects-mobile {
    @apply lg:hidden relative;
}

.image-animation {
	animation: imageOpacity 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.remove-image-animation {
	animation: removeOpacity 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}
</style>
