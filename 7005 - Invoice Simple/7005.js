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

const planPrices = {
    plus: {
        plan: 'Plus',
        desc: "For small businesses",
        monthly: '$13.49',
        annual: '$134.99',
        invoiceMessage: "10 invoices per month",
        listTitle: "Includes:",
        listItems: [
            "Invoices & estimates",
            "Online payments",
            "Payment reminders",
            "Project photos",
            "Request reviews",
            "Expense tracking",
        ],

    },
    premium: {
        plan: 'Premium',
        desc: "For medium businesses",
        monthly: '$19.99',
        annual: '$199.99',
        invoiceMessage: "Unlimited invoices",
        listTitle: "Unlimited Invoices:",
        listItems: [
            "Premium templates",
            "Client eSignatures",
            "Version history",
            "Priority support",
        ],
    },
}

const testNumber = '7005'
const testVersion = 'v'

console.log('7005 ping')

let previousPath = window.location.pathname
let pendingCreationCheck = false // Flag to track if we came from invoice creation

function getCurrentUserId() {
    try {
        // Search for any localStorage key that contains 'currentUser'
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key && key.includes('currentUser')) {
                const userData = localStorage.getItem(key)
                if (userData) {
                    const parsed = JSON.parse(userData)
                    if (parsed.objectId) {
                        console.log('7005: Found user ID:', parsed.objectId)
                        return parsed.objectId
                    }
                }
            }
        }
    } catch (e) {
        console.log('7005: Error getting user ID', e)
    }
    return null
}

function getStorageKey(popupType) {
    const userId = getCurrentUserId()
    if (userId) {
        return `spz_7005_${popupType}_popup_shown_${userId}`
    }
    // Fallback if no user ID found
    return `spz_7005_${popupType}_popup_shown`
}

function checkAndShowPopup() {
    const pathname = window.location.pathname

    // Must be on /invoices page
    if (pathname !== '/invoices') return

    console.log('7005: Checking popup conditions')
    console.log('7005: pendingCreationCheck flag:', pendingCreationCheck)

    // Wait for either the original banner OR the modified banner (by another test like 7006)
    // Original: [data-sentry-component="getFreeBannerTitle"]
    // Modified: .spz-banner (7006 replaces the banner)
    const bannerSelector = '[data-sentry-component="getFreeBannerTitle"], .spz-banner'

    waitForElement(bannerSelector, function (bannerEl) {
        console.log('7005: Free trial banner found', bannerEl)
        document.body.classList.add(`spz_${testNumber}_${testVersion}`)

        // Check and reset the flag INSIDE the callback to avoid race conditions
        const cameFromCreation = pendingCreationCheck
        pendingCreationCheck = false // Reset after capturing

        console.log('7005: Came from creation:', cameFromCreation)

        // Only show popup if user came from invoice creation
        if (!cameFromCreation) {
            console.log('7005: Did not come from invoice creation, skipping popup')
            return
        }

        console.log('7005: User came from invoice creation, checking invoice count')

        // Wait for invoice list to load and count invoices
        waitForElement('[data-sentry-component="DocListRow"]', function () {
            setTimeout(function () {
                const docList = document.querySelectorAll('[data-sentry-component="DocListRow"]')
                const currentCount = docList.length
                const plusKey = getStorageKey('plus')
                const premiumKey = getStorageKey('premium')

                console.log('7005: Invoice count:', currentCount)
                console.log('7005: Plus key:', plusKey, '| Value:', localStorage.getItem(plusKey))
                console.log('7005: Premium key:', premiumKey, '| Value:', localStorage.getItem(premiumKey))

                // Show Plus popup only after 1st invoice creation
                if (currentCount === 1 && !localStorage.getItem(plusKey)) {
                    console.log('7005: Showing PLUS popup')
                    showPopup('plus')
                    localStorage.setItem(plusKey, 'true')
                }
                // Show Premium popup only after 2nd invoice creation
                else if (currentCount === 2 && !localStorage.getItem(premiumKey)) {
                    console.log('7005: Showing PREMIUM popup')
                    showPopup('premium')
                    localStorage.setItem(premiumKey, 'true')
                }
                else {
                    console.log('7005: No popup shown - conditions not met')
                }
            }, 500)
        })
    })
}

function handleSubscriptionPage() {
    console.log('7005: handleSubscriptionPage called')
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    const billing = urlParams.get('billing');
    const isDesktop = window.screen.width >= 768

    console.log('7005: URL params - plan:', plan, 'billing:', billing)
    console.log('7005: isDesktop:', isDesktop)

    if (plan && billing) {
        console.log(`7005: Auto-selecting ${plan} ${billing}`);

        // Wait for the subscription page elements to load
        waitForElement('[data-testid="plan-tier-cards"]', () => {
            console.log('7005: Plan tier cards found')

            // 1. Select billing cycle (monthly/annual)
            const billingSelector = billing === 'monthly'
                ? '[data-testid="btn-monthly"]'
                : '[data-testid="btn-annual"]';
            const billingBtn = document.querySelector(billingSelector);
            console.log('7005: Billing selector:', billingSelector)
            console.log('7005: Billing button found:', !!billingBtn)
            if (billingBtn) billingBtn.click();

            if (isDesktop) {
                // 2. Select plan (plus/premium)
                const planSelector = plan === 'plus'
                    ? '[data-testid="desktop-plus-buy-button"]'
                    : '[data-testid="desktop-premium-buy-button"]';
                const planBtn = document.querySelector(planSelector);
                console.log('7005: Plan selector:', planSelector)
                console.log('7005: Plan button found:', !!planBtn)
                setTimeout(() => {
                    if (planBtn) {
                        console.log('7005: Clicking plan button')
                        planBtn.click();
                    }
                }, 500)
            }
            else {
                // 2. Click on the plan card
                const planCardSelector = plan === 'plus'
                    ? '[data-testid="mobile-plus-tier-card"]'
                    : '[data-testid="mobile-premium-tier-card"]';
                const planCard = document.querySelector(planCardSelector);
                console.log('7005: Plan card selector:', planCardSelector)
                console.log('7005: Plan card found:', !!planCard)
                if (planCard) planCard.click();

                const planBtn = document.querySelector('[data-testid="mobile-buy-button"]');
                console.log('7005: Mobile buy button found:', !!planBtn)
                setTimeout(() => {
                    if (planBtn) {
                        console.log('7005: Clicking mobile buy button')
                        planBtn.click();
                    }
                }, 500);
            }
        });
    } else {
        console.log('7005: No plan/billing params, skipping auto-select')
    }
}

function handleRoute() {
    const pathname = window.location.pathname;

    console.log('7005: Route change detected')
    console.log('7005: From:', previousPath, 'To:', pathname)

    // Check if navigating TO /invoices FROM invoice creation/editing
    if (pathname === '/invoices') {
        const cameFromCreation = previousPath === '/invoices/new' ||
            (previousPath.startsWith('/invoices/') && previousPath !== '/invoices')

        if (cameFromCreation) {
            console.log('7005: Setting pendingCreationCheck flag')
            pendingCreationCheck = true
        }

        checkAndShowPopup()
    } else if (pathname === "/subscription") {
        handleSubscriptionPage()
    }

    // Update previousPath AFTER processing
    previousPath = pathname
}

// Intercept Next.js navigation
(function (history) {
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function () {
        pushState.apply(history, arguments);
        handleRoute();
    };

    history.replaceState = function () {
        replaceState.apply(history, arguments);
        handleRoute();
    };
})(window.history);

// Listen for back/forward button
window.addEventListener('popstate', handleRoute);

// Initial load
waitForElement('#tailwind', function () {
    console.log('7005: Initial load, path:', window.location.pathname)
    previousPath = window.location.pathname

    // On initial load, just add the class if free trial banner exists (don't show popup)
    // Check for both original and modified banner
    waitForElement('[data-sentry-component="getFreeBannerTitle"], .spz-banner', function () {
        document.body.classList.add(`spz_${testNumber}_${testVersion}`)
    })

    // Add dot at the end of the footer auto-save text
    console.log("footer add dot1")
    waitForElement('footer > p', function (el) {
        console.log("footer add dot2")
        if (el.textContent.trim() === 'All your invoices are auto saved here') {
            el.textContent = 'All your invoices are auto saved here.'
        }
    })
});

function showPopup(plan) {
    console.log(`Showing ${plan} popup`);
    const popup = document.createElement('div');
    popup.innerHTML = `
    <div class="spz-popup-overlay">
        <div class="spz-popup">
            <div class="spz-popup-content">
                <div class="spz-popup-badge">
                    <span>${plan === 'plus' ? '1 INVOICE' : 'NO INVOICES'}</span> LEFT ON YOUR FREE TRIAL
                </div>
                <img class="spz-popup-logo" src="https://res.cloudinary.com/spiralyze/image/upload/v1763403938/invoicesimple/7005/vector.svg" alt="Invoice Simple logo">
                <h2>Based on your usage we recommend</h2>
                <div class="spz-plan-switcher">
                    <div class="spz-switch-slider"></div>
                    <button class="spz-switch-btn active" data-plan="monthly">Monthly</button>
                    <button class="spz-switch-btn" data-plan="annual">Annual</button>
                </div>
                <button id="spz-close-popup">
                    <img src="https://res.cloudinary.com/spiralyze/image/upload/v1763403938/invoicesimple/7005/close.svg" alt="close">
                </button>
                <div class="spz-plan-card"></div>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(popup);

    // Close button handler
    document.getElementById('spz-close-popup').addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Segmented control handler
    const planCard = popup.querySelector('.spz-plan-card');
    const slider = popup.querySelector('.spz-switch-slider');
    const switchBtns = popup.querySelectorAll('.spz-switch-btn');

    switchBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            switchBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Slide the indicator
            const sliderWidth = 78;
            slider.style.transform = index === 0 ? 'translateX(0)' : `translateX(${sliderWidth + 3}px)`;

            const selectedPlan = btn.dataset.plan;
            console.log('Selected plan:', selectedPlan);

            planCard.innerHTML = `
            <div class="spz-plan-content spz-plan-${plan}">
                <div class="spz-plan-upper">
                    <div class="spz-plan-info">
                        <h3>${planPrices[plan].plan}</h3>
                        <p>${planPrices[plan].desc}</p>
                    </div>
                    <div class="spz-plan-price">
                        <p>${planPrices[plan][selectedPlan]}<span>/${selectedPlan == 'monthly' ? 'mo' : 'yr'}</span></p>
                    </div>
                    <div class="spz-plan-invoice">${planPrices[plan].invoiceMessage}</div>
                    <button class="spz-upgrade-btn spz7005_v">
                        <span>Upgrade now</span>
                    </button>
                </div>
                <div class="spz-plan-lower">
                    <h4>${planPrices[plan].listTitle}</h4>
                    <ul>
                        ${planPrices[plan].listItems.map(item => `
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1763403938/invoicesimple/7005/8725591_check_icon_1_1.svg" alt="check icon">
                            <span>${item}</span>
                        </li>`).join('')}
                    </ul>
                    <a class="spz-see-other-plans" href="https://app.invoicesimple.com/subscription">
                        <span>See other plans</span>
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1763403938/invoicesimple/7005/frame_158.svg" alt="see other plans">
                    </a>
                </div>
            </div>
        `;

            // Add click handler for Upgrade button (MUST be after innerHTML)
            planCard.querySelector('.spz-upgrade-btn').addEventListener('click', () => {
                const redirectUrl = `https://app.invoicesimple.com/subscription?plan=${plan}&billing=${selectedPlan}`;
                window.location.href = redirectUrl;
            });
        });
    });

    // Trigger click on the active button to populate initial content
    popup.querySelector('.spz-switch-btn.active').click();
}