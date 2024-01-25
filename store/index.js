import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        scrollPosition: 0,
        getIntroHeight: 0,
    }),
    getters: {
        
    },
    actions: {
        async nuxtServerInit() {

        },
    },
})
