function waitForElement(cssSelector, callback) {
    var stop,
        elementCached,
        timeout,
        check = function () {
            try {
                elementCached = document.querySelector(cssSelector);
                if (stop) return;
                if (elementCached) {
                    callback(elementCached);
                    clearTimeout(timeout);
                } else {
                    window.requestAnimationFrame(check);
                }
            } catch (err) {
                console.log(err);
            }
        };
    window.requestAnimationFrame(check);
    timeout = setTimeout(function () {
        stop = true;
    }, 5000);
}

// Example test: Test number = 5038, Test type = v (variation)
const testNumber = '5038';
const testType = 'v1';


waitForElement('body', () => {
	const observer = new MutationObserver((mutationsList) => {
	    for (const mutation of mutationsList) {
            const targetModal = document.querySelector('.spz-modal-wrap')
            console.log('moda', targetModal)
            if (targetModal) {
                targetModal.remove()
                document.body.classList.remove('modal-show')
            }
	    }
	})
	const config = {
	    childList: true,
	    attributes: true,
	    subtree: true,
	    characterData: true
	};
	observer.observe(document.body, config);
})

waitForElement('.hero-section', (heroSection) => {
    document.body.classList.add(`spz_${testNumber}_${testType}`);
    
    if (!document.querySelector(`.spz_${testNumber}_iframe`)) {
        heroSection.insertAdjacentHTML('afterend', `
            <section class="spz_${testNumber}_iframe">
                <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms" src="https://demo.tenable.com/share/2fu84iqghng3" width="1200px" height="750px"></iframe>
            </section>
        `);
    }
});
