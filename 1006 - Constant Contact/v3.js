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

hiddenValue('#1006 | Constant Contact | Home | Dual CTA', 'SPZ_1006_V3')

const testNumber = '1006'
const testType = 'v3'

console.log(`spz_${testNumber}_${testType}`)

waitForElement("body", (docBody) => {
    docBody.classList.add(`spz_${testNumber}_${testType}`)
})

waitForElement("#centered-cta-signupform", (docForm) => {
    docForm.querySelector('#centered-cta-siteContactEmailLogin').removeAttribute('required')
    const footer = docForm.querySelector('.two-step__footer');
    const freeTrialBtn = footer.querySelector('.two-step__submit')

    if (!freeTrialBtn.classList.contains(`spz_${testNumber}_${testType}`)) {
        freeTrialBtn.classList.add(`spz_${testNumber}_${testType}`)
    }

    if (!docForm.querySelector('.spz-view-pricing-btn')) {
        docForm.insertAdjacentHTML('beforeend', `
            <a href="https://www.constantcontact.com/pricing" class="spz-view-pricing-btn">
                <span>View pricing</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.9537 0.265202C7.5478 -0.109402 6.9152 -0.0840961 6.5406 0.321725C6.166 0.727546 6.1913 1.36021 6.5971 1.73481L10.4425 5.28443H1C0.447715 5.28443 0 5.73215 0 6.28443C0 6.83672 0.447715 7.28443 1 7.28443H10.4425L6.5971 10.834C6.1913 11.2086 6.166 11.8413 6.5406 12.2471C6.9152 12.6529 7.5478 12.6782 7.9537 12.3036L13.6784 7.01922C13.8835 6.82991 14.0002 6.56351 14.0002 6.28441C14.0002 6.00531 13.8835 5.73892 13.6784 5.54961L7.9537 0.265202Z" fill="white"></path>
                </svg>
            </a>
        `)
    }
});