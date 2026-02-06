//DEV 1/5. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/task/1211982874665906?focus=true`;
//DEV 2/5. Find the class or ID of the control hero section and place it below in "#change_me".  e.g. "#form_123456" or ".form_123456"
const template_heroSelector = "#features-checkbox-section"
//DEV 3/5. Choose where you redesigned hero section should appear accroding to control hero section row #4
const template_position = "afterbegin"; //"beforebegin", "beforeend", "afterend"
//DEV 4/5. Fill hero content object values. See comments inside for details

function hiddenValue(currentExperimentName, currentExperimentValue) {
    function setCookie(name, value, days) {
        var expires = ''
        if (days) {
            var date = new Date()
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
            expires = '; expires=' + date.toUTCString()
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/'
    }

    function getCookie(name) {
        var nameEQ = name + '='
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i]
            while (c.charAt(0) == ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    var ExistingExperimentName = getCookie('ExperimentName')
    var ExistingExperimentValue = getCookie('ExperimentValue')

    if (!ExistingExperimentName) {
        setCookie('ExperimentName', currentExperimentName, 1)
        setCookie('ExperimentValue', currentExperimentValue, 1)
    } else if (ExistingExperimentName && !ExistingExperimentName.includes(currentExperimentName)) {
        setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1)
        setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1)
    } else if (ExistingExperimentName && ExistingExperimentName.includes(currentExperimentName)) {
        var existingNames = ExistingExperimentName.split(',')
        var existingValues = ExistingExperimentValue.split(',')
        var index = existingNames.indexOf(currentExperimentName)
        existingValues[index] = currentExperimentValue
        setCookie('ExperimentName', existingNames.join(','), 1)
        setCookie('ExperimentValue', existingValues.join(','), 1)
    }
}
hiddenValue('#1008 | Constant Contact | Home (Int) | Hero Tiles', 'SPZ_1008_V1')

function waitForElement(cssSelector, callback) {
    var stop,
        elementCached,
        timeout,
        check = function () {
            try {
                elementCached = document.querySelector(cssSelector)
                if (stop) return
                if (elementCached) {
                    callback(elementCached)
                    clearTimeout(timeout)
                } else {
                    window.requestAnimationFrame(check)
                }
            } catch (err) {
                console.log(err)
            }
        }
    window.requestAnimationFrame(check)
    timeout = setTimeout(function () {
        stop = true
    }, 10000)
}

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
const testNumber = '1008'
const testType = 'v1'
function addHero(template_heroSelector) {
    function initStatsSlider() {
        const wrapper = document.querySelector('.spz_stats-wrapper');
        const slider = document.querySelector('.spz_stats-body');
        const slides = document.querySelectorAll('.spz_stats-list_item');
        const dots = document.querySelectorAll('.spz_stats-dot');

        if (!wrapper || !slider || slides.length === 0) return;

        let currentIndex = 0;
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        let hasMoved = false;
        let startTranslate = 0;
        let isSliderActive = false;
        let eventListenersAttached = false;
        let isTransitioning = false;

        const DRAG_THRESHOLD = 10;
        const totalSlides = slides.length;

        function shouldActivateSlider() {
            return window.innerWidth < 768;
        }

        // Clone first and last slides for seamless loop
        function setupClones() {
            if (!isSliderActive) return;

            // Remove existing clones if any
            const existingClones = slider.querySelectorAll('.spz_stats-clone');
            existingClones.forEach(clone => clone.remove());

            // Get fresh slide references (only original slides, not clones)
            const currentSlides = Array.from(slider.querySelectorAll('.spz_stats-list_item')).filter(
                slide => !slide.classList.contains('spz_stats-clone')
            );

            // Clone first slide and append to end
            const firstClone = currentSlides[0].cloneNode(true);
            firstClone.classList.add('spz_stats-clone');
            firstClone.classList.add('spz_stats-list_item'); // Ensure it has the list item class
            slider.appendChild(firstClone);

            // Clone last slide and prepend to start
            const lastClone = currentSlides[currentSlides.length - 1].cloneNode(true);
            lastClone.classList.add('spz_stats-clone');
            lastClone.classList.add('spz_stats-list_item'); // Ensure it has the list item class
            slider.insertBefore(lastClone, currentSlides[0]);

            // Set initial position to account for prepended clone
            currentIndex = 0;
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-100%)`;

            // Force reflow
            void slider.offsetHeight;
        }

        function updateSlider(animate = true) {
            if (!isSliderActive) return;

            if (animate && !isTransitioning) {
                slider.style.transition = 'transform 0.3s ease-out';
            } else {
                slider.style.transition = 'none';
            }

            // Offset by 1 because of the prepended clone
            const translateX = -(currentIndex + 1) * 100;
            slider.style.transform = `translateX(${translateX}%)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            if (!isSliderActive || isTransitioning) return;
            currentIndex = index;
            updateSlider(true);
        }

        function nextSlide() {
            if (!isSliderActive || isTransitioning) return;

            isTransitioning = true;
            currentIndex++;

            // Don't override transition - it should already be set from handleEnd
            const translateX = -(currentIndex + 1) * 100;
            slider.style.transform = `translateX(${translateX}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Check if we're at the cloned first slide
            if (currentIndex === totalSlides) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    slider.style.transform = `translateX(-100%)`;

                    // Update dots again after jumping back to real first slide
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === 0);
                    });

                    // Force reflow
                    void slider.offsetHeight;

                    setTimeout(() => {
                        isTransitioning = false;
                    }, 50);
                }, 200);
            } else {
                setTimeout(() => {
                    isTransitioning = false;
                }, 200);
            }
        }

        function prevSlide() {
            if (!isSliderActive || isTransitioning) return;

            isTransitioning = true;
            currentIndex--;

            // Don't override transition - it should already be set from handleEnd
            const translateX = -(currentIndex + 1) * 100;
            slider.style.transform = `translateX(${translateX}%)`;

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            // Check if we're at the cloned last slide
            if (currentIndex === -1) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = totalSlides - 1;
                    slider.style.transform = `translateX(-${totalSlides * 100}%)`;

                    // Update dots again after jumping back to real last slide
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === totalSlides - 1);
                    });

                    // Force reflow
                    void slider.offsetHeight;

                    setTimeout(() => {
                        isTransitioning = false;
                    }, 50);
                }, 200);
            } else {
                setTimeout(() => {
                    isTransitioning = false;
                }, 200);
            }
        }

        function handleStart(e) {
            if (!isSliderActive || isTransitioning) return;

            isDragging = true;
            hasMoved = false;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            currentX = startX;
            startTranslate = -(currentIndex + 1) * 100;

            slider.style.transition = 'none';
        }

        function handleMove(e) {
            if (!isDragging || !isSliderActive) return;

            currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            const diff = currentX - startX;

            if (!hasMoved && Math.abs(diff) > DRAG_THRESHOLD) {
                hasMoved = true;
                wrapper.classList.add('dragging');
            }

            if (hasMoved) {
                e.preventDefault();
                const diffPercent = (diff / wrapper.offsetWidth) * 100;
                slider.style.transform = `translateX(${startTranslate + diffPercent}%)`;
            }
        }

        function handleEnd(e) {
            if (!isDragging || !isSliderActive) return;

            isDragging = false;
            wrapper.classList.remove('dragging');

            if (hasMoved) {
                const diff = currentX - startX;
                const threshold = wrapper.offsetWidth * 0.2;

                if (Math.abs(diff) > threshold) {
                    // Re-enable transition BEFORE calling next/prev slide
                    slider.style.transition = 'transform 0.2s ease-out';

                    // Force reflow to ensure transition is applied
                    void slider.offsetHeight;

                    if (diff > 0) {
                        prevSlide();
                    } else {
                        nextSlide();
                    }
                } else {
                    // Snap back to current position with animation
                    slider.style.transition = 'transform 0.2s ease-out';
                    updateSlider(true);
                }
            } else {
                updateSlider(true);
            }

            hasMoved = false;
        }

        function handleDotClick(e) {
            if (!isSliderActive || isTransitioning) return;
            const index = parseInt(e.target.dataset.index);
            goToSlide(index);
        }

        function attachEventListeners() {
            if (eventListenersAttached) return;

            wrapper.addEventListener('mousedown', handleStart);
            wrapper.addEventListener('mousemove', handleMove);
            wrapper.addEventListener('mouseup', handleEnd);
            wrapper.addEventListener('mouseleave', handleEnd);

            wrapper.addEventListener('touchstart', handleStart, { passive: true });
            wrapper.addEventListener('touchmove', handleMove, { passive: false });
            wrapper.addEventListener('touchend', handleEnd);

            dots.forEach((dot) => {
                dot.addEventListener('click', handleDotClick);
            });

            eventListenersAttached = true;
        }

        function activateSlider() {
            isSliderActive = true;
            currentIndex = 0;
            setupClones();
            attachEventListeners();
            updateSlider(false);
        }

        function deactivateSlider() {
            isSliderActive = false;
            isDragging = false;
            hasMoved = false;
            isTransitioning = false;
            wrapper.classList.remove('dragging');

            // Remove clones
            const clones = slider.querySelectorAll('.spz_stats-clone');
            clones.forEach(clone => clone.remove());

            slider.style.transform = '';
            slider.style.transition = '';

            dots.forEach(dot => dot.classList.remove('active'));
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }
        }

        function handleResize() {
            const shouldBeActive = shouldActivateSlider();

            if (shouldBeActive && !isSliderActive) {
                activateSlider();
            } else if (!shouldBeActive && isSliderActive) {
                deactivateSlider();
            } else if (shouldBeActive && isSliderActive) {
                updateSlider(false);
            }
        }

        let resizeTimer;
        function debouncedResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleResize, 150);
        }

        window.addEventListener('resize', debouncedResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 200);
        });

        attachEventListeners();
        if (shouldActivateSlider()) {
            activateSlider();
        } else {
            deactivateSlider();
        }

        return function cleanup() {
            window.removeEventListener('resize', debouncedResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }

    // Remove the broken if statement and pageshow listener
    // since heroFormButton doesn't exist

    waitForElement(template_heroSelector, (docForm) => {
        if (docForm && !document.querySelector('#spz-stats')) {
            docForm.insertAdjacentHTML('afterend', `
                <div id="spz-stats">
                    <div class="spz_stats-wrapper">
                        <ul class="spz_stats-body">
                            <li class="spz_stats-list_item">
                                <strong>87B</strong>
                                <small>customer emails sent annually</small>
                            </li>
                            <li class="spz_stats-list_item">
                                <strong>Up to 30x ROI</strong>
                                <small>seen by Constant Contact users*</small>
                            </li>
                            <li class="spz_stats-list_item">
                                <strong>98%</strong>
                                <small>best-in-class inbox rate</small>
                            </li>
                            <li class="spz_stats-list_item">
                                <strong>1.5M</strong>
                                <small>social posts created</small>
                            </li>
                        </ul>
                    </div>
                    <div class="spz_stats-pagination">
                        <span class="spz_stats-dot active" data-index="0"></span>
                        <span class="spz_stats-dot" data-index="1"></span>
                        <span class="spz_stats-dot" data-index="2"></span>
                        <span class="spz_stats-dot" data-index="3"></span>
                    </div>
                </div>
            `);

            initStatsSlider();
        }
    })
}

waitForElement('#centered-cta-siteContactEmailLogin', () => {
    const input = document.querySelector('#centered-cta-siteContactEmailLogin');
    if (input) {
        input.addEventListener('blur', (e) => {
            setTimeout(() => {
                e.target.setSelectionRange(0, 0);
                e.target.scrollLeft = 0;
            }, 0);
        });
    }
});

waitForElement('body', () => {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
                document.body.classList.add(`spz_${testNumber}_${testType}`)
            }

            const targetElement = document.querySelector('.type-callout > span')
            if (targetElement && targetElement.textContent == "Automate email, social, & text marketing.") {
                addHero(
                    template_heroSelector
                );
            }

            // Add bottom message check here
            const faqSection = document.querySelector('#section-frequently-asked-questions');
            const messageSection = document.querySelector('#section-bottom-message');

            if (faqSection && !messageSection) {
                faqSection.insertAdjacentHTML('afterend', `
                    <section id="section-bottom-message">
                        <p>*Based on internal ROl calculation (September 2024 - September 2025). Individual results may vary.</p>
                    </section>
                `);
            }
        }

    })
    const config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    };
    observer.observe(document.body, config)
})
