<template>
    <div 
        class="scrollbar_scrollbar" 
        ref="scrollbar"
    >
        <div 
            class="scrollbar_thumb" 
            ref="scrollbarThumbEl">
        </div>
    </div>
</template>

<script setup>
    import { useWindowSize } from "@vueuse/core";
    import { useGlobalStore } from "~/store";
    const store = useGlobalStore();
    const { height } = useWindowSize();
    const scrollbarThumbEl = ref(null);
    const scrollbar = ref(null);
    const scrollbar_h = ref(0);

    const dragPosition = (scroll) => {
        let scrollPercentage = (scroll / (document.body.scrollHeight - height.value)) * 100;
        scrollbar.value.style.setProperty('--vh', `${scrollPercentage}%`);
        console.log(scrollPercentage);
    }

    watch(() => store.scrollPosition, (val) => {
        dragPosition(val);
    })

    watch(height, () => {
        scrollbar.value.style.setProperty('--height', `${document?.body?.scrollHeight }px`);
    })

    onMounted(() => {
        scrollbar.value.style.setProperty('--height', `${document?.body?.scrollHeight}px`);
        scrollbar_h.value = (document?.body?.offsetHeight / height.value) * 100;
        scrollbar.value.style.setProperty('--h', `${scrollbar_h.value}px`);
    })
</script>

<style lang="scss">
    .scrollbar_scrollbar {
		position: absolute;
        width: 12px;
		right: 0;
		top: 0;
        height: var(--height);
		background: #ccc;
	}
    .scrollbar_thumb {
        position: absolute;
        top: var(--vh);
        right: 0;
        width: 11px;
        height: var(--h);
        z-index: 1000;
        cursor: grab;;
        background: black;
        @apply rounded-t-full rounded-b-full;
    }
</style>