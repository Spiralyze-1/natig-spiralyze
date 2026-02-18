// #3004 | Relay | Home | Bento - Variant 2
// https://app.asana.com/1/77217210692853/task/1211867523594527

(function () {
  //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

  // Set the value of the squeezePage variable as needed:
  // true  – if you are using a squeeze page (i.e., the page contains a form)
  // false – if you are not using a squeeze page (i.e., the page does not contain a form)
  // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

  var pageName = 'home';

  const squeezePage = 'both'; // Do not change this value for RelayFi
  const expName = '3004'; //experiment name should be 1001, 1002, 1003 etc. 3004-home-test-variant2
  const variantName = expName + '-' + pageName + '-test-variant2'; //variantName should be -test-variant, -test-control etc.
  const clientDomain = '.relayfi.com'; //domain should be .spiralyze.com


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
      // Items in Sid that are not in Experiment
      let newItems = ExistingSidValueList.filter(
        sidItem => !ExistingExperimentValueList.includes(sidItem)
      );

      // Final ordered merged list
      let mergedList = [...newItems, ...ExistingExperimentValueList];
      setCookie('sid4', mergedList.join(','), 1);
      maxCookieSetIntervalCount++;
      if (maxCookieSetIntervalCount > 10) clearInterval(cookieSetInterval);
    }, 1000);
  }
}());

const bentoConfig = {
  insertBefore: '.hero',
  insertBeforeMobile: '.product-family',
  ctaUrl: 'https://app.relayfi.com/v3/register/user',
  baseUrl: 'https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/3004/',
  images: {
    checkingSavings: {
      fourK: 'copy_20.webp',
      desktop: 'copy_11.webp',
      tablet: 'copy_5.webp',
      mobile: 'copy_43.webp',
      alt: 'Business checking & savings'
    },
    creditDebit: {
      fourK: 'copy_23.webp',
      desktop: 'copy_14.webp',
      tablet: 'copy_16.webp',
      mobile: 'copy_4.webp',
      alt: 'Credit & debit'
    },
    spendManagement: {
      fourK: 'copy_30.webp',
      desktop: 'copy_28.webp',
      tablet: 'copy_27.webp',
      mobile: 'copy_29.webp',
      alt: 'Spend management'
    },
    accountsPayable: {
      fourK: 'copy_22.webp',
      desktop: 'copy_13.webp',
      tablet: 'copy_1.webp',
      mobile: 'copy_3.webp',
      alt: 'Accounts payable'
    },
    accountsReceivable: {
      fourK: 'copy_33.webp',
      desktop: 'copy_32.webp',
      tablet: 'copy_31.webp',
      mobile: 'copy_34.webp',
      alt: 'Accounts receivable'
    },
    integrations: {
      fourK: 'copy_18.webp',
      desktop: 'copy_17.webp',
      tablet: 'copy_2.webp',
      mobile: 'copy.webp',
      alt: 'Integrations'
    }
  }
};

function tryInsert() {
  const targetSection = document.querySelector(bentoConfig.insertBefore);
  const targetSectionMobile = document.querySelector(bentoConfig.insertBeforeMobile);

  document.body.classList.add('spz_3004_v2');
  if (targetSection && targetSectionMobile && !document.querySelector('.spz-bento-section-v2')) {
    insertBentoSection();
  }
}

// Re-run on Next.js route changes
const initBento = setInterval(tryInsert, 100);
setTimeout(() => clearInterval(initBento), 10000);

// Also hook into Next.js router events if accessible
if (window.next && window.next.router) {
  window.next.router.events?.on('routeChangeComplete', () => {
    setTimeout(tryInsert, 300);
  });
}

// Generate responsive picture element
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

// Create and insert the Bento section
function insertBentoSection() {
  const bentoHTML = `
    <section class="spz-bento-section-v2">
      <div class="spz-bento-container">
        <h2 class="spz-bento-heading">All your banking &&nbsp<br>finance in one place</h2>
        
        <div class="spz-bento-grid">
          <!-- Row 1: Large + Small -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Business checking & savings</h3>
                <p class="spz-card-description">Open up to 20 checking accounts and separate incoming deposits for taxes, payroll, bills, and more. Always know what's safe to spend and auto-transfer what's left into savings so you never waste a cent.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.checkingSavings)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Credit & debit</h3>
                <p class="spz-card-description">Issue up to 50 debit cards and 20 credit cards. Easily keep funds organized by linking cards to spend categories, vendors, and more.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.creditDebit)}
              </div>
            </div>
          </div>
          
          <!-- Row 2: Small + Large -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Spend management</h3>
                <p class="spz-card-description">Auto-capture receipts and track spending. Avoid chasing after receipts or digging through emails. Control costs with spend limits and approved vendors.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.spendManagement)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Accounts payable</h3>
                <p class="spz-card-description">Automatically upload bills, including vendor names, amounts, and more. No more typing in vendor data so you can close the books faster. Create approval rules that let team members speed up bill pay while you stay in control.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.accountsPayable)}
              </div>
            </div>
          </div>
          
          <!-- Row 3: Large + Small -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Accounts receivable</h3>
                <p class="spz-card-description">Get paid faster and streamline invoicing by creating, sending, and tracking invoices in one place. Encourage timely payments by tracking overdue invoices and sending requests and reminders.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.accountsReceivable)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Integrations</h3>
                <p class="spz-card-description">Connect to QuickBooks, Xero, Gusto, Plaid, Yodlee, and Dext. Use your Relay account to send and receive payments on Expensify, Wave, FreshBooks, and more.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.integrations)}
              </div>
            </div>
          </div>
        </div>
        
        <div class="spz-bento-cta-v2">
          <a href="${bentoConfig.ctaUrl}" class="spz-bento-button spz3004_v2">Get Started</a>
        </div>
      </div>
    </section>
  `;

  const targetSection = document.querySelector(bentoConfig.insertBefore);
  const targetSectionMobile = document.querySelector(bentoConfig.insertBeforeMobile)
  if (targetSection) {
    targetSection.insertAdjacentHTML('afterbegin', bentoHTML);
    console.log('addedDesktop', targetSection)
  }
  if (targetSectionMobile) {
    targetSectionMobile.insertAdjacentHTML('beforebegin', bentoHTML);
    console.log('addedMobile', targetSectionMobile)
  }
}