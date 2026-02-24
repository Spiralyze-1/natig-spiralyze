(function () {
    const squeezePage = "both";
    const expName = "2003";
    const variantName = expName + `_v3`;
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
const testType = 'v3';
console.log('2003 v3 ping');

waitForElement('body', () => {
    if (!document.querySelector('body').classList.contains(`spz_${testNumber}_${testType}`)) {
        document.querySelector('body').classList.add(`spz_${testNumber}_${testType}`);
    }
    console.log('2003 v3 started');

    setTimeout(() => {
        document.querySelector('.main-header-container').click();
    }, 100);

    // ── Red banner (from 2003-V1) ──────────────────────────────────────────────
    const redBanner = document.querySelector('[data-elementor-id="1912"]');
    redBanner.innerHTML = `
        <div class="spz-red-banner">
            <div class="spz-red-content">
                <ul>
                    <li>
                        <a href="https://www.afcurgentcare.com/locations/?utm_source=app.asana.com&amp;utm_medium=referral&amp;landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link lazyloaded" data-wc-basekw="" wc_modded="1"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 10.0001C10.4583 10.0001 10.8507 9.83689 11.1771 9.5105C11.5035 9.18411 11.6667 8.79175 11.6667 8.33341C11.6667 7.87508 11.5035 7.48272 11.1771 7.15633C10.8507 6.82994 10.4583 6.66675 10 6.66675C9.54168 6.66675 9.14932 6.82994 8.82293 7.15633C8.49654 7.48272 8.33334 7.87508 8.33334 8.33341C8.33334 8.79175 8.49654 9.18411 8.82293 9.5105C9.14932 9.83689 9.54168 10.0001 10 10.0001ZM10 16.1251C11.6945 14.5695 12.9514 13.1563 13.7708 11.8855C14.5903 10.6147 15 9.48619 15 8.50008C15 6.98619 14.5174 5.74661 13.5521 4.78133C12.5868 3.81605 11.4028 3.33341 10 3.33341C8.59723 3.33341 7.4132 3.81605 6.44793 4.78133C5.48265 5.74661 5.00001 6.98619 5.00001 8.50008C5.00001 9.48619 5.40973 10.6147 6.22918 11.8855C7.04862 13.1563 8.30557 14.5695 10 16.1251ZM10 18.3334C7.7639 16.4306 6.09376 14.6633 4.98959 13.0313C3.88543 11.3994 3.33334 9.88897 3.33334 8.50008C3.33334 6.41675 4.00348 4.75703 5.34376 3.52091C6.68404 2.2848 8.23612 1.66675 10 1.66675C11.7639 1.66675 13.316 2.2848 14.6563 3.52091C15.9965 4.75703 16.6667 6.41675 16.6667 8.50008C16.6667 9.88897 16.1146 11.3994 15.0104 13.0313C13.9063 14.6633 12.2361 16.4306 10 18.3334Z" fill="white"/>
                            </svg>
                            <span>Find a Clinic</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.afcurgentcare.com/patient-resources/pay-your-bill/?utm_source=app.asana.com&utm_medium=referral&landing_page=https%3A%2F%2Fwww.afcurgentcare.com%2F" class="spz-banner-link lazyloaded" data-wc-basekw="" wc_modded="1"> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M1.66669 10.5083H15.8334" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.8334 8.56658V14.5249C15.8084 16.8999 15.1583 17.4999 12.6833 17.4999H4.81671C2.30004 17.4999 1.66669 16.8749 1.66669 14.3916V8.56658C1.66669 6.31658 2.19169 5.59159 4.16669 5.47492C4.36669 5.46659 4.58338 5.45825 4.81671 5.45825H12.6833C15.2 5.45825 15.8334 6.08325 15.8334 8.56658Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M18.3334 5.60833V11.4333C18.3334 13.6833 17.8084 14.4083 15.8334 14.525V8.56667C15.8334 6.08333 15.2 5.45833 12.6833 5.45833H4.81671C4.58338 5.45833 4.36669 5.46667 4.16669 5.475C4.19169 3.1 4.84171 2.5 7.31671 2.5H15.1833C17.7 2.5 18.3334 3.125 18.3334 5.60833Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M4.375 14.8416H5.80831" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M7.59167 14.8416H10.4583" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>Pay Your Bill</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;

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