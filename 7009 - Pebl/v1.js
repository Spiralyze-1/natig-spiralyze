(function () {
    const squeezePage = 'both'
    const expName = '7009'
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

const testNumber = '7009';
const testType = 'v1';

waitForElement('body', (docBody) => {
    console.log(`spz_${testNumber}_${testType} started`)
    docBody.classList.add(`spz_${testNumber}_${testType}`)


    const handleClick = (e) => {
        e.preventDefault()

        if (document.getElementById('spz-modal-overlay')) return

        docBody.insertAdjacentHTML('afterbegin', `
            <div id="spz-modal-overlay" class="spz-modal-overlay">
                <div class="spz-modal">
                    <button class="spz-modal-close" aria-label="Close">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772704471/pebl/7009/icons16.svg" alt="close icon">
                    </button>

                    <h2 class="spz-modal-headline">How many countries are you looking to hire in?</h2>

                    <div class="spz-modal-options">
                        <label class="spz-modal-option">
                            <input type="radio" name="spz-countries" value="single">
                            <span class="spz-modal-option-icon">
                                <img class="spz-icon-desk" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772704442/pebl/7009/pebl_coreicon_localiq.svg" alt="Single country">
                                <img class="spz-icon-mob" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772728783/pebl/7009/pebl_coreicon_localiq_1.svg" alt="Single country">
                            </span>
                            <span class="spz-modal-option-label">Single country</span>
                            <span class="spz-radio-custom"></span>
                        </label>
                        <label class="spz-modal-option">
                            <input type="radio" name="spz-countries" value="multiple">
                            <span class="spz-modal-option-icon">
                                <img class="spz-icon-desk" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772704452/pebl/7009/pebl_coreicon_countryhiringguides.svg" alt="Multiple countries">
                                <img class="spz-icon-mob" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772728815/pebl/7009/pebl_coreicon_countryhiringguides_1.svg" alt="Multiple countries">
                            </span>
                            <span class="spz-modal-option-label">Multiple countries</span>
                            <span class="spz-radio-custom"></span>
                        </label>
                        <label class="spz-modal-option">
                            <input type="radio" name="spz-countries" value="not-sure">
                            <span class="spz-modal-option-icon">
                                <img class="spz-icon-desk" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772704460/pebl/7009/pebl_coreicon_expertguidance.svg" alt="Not sure yet">
                                <img class="spz-icon-mob" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1772728809/pebl/7009/pebl_coreicon_expertguidance_1.svg" alt="Not sure yet">
                            </span>
                            <span class="spz-modal-option-label">Not sure yet</span>
                            <span class="spz-radio-custom"></span>
                        </label>
                    </div>

                    <button class="spz-modal-next btn-pacific">Next</button>
                </div>
            </div>
        `)

        docBody.style.overflow = 'hidden'

        const overlay = document.getElementById('spz-modal-overlay')
        const closeBtn = overlay.querySelector('.spz-modal-close')
        const nextBtn = overlay.querySelector('.spz-modal-next')

        const closeModal = () => {
            overlay.remove()
            docBody.style.overflow = ''
        }

        closeBtn.addEventListener('click', closeModal)
        overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal() })

        overlay.querySelectorAll('input[name="spz-countries"]').forEach(radio => {
            radio.addEventListener('change', () => {
                overlay.querySelectorAll('.spz-modal-option').forEach(lbl => lbl.classList.remove('is-selected'))
                radio.closest('.spz-modal-option').classList.add('is-selected')
            })
        })

        nextBtn.addEventListener('click', () => {
            const selected = overlay.querySelector('input[name="spz-countries"]:checked')
            if (!selected) {
                /* nextBtn.classList.add('is-error')
                nextBtn.textContent = 'Please select an option'
                setTimeout(() => {
                    nextBtn.classList.remove('is-error')
                    nextBtn.textContent = 'Next'
                }, 1500) */
                return
            }
            console.log('Selected:', selected.value)
            if (selected.value == "single") {
                window.open("https://signup.hellopebl.com/self-signup", "_blank")
                closeModal()
            }
            else if (selected.value == "multiple") {
                document.location.href = "https://hellopebl.com/contact/"
            }
            else if (selected.value == "not-sure") {
                document.location.href = "https://hellopebl.com/contact/"
            }
        })
    }


    const menuWrap = document.querySelectorAll('.desktop-menu-wrap > div a')
    if (menuWrap) {
        menuWrap.forEach(item => {
            if (item.textContent.trim() === "Get started") {
                item.classList.add(`spz${testNumber}_${testType}`)
                item.addEventListener('click', handleClick)
            }
            if (item.textContent.trim() === "Contact us") {
                item.remove()
            }
        })
    }

    const navWrap = document.querySelectorAll('#mobile-nav > div a')
    if (navWrap) {
        navWrap.forEach(item => {
            if (item.textContent.trim() === "Get started") {
                item.classList.add(`spz${testNumber}_${testType}`)
                item.addEventListener('click', handleClick)
            }
            if (item.textContent.trim() === "Contact us") {
                item.remove()
            }
        })
    }
})