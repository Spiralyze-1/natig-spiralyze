(function () {
  //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

  // Set the value of the squeezePage variable as needed:
  // true  – if you are using a squeeze page (i.e., the page contains a form)
  // false – if you are not using a squeeze page (i.e., the page does not contain a form)
  // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

  const squeezePage = true // true / false / 'both'
  const expName = '4025' //experiment name should be 1001, 1002, 1003 etc.
  const variantName = `variant_#` + expName //variantName should be _variant, _true_control etc.
  const clientDomain = '.hellopebl.com' //domain should be .spiralyze.com

  /***********************************
    ************************************
    DO NOT TOUCH
    BEYOND THIS LINE
    ******************************
    ******************************/
  const formHiddenValue = variantName
  if (squeezePage === true) {
    window.squeezePageValue = formHiddenValue
  } else if (squeezePage === false) {
    hiddenValue(expName, variantName)
  } else if (squeezePage === 'both') {
    hiddenValue(expName, variantName)
    window.squeezePageValue = formHiddenValue
  }
  function hiddenValue(currentExperimentName, currentExperimentValue) {
    function setCookie(name, value, days) {
      var expires = ''
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + ';domain=' + clientDomain + ';path=/'
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
    var ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(',') : []

    if (!ExistingExperimentName) {
      setCookie('ExperimentName', currentExperimentName, 1)
      setCookie('ExperimentValue', currentExperimentValue, 1)
    } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) == -1) {
      setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1)
      setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1)
    } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) > -1) {
      var existingNames = ExistingExperimentName.split(',')
      var existingValues = ExistingExperimentValue.split(',')
      var index = existingNames.indexOf(currentExperimentName)
      existingValues[index] = currentExperimentValue
      setCookie('ExperimentName', existingNames.join(','), 1)
      setCookie('ExperimentValue', existingValues.join(','), 1)
    }
  }
})()
// Helper function to wait for multiple elements
function waitForMultipleElements(selectors, callback, timeout = 10000) {
    let stop = false;
    let timeoutId;
    
    const check = function () {
        try {
            if (stop) return;
            
            // Check if all elements exist
            const allElementsExist = selectors.every(selector => {
                return document.querySelector(selector) !== null;
            });
            
            if (allElementsExist) {
                callback();
                clearTimeout(timeoutId);
            } else {
                window.requestAnimationFrame(check);
            }
        } catch (err) {
            console.log(err);
        }
    };
    
    window.requestAnimationFrame(check);
    timeoutId = setTimeout(function () {
        stop = true;
        console.warn('Timeout: Not all elements were found', selectors);
    }, timeout);
}

// Example test: Test number = 5038, Test type = v (variation)
const testNumber = '4025';
const testType = 'v1';

// Wait for all required elements before executing
const requiredSelectors = [
    '#mktoForm_2505',
    '.logo-wrap > a > img',
    '.text-container > h1',
    '#LblFirstName',
    '#LblLastName',
    '.mktoButton'
];

waitForMultipleElements(requiredSelectors, () => {
    document.body.classList.add(`spz_${testNumber}_${testType}`)

    const logoImage = document.querySelector('.logo-wrap > a > img')
    const mainTitle = document.querySelector('.text-container > h1')
    const mainForm = document.querySelector('#mktoForm_2505')
    const firstName = document.querySelector('#LblFirstName')
    const lastName = document.querySelector('#LblLastName')
    const submitButton = document.querySelector('.mktoButton')
    const allLabels = document.querySelectorAll('.mktoLabel')

    // set cloudinary image 
    logoImage.setAttribute('src', 'https://res.cloudinary.com/spiralyze/image/upload/v1761751644/pebl/4025/pedl_logo.svg')
    logoImage.setAttribute('alt', 'Pebl logo')

    // change the h1
    mainTitle.textContent = 'Watch the Demo'

    // input labels
    firstName.textContent = 'First name'
    lastName.textContent = 'Last name'

    // button text
    submitButton.innerHTML = `
        <span>
            Watch now
        </span>
    `

    //apply g2 review
    mainTitle.insertAdjacentHTML('afterend', `
        <div class='spz__trust-badge'>
            <img src='https://res.cloudinary.com/spiralyze/image/upload/v1761751622/pebl/4025/g2_logosvg.svg' alt='G2 logo'>
            <img src='https://res.cloudinary.com/spiralyze/image/upload/v1762966343/pebl/4025/rating_1.svg' alt='G2 stars'>
            <div class="spz__trust-badge__text-content">
                <strong>4.7</strong>
                <p>(288 reviews)</p>
            </div>
        </div>    
    `)

    // add bottom partners logos
    mainForm.insertAdjacentHTML('afterend', `
        <div class='spz__partners-logos'>
            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/4025/logo_01_webp.webp" alt="LastPass logo">
            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/4025/logo_02_webp.webp" alt="Crunchbase logo">
            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/4025/logo_03_webp.webp" alt="Attentive logo">
            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/4025/logo_04_webp.webp" alt="Materialize logo">
            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/4025/logo_05_webp.webp" alt="Consensys logo">
        </div>    
    `)

    // remove semicolon from labels
    if(allLabels){
        allLabels.forEach(item => {
            item.textContent = item.textContent.replace(/[:*]/g, "")
        })
    }
});