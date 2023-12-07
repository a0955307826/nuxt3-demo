<template>
	<section class="w-full h-full overflow-hidden">
		<div class="w-full h-screen bg-[#002921]">
			Et des expériences digitales ultra-fluides, pour ceux qui aiment avoir
			un coup d'avance.
		</div>
		<div class="section w-full flex-center column" ref="main">
			<div class="box">box</div>
			<div class="box">box</div>
			<div class="box">box</div>
		</div>
		<div class="w-full h-screen bg-[green]"></div>
	</section>
</template>

<script setup>
// import Flicking from "@egjs/vue3-flicking";
// const list = ref([0, 1, 2, 3, 4]);
import { gsap } from "gsap";

const main = ref();
let ctx;

onMounted(() => {
	ctx = gsap.context((self) => {
		const boxes = self.selector(".box");
		boxes.forEach((box) => {
			gsap.to(box, {
				x: 150,
				scrollTrigger: {
					trigger: box,
					start: "bottom bottom",
					end: "top 20%",
					scrub: true,
				},
			});
		});
	}, main.value); // <- Scope!
});
</script>

<style scoped>
.reveal-text {
	font-size: clamp(3rem, 8vw, 15rem);
	line-height: clamp(3rem, 8vw, 15rem);
	font-weight: 400;
	color: rgb(247, 247, 247, 0.05);
}
</style>
