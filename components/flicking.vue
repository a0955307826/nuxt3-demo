<template>
	<section class="relative w-full h-[100dvh] mb-[120px] overflow-hidden">
		<img 
			v-for="i in image_list"
			:key="`big-image-${i}`"
			class="absolute h-full object-cover rounded-r-[32px]" 
			:class="flickingIndex + 1 === i ? 'image-animation' : 'image-block'"
			:src="`https://picsum.photos/1920/1080?random=${i}`" 
			alt=""
		>
		<div class="max-w-[1200px] h-full mx-auto">
			<div class="w-full h-full gap-[40px] flex items-center">
				<div 
					v-for="i in image_list"
					:key="`text-${i}`"
					v-show="flickingIndex + 1 === i"
					class="relative intro shrink-0 max-w-[600px] text-[#FFFFFF] pl-[40px] opacity-0"
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
							interruptable: false
						}" 
						@will-change="flickingChange"
					>
						<div 
							v-for="i in 10" 
							:key="i"
							class="card-panel"
						>
							<img 
								width="480"
								height="300"
								class="w-full h-full object-cover pointer-events-none" 
								:src="`https://picsum.photos/1920/1080?random=${i}`" 
								alt=""
							>
						</div>
					</Flicking>
					<div class="flex gap-[12px] absolute right-0 bottom-[-100px]">
						<span 
							class="w-[50px] h-[50px] rounded-full bg-black caret-transparent cursor-pointer"
							@click="prev_image">
						</span>
						<span 
							class="w-[50px] h-[50px] rounded-full bg-black caret-transparent cursor-pointer"
							@click="next_image">
						</span>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import Flicking from "@egjs/vue3-flicking";
	import "@egjs/vue3-flicking/dist/flicking.css";

	const flickingIndex = ref(0);
	const image_list = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

	const flicking = ref();

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

@keyframes imageBlock {
	0% {
		width: 60%;
	}
	100% {
		width: 0%;
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
	animation: imageWidth .6s both .3s;
}

.text-animation {
	animation: textMove .5s both .6s;
}

.image-block {
	animation: imageBlock .6s both;
}

.card-panel {
	@apply max-w-[480px] w-full max-h-[300px] h-full rounded-[32px] mr-[20px] cursor-grab active:cursor-grabbing overflow-hidden;
}
</style>