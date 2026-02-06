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
hiddenValue('#4005 | Constant Contact | Pricing | Full Redesign (V2)', 'SPZ_4005_V1')

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
    }, 5000)
}

const planData = {
    subTitle: [
        'Essential email and social marketing tools. Basic reporting.',
        'Adds prebuilt AI automations, A/B testing, and advanced reporting.',
        'Adds custom automations, targeted ads, and SEO recommendations.'
    ],
    listTitle: [
        'Includes:',
        'Includes everything in Lite, plus:',
        'Includes everything in Standard, plus:'
    ],
    list: [
        `<li class="spz-plan-feature">Drag-and-drop email editor</li><li class="spz-plan-feature">AI content generator</li><li class="spz-plan-feature">600+ email templates</li>`,
        `<li class="spz-plan-feature">Email and social media scheduler</li><li class="spz-plan-feature">Subject line generator & A/B testing</li><li class="spz-plan-feature">Detailed engagement reports</li>`,
        `<li class="spz-plan-feature">Personalized email content</li><li class="spz-plan-feature">Unlimited custom automations</li><li class="spz-plan-feature">SMS campaigns & reporting</li>`
    ]
}

function init() {
    if (!document.querySelector('.spz-plan-feature-list')) {

        document.body.classList.add('spz_4005_v1');
        // insert trustpilot reviews
        if (!document.querySelector('.spz-heading')) {
            document.querySelector('#v-2-pricing-section .container').insertAdjacentHTML('afterbegin', '<div class="spz-heading"><h1>Pricing</h1></div>');
        }

        if (document.querySelector('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option')) {
            document.querySelectorAll('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option').forEach((card, i) => {
                card.insertAdjacentHTML('afterbegin', `<div class="spz-plan-top-wrapper"></div><div class="spz-plan-bottom-wrapper"></div>`);
                card.querySelector('.spz-plan-top-wrapper').insertAdjacentElement('beforeend', card.querySelector('.card-select-option__price-prefix-container'));
                card.querySelector('.spz-plan-top-wrapper').insertAdjacentElement('beforeend', card.querySelector('.payflow-ui.price.card-select-option__price'));
                card.querySelector('.spz-plan-top-wrapper h3').insertAdjacentHTML('afterend', `<p class="spz-plan-subtitle">${planData.subTitle[i]}</p>`);
                card.querySelector('.spz-plan-top-wrapper').insertAdjacentHTML('afterend', `<p class="spz-plan-subtitle desk-only">${planData.subTitle[i]}</p>`);
                card.querySelector('.spz-plan-bottom-wrapper').insertAdjacentHTML('beforeend', `<p class="list-title">${planData.listTitle[i]}</p><ul class="spz-plan-feature-list">${planData.list[i]}</ul>`);
            });
        }

        if (document.querySelector('.spz_4005_v1 .payflow-ui.card-select .card-select-option.highlighted')) {
            document.querySelector('.spz_4005_v1 .payflow-ui.card-select .card-select-option.highlighted').insertAdjacentHTML('afterbegin', `<div class="recommended-badge"><span>Recommended<img src="https://res.cloudinary.com/spiralyze/image/upload/v1760011263/constantcontact/4001/icon-thumb-up.svg" alt="Thumb up"></span></div>`);
        }

        if (document.querySelector('.card-select') && !document.querySelector('.spz-contact-wrapper')) {
            document.querySelector('.card-select').insertAdjacentHTML('beforeend', `<div class="spz-contact-wrapper">
                <div class="copy-wrapper">
                    <h2>Need multiple accounts?</h2>
                </div>
                <p class="spz-contact-text">Get custom pricing, along with the Constant Contact console. Manage users, budget email sends, & share locked brand templates. All from one interface.</p>
                <a href="https://www.constantcontact.com/partner-offer/multi-account?ic=pricing_multi-teams_contact-us-spz-pricing-v1" class="spz-contact-button">Contact Us</a>
            </div>`);
        }

        if (document.querySelector('.payflow-ui-card-select-wrapper') &&
            !document.querySelector('.spz-show-more-cta')) {
            document.querySelector('.payflow-ui-card-select-wrapper').insertAdjacentHTML('afterend', `<div class="spz-show-more-cta"><span>SEE ALL FEATURES</span><img src="https://res.cloudinary.com/spiralyze/image/upload/v1760011264/constantcontact/4001/arrow_down.svg"></div>`);
        }

        if (document.querySelector('#v-2-pricing-section') && !document.querySelector('.spz-logo-section')) {
            document.querySelector('#v-2-pricing-section').insertAdjacentHTML('beforeend', `<div class="spz-logo-section">
                <div class="logo-wrapper">
                    <picture>
                        <source media="(min-width:992px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/4001/logos-1440_1.webp">
                        <source media="(min-width:768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/4001/logos-768_2.webp">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/4001/logos-360_1.webp" loading="lazy" alt="Logos">
                    </picture>
                </div>
            </div>`);
        }
    }

    // Always attach the event listener (moved outside the if statement)
    // Remove old listener first to prevent duplicates
    const showMoreBtn = document.querySelector('.spz-show-more-cta');
    if (showMoreBtn) {
        // Clone and replace to remove all old event listeners
        const newBtn = showMoreBtn.cloneNode(true);
        showMoreBtn.parentNode.replaceChild(newBtn, showMoreBtn);

        // Add fresh event listener
        newBtn.addEventListener('click', function () {
            if (!newBtn.classList.contains('spz-cta-expanded')) {
                newBtn.classList.add('spz-cta-expanded');
                newBtn.querySelector('span').innerText = 'Hide all features';
            } else {
                newBtn.classList.remove('spz-cta-expanded');
                newBtn.querySelector('span').innerText = 'SEE ALL FEATURES';
            }
        });
    }
}

waitForElement('#tier-select', function () {
    document.body.classList.add('spz_4005_v1');
    init();

    // Just check every 500ms if our modifications disappeared
    setInterval(() => {
        const hasCards = document.querySelector('.card-select-option');
        const hasOurModifications = document.querySelector('.spz-plan-feature-list');

        if (hasCards && !hasOurModifications) {
            console.log('Re-applying init()');
            init();
        }
    }, 500);
});