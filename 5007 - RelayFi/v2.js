// #5007 | Relay | Product | Before and After - V2
// https://app.asana.com/1/77217210692853/project/1210751323511158/task/1213201826590455

(function () {
    var pageName = 'product';

    const squeezePage = 'both'; // Do not change this value for RelayFi
    const expName = '5007';
    const variantName = expName + '-' + pageName + '-test-variant2';
    const clientDomain = '.relayfi.com';

    /***********************************
    ************************************
    DO NOT TOUCH
    BEYOND THIS LINE
    ******************************
    ******************************/
    const formHiddenValue = variantName;
    if (squeezePage === true) {
        window.squeezePageValue = formHiddenValue;
    } else if (squeezePage === false) {
        hiddenValue(expName, variantName);
    } else if (squeezePage === 'both') {
        hiddenValue(expName, variantName);
        window.squeezePageValue = formHiddenValue;
    }
    function hiddenValue(currentExperimentName, currentExperimentValue) {
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + ";domain=" + clientDomain + ";path=/";
        }

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        var ExistingExperimentName = getCookie('ExperimentName');
        var ExistingExperimentValue = getCookie('ExperimentValue');
        var ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(',') : [];

        if (!ExistingExperimentName) {
            setCookie('ExperimentName', currentExperimentName, 1);
            setCookie('ExperimentValue', currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) == -1) {
            setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1);
            setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) > -1) {
            var existingNames = ExistingExperimentName.split(',');
            var existingValues = ExistingExperimentValue.split(',');
            var index = existingNames.indexOf(currentExperimentName);
            existingValues[index] = currentExperimentValue;
            setCookie('ExperimentName', existingNames.join(','), 1);
            setCookie('ExperimentValue', existingValues.join(','), 1);
        }
        let maxCookieSetIntervalCount = 0;
        let cookieSetInterval = setInterval(function () {
            ExistingExperimentValue = getCookie('ExperimentValue');
            let ExistingSidValue = getCookie('sid4');
            let ExistingExperimentValueList = ExistingExperimentValue ? ExistingExperimentValue.split(',') : [];
            let ExistingSidValueList = ExistingSidValue ? decodeURIComponent(ExistingSidValue).split(',') : [];
            let newItems = ExistingSidValueList.filter(
                sidItem => !ExistingExperimentValueList.includes(sidItem)
            );
            let mergedList = [...newItems, ...ExistingExperimentValueList];
            setCookie('sid4', mergedList.join(','), 1);
            maxCookieSetIntervalCount++;
            if (maxCookieSetIntervalCount > 10) clearInterval(cookieSetInterval);
        }, 1000);
    }
}());

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

if (!window.location.href.includes('https://app.relayfi.com/v3/register/user')) {
    const cloudinary = 'https://res.cloudinary.com/spiralyze/image/upload';

    const logos = ['03', '04', '05', '01', '06', '07', '08', '09', '02', '11', '10', '12'];
    const logosAlt = ['Ambient', 'Yang Law', 'Goshen', 'Rebel Bread', 'TFV', 'Happy Bees', 'Dance', 'Logo', 'Real Estate Robinsons', "Kyri's Kookies", 'Apex', 'Grill Your Ass Off'];

    function buildHero() {
        return `
      <div class="spz-bg-wrap">
        <div class="spz-form-wrap">
          <div class="content-section">
            <div class="content-heading">All-in-one banking for small business</div>
            <div class="spz-features-wrap">
              <div class="feature-item">
                <img src="${cloudinary}/v1763728227/relay/5001/frame_1171276285.svg" alt="checkmark" />
                <span><b>Streamline banking.</b> Split funds for payroll, bills, and taxes with up to 20 checking accounts. Pay and get paid via ACH, wire, check, and more.</span>
              </div>
              <div class="feature-item">
                <img src="${cloudinary}/v1763728227/relay/5001/frame_1171276285.svg" alt="checkmark" />
                <span><b>Automate bill payments.</b> Capture vendor data, categorize expenses, and approve bills. Cut manual reconciliation by syncing with accounting tools.</span>
              </div>
              <div class="feature-item">
                <img src="${cloudinary}/v1763728227/relay/5001/frame_1171276285.svg" alt="checkmark" />
                <span><b>Get paid faster.</b> Create, send, and track invoices, all in one place. Accept one-time or recurring payments. Send reminders to reduce late payments.</span>
              </div>
            </div>
            <div class="hero-cta-wrap">
              <a href="https://app.relayfi.com/v3/register/user" class="spz-cta primary-cta" data-location="hero">Get Started</a>
              <a href="https://relayfi.com/request-demo/" class="spz-cta secondary-cta">Get a Demo</a>
            </div>
            <div class="content-disclaimer">No credit card required</div>
          </div>
          <div class="spz-hero-image">
            <img class="desktop-image" src="${cloudinary}/f_auto/relay/5001/frame_1171276284.webp" alt="Relay Checking Accounts Dashboard" />
            <img class="tablet-image" src="${cloudinary}/f_auto/relay/5001/frame_1171276288.webp" alt="Relay Checking Accounts Dashboard" />
            <img class="mobile-image" src="${cloudinary}/f_auto/relay/5001/interface_360.webp" alt="Relay Checking Accounts Dashboard" />
          </div>
        </div>
        <div class="social-proof-section">
          <div class="social-proof-heading">Join more than 100k small businesses using Relay</div>
          <div class="social-proof-logos splide">
            <div class="splide__track">
              <ul class="splide__list">
                ${logos.map((num, index) => `
                  <li class="splide__slide logo-item"><img src="${cloudinary}/f_auto/relay/5001/logo-${num}.webp" alt="${logosAlt[index]}" /></li>
                `).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="legal-disclaimer">
          Relay is a financial technology company and is not an FDIC-insured bank. Banking services provided by Thread Bank<sup>2</sup>, Member FDIC. FDIC deposit insurance covers the failure of an insured bank. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. The Relay Visa Debit Card is issued by Thread Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc. and may be used anywhere Visa cards are accepted.
        </div>
      </div>`;
    }

    function buildBeforeAfter() {
        return `
        <section class="spz-before-after">
            <h2 class="spz-before-after-headline">Manage your finances with full visibility and control</h2>
            <div class="spz-before-after-content">
                <div class="spz-before-after-first">
                    <h3>before relay</h3>
                    <p>Money is scattered across accounts, causing overspending and no visibility into how much you have. Card spend is untracked. Payments, invoices, and approvals live in messages and email threads.</p>
                    <div>
                        <picture>
                            <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/before-img_18.webp">
                            <source media="(min-width: 1024px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/before-img_17.webp">
                            <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/before-img_19.webp">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/before-img_16.webp" alt="Before Relay" />
                        </picture>
                    </div>
                </div>
                <div class="spz-before-after-second">
                    <h3>after relay</h3>
                    <p>Get dedicated checking accounts for things like payroll, bills, taxes, and more. Never overspend and always know what's available. Set card limits. Track transactions, receipts, invoices, approvals, and more.</p>
                    <div>
                        <a href="https://app.relayfi.com/v3/register/user">Get Started</a>
                    </div>
                    <div>
                        <picture>
                            <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_12.webp">
                            <source media="(min-width: 1024px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_10.webp">
                            <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_13.webp">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_9.webp" alt="Relay banking dashboard" />
                        </picture>
                    </div>
                </div>
                <div class="spz-before-after-image">
                    <picture>
                        <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236554/relay/5007/frame_2095584725.webp">
                        <source media="(min-width: 1440px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773315080/relay/5007/frame_2095584728.webp">
                        <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236554/relay/5007/frame_2095584726.webp">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236553/relay/5007/frame_2095584727.webp" alt="Relay logo" />
                    </picture>
                </div>
            </div>
        </section>`;
    }

    let testObserver;

    function init() {
        waitForElement('main#main header', () => {
            const target = document.querySelector('main#main header');
            const section = document.querySelector('.business-checking');

            if (document.querySelector('.spz-bg-wrap')) {
                return;
            }

            target.style.display = 'none';
            document.body.classList.add('spz_5007_v2');

            target.insertAdjacentHTML('beforebegin', buildHero());
            if (section) section.style.display = 'none';

            // Inject Before/After section after .make-money
            const makeMoney = document.querySelector('.make-money');
            if (makeMoney && !document.querySelector('.spz-before-after')) {
                makeMoney.insertAdjacentHTML('afterend', buildBeforeAfter());
            }

            testObserver = new MutationObserver(() => {
                setTimeout(() => {
                    if (!document.querySelector('.spz-bg-wrap')) {
                        document.querySelector('main#main header').insertAdjacentHTML('beforebegin', buildHero());
                        document.querySelector('.business-checking').style.display = 'none';
                        loadSplide();
                    }
                    const makeMoney = document.querySelector('.make-money');
                    if (makeMoney && !document.querySelector('.spz-before-after')) {
                        makeMoney.insertAdjacentHTML('afterend', buildBeforeAfter());
                    }
                }, 50);
            });
            testObserver.observe(document.body, { childList: true, subtree: true });

            function loadSplide() {
                const SLIDER_SELECTOR = '.social-proof-logos';
                const SPLIDE_CSS_CDN = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
                const SPLIDE_CORE_JS_CDN = 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
                const SPLIDE_AUTOSCROLL_JS_CDN = 'https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js';

                function initializeSplideSlider() {
                    const sliderElement = document.querySelector(SLIDER_SELECTOR);
                    if (sliderElement) {
                        new Splide(sliderElement, {
                            type: 'loop',
                            perPage: 5,
                            gap: '72px',
                            focus: 'center',
                            drag: false,
                            arrows: false,
                            pagination: false,
                            autoWidth: true,
                            autoScroll: {
                                speed: 0.5,
                                pauseOnHover: false,
                                pauseOnFocus: false,
                            }
                        }).mount(window.splide.Extensions);
                    } else {
                        console.warn("Could not find slider element or Splide library is not defined.");
                    }
                }

                if (!document.getElementById('splide-css')) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = SPLIDE_CSS_CDN;
                    link.id = 'splide-css';
                    document.head.appendChild(link);
                }

                function loadScript(src, id, callback) {
                    if (!document.getElementById(id)) {
                        const script = document.createElement('script');
                        script.src = src;
                        script.onload = callback;
                        script.onerror = () => console.error(`Failed to load script: ${src}`);
                        script.id = id;
                        document.body.appendChild(script);
                    } else {
                        callback();
                    }
                }

                loadScript(SPLIDE_CORE_JS_CDN, 'splide-core-js', function () {
                    loadScript(SPLIDE_AUTOSCROLL_JS_CDN, 'splide-autoscroll-js', function () {
                        initializeSplideSlider();
                    });
                });
            }
            loadSplide();
        });
    }

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();

    function onRouteChange(callback) {
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                callback(url);
            }
        }).observe(document, { subtree: true, childList: true });
    }

    onRouteChange(() => {
        if (window.location.pathname === '/product/') {
            waitForElement('.business-checking', () => {
                if (!document.querySelector('.spz-bg-wrap')) {
                    init();
                }
            });
        } else {
            cleanCode();
        }
    });

    function cleanCode() {
        console.log('Cleaning up Relay #5007 V2');
        const hero = document.querySelector('.spz-bg-wrap');
        const section = document.querySelector('.business-checking');
        const beforeAfter = document.querySelector('.spz-before-after');
        if (hero) {
            document.body.classList.remove('spz_5007_v2');
            testObserver.disconnect();
            hero.remove();
            if (beforeAfter) beforeAfter.remove();
            if (section) section.style.display = 'block';
            const splideCSS = document.getElementById('splide-css');
            const splideCoreJS = document.getElementById('splide-core-js');
            const splideAutoScrollJS = document.getElementById('splide-autoscroll-js');
            if (splideCSS) splideCSS.remove();
            if (splideCoreJS) splideCoreJS.remove();
            if (splideAutoScrollJS) splideAutoScrollJS.remove();
        }
    }
}