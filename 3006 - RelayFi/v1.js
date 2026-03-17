// #3006 | Relay | Home | Sticky CTA

// ============ DEV CONFIG ============
// DEV 1/3. Target URL paths
const VALID_PATHS = ['/', '/product/', '/pricing/'];

// DEV 2/3. Selectors
const FOOTER_SELECTOR = 'footer';
const HEADER_SELECTOR = '.rt-h-800, .rt-h-1100';

const COOKIE_SELECTORS = [
    '.osano-cm-window',
    '#CybotCookiebotDialog',
    '.cc-window',
    '[class*="cookie-banner"]',
    '[id*="cookie-consent"]',
    '[class*="consent-banner"]'
];

// DEV 3/3. Assets
const CLOSE_DEFAULT = 'https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1773412736/relay/3006/cross.svg';
const CLOSE_HOVER = 'https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1773412736/relay/3006/cross_hover.svg';

function waitForElement(selector, callback, timeout = 5000) {
    const el = document.querySelector(selector);
    if (el) return callback(el);

    const observer = new MutationObserver((_, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            obs.disconnect();
            callback(el);
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), timeout);
}

console.log('script lodaded')

// ============ HTML ============
function buildHTML() {
    return `
    <div class="spz-sticky-bar">
      <div class="spz-bar-inner">
        <p class="spz-disclaimer">Relay is a financial technology company and is not an FDIC-insured bank. Banking services provided by Thread Bank<sup>2</sup>, Member FDIC. FDIC deposit insurance covers the failure of an insured bank. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. The Relay Visa<sup>&reg;</sup> Debit Card is issued by Thread Bank, member FDIC, pursuant to a license from Visa U.S.A. Inc. and may be used anywhere Visa debit cards are accepted. The Relay Visa<sup>&reg;</sup> Credit Card is issued by Thread Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc and may be used anywhere Visa credit cards are accepted.</p>
        <button class="spz-close spz3006_v1" aria-label="Close">
          <img class="spz-close-img" src="${CLOSE_DEFAULT}" alt="Close icon" />
        </button>
      </div>
    </div>
  `;
}

// ============ HELPERS ============
function isValidPath() {
    const path = window.location.pathname;
    return VALID_PATHS.some(function (p) { return path === p; });
}

function isCookieConsentVisible() {
    return COOKIE_SELECTORS.some(function (sel) {
        const el = document.querySelector(sel);
        return el && el.offsetParent !== null;
    });
}

// ============ SCROLL & VISIBILITY ============
function setupScrollBehavior(bar) {
    let footerVisible = false;
    let belowFold = false;
    let dismissed = false;

    function showHeaders(headers) {
        headers.forEach(h => h.classList.remove('spz-header-hidden'));
    }

    function hideHeaders(headers) {
        headers.forEach(h => h.classList.add('spz-header-hidden'));
    }

    function updateVisibility() {
        const headers = document.querySelectorAll(HEADER_SELECTOR);

        if (dismissed || isCookieConsentVisible()) {
            bar.classList.remove('spz-visible');
            showHeaders(headers);
            return;
        }
        if (belowFold && !footerVisible) {
            bar.classList.add('spz-visible');
            hideHeaders(headers);
        } else {
            bar.classList.remove('spz-visible');
            showHeaders(headers);
        }
    }

    window.addEventListener('scroll', function () {
        belowFold = window.scrollY > window.innerHeight;

        const footer = document.querySelector(FOOTER_SELECTOR);
        if (footer) {
            footerVisible = footer.getBoundingClientRect().top <= window.innerHeight;
        }

        updateVisibility();
    }, { passive: true });

    const closeBtn = bar.querySelector('.spz-close');
    const closeImg = bar.querySelector('.spz-close-img');

    closeBtn.addEventListener('click', function () {
        dismissed = true;
        bar.classList.remove('spz-visible');
        sessionStorage.setItem('spz_3006_closed', '1');

        const headers = document.querySelectorAll(HEADER_SELECTOR);
        showHeaders(headers);
    });

    closeBtn.addEventListener('mouseenter', function () {
        closeImg.src = CLOSE_HOVER;
    });

    closeBtn.addEventListener('mouseleave', function () {
        closeImg.src = CLOSE_DEFAULT;
    });
}
// ============ INIT ============
function init() {
    if (!isValidPath()) return;
    if (document.querySelector('.spz-sticky-bar')) return;
    if (sessionStorage.getItem('spz_3006_closed') === '1') return;

    document.body.classList.add('spz_3006_v1');
    document.body.insertAdjacentHTML('beforeend', buildHTML());

    const bar = document.querySelector('.spz-sticky-bar');
    setupScrollBehavior(bar);
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : (init(), setTimeout(init, 1000), setTimeout(init, 2000));