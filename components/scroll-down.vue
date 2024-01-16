<template>
    <div 
        class="container_mouse duration-500"
        :class="{'opacity-0': !is_scroll_down || store.scrollPosition > 200}"
    >
        <span class="mouse-btn">
            <span class="mouse-scroll"></span>
        </span>
        <span>Scroll Down</span>
    </div>
</template>

<script setup>
    import { useGlobalStore } from '~/store';
    const store = useGlobalStore();

    const props = defineProps({
        is_scroll_down: {
            default: false,
            type: Boolean
        }
    });
</script>

<style lang="scss" scoped>

.container_mouse {
    text-align: center;
    color: #161616;
    font-weight: bold;
    text-transform: uppercase;
    padding-top: 2rem;
    cursor: pointer;
    @apply fixed bottom-[50px] left-1/2 -translate-x-1/2;
}

.container_mouse .mouse-btn {
    margin: 10px auto;
    width: 40px;
    height: 80px;
    border: 4px solid #161616;
    border-radius: 30px;
    display: flex;
}

.container_mouse .mouse-btn .mouse-scroll {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #161616;
    border-radius: 50%;
    margin: auto;
    animation: scrolling 1s linear infinite;
}

@keyframes scrolling {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }

    100% {
        opacity: 1;
        transform: translateY(20px);
    }
}
</style>
