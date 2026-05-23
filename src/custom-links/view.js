(function() {
	document.querySelectorAll('.carkeek-blocks-accordion.open-first-item').forEach(function(list) {
		const firstPanel = list.querySelector('.accordion__trigger');
		const firstPanelContent = list.querySelector('.accordion__panel');
		if (firstPanelContent) {
			firstPanelContent.setAttribute('aria-hidden', 'false');
		}
		if (firstPanel) {
			firstPanel.setAttribute('aria-expanded', 'true');
		}
	});
})();