<template>
	<header 
		v-if="store.is_header_display"
		class="the-header"
		:class="{ 'the-header--scroll': store.scrollPosition >= 50 }"
	>
		<nav class="nav-wrap nav-wrap--hidden container lg:h-[60px] h-[40px] lg:gap-8 gap-4 flex items-center justify-end lg:px-10 px-4 duration-300 overflow-hidden">
			<div 
				v-for="(item, index) in nav_list" 
				:key="`header-${index}`"
				class="nav-name font-bold lg:block hidden text-[20px] tracking-wider duration-300 cursor-pointer"
				:class="[set_nav_class(index), {'nav-name__area-black': store.area_scoped[index]}]"
				@click="get_element_handler(item.element)"
				>{{ item.name }}
			</div>
			<div 
				class="lg:hidden w-6 h-6 cursor-pointer"
				@click="store.is_show_popup_menu = true"
			>
				<img 
					class="w-full h-full object-contain pointer-events-none" 
					src="/images/icon-hamburger.svg" 
					alt="hamburger"
				>
			</div>
			<TheHeaderLang />
		</nav>
		<TheHeaderPopupMenu @scroll_to_area="get_element_handler"/>
	</header>
</template>

<script setup>
	import { useWindowSize, useWindowScroll, watchThrottled  } from "@vueuse/core";
	import { useGlobalStore } from '~/store';
	const { width, height } = useWindowSize();
	const { x, y } = useWindowScroll();
	const store = useGlobalStore();
	const { t } = useI18n();

	const save_area_top = ref([]);
	const save_area_bottom = ref([]);

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

	const set_nav_class = (index) => {
		if(store.area_scoped[index]) {
			return 'nav-name__area-black';
		}
		return 'nav-name__hover-black';
	}

	const get_element_handler = (element) => {
		let element_offsetTop = document.querySelector(`.${element}`)?.offsetTop;
		if(element === 'intro') {
			element_offsetTop -= width.value >= 992 ? 300 : 200;
		} else {
			element_offsetTop -= 100;
		}
		useScrollToArea(element_offsetTop);
	}

	const get_area_height = () => {
		save_area_top.value = [];
		save_area_bottom.value = [];
		for(let i = 0; i < nav_list.value.length; i++) {
			let get_area_element = document.querySelector(`.${nav_list.value[i].element}`);
			save_area_top.value.push(get_area_element?.offsetTop - 580);
			save_area_bottom.value.push(get_area_element?.offsetTop + get_area_element?.offsetHeight - 200);
		}
	}

	watch(y, (val) => {
		for(let i = 0; i < save_area_top.value.length; i++) {
			store.area_scoped[i] = val >= save_area_top.value[i] && val < save_area_bottom.value[i];
		}
	})

	watchThrottled(
		width,
		() => { get_area_height();},
		{ throttle: 500 },
	)

	watchThrottled(
		height,
		() => { get_area_height();},
		{ throttle: 500 },
	)

	onMounted(() => {
		get_area_height();
		if(store.is_header_display) {
			document.querySelector('.nav-wrap')?.classList?.remove('nav-wrap--hidden');
			document.querySelector('.nav-wrap')?.classList?.add('nav-wrap--show');
		}
	})
</script>

<style lang="scss" scoped>
.the-header {
	@apply fixed top-0 left-0 w-full h-0 duration-300 z-[9999];
}

.nav-wrap {
	@apply duration-500;
	&--hidden {
		@apply opacity-0 pointer-events-none;
	}
	&--show {
		@apply opacity-100;
	}
}

.the-header--scroll {
	@apply lg:h-[60px] h-[40px];
	background-color: rgba(255, 255, 255, .9);
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.nav-name__area-black {
	position: relative;
	color: #1D1D1D;
	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background: #1D1D1D;
		@apply duration-300;
	}
}

.nav-name__hover-black {
	position: relative;
	color: #1D1D1D;
	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background: #1d1d1d;
		@apply duration-300;
	}
	&:hover {
		&::after {
			width: 100%;
		}
	}
}
</style>