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

// Example test: Test number = 627, Test type = v1 (variation)
const testNumber = '627';
const testType = 'v1';

waitForElement('.hero', () => {
    // const heroButtons = document.querySelector('.hero-buttons');
    // if (heroButtons.children[0]) {
        //     heroButtons.children[0].textContent = 'Get Demo';
        // }
    const hero = document.querySelector('.hero');
    if (hero) {
        document.body.classList.add(`spz_${testNumber}_${testType}`); 
        document.body.classList.add('spz_627_v1');
        const heroButtons = hero.querySelector('.hero-buttons');
        if (heroButtons?.children[0]) {
            heroButtons.children[0].textContent = 'Get Demo';
        }
    }
})