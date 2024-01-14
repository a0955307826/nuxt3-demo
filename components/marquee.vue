<template>
    <div class="marquee">
        <div class="marquee-move">HELLO WORLD</div>
        <div class="marquee-move">HELLO WORLD</div>
        <div class="marquee-move">HELLO WORLD</div>
        <div class="marquee-move">HELLO WORLD</div>
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
    @apply flex items-center overflow-hidden md:mb-[80px] mb-10;
}
.marquee-move {
    animation: move 8s linear infinite;
    width: max-content;
    @apply flex items-center px-[10px] translate-x-0 shrink-0 text-[180px] font-black text-[#E5E5E5] whitespace-nowrap leading-[170px];
}
</style>