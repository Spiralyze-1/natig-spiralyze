// #2005 | American Family Care | Home | USPs

// ============ DEV CONFIG ============
// DEV 1/4. Asana URL
const asana_URL = `https://app.asana.com/1/77217210692853/project/1211673270966198/task/1213325785182559?focus=true`;

// DEV 2/4. Selectors + positions
const template_selector = `.e-con-inner`;  // service-tags widget → bullets injected afterend
const template_position = `beforeend`;

// DEV 3/4. Content
const bullets = [
    {
        bold: 'Accepts Most Insurance.',
        text: ' BCBS, Aetna, UnitedHealthcare, Cigna Healthcare, etc.'
    },
    {
        bold: 'Fast Care.',
        text: ' Walk-ins and same-day appointments. Open Saturday & Sunday.'
    },
    {
        bold: 'Additional Services.',
        text: ' Telecare, travel medicine, & occupational health offered.'
    }
];

// DEV 4/4. Assets
const checkIcon = `https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1773403259/americanfamilycare/2005/frame.svg`;
// BG images served via CSS (see v1.css) — breakpoints: default 1440, 1920px+, 2560px+

// ============ DOWNFUNNEL TRACKING ============
(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = "both"; // true / false / 'both'
    const expName = "2005"; //experiment name should be 1001, 1002, 1003 etc.
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

// ============ HTML ============
function buildHTML() {
    return `
    <div class="spz-bullets">
      ${bullets.map(function (b) {
        return `<div class="spz-bullet">
          <span class="spz-bullet-icon"><img src="${checkIcon}" alt="" width="20" height="20" loading="lazy" /></span>
          <p><strong>${b.bold}</strong>${b.text}</p>
        </div>`;
    }).join('')}
    </div>`;
}

// ============ INIT ============
function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) { callback(el); return; }
    const observer = new MutationObserver(function () {
        const found = document.querySelector(selector);
        if (found) { observer.disconnect(); callback(found); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function init() {
    if (window.location.pathname !== '/') return;
    if (document.body.classList.contains('spz_2005_v2')) return;
    waitForElement(template_selector, function (ctrl) {
        document.body.classList.add('spz_2005_v2');

        // Inject bullets
        ctrl.insertAdjacentHTML(template_position, buildHTML());

        const formCol = ctrl.closest('.e-parent').querySelector('.location-search');

        // On tablet/mobile, move form column between pills and bullets
        if (window.innerWidth <= 1024 && formCol) {
            formCol.classList.add('spz-form-col');
            const bulletsEl = ctrl.parentNode.querySelector('.spz-bullets');
            if (bulletsEl) {
                bulletsEl.parentNode.insertBefore(formCol, bulletsEl);
            }
        }
    });

    waitForElement('.locationsfilter', function (input) {
        // Avoid double-wrapping
        if (input.closest('.spz-input-wrap')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'spz-input-wrap';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        // SVG pin icon
        const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        icon.setAttribute('width', '13');
        icon.setAttribute('height', '18');
        icon.setAttribute('viewBox', '0 0 13 18');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('class', 'spz-input-icon');
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<path d="M6.5 0C4.77609 0 3.12279 0.63232 1.90381 1.75786C0.68482 2.88339 0 4.40995 0 6.0017C0 8.63494 4.0625 15.0042 5.80938 17.645C5.88224 17.7535 5.98392 17.8431 6.10478 17.9053C6.22564 17.9674 6.36167 18 6.5 18C6.63833 18 6.77436 17.9674 6.89522 17.9053C7.01608 17.8431 7.11776 17.7535 7.19063 17.645C8.9375 15.0042 13 8.63494 13 6.0017C13 4.40995 12.3152 2.88339 11.0962 1.75786C9.87721 0.63232 8.22391 0 6.5 0ZM6.5 8.62744C5.93756 8.62744 5.38775 8.47344 4.9201 8.18492C4.45245 7.8964 4.08795 7.48632 3.87272 7.00652C3.65748 6.52673 3.60117 5.99878 3.71089 5.48944C3.82062 4.98009 4.09146 4.51223 4.48917 4.14502C4.88687 3.7778 5.39358 3.52772 5.94521 3.42641C6.49685 3.32509 7.06863 3.37709 7.58826 3.57583C8.10788 3.77456 8.55202 4.11111 8.86449 4.54291C9.17697 4.97471 9.34375 5.48237 9.34375 6.0017C9.34375 6.69809 9.04414 7.36595 8.51084 7.85838C7.97753 8.3508 7.25421 8.62744 6.5 8.62744Z" fill="#E61D30"/>`;
        wrapper.insertBefore(icon, input);

        // Floating label
        const label = document.createElement('label');
        label.className = 'spz-float-label';
        label.setAttribute('for', 'spz-location-input');
        input.setAttribute('id', 'spz-location-input');
        input.removeAttribute('placeholder');

        const labelText = document.createElement('span');
        labelText.textContent = input.getAttribute('placeholder') || 'Enter your address, city, or ZIP';
        label.appendChild(labelText);

        const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkmark.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        checkmark.setAttribute('width', '10');
        checkmark.setAttribute('height', '9');
        checkmark.setAttribute('viewBox', '0 0 10 9');
        checkmark.setAttribute('fill', 'none');
        checkmark.setAttribute('class', 'spz-input-check');
        checkmark.setAttribute('aria-hidden', 'true');
        checkmark.innerHTML = `<path d="M0.724609 4.2897L3.01032 6.6897L8.72461 0.689697" stroke="#61CE70" stroke-width="2"/>`;
        label.appendChild(checkmark);

        wrapper.appendChild(label);

        // Float up if input already has value (e.g. browser autofill)
        function syncLabel() {
            wrapper.classList.toggle('spz-has-value', input.value.trim().length > 0);
        }
        input.addEventListener('focus', () => wrapper.classList.add('spz-focused'));
        input.addEventListener('blur', () => { wrapper.classList.remove('spz-focused'); syncLabel(); });
        input.addEventListener('input', syncLabel);
        syncLabel();
    });

    // Replace image widget with custom SVG section
    waitForElement('[data-id="e8065ac"]', function (imageWidget) {
        imageWidget.outerHTML = `<div class="elementor-element elementor-element-e8065ac elementor-widget spz-pin-widget" data-id="e8065ac">
        <div class="elementor-widget-container">
            <div class="spz-upper-descorator">
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="60" viewBox="0 0 45 60" fill="none">
                    <g clip-path="url(#clip0_29069_972)">
                        <path d="M19.7227 58.5C13.6055 50.9766 0 32.7422 0 22.5C0 10.0734 10.0734 0 22.5 0C34.9219 0 45 10.0734 45 22.5C45 32.7422 31.2891 50.9766 25.2773 58.5C23.8359 60.293 21.1641 60.293 19.7227 58.5ZM22.5 30C26.6367 30 30 26.6367 30 22.5C30 18.3633 26.6367 15 22.5 15C18.3633 15 15 18.3633 15 22.5C15 26.6367 18.3633 30 22.5 30Z" fill="#E61D30"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_29069_972">
                        <rect width="45" height="60" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    </div>`;
    });

    waitForElement('[data-id="c447687"]', function (widget) {
        widget.outerHTML = `<div class="elementor-element elementor-element-c447687 elementor-widget elementor-widget-image" data-id="c447687">
            <div class="elementor-widget-container">
                <img width="73" height="20" alt="star icon" src="https://res.cloudinary.com/spiralyze/image/upload/f_svg/v1773403258/americanfamilycare/2005/icon.svg">
            </div>
        </div>`;
    });

    waitForElement('.location-search button', function (button) {
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4.2915 1.35059C5.70417 0.594514 7.32888 0.332462 8.90771 0.605469C10.4866 0.878548 11.9296 1.67077 13.0063 2.85742C14.0831 4.04411 14.7323 5.55732 14.8511 7.15527C14.9697 8.75309 14.5511 10.3451 13.6616 11.6777L13.4321 12.0205L13.7261 12.3105L17.2056 15.7529L17.2104 15.7578C17.3071 15.851 17.3845 15.9624 17.437 16.0859C17.4896 16.2096 17.5161 16.3431 17.5161 16.4775C17.5161 16.6119 17.4896 16.7454 17.437 16.8691C17.3845 16.9927 17.3071 17.1041 17.2104 17.1973L17.2046 17.2031C17.0172 17.3892 16.7636 17.4941 16.4995 17.4941C16.2683 17.4941 16.0453 17.4135 15.8677 17.2686L15.7944 17.2031L12.3081 13.7168L12.0171 13.4248L11.6743 13.6562C10.4973 14.4519 9.10872 14.8764 7.68799 14.875H7.68701C6.0847 14.8759 4.52789 14.3415 3.26416 13.3564C2.00041 12.3713 1.10259 10.9916 0.712402 9.4375C0.32225 7.88341 0.462315 6.24353 1.11084 4.77832C1.75939 3.31315 2.87882 2.10667 4.2915 1.35059ZM7.68701 1.70508C6.11172 1.70725 4.60093 2.33455 3.48779 3.44922C2.3748 4.56387 1.74951 6.07521 1.74951 7.65039L1.75439 7.87012C1.79647 8.96717 2.14176 10.0328 2.75439 10.9473C3.40776 11.9225 4.33543 12.6827 5.42041 13.1309C6.50549 13.579 7.69985 13.6949 8.85107 13.4648C10.0021 13.2348 11.0587 12.6684 11.8882 11.8379C12.7177 11.0072 13.2828 9.94938 13.5112 8.79785C13.7397 7.64631 13.622 6.45262 13.1724 5.36816C12.7227 4.28376 11.9611 3.35711 10.9849 2.70508C10.0696 2.0938 9.00377 1.74954 7.90674 1.70898L7.68701 1.70508Z" fill="white" stroke="white"/>
            </svg> 
            <span>Find A Clinic NEAR YOU</span>
        `;

        button.classList.add('spz2005_v2')
    });
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : (init(), setTimeout(init, 1000), setTimeout(init, 2000));