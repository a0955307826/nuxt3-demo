import { defineStore } from 'pinia';
export const useGlobalStore = defineStore('global', {
    state: () => ({
        scrollPosition: 0
    }),
    getters: {
        
    },
    actions: {
        async nuxtServerInit() {

        },
    },
})
