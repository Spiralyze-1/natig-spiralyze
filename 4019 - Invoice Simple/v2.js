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

const testNumber = '4019';
const testType = 'v2';

waitForElement('body', () => {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if(!document.body.classList.contains(`spz_${testNumber}_${testType}`)){
                    document.body.classList.add(`spz_${testNumber}_${testType}`)
                }
            }
        });
    });
    
    // Start observing the body element for class changes
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
})


waitForElement('#tailwind', () => {

    // check logged in
    const isLoggedIn = document.querySelector('[data-testid="desktop-essentials-price"]') || document.querySelector('[data-testid="mobile-essentials-price"]')
    if(!isLoggedIn){
        // console.log("is not logged in",document.querySelector('[data-testid="desktop-essentials-price"]'), document.querySelector('[data-testid="mobile-essentials-price"]'))
        return
    }
    
    
    if(!document.body.classList.contains(`spz_${testNumber}_${testType}`)){
        document.body.classList.add(`spz_${testNumber}_${testType}`)
    }

    const isCouponPage = document.querySelector('[data-testid="discount-banner-title"')
    const segmentedTab = document.querySelector('[data-testid="interval-select"]')
    const monthlyBtn = segmentedTab.querySelector('[data-testid="btn-monthly"]')
    const annualBtn = segmentedTab.querySelector('[data-testid="btn-annual"]')
    
    function applyPricingCards() {
        const isDesktop = window.screen.width >= 768
        // console.log("User window scroll width: ", window.screen.width)

        const headerTitleBlock = isDesktop ? document.querySelector('[data-testid="is-logo"]').nextElementSibling : document.querySelector('[data-testid="subscribe-header"]');
        const headerBlock = document.querySelector('[data-testid="is-logo"]').parentElement
        const backBtn = document.querySelector('[data-testid="btn-back"]')
        
        const planCards = isDesktop ? document.querySelector('[data-testid="desktop-tier-cards"]') : document.querySelector('[data-testid="mobile-tier-cards"]')
        const essentialCard = document.querySelector('[data-testid="desktop-essentials-tier-card"]')
        const plusCard = document.querySelector('[data-testid="desktop-plus-tier-card"]')
        const premiumCard = document.querySelector('[data-testid="desktop-premium-tier-card"]')

        const companyLogo = document.querySelector('.spz-company-logo')
        if(companyLogo) companyLogo.remove()

        if(isCouponPage){
            document.querySelector('#tailwind').classList.add("spz-coupon-page")
        }

        // if(backBtn && !isDesktop){
        //     backBtn.style.display = "none"
        // }
        // else{
        //     backBtn.style.display = ""
        // }

        if(headerTitleBlock && !isDesktop){
                headerTitleBlock.insertAdjacentHTML('beforebegin', `
                    <div class="spz-company-logo">
                    <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/invoicesimple/4019/logo__color_webp.webp" alt="Invoice Simple logo">
                    </div>
                `)
        }

        // header
        if(headerBlock){
            headerBlock.className = "hidden md:block text-5xl font-bold text-gray-900 sm:text-center my-0 mx-auto"
        }

        // title modification
        if(headerTitleBlock){
            headerTitleBlock.innerHTML = `
            <h3 class="spz-title">Exactly what you need. Nothing more, nothing less.</h3>
            <p class="spz-subtitle">Cancel or change your plan anytime.</p>
            `
        }

        // remove margin top from parent segmented tab 
        if(segmentedTab){
            segmentedTab.parentElement.className = 'relative flex justify-center spz-segmented-tab-parent'
        }

        // console.log("plan cards", planCards)

        if(isDesktop){
            // console.log("Worked 1")
            // essential card modification
            const essentialDescription = essentialCard.querySelector('p.text-gray-800.text-xl')
            const essentialBtn = essentialCard.querySelector('button')
            const essentialFeatureList = isDesktop ? essentialCard.querySelector('[data-testid="desktop-essentials-feature-list"]').parentElement : essentialCard.querySelector('[data-testid="mobile-essentials-feature-list"]')
            if(essentialDescription){
                essentialDescription.textContent = 'For freelancers & solo business'
            }
        
            if(essentialBtn){
                essentialBtn.textContent = 'Upgrade now'
                essentialBtn.classList.add('spz4019_v2')
            }
            
            if(essentialFeatureList){
                essentialFeatureList.innerHTML = `
                    <h4 class="spz-card-feature">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                        <span>3 invoices a month</span>
                    </h4>
                `
            }
        
            // plus card modification
            const plusDescription = plusCard.querySelector('p.text-gray-800.text-xl')
            const plusBtn = plusCard.querySelector('button')
            const plusFeatureList = isDesktop ? plusCard.querySelector('[data-testid="desktop-plus-feature-list"]').parentElement : plusCard.querySelector('[data-testid="mobile-plus-feature-list"]')
            if(plusDescription){
                plusDescription.textContent = 'For small businesses'
            }
        
            if(plusBtn){
                plusBtn.textContent = 'Upgrade now'   
                plusBtn.classList.add('spz4019_v2')
            }
            
            if(plusFeatureList){
                plusFeatureList.innerHTML = `
                    <h4 class="spz-card-feature">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                        <span>10 invoices a month</span>
                    </h4>
                `
            }
        
            // premium card modification
            const premiumDescription = premiumCard.querySelector('p.text-gray-800.text-xl')
            const premiumBtn = premiumCard.querySelector('button')
            const premiumFeatureList = isDesktop ? premiumCard.querySelector('[data-testid="desktop-premium-feature-list"]').parentElement : premiumCard.querySelector('[data-testid="mobile-premium-feature-list"]')
            if(premiumDescription){
                premiumDescription.textContent = 'For medium businesses'
            }
        
            if(premiumBtn){
                premiumBtn.textContent = 'Upgrade now'  
                premiumBtn.classList.add('spz4019_v2')
            }
            
            if(premiumFeatureList){
                premiumFeatureList.innerHTML = `
                    <h4 class="spz-card-feature">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                        <span>Unlimited invoices</span>
                    </h4>
                `
            }
        }
        else{
            // console.log("Worked 2")
            if(document.querySelector('[data-testid="mobile-essentials-tier-card-custom"]')) return
            planCards.insertAdjacentHTML('beforeend',`
                <div data-testid="mobile-essentials-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] false">
                <div class="p-[20px] rounded-t-[30px]" style="border: 2px solid rgb(229, 231, 235);">
                <div class="flex items-center">
                <h3 class="text-3xl text-gray-900 capitalize font-semibold">essentials</h3>
                <div data-testid="subscription-badge-v2-c">Save 50%</div>
                <div data-testid="subscription-badge-v2">Save 16%</div>
                </div><p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For freelancers &amp; solo business</p>
                <strong class="spz-discounted-price-coupon">$4.99</strong>
                <strong class="spz-discounted-price">$59.88</strong>
                <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-essentials-price">${isCouponPage ? "$2.49" : "$4.99"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-essentials-price">$49.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                <button type="button" data-testid="mobile-essentials-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button></div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(229, 231, 235); border-image: initial;">
                        <h4 class="spz-card-feature">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                            <span>3 invoices a month</span>
                        </h4>
                    </div>
                    </div><div data-testid="mobile-plus-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] bg-orange-50"><div class="bg-orange-200 rounded-t-[30px] py-3">
                    <p class="text-center text-2xl font-bold text-gray-800 capitalize">Most popular</p>
                    </div><div class="p-[20px] false" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(254, 215, 170); border-image: initial;">
                    <div class="flex items-center ">
                    <h3 class="text-3xl text-gray-900 capitalize font-semibold">plus</h3>
                    <div class="spz-subscription-badge" data-testid="subscription-badge-v2-c">Save 50%</div>
                    <div class="spz-subscription-badge" data-testid="subscription-badge-v2">Save 16%</div>

                    </div><p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For small businesses</p>
                    <strong class="spz-discounted-price-coupon">$13.49</strong>
                    <strong class="spz-discounted-price">$161.88</strong>
                    <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-plus-price">${isCouponPage ? "$6.74" : "$13.49"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                    <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-plus-price">$134.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                    <button type="button" data-testid="mobile-plus-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button></div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(229, 231, 235); border-image: initial;">
                        <h4 class="spz-card-feature">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                            <span>10 invoices a month</span>
                        </h4>
                    </div>
                    
                    </div><div data-testid="mobile-premium-tier-card-custom" class="spz-parent-card-mobile max-w-[290px] rounded-[30px] false"><div class="p-[20px] rounded-t-[30px]" style="border: 2px solid rgb(229, 231, 235);">
                    <div class="flex items-center ">
                    <h3 class="text-3xl text-gray-900 capitalize font-semibold">premium</h3>
                    <div data-testid="subscription-badge-v2-c">Save 50%</div>
                    <div data-testid="subscription-badge-v2">Save 16%</div>
                    </div><p class="mt-4 mb-8 text-gray-800 text-xl lg:text-2xl font-medium h-22 lg:h-auto">For medium businesses</p>
                    <strong class="spz-discounted-price-coupon">$19.99</strong>
                    <strong class="spz-discounted-price">$239.88</strong>
                    <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-month" data-testid="mobile-premium-price">${isCouponPage ? "$9.99" : "$19.99"}<span class="text-2xl font-semibold text-gray-500 ml-1">/mo</span></p>
                    <p class="text-[28px] font-extrabold text-gray-900 mt-1 spz-price-year" data-testid="mobile-premium-price">$199.99<span class="text-2xl font-semibold text-gray-500 ml-1">/yr</span></p>
                    <button type="button" data-testid="mobile-premium-buy-button" class="spz-buy-btn mt-8 mb-1 no-underline block w-full flex-grow rounded-[4px] border-[1px] border-solid py-3 text-center text-[14px] font-bold hover:opacity-70 bg-orange-is text-white border-orange-is">Upgrade now</button></div>
                    <div class="px-[20px] pt-[20px] rounded-b-[30px] pb-24 h-[230px]" style="border-width: 0px 2px 2px; border-style: solid; border-color: rgb(229, 231, 235); border-image: initial;">
                        <h4 class="spz-card-feature">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537447/invoicesimple/4019/check_orange.svg" alt="check icon">
                            <span>Unlimited invoices</span>
                        </h4>
                    </div>
                    </div>
        `)

            planCards.addEventListener('click', (e) => {
                if(!e.target.classList.contains('spz-buy-btn')) return
                const parentCard = e.target.closest('.spz-parent-card-mobile');
                if (!parentCard) return;
                
                const customTargetElement = parentCard.getAttribute('data-testid');
                if (!customTargetElement) return;
                
                // Don't process if already handling this click
                if (customTargetElement.endsWith('-custom')) {
                    e.preventDefault(); // Prevent default action on custom card
                    e.stopPropagation(); // Stop event bubbling
                    
                    const originalTargetElement = customTargetElement.replace('-custom', '');
                    const targetElement = document.querySelector(`[data-testid="${originalTargetElement}"]`);
                    
                    if (targetElement) {
                        // console.log("Triggering original:", originalTargetElement);
                        targetElement.click();
                        setTimeout(() => {
                            document.querySelector('[data-testid="mobile-buy-button"]').click()
                        }, 100)
                    } else {
                        console.warn(`Original element not found: ${originalTargetElement}`);
                    }
                }
            });

        }

        
        // add "compare all" anchor
        const anchorBlock = document.querySelector('.spz-anchor')
        if(anchorBlock) anchorBlock.remove()
            planCards.insertAdjacentHTML('afterend', `
            <div class="spz-anchor">
                <span>
                    Compare all features 
                </span>
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1762537851/invoicesimple/4019/next.svg" alt="Scroll to table icon">
            </div>
            `)
        }
    applyPricingCards()
    
    // assign a listeners for tabs (to know which one is active)
    monthlyBtn.classList.add('spz-active')
    monthlyBtn.addEventListener('click', () => {
        if(!monthlyBtn.classList.contains('spz-active')){
            setTimeout(() => {
                document.querySelector('#tailwind').classList.remove('spz-show-badge')
                monthlyBtn.classList.add('spz-active')
                annualBtn.classList.remove('spz-active')
            }, 100)
        }
    })
    
    annualBtn.addEventListener('click', () => {
        if(!annualBtn.classList.contains('spz-active')){
            setTimeout(() => {
                document.querySelector('#tailwind').classList.add('spz-show-badge')
                annualBtn.classList.add('spz-active')
                monthlyBtn.classList.remove('spz-active')
            }, 100)
        }
    })    

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            console.log("Applying new cards")
            applyPricingCards();
            document.querySelector('.spz-anchor').addEventListener('click', () => {
                smoothScrollToElement('#feature-matrix')
            })
        }, 250);
    });

    if(document.querySelector('.spz-anchor')){
        document.querySelector('.spz-anchor').addEventListener('click', () => {
            smoothScrollToElement('#feature-matrix')
        })
    }

    // ROBUST smooth scroll function with validation
    function smoothScrollToElement(target, duration = 1200) {
        // Handle both element and selector string
        let targetElement;
        
        if (typeof target === 'string') {
            targetElement = document.querySelector(target);
        } else if (target instanceof Element) {
            targetElement = target;
        } else {
            console.error('Invalid target provided to smoothScrollToElement:', target);
            return;
        }
        
        // Validate that we have a valid DOM element
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

})