<template>
    <section 
        v-if="store.is_show_popup_menu"
        class="popup-menu"
    >
        <div class="flex items-center justify-center gap-4 absolute right-4 top-2">
            <img 
                @click="closePopup"
                class="cursor-pointer"
                src="/images/icon-close.svg" 
                alt="close"
            >
            <TheHeaderLang />
        </div>
        <div class="menu-list-mobile w-full h-full flex flex-col mt-10 px-4 gap-3">
            <div 
                v-for="(item, index) in nav_list" 
                :key="`menu-list-mobile-${index}`"
                class="text-[#1D1D1D] text-[32px] font-bold"
                >{{ item.name }}
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useGlobalStore } from "~/store";
    const store = useGlobalStore();
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
			{ 
				name: 'Contact',
				element: 'contact' 
			}
		]
	})
    const closePopup = () => {
        store.is_show_popup_menu = false;
    }
</script>

<style lang="scss" scoped>
.popup-menu {
    position: fixed;
    width: 100%;
    height: 100dvh;
    top: 0;
    left: 0;
    background-color: #FFFFFF;
    z-index: 10000;
}
</style>