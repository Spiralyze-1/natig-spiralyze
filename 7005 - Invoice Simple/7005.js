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

function isFreeTrial() {
    const bannerText = document.querySelector('.spz-banner_text > strong')
    return !!document.querySelector('[data-sentry-component="getFreeBannerTitle"]') || (bannerText && bannerText.textContent.includes('free trial'))
}

function cameFromInvoiceCreation() {
    // Check if user came from /invoices/new or /invoices/[id] (editing/creating)
    return previousPath === '/invoices/new' || (previousPath.startsWith('/invoices/') && previousPath !== '/invoices')
}

function checkAndShowPopup() {
    console.log('7005: Checking popup conditions')
    console.log('7005: Previous path:', previousPath)
    console.log('7005: Current path:', window.location.pathname)

    // Must be on /invoices page
    if (window.location.pathname !== '/invoices') return

    // Must be free trial user
    if (!isFreeTrial()) {
        console.log('7005: Not a free trial user, skipping')
        return
    }

    console.log('7005 test started')
    document.body.classList.add(`spz_${testNumber}_${testVersion}`)

    // Must have come from invoice creation/editing
    if (!cameFromInvoiceCreation()) {
        console.log('7005: Did not come from invoice creation, skipping popup')
        return
    }

    console.log('7005: User came from invoice creation')

    // Wait for invoice list to load and count invoices
    waitForElement('[data-sentry-component="DocListRow"]', function () {
        setTimeout(function () {
            const docList = document.querySelectorAll('[data-sentry-component="DocListRow"]')
            const currentCount = docList.length
            console.log('7005: Invoice count:', currentCount)

            // Show Plus popup only after 1st invoice creation
            if (currentCount === 1 && !localStorage.getItem('spz_7005_plus_popup_shown')) {
                showPopup('plus')
                localStorage.setItem('spz_7005_plus_popup_shown', 'true')
            }
            // Show Premium popup only after 2nd invoice creation
            else if (currentCount === 2 && !localStorage.getItem('spz_7005_premium_popup_shown')) {
                showPopup('premium')
                localStorage.setItem('spz_7005_premium_popup_shown', 'true')
            }
        }, 1000)
    })
}

function handleSubscriptionPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    const billing = urlParams.get('billing');
    const isDesktop = window.screen.width >= 768

    if (plan && billing) {
        console.log(`7005: Auto-selecting ${plan} ${billing}`);

        // Wait for the subscription page elements to load
        waitForElement('[data-testid="plan-tier-cards"]', () => {
            // 1. Select billing cycle (monthly/annual)
            const billingSelector = billing === 'monthly'
                ? '[data-testid="btn-monthly"]'
                : '[data-testid="btn-annual"]';
            const billingBtn = document.querySelector(billingSelector);
            if (billingBtn) billingBtn.click();

            if (isDesktop) {
                // 2. Select plan (plus/premium)
                const planSelector = plan === 'plus'
                    ? '[data-testid="desktop-plus-buy-button"]'
                    : '[data-testid="desktop-premium-buy-button"]';
                const planBtn = document.querySelector(planSelector);
                setTimeout(() => {
                    if (planBtn) planBtn.click();
                }, 500)
            }
            else {
                // 2. Click on the plan card
                const planCardSelector = plan === 'plus'
                    ? '[data-testid="mobile-plus-tier-card"]'
                    : '[data-testid="mobile-premium-tier-card"]';
                const planCard = document.querySelector(planCardSelector);
                if (planCard) planCard.click();

                const planBtn = document.querySelector('[data-testid="mobile-buy-button"]');
                setTimeout(() => {
                    if (planBtn) planBtn.click();
                }, 500);
            }
        });
    }
}

function handleRoute() {
    const pathname = window.location.pathname;

    if (pathname === "/subscription") {
        handleSubscriptionPage();
    } else if (pathname === "/invoices") {
        checkAndShowPopup();
    }

    // Update previousPath AFTER checking (so we can compare old vs new)
    previousPath = pathname;
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

// Initial load - only set up the class, don't show popup on initial page load
waitForElement('#tailwind', function () {
    // On initial load, just add the class if free trial, but don't show popup
    if (isFreeTrial()) {
        document.body.classList.add(`spz_${testNumber}_${testVersion}`)
    }
    // Store initial path
    previousPath = window.location.pathname;
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