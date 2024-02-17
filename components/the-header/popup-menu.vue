<template>
    <section 
        v-if="store.is_show_popup_menu"
        ref="popup_menu"
        class="popup-menu"
    >
        <div class="flex items-center justify-center gap-4 absolute right-4 top-2">
            <img 
                @click="closePopup"
                class="cursor-pointer"
                src="/images/icon-close.svg" 
                alt="close"
            >
            <!-- <TheHeaderLang /> -->
        </div>
        <div class="menu-list-mobile w-full h-full flex flex-col mt-10 px-4 gap-3">
            <div 
                v-for="(item, index) in nav_list" 
                :key="`menu-list-mobile-${index}`"
                class="w-fit text-[#1D1D1D] text-[28px] cursor-pointer font-bold"
                @click="scroll_to_area_handler(item.element)"
                >{{ item.name }}
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useGlobalStore } from "~/store";
    const store = useGlobalStore(); 
    const emits = defineEmits(['scroll_to_area']);
    const popup_menu = ref();
    let timeout;
    const { t } = useI18n();

    const nav_list = computed(() => {
		return [
			{ 
				name: t('text_intro'),
				element: 'intro'
			}, 
			{ 
				name: t('text_skill'),
				element: 'skill'
			}, 
			{ 
				name: t("text_project"),
				element: 'main-project' 
			}, 
		]
	})
    
    watch(() => store.is_show_popup_menu, async(val) => {
        await nextTick();
        if(val) {
            popup_menu.value.classList.add('popup-menu--show');
            popup_menu.value?.classList.remove('popup-menu--hide');
        }
    })

    const scroll_to_area_handler = (element) => {
        emits('scroll_to_area', element);
        closePopup();
    }
    const closePopup = () => {
        if(timeout) {
            clearTimeout(timeout);
        }
        popup_menu.value.classList.remove('popup-menu--show');
        popup_menu.value?.classList.add('popup-menu--hide');

        timeout = setTimeout(() => {
            store.is_show_popup_menu = false;
        }, 500)
    }

    onMounted(() => {
        if(timeout) {
            clearTimeout(timeout);
        }
    })
</script>

<style lang="scss" scoped>
@keyframes show-opacity {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes hide-opacity {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.popup-menu {
    position: fixed;
    width: 100%;
    height: 100dvh;
    top: 0;
    left: 0;
    background-color: #FFFFFF;
    z-index: 10000;
}

.popup-menu--show {
    animation: show-opacity .5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

.popup-menu--hide {
    animation: hide-opacity .5s cubic-bezier(0.5, 1, 0.2, 1) forwards;
}

</style>