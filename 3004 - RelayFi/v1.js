// #3004 | Relay | Home | Bento + Sticky CTA - Variant 1
// https://app.asana.com/1/77217210692853/task/1211867523594527

(function () {

  // ============================================================
  // COOKIE TRACKING
  // ============================================================
  var pageName = 'home';
  const squeezePage = 'both';
  const expName = '3004';
  const variantName = expName + '-' + pageName + '-test-variant1';
  const clientDomain = '.relayfi.com';

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
      var expires = '';
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
      }
      document.cookie = name + '=' + (value || '') + expires + ';domain=' + clientDomain + ';path=/';
    }

    function getCookie(name) {
      var nameEQ = name + '=';
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

  // ============================================================
  // BENTO SECTION (3004)
  // ============================================================
  const bentoConfig = {
    insertAfter: 'main section:nth-of-type(2)',
    insertBeforeMobile: '.product-family',
    ctaUrl: 'https://app.relayfi.com/v3/register/user',
    baseUrl: 'https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/3004/',
    images: {
      checkingSavings: {
        fourK: 'copy_67.webp', desktop: 'copy_68.webp', tablet: 'copy_66.webp', mobile: 'copy_64.webp',
        alt: 'Business checking & savings'
      },
      creditDebit: {
        fourK: 'copy_55.webp', desktop: 'copy_61.webp', tablet: 'copy_69.webp', mobile: 'copy_65.webp',
        alt: 'Credit & debit'
      },
      spendManagement: {
        fourK: 'copy_53.webp', desktop: 'copy_63.webp', tablet: 'copy_27.webp', mobile: 'copy_29.webp',
        alt: 'Spend management'
      },
      accountsPayable: {
        fourK: 'copy_62.webp', desktop: 'copy_57.webp', tablet: 'copy_1.webp', mobile: 'copy_3.webp',
        alt: 'Accounts payable'
      },
      accountsReceivable: {
        fourK: 'copy_56.webp', desktop: 'copy_54.webp', tablet: 'copy_31.webp', mobile: 'copy_34.webp',
        alt: 'Accounts receivable'
      },
      integrations: {
        fourK: 'copy_60.webp', desktop: 'copy_52.webp', tablet: 'copy_2.webp', mobile: 'copy.webp',
        alt: 'Integrations'
      }
    }
  };

  function generatePicture(imageConfig) {
    const { baseUrl } = bentoConfig;
    const { fourK, desktop, tablet, mobile, alt } = imageConfig;
    return `
      <picture>
        <source media="(min-width: 1920px)" srcset="${baseUrl}${fourK}">
        <source media="(min-width: 1025px)" srcset="${baseUrl}${desktop}">
        <source media="(min-width: 768px)" srcset="${baseUrl}${tablet}">
        <img src="${baseUrl}${mobile}" alt="${alt}" loading="lazy">
      </picture>
    `;
  }

  function insertBentoSection() {
    const bentoHTML = `
      <section class="spz-bento-section-v1">
        <div class="spz-bento-container">
          <h2 class="spz-bento-heading">All your banking &amp;&nbsp;<br>finance in one place</h2>

          <div class="spz-bento-grid">
            <div class="spz-bento-row">
              <div class="spz-bento-card spz-card-light spz-card-large">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Business checking & savings</h3>
                  <p class="spz-card-description">Open up to 20 checking accounts and separate incoming deposits for taxes, payroll, bills, and more. Get clarity on what's safe to spend, then set up auto-transfer rules to direct the rest into savings.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.checkingSavings)}</div>
              </div>
              <div class="spz-bento-card spz-card-dark spz-card-small">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Credit & debit</h3>
                  <p class="spz-card-description">Issue up to 50 debit<sup>3</sup> cards and 20 credit<sup>4</sup> cards. Easily keep funds organized by linking cards to spend categories, vendors, and more.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.creditDebit)}</div>
              </div>
            </div>

            <div class="spz-bento-row">
              <div class="spz-bento-card spz-card-dark spz-card-small">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Spend management</h3>
                  <p class="spz-card-description">Auto-capture receipts and track spending. Avoid chasing after receipts or digging through emails. Control costs with spend limits and approved vendors.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.spendManagement)}</div>
              </div>
              <div class="spz-bento-card spz-card-light spz-card-large">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Accounts payable</h3>
                  <p class="spz-card-description">Automatically upload bills, including vendor names, amounts, and more. No more typing in vendor data so you can close the books faster. Create approval rules that let team members speed up bill pay while you stay in control.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.accountsPayable)}</div>
              </div>
            </div>

            <div class="spz-bento-row">
              <div class="spz-bento-card spz-card-light spz-card-large">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Accounts receivable</h3>
                  <p class="spz-card-description">Get paid faster and streamline invoicing by creating, sending, and tracking invoices in one place. Encourage timely payments by tracking overdue invoices and sending requests and reminders.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.accountsReceivable)}</div>
              </div>
              <div class="spz-bento-card spz-card-dark spz-card-small">
                <div class="spz-card-content">
                  <h3 class="spz-card-title">Integrations</h3>
                  <p class="spz-card-description">Connect to QuickBooks, Xero, Gusto, Plaid, Yodlee, and Dext. Use your Relay account to send and receive payments on Expensify, Wave, FreshBooks, and more.</p>
                </div>
                <div class="spz-card-image">${generatePicture(bentoConfig.images.integrations)}</div>
              </div>
            </div>
          </div>

          <div class="spz-bento-cta-v1">
            <a href="${bentoConfig.ctaUrl}" class="spz-bento-button spz3004_v1">Get Started</a>
          </div>
        </div>
      </section>
    `;

    const targetSection = document.querySelector(bentoConfig.insertAfter);
    const targetSectionMobile = document.querySelector(bentoConfig.insertBeforeMobile);

    if (targetSection) {
      const desktopHTML = bentoHTML.replace('spz-bento-section-v1', 'spz-bento-section-v1 spz-bento-desk');
      targetSection.insertAdjacentHTML('afterend', desktopHTML);
    }
    if (targetSectionMobile) {
      const mobileHTML = bentoHTML.replace('spz-bento-section-v1', 'spz-bento-section-v1 spz-bento-mob');
      targetSectionMobile.insertAdjacentHTML('beforebegin', mobileHTML);
    }
  }

  function tryInsert() {
    const targetSection = document.querySelector(bentoConfig.insertAfter);
    const targetSectionMobile = document.querySelector(bentoConfig.insertBeforeMobile);

    document.body.classList.add('spz_3004_v1');
    if (targetSection && targetSectionMobile && !document.querySelector('.spz-bento-section-v1')) {
      insertBentoSection();
    }
  }

  const initBento = setInterval(tryInsert, 100);
  setTimeout(() => clearInterval(initBento), 10000);

  if (window.next && window.next.router) {
    window.next.router.events?.on('routeChangeComplete', () => {
      setTimeout(tryInsert, 300);
    });
  }

  // ============================================================
  // STICKY BAR (3006 → 3004)
  // ============================================================
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

  function buildStickyHTML() {
    return `
      <div class="spz-sticky-bar">
        <div class="spz-bar-inner">
          <p class="spz-disclaimer">Relay is a financial technology company and is not an FDIC-insured bank. Banking services provided by Thread Bank<sup>2</sup>, Member FDIC. FDIC deposit insurance covers the failure of an insured bank. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. The Relay Visa<sup>&reg;</sup> Debit Card is issued by Thread Bank, member FDIC, pursuant to a license from Visa U.S.A. Inc. and may be used anywhere Visa debit cards are accepted. The Relay Visa<sup>&reg;</sup> Credit Card is issued by Thread Bank, Member FDIC, pursuant to a license from Visa U.S.A. Inc and may be used anywhere Visa credit cards are accepted.</p>
        </div>
      </div>
    `;
  }

  function isCookieConsentVisible() {
    return COOKIE_SELECTORS.some(function (sel) {
      const el = document.querySelector(sel);
      return el && el.offsetParent !== null;
    });
  }

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
  }

  function initStickyBar() {
    if (document.querySelector('.spz-sticky-bar')) return;

    document.body.insertAdjacentHTML('beforeend', buildStickyHTML());
    const bar = document.querySelector('.spz-sticky-bar');
    setupScrollBehavior(bar);
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initStickyBar)
    : (initStickyBar(), setTimeout(initStickyBar, 1000), setTimeout(initStickyBar, 2000));

}());