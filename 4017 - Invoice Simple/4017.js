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
        desc: "Accept online payments and deposits. Debit and Credit card, PayPal, etc. "
    },
    {
        image: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4017/img-04_2.webp",
        title: "Expenses",
        desc: "Auto-capture expense details from receipt images. Get instant reports for taxes. "
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

// ROBUST smooth scroll function
function smoothScrollToElement(targetElement, duration = 1200) {
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

// Example test: Test number = 4017, Test type = v1 (variation)
const testNumber = '4017';
const testType = 'v1';

waitForElement('body', () => {
    let currentPath = window.location.pathname;
    let scrollListenerAttached = false;
    let isProcessing = false; // Prevent concurrent processing
    
    function addBodyClass() {
        if (!document.body.classList.contains(`spz_${testNumber}_${testType}`) && window.location.pathname.includes("/subscription")) {
            document.body.classList.add(`spz_${testNumber}_${testType}`);
        } else if (document.body.classList.contains(`spz_${testNumber}_${testType}`) && !window.location.pathname.includes("/subscription")) {
            document.body.classList.remove(`spz_${testNumber}_${testType}`);
        }
    }
    
    function addPricingAnchors() {
        // Wait a bit to ensure h3s are rendered
        setTimeout(() => {
            const anchorTitles = document.querySelectorAll('h3');
            const checkMobileAndLoggedIn = document.querySelector('[data-testid="mobile-essentials-price"]');
            
            let anchorSet = false;
            
            anchorTitles.forEach(item => {
                if (item.textContent === "Subscribe" && checkMobileAndLoggedIn) {
                    item.setAttribute('id', 'pricing-anchor');
                    anchorSet = true;
                } else if (item.textContent === "Exactly what you need. Nothing more, nothing less." && !checkMobileAndLoggedIn) {
                    item.setAttribute('id', 'pricing-anchor');
                    anchorSet = true;
                } else if (item.textContent === "Up to 50% off for 12 months") {
                    item.setAttribute('id', 'pricing-anchor');
                    anchorSet = true;
                }
            });
            
            if (!anchorSet) {
                console.warn('No pricing anchor was set');
            }
        }, 500);
    }
    
    function initTest() {
        if (isProcessing) {
            return;
        }
        
        
        addBodyClass();
        
        // Check if content already exists
        if (document.querySelector('.spz__plan-desc')) {
            addPricingAnchors(); // Ensure anchors are set even if content exists
            attachSmoothScroll();
            return;
        }
        
        isProcessing = true;
        
        // Wait for loading to complete
        waitForElement('.loading-logo.hidden, body:not(:has(.loading-logo))', () => {
            
            // Small delay to ensure DOM is fully ready after loading
            setTimeout(() => {
                // Final check before adding
                if (!document.querySelector('.spz__plan-desc')) {
                    addContent();
                    addPricingAnchors();
                    attachSmoothScroll();
                }
                isProcessing = false;
            }, 300);
        }, 15000);
    }
    
    function attachSmoothScroll() {
        if (scrollListenerAttached) {
            return;
        }
        
        scrollListenerAttached = true;
        
        // Use event delegation on document to catch all clicks
        document.addEventListener('click', function(e) {
            // Check if clicked element is our button
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
                    // Try to set anchors again
                    addPricingAnchors();
                    
                    // Try again after a delay
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
    }
    
    // Initial test init
    if (window.location.pathname.includes("/subscription")) {
        initTest();
    }

    // Debounced mutation observer
    let mutationTimeout;
    const observer = new MutationObserver((mutationsList) => {
        clearTimeout(mutationTimeout);
        
        mutationTimeout = setTimeout(() => {
            const pathChanged = currentPath !== window.location.pathname;
            
            if (pathChanged) {
                currentPath = window.location.pathname;
                isProcessing = false; // Reset processing flag on route change
            }
            
            addBodyClass();
            
            // Remove content if not on subscription page
            const existingContent = document.querySelector('.spz__plan-desc');
            if (existingContent && !window.location.pathname.includes("/subscription")) {
                existingContent.remove();
            }
            
            // Re-init test if on subscription page and content doesn't exist
            if (window.location.pathname.includes("/subscription") && !document.querySelector('.spz__plan-desc')) {
                initTest();
            }
        }, 200); // Increased debounce time
    });
    
    const config = {
        childList: true,
        subtree: true,
    };
    
    observer.observe(document.body, config);
});

function addContent() {
    // CRITICAL: Check if content already exists
    if (document.querySelector('.spz__plan-desc')) {
        return;
    }
    
    // Wait for EITHER pricing selector OR plan-tier-cards (which loads first)
    const targetSelectors = [
        { selector: '[data-testid="plan-tier-cards"]', position: 'afterend', priority: 1 },
        { selector: '.testimonials-title', position: 'beforebegin', priority: 2 },
        { selector: '[data-testid="is-logo"]', position: 'afterend', priority: 3 }
    ];
    
    let contentInserted = false;
    let checkInterval;
    let attemptCount = 0;
    const maxAttempts = 30; // 30 attempts * 500ms = 15 seconds
    
    function checkAndInsert() {
        attemptCount++;
        
        if (contentInserted || document.querySelector('.spz__plan-desc')) {
            clearInterval(checkInterval);
            return;
        }
        
        // Check in priority order
        for (let config of targetSelectors) {
            const element = document.querySelector(config.selector);
            
            if (element) {
                clearInterval(checkInterval);
                contentInserted = true;
                insertContent(element, config.selector, config.position);
                return;
            }
        }
        
        if (attemptCount >= maxAttempts) {
            clearInterval(checkInterval);
        }
    }
    
    // Check every 500ms
    checkInterval = setInterval(checkAndInsert, 500);
    
    // Also check immediately
    checkAndInsert();
    
    function insertContent(targetElement, selector, position) {
        let finalTarget = targetElement;
        if (selector === '[data-testid="is-logo"]') {
            finalTarget = targetElement.parentElement;
            
            if (!finalTarget) {
                return;
            }
        }

        try {
            finalTarget.insertAdjacentHTML(position, `
                <div class="spz__plan-desc">
                    <h5>All plans include:</h5>
                    <div class="spz__grid-items">
                        ${
                            gridContent.map(item => (
                                `<div class="spz__grid-item">
                                    <img src="${item.image}" alt="${item.title}" />
                                    <div>
                                        <strong>${item.title}</strong>
                                        <p>${item.desc}</p>
                                    </div>
                                </div>`
                            )).join("")
                        }
                    </div>
                    <a href="#pricing-anchor" class="spz${testNumber}_${testType}">
                        Get started
                    </a>
                </div>    
            `);
        } catch (error) {
            console.error('Error inserting content:', error);
        }
    }
}