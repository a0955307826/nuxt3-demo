<template>
	<header 
		class="the-header"
		:class="[{ 'the-header--scroll': store.scrollPosition >= 50 }, store.is_header_display ? 'opacity-100' : 'opacity-0']"
	>
		<nav 
			class="container h-[60px] gap-8 flex items-center justify-end lg:px-10 px-4 duration-300"
		>
			<div 
				v-for="(item, index) in nav_list" 
				:key="`header-${index}`"
				class="nav-name font-bold text-[20px] tracking-wider duration-300 cursor-pointer"
				:class="[set_nav_class(index), {'nav-name__area-white': store.area_scoped[index]}]"
				@click="get_element_handler(item.element)"
				>{{ item.name }}
			</div>
		</nav>
	</header>
</template>

<script setup>
	import { useWindowSize, useWindowScroll, watchThrottled  } from "@vueuse/core";
	import { useGlobalStore } from '~/store';
	const { width } = useWindowSize();
	const { x, y } = useWindowScroll();
	const store = useGlobalStore();

	const save_area_top = ref([]);
	const save_area_bottom = ref([]);
	const nav_list = ref([
		{ 
			name: 'Intro',
			element: 'intro'
		}, 
		{ 
			name: 'Skills',
			element: 'skill'
		}, 
		{ 
			name: 'Projects',
			element: 'main-project' 
		}, 
		{ 
			name: 'Contact',
			element: 'contact' 
		}
	])

	const set_nav_class = (index) => {
		if(store.area_scoped[index]) {
			return 'nav-name__area-white'
		}
		return store.scrollPosition >= 50 ? 'nav-name__hover-white' : 'nav-name__hover-black'
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
		for(let i = 0; i < 4; i++) {
			store.area_scoped[i] = val >= save_area_top.value[i] && val < save_area_bottom.value[i];
		}
	})

	watchThrottled(
		width,
		() => { 
			get_area_height();
		},
		{ throttle: 500 },
	)

	onMounted(() => {
		get_area_height()
	})
</script>

<style lang="scss" scoped>
.the-header {
	@apply fixed top-0 left-0 w-full h-0 duration-300 z-[9999];
}

.the-header--scroll {
	@apply h-[60px];
	background-color: rgba(29, 29, 29, .7);
	box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.nav-name__hover-white {
	position: relative;
	color: #FFFFFF;
	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 0;
		height: 2px;
		background: #FFFFFF;
		@apply duration-300;
	}
	&:hover {
		&::after {
			width: 100%;
		}
	}
}

.nav-name__area-white {
	position: relative;
	color: #FFFFFF;
	&::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		width: 100%;
		height: 2px;
		background: #FFFFFF;
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