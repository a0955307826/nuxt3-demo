import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        scrollPosition: 0,
        getIntroHeight: 0,
        is_header_display: false,
        area_scoped: [false, false, false, false],
        is_show_popup_menu: false
    }),
    getters: {
        
    },
    actions: {
        async nuxtServerInit() {

        },
    },
})
