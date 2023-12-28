<template>
	<header 
		class="the-header"
		:class="{ 'the-header--scroll': store.scrollPosition >= 50 }"
	>
		<nav class="container"></nav>
	</header>
</template>

<script setup>
	import { useGlobalStore } from '~/store';
	const store = useGlobalStore();
</script>

<style scoped>
.the-header {
	@apply fixed top-0 left-0 w-full h-0 duration-300 z-[9999];
}

.the-header--scroll {
	@apply h-[50px] bg-white;
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>