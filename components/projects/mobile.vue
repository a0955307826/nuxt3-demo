<template>
    <section class="projects-mobile px-4 mb-[120px]">
		<div class="grid md:grid-cols-2 gap-5">
			<div
				class="main-mobile-image opacity-0 translate-y-[25px] lg:mb-10 rounded-[12px] overflow-hidden"
				v-for="i in image_list"
				:key="`main-mobile-image-${i}`"
			>
				<div
					class="relative aspect-w-16 aspect-h-12"
					:data-type="i"
				>
					<img
						class="w-full h-full object-cover"
						:src="`https://picsum.photos/1920/1080?random=${i}`"
						alt="cover_image"
					/>
				</div>
				<div 
					class="content px-4 py-6"
					:style="{'background-color': 'rgba(255, 255, 255, .8)'}"
				>
					<div class="title font-bold leading-[24px] text-[36px] pb-3">{{ `title${i}` }}</div>
					<div class="description font-medium text-[16px] pb-4">Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at.</div>
					<button 
						class="text-[#FFFFFF] px-4 py-3 font-bold rounded-[12px]"
						:style="{'background-color': 'rgba(29, 29, 29, .8)'}"
						>VIEW MORE
					</button>
				</div>
			</div>
		</div>
    </section>
</template>

<script setup>
const image_list = ref([1, 2, 3, 4, 5, 6, 7]);

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

// .main-mobile-image-block {
// 	position: absolute;
// 	left: 0;
// 	top: 0;
// 	z-index: 4;
// 	background: linear-gradient(45deg, #FFFFFF 0%, rgba(225, 5, 34, 0) 70%), linear-gradient(135deg, #FFFFFF 10%, rgba(49, 5, 209, 0) 80%), linear-gradient(225deg, #FFFFFF 10%, rgba(10, 219, 216, 0) 80%), linear-gradient(315deg, #050813 100%, rgba(9, 245, 5, 0) 70%);
// 	@apply w-0 h-full z-[3];
// }

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
