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
hiddenValue('#7002 | Constant Contact | Free Trial | Form Messaging - Build', 'SPZ_7002_V4')
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

waitForElement('.main-grid', (targetNode) => {
    document.body.classList.add('spz_7002_v4'); // Update this class name
    console.log("Test: spz_7002_v4")

    const template_formUniqueSelector = "#sign-up-form"

    const formLoaded = setInterval(() => {
        if (document.querySelector(template_formUniqueSelector) && document.querySelectorAll(`${template_formUniqueSelector} input`).length > 0) {
            clearInterval(formLoaded);
            enhanceForm();
        }
    });

    const observerCallback = (mutationsList, observer) => {
        if (document.querySelector('.main-grid #main') && document.querySelector(template_formUniqueSelector) && !document.querySelector(template_formUniqueSelector).classList.contains('spz-form-enhanced')) {
            enhanceForm();
        }
    };

    const observerConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, observerConfig);

    function enhanceForm() {
        const formElement = document.querySelector(template_formUniqueSelector);
        if (!formElement || formElement.classList.contains('spz-form-enhanced')) {
            return;
        }

        document.body.classList.add('spz_7002_v4'); // Update this class name
        formElement.classList.add('spz-form-enhanced');

        // Form update start
        var template_inputsSelectors, template_labelValues;
        if (window.location.pathname.includes('/buynow/')) {
            document.body.classList.add('spz_buynow_page');
            template_inputsSelectors = ["#email", "#new-password"];
            template_labelValues = ["Email", "Password"];

            if (document.querySelector('.form-headline')) {
                document.querySelector('.form-headline').innerHTML = `Start FREE today!`;
            }
        } else {
            template_inputsSelectors = ["#email", "#new-password", "#given-name", "#family-name", "#tel"];
            template_labelValues = ["Email", "Password", "First Name", "Last Name", "Phone"];

            if (document.querySelector('.form-headline')) {
                document.querySelector('.form-headline').innerHTML = `Start FREE today!`;
            }

            if (document.querySelector('.sign-up-form-visible-legal-t-cs')) {
                document.querySelector('.sign-up-form-visible-legal-t-cs').parentElement.classList.add('spz_privacy_policy');
                const originalText = document.querySelector('.sign-up-form-visible-legal-t-cs p');

                if (originalText && !document.querySelector('.spz_dummy_text')) {
                    originalText.style.display = 'none';
                    originalText.insertAdjacentHTML('beforebegin', `<p class="spz_dummy_text">By clicking "Get started", you agree to the <a class="spz_terms" href="javascript:void(0)">Terms of Service</a> and acknowledge receipt<br class="spz-space"/> of our <a class="spz_privacy" href="javascript:void(0)">Privacy Notice</a>.</p>`);

                    document.querySelector('.spz_dummy_text a.spz_terms').addEventListener('click', () => {
                        const termsLink = document.querySelector('[title="Terms & Conditions - modal link"]');
                        if (termsLink) termsLink.click();
                    });

                    document.querySelector('.spz_dummy_text a.spz_privacy').addEventListener('click', () => {
                        const privacyLink = document.querySelector('[title="/signup- Privacy Notice - Link"]');
                        if (privacyLink) privacyLink.click();
                    });
                }
            }
        }

        // Wait for inputs to be ready
        var checkInput = setInterval(() => {
            if (document.querySelectorAll(`${template_formUniqueSelector} input`).length > 0) {
                clearInterval(checkInput);
                handleInput(template_inputsSelectors, template_labelValues);
            }
        }, 100);

        function handleInput(inputs, template_labelValues) {
            // Reorder fields for signup page
            if (!document.querySelector('#main.main-pricing-signup-page')) {
                const emailField = document.querySelector('[data-attr-form-field-id="email"]');
                const givenNameField = document.querySelector('[data-attr-form-field-id="givenName"]');
                const familyNameField = document.querySelector('[data-attr-form-field-id="familyName"]');

                if (emailField && givenNameField && familyNameField) {
                    emailField.insertAdjacentElement('beforebegin', givenNameField);
                    emailField.insertAdjacentElement('beforebegin', familyNameField);
                }
            }

            inputs.forEach((item, index) => {
                const input = document.querySelector(item);
                if (!input) return;

                const parentDiv = input.parentElement;
                const existingLabel = parentDiv.parentElement.querySelector('label:not(.label-spz)');

                // Hide existing label
                if (existingLabel) existingLabel.style.display = 'none';

                // Check if label already exists
                if (parentDiv.querySelector('.label-spz')) return;

                // Create new label
                const label = document.createElement('label');
                label.innerText = template_labelValues[index];
                label.classList.add('label-spz');
                label.classList.add(`label-spz-${item.replace(/[^a-zA-Z0-9]/g, '')}`);
                label.style.width = '';

                label.addEventListener('click', function (e) {
                    const actualInput = parentDiv.querySelector('input, select, textarea');
                    if (actualInput) actualInput.focus();
                });

                // Insert label after input
                parentDiv.insertBefore(label, input.nextSibling);
                label.parentElement.classList.add('spz-input-wrap');

                // Add placeholder
                input.setAttribute('placeholder', template_labelValues[index]);

                // Handle select elements
                if (input.tagName === 'SELECT') {
                    input.addEventListener('change', () => {
                        if (input.value.length > 0) {
                            input.closest(".spz-input-wrap").classList.add("has-value");
                            input.setAttribute('style', 'color:');
                        } else {
                            input.closest(".spz-input-wrap").classList.remove("has-value");
                            input.setAttribute('style', 'color:rgba(0,0,0,0)!important');
                        }
                    });

                    if (input.value !== '') {
                        parentDiv.classList.add('has-value');
                        input.setAttribute('style', 'color:');
                    } else {
                        input.setAttribute('style', 'color:rgba(0,0,0,0)!important');
                    }
                }
            });
        }
        // Form update end
    }
});