function waitForElement(cssSelector, callback, timeout = 10000) {
    var stop = false;
    var timeoutId;
    var elementCached;

    var check = function () {
        try {
            if (stop) return;

            elementCached = document.querySelector(cssSelector);

            if (elementCached) {
                stop = true;
                clearTimeout(timeoutId);
                callback(elementCached);
            } else {
                window.requestAnimationFrame(check);
            }
        } catch (err) {
            console.error('waitForElement error:', err);
        }
    };

    window.requestAnimationFrame(check);

    timeoutId = setTimeout(function () {
        stop = true;
        console.warn('waitForElement timeout for:', cssSelector);
    }, timeout);
}

// ─── 4017: Grid content ───────────────────────────────────────────────────────
const gridContent = [
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-01_1.webp",
        title: "Estimates",
        desc: "Create estimates and quotes in seconds. Customize with your logo and colors.",
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-02_1.webp",
        title: "Invoicing",
        desc: "Generate invoices from estimates in one click. Add notes, discounts, and more."
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-03_2.webp",
        title: "Payments",
        desc: "Accept online payments and deposits. Debit and Credit card, PayPal, etc."
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-04_2.webp",
        title: "Expenses",
        desc: "Auto-capture expense details from receipt images. Get instant reports for taxes."
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-05_1.webp",
        title: "Mobile App",
        desc: "Manage quotes, invoices, tracking, and expenses remotely from anywhere via the app."
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-06_1.webp",
        title: "Rewards",
        desc: "Access rewards and money back on job materials. Home Depot, HD Supply, etc."
    }
];

// ─── Shared constants ─────────────────────────────────────────────────────────
const testNumber = '4019';
const testType = 'v1';

// ─── Shared smooth scroll ─────────────────────────────────────────────────────
function smoothScrollToElement(target, duration = 1200) {
    let targetElement;

    if (typeof target === 'string') {
        targetElement = document.querySelector(target);
    } else if (target instanceof Element) {
        targetElement = target;
    } else {
        console.error('Invalid target provided to smoothScrollToElement:', target);
        return;
    }

    if (!targetElement || typeof targetElement.getBoundingClientRect !== 'function') {
        console.error('Target element not found or invalid:', target);
        return;
    }

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function scrollStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            window.requestAnimationFrame(scrollStep);
        }
    }

    window.requestAnimationFrame(scrollStep);
}

// ─── Body class guard (keeps class on body through React re-renders) ──────────
waitForElement('body', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
                    document.body.classList.add(`spz_${testNumber}_${testType}`);
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
});

// ─── Main test logic ──────────────────────────────────────────────────────────
waitForElement('#tailwind', () => {

    // Gate: only run for logged-in users
    const isLoggedIn =
        document.querySelector('[data-testid="desktop-essentials-price"]') ||
        document.querySelector('[data-testid="mobile-essentials-price"]');

    if (!isLoggedIn) return;

    if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
        document.body.classList.add(`spz_${testNumber}_${testType}`);
    }

    const isCouponPage = document.querySelector('[data-testid="discount-banner-title"]');
    const segmentedTab = document.querySelector('[data-testid="interval-select"]');
    const monthlyBtn = segmentedTab.querySelector('[data-testid="btn-monthly"]');
    const annualBtn = segmentedTab.querySelector('[data-testid="btn-annual"]');

    // ── 4019: Build / rebuild pricing cards ───────────────────────────────────
    function applyPricingCards() {
        const isDesktop = window.screen.width >= 768;

        const headerTitleBlock = isDesktop
            ? document.querySelector('[data-testid="is-logo"]').nextElementSibling
            : document.querySelector('[data-testid="subscribe-header"]');
        const headerBlock = document.querySelector('[data-testid="is-logo"]').parentElement;

        const planCards = isDesktop
            ? document.querySelector('[data-testid="desktop-tier-cards"]')
            : document.querySelector('[data-testid="mobile-tier-cards"]');

        const essentialCard = document.querySelector('[data-testid="desktop-essentials-tier-card"]');
        const plusCard = document.querySelector('[data-testid="desktop-plus-tier-card"]');
        const premiumCard = document.querySelector('[data-testid="desktop-premium-tier-card"]');

        // Clean up injected elements that get re-created below
        const companyLogo = document.querySelector('.spz-company-logo');
        if (companyLogo) companyLogo.remove();

        if (isCouponPage) {
            document.querySelector('#tailwind').classList.add('spz-coupon-page');
        }

        // Mobile-only logo
        if (headerTitleBlock && !isDesktop) {
            headerTitleBlock.insertAdjacentHTML('beforebegin', `
                <div class="spz-company-logo">
                    <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4019/logo__color_webp.webp" alt="Invoice Simple logo">
                </div>
            `);
        }

        // Header block class reset
        if (headerBlock) {
            headerBlock.className = 'hidden md:block text-5xl font-bold text-gray-900 sm:text-center my-0 mx-auto';
        }

        // Title + subtitle
        if (headerTitleBlock) {
            headerTitleBlock.innerHTML = `
                <h3 class="spz-title" id="pricing-anchor">Exactly what you need. Nothing more, nothing less.</h3>
                <p class="spz-subtitle">Cancel or change your plan anytime.</p>
            `;
        }

        // Segmented tab parent spacing
        if (segmentedTab) {
            segmentedTab.parentElement.className = 'relative flex justify-center spz-segmented-tab-parent';
        }

        if (isDesktop) {
            // Essential card
            const essentialDescription = essentialCard.querySelector('p.text-gray-800.text-xl');
            const essentialBtn = essentialCard.querySelector('button');
            const essentialFeatureList = essentialCard.querySelector('[data-testid="desktop-essentials-feature-list"]').parentElement;

            if (essentialDescription) essentialDescription.textContent = 'For freelancers & solo business';
            if (essentialBtn) {
                essentialBtn.textContent = 'Upgrade now';
                essentialBtn.classList.add('spz4019_v1');
            }
            if (essentialFeatureList) {
                essentialFeatureList.innerHTML = `
                    <h4 class='spz-card-feature'>3 invoices a month</h4>
                    <h6 class='spz-card-feature-inc'>Includes:</h6>
                    <ul class='spz-card-feature-list'>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Create invoices</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Estimates</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Online payments</span></li>
                    </ul>
                `;
            }

            // Plus card
            const plusDescription = plusCard.querySelector('p.text-gray-800.text-xl');
            const plusBtn = plusCard.querySelector('button');
            const plusFeatureList = plusCard.querySelector('[data-testid="desktop-plus-feature-list"]').parentElement;

            if (plusDescription) plusDescription.textContent = 'For small businesses';
            if (plusBtn) {
                plusBtn.textContent = 'Upgrade now';
                plusBtn.classList.add('spz4019_v1');
            }
            if (plusFeatureList) {
                plusFeatureList.innerHTML = `
                    <h4 class='spz-card-feature'>10 invoices a month</h4>
                    <h6 class='spz-card-feature-inc'>Everything in Essentials, and:</h6>
                    <ul class='spz-card-feature-list'>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Payment reminders</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Accept deposits</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Project photos</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Business signatures</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Mobile app</span></li>
                    </ul>
                `;
            }

            // Premium card
            const premiumDescription = premiumCard.querySelector('p.text-gray-800.text-xl');
            const premiumBtn = premiumCard.querySelector('button');
            const premiumFeatureList = premiumCard.querySelector('[data-testid="desktop-premium-feature-list"]').parentElement;

            if (premiumDescription) premiumDescription.textContent = 'For medium businesses';
            if (premiumBtn) {
                premiumBtn.textContent = 'Upgrade now';
                premiumBtn.classList.add('spz4019_v1');
            }
            if (premiumFeatureList) {
                premiumFeatureList.innerHTML = `
                    <h4 class='spz-card-feature'>Unlimited invoices</h4>
                    <h6 class='spz-card-feature-inc'>Everything in Plus, and:</h6>
                    <ul class='spz-card-feature-list'>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Request reviews</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Premium templates</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Client signatures</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Expense tracking</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Summary reports</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Perks &amp; rewards</span></li>
                        <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Priority support</span></li>
                    </ul>
                `;
            }
        } else {
            // Mobile: inject custom cards if not already present
            if (document.querySelector('[data-testid="mobile-essentials-tier-card-custom"]')) return;

            planCards.insertAdjacentHTML('beforeend', `
                <div data-testid="mobile-essentials-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] false">
                    <div class="p-[20px] rounded-t-[30px]" style="border: 2px solid rgb(229, 231, 235);">
                        <div class="flex items-center">
                            <h3 class="text-3xl text-gray-900 capitalize font-semibold">essentials</h3>
                            <div data-testid="subscription-badge-v2-c">Save 50%</div>
                            <div data-testid="subscription-badge-v2">Save 16%</div>
                        </div>
                        <p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For freelancers &amp; solo business</p>
                        <strong class="spz-discounted-price-coupon">$4.99</strong>
                        <strong class="spz-discounted-price">$59.88</strong>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-essentials-price">${isCouponPage ? "$2.49" : "$4.99"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-essentials-price">$49.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                        <button type="button" data-testid="mobile-essentials-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button>
                    </div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(229, 231, 235); border-image: initial;">
                        <h4 class="spz-card-feature">3 invoices a month</h4>
                        <h6 class="spz-card-feature-inc">Includes:</h6>
                        <ul class="spz-card-feature-list">
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Create invoices</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Estimates</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Online payments</span></li>
                        </ul>
                    </div>
                </div>
                <div data-testid="mobile-plus-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] bg-orange-50">
                    <div class="bg-orange-200 rounded-t-[30px] py-3">
                        <p class="text-center text-2xl font-bold text-gray-800 capitalize">Most popular</p>
                    </div>
                    <div class="p-[20px] false" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(254, 215, 170); border-image: initial;">
                        <div class="flex items-center">
                            <h3 class="text-3xl text-gray-900 capitalize font-semibold">plus</h3>
                            <div class="spz-subscription-badge" data-testid="subscription-badge-v2-c">Save 50%</div>
                            <div class="spz-subscription-badge" data-testid="subscription-badge-v2">Save 16%</div>
                        </div>
                        <p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For small businesses</p>
                        <strong class="spz-discounted-price-coupon">$13.49</strong>
                        <strong class="spz-discounted-price">$161.88</strong>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-plus-price">${isCouponPage ? "$6.74" : "$13.49"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-plus-price">$134.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                        <button type="button" data-testid="mobile-plus-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button>
                    </div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(254, 215, 170); border-image: initial;">
                        <h4 class="spz-card-feature">10 invoices a month</h4>
                        <h6 class="spz-card-feature-inc">Everything in Essentials, and:</h6>
                        <ul class="spz-card-feature-list">
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Payment reminders</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Accept deposits</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Project photos</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Business signatures</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Mobile app</span></li>
                        </ul>
                    </div>
                </div>
                <div data-testid="mobile-premium-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] false">
                    <div class="p-[20px] rounded-t-[30px]" style="border: 2px solid rgb(229, 231, 235);">
                        <div class="flex items-center">
                            <h3 class="text-3xl text-gray-900 capitalize font-semibold">premium</h3>
                            <div data-testid="subscription-badge-v2-c">Save 50%</div>
                            <div data-testid="subscription-badge-v2">Save 16%</div>
                        </div>
                        <p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For medium businesses</p>
                        <strong class="spz-discounted-price-coupon">$19.99</strong>
                        <strong class="spz-discounted-price">$239.88</strong>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-premium-price">${isCouponPage ? "$9.99" : "$19.99"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                        <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-premium-price">$199.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                        <button type="button" data-testid="mobile-premium-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button>
                    </div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(229, 231, 235); border-image: initial;">
                        <h4 class="spz-card-feature">Unlimited invoices</h4>
                        <h6 class="spz-card-feature-inc">Everything in Plus, and:</h6>
                        <ul class="spz-card-feature-list">
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Request reviews</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Premium templates</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Client signatures</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Expense tracking</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Summary reports</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Perks &amp; rewards</span></li>
                            <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check.svg" alt="check icon"><span>Priority support</span></li>
                        </ul>
                    </div>
                </div>
            `);

            // Delegate clicks on mobile custom cards → trigger original card + buy button
            planCards.addEventListener('click', (e) => {
                if (!e.target.classList.contains('spz-buy-btn')) return;
                const parentCard = e.target.closest('.spz-parent-card-mobile');
                if (!parentCard) return;

                const customTargetElement = parentCard.getAttribute('data-testid');
                if (!customTargetElement || !customTargetElement.endsWith('-custom')) return;

                e.preventDefault();
                e.stopPropagation();

                const originalTargetElement = customTargetElement.replace('-custom', '');
                const targetElement = document.querySelector(`[data-testid="${originalTargetElement}"]`);

                if (targetElement) {
                    targetElement.click();
                    setTimeout(() => {
                        document.querySelector('[data-testid="mobile-buy-button"]').click();
                    }, 100);
                } else {
                    console.warn(`Original element not found: ${originalTargetElement}`);
                }
            });
        }

        // ── "Compare all" anchor (4019) ────────────────────────────────────────
        const anchorBlock = document.querySelector('.spz-anchor');
        if (anchorBlock) anchorBlock.remove();

        planCards.insertAdjacentHTML('afterend', `
            <div class="spz-anchor">
                <span>Compare all features</span>
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537851/invoicesimple/4019/next.svg" alt="Scroll to table icon">
            </div>
        `);

        // ── 4017: "All plans include" grid (inserted right after .spz-anchor) ──
        const existingGrid = document.querySelector('.spz__plan-desc');
        if (existingGrid) existingGrid.remove();

        document.querySelector('.spz-anchor').insertAdjacentHTML('afterend', `
            <div class="spz__plan-desc">
                <h5>All plans include:</h5>
                <div class="spz__grid-items">
                    ${gridContent.map(item => `
                        <div class="spz__grid-item">
                            <img src="${item.image}" alt="${item.title}" />
                            <div>
                                <strong>${item.title}</strong>
                                <p>${item.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <a href="#pricing-anchor" class="spz${testNumber}_${testType}">
                    Get started
                </a>
            </div>
        `);

        // Re-attach scroll listeners after DOM rebuild
        attachScrollListeners();
    }

    // ── Scroll listeners ──────────────────────────────────────────────────────
    function attachScrollListeners() {
        const anchor = document.querySelector('.spz-anchor');
        if (anchor) {
            // Replace node to clear old listeners before adding a fresh one
            const freshAnchor = anchor.cloneNode(true);
            anchor.parentNode.replaceChild(freshAnchor, anchor);
            freshAnchor.addEventListener('click', () => {
                smoothScrollToElement('#feature-matrix');
            });
        }
    }

    // Delegate "Get started" clicks (4017 button scrolls back up to pricing)
    document.addEventListener('click', function (e) {
        if (e.target && e.target.classList.contains(`spz${testNumber}_${testType}`)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const href = e.target.getAttribute('href');
            const targetId = href ? href.replace('#', '') : 'pricing-anchor';
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                smoothScrollToElement(targetElement, 1200);
            } else {
                console.warn('Target element not found:', targetId);
                setTimeout(() => {
                    const retryTarget = document.getElementById(targetId);
                    if (retryTarget) {
                        smoothScrollToElement(retryTarget, 1200);
                    } else {
                        console.error('Still cannot find target:', targetId);
                    }
                }, 500);
            }

            return false;
        }
    }, true);

    // ── Tab listeners ─────────────────────────────────────────────────────────
    monthlyBtn.classList.add('spz-active');

    monthlyBtn.addEventListener('click', () => {
        if (!monthlyBtn.classList.contains('spz-active')) {
            setTimeout(() => {
                document.querySelector('#tailwind').classList.remove('spz-show-badge');
                monthlyBtn.classList.add('spz-active');
                annualBtn.classList.remove('spz-active');
            }, 100);
        }
    });

    annualBtn.addEventListener('click', () => {
        if (!annualBtn.classList.contains('spz-active')) {
            setTimeout(() => {
                document.querySelector('#tailwind').classList.add('spz-show-badge');
                annualBtn.classList.add('spz-active');
                monthlyBtn.classList.remove('spz-active');
            }, 100);
        }
    });

    // ── Initial render ────────────────────────────────────────────────────────
    applyPricingCards();

    // ── Resize handler ────────────────────────────────────────────────────────
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            applyPricingCards();
        }, 250);
    });
});