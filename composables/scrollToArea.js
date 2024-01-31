export const useScrollToArea = (area) => {
	return window.scrollTo({ top: area, behavior: 'smooth' });
}
