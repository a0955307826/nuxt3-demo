<template>
    <NuxtLink 
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="lang font-bold tracking-wider duration-300"
        :class="{ 'text-[#1D1D1D] lang-black': store.scrollPosition >= 50 }"
        >{{locale.name}}
    </NuxtLink>
</template>

<script setup>
    import { useGlobalStore } from '~/store';

    const store = useGlobalStore();
    const { locale, locales } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const availableLocales = computed(() => {
        return (locales.value).filter(i => i.code !== locale.value)
    });
</script>

<style lang="scss" scoped>
.lang-black {
    position: relative;
    &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: #1D1D1D;
        @apply duration-300
    }
    &:hover {
        &::after {
            width: 100%;
        }
    }
}
</style>