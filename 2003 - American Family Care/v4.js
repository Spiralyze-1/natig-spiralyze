(function () {
    const squeezePage = "both";
    const expName = "2003";
    const variantName = expName + `_v4`;
    const clientDomain = ".afcurgentcare.com";

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

const testNumber = '2003';
const testType = 'v4';
console.log('2003 v4 ping');

waitForElement('body', () => {
    if (!document.querySelector('body').classList.contains(`spz_${testNumber}_${testType}`)) {
        document.querySelector('body').classList.add(`spz_${testNumber}_${testType}`);
    }
    console.log('2003 v4 started');

    const isIOS = /iP(hone|od|ad)/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isIOS) {
        document.body.classList.add('spz-ios');
    }

    // ── Header links (from 2003-V2) ────────────────────────────────────────────
    const headerContent = document.querySelector('.main-header-container');
    const mainNavigationBurgerMenu = document.querySelector('.main-navigation');

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
        `);
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
        `);
    }

    // ── Homepage hero (from 2001-V3) ───────────────────────────────────────────
    waitForElement('form.location-search', () => {
        document
            .querySelector('#main-heading')
            .parentElement.closest('section')
            .classList.add('bannerSection');
        document
            .querySelector('.bannerSection > div.elementor-container > div:first-child')
            .classList.add('bannerLeft');
        document
            .querySelector('.bannerSection > div.elementor-container > div:first-child + div')
            .classList.add('bannerRight');

        document.querySelector('.bannerSection .bannerLeft').innerHTML = `
            <div class="review">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1765204776/americanfamilycare/2001/stars.svg" alt="stars">
                <p><span>10,000+</span> 5-Star Reviews</p>
            </div>
            <h3>American Family Care</h3>
            <h1>Urgent Care & Walk-In Clinic</h1>
            <ul class="spzBannerTags">
                <li class="spzBannerTag">Cough, Cold & Flu</li>
                <li class="spzBannerTag">Allergies</li>
                <li class="spzBannerTag">On-site Labs</li>
                <li class="spzBannerTag">UTI & STDs Testing</li>
                <li class="spzBannerTag">Physicals</li>
                <li class="spzBannerTag">& More</li>
            </ul>
        `;

        document.querySelector('.bannerRight').insertAdjacentHTML('afterbegin', `
            <div class="formWrapper"></div>
        `);
        document
            .querySelector('.bannerRight .formWrapper')
            .insertAdjacentElement('afterbegin', document.querySelector('form.location-search'));

        const input = document.querySelector('.bannerRight .formWrapper input');
        if (input) {
            input.setAttribute('placeholder', '');
            const wrapper = document.createElement('div');
            wrapper.className = 'inputWrapper';
            input.parentNode.insertBefore(wrapper, input);
            wrapper.appendChild(input);
            wrapper.insertAdjacentHTML('afterbegin', `<label>Enter your address, city, or ZIP</label>`);

            const updateHasValue = function () {
                wrapper.classList.toggle('has-value', input.value.trim() !== '');
            };
            updateHasValue();
            input.addEventListener('input', updateHasValue);
            input.addEventListener('change', updateHasValue);
            setTimeout(updateHasValue, 0);

            document.querySelector('.bannerRight .formWrapper button').innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"><g clip-path="url(#clip0_28142_160)"><path d="M4.29175 1.39551C5.70441 0.639435 7.32913 0.377384 8.90796 0.650391C10.4868 0.92347 11.9299 1.7157 13.0066 2.90234C14.0833 4.08903 14.7326 5.60224 14.8513 7.2002C14.97 8.79802 14.5513 10.39 13.6619 11.7227L13.4324 12.0654L13.7263 12.3555L17.2058 15.7979L17.2107 15.8027C17.3073 15.8959 17.3847 16.0073 17.4373 16.1309C17.4898 16.2546 17.5164 16.388 17.5164 16.5225C17.5164 16.6569 17.4898 16.7904 17.4373 16.9141C17.3847 17.0376 17.3073 17.149 17.2107 17.2422L17.2048 17.248C17.0175 17.4342 16.7638 17.5391 16.4998 17.5391C16.2685 17.539 16.0455 17.4584 15.8679 17.3135L15.7947 17.248L12.3083 13.7617L12.0173 13.4697L11.6746 13.7012C10.4976 14.4969 9.10897 14.9213 7.68823 14.9199H7.68726C6.08495 14.9208 4.52813 14.3864 3.2644 13.4014C2.00065 12.4162 1.10284 11.0365 0.712646 9.48242C0.322494 7.92833 0.462559 6.28845 1.11108 4.82324C1.75964 3.35807 2.87906 2.1516 4.29175 1.39551ZM7.68726 1.75C6.11196 1.75217 4.60117 2.37947 3.48804 3.49414C2.37505 4.60879 1.74975 6.12013 1.74976 7.69531L1.75464 7.91504C1.79672 9.01209 2.14201 10.0777 2.75464 10.9922C3.408 11.9675 4.33567 12.7276 5.42065 13.1758C6.50573 13.6239 7.7001 13.7398 8.85132 13.5098C10.0023 13.2797 11.059 12.7133 11.8884 11.8828C12.718 11.0521 13.283 9.9943 13.5115 8.84277C13.7399 7.69124 13.6222 6.49754 13.1726 5.41309C12.723 4.32868 11.9613 3.40203 10.9851 2.75C10.0698 2.13872 9.00401 1.79446 7.90698 1.75391L7.68726 1.75Z" fill="white" stroke="white"></path></g><defs><clipPath id="clip0_28142_160"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>
                Find A Clinic NEAR YOU
            `;
        }
    });
});