<template>
	<section class="relative w-full lg:h-[90dvh] mb-[120px] overflow-hidden">
		<!-- <div class="absolute aspect-w-16 aspect-h-9 bg-[#CCC]"></div> -->
		<div 
			class="image-block absolute left-0 top-0 w-0 h-full lg:rounded-r-[32px] z-[3]"
			:style="{'background': 'linear-gradient(to right, #23b9ff, #8623ff, #ff116c)'}"
		>
		</div>
		<div 
			class="image-animation absolute left-0 top-0 w-[60%] h-full lg:rounded-r-[32px] z-[4]"
			:style="{'background-color': 'white'}"
		>
		</div>
		<img 
			v-for="i in image_list"
			:key="`big-image-${i}`"
			class="lg:block hidden absolute top-0 left-0 object-cover w-[60%] h-full lg:rounded-r-[32px] z-[2]" 
			:src="`https://picsum.photos/1920/1080?random=${i}`" 
			alt="cover_image"
		>
		<!-- :class="flickingIndex + 1 === i ? 'image-animation' : 'image-block'" -->
		<div 
			v-if="width >= 992"
			class="max-w-[1440px] mx-auto h-full z-10"
		>
			<div class="w-full h-full gap-[80px] flex items-center pl-10">
				<div 
					v-for="i in image_list"
					:key="`text-${i}`"
					v-show="flickingIndex + 1 === i"
					class="relative intro max-w-[800px] text-[#1d1d1d] opacity-0 translate-y-[25px] rounded-[12px]"
					:style="{'background-color': 'rgba(255, 255, 255, .8)'}"
				>
				<!-- :class="{ 'text-animation p-8': flickingIndex + 1 === i }" -->
					<div class="title font-bold leading-[50px] text-[68px] pb-6">{{ `title${i}` }}</div>
					<div class="description font-medium text-[16px] pb-4">Lorem ipsum dolor sit amet, audire periculis efficiantur vix cu, ius dico omnesque maluisset ea. Sanctus accusata partiendo vim eu. Eu eum tation deseruisse, detraxit mediocritatem per at. Pri cu placerat fabellas disputando, in his magna populo fastidii. Adipisci consequat necessitatibus nec ex. Dictas omittam no vel, mel euismod molestie at.</div>
					<button 
						class="text-[#FFFFFF] px-4 py-3 font-bold rounded-[20px]"
						:style="{'background-color': 'rgba(29, 29, 29, .8)'}"
						>VIEW MORE
					</button>
				</div>
				<div class="relative opacity-0">
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
							class="card-panel brightness-50 hover:brightness-100 duration-300"
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
					<div class="w-full flex justify-between items-start absolute right-10 bottom-[-30px] z-10">
						<div 
							class="title font-bold text-[#1d1d1d] leading-[20px] text-center text-[24px] ml-20 py-4 px-4 rounded-[8px] overflow-hidden"
							:class="isTextOpacity ? 'opacity-0 translate-y-[25px]' : 'opacity-100 translate-y-0 delay-500 duration-500'"
							:style="{'background-color': 'rgba(255, 255, 255, .8)'}"
						>
							<p>{{ `title${get_image_index}` }}</p>
						</div>
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
	</section>
</template>

<script setup>
	import Flicking from "@egjs/vue3-flicking";
	import "@egjs/vue3-flicking/dist/flicking.css";
	import { useWindowSize, watchDebounced } from '@vueuse/core';
    const { width } = useWindowSize();

	const flickingIndex = ref(0);
	const image_list = ref([1, 2, 3, 4, 5, 6, 7]);
	const isTextOpacity = ref(false);
	const timeout = ref(0);

	// element
	const flicking = ref();

	const get_image_index = computed(() => {
		if(image_list.value.length < flickingIndex.value + 2) {
			return 1;
		}
		return flickingIndex.value + 2;
	});

	const prev_image = () => {
		flicking.value.prev();
	}
	const next_image = () => {
		flicking.value.next();
	}

	const flickingChange = (ele) => {
		clearTimeout(timeout.value);

		flickingIndex.value = ele.index;
		isTextOpacity.value = true;

		timeout.value = setTimeout(() => {
			isTextOpacity.value = false;
		}, 300);
	}
</script>

<style lang="scss" scoped>
@keyframes imageWidth {
	0% {
		left: 0%;
		width: 60%;
	}

	100% {
		left: 60%;
		width: 0%;
	}
}




@keyframes imageBlock {
	0% {
		left: 0%;
		width: 0%;
	}

	50% {
		left: 0%;
		width: 60%;
	}

	100% {
		left: 60%;
		width: 0%;
	}
}

@keyframes textMove {
	0% {
		opacity: 0;
		transform: translateY(25px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
.image-animation {
	animation: imageWidth .6s cubic-bezier(0.5, 1, 0.2, 1) forwards 1s;
}

.image-block {
	animation: imageBlock 1.2s cubic-bezier(0.5, 1, 0.2, 1) forwards 1s;
}

.text-animation {
	animation: textMove .5s both .7s;
}

.card-panel {
	@apply lg:max-w-[480px] max-w-[200px] w-full lg:max-h-[300px] max-h-[200px] h-full lg:rounded-[32px] lg:mr-5 mr-4 cursor-grab active:cursor-grabbing overflow-hidden;
}
</style>