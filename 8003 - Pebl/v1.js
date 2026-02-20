(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = true; // true / false / 'both'
    const expName = "8003"; //experiment name should be 1001, 1002, 1003 etc.
    const variantName = `variant_#` + expName; //variantName should be _variant, _true_control etc.
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


function waitForElement(selector, callback, timeout = 5000) {
    const el = document.querySelector(selector);
    if (el) return callback(el);

    const observer = new MutationObserver((_, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            obs.disconnect();
            callback(el);
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), timeout);
}

const testNumber = "8003";
const testType = "v1";

console.log('8003 ping')

waitForElement('.sc-hdyiqR', (docEl) => {
    const body = document.body;
    const className = `spz_${testNumber}_${testType}`;

    if (!body.classList.contains(className)) {
        body.classList.add(className);
    }
    console.log('8003 start')

    if (!document.querySelector('.spz-wrapper')) {
        docEl.insertAdjacentHTML('beforebegin', `
            <div class="spz-wrapper">
                <h2 class="spz-heading">Get an estimate</h2>
                <p class="spz-subhead">
                    Instantly see the true cost of international hiring. Get a transparent breakdown of taxes, compliance, and local benefits.
                </p>
            </div>
        `)
    }
})