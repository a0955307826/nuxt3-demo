<template>
	<section class="projects" ref="projects">
		<div
			class="main-image-block-move"
			:class="{ 'image-animation': targetIsVisible }"
		></div>
		<div
			v-for="(i, index) in image_list"
			:class="targetIsVisible ? 'w-[60%]' : 'w-0'"
			:key="`main-image-${i}`"
			class="main-image duration-500"
		>
			<img
				v-if="i.image"
				:class="
					flickingIndex + 1 === index + 1
						? 'main-image-animation'
						: 'main-image-change'
				"
				:src="i.image"
				alt="cover_image"
			/>
		</div>
		<div class="lg:block hidden max-w-[1440px] mx-auto h-full z-10">
			<div class="w-full h-full gap-[80px] flex items-center pl-10">
				<div
					v-for="(item, index) in image_list"
					:key="`text-${index}`"
					v-show="flickingIndex + 1 === index + 1"
					class="relative intro max-w-[800px] xl:min-w-[590px] min-w-[400px] text-[#1d1d1d] opacity-0 translate-y-[50px] rounded-[12px] z-10"
					:class="{
						'text-animation p-8':
							flickingIndex + 1 === index + 1 &&
							is_main_animation_finish,
					}"
					:style="{ 'background-color': 'rgba(255, 255, 255, .9)' }"
				>
					<div class="title font-bold text-[48px] pb-4">
						{{ item.name }}
					</div>
					<div
						class="description text-[#1D1D1D] font-semibold text-[16px] pb-6"
					>
						{{ item.description }}
					</div>
					<NuxtLink class="w-fit" :to="item.url" target="_blank">
						<button
							class="btn text-[#FFFFFF] px-4 py-3 font-bold rounded-[12px] duration-300"
							:style="{
								'background-color': 'rgba(29, 29, 29, .6)',
							}"
						>
							<p class="relative z-10">VIEW MORE</p>
						</button>
					</NuxtLink>
				</div>
				<div
					class="relative z-10"
					:class="
						is_main_animation_finish
							? 'opacity-100 translate-y-0 duration-500'
							: 'opacity-0 translate-y-[50px] pointer-events-none'
					"
				>
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
							v-for="(item, index) in image_list"
							:key="`flicking-${index}`"
							class="card-panel"
						>
							<img
								width="480"
								height="300"
								class="w-full h-full object-cover pointer-events-none"
								:src="item.image"
								alt="flicking-image"
							/>
						</div>
					</Flicking>
					<div
						class="w-full flex justify-between items-start absolute right-10 bottom-[-30px] z-10"
					>
						<div
							class="title font-bold text-[#1d1d1d] leading-[20px] text-center text-[24px] ml-20 py-4 px-4 rounded-[8px] overflow-hidden"
							:class="
								isTextOpacity
									? 'opacity-0 translate-y-[25px]'
									: 'opacity-100 translate-y-0 duration-300'
							"
							:style="{
								'background-color': 'rgba(255, 255, 255, .8)',
							}"
						>
							<p>{{ get_image_title }}</p>
						</div>
						<div class="flex gap-4">
							<div
								class="w-[50px] h-[50px] rounded-full flex items-center justify-center caret-transparent hover:!bg-[#1d1d1d] duration-300 cursor-pointer"
								:style="{
									'background-color': 'rgba(29, 29, 29, .6)',
								}"
								@click="prev_image"
							>
								<img
									class="rotate-[-180deg] pointer-events-none"
									src="/images/arrow.svg"
									alt="icon-arrow"
								/>
							</div>
							<div
								class="w-[50px] h-[50px] rounded-full flex items-center justify-center caret-transparent hover:!bg-[#1d1d1d] duration-300 cursor-pointer"
								:style="{
									'background-color': 'rgba(29, 29, 29, .6)',
								}"
								@click="next_image"
							>
								<img
									class="pointer-events-none"
									src="/images/arrow.svg"
									alt="icon-arrow"
								/>
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
import { useWindowSize, useIntersectionObserver } from "@vueuse/core";
import { useGlobalStore } from "~/store";
const store = useGlobalStore();
const { width } = useWindowSize();

const flickingIndex = ref(0);
const image_list = computed(() => [
	{
		name: "Welend",
		image: "/images/welend.png",
		description:
			"Welend是香港最大的純網上借貸平台，結合科技和人工智能，提供全自動且高效的私人財務借貸服務，以顛覆傳統、革新服務的理念，為客戶帶來全新的借貸體驗。",
		url: "https://www.welend.hk/",
	},
	{
		name: "Hkadc",
		image: "/images/hkadc.png",
		description:
			"香港藝術發展局(Hkadc)是政府指定的全方位發展香港藝術的法定機構，其角色包括資助、政策策劃、倡議和推廣等。",
		url: "https://hkadc-islandsouth.hk/",
	},
	{
		name: "Medisana",
		image: "/images/medisana.png",
		description:
			"Medisana為電商網站，致力於開發創新及高品質的個人健康管理產品，包括健康監測、皮膚護理、健身按摩、家居健康等解決方案，以改善個人及家庭的身心健康狀況。",
		url: "https://hk.medisanaapac.com/",
	},
	{
		name: "Wynn",
		image: "/images/wynn.jpeg",
		description:
			"永利度假村(Wynn)以及旗下兩家頂級酒店和度假村：永利澳門和永利皇宮。永利度假村網站開發時，設計成可以自由增減及調換組件順序，給予最大的頁面彈性。",
		url: "https://www.wynnresortsmacau.com/zh-hk/wynn-macau",
	},
	{
		name: "Yidan",
		image: "/images/yidan.png",
		description:
			"一丹獎(Yidan)是一間致力於透過教育改善世界的國際基金會，透過一丹獎表揚致力於推動這一目標的創新者，並致力於推廣高質素的教育理念和方法，以建立更安全、更健康、更美好的世界。",
		url: "https://yidanprize.org/",
	},
	{
		name: "Ego Finance",
		image: "/images/ego.png",
		description:
			"Ego Finance(及時雨信貸)是一家總部設於香港的持有放債人牌照的金融機構，專注於提供多元化的信貸服務，並以自有資金支援，確保客戶得到迅速、靈活的解決方案。",
		url: "https://www.ego-finance.com/",
	},
	{
		name: "Muster",
		image: "/images/muster.png",
		description:
			"Muster提供專屬空間與社區連結，讓人們能盡情展現和分享他們對車子的熱愛與價值觀。",
		url: "https://www.calligoapp.com/",
	},
]);
const isTextOpacity = ref(false);
const timeout = ref(0);
const is_main_animation_finish = ref(false);

// element
const flicking = ref();
const projects = ref();

const get_image_title = computed(() => {
	if (image_list.value.length < flickingIndex.value + 2) {
		return image_list.value[0].name;
	}
	return image_list.value[flickingIndex.value + 1].name;
});

const prev_image = () => {
	flicking.value.prev();
};
const next_image = () => {
	flicking.value.next();
};

const flickingChange = (ele) => {
	clearTimeout(timeout.value);

	flickingIndex.value = ele.index;
	isTextOpacity.value = true;

	timeout.value = setTimeout(() => {
		isTextOpacity.value = false;
	}, 300);
};

const targetIsVisible = ref(false);
const intersectionObserverOptions = {
	threshold: 0.4,
};

const { stop } = useIntersectionObserver(
	projects,
	([{ isIntersecting }]) => {
		if (isIntersecting) {
			targetIsVisible.value = true;
		}
	},
	intersectionObserverOptions
);

onMounted(() => {
	const animationEnd = document.querySelector(".main-image-block-move");
	animationEnd.addEventListener("animationend", () => {
		is_main_animation_finish.value = true;
	});
});
</script>

<style lang="scss" scoped>
@keyframes mainImage {
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
}

@keyframes mainImageChange {
	0% {
		width: 100%;
	}
	100% {
		width: 0%;
	}
}

@keyframes imageWidth {
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

.projects {
	@apply relative w-full lg:h-[700px] lg:mb-[120px] overflow-hidden;
}

.main-image {
	@apply lg:block hidden  h-full absolute top-0 left-0 rounded-r-[32px] overflow-hidden z-[2];
	img {
		@apply w-full h-full object-cover;
	}
}

.main-image-block-move {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 4;
	background: linear-gradient(45deg, #ffffff 0%, rgba(225, 5, 34, 0) 70%),
		linear-gradient(135deg, #ffffff 10%, rgba(49, 5, 209, 0) 80%),
		linear-gradient(225deg, #ffffff 10%, rgba(10, 219, 216, 0) 80%),
		linear-gradient(315deg, #050813 100%, rgba(9, 245, 5, 0) 70%);
	@apply w-0 h-full rounded-r-[32px] z-[3];
}

.main-image-animation {
	animation: mainImage 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.main-image-change {
	animation: mainImageChange 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}
.image-animation {
	animation: imageWidth 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.text-animation {
	animation: textMove 1s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.card-panel {
	@apply lg:max-w-[480px] max-w-[200px] w-full lg:rounded-[32px] lg:mr-5 mr-4 cursor-grab active:cursor-grabbing overflow-hidden brightness-50 hover:brightness-100 duration-300;
}

.btn {
	position: relative;
	overflow: hidden;
	&::after {
		@apply duration-300;
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		transform: translateX(-140px);
		border-radius: 12px;
		background: #1d1d1d;
	}
	&:hover {
		&::after {
			transform: translateX(0);
		}
	}
}
</style>
