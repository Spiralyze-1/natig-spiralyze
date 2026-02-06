function preventLegalLinksReload() {
    document.addEventListener('click', (e) => {
        // Handle modal close button
        const closeBtn = e.target.closest('.modal__close');
        if (closeBtn) {
            e.preventDefault();
            e.stopPropagation(); // Stop event from bubbling
            closeBtn.closest('.modal')?.classList.remove('open');
            document.querySelector('html').classList.remove('no-scroll');
            return;
        }

        // Handle clicking on modal backdrop (outside modal content)
        const modal = e.target.closest('.modal');
        if (modal && modal.classList.contains('open') && !e.target.closest('.modal__content')) {
            e.preventDefault();
            modal.classList.remove('open');
            document.querySelector('html').classList.remove('no-scroll');
            return;
        }

        // Handle legal links
        const link = e.target.closest('.sign-up-form-visible-legal-t-cs a.text-block-link');

        if (!link) return;

        if (link.getAttribute('href') === '') {
            e.preventDefault();
        }

        const omConfig = link.getAttribute('data-om-config') || '';

        if (omConfig.includes('Terms of Service')) {
            console.log("----Worked 1----");
            document.querySelectorAll('.modal')[0]?.classList.add('open');
            document.querySelector('html').classList.add('no-scroll');
        } else if (omConfig.includes('Privacy Notice')) {
            console.log("----Worked 2----");
            document.querySelectorAll('.modal')[1]?.classList.add('open');
            document.querySelector('html').classList.add('no-scroll');
        }
    }, true);
}
console.log("spz_6003_v1 STARTED");

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

hiddenValue('#6003 | Constant Contact | LPs | Locked Hero', 'SPZ_6003_V1');

// Simple element waiter
function waitForElement(selector, callback, maxAttempts = 50) {
    let attempts = 0;
    const check = setInterval(() => {
        const el = document.querySelector(selector);
        if (el) {
            clearInterval(check);
            callback(el);
        } else if (++attempts >= maxAttempts) {
            clearInterval(check);
            console.log('Element not found:', selector);
        }
    }, 100);
}


let newElementClassList = ['.spz-newHero', '.spz-socialProof'];
function applyVariant() {
    // Add body classes
    if (!document.body.classList.contains('spz6001_v1')) {
        document.body.classList.add('spz6001_v1');
    }


    if (window.location.pathname === '/landing1/email-marketing-campaign-mobile') {
        if (!document.body.classList.contains('spz6001_email_marketing_campaign_mobile')) {
            document.body.classList.add('spz6001_email_marketing_campaign_mobile');
        }
    }

    preventLegalLinksReload()

    // Wait for hero section to exist, then apply changes once
    waitForElement('.mui-jgfs67', (heroSection) => {
        if (!heroSection.classList.contains('spz-hero-section-6001')) {
            heroSection.classList.add('spz-hero-section-6001');
        }

        headerChanges();
        updateHeroContent();
        socialProofAdded();

        // Wait for form - it might be in different locations depending on page
        const formSelector = '.spz-hero-section-6001 .hero__form form, .spz-hero-section-6001 form.material-ui-form';
        waitForElement(formSelector, (form) => {
            formChanges(form);
        });
    });
}


function headerChanges() {
    const logoImg = document.querySelector('header a.header__logo img');
    // if (!logoImg || logoImg.nextElementSibling?.tagName === 'svg') return;
    let newLogoSrc = 'https://res.cloudinary.com/spiralyze/image/upload/v1761919915/constantcontact/6001/costant_logo.svg';
    if (logoImg.getAttribute('src') != newLogoSrc)
        logoImg.setAttribute('src', newLogoSrc);

}

function updateHeroContent() {
    const heroContentMap = {
        '/landing1/email-marketing-campaign-mobile': {
            subHeading: 'EMAIL & social MEDIA MARKETING PLATFORM',
            heading: 'Grow your business with automated email & social media marketing.',
            usp: [
                '<strong>Emails.</strong> Build high-converting emails in minutes with AI. Just enter a few keywords. Automatically send at the best times. Drive more sales.',
                '<strong>Socials.</strong> Instantly create posts and ads for Facebook, Instagram, & LinkedIn. Post to all platforms. Reach ready-to-buy customers.',
                "<strong>Analytics.</strong> See who opens emails, which posts and emails increase revenue, and more. Repeat what's successful & boost sales."
            ]
        },
        '/landing1/social-media-tools': {
            subHeading: 'SOCIAL MEDIA MARKETING platform',
            heading: 'Streamline social media marketing. Boost revenue while saving time.',
            usp: [
                '<strong>Socials.</strong> Generate all your Facebook, Instagram, LinkedIn, & email content with AI. See when to post. Grow your following & boost sales.',
                '<strong>Ads.</strong> Create high-converting social ads that reach ready-to-buy customers. Generate content & launch in a few clicks.',
                '<strong>Analytics.</strong> See which posts drive the highest revenue and new follower growth. Repeat what\'s successful and boost sales.'
            ]
        }
    };

    const path = window.location.pathname;
    const heroData = heroContentMap[path];
    if (!heroData) return;

    const targetSection = document.querySelector('.spz-hero-section-6001 .hero__content');
    if (!targetSection || targetSection.querySelector('.spz-newHero')) return;

    const newHero = document.createElement('div');
    newHero.className = 'spz-newHero';
    newHero.innerHTML = `
        <h3 class="spz-subHeading">${heroData.subHeading}</h3>
        <h1 class="spz-heading">${heroData.heading}</h1>
        <ul class="spz-heroUSP">
            ${heroData.usp.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;

    if (!document.querySelector('.spz-newHero')) {
        targetSection.prepend(newHero);
    }

    // For social-media-tools page, create form container and move form into it
    if (path === '/landing1/social-media-tools') {
        const heroContent = document.querySelector('.spz-hero-section-6001 .hero__content');
        const heroParent = heroContent?.parentElement;

        console.log("SPZZZ111111111111");

        if (heroParent && !heroParent.classList.contains('hero--form')) {
            heroParent.classList.add('hero--form');
            console.log("SPZZZ222222222");
        }

        if (heroParent && !document.querySelector('.spz-hero-section-6001 .hero__form')) {
            console.log("SPZZZ33333333333");
            const formWrapper = document.createElement('div');
            formWrapper.className = 'hero__form';
            heroContent.after(formWrapper);

            const ctctForm = document.querySelector('.ctct-form-outer-wrapper');
            if (ctctForm) {
                console.log("SPZZZ444444444444");
                formWrapper.appendChild(ctctForm);
            }
        }
    }

    // Add locked hero functionality
    if (!localStorage.getItem('spz-6003-unlocked')) {
        document.body.classList.add('spz6001_lockedHero');
        addStickyCTA();
    }
}

function addStickyCTA() {
    console.log("add lock cta")
    if (document.querySelector('.spz-sticky-cta')) return;
    console.log("add lock cta ????")

    document.querySelector('#main')?.insertAdjacentHTML('beforeend', `
        <button class="spz-sticky-cta">
            <div>
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </div>
        </button>
    `);

    document.querySelector('.spz-sticky-cta')?.addEventListener('click', () => {
        document.body.classList.remove('spz6001_lockedHero');
        localStorage.setItem('spz-6003-unlocked', 'true');
        document.querySelector('.spz-hero-section-6001')?.nextElementSibling?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

function socialProofAdded() {
    const target = document.querySelector('.spz-hero-section-6001 .hero.hero--form');
    if (!target || document.querySelector('.spz-socialProof')) return;

    target.insertAdjacentHTML('afterend', `
        <div class="spz-socialProof">
            <p>Join 600,000 customers growing revenue with Constant Contact</p>
            <ul>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142019/constantcontact/6001/logo-cornell-engineering.svg" alt="cornell engineering"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142019/constantcontact/6001/logo-techsoup.svg" alt="techsoup"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142019/constantcontact/6001/logo-mathnasium.svg" alt="mathnasium"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142019/constantcontact/6001/logo-dream-vacations.svg" alt="dream vacations"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142020/constantcontact/6001/logo-kw-citywide.svg" alt="kw citywide"></li>
                <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1761142019/constantcontact/6001/logo-the-ups-store.svg" alt="the ups store"></li>
            </ul>
        </div>
    `);
}

function formChanges(form) {
    // Form heading changes
    if (!form.querySelector('.spz-form-fields-wrapper') && window.location.pathname !== '/landing1/social-media-tools') {
        const wrapper = document.createElement('div');
        wrapper.className = 'spz-form-fields-wrapper';

        // Get fields
        const emailField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="email"]');
        const passwordField = form.querySelector('.field.material-ui-field:has(.field__password-wrapper), .field.material-ui-field:has(input[type="password"])');
        const firstNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="givenName"]');
        const lastNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="familyName"]');
        const orgField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="organization"]');
        const phoneField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="tel"]');

        // Add in NEW order: First Name, Last Name (row 1), Email, Password (row 2), then others
        if (firstNameField) wrapper.appendChild(firstNameField);
        if (lastNameField) wrapper.appendChild(lastNameField);
        if (emailField) wrapper.appendChild(emailField);
        if (passwordField) wrapper.appendChild(passwordField);
        if (orgField) wrapper.appendChild(orgField);
        if (phoneField) wrapper.appendChild(phoneField);

        // Insert wrapper after form headers
        const formHeaders = form.querySelector('.form-headers');
        const formFieldsWrapper = form.querySelector('.form-fields-wrapper');

        if (formFieldsWrapper) {
            formFieldsWrapper.prepend(wrapper);
        } else if (formHeaders) {
            formHeaders.after(wrapper);
        } else {
            form.prepend(wrapper);
        }
    }
    /*
    const formHeading = form.querySelector('.form-headers h3');
    if (formHeading) formHeading.textContent = "Free Trial";

    const emailPageFormHeading = form.querySelector('h2');
    if (emailPageFormHeading && !emailPageFormHeading.closest('.form-headers')) {
        emailPageFormHeading.textContent = "Free Trial";
    }

    const formSubheading = form.querySelector('.form-headers p');
    if (formSubheading) {
        formSubheading.textContent = "No credit card required.";
    } else {
        const formHeaders = form.querySelector('.form-headers');
        if (formHeaders && !formHeaders.querySelector('.custom_subheading')) {
            formHeaders.insertAdjacentHTML('beforeend', `<p class="custom_subheading">No credit card required.</p>`);
        }
    }

    // Wrap form fields if not already wrapped
    if (!form.querySelector('.spz-form-fields-wrapper')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'spz-form-fields-wrapper';

        // Get fields in the correct order: Email, Password, First Name, Last Name, then rest
        const emailField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="email"]');
        const passwordField = form.querySelector('.field.material-ui-field:has(.field__password-wrapper), .field.material-ui-field:has(input[type="password"])');
        const firstNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="givenName"]');
        const lastNameField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="familyName"]');
        const orgField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="organization"]');
        const phoneField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="tel"]');

        // Add in correct order: Email, Password (row 1), First Name, Last Name (row 2), then others
        if (emailField) wrapper.appendChild(emailField);
        if (passwordField) wrapper.appendChild(passwordField);
        if (firstNameField) wrapper.appendChild(firstNameField);
        if (lastNameField) wrapper.appendChild(lastNameField);
        if (orgField) wrapper.appendChild(orgField);
        if (phoneField) wrapper.appendChild(phoneField);

        // Add any remaining fields
        const remainingFields = form.querySelectorAll('.field.material-ui-field:not(.spz-form-fields-wrapper .field)');
        remainingFields.forEach(field => {
            if (!wrapper.contains(field)) {
                wrapper.appendChild(field);
            }
        });

        const formHeaders = form.querySelector('.form-headers, h2');
        if (formHeaders) {
            formHeaders.after(wrapper);
        } else {
            form.prepend(wrapper);
        }
    }
    */


    // Remove "Required" from all labels
    const labels = form.querySelectorAll('label[data-attr-input-width="normal"]');
    labels.forEach(label => {
        if (label.textContent.includes('Required')) {
            //label.textContent = label.textContent.replace(/\s*Required\s*/gi, '').trim();
        }
    });

    // Also update the fieldset legend spans (for the floating label outline)
    const legendSpans = form.querySelectorAll('fieldset legend span');
    legendSpans.forEach(span => {
        if (span.textContent.includes('Required')) {
            //span.textContent = span.textContent.replace(/\s*Required\s*/gi, '').trim();
        }
    });

    // Update disclaimer text
    form.querySelectorAll('.form__text-content p').forEach(p => {
        if (p.textContent.includes('"Get started,"')) {
            p.innerHTML = p.innerHTML.replace(/"Get started,"/g, '"Instant Access",');
            p.parentElement.parentElement.classList.add('spz-disclaimer')
        }
    });

    // Replace the svg dropdown icon
    const dropdownIcon = form.querySelector('[data-testid="ArrowDropDownIcon"]');
    if (dropdownIcon && !dropdownIcon.classList.contains('spz-icon-replaced')) {
        dropdownIcon.classList.add('spz-icon-replaced');
        dropdownIcon.setAttribute('viewBox', '0 0 12 7');
        dropdownIcon.setAttribute('width', '12');
        dropdownIcon.setAttribute('height', '7');
        dropdownIcon.innerHTML = '<path d="M0.75 0.75L5.75 5.75L10.75 0.75" stroke="#63708A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>';
    }

    /*
    // Sync phone field focus state
    const phoneField = form.querySelector('.field.material-ui-field[data-attr-form-field-id="tel"]');
    if (phoneField && !phoneField.hasAttribute('data-spz-phone-sync')) {
        phoneField.setAttribute('data-spz-phone-sync', 'true');

        const countryCodeSelect = phoneField.querySelector('[data-testid="country-code"]');
        const phoneInput = phoneField.querySelector('input#tel');

        const addFocus = () => phoneField.classList.add('spz-field-focus');
        const removeFocus = () => {
            // Small delay to check if focus moved to the other input
            setTimeout(() => {
                const activeEl = document.activeElement;
                const isCountryFocused = countryCodeSelect?.contains(activeEl);
                const isPhoneFocused = activeEl === phoneInput;

                if (!isCountryFocused && !isPhoneFocused) {
                    phoneField.classList.remove('spz-field-focus');
                }
            }, 10);
        };

        // Country code select events
        if (countryCodeSelect) {
            countryCodeSelect.addEventListener('focus', addFocus, true);
            countryCodeSelect.addEventListener('blur', removeFocus, true);
            countryCodeSelect.addEventListener('click', addFocus);
        }

        // Phone input events
        if (phoneInput) {
            phoneInput.addEventListener('focus', addFocus);
            phoneInput.addEventListener('blur', removeFocus);
        }
    }

    // Also change button text to "Instant access"
    const submitBtn = form.querySelector('button.cta');
    if (submitBtn) {
        submitBtn.textContent = "Instant Access"
    }

    // Watch for form errors
    watchForFormErrors(form);
    */
}

function watchForFormErrors(form) {
    // Use a simple interval to check for errors after form interaction
    let errorCheckInterval = null;

    const submitBtn = form.querySelector('button.cta');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', () => {
        // Start checking for errors
        let checks = 0;
        errorCheckInterval = setInterval(() => {
            const errorMsg = form.querySelector('.form__error-message.form__error-message--visible');
            if (errorMsg) {
                errorMsg.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important;';
                document.body.classList.add('spz-form-error');
                clearInterval(errorCheckInterval);
            }
            if (++checks > 30) { // Stop after 3 seconds
                clearInterval(errorCheckInterval);
            }
        }, 100);
    });
}


function isTargetPage() {
    const path = window.location.pathname;
    return path === '/landing1/email-marketing-campaign-mobile' ||
        path === '/landing1/social-media-tools';
}

// Simple one-time initialization
function init() {
    if (!isTargetPage()) return;
    applyVariant();
}

init();

const handleMutations = (mutationsList, observer) => {

    if (document.querySelectorAll(newElementClassList.join()).length != newElementClassList.length) {
        console.log("SPZZZ: Body changed");
        init();
    }
};
const config = {
    attributes: true,
    childList: true,
    subtree: true
};
// Main body observer to catch all changes including route changes
let bodyObserver = new MutationObserver(handleMutations);
bodyObserver.observe(document.body, config);
