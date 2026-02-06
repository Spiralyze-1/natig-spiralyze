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
hiddenValue('#2010 | Constant Contact | Free Trial & Buy Now | Social Proof Logos', 'SPZ_2010_V3')

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

const testNumber = "2010";
const testType = "v3";
let isApplying = false; // Prevent concurrent executions

function applyChanges() {
    if (isApplying) return; // Prevent re-entry during application
    isApplying = true;

    console.log("2010 v3 started")
    const className = `spz_${testNumber}_${testType}`;
    if (!document.body.classList.contains(className)) {
        document.body.classList.add(className);
    }

    if (document.location.pathname.includes('buynow')) {
        document.body.classList.add(className + "_buynow")
    }

    // header logo
    if (document.querySelector('.header__logo')) {
        document.querySelector('.header__logo > img').setAttribute('src', 'https://res.cloudinary.com/spiralyze/image/upload/v1769172958/constantcontact/2010/costant_logo.svg')
    }

    if (document.querySelector('.header > div')) {
        document.querySelector('.header > div').insertAdjacentHTML('beforeend', `
    		<div class="spz-dummy-header-links">
	    		<span style="margin-right: 10px;">Already have an account?&nbsp;</span>
	    		<a tabindex="0" aria-label="Already have an account" class="spz-dummy-login header-login-button cta cta--small cta--outline" href="https://go.constantcontact.com/login" data-qe-id="header-login-link-41G-naa-aab" data-om-config="header-login-link, Log in 41G-naa-aab  /login" rel="noopener noreferrer nofollow"><span>Log in</span></a>
    		</div>
    	`)
    }

    if (document.querySelector('.sign-up-form-visible-legal-t-cs > p')) {
        const el = document.querySelector('.sign-up-form-visible-legal-t-cs > p');
        el.childNodes.forEach(node => {
            if (node.nodeType === 3) {
                node.textContent = node.textContent.replace(/"Get started,"/g, '"Get started",');
            }
        });
    }

    // Check if element already exists before inserting
    if (!document.querySelector('.spz-logo-list-wrapper')) {
        const mainSection = document.querySelector('#main > section');
        if (mainSection) {
            mainSection.insertAdjacentHTML('afterend', `
                <div class="spz-logo-list-wrapper">
                	<h3>Join 600,000 customers growing revenue with Constant Contact</h3>
                    <ul class="spz-logo-list">
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-cornell-engineering_1.webp" alt="Cornel Engineering"/>
                        </li>
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-techsoup_1.webp" alt="Techsoup"/>
                        </li>
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-mathnasium_1.webp" alt="Mathnasium"/>
                        </li>
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-dream-vacations_1.webp" alt="Dream Vacations"/>
                        </li>
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-kw-citywide_1.webp" alt="KW Citywide"/>
                        </li>
                        <li>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/2010/logo-the-ups-store_1.webp" alt="The UPS Store"/>
                        </li>
                    </ul>
                </div>
            `);
        }
    }

    isApplying = false; // Allow future executions
}

waitForElement('#main', () => {
    const observerCallback = (mutationsList, observer) => {
        // Only apply if #main > section exists and our element is missing
        if (document.querySelector('#main > section') &&
            !document.querySelector('.spz-logo-list-wrapper')) {
            applyChanges();
        }
    };

    const observerConfig = {
        childList: true,
        subtree: true,
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, observerConfig);

    // Apply initially
    applyChanges();
});