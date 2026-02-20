(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = "both"; // true / false / 'both'
    const expName = "2003"; //experiment name should be 1001, 1002, 1003 etc.
    const variantName = expName + `_v2`; //variantName should be _variant, _true_control etc.
    const clientDomain = ".afcurgentcare.com"; //domain should be .spiralyze.com

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
            document.cookie = name + "=" + (value || "") + expires + ";domain=" + clientDomain + ";path=/";
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
        var ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(",") : [];

        if (!ExistingExperimentName) {
            setCookie("ExperimentName", currentExperimentName, 1);
            setCookie("ExperimentValue", currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) == -1) {
            setCookie("ExperimentName", ExistingExperimentName + "," + currentExperimentName, 1);
            setCookie("ExperimentValue", ExistingExperimentValue + "," + currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) > -1) {
            var existingNames = ExistingExperimentName.split(",");
            var existingValues = ExistingExperimentValue.split(",");
            var index = existingNames.indexOf(currentExperimentName);
            existingValues[index] = currentExperimentValue;
            setCookie("ExperimentName", existingNames.join(","), 1);
            setCookie("ExperimentValue", existingValues.join(","), 1);
        }
    }
})();

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

const testNumber = '2003'
const testType = 'v2'
console.log('2003 v2 ping')
waitForElement('body', () => {
    if (!document.querySelector('body').classList.contains(`spz_${testNumber}_${testType}`)) {
        document.querySelector('body').classList.add(`spz_${testNumber}_${testType}`)
    }
    console.log('2003 v2 started')

    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
        document.body.classList.add('spz-ios');
    }


    const headerContent = document.querySelector('.main-header-container')
    const mainNavigationBurgerMenu = document.querySelector('.main-navigation')

    if (!document.querySelector('.spz-link-wrapper')) {
        headerContent.insertAdjacentHTML('beforeend', `
            <div class="spz-link-wrapper">
                <ul>
                    <li>
                        <a href="https://www.afcurgentcare.com/locations/?utm_source=app.asana.com&amp;utm_medium=referral&amp;landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link"> 
                            Find a location
                        </a>
                    </li>
                    <li>
                        <a href="https://www.afcurgentcare.com/patient-resources/pay-your-bill/?utm_source=app.asana.com&utm_medium=referral&landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link"> 
                            Pay Your Bill
                        </a>
                    </li>
                </ul>
            </div>
        `)
    }


    if (!document.querySelector('.spz-link-wrapper-mobile')) {
        mainNavigationBurgerMenu.insertAdjacentHTML('beforeend', `
            <div class="spz-link-wrapper spz-link-wrapper-mobile">
                <ul>
                    <li>
                        <a href="https://www.afcurgentcare.com/locations/?utm_source=app.asana.com&amp;utm_medium=referral&amp;landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link"> 
                            Find a Location
                        </a>
                    </li>
                    <li>
                        <a href="https://www.afcurgentcare.com/patient-resources/pay-your-bill/?utm_source=app.asana.com&utm_medium=referral&landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link"> 
                            Pay Your Bill
                        </a>
                    </li>
                </ul>
            </div>
        `)
    }
})