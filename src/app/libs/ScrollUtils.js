class ScrollUtils {

	/**
	* Check if an element is in viewport
	*
	* @param {number} [offset]
	* @returns {boolean}
	*/
	static isElementInViewport(element, offset = 0) {
		if (!element) return false;
		const top = element.getBoundingClientRect().top;
		return (top + offset) >= 0 && (top - offset) <= window.innerHeight;
	}
}

export default ScrollUtils