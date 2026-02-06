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
hiddenValue('#5002 | Constant Contact | Buy Now | Additional Fields - Build', 'SPZ_5002_V1')
/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
//Helper function to animate labels for inputs

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

const errorIcon = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1702_995)"><path opacity="0.12" d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" fill="#d92d20"></path><path d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#d92d20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_1702_995"><rect width="22" height="22" fill="white"></rect></clipPath></defs></svg>`

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

    document.body.classList.add('spz_5002_v1');
    // Insert html template
    if (!document.querySelector('.spz_dummy_cta')) {

        // Form update start
        var template_inputsSelectors, template_labelValues;
        document.body.classList.add('spz_buynow_page');
        template_inputsSelectors = ["#email", "#new-password"];
        template_labelValues = ["Email", "Password"];
        document.querySelector('.form-headline').innerHTML = `You're one step away from checkout.`;

        // Add custom fields
        document.querySelector('.field__password-wrapper').parentElement.insertAdjacentHTML('afterend', `
            <div class="custom_field_wrapper">
                <div class="first_name_field input_wrapper">
                    <label class="label-spz" for="first_name">First Name</label>
                    <input type="text" id="first_name" name="first_name"/>
                    <div class="error-spz"></div>
                </div>
                <div class="phone_field input_wrapper">
                    <label class="label-spz" for="phone">Phone</label>
                    <input type="text" name="fake_username" autocomplete="username" style="position:absolute; opacity:0; height:0; width:0; pointer-events:none;" />
                    <input type="tel" autocomplete="off" id="phone"/>
                    <div class="error-spz"></div>
                </div>
            </div>    
        `);

        document.querySelector('.custom_field_wrapper').classList.add('spz-hidden');

        const CSS_URL = 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/css/intlTelInput.min.css';
        const JS_URL = 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js';
        const UTILS_URL = 'https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js';

        function loadCss(url) {
            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                link.onload = resolve;
                link.onerror = () => reject(new Error('CSS load failed'));
                document.head.appendChild(link);
            });
        }

        function loadScript(url) {
            return new Promise((resolve, reject) => {
                const s = document.createElement('script');
                s.src = url;
                s.onload = resolve;
                s.onerror = () => reject(new Error('Script load failed'));
                document.body.appendChild(s);
            });
        }

        async function init() {
            const input = document.querySelector("#phone");
            if (!input) {
                return;
            }

            const iti = window.intlTelInput(input, {
                initialCountry: "us",
                separateDialCode: true,
                nationalMode: false,
                preferredCountries: ["us", "gb", "ca"],
                utilsScript: UTILS_URL,
                autoPlaceholder: "off",
                formatOnDisplay: false
            });

            // Track if user manually changed country
            let userSelectedCountry = "us";
            let allowCountryChange = false;

            // Detect when user clicks on country selector or country list
            const countrySelector = input.parentElement.querySelector('.iti__selected-flag');
            const countryList = input.parentElement.querySelector('.iti__country-list');

            if (countrySelector) {
                countrySelector.addEventListener('click', () => {
                    allowCountryChange = true;
                });
            }

            // When country list is clicked, allow the change
            if (countryList) {
                countryList.addEventListener('click', () => {
                    allowCountryChange = true;
                    setTimeout(() => {
                        userSelectedCountry = iti.getSelectedCountryData().iso2;
                        allowCountryChange = false;
                    }, 50);
                });
            }

            // Prevent automatic country changes while typing
            input.addEventListener("countrychange", () => {
                if (!allowCountryChange) {
                    // This was an automatic change, revert it
                    iti.setCountry(userSelectedCountry);
                } else {
                    // This was a manual change, update our tracking
                    userSelectedCountry = iti.getSelectedCountryData().iso2;
                    allowCountryChange = false;
                }
            });

            // ADD THIS - Make country selector non-tabbable
            if (countrySelector) {
                countrySelector.setAttribute('tabindex', '-1');
            }

            // Ensure phone input is tabbable
            input.setAttribute('tabindex', '0');

            input.addEventListener("keydown", (e) => {
                // Allow control keys (backspace, arrows, delete, tab, etc.)
                if (
                    ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
                        e.key
                    )
                ) {
                    return;
                }

                // Allow numbers and hyphens
                if (!/^[0-9-]$/.test(e.key)) {
                    e.preventDefault();
                }
            });

            // Clean pasted input - allow numbers and hyphens
            input.addEventListener("paste", (e) => {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData("text");
                const cleaned = text.replace(/[^0-9-]/g, ""); // Keep only digits and hyphens
                document.execCommand("insertText", false, cleaned);
            });
            // Prevent drag-drop of text
            input.addEventListener("drop", (e) => {
                e.preventDefault();
            });

            // 🔍 Validate on blur or country change
            const validate = () => {
                const errorMsg = document.querySelector(".phone_field .error-spz");
                const wrapper = document.querySelector(".phone_field.input_wrapper");

                if (!errorMsg) return;

                // Get the full international number (including country code)
                const fullNumber = iti.getNumber();

                // Extract only digits from the full number (including country code)
                const digitsOnly = fullNumber.replace(/[^0-9]/g, "");

                // If empty, show required error (required field in V1)
                if (digitsOnly.length === 0 || input.value.trim() === '') {
                    errorMsg.innerHTML = `${errorIcon} <span>Phone number is required.</span>`;
                    input.classList.add("invalid");
                    input.classList.remove("valid");
                    if (wrapper) wrapper.classList.add('error');
                    return false;
                }

                // Validate: 7-15 digits total (INCLUDING country code)
                if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
                    errorMsg.innerHTML = "";
                    input.classList.remove("invalid");
                    input.classList.add("valid");
                    if (wrapper) wrapper.classList.remove('error');
                    return true;
                } else {
                    errorMsg.innerHTML = `${errorIcon} <span>Please enter a valid phone number.</span>`;
                    input.classList.add("invalid");
                    input.classList.remove("valid");
                    if (wrapper) wrapper.classList.add('error');
                    return false;
                }
            };

            input.addEventListener("blur", validate);
            input.addEventListener("change", validate);
            input.addEventListener("keyup", validate);
            input.addEventListener("countrychange", validate);
        }

        const firstNameInput = document.querySelector('#first_name');
        if (firstNameInput) {
            const validateFirstName = () => {
                const value = firstNameInput.value.trim();
                const errorMsg = document.querySelector('.first_name_field .error-spz');
                const wrapper = document.querySelector('.first_name_field.input_wrapper');

                if (!errorMsg) return;

                // If empty, show required error (required field in V1)
                if (value.length === 0) {
                    errorMsg.innerHTML = `${errorIcon} <span>First name is required.</span>`;
                    firstNameInput.classList.add("invalid");
                    firstNameInput.classList.remove("valid");
                    if (wrapper) wrapper.classList.add('error');
                    return false;
                }

                // Pattern: letters, hyphens, apostrophes, spaces, accented characters (1-50 chars)
                const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

                if (namePattern.test(value) && value.length <= 50) {
                    errorMsg.innerHTML = "";
                    firstNameInput.classList.remove("invalid");
                    firstNameInput.classList.add("valid");
                    if (wrapper) wrapper.classList.remove('error');
                    return true;
                } else {
                    errorMsg.innerHTML = `${errorIcon} <span>Please enter a valid first name.</span>`;
                    firstNameInput.classList.add("invalid");
                    firstNameInput.classList.remove("valid");
                    if (wrapper) wrapper.classList.add('error');
                    return false;
                }
            };

            firstNameInput.addEventListener("blur", validateFirstName);
            firstNameInput.addEventListener("keyup", validateFirstName);
        }

        (async function run() {
            try {
                await loadCss(CSS_URL);
                await loadScript(JS_URL);
                await loadScript(UTILS_URL);
                init();

                // Wait for intl-tel-input to fully initialize
                setTimeout(() => {
                    const phoneInput = document.querySelector('#phone');
                    const firstNameInput = document.querySelector('#first_name');

                    // === PHONE FIELD RESTORATION ===
                    if (phoneInput) {
                        // Try localStorage first (more reliable in Safari)
                        const savedPhone = localStorage.getItem('spz_phone_value_v1') || sessionStorage.getItem('spz_phone_value');

                        if (savedPhone) {
                            phoneInput.value = savedPhone;
                            const wrapper = phoneInput.closest('.input_wrapper');
                            if (wrapper) wrapper.classList.add('has-value');

                            // Trigger validation after a delay
                            setTimeout(() => {
                                phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
                                phoneInput.dispatchEvent(new Event('keyup', { bubbles: true }));
                                phoneInput.dispatchEvent(new Event('blur', { bubbles: true }));
                            }, 100);
                        }

                        // Save on EVERY interaction
                        const savePhone = () => {
                            if (phoneInput.value) {
                                localStorage.setItem('spz_phone_value_v1', phoneInput.value);
                                sessionStorage.setItem('spz_phone_value', phoneInput.value);
                            }
                        };

                        phoneInput.addEventListener('input', savePhone);
                        phoneInput.addEventListener('change', savePhone);
                        phoneInput.addEventListener('keyup', savePhone);
                        phoneInput.addEventListener('blur', savePhone);
                    }

                    // === FIRST NAME FIELD RESTORATION ===
                    if (firstNameInput) {
                        // Try localStorage first
                        const savedFirstName = localStorage.getItem('spz_firstname_value_v1') || sessionStorage.getItem('spz_firstname_value');

                        if (savedFirstName) {
                            firstNameInput.value = savedFirstName;
                            const wrapper = firstNameInput.closest('.input_wrapper');
                            if (wrapper) wrapper.classList.add('has-value');

                            setTimeout(() => {
                                firstNameInput.dispatchEvent(new Event('input', { bubbles: true }));
                                firstNameInput.dispatchEvent(new Event('keyup', { bubbles: true }));
                                firstNameInput.dispatchEvent(new Event('blur', { bubbles: true }));
                            }, 100);
                        }

                        // Save on EVERY interaction
                        const saveFirstName = () => {
                            if (firstNameInput.value) {
                                localStorage.setItem('spz_firstname_value_v1', firstNameInput.value);
                                sessionStorage.setItem('spz_firstname_value', firstNameInput.value);
                            }
                        };

                        firstNameInput.addEventListener('input', saveFirstName);
                        firstNameInput.addEventListener('change', saveFirstName);
                        firstNameInput.addEventListener('keyup', saveFirstName);
                        firstNameInput.addEventListener('blur', saveFirstName);
                    }

                    // Clean up localStorage after successful restoration
                    setTimeout(() => {
                        if (phoneInput && phoneInput.value) {
                            localStorage.removeItem('spz_phone_value_v1');
                        }
                        if (firstNameInput && firstNameInput.value) {
                            localStorage.removeItem('spz_firstname_value_v1');
                        }
                    }, 2000);

                }, 300); // Increased timeout for Safari

            } catch (e) {
                console.error("Loader failed:", e);
            }
        })();

        setTimeout(() => {
            const fakeInputs = document.querySelectorAll('input[name="fake_username"]');
            fakeInputs.forEach(fakeInput => {
                fakeInput.setAttribute('tabindex', '-1');
            });

            document.querySelectorAll('.custom_field_wrapper .input_wrapper').forEach(wrapper => {
                wrapper.removeAttribute('tabindex');
                wrapper.style.outline = 'none';
            });
        }, 100);

        function updateCro2Field() {

            const firstName = document.querySelector('#first_name')?.value || '';
            const phoneField = document.querySelector('#phone')?.value || '';
            const inputSelector = 'input[name="CRO2"]';
            const maxRetryTime = 15000; // total time to keep trying (15s)
            const retryInterval = 200; // retry every 200ms
            const startTime = Date.now();

            const combinedValue = [firstName, phoneField].filter(Boolean).join(', ');


            const setValue = () => {
                const inputEl = document.querySelector(inputSelector);
                if (inputEl && combinedValue) {
                    inputEl.value = combinedValue;
                    inputEl.setAttribute('value', combinedValue);
                    return true;
                }
                return false;
            };

            const intervalId = setInterval(() => {
                if (setValue() || Date.now() - startTime > maxRetryTime) {
                    clearInterval(intervalId);
                }
            }, retryInterval);

            // Observe DOM mutations to handle React/Gatsby re-renders
            const observer = new MutationObserver(() => setValue());
            observer.observe(document.body, { childList: true, subtree: true });

            // Stop observing after maxRetryTime
            setTimeout(() => observer.disconnect(), maxRetryTime);
        }
        let isShiftTab = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                isShiftTab = e.shiftKey;
            }
        });

        document.querySelectorAll('.custom_field_wrapper input').forEach(input => {
            input.addEventListener('focus', () => {
                const wrapper = input.closest('.input_wrapper');
                wrapper.classList.add('focus');

                // Only redirect on forward tab (not Shift+Tab)
                if (wrapper.classList.contains('phone_field') && input.id !== 'phone' && !isShiftTab) {
                    const phoneInput = document.querySelector('#phone');
                    if (phoneInput) {
                        phoneInput.focus();
                        return;
                    }
                }
            });
            input.addEventListener('input', () => {
                if (input.value !== '') {
                    if (input.id != 'phone') {
                        input.closest('.input_wrapper').classList.add('has-value');
                        // Don't automatically remove error - let validation handle it
                    }
                    updateCro2Field();
                }
            });
            input.addEventListener('change', () => {
                if (input.value !== '') {
                    if (input.id != 'phone') {
                        input.closest('.input_wrapper').classList.add('has-value');
                        // Don't automatically remove error - let validation handle it
                    }
                    updateCro2Field();
                }
            });
            input.addEventListener('keyup', () => {
                if (input.value !== '') {
                    if (input.id != 'phone') {
                        input.closest('.input_wrapper').classList.add('has-value');
                        // Don't automatically remove error - let validation handle it
                    }
                    updateCro2Field();
                }
            });
            input.addEventListener('blur', () => {
                input.closest('.input_wrapper').classList.remove('focus');

                // Special handling for phone field
                if (input.id === 'phone') {
                    if (input.value !== '') {
                        input.closest('.input_wrapper').classList.add('has-value');
                        // Only remove error class if phone is actually valid
                        if (input.classList.contains('valid')) {
                            input.closest('.input_wrapper').classList.remove('error');
                        }
                    } else {
                        input.closest('.input_wrapper').classList.remove('has-value');
                        input.closest('.input_wrapper').classList.add('error');
                    }
                } else if (input.id === 'first_name') {
                    // For first name - let validation handle error state
                    if (input.value !== '') {
                        input.closest('.input_wrapper').classList.add('has-value');
                        // Only remove error if actually valid
                        if (input.classList.contains('valid')) {
                            input.closest('.input_wrapper').classList.remove('error');
                        }
                    } else {
                        input.closest('.input_wrapper').classList.remove('has-value');
                        input.closest('.input_wrapper').classList.add('error');
                    }
                }
            });
        });

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

        // Insert error banner first, THEN dummy CTA
        document.querySelector('.spz_5002_v1 [type="submit"]').insertAdjacentHTML('afterend', `
		    <div class="form__error-message spz-global-error" style="margin-top: 20px; display: none;">
		        <div class="form__error-message--alert-circle">
		            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
		                <g clip-path="url(#clip0_1702_995)">
		                    <path opacity="0.12" d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z" fill="#FFFFFF"></path>
		                    <path d="M11 7V11M11 15H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
		                </g>
		                <defs>
		                    <clipPath id="clip0_1702_995">
		                        <rect width="22" height="22" fill="white"></rect>
		                    </clipPath>
		                </defs>
		            </svg>
		        </div>
		        <div class="form__error-message--messaging">
		            <h4 style="margin-bottom: 0px;">Something went wrong.</h4>
		            <p>Please check your entries and try again</p>
		        </div>
		    </div>
		    <div class="spz_dummy_cta" tabindex="0">Create my account</div>
		`);

        document.querySelector('.spz_dummy_cta').addEventListener('click', () => {
            let canSubmit = true;
            const globalError = document.querySelector('.spz-global-error');
            const emailInput = document.querySelector('#email');
            const passwordInput = document.querySelector('#new-password');
            const emailFieldWrapper = document.querySelector('.field[data-attr-form-field-id="email"]');
            const passwordFieldWrapper = passwordInput.closest('.field.material-ui-field');

            // === VALIDATE EMAIL ===
            if (emailInput && emailFieldWrapper) {
                const emailValue = emailInput.value.trim();
                const muiInputBase = emailFieldWrapper.querySelector('.MuiInputBase-root'); // ADD THIS

                // Remove any existing custom error
                let emailErrorContainer = emailFieldWrapper.querySelector('.error-spz');

                if (!emailValue) {
                    // Email is empty
                    emailFieldWrapper.classList.remove('valid');
                    emailFieldWrapper.classList.add('error');
                    if (muiInputBase) muiInputBase.classList.add('Mui-error'); // ADD THIS
                    if (!emailErrorContainer) {
                        emailErrorContainer = document.createElement('div');
                        emailErrorContainer.className = 'error-spz';
                        emailFieldWrapper.querySelector('.field__wrapper').appendChild(emailErrorContainer);
                    }
                    emailErrorContainer.innerHTML = `${errorIcon} <span>Email is required.</span>`;
                    canSubmit = false;
                } else if (!isValidEmail(emailValue)) {
                    // Email is invalid
                    emailFieldWrapper.classList.remove('valid');
                    emailFieldWrapper.classList.add('error');
                    if (muiInputBase) muiInputBase.classList.add('Mui-error'); // ADD THIS
                    if (!emailErrorContainer) {
                        emailErrorContainer = document.createElement('div');
                        emailErrorContainer.className = 'error-spz';
                        emailFieldWrapper.querySelector('.field__wrapper').appendChild(emailErrorContainer);
                    }
                    emailErrorContainer.innerHTML = `${errorIcon} <span>Please enter a valid email address.</span>`;
                    canSubmit = false;
                } else {
                    // Email is valid - remove error
                    emailFieldWrapper.classList.remove('error');
                    emailFieldWrapper.classList.add('valid');
                    if (muiInputBase) muiInputBase.classList.remove('Mui-error'); // ADD THIS
                    if (emailErrorContainer) {
                        emailErrorContainer.remove();
                    }
                }
            }

            // === VALIDATE PASSWORD ===
            if (passwordInput && passwordFieldWrapper) {
                const passwordValue = passwordInput.value.trim();
                const muiInputBase = passwordFieldWrapper.querySelector('.MuiInputBase-root'); // ADD THIS

                // Remove any existing custom error
                let passwordErrorContainer = passwordFieldWrapper.querySelector('.error-spz');

                if (!passwordValue) {
                    // Password is empty
                    passwordFieldWrapper.classList.remove('valid');
                    passwordFieldWrapper.classList.add('error');
                    if (muiInputBase) muiInputBase.classList.add('Mui-error'); // ADD THIS
                    if (!passwordErrorContainer) {
                        passwordErrorContainer = document.createElement('div');
                        passwordErrorContainer.className = 'error-spz';
                        passwordFieldWrapper.querySelector('.field__password-wrapper').appendChild(passwordErrorContainer);
                    }
                    passwordErrorContainer.innerHTML = `${errorIcon} <span>Password is required.</span>`;
                    canSubmit = false;
                } else if (passwordValue.length < 8) {
                    // Password is too short
                    passwordFieldWrapper.classList.remove('valid');
                    passwordFieldWrapper.classList.add('error');
                    if (muiInputBase) muiInputBase.classList.add('Mui-error'); // ADD THIS
                    if (!passwordErrorContainer) {
                        passwordErrorContainer = document.createElement('div');
                        passwordErrorContainer.className = 'error-spz';
                        passwordFieldWrapper.querySelector('.field__password-wrapper').appendChild(passwordErrorContainer);
                    }
                    passwordErrorContainer.innerHTML = `${errorIcon} <span>Password must be at least 8 characters.</span>`;
                    canSubmit = false;
                } else {
                    // Password is valid - remove error
                    passwordFieldWrapper.classList.remove('error');
                    passwordFieldWrapper.classList.add('valid');
                    if (muiInputBase) muiInputBase.classList.remove('Mui-error'); // ADD THIS
                    if (passwordErrorContainer) {
                        passwordErrorContainer.remove();
                    }
                }
            }

            // === VALIDATE CUSTOM FIELDS (if visible) ===
            if (!document.querySelector('.custom_field_wrapper').classList.contains('spz-hidden')) {
                const firstNameInput = document.querySelector('#first_name');
                const phoneInput = document.querySelector('#phone');

                // Validate First Name - REQUIRED
                if (!firstNameInput || firstNameInput.value.trim().length === 0) {
                    document.querySelector('.first_name_field .error-spz').innerHTML = `${errorIcon} <span>First name is required.</span>`;
                    document.querySelector('.first_name_field.input_wrapper').classList.add('error');
                    firstNameInput.classList.add('invalid');
                    firstNameInput.classList.remove('valid');
                    canSubmit = false;
                } else {
                    const value = firstNameInput.value.trim();
                    const namePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

                    if (!namePattern.test(value) || value.length > 50) {
                        document.querySelector('.first_name_field .error-spz').innerHTML = `${errorIcon} <span>Please enter a valid first name.</span>`;
                        document.querySelector('.first_name_field.input_wrapper').classList.add('error');
                        firstNameInput.classList.add('invalid');
                        firstNameInput.classList.remove('valid');
                        canSubmit = false;
                    } else {
                        document.querySelector('.first_name_field .error-spz').innerHTML = "";
                        document.querySelector('.first_name_field.input_wrapper').classList.remove('error');
                        firstNameInput.classList.remove('invalid');
                        firstNameInput.classList.add('valid');
                    }
                }

                // Validate Phone - REQUIRED
                if (!phoneInput || phoneInput.value.trim().length === 0) {
                    document.querySelector('.phone_field .error-spz').innerHTML = `${errorIcon} <span>Phone number is required.</span>`;
                    document.querySelector('.phone_field.input_wrapper').classList.add('error');
                    phoneInput.classList.add('invalid');
                    phoneInput.classList.remove('valid');
                    canSubmit = false;
                } else {
                    const iti = window.intlTelInputGlobals.getInstance(phoneInput);
                    const fullNumber = iti.getNumber();
                    const digitsOnly = fullNumber.replace(/[^0-9]/g, "");

                    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                        document.querySelector('.phone_field .error-spz').innerHTML = `${errorIcon} <span>Please enter a valid phone number.</span>`;
                        document.querySelector('.phone_field.input_wrapper').classList.add('error');
                        phoneInput.classList.add('invalid');
                        phoneInput.classList.remove('valid');
                        canSubmit = false;
                    } else {
                        document.querySelector('.phone_field .error-spz').innerHTML = "";
                        document.querySelector('.phone_field.input_wrapper').classList.remove('error');
                        phoneInput.classList.remove('invalid');
                        phoneInput.classList.add('valid');
                    }
                }
            }

            if (canSubmit) {
                // Hide global error if showing
                if (globalError) {
                    globalError.style.display = 'none';
                    globalError.classList.remove('form__error-message--visible');
                }
                document.querySelector('.spz_5002_v1 [type="submit"]').click();
            } else {
                // Only show OUR error banner if there's NO native CC error already showing
                const nativeError = document.querySelector('.form__error-message:not(.spz-global-error)');

                if (globalError && (!nativeError || nativeError.style.display === 'none')) {
                    globalError.style.display = 'flex';
                    globalError.classList.add('form__error-message--visible');

                    // Scroll to the error banner
                    globalError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    // Hide our error if native error is showing
                    if (globalError) {
                        globalError.style.display = 'none';
                        globalError.classList.remove('form__error-message--visible');
                    }
                }
            }

            setTimeout(() => {
                document.querySelector('.spz_dummy_cta').blur();
            }, 100);
        });

        // === ADD THIS SECTION RIGHT HERE (after the dummy CTA click handler) ===

        // Clear errors when email/password fields are autofilled or typed into
        const emailInput = document.querySelector('#email');
        const passwordInput = document.querySelector('#new-password');
        const emailFieldWrapper = document.querySelector('.field[data-attr-form-field-id="email"]');
        const passwordFieldWrapper = passwordInput ? passwordInput.closest('.field.material-ui-field') : null;

        // Email field - clear error on input
        if (emailInput && emailFieldWrapper) {
            emailInput.addEventListener('input', function () {
                const emailValue = this.value.trim();

                // If email is now valid, clear the error
                if (emailValue && isValidEmail(emailValue)) {
                    emailFieldWrapper.classList.remove('error');
                    emailFieldWrapper.classList.add('valid');

                    const emailErrorContainer = emailFieldWrapper.querySelector('.error-spz');
                    if (emailErrorContainer) {
                        emailErrorContainer.remove();
                    }
                }
            });
        }

        // Password field - clear error on input
        if (passwordInput && passwordFieldWrapper) {
            passwordInput.addEventListener('input', function () {
                const passwordValue = this.value.trim();

                // If password is now valid, clear the error
                if (passwordValue && passwordValue.length >= 8) {
                    passwordFieldWrapper.classList.remove('error');
                    passwordFieldWrapper.classList.add('valid');

                    const passwordErrorContainer = passwordFieldWrapper.querySelector('.error-spz');
                    if (passwordErrorContainer) {
                        passwordErrorContainer.remove();
                    }
                }
            });
        }

        // === END OF NEW SECTION ===

        document.querySelector('.spz_dummy_cta').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.querySelector('.spz_dummy_cta').click();
            }
        });

        document.querySelector('.spz_dummy_cta').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                document.querySelector('.spz_dummy_cta').click();
            }
        });

        const form = document.querySelector('#buy-form-em-pwd-v2-pricing');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Stop the default form submission
                document.querySelector('.spz_dummy_cta').click(); // Trigger dummy CTA instead
            });
        }

        // check first two fields has data
        const emailField = document.querySelector('#email');
        const passwordField = document.querySelector('#new-password');

        function isValidEmail(email) {
            // Basic email check: has @ and at least 2 characters after last period
            const parts = email.split('@');
            if (parts.length !== 2) return false;

            const domain = parts[1];
            const dotIndex = domain.lastIndexOf('.');
            if (dotIndex === -1 || dotIndex >= domain.length - 2) return false;

            return true;
        }

        function checkFields() {
            if (
                passwordField.value.trim() !== "" &&
                isValidEmail(emailField.value.trim()) &&
                document.querySelector('.custom_field_wrapper.spz-hidden')
            ) {
                document.querySelector('.custom_field_wrapper.spz-hidden').classList.remove('spz-hidden');
            }
        }

        // Add event listeners for both input and change (for autofill support)
        [emailField, passwordField].forEach(field => {
            field.addEventListener("input", checkFields);
            field.addEventListener("change", checkFields);
            field.addEventListener("keyup", checkFields);
        });

        // Check fields after a short delay to catch autofill after page load
        setTimeout(checkFields, 500);
        // Form update end
    }
}
