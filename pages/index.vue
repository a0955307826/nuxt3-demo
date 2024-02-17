<template>
	<section class="layout-home overflow-hidden">
		<Banner />
		<div class="h-[70dvh]"></div>
		<Intro />
		<div class="lg:h-[45dvh] h-[20dvh]"></div>
		<!-- <Marquee /> -->
		<Skill />
		<div class="lg:h-[45dvh] h-[20dvh]"></div>
		<Projects />
	</section>
</template>

<script setup>
useSeoMeta({
	title: '我是睿宏，是一名網頁前端工程師',
	ogTitle: '我是睿宏，是一名網頁前端工程師',
	twitterTitle: '我是睿宏，是一名網頁前端工程師',
	description: '前端工程師 - 睿宏 Ray Lin的個人網站，包含介紹及過往作品。',
	ogDescription: '前端工程師 - 睿宏 Ray Lin的個人網站，包含介紹及過往作品。',
	twitterDescription: '前端工程師 - 睿宏 Ray Lin的個人網站，包含介紹及過往作品。',
});
</script>

<style lang="scss" scoped></style>
