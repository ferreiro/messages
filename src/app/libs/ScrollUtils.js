class ScrollUtils {
	/*
	* Check if item is visible in the screen
	* https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
	*/
	static checkVisible (element, threshold = 0, mode = 'visible') {
		if (!element) {
			return false
		}
		const rect = element.getBoundingClientRect();
		const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		const above = rect.bottom - threshold < 0;
		const below = rect.top - viewHeight + threshold >= 0;

		return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
	}
}

export default ScrollUtils