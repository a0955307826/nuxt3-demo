<template>
    <section class="main-project">
        <div class="project-title" ref="projectTitle">
            <p 
                :class="targetIsVisible ? 'projects-animation' : 'remove-projects-animation'"
                >PROJECTS
            </p>
        </div>
        <ProjectsDesktop />
        <ProjectsMobile />
    </section>
</template>

<script setup>
    import { useIntersectionObserver } from '@vueuse/core';
    const projectTitle = ref();
    const targetIsVisible = ref(false);
	const intersectionObserverOptions = {
        threshold: 0.5, 
	};

    const { stop } = useIntersectionObserver(
		projectTitle,
		([{ isIntersecting }]) => {
			targetIsVisible.value = isIntersecting;
		},
		intersectionObserverOptions
	);

</script>

<style lang="scss" scoped>
@keyframes project-animation {
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
}

@keyframes remove-project-animation {
    0% {
        width: 100%;
    }
    100% {
        width: 0;
    }
}

.project-title {
    @apply relative w-fit max-w-[1440px] mx-auto font-bold tracking-wider lg:text-[120px] sm:text-[60px] text-[48px]  z-10 lg:px-0 px-4 lg:mb-0 mb-6 overflow-hidden;
    text-shadow: 0px 3px 0px #F0f0f0, 0px 14px 10px rgba(0, 0, 0, 0.15),
		0px 24px 2px rgba(0, 0, 0, 0.1), 0px 24px 30px rgba(0, 0, 0, 0.1);
        p {
            width: 0;
            overflow: hidden;
        }
}

.projects-animation {
    animation: project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.remove-projects-animation {
    animation: remove-project-animation 1.5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}
</style>