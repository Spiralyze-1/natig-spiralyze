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
    }, 10000)
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

const testNumber = '1006'
const testType = 'v2'
console.log(`spz_${testNumber}_${testType}`)

waitForElement("body", (docBody) => {
    hiddenValue('#1006 | Constant Contact | Home | Dual CTA', 'SPZ_1006_V2')
    docBody.classList.add(`spz_${testNumber}_${testType}`)
})

waitForElement("#centered-cta-signupform", (docForm) => {
    const footer = docForm.querySelector('.two-step__footer');
    const freeTrialBtn = footer.querySelector('.two-step__submit')
    freeTrialBtn.style.height = "56px"

    if (!freeTrialBtn.classList.contains(`spz_${testNumber}_${testType}`)) {
        freeTrialBtn.classList.add(`spz_${testNumber}_${testType}`)
    }

    if (!footer.querySelector('.spz-buy-now-btn')) {
        footer.innerHTML = `
            <a href="https://www.constantcontact.com/signup" class='spz-two-step__submit spz_${testNumber}_${testType}'>Free trial</a>
            <a href="https://www.constantcontact.com/buynow/plans/signup" class='spz-buy-now-btn spz_${testNumber}_${testType}'>Buy now</a>
        `
    }
});