<template>
	<section ref="intro" class="intro">
		<div
			class="intro-wrap"
			:class="
				targetIsVisible
					? 'intro-animation scale-0'
					: 'intro-animation-leave scale-100'
			"
		>
			<div class="intro-left">
				<div
					class="intro-left--image"
					:style="`--height: ${get_intro_rgiht_height}px`"
				>
					<img
						width="400"
						height="400"
						src="/images/ray_image2.jpg"
						alt="profile"
					/>
				</div>
			</div>
			<div class="intro-right" ref="introRight">
				<div class="font-bold lg:text-[24px] text-[16px] pb-3">
					嗨! 我是睿宏 (Ray)
				</div>
				<div
					v-html="description"
					class="description lg:text-[16px] text-[12px] font-semibold pb-4"
				></div>
				<div class="flex items-center gap-2">
					<a class="w-fit" href="mailto:a0955307826@gmail.com">
						<button
							class="btn w-fit flex justify-center text-[#FFFFFF] px-4 py-3 font-medium rounded-[12px] duration-300"
							:style="{
								'background-color': 'rgba(29, 29, 29, .6)',
							}"
						>
							<p
								class="relative lg:text-[16px] text-[12px] font-bold tracking-wider w-fit z-10"
							>
								與我聯繫
							</p>
						</button>
					</a>
					<a
						class="w-10 h-10 duration-300 hover:scale-[1.2]"
						href="https://github.com/a0955307826/nuxt3-demo"
						target="_blank"
					>
						<img
							class="w-full h-full object-contain pointer-events-none"
							src="/images/github.png"
							alt="github"
						/>
					</a>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useGlobalStore } from "~/store";
import {
	useIntersectionObserver,
	watchThrottled,
	useWindowSize,
} from "@vueuse/core";
const store = useGlobalStore();
const intro = ref();
const introRight = ref();
const get_intro_rgiht_height = ref(0);
const { width, height } = useWindowSize();
const targetIsVisible = ref(false);
const intersectionObserverOptions = {
	threshold: 0.5,
};

const { stop } = useIntersectionObserver(
	intro,
	([{ isIntersecting }]) => {
		if (isIntersecting) {
			targetIsVisible.value = true;
		}
	},
	intersectionObserverOptions
);

watchThrottled(
	height,
	() => {
		store.getIntroHeight = intro.value.offsetTop;
	},
	{ throttle: 500 }
);

watchThrottled(
	width,
	() => {
		get_intro_rgiht_height.value = introRight.value.offsetHeight;
	},
	{ throttle: 500 }
);

const description = ref(
	"<p>很高興有機會向您介紹自己。過去兩年來，我在一家名為<a href='https://tw.digisalad.cool/' target='_blank'>數位創意公司(DigiSalad)</a>工作。這段時間獲得了寶貴的經驗。我參與了10個左右的網頁專案，跨足了不同的領域。</p><br><p>在我的工作經驗中，我習慣於與設計師和後端工程師密切合作，以確保網站達到最佳效果。我擅長溝通和團隊合作，能夠理解並滿足客戶的需求，同時提供專業可行的建議和解決方案。</p><br><p>我對前端開發充滿熱情，並且持續不斷地追求學習和成長。我享受挑戰自己，探索新的技術和工具，以提高自己的技能水平並將其應用於專案中。我相信我的熱情和專業能夠為貴公司的團隊帶來價值，並協助實現專案的成功。</p>"
);

onMounted(() => {
	store.getIntroHeight = intro.value.offsetTop;
	get_intro_rgiht_height.value = introRight.value.offsetHeight;
});
</script>

<style lang="scss" scoped>
.intro {
	@apply lg:mx-10 mx-4 mb-[120px];
}
.intro-wrap {
	@media (min-width: 992px) {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
	}
	@apply relative w-fit md:mx-auto md:mb-[80px] flex lg:flex-row flex-col items-center justify-center rounded-[12px] overflow-hidden;
}

@keyframes intro-animation {
	0% {
		transform: scale(0);
	}
	100% {
		transform: scale(1);
	}
}

@keyframes intro-animation-leave {
	0% {
		transform: scale(1);
	}
	100% {
		transform: scale(0);
	}
}

.intro-animation {
	animation: intro-animation 0.5s forwards ease-in-out;
}

.intro-animation-leave {
	animation: intro-animation-leave 0.5s forwards ease-in-out;
}

.intro-title {
	@apply md:mb-4 mb-2;
}

.intro-right {
	@media (max-width: 992px) {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
			0 6px 6px rgba(0, 0, 0, 0.23);
		border-radius: 12px;
	}
	background-color: rgba(255, 255, 255, 0.8);
	@apply flex justify-center flex-col lg:max-w-[680px] w-full h-full text-[#1d1d1d] lg:p-6 p-4 lg:rounded-r-[12px];
}

.intro-left {
	&--image {
		@media (max-width: 992px) {
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
				0 6px 6px rgba(0, 0, 0, 0.23);
			border-radius: 12px;
		}
		@apply lg:w-full lg:h-[var(--height)] w-[200px] h-[200px] lg:rounded-l-[12px] lg:mb-0 mb-6  mx-auto overflow-hidden;
		img {
			@apply w-full h-full object-cover;
		}
	}
}

.btn {
	position: relative;
	overflow: hidden;
	&::after {
		@apply duration-300 lg:translate-x-[-200px];
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-radius: 12px;
		background: #1d1d1d;
	}
	&:hover {
		&::after {
			transform: translateX(0);
		}
	}
}

.description {
	:deep(a) {
		text-decoration: underline;
		transition: color 0.3s;
		&:hover {
			color: #26c6d0;
		}
	}
}
</style>
