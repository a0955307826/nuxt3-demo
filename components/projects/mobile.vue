<template>
	<section ref="projects_mobile" class="projects-mobile px-4 mb-[120px]">
		<div class="grid md:grid-cols-2 gap-5">
			<div
				class="main-mobile-image"
				v-for="(item, index) in image_list"
				:key="`main-mobile-image-${index}`"
				:style="{ 'background-color': 'rgba(255, 255, 255, .8)' }"
			>
				<div class="relative aspect-w-16 aspect-h-12">
					<img
						class="w-full h-full object-cover"
						:src="item.image"
						alt="cover_image"
					/>
				</div>
				<div class="content px-4 py-6">
					<div class="title font-bold text-[24px] pb-3">
						{{ item.name }}
					</div>
					<div class="description font-semibold text-[12px] pb-4">
						{{ item.description }}
					</div>
					<NuxtLink class="w-fit" :to="item.url" target="_blank">
						<button
							class="text-[#FFFFFF] text-[12px] px-4 py-3 font-bold rounded-[12px]"
							:style="{
								'background-color': 'rgba(29, 29, 29, .8)',
							}"
						>
							前往網站
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
		name: "Yidan",
		image: "/images/yidan.png",
		description:
			"Yidan(一丹獎)是一間致力於透過教育改善世界的國際基金會，透過一丹獎表揚致力於推動這一目標的創新者，並致力於推廣高質素的教育理念和方法，以建立更安全、更健康、更美好的世界。",
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

const initObserver = () => {
	const main_mobile_block = document.querySelectorAll(".main-mobile-image");
	const options = {
		rootMargin: "100px 0px",
		threshold: 0.8,
	};
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("image-animation");
				entry.target.classList.remove("remove-image-animation");
			}
			// else {
			// 	entry.target.classList.add("remove-image-animation");
			// 	entry.target.classList.remove("image-animation");
			// }
		});
	}, options);
	main_mobile_block.forEach((el) => {
		observer.observe(el);
	});
};

onMounted(() => {
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

.main-mobile-image {
	@apply opacity-0 translate-y-[25px] lg:mb-10 rounded-[12px] overflow-hidden;
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
