console.log("spz_6003_v2 STARTED");
function preventLegalLinksReload() {
  document.addEventListener('click', (e) => {
    // Handle modal close button
    const closeBtn = e.target.closest('.modal__close');
    if (closeBtn) {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling
      closeBtn.closest('.modal')?.classList.remove('open');
      document.querySelector('html').classList.remove('no-scroll');
      return;
    }

    // Handle clicking on modal backdrop (outside modal content)
    const modal = e.target.closest('.modal');
    if (modal && modal.classList.contains('open') && !e.target.closest('.modal__content')) {
      e.preventDefault();
      modal.classList.remove('open');
      document.querySelector('html').classList.remove('no-scroll');
      return;
    }

    // Handle legal links
    const link = e.target.closest('.sign-up-form-visible-legal-t-cs a.text-block-link');

    if (!link) return;

    if (link.getAttribute('href') === '') {
      e.preventDefault();
    }

    const omConfig = link.getAttribute('data-om-config') || '';

    if (omConfig.includes('Terms of Service')) {
      console.log("----Worked 1----");
      document.querySelectorAll('.modal')[0]?.classList.add('open');
      document.querySelector('html').classList.add('no-scroll');
    } else if (omConfig.includes('Privacy Notice')) {
      console.log("----Worked 2----");
      document.querySelectorAll('.modal')[1]?.classList.add('open');
      document.querySelector('html').classList.add('no-scroll');
    }
  }, true);
}
function hiddenValue(currentExperimentName, currentExperimentValue) {
  function setCookie(name, value, days) {
    var expires = ''
    if (days) {
      var date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }

  function getCookie(name) {
    var nameEQ = name + '='
    var ca = document.cookie.split(';')
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  var ExistingExperimentName = getCookie('ExperimentName')
  var ExistingExperimentValue = getCookie('ExperimentValue')

  if (!ExistingExperimentName) {
    setCookie('ExperimentName', currentExperimentName, 1)
    setCookie('ExperimentValue', currentExperimentValue, 1)
  } else if (ExistingExperimentName && !ExistingExperimentName.includes(currentExperimentName)) {
    setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1)
    setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1)
  } else if (ExistingExperimentName && ExistingExperimentName.includes(currentExperimentName)) {
    var existingNames = ExistingExperimentName.split(',')
    var existingValues = ExistingExperimentValue.split(',')
    var index = existingNames.indexOf(currentExperimentName)
    existingValues[index] = currentExperimentValue
    setCookie('ExperimentName', existingNames.join(','), 1)
    setCookie('ExperimentValue', existingValues.join(','), 1)
  }
}

hiddenValue('#6003 | Constant Contact | LPs | Locked Hero', 'SPZ_6003_V2');

// Simple element waiter
function waitForElement(selector, callback, maxAttempts = 50) {
  let attempts = 0;
  const check = setInterval(() => {
    const el = document.querySelector(selector);
    if (el) {
      clearInterval(check);
      callback(el);
    } else if (++attempts >= maxAttempts) {
      clearInterval(check);
      console.log('Element not found:', selector);
    }
  }, 100);
}

let newElementClassList = ['.spz-newHero', '.spz-socialProof'];

function applyVariant() {
  // Add body classes
  if (!document.body.classList.contains('spz6001_v2')) {
    document.body.classList.add('spz6001_v2');
  }

  if (window.location.pathname === '/landing1/email-marketing-campaign-mobile') {
    if (!document.body.classList.contains('spz6001_email_marketing_campaign_mobile')) {
      document.body.classList.add('spz6001_email_marketing_campaign_mobile');
    }
  }

  preventLegalLinksReload()

  // Wait for hero section to exist, then apply changes once
  waitForElement('.mui-jgfs67', (heroSection) => {
    if (!heroSection.classList.contains('spz-hero-section-6001')) {
      heroSection.classList.add('spz-hero-section-6001');
    }

    headerChanges();
    updateHeroContent();
    socialProofAdded();

    // Wait for form - it might be in different locations depending on page
    const formSelector = '.spz-hero-section-6001 .hero__form form, .spz-hero-section-6001 form.material-ui-form';
    waitForElement(formSelector, (form) => {
      formChanges(form);
    });
  });
}

function headerChanges() {
  const logoImg = document.querySelector('header a.header__logo img');
  if (!logoImg || logoImg.nextElementSibling?.tagName === 'svg') return;

  logoImg.insertAdjacentHTML('afterend', `<svg xmlns="http://www.w3.org/2000/svg" width="111" height="32" viewBox="0 0 111 32" fill="none">
  <g clip-path="url(#clip0_23982_3067)">
    <path d="M47.8467 10.0711C47.8467 7.32268 49.7746 5.33987 52.6956 5.33987C55.5193 5.33987 57.5251 7.26378 57.5251 10.0711C57.5251 12.8785 55.5388 14.8221 52.6956 14.8221C49.7941 14.8221 47.8467 12.8196 47.8467 10.0711ZM55.0519 10.0711C55.0519 8.55949 54.0393 7.53863 52.6956 7.53863C51.2741 7.53863 50.3393 8.61838 50.3393 10.0711C50.3393 11.5043 51.313 12.6037 52.6956 12.6037C54.0004 12.6037 55.0519 11.5828 55.0519 10.0711Z" fill="white"/>
    <path d="M68.703 13.2515L69.5598 11.9951C69.6572 11.8577 69.8325 11.8381 69.9688 11.9362C70.6504 12.5055 71.3709 12.7804 72.2667 12.7804C72.9677 12.7804 73.3572 12.4859 73.3572 12.0344C73.3572 11.6417 72.8898 11.4258 71.7214 11.0331C70.2219 10.5227 68.9172 9.81597 68.9172 8.02946C68.9172 6.38038 70.3388 5.30063 72.2082 5.30063C73.3767 5.30063 74.3309 5.59511 75.3046 6.28222C75.4214 6.36075 75.4604 6.53744 75.3825 6.65523L74.5061 7.9902C74.4088 8.12762 74.2335 8.14725 74.0972 8.0491C73.4546 7.51903 72.7535 7.28345 72.1498 7.28345C71.7798 7.28345 71.293 7.47977 71.293 7.95094C71.293 8.32394 71.7409 8.59879 72.6367 8.93253C74.6035 9.65891 75.7719 10.0908 75.7719 11.9166C75.7719 13.5264 74.6425 14.7632 72.2472 14.7632C70.884 14.7632 69.7156 14.3313 68.7614 13.5853C68.6446 13.546 68.6251 13.389 68.703 13.2515Z" fill="white"/>
    <path d="M77.9143 11.7595V7.51905H77.1159C76.9601 7.51905 76.8433 7.40126 76.8433 7.2442V5.75218C76.8433 5.59512 76.9601 5.47733 77.1159 5.47733H77.9143V3.29819C77.9143 3.14114 78.0312 3.02335 78.1869 3.02335H80.0759C80.2317 3.02335 80.3485 3.14114 80.3485 3.29819V5.47733H82.5296C82.6854 5.47733 82.8022 5.59512 82.8022 5.75218V7.2442C82.8022 7.40126 82.6854 7.51905 82.5296 7.51905H80.3485V11.4062C80.3485 12.2111 80.5627 12.5841 81.1275 12.5841C81.3612 12.5841 81.6922 12.5056 82.0233 12.3878C82.1791 12.3289 82.3348 12.4074 82.3738 12.5645L82.8217 14.0172C82.8606 14.1546 82.8022 14.2921 82.6854 14.351C82.1596 14.6258 81.5754 14.8221 80.4848 14.8221C78.9269 14.8221 77.9143 13.8209 77.9143 11.7595Z" fill="white"/>
    <path d="M106.015 11.7595V7.51905H105.216C105.061 7.51905 104.944 7.40126 104.944 7.2442V5.75218C104.944 5.59512 105.061 5.47733 105.216 5.47733H106.015V3.29819C106.015 3.14114 106.132 3.02335 106.288 3.02335H108.176C108.332 3.02335 108.449 3.14114 108.449 3.29819V5.47733H110.63C110.786 5.47733 110.903 5.59512 110.903 5.75218V7.2442C110.903 7.40126 110.786 7.51905 110.63 7.51905H108.449V11.4062C108.449 12.2111 108.663 12.5841 109.228 12.5841C109.462 12.5841 109.793 12.5056 110.124 12.3878C110.28 12.3289 110.435 12.4074 110.474 12.5645L110.922 14.0172C110.961 14.1546 110.903 14.2921 110.786 14.351C110.26 14.6258 109.676 14.8221 108.585 14.8221C107.047 14.8221 106.015 13.8209 106.015 11.7595Z" fill="white"/>
    <path d="M59.0246 5.47728H60.9135C61.0693 5.47728 61.1862 5.59507 61.1862 5.75212V6.69448C61.9651 5.77178 62.9972 5.33987 64.1267 5.33987C66.0546 5.33987 67.4177 6.39998 67.4177 9.20734V14.3705C67.4177 14.5276 67.3009 14.6454 67.1451 14.6454H65.2562C65.1004 14.6454 64.9835 14.5276 64.9835 14.3705V9.81595C64.9835 8.06871 64.3604 7.519 63.2309 7.519C62.0041 7.519 61.1862 8.38282 61.1862 10.0319V14.3509C61.1862 14.508 61.0693 14.6258 60.9135 14.6258H59.0246C58.8688 14.6258 58.752 14.508 58.752 14.3509V5.71288C58.752 5.59509 58.8688 5.47728 59.0246 5.47728Z" fill="white"/>
    <path d="M95.3429 5.47728H97.2319C97.3877 5.47728 97.5045 5.59507 97.5045 5.75212V6.69448C98.2835 5.77178 99.3156 5.33987 100.445 5.33987C102.373 5.33987 103.736 6.39998 103.736 9.20734V14.3705C103.736 14.5276 103.619 14.6454 103.463 14.6454H101.575C101.419 14.6454 101.302 14.5276 101.302 14.3705V9.81595C101.302 8.06871 100.679 7.519 99.5493 7.519C98.3224 7.519 97.5045 8.38282 97.5045 10.0319V14.3509C97.5045 14.508 97.3877 14.6258 97.2319 14.6258H95.3429C95.1872 14.6258 95.0703 14.508 95.0703 14.3509V5.71288C95.0703 5.59509 95.1872 5.47728 95.3429 5.47728Z" fill="white"/>
    <path d="M83.6592 10.0908C83.6592 7.30304 85.5092 5.33987 87.9434 5.33987C89.0729 5.33987 90.0271 5.79141 90.6697 6.57668V5.73251C90.6697 5.57546 90.7865 5.45765 90.9423 5.45765H92.8313C92.9871 5.45765 93.1039 5.57546 93.1039 5.73251V14.3706C93.1039 14.5276 92.9871 14.6454 92.8313 14.6454H91.0592C90.9034 14.6454 90.7865 14.5276 90.7865 14.3706V13.4871C90.1439 14.3509 89.2287 14.8221 88.0018 14.8221C85.5092 14.8221 83.6592 12.9178 83.6592 10.0908ZM90.7865 10.1104C90.7865 8.6184 89.7739 7.53863 88.4692 7.53863C87.145 7.53863 86.1323 8.53987 86.1323 10.1104C86.1323 11.5828 87.0865 12.6037 88.4692 12.6037C89.7155 12.6037 90.7865 11.6025 90.7865 10.1104Z" fill="white"/>
    <path d="M43.1539 1.62946C44.8675 1.62946 46.3086 2.2184 47.3796 3.10184C47.4965 3.2 47.516 3.35705 47.4381 3.49448L46.2891 5.12394C46.1917 5.26137 45.997 5.28098 45.8802 5.16319C45.1402 4.51534 44.2249 4.12272 43.1539 4.12272C40.7196 4.12272 39.1423 5.9092 39.1423 8.20613C39.1423 10.5227 40.7586 12.2896 43.1149 12.2896C44.186 12.2896 45.1012 11.897 45.8607 11.2295C45.9775 11.1117 46.1723 11.1313 46.2696 11.2687L47.4186 12.8785C47.4965 12.9963 47.477 13.173 47.3602 13.2712C46.0944 14.3117 44.5949 14.8025 43.1149 14.8025C39.1228 14.8025 36.3965 12.1521 36.3965 8.20613C36.3965 4.41718 38.9475 1.62946 43.1539 1.62946Z" fill="white"/>
    <path d="M86.0347 25.6196C86.0347 22.7926 87.982 20.8687 90.8057 20.8687C91.9936 20.8687 93.2399 21.2417 94.1747 22.027C94.2915 22.1252 94.311 22.2822 94.2136 22.4L93.2594 23.7546C93.162 23.892 92.9673 23.9117 92.831 23.7939C92.3636 23.3423 91.7015 23.0675 90.9615 23.0675C89.4815 23.0675 88.5078 24.108 88.5078 25.6C88.5078 27.1117 89.5205 28.1325 90.9615 28.1325C91.7599 28.1325 92.4026 27.838 92.8894 27.3865C93.0063 27.2687 93.2205 27.2883 93.3178 27.4258L94.2915 28.8C94.3694 28.9178 94.3499 29.0749 94.2526 29.173C93.4736 29.8798 92.3441 30.3509 90.7473 30.3509C88.0015 30.3509 86.0347 28.4466 86.0347 25.6196Z" fill="white"/>
    <path d="M69.6575 27.2884V23.0479H68.8591C68.7033 23.0479 68.5864 22.9301 68.5864 22.773V21.281C68.5864 21.1239 68.7033 21.0061 68.8591 21.0061H69.6575V18.827C69.6575 18.6699 69.7743 18.5522 69.9301 18.5522H71.8191C71.9748 18.5522 72.0917 18.6699 72.0917 18.827V21.0061H74.2727C74.4285 21.0061 74.5454 21.1239 74.5454 21.281V22.773C74.5454 22.9301 74.4285 23.0479 74.2727 23.0479H72.0917V26.935C72.0917 27.7399 72.3059 28.1129 72.8706 28.1129C73.1043 28.1129 73.4354 28.0344 73.7664 27.9166C73.9222 27.8577 74.078 27.9362 74.117 28.0933L74.5648 29.546C74.6038 29.6834 74.5454 29.8209 74.4285 29.8798C73.9027 30.1546 73.3185 30.3509 72.228 30.3509C70.6701 30.3509 69.6575 29.3693 69.6575 27.2884Z" fill="white"/>
    <path d="M96.5115 27.2884V23.0479H95.7131C95.5573 23.0479 95.4404 22.9301 95.4404 22.773V21.281C95.4404 21.1239 95.5573 21.0061 95.7131 21.0061H96.5115V18.827C96.5115 18.6699 96.6283 18.5522 96.7841 18.5522H98.6731C98.8289 18.5522 98.9457 18.6699 98.9457 18.827V21.0061H101.127C101.283 21.0061 101.399 21.1239 101.399 21.281V22.773C101.399 22.9301 101.283 23.0479 101.127 23.0479H98.9457V26.935C98.9457 27.7399 99.1599 28.1129 99.7246 28.1129C99.9583 28.1129 100.289 28.0344 100.62 27.9166C100.776 27.8577 100.932 27.9362 100.971 28.0933L101.419 29.546C101.458 29.6834 101.399 29.8209 101.283 29.8798C100.757 30.1546 100.173 30.3509 99.082 30.3509C97.5436 30.3509 96.5115 29.3693 96.5115 27.2884Z" fill="white"/>
    <path d="M47.8467 25.6C47.8467 22.8515 49.7746 20.8687 52.6956 20.8687C55.5193 20.8687 57.5251 22.7926 57.5251 25.6C57.5251 28.4074 55.5388 30.3509 52.6956 30.3509C49.7941 30.3509 47.8467 28.3485 47.8467 25.6ZM55.0519 25.6C55.0519 24.0883 54.0393 23.0675 52.6956 23.0675C51.2741 23.0675 50.3393 24.1472 50.3393 25.6C50.3393 27.0331 51.313 28.1325 52.6956 28.1325C54.0004 28.1325 55.0519 27.1117 55.0519 25.6Z" fill="white"/>
    <path d="M59.0246 20.9669H60.9135C61.0693 20.9669 61.1862 21.0847 61.1862 21.2417V22.184C61.9651 21.2613 62.9972 20.8294 64.1267 20.8294C66.0546 20.8294 67.4177 21.8896 67.4177 24.6969V29.8601C67.4177 30.0172 67.3009 30.135 67.1451 30.135H65.2562C65.1004 30.135 64.9835 30.0172 64.9835 29.8601V25.3055C64.9835 23.5583 64.3604 23.0086 63.2309 23.0086C62.0041 23.0086 61.1862 23.8724 61.1862 25.5215V29.8405C61.1862 29.9975 61.0693 30.1153 60.9135 30.1153H59.0246C58.8688 30.1153 58.752 29.9975 58.752 29.8405V21.2024C58.752 21.0847 58.8688 20.9669 59.0246 20.9669Z" fill="white"/>
    <path d="M75.2852 25.6196C75.2852 22.8319 77.1352 20.8687 79.5694 20.8687C80.6988 20.8687 81.6531 21.3202 82.2957 22.1055V21.2614C82.2957 21.1043 82.4125 20.9865 82.5683 20.9865H84.4573C84.6131 20.9865 84.7299 21.1043 84.7299 21.2614V29.8994C84.7299 30.0564 84.6131 30.1742 84.4573 30.1742H82.6852C82.5294 30.1742 82.4125 30.0564 82.4125 29.8994V29.016C81.7699 29.8798 80.8546 30.3509 79.6278 30.3509C77.1352 30.3509 75.2852 28.4663 75.2852 25.6196ZM82.4125 25.6393C82.4125 24.1472 81.3999 23.0675 80.0952 23.0675C78.7709 23.0675 77.7583 24.0687 77.7583 25.6393C77.7583 27.1117 78.7125 28.1325 80.0952 28.1325C81.3415 28.1325 82.4125 27.1509 82.4125 25.6393Z" fill="white"/>
    <path d="M43.1539 17.1779C44.8675 17.1779 46.3086 17.7669 47.3796 18.6503C47.4965 18.7485 47.516 18.9055 47.4381 19.0429L46.2891 20.6724C46.1917 20.8098 45.997 20.8295 45.8802 20.7117C45.1402 20.0638 44.2249 19.6712 43.1539 19.6712C40.7196 19.6712 39.1423 21.4577 39.1423 23.7546C39.1423 26.0712 40.7586 27.838 43.1149 27.838C44.186 27.838 45.1012 27.4454 45.8607 26.7779C45.9775 26.6601 46.1723 26.6798 46.2696 26.8172L47.4186 28.427C47.4965 28.5448 47.477 28.7215 47.3602 28.8196C46.0944 29.8601 44.5949 30.3509 43.1149 30.3509C39.1228 30.3509 36.3965 27.7006 36.3965 23.7546C36.3965 19.946 38.9475 17.1779 43.1539 17.1779Z" fill="white"/>
    <path d="M14.7803 32C6.03664 32 0.097168 24.8147 0.097168 17.1779C0.097168 9.42331 6.15348 2.72883 14.2156 2.41472C14.5272 2.39509 14.7998 2.66993 14.7998 2.98404V5.3595C14.7998 5.65398 14.5661 5.9092 14.2545 5.92883C8.33454 6.20368 3.56348 11.092 3.56348 17.1975C3.56348 23.1656 8.23717 28.5055 14.7803 28.5055C21.1482 28.5055 25.6661 23.3816 25.9387 17.7276C25.9582 17.4331 26.1919 17.1779 26.5035 17.1779H28.8598C29.1714 17.1779 29.4245 17.4331 29.4245 17.7669C29.1519 25.3055 23.1345 32 14.7803 32Z" fill="white"/>
    <path d="M14.7999 24.1472C10.9051 24.1472 7.88672 21.0258 7.88672 17.1779C7.88672 13.5853 10.6325 10.5816 14.1962 10.2871C14.5272 10.2675 14.7999 10.5227 14.7999 10.8564V13.2319C14.7999 13.5067 14.6051 13.7619 14.313 13.8012C12.5993 14.0368 11.353 15.5092 11.353 17.1975C11.353 19.0822 12.8136 20.6724 14.7999 20.6724C16.4551 20.6724 17.9351 19.4159 18.1688 17.6883C18.2078 17.4135 18.4609 17.1975 18.7336 17.1975H21.0899C21.4209 17.1975 21.6741 17.4724 21.6546 17.8061C21.343 21.3203 18.422 24.1472 14.7999 24.1472Z" fill="white"/>
    <path d="M28.373 14.2724C28.1004 8.52025 23.5436 3.76933 17.682 3.49448C17.3899 3.47485 17.1367 3.23926 17.1367 2.92515V0.569325C17.1367 0.255215 17.3899 0 17.7209 0C25.3351 0.294479 31.5472 6.43926 31.8393 14.2331C31.8588 14.5472 31.5862 14.8221 31.2746 14.8221H28.9183C28.6457 14.8221 28.3925 14.5865 28.373 14.2724Z" fill="white"/>
    <path d="M17.7795 11.4061C17.4289 11.3472 17.1758 11.0527 17.1758 10.7583V8.44169C17.1758 8.10795 17.4484 7.85274 17.7795 7.87237C21.1679 8.16685 23.7774 10.8957 24.0695 14.1938C24.0889 14.5276 23.8358 14.8024 23.5047 14.8024H21.0316C20.7979 14.8024 20.6226 14.6454 20.5837 14.4098C20.4084 13.0159 19.3568 11.681 17.7795 11.4061Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_23982_3067">
      <rect width="111" height="32" fill="white"/>
    </clipPath>
  </defs>
</svg>`);
}

function updateHeroContent() {
  const heroContentMap = {
    '/landing1/email-marketing-campaign-mobile': {
      subHeading: 'EMAIL & social MEDIA MARKETING PLATFORM',
      heading: 'Grow your business with automated email & social media marketing.',
      usp: [
        '<strong>Emails.</strong> Build high-converting emails in minutes with AI. Just enter a few keywords. Automatically send at the best times. Drive more sales.',
        '<strong>Socials.</strong> Instantly create posts and ads for Facebook, Instagram, & LinkedIn. Post to all platforms. Reach ready-to-buy customers.',
        "<strong>Analytics.</strong> See who opens emails, which posts and emails increase revenue, and more. Repeat what's successful & boost sales."
      ]
    },
    '/landing1/social-media-tools': {
      subHeading: 'SOCIAL MEDIA MARKETING platform',
      heading: 'Streamline social media marketing. Boost revenue while saving time.',
      usp: [
        '<strong>Socials.</strong> Generate all your Facebook, Instagram, LinkedIn, & email content with AI. See when to post. Grow your following & boost sales.',
        '<strong>Ads.</strong> Create high-converting social ads that reach ready-to-buy customers. Generate content & launch in a few clicks.',
        '<strong>Analytics.</strong> See which posts drive the highest revenue and new follower growth. Repeat what\'s successful and boost sales.'
      ]
    }
  };

  const path = window.location.pathname;
  const heroData = heroContentMap[path];
  if (!heroData) return;

  const targetSection = document.querySelector('.spz-hero-section-6001 .hero__content');
  if (!targetSection || targetSection.querySelector('.spz-newHero')) return;

  const newHero = document.createElement('div');
  newHero.className = 'spz-newHero';
  newHero.innerHTML = `
        <h3 class="spz-subHeading">${heroData.subHeading}</h3>
        <h1 class="spz-heading">${heroData.heading}</h1>
        <ul class="spz-heroUSP">
            ${heroData.usp.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;

  if (!document.querySelector('.spz-newHero')) {
    targetSection.prepend(newHero);
  }

  // For social-media-tools page, create form container and move form into it
  if (path === '/landing1/social-media-tools') {
    const heroContent = document.querySelector('.spz-hero-section-6001 .hero__content');
    const heroParent = heroContent?.parentElement;

    if (heroParent && !heroParent.classList.contains('hero--form')) {
      heroParent.classList.add('hero--form');
    }

    if (heroParent && !document.querySelector('.spz-hero-section-6001 .hero__form')) {
      const formWrapper = document.createElement('div');
      formWrapper.className = 'hero__form';
      heroContent.after(formWrapper);

      const ctctForm = document.querySelector('.ctct-form-outer-wrapper');
      if (ctctForm) {
        formWrapper.appendChild(ctctForm);
      }
    }
  }

  // Add locked hero functionality
  if (!localStorage.getItem('spz-6003-unlocked')) {
    document.body.classList.add('spz6001_lockedHero');
    addStickyCTA();
  }
}

function addStickyCTA() {
  if (document.querySelector('.spz-sticky-cta')) return;

  document.querySelector('#main')?.insertAdjacentHTML('beforeend', `
        <button class="spz-sticky-cta">
            <div>
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="#0F141C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </button>
    `);

  document.querySelector('.spz-sticky-cta')?.addEventListener('click', () => {
    document.body.classList.remove('spz6001_lockedHero');
    localStorage.setItem('spz-6003-unlocked', 'true');
    document.querySelector('.spz-hero-section-6001')?.nextElementSibling?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

function socialProofAdded() {
  const target = document.querySelector('.spz-hero-section-6001 .hero.hero--form');
  if (!target || document.querySelector('.spz-socialProof')) return;

  target.insertAdjacentHTML('afterend', `
        <div class="spz-socialProof">
            <p>Join 600,000 customers growing revenue with Constant Contact</p>
            <ul>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-cornell-engineering.svg" alt="cornell engineering"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-techsoup.svg" alt="techsoup"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-mathnasium.svg" alt="mathnasium"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-dream-vacations.svg" alt="dream vacations"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-kw-citywide.svg" alt="kw citywide"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1762181444/constantcontact/6003/logo-the-ups-store.svg" alt="the ups store"></li>
            </ul>
        </div>
    `);
}

function formChanges(form) {
  if (!form.querySelector('.spz-form-fields-wrapper') && window.location.pathname !== '/landing1/social-media-tools') {
    const wrapper = document.createElement('div');
    wrapper.className = 'spz-form-fields-wrapper';

    // Get fields
    const emailField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="email"]');
    const passwordField = form.querySelector('.field.material-ui-field:has(.field__password-wrapper), .field.material-ui-field:has(input[type="password"])');
    const firstNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="givenName"]');
    const lastNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="familyName"]');
    const orgField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="organization"]');
    const phoneField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="tel"]');

    // Add in NEW order: First Name, Last Name (row 1), Email, Password (row 2), then others
    if (firstNameField) wrapper.appendChild(firstNameField);
    if (lastNameField) wrapper.appendChild(lastNameField);
    if (emailField) wrapper.appendChild(emailField);
    if (passwordField) wrapper.appendChild(passwordField);
    if (orgField) wrapper.appendChild(orgField);
    if (phoneField) wrapper.appendChild(phoneField);

    // Insert wrapper after form headers
    const formHeaders = form.querySelector('.form-headers');
    const formFieldsWrapper = form.querySelector('.form-fields-wrapper');

    if (formFieldsWrapper) {
      formFieldsWrapper.prepend(wrapper);
    } else if (formHeaders) {
      formHeaders.after(wrapper);
    } else {
      form.prepend(wrapper);
    }
  }
  // Reorder fields for email-marketing-campaign-mobile page (V2 specific)
  // if (window.location.pathname === '/landing1/email-marketing-campaign-mobile') {
  //     const firstName = form.querySelector('.field.material-ui-field[data-attr-form-field-id="givenName"]');
  //     const emailField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="email"]');
  //     const lastName = form.querySelector('.field.material-ui-field[data-attr-form-field-id="familyName"]');
  //     if (firstName && emailField && emailField.parentNode && !form.hasAttribute('data-spz-fields-reordered')) {
  //         form.setAttribute('data-spz-fields-reordered', 'true');
  //         emailField.insertAdjacentElement('beforebegin', firstName);
  //         if (firstName.parentNode) {
  //             firstName.insertAdjacentElement('afterend', lastName);
  //         }
  //     }
  // }

  // Remove "Required" from all labels
  const labels = form.querySelectorAll('label[data-attr-input-width="normal"]');
  labels.forEach(label => {
    if (label.textContent.includes('Required')) {
      // label.textContent = label.textContent.replace(/\s*Required\s*/gi, '').trim();
    }
  });

  // Also update the fieldset legend spans (for the floating label outline)
  const legendSpans = form.querySelectorAll('fieldset legend span');
  legendSpans.forEach(span => {
    if (span.textContent.includes('Required')) {
      // span.textContent = span.textContent.replace(/\s*Required\s*/gi, '').trim();
    }
  });

  // Update disclaimer text
  form.querySelectorAll('.form__text-content p').forEach(p => {
    if (p.textContent.includes('"Get started,"')) {
      p.innerHTML = p.innerHTML.replace(/"Get started,"/g, '"Instant Access",');
      p.parentElement.parentElement.classList.add('spz-disclaimer')
    }
  });

  // Replace the svg dropdown icon
  const dropdownIcon = form.querySelector('[data-testid="ArrowDropDownIcon"]');
  if (dropdownIcon && !dropdownIcon.classList.contains('spz-icon-replaced')) {
    dropdownIcon.classList.add('spz-icon-replaced');
    dropdownIcon.setAttribute('viewBox', '0 0 12 7');
    dropdownIcon.setAttribute('width', '12');
    dropdownIcon.setAttribute('height', '7');
    dropdownIcon.innerHTML = '<path d="M0.75 0.75L5.75 5.75L10.75 0.75" stroke="#63708A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>';
  }
}

function isTargetPage() {
  const path = window.location.pathname;
  return path === '/landing1/email-marketing-campaign-mobile' ||
    path === '/landing1/social-media-tools';
}

// Simple one-time initialization
function init() {
  if (!isTargetPage()) return;
  applyVariant();
}

init();

const handleMutations = (mutationsList, observer) => {
  if (document.querySelectorAll(newElementClassList.join()).length != newElementClassList.length) {
    console.log("SPZZZ: Body changed");
    init();
  }
};

const config = {
  attributes: true,
  childList: true,
  subtree: true
};

// Main body observer to catch all changes including route changes
let bodyObserver = new MutationObserver(handleMutations);
bodyObserver.observe(document.body, config);