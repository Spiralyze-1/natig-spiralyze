// #5007 | Relay | Product | Before and After - V2
// https://app.asana.com/1/77217210692853/project/1210751323511158/task/1213201826590455

(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    var pageName = 'product';

    const squeezePage = 'both'; // Do not change this value for RelayFi
    const expName = '5007'; //experiment name should be 1001, 1002, 1003 etc. 3004-home-test-variant1
    const variantName = expName + '-' + pageName + '-test-variant2'; //variantName should be -test-variant, -test-control etc.
    const clientDomain = '.relayfi.com'; //domain should be .spiralyze.com


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
    } else if (squeezePage === 'both') {
        hiddenValue(expName, variantName);
        window.squeezePageValue = formHiddenValue;
    }
    function hiddenValue(currentExperimentName, currentExperimentValue) {
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + ";domain=" + clientDomain + ";path=/";
        }

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        var ExistingExperimentName = getCookie('ExperimentName');
        var ExistingExperimentValue = getCookie('ExperimentValue');
        var ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(',') : [];

        if (!ExistingExperimentName) {
            setCookie('ExperimentName', currentExperimentName, 1);
            setCookie('ExperimentValue', currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) == -1) {
            setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1);
            setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1);
        } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) > -1) {
            var existingNames = ExistingExperimentName.split(',');
            var existingValues = ExistingExperimentValue.split(',');
            var index = existingNames.indexOf(currentExperimentName);
            existingValues[index] = currentExperimentValue;
            setCookie('ExperimentName', existingNames.join(','), 1);
            setCookie('ExperimentValue', existingValues.join(','), 1);
        }
        let maxCookieSetIntervalCount = 0;
        let cookieSetInterval = setInterval(function () {
            ExistingExperimentValue = getCookie('ExperimentValue');
            let ExistingSidValue = getCookie('sid4');
            let ExistingExperimentValueList = ExistingExperimentValue ? ExistingExperimentValue.split(',') : [];
            let ExistingSidValueList = ExistingSidValue ? decodeURIComponent(ExistingSidValue).split(',') : [];
            // Items in Sid that are not in Experiment
            let newItems = ExistingSidValueList.filter(
                sidItem => !ExistingExperimentValueList.includes(sidItem)
            );

            // Final ordered merged list
            let mergedList = [...newItems, ...ExistingExperimentValueList];
            setCookie('sid4', mergedList.join(','), 1);
            maxCookieSetIntervalCount++;
            if (maxCookieSetIntervalCount > 10) clearInterval(cookieSetInterval);
        }, 1000);
    }
}());

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

const testNumber = "5007";
const testType = "v2";

waitForElement('.make-money', (docEl) => {
    const body = document.body
    const className = `spz_${testNumber}_${testType}`
    if (!body.classList.contains(className)) body.classList.add(className)

    docEl.insertAdjacentHTML('afterend', `
        <section class="spz-before-after">
            <h2 class="spz-before-after-headline">Manage your finances with full visibility and control</h2>
            <div class="spz-before-after-content">
                <div class="spz-before-after-first">
                    <h3>before relay</h3>
                    <p>Money is scattered across accounts, causing overspending and no visibility into how much you have. Card spend is untracked. Payments, invoices, and approvals live in messages and email threads.</p>
                    <div>
                        <picture>
                            <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773314953/relay/5007/before-img_6.webp">
                            <source media="(min-width: 1024px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773315082/relay/5007/before-img_7.webp">
                            <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773237911/relay/5007/before-img_3.webp">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773237913/relay/5007/before-img_4.webp" alt="Before image" />
                        </picture>
                    </div>
                </div>
                <div class="spz-before-after-second">
                    <h3>after relay</h3>
                    <p>Get dedicated checking accounts for things like payroll, bills, taxes, and more. Never overspend and always know what’s available. Set card limits. Track transactions, receipts, invoices, approvals, and more.</p>
                    <div>
                        <a href="https://app.relayfi.com/v3/register/user">Get Started</a>
                    </div>
                    <div>
                        <picture>
                            <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_6.webp">
                            <source media="(min-width: 1024px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_5.webp">
                            <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_7.webp">
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/5007/container_8.webp" alt="After image" />
                        </picture>
                    </div>
                </div>
                <div class="spz-before-after-image">
                    <picture>
                        <source media="(min-width: 2560px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236554/relay/5007/frame_2095584725.webp">
                        <source media="(min-width: 1440px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773315080/relay/5007/frame_2095584728.webp">
                        <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236554/relay/5007/frame_2095584726.webp">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/v1773236553/relay/5007/frame_2095584727.webp" alt="Relay circle logo" />
                    </picture>
                </div>
            </div>
        </section>    
    `)
})