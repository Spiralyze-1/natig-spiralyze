/* V1. Common for code testing */
(function () {
    const squeezePage = true;
    const expName = "3022";
    const variantName = "true_control_#" + expName;
    const clientDomain = ".hellopebl.com";

    const formHiddenValue = variantName;
    if (squeezePage === true) {
        window.squeezePageValue = formHiddenValue;
    } else if (squeezePage === false) {
        hiddenValue(expName, variantName);
    } else if (squeezePage === "both") {
        hiddenValue(expName, variantName);
        window.squeezePageValue = formHiddenValue;
    }
    function hiddenValue(currentExperimentName, currentExperimentValue) {
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie =
                name +
                "=" +
                (value || "") +
                expires +
                ";domain=" +
                clientDomain +
                ";path=/";
        }

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        var ExistingExperimentName = getCookie("ExperimentName");
        var ExistingExperimentValue = getCookie("ExperimentValue");
        var ExistingExperimentNameList = ExistingExperimentName
            ? ExistingExperimentName.split(",")
            : [];

        if (!ExistingExperimentName) {
            setCookie("ExperimentName", currentExperimentName, 1);
            setCookie("ExperimentValue", currentExperimentValue, 1);
        } else if (
            ExistingExperimentNameList.length > 0 &&
            ExistingExperimentNameList.indexOf(currentExperimentName) == -1
        ) {
            setCookie(
                "ExperimentName",
                ExistingExperimentName + "," + currentExperimentName,
                1
            );
            setCookie(
                "ExperimentValue",
                ExistingExperimentValue + "," + currentExperimentValue,
                1
            );
        } else if (
            ExistingExperimentNameList.length > 0 &&
            ExistingExperimentNameList.indexOf(currentExperimentName) > -1
        ) {
            var existingNames = ExistingExperimentName.split(",");
            var existingValues = ExistingExperimentValue.split(",");
            var index = existingNames.indexOf(currentExperimentName);
            existingValues[index] = currentExperimentValue;
            setCookie("ExperimentName", existingNames.join(","), 1);
            setCookie("ExperimentValue", existingValues.join(","), 1);
        }
    }
})();

function waitForElement(cssSelector, callback) {
    var stop,
        elementCached,
        timeout,
        check = function () {
            try {
                elementCached = document.querySelector(cssSelector);

                if (stop) return;

                if (elementCached) {
                    callback(elementCached);
                    clearTimeout(timeout);
                } else {
                    window.requestAnimationFrame(check);
                }
            } catch (err) {
                console.log(err);
            }
        };

    window.requestAnimationFrame(check);

    timeout = setTimeout(function () {
        stop = true;
    }, 5000);
}

/* For calling function */
waitForElement("body", (docBody) => {
    console.log("3022 started");
    let testID = "3022";
    docBody.classList.add(`spz_${testID}_tc`);
    waitForElement("#block-pebl-content .banner-layout", () => {
        window.addEventListener("scroll", function () {
            const header = document.querySelector("header.navigation-container");
            if (!header) return;
            if (window.scrollY > 42.64) {
                header.classList.add("sticky-shadow");
            } else {
                header.classList.remove("sticky-shadow");
            }
        });

        const url = window.location.href;

        if (url.includes("/contact-brand-ps/")) {
            document.body.classList.add("contact-brand-ps-page");
        } else if (url.includes("/hr-contact-ps/")) {
            document.body.classList.add("hr-contact-ps-page");
        } else if (url.includes("/contact-brand-calculator-ps/")) {
            document.body.classList.add("contact-brand-calculator-ps-page");
        }

        const interval = setInterval(() => {
            const checkbox = document.querySelector(
                ".component--marketo-form .mktoFieldWrap.marketo-checkbox"
            );

            if (checkbox) {
                document
                    .querySelectorAll(".spz_3022_tc .mktoFieldWrap textarea")
                    .forEach((textarea) => {
                        const defaultHeight = 56;

                        textarea.addEventListener("input", () => {
                            if (!textarea.value) {
                                textarea.style.height = `${defaultHeight}px`;
                            } else {
                                textarea.style.height = "auto";
                                textarea.style.height = `${textarea.scrollHeight}px`;
                            }
                        });
                    });

                clearInterval(interval);

                const form = document.querySelector(
                    ".marketo-form.marketo-step.marketo-step-1 form"
                );
                if (form && !document.querySelector(".form-heading")) {
                    form.insertAdjacentHTML(
                        "beforebegin",
                        '<h2 class="form-heading">Contact us</h2>'
                    );
                }

                const nameFields = document.querySelector(
                    ".marketo-form.marketo-step.marketo-step-1 .mktoFieldFirstName.mktoFieldLastName"
                );
                if (nameFields && !document.querySelector(".email-phone")) {
                    nameFields.insertAdjacentHTML(
                        "afterend",
                        '<div class="mktoFormRow email-phone"></div>'
                    );
                }

                const label = document.querySelector(
                    ".component--marketo-form .mktoFieldWrap.marketo-checkbox .mktoCheckboxList label"
                );
                if (label) label.textContent = "Looking for a job";

                // Phone field required - pure vanilla JS, no MktoForms2 dependency
                var phoneInput = document.querySelector('.mktoFieldPhone input[name="Phone"]');
                console.log('3022: phoneInput found?', phoneInput);

                if (phoneInput) {
                    var phoneFieldWrap = phoneInput.closest('.mktoFieldWrap');
                    var phoneLabel = document.querySelector('#LblPhone');

                    // Add required attributes
                    phoneFieldWrap.classList.add('mktoRequiredField');
                    if (phoneLabel) phoneLabel.classList.add('form-required');
                    phoneInput.classList.add('mktoRequired');
                    phoneInput.setAttribute('required', 'required');
                    phoneInput.setAttribute('aria-required', 'true');

                    // Error message element
                    var phoneError = document.createElement('div');
                    phoneError.className = 'spz-phone-error';
                    phoneError.textContent = 'This field is required.';
                    phoneError.style.cssText = 'color: hsla(0,0%,9%,0.7); font-family: Sharp Earth, serif; font-size: 12px; font-weight: 400; line-height: 150%; padding: 4px 0 0 0; display: none;';
                    phoneFieldWrap.appendChild(phoneError);
                    console.log('3022: phone error element appended');
                    var phoneBlurredEmpty = false;

                    phoneInput.addEventListener('blur', function () {
                        if (phoneInput.value.trim() === '') {
                            phoneBlurredEmpty = true;
                            phoneInput.classList.add('mktoInvalid');
                            phoneInput.classList.remove('mktoValid');
                        } else {
                            phoneBlurredEmpty = false;
                            phoneInput.classList.remove('mktoInvalid');
                            phoneInput.classList.add('mktoValid');
                        }
                    });

                    phoneInput.addEventListener('focus', function () {
                        if (phoneBlurredEmpty) {
                            phoneError.style.display = 'block';
                        }
                    });

                    phoneInput.addEventListener('blur', function () {
                        phoneError.style.display = 'none';
                    });

                    phoneInput.addEventListener('input', function () {
                        if (phoneInput.value.trim() !== '') {
                            phoneError.style.display = 'none';
                            phoneBlurredEmpty = false;
                            phoneInput.classList.remove('mktoInvalid');
                            phoneInput.classList.add('mktoValid');
                        }
                    });

                    // Block form submit if phone empty
                    var formEl = phoneInput.closest('form');
                    if (formEl) {
                        formEl.addEventListener('submit', function (e) {
                            if (phoneInput.value.trim() === '') {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                phoneError.style.display = 'block';
                                phoneInput.classList.add('mktoInvalid');
                                phoneInput.classList.remove('mktoValid');
                            }
                        }, true);
                    }
                }
            }
        }, 500);
    });
});