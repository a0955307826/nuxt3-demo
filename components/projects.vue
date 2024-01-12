<template>
	<section class="relative w-full lg:h-[90dvh] mb-[120px] overflow-hidden">
		<div class="lg:hidden aspect-w-16 aspect-h-9"></div>
		<img 
			v-for="i in image_list"
			:key="`big-image-${i}`"
			class="absolute top-0 left-0 object-cover w-full lg:h-full h-[calc(100%-220px)] lg:rounded-r-[32px]" 
			:class="flickingIndex + 1 === i ? set_image_animation : set_image_block_animation"
			:src="`https://picsum.photos/1920/1080?random=${i}`" 
			alt="cover_image"
		>
		<div 
			v-if="width >= 992"
			class="max-w-[1440px] mx-auto h-full z-10"
		>
			<div class="w-full h-full gap-[80px] flex items-center">
				<div 
					v-for="i in image_list"
					:key="`text-${i}`"
					v-show="flickingIndex + 1 === i"
					class="relative intro max-w-[800px] text-[#FFFFFF] opacity-0"
					:class="{ 'text-animation': flickingIndex + 1 === i }"
				>
					<div class="title font-bold leading-[50px] text-[68px] pb-6">{{ `title${i}` }}</div>
					<div class="description font-medium text-[16px] pb-4">Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at.</div>
					<button class="px-4 py-3 font-bold bg-black rounded-[20px]">VIEW MORE</button>
				</div>
				<div class="relative">
					<Flicking 
						ref="flicking"
						:options="{
							align: { camera: '0%', panel: '480px' },
							moveType: 'strict',
							circular: true,
							interruptable: false,
						}" 
						@will-change="flickingChange"
					>
						<div 
							v-for="i in 7" 
							:key="i"
							class="card-panel"
						>
							<img 
								width="480"
								height="300"
								class="w-full h-full object-cover pointer-events-none" 
								:src="`https://picsum.photos/1920/1080?random=${i}`" 
								alt="flicking-image"
							>
						</div>
					</Flicking>
					<div class="w-full flex justify-between items-start absolute right-10 bottom-[-90px]">
						<div class="title font-bold text-white leading-[50px] text-[50px] ml-20 pb-6">{{ `title${get_image_index}` }}</div>
						<div class="flex gap-4">
							<div 
								class="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center caret-transparent cursor-pointer"
								@click="prev_image"
							>
								<img 
									class="rotate-[-180deg]"  
									src="/images/arrow.svg" 
									alt="icon-arrow"
								>
							</div>
							<div 
								class="w-[50px] h-[50px] rounded-full bg-black flex items-center justify-center caret-transparent cursor-pointer"
								@click="next_image"
							>
								<img 
									src="/images/arrow.svg" 
									alt="icon-arrow"
								>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full overflow-hidden" v-else>
			<div 
				v-for="i in image_list"
				:key="`text-${i}`"
				v-show="flickingIndex + 1 === i"
				class="relative intro text-black opacity-0 mb-5 px-4"
				:class="{ 'text-animation': flickingIndex + 1 === i }"
			>
				<div class="title font-bold leading-[32px] text-[32px] pb-4">{{ `title${i}` }}</div>
				<div class="description font-medium text-[16px] pb-4">Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea.</div>
				<button class="px-4 py-2 font-bold bg-[green] rounded-[20px]">VIEW MORE</button>
			</div>
			<Flicking 
				ref="flicking"
				:options="{
					align: { camera: '0%', panel: '210px' },
					moveType: 'strict',
					circular: true,
					interruptable: false,
				}" 
				@will-change="flickingChange"
			>
				<div 
					v-for="i in 7" 
					:key="i"
					class="card-panel"
				>
					<img 
						width="480"
						height="300"
						class="w-full h-full object-cover pointer-events-none" 
						:src="`https://picsum.photos/1920/1080?random=${i}`" 
						alt="flicking-image"
					>
				</div>
			</Flicking>
		</div>
	</section>
</template>

<script setup>
	import Flicking from "@egjs/vue3-flicking";
	import "@egjs/vue3-flicking/dist/flicking.css";
	import { useWindowSize } from '@vueuse/core';
    const { width } = useWindowSize();

	const flickingIndex = ref(0);
	const image_list = ref([1, 2, 3, 4, 5, 6, 7]);

	// element
	const flicking = ref();

	const get_image_index = computed(() => {
		if(image_list.value.length < flickingIndex.value + 2) {
			return 1;
		}
		return flickingIndex.value + 2;
	});

	const set_image_animation = computed(() => {
		if(width.value >= 992) {
			return 'image-animation';
		}
		return 'image-animation-mobile'; 
	})

	const set_image_block_animation = computed(() => {
		if(width.value >= 992) {
			return 'image-block';
		}
		return 'image-block-mobile'; 
	});

	const prev_image = () => {
		flicking.value.prev();
	}
	const next_image = () => {
		flicking.value.next();
	}

	const flickingChange = (ele) => {
		flickingIndex.value = ele.index;
	}
</script>

<style lang="scss" scoped>
@keyframes imageWidth {
	0% {
		width: 0;
	}
	100% {
		width: 60%;
	}
}

@keyframes imageWidthMobile {
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
}

@keyframes imageBlock {
	0% {
		width: 60%;
	}
	100% {
		width: 0%;
	}
}

@keyframes imageBlockMobile {
	0% {
		width: 100%;
	}
	100% {
		width: 0;
	}
}

@keyframes textMove {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
.image-animation {
	animation: imageWidth .6s both .4s;
}

.image-animation-mobile {
	animation: imageWidthMobile .6s both .4s;
}

.text-animation {
	animation: textMove .5s both .7s;
}

.image-block {
	animation: imageBlock .6s both;
}

.image-block-mobile {
	animation: imageBlockMobile .4s both;
}

.card-panel {
	@apply lg:max-w-[480px] max-w-[200px] w-full lg:max-h-[300px] max-h-[200px] h-full lg:rounded-[32px] mr-[20px] cursor-grab active:cursor-grabbing overflow-hidden;
}
</style>