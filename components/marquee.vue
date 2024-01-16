<template>
    <div class="marquee">
        <div class="marquee-move">HTML CSS JAVASCRIPT GSAP SASS TAILWIND NUXT VUE</div>
        <div class="marquee-move">HTML CSS JAVASCRIPT GSAP SASS TAILWIND NUXT VUE</div>
        <div class="marquee-move">HTML CSS JAVASCRIPT GSAP SASS TAILWIND NUXT VUE</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@keyframes move {
    0% { 
        transform: translate3d(0, 0, 0); 
    }
    100% { 
        transform: translate3d(-100%, 0, 0)
    }; 
}

.marquee {
    @apply flex items-center overflow-hidden my-[120px] opacity-80;
}
.marquee-move {
    animation: move 20s linear infinite;
    width: max-content;
    text-shadow: 0px 3px 0px #F0f0f0, 0px 14px 10px rgba(0, 0, 0, 0.15),
		0px 24px 2px rgba(0, 0, 0, 0.1), 0px 24px 32px rgba(0, 0, 0, 0.1);
    @apply flex items-center px-[10px] translate-x-0 shrink-0 text-[150px] font-black whitespace-nowrap leading-[170px];
}
</style>