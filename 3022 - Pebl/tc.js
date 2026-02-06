/* V1. Common for code testing */
(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = true; // true / false / 'both'
    const expName = "3022"; //experiment name should be 1001, 1002, 1003 etc.
    //true_control_#3022
    const variantName = "true_control_#" + expName; //variantName should be _variant, _true_control etc.
    const clientDomain = ".hellopebl.com"; //domain should be .spiralyze.com

    /***********************************
      ************************************
      DO NOT TOUCH
      BEYOND THIS LINE
      ******************************
      ******************************/
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
    console.log("3022 started")
    // Use this and change value according to the experiment
    let testID = "3022";
    docBody.classList.add(`spz_${testID}_tc`);
    waitForElement("#block-pebl-content .banner-layout", () => {
        /* Update hero text */
        window.addEventListener("scroll", function () {
            const header = document.querySelector("header.navigation-container");
            if (!header) return;
            if (window.scrollY > 78.64) {
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
                        const defaultHeight = 56; // default height when empty

                        textarea.addEventListener("input", () => {
                            if (!textarea.value) {
                                textarea.style.height = `${defaultHeight}px`;
                            } else {
                                textarea.style.height = "auto";
                                textarea.style.height = `${textarea.scrollHeight}px`;
                            }
                        });
                    });

                // Stop checking once the element is found
                clearInterval(interval);

                // Add form heading
                const form = document.querySelector(
                    ".marketo-form.marketo-step.marketo-step-1 form"
                );
                if (form && !document.querySelector(".form-heading")) {
                    form.insertAdjacentHTML(
                        "beforebegin",
                        '<h2 class="form-heading">Contact us</h2>'
                    );
                }

                // Add email-phone div
                const nameFields = document.querySelector(
                    ".marketo-form.marketo-step.marketo-step-1 .mktoFieldFirstName.mktoFieldLastName"
                );
                if (nameFields && !document.querySelector(".email-phone")) {
                    nameFields.insertAdjacentHTML(
                        "afterend",
                        '<div class="mktoFormRow email-phone"></div>'
                    );
                }

                // Update checkbox label
                const label = document.querySelector(
                    ".component--marketo-form .mktoFieldWrap.marketo-checkbox .mktoCheckboxList label"
                );
                if (label) label.textContent = "Looking for a job";

                // Make phone field required
                if (typeof MktoForms2 !== 'undefined') {
                    MktoForms2.whenReady(function (form) {
                        const phoneFieldWrap = form.getFormElem().find('.mktoFieldPhone .mktoFieldWrap');
                        const phoneInput = form.getFormElem().find('input[name="Phone"]');
                        const phoneLabel = form.getFormElem().find('label[id="LblPhone"]');

                        // Add required attributes to input
                        phoneInput.attr('required', 'required').attr('aria-required', 'true');

                        // Add mktoRequiredField class to wrapper
                        phoneFieldWrap.addClass('mktoRequiredField');

                        // Add form-required class to label
                        phoneLabel.addClass('form-required');


                        // Add custom validation
                        form.onValidate(function () {
                            const vals = form.vals();
                            const phoneElem = phoneInput.get(0);

                            if (!vals.Phone || vals.Phone.trim() === '') {
                                form.submittable(false);
                                form.showErrorMessage("This field is required.", MktoForms2.$(phoneElem));
                            } else {
                                // Clear any existing error
                                form.showErrorMessage("", MktoForms2.$(phoneElem));
                            }
                        });
                    });
                }
            }
        }, 500);
    });
});
