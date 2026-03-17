(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = "both"; // true / false / 'both'
    const expName = "2005"; //experiment name should be 1001, 1002, 1003 etc.
    const variantName = expName + `_v1`; //variantName should be _variant, _true_control etc.
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

const testNumber = '2005'
const testType = 'v1'
console.log('2005 v1 ping')
waitForElement('body', () => {
    if (!document.querySelector('body').classList.contains(`spz_${testNumber}_${testType}`)) {
        document.querySelector('body').classList.add(`spz_${testNumber}_${testType}`)
    }
    console.log('2005 v1 started')
})