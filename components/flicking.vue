<template>
	<div class="mb-[120px]">
		<Flicking 
			:options="{
				circular: true
			}" 
			:plugins="plugins"
		>
			<div 
				v-for="i in 10" 
				:key="i"
				class="card-panel"
			>
				<img 
					class="w-full h-full object-cover pointer-events-none" 
					:src="`https://picsum.photos/800/400?random=${i}`" 
					alt=""
				>
			</div>
		</Flicking>
	</div>
</template>

<script setup>
	import Flicking from "@egjs/vue3-flicking";
	import { Fade } from "@egjs/flicking-plugins";
	import "@egjs/vue3-flicking/dist/flicking.css";

	const plugins = [new Fade()];
</script>

<style lang="scss" scoped>
.card-panel {
    width: 60%;
    background: #CCC;
}

</style>