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

let isApplying4006 = false;

function apply4006Changes() {
    if (isApplying4006) return;
    isApplying4006 = true;

    let changesApplied = false;

    const highlightedCard = document.querySelector('.payflow-ui-card-select-wrapper .with-highlighted-text')

    if (highlightedCard) {
        const pricePeriodSpan = highlightedCard.querySelector('.price__period')
        const pricePeriodSpanMobile = highlightedCard.querySelector('.price__period-mobile')

        if (pricePeriodSpan && pricePeriodSpan.innerHTML !== "&nbsp;for 1 month*") {
            pricePeriodSpan.innerHTML = "&nbsp;for 1 month*"
            changesApplied = true;
        }

        if (pricePeriodSpanMobile && pricePeriodSpanMobile.innerHTML !== "&nbsp;for 1 month*") {
            pricePeriodSpanMobile.innerHTML = "&nbsp;for 1 month*"
            changesApplied = true;
        }
    }

    if (changesApplied) {
        console.log("SPZ_4006_V1 text changes applied")
    }

    isApplying4006 = false;
}

function init() {
    if (!document.querySelector('.spz-plan-feature-list')) {

        document.body.classList.add('spz_4006_v1');

        if (!document.querySelector('.spz-heading')) {
            document.querySelector('#v-2-pricing-section .container').insertAdjacentHTML('afterbegin', '<div class="spz-heading"><h1>Pricing</h1></div>');
        }

        if (document.querySelector('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option')) {
            document.querySelectorAll('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option').forEach((card, i) => {
                card.insertAdjacentHTML('afterbegin', `<div class="spz-plan-top-wrapper"></div><div class="spz-plan-bottom-wrapper"></div>`);
                card.querySelector('.spz-plan-top-wrapper').insertAdjacentElement('beforeend', card.querySelector('.card-select-option__price-prefix-container'));
                card.querySelector('.spz-plan-top-wrapper').insertAdjacentElement('beforeend', card.querySelector('.payflow-ui.price.card-select-option__price'));
                card.querySelector('.spz-plan-top-wrapper h3').insertAdjacentHTML('afterend', `<p class="spz-plan-subtitle">${planData.subTitle[i]}</p>`);
                card.querySelector('.spz-plan-bottom-wrapper').insertAdjacentHTML('beforeend', `<p class="list-title">${planData.listTitle[i]}</p><ul class="spz-plan-feature-list">${planData.list[i]}</ul>`);
            });
        }

        document.querySelector('.spz_4006_v1 .payflow-ui.card-select .card-select-option.highlighted h3').insertAdjacentHTML('beforeend', `<span class="recommended-badge">Recommended<img src="https://res.cloudinary.com/spiralyze/image/upload/v1760011263/constantcontact/4001/icon-thumb-up.svg" alt="Thumb up"></span>`);

        if (document.querySelectorAll('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option')[1]) {
            const standardCard = document.querySelectorAll('.payflow-ui-card-select-wrapper[data-num-pricing-cards="3"] .payflow-ui.card-select .card-select-option')[1];
            const ctaButton = standardCard.querySelector('button.card-select-button');
            if (ctaButton) {
                const newButton = ctaButton.cloneNode(true);
                ctaButton.parentNode.replaceChild(newButton, ctaButton);

                newButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    window.location.href = 'https://www.constantcontact.com/buynow/plans/signup?planType=SILVER&promotionCode=EOYSTANDARD';
                    return false;
                }, true);
            }
        }



        waitForElement('.payflow-ui.card-select .card-select-option', function () {
            if (!document.querySelector('.spz-contact-wrapper')) {
                const cardWrapper = document.querySelector('.payflow-ui-card-select-wrapper');
                if (cardWrapper) {
                    cardWrapper.insertAdjacentHTML('afterend', `<div class="spz-contact-wrapper">
                        <div class="copy-wrapper">
                            <h2>Need to manage multiple marketing efforts at once?</h2>
                            <p class="spz-contact-text">Get custom pricing, along with the convenience of our product console, which allows centralized control over your marketing with Constant Contact. Manage users, budget email sends, and lock down brand templates all in a single interface.</p>
                        </div>
                        <a href="https://www.constantcontact.com/partner-offer/multi-account?ic=pricing_multi-teams_contact-us-spz-pricing-v1" class="spz-contact-button">Contact Us</a>
                    </div>
                    <div class="spz-show-more-cta"><span>SEE ALL FEATURES</span><img src="https://res.cloudinary.com/spiralyze/image/upload/v1760011264/constantcontact/4001/arrow_down.svg"></div>`);

                    document.querySelector('.spz-show-more-cta').addEventListener('click', function () {
                        if (!document.querySelector('.spz-show-more-cta.spz-cta-expanded')) {
                            document.querySelector('.spz-show-more-cta').classList.add('spz-cta-expanded');
                            document.querySelector('.spz-show-more-cta span').innerText = 'Hide all features';
                        } else {
                            document.querySelector('.spz-show-more-cta').classList.remove('spz-cta-expanded');
                            document.querySelector('.spz-show-more-cta span').innerText = 'SEE ALL FEATURES';
                        }
                    });
                }
            }
        });

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

        apply4006Changes();
    }
}

waitForElement('#tier-select', function () {
    document.body.classList.add('spz_4006_v1');
    init();

    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const observerCallback = debounce(() => {
        const tierSelect = document.querySelector('#tier-select');
        const featureList = document.querySelector('.spz-plan-feature-list');

        if (tierSelect && !featureList) {
            init();
        }

        apply4006Changes();
    }, 300);

    const observerConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, observerConfig);
});

console.log("SPZ_4006_V1 loaded (4001 base + 4006 text updates)");