<template>
    <section ref="hero" class="hero">
        <div class="hero-banner"></div>
        <div class="hero-banner-title">ENJOY THE WORLD</div>
    </section>
</template>

<script setup>
    import { gsap } from "gsap";
    const hero = ref();
    let ctx;
    let time1;

    onMounted(() => {
        ctx = gsap.context((self) => {
            const title = self.selector(".hero-banner-title");
            time1 = gsap.timeline({
                scrollTrigger: {
                    trigger: title,
                    start: "top center",
                    end: 'bottom 10%',
                    scrub: true,
                    markers: true
                },
            })
            time1
                .to(title, {
                    scale: 1,
                    y: 0,
                    duration: 2
                })
                .to(title, {
                    scale: 1.5,
                    y: 200,
                    duration: 2
                })
                .to(title, {
                    scale: 3,
                    y: 500,
                    duration: 2
                })
        }, hero.value);
    });
</script>

<style lang="scss" scoped>
.hero {
    @apply w-[100dvw] h-[100dvh];
}
.hero-banner {
    @apply relative w-full h-full bg-cover bg-no-repeat bg-fixed bg-[url('https://picsum.photos/1440/900')];
}

.hero-banner-title {
    @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] whitespace-nowrap text-white;
}
</style>