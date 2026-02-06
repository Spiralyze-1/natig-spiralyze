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
hiddenValue('#5003 | Constant Contact | Buy Now | Form Messaging - Build', 'SPZ_5003_V2')

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/

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

var template_formUniqueSelector = "#buy-form-em-pwd-v2-pricing";

const formLoaded = setInterval(() => {
    if (document.querySelector(template_formUniqueSelector) && document.querySelectorAll(`${template_formUniqueSelector} input`).length > 0) {
        clearInterval(formLoaded);
        addForm();
    }
});

// Debounce helper
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

// Debounced callback
const observerCallback = debounce(() => {
    if (document.querySelector('.main-grid #main') && !document.querySelector('.spz_modal_wrap')) {
        addForm();
    }
}, 300);

const observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
};

const observer = new MutationObserver(observerCallback);
observer.observe(document.body, observerConfig);

// This is the code to generate the form over UI section do no edit it
function addForm() {

    // Firefox
    function isFirefox() {
        return /firefox/i.test(navigator.userAgent);
    }

    // Usage
    if (isFirefox()) {
        document.body.classList.add('spz_firefox');
    }

    // Safari
    function isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    // Usage
    if (isSafari()) {
        document.body.classList.add('spz_safari');
    }

    document.body.classList.add('spz_5003_v2');

    // Insert html template
    if (!document.querySelector('.spz_5003_applied')) {

        const formSelector = '.hero__form form, form.material-ui-form';
        const formElement = document.querySelector(formSelector);

        var template_inputsSelectors, template_labelValues;
        document.body.classList.add('spz_buynow_page');
        template_inputsSelectors = ["#email", "#new-password"];
        template_labelValues = ["Email", "Password"];
        document.querySelector('.form-headline').innerHTML = `Get started`;
        document.querySelector('[type="submit"]').classList.add('spz5003_v2')

        // Update disclaimer text
        if (formElement) {
            const disclaimerContainer = formElement.querySelector('.sign-up-form-visible-legal-t-cs-v-2-pricing');

            if (disclaimerContainer) {
                // Hide original paragraph
                const originalP = disclaimerContainer.querySelector('p');
                if (originalP) {
                    originalP.style.display = 'none';
                }

                // Insert new disclaimer with proper links
                disclaimerContainer.insertAdjacentHTML('beforeend', `
		            <p class="spz_dummy_text">By clicking "Register now", you agree to the <a class="spz_terms" href="javascript:void(0)">Terms of Service</a> and acknowledge receipt<br class="spz-space"/> of our <a class="spz_privacy" href="javascript:void(0)">Privacy Notice</a>.</p>
		        `);

                // Add event listeners to trigger original modal links
                disclaimerContainer.querySelector('.spz_dummy_text a.spz_terms').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector('[title="Terms & Conditions - modal link"]').click();
                });

                disclaimerContainer.querySelector('.spz_dummy_text a.spz_privacy').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector('[title="/signup- Privacy Notice - Link"]').click();
                });
            }
        }

        // Add required to all inputs
        var checkInput = setInterval(() => {
            if (document.querySelectorAll('#buy-form-em-pwd-v2-pricing input').length > 0) {
                clearInterval(checkInput);
                handleInput(template_inputsSelectors, template_labelValues);
            }
        }, 100);

        function handleInput(inputs, template_labelValues) {
            inputs.forEach((item, index) => {
                const parentDiv = document.querySelector(item).parentElement;
                const input = document.querySelector(item);
                const existingLabel = parentDiv.parentElement.querySelector('label:not(.label-spz)');
                if (existingLabel) existingLabel.style.display = 'none';

                const label = document.createElement('label');
                label.innerText = template_labelValues[index];
                label.classList.add('label-spz');
                label.classList.add(`label-spz-${item.replace(/[^a-zA-Z0-9]/g, '')}`);
                label.style.width = '';

                label.addEventListener('click', function (e) {
                    const actualInput = parentDiv.querySelector('input, select, textarea');
                    if (actualInput) actualInput.focus();
                });
                //inserting labels after input.
                parentDiv.insertBefore(label, input.nextSibling);
                label.parentElement.classList.add('spz-input-wrap')
                //adding placeholder to all inputs
                input.setAttribute('placeholder', template_labelValues[index]);
                if (input.tagName === 'SELECT') {
                    input.addEventListener('change', () => {
                        if (input.value.length > 0) {
                            input.closest(".spz-input-wrap").classList.add("has-value")
                            input.setAttribute('style', 'color:')
                        } else {
                            input.closest(".spz-input-wrap").classList.remove("has-value")
                            input.setAttribute('style', 'color:rgba(0,0,0,0)!important')
                        }
                    })
                    if (input.value !== '') {
                        parentDiv.classList.add('has-value');
                        input.setAttribute('style', 'color:')
                    } else {
                        input.setAttribute('style', 'color:rgba(0,0,0,0)!important')
                    }
                }
            });
        }

        // Mark as applied
        document.body.classList.add('spz_5003_applied');

        // Form update end
    }
}