(function () {
  const squeezePage = 'both'
  const expName = '7008'
  const variantName = `variant_#${expName}`
  const clientDomain = 'hellopebl.com'

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

const testNumber = '7008';
const testType = 'v';

waitForElement('body', (docBody) => {
    console.log(`spz_${testNumber}_${testType} started`)
    docBody.classList.add(`spz_${testNumber}_${testType}`)

    const menuWrap = document.querySelectorAll('.desktop-menu-wrap > div a')

    if(menuWrap){
      menuWrap.forEach(item => {
          if(item.textContent == "Get started"){
              item.textContent = "Get an estimate"
              item.classList.add(`spz${testNumber}_${testType}`)
          }
      })
    }
    
    const navWrap = document.querySelectorAll('#mobile-nav > div a')
    if(navWrap){
      navWrap.forEach(item => {
          if(item.textContent == "Get started"){
              item.textContent = "Get an estimate"
              item.classList.add(`spz${testNumber}_${testType}`)
          }
      })
    }
})