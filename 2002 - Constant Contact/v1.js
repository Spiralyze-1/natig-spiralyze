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
if (window.location.pathname == '/') {
    waitForElement('#centered-cta-signupform button', () => {
        document.querySelector('#centered-cta-signupform button').addEventListener('click', () => {
            // Save all selected indices
            const checkedIndices = Array.from(document.querySelectorAll('.feature-checkbox-card'))
                .map((el, idx) => el.classList.contains('is-selected') ? idx : null)
                .filter(i => i !== null);

            localStorage.setItem('selectedQ1', JSON.stringify(checkedIndices));
        });
    })
} else {
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
    hiddenValue('#2002 | Constant Contact | Free Trial | Qualifying Questions', 'SPZ_2002_V1')

    const template_triageData = [
        //Question 1 start
        {
            questionHeading: "How can we help?",
            answers: [
                {
                    answerText: `Email <br> marketing`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconemail-marketing_1.svg'
                },
                {
                    answerText: `Social media <br> marketing`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconsocial-media-marketing_1.svg'
                },
                {
                    answerText: `SMS <br> marketing`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/icontext-campaigns_1.svg'
                },
                {
                    answerText: `Event promotion <br> & ticketing`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconevent-promotion_1.svg'
                },
                {
                    answerText: `Ecommerce <br> integrations`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconecommerce-integrations_1.svg'
                },
                {
                    answerText: `Other/ <br> Not listed`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconother_1.svg'
                }
            ]
        },
        //Question 1 end
        //Question 2 start
        {
            questionHeading: "Which best describes you?",
            answers: [
                {
                    answerText: `Non-profit & <br> events`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconnon0profit_1.svg'
                },
                {
                    answerText: `Small <br> business`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconsmall-business_1.svg'
                },
                {
                    answerText: `Real estate`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconreal-estate_1.svg'
                },
                {
                    answerText: `Agency or <br> freelancer`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconagency-freelance_1.svg'
                },
                {
                    answerText: `Franchisor/<br>Owner`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconfranchisor_1.svg'
                },
                {
                    answerText: `Government &<br> community`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/icongovernment_1.svg'
                },
                {
                    answerText: `Healthcare`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconhealthcare_1.svg'
                },
                {
                    answerText: `Education`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720324/constantcontact/2002/iconeducation_7.svg'
                },
                {
                    answerText: `Other`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconother_1.svg'
                }
            ]
        }
        //Question 2 end
    ];
    /***********************************
    ************************************
    DO NOT TOUCH
    BEYOND THIS LINE
    ******************************
    ************************/
    //Helper function to animate labels for inputs

    var template_formUniqueSelector, formHeaderText;
    if (window.location.pathname.includes('/buynow/')) {
        template_formUniqueSelector = "#buy-form-em-pwd-v2-pricing";
        formHeaderText = `Get 50% off your first 3 months`;
    } else {
        template_formUniqueSelector = "#sign-up-form";
        formHeaderText = `Start FREE Today!`;
    }

    const formLoaded = setInterval(() => {
        if (document.querySelector(template_formUniqueSelector) && document.querySelectorAll(`${template_formUniqueSelector} input`).length > 0) {
            clearInterval(formLoaded);
            addForm();
        }
    });

    // Debounce helper
    function debounce(fn, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // Debounced callback
    const observerCallback = debounce(() => {
        if (document.querySelector('.main-grid #main') && !document.querySelector('.spz_modal_wrap')) {
            addForm();
        }
        if (document.querySelector(template_formUniqueSelector) && document.querySelector(template_formUniqueSelector).classList.contains('submitting') && localStorage.getItem('spz-2002-form-filled') !== 'true') {
            localStorage.setItem('spz-2002-form-filled', 'true');
        }
    }, 300);

    const observerConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(document.body, observerConfig);

    // This is the code to generate the form over UI section do no edit it
    function addForm() {

        // Firefox
        function isFirefox() {
            return /firefox/i.test(navigator.userAgent);
        }

        // Usage
        if (isFirefox()) {
            document.body.classList.add('spz_firefox');
        }
        document.body.classList.add('spz_2002_v1');
        const formTemplate = `
                        <div class="questions-wrap">
                            ${template_triageData.length !== 0
            &&
            template_triageData.map((item, index) => {
                return `
                                        <div class="question-item question-${index + 1} ${index !== 0 ? 'spz-hidden' : ''}">
                                            <div class="question-heading">${formHeaderText}</div>
                                            <div class="question-subheading">${item.questionHeading}</div>
                                            <div class="answers-wrap">
                                                ${item.answers.map((itemm, indexx) => {
                    return `
                                                    <div class="answer-item">
                                                        ${itemm.answerImage.length !== 0 ?
                            `<div class="icon"><img src="${itemm.answerImage}" alt="${itemm.answerText.replace('<br>', '')}" class="answer-image"/></div>` :
                            ``
                        }
                                                        <div class="answer-text">${itemm.answerText}</div>
                                                        <div class="answer-checkbox"></div>
                                                    </div>
                                                    `
                }).join('')
                    }
                                            </div>
                                            <div class="next-question">Next<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M7.5 15L12.5 10L7.5 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg></div>
                                        </div>
                                    `
            }).join('')
            }
                            <div class="question-form spz-hidden spz-form-wrap">
                                <div class="form-heading">Show me demo</div>
                                <div class="form-subheading">Show me demo subheading</div>
                            </div>
                        </div>
        `;
        // Insert html template
        if (!document.querySelector('.questions-wrap')) {
            document.querySelector('.ctct-form-outer-wrapper').insertAdjacentHTML('beforeend', formTemplate);
            // Form Append

            // for blurring logo
            document.querySelector('.spz_2002_v1 .icon img[alt="Small  business"]').parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <mask id="path-1-inside-1_24450_2897" fill="white">
    <path d="M22.0869 1.9165C22.8509 1.91648 23.4816 1.91673 23.999 1.97022C24.5452 2.02668 25.0291 2.14769 25.4814 2.42725C25.9337 2.70674 26.258 3.08521 26.5527 3.54834C26.832 3.98738 27.1142 4.5521 27.4561 5.23584L27.4785 5.27979C27.4882 5.29917 27.4971 5.31868 27.5049 5.33838L29.377 10.0698C29.5979 10.6285 29.8329 11.3044 29.9014 11.9868C29.9712 12.6818 29.8732 13.4509 29.3506 14.1138C28.9115 14.6706 28.3006 15.089 27.5986 15.2876L27.417 15.3394V28.5835H29.334C29.748 28.5837 30.084 28.9194 30.084 29.3335C30.0838 29.7474 29.7479 30.0833 29.334 30.0835H2.66699C2.25289 30.0835 1.91716 29.7476 1.91699 29.3335C1.91699 28.9193 2.25279 28.5835 2.66699 28.5835H4.58398V15.3394L4.40137 15.2876C3.6993 15.0887 3.08857 14.6707 2.64941 14.1138C2.12731 13.4511 2.02891 12.6816 2.09863 11.9868C2.16717 11.3043 2.40303 10.6285 2.62402 10.0698L4.49512 5.33838C4.50308 5.31827 4.51284 5.29901 4.52246 5.27979L4.54395 5.23486C4.8857 4.55131 5.16796 3.98729 5.44727 3.54834C5.74195 3.08522 6.06645 2.70677 6.51855 2.42725C6.9708 2.14774 7.45491 2.02669 8.00098 1.97022C8.51857 1.9167 9.14967 1.91648 9.91406 1.9165H22.0869ZM13.1514 14.3452C12.5282 15.0052 11.6459 15.4165 10.667 15.4165C9.68792 15.4165 8.80488 15.0054 8.18164 14.3452L8 14.1528L7.81836 14.3452C7.40076 14.7874 6.86655 15.1175 6.26562 15.2876L6.08398 15.3394V28.5835H11.917V24.6235C11.917 24.0335 11.9168 23.5403 11.9531 23.1392C11.9913 22.7177 12.0744 22.3236 12.2852 21.9585C12.5265 21.5405 12.874 21.193 13.292 20.9517L13.4307 20.8784C13.7565 20.7209 14.1041 20.653 14.4727 20.6196C14.8739 20.5833 15.3669 20.5835 15.957 20.5835H16.043C16.6333 20.5835 17.127 20.5833 17.5283 20.6196C17.9496 20.6578 18.3438 20.7409 18.709 20.9517C19.1269 21.193 19.4735 21.5406 19.7148 21.9585C19.9256 22.3237 20.0087 22.7177 20.0469 23.1392C20.0832 23.5403 20.084 24.0333 20.084 24.6235V28.5835H25.917V15.3394L25.7354 15.2876C25.1343 15.1176 24.5994 14.7876 24.1816 14.3452L24 14.1528L23.8184 14.3452C23.1952 15.0052 22.3128 15.4164 21.334 15.4165C20.355 15.4165 19.4719 15.0053 18.8486 14.3452L18.667 14.1528L18.4854 14.3452C17.8621 15.0054 16.979 15.4165 16 15.4165C15.0212 15.4165 14.1388 15.0052 13.5156 14.3452L13.334 14.1519L13.1514 14.3452ZM16 22.0835C15.3638 22.0835 14.9363 22.084 14.6084 22.1138C14.2911 22.1425 14.141 22.1934 14.042 22.2505C13.852 22.3602 13.6937 22.5185 13.584 22.7085C13.527 22.8075 13.476 22.9572 13.4473 23.2739C13.4175 23.6019 13.417 24.0299 13.417 24.6665V28.5835H18.584V24.6665C18.584 24.0299 18.5825 23.6019 18.5527 23.2739C18.524 22.957 18.4731 22.8075 18.416 22.7085C18.3064 22.5185 18.1489 22.3602 17.959 22.2505C17.86 22.1934 17.7099 22.1425 17.3926 22.1138C17.0646 22.084 16.6366 22.0835 16 22.0835ZM9.96289 3.4165C9.14595 3.41651 8.58935 3.41753 8.15527 3.4624C7.73877 3.50549 7.49963 3.58403 7.30762 3.70264C7.11554 3.82135 6.93784 4.00048 6.71289 4.354C6.4827 4.71582 6.2375 5.20236 5.88281 5.91162L5.87793 5.92139L5.87402 5.93115L4.01855 10.6216C3.80736 11.1555 3.63761 11.6706 3.59082 12.1362C3.54522 12.5903 3.62291 12.9259 3.82715 13.1851C4.17944 13.6318 4.72376 13.9165 5.33398 13.9165C6.39233 13.9163 7.25 13.0579 7.25 11.9995C7.25019 11.5855 7.586 11.2496 8 11.2495C8.4141 11.2495 8.74981 11.5855 8.75 11.9995C8.75 13.0581 9.60846 13.9165 10.667 13.9165C11.7255 13.9164 12.584 13.058 12.584 11.9995C12.5842 11.5855 12.9199 11.2495 13.334 11.2495C13.7478 11.2498 14.0838 11.5856 14.084 11.9995C14.084 13.058 14.9416 13.9164 16 13.9165C17.0586 13.9165 17.917 13.0581 17.917 11.9995C17.9172 11.5855 18.2529 11.2495 18.667 11.2495C19.081 11.2496 19.4168 11.5855 19.417 11.9995C19.417 13.0581 20.2755 13.9165 21.334 13.9165C22.3924 13.9163 23.25 13.0579 23.25 11.9995C23.2502 11.5855 23.586 11.2496 24 11.2495C24.4141 11.2495 24.7498 11.5855 24.75 11.9995C24.75 13.0581 25.6085 13.9165 26.667 13.9165C27.2772 13.9165 27.8206 13.6319 28.1729 13.1851C28.3772 12.9258 28.4548 12.5905 28.4092 12.1362C28.3624 11.6706 28.1927 11.1555 27.9814 10.6216L26.126 5.93115L26.1221 5.92139L26.1172 5.91162L25.6553 5.00244C25.5209 4.74701 25.4023 4.53493 25.2871 4.354C25.0623 4.00049 24.8853 3.82133 24.6934 3.70264C24.5013 3.5839 24.2615 3.5055 23.8447 3.4624C23.4106 3.41755 22.8541 3.4165 22.0371 3.4165H9.96289Z"></path>
  </mask>
  <path d="M22.0869 1.9165C22.8509 1.91648 23.4816 1.91673 23.999 1.97022C24.5452 2.02668 25.0291 2.14769 25.4814 2.42725C25.9337 2.70674 26.258 3.08521 26.5527 3.54834C26.832 3.98738 27.1142 4.5521 27.4561 5.23584L27.4785 5.27979C27.4882 5.29917 27.4971 5.31868 27.5049 5.33838L29.377 10.0698C29.5979 10.6285 29.8329 11.3044 29.9014 11.9868C29.9712 12.6818 29.8732 13.4509 29.3506 14.1138C28.9115 14.6706 28.3006 15.089 27.5986 15.2876L27.417 15.3394V28.5835H29.334C29.748 28.5837 30.084 28.9194 30.084 29.3335C30.0838 29.7474 29.7479 30.0833 29.334 30.0835H2.66699C2.25289 30.0835 1.91716 29.7476 1.91699 29.3335C1.91699 28.9193 2.25279 28.5835 2.66699 28.5835H4.58398V15.3394L4.40137 15.2876C3.6993 15.0887 3.08857 14.6707 2.64941 14.1138C2.12731 13.4511 2.02891 12.6816 2.09863 11.9868C2.16717 11.3043 2.40303 10.6285 2.62402 10.0698L4.49512 5.33838C4.50308 5.31827 4.51284 5.29901 4.52246 5.27979L4.54395 5.23486C4.8857 4.55131 5.16796 3.98729 5.44727 3.54834C5.74195 3.08522 6.06645 2.70677 6.51855 2.42725C6.9708 2.14774 7.45491 2.02669 8.00098 1.97022C8.51857 1.9167 9.14967 1.91648 9.91406 1.9165H22.0869ZM13.1514 14.3452C12.5282 15.0052 11.6459 15.4165 10.667 15.4165C9.68792 15.4165 8.80488 15.0054 8.18164 14.3452L8 14.1528L7.81836 14.3452C7.40076 14.7874 6.86655 15.1175 6.26562 15.2876L6.08398 15.3394V28.5835H11.917V24.6235C11.917 24.0335 11.9168 23.5403 11.9531 23.1392C11.9913 22.7177 12.0744 22.3236 12.2852 21.9585C12.5265 21.5405 12.874 21.193 13.292 20.9517L13.4307 20.8784C13.7565 20.7209 14.1041 20.653 14.4727 20.6196C14.8739 20.5833 15.3669 20.5835 15.957 20.5835H16.043C16.6333 20.5835 17.127 20.5833 17.5283 20.6196C17.9496 20.6578 18.3438 20.7409 18.709 20.9517C19.1269 21.193 19.4735 21.5406 19.7148 21.9585C19.9256 22.3237 20.0087 22.7177 20.0469 23.1392C20.0832 23.5403 20.084 24.0333 20.084 24.6235V28.5835H25.917V15.3394L25.7354 15.2876C25.1343 15.1176 24.5994 14.7876 24.1816 14.3452L24 14.1528L23.8184 14.3452C23.1952 15.0052 22.3128 15.4164 21.334 15.4165C20.355 15.4165 19.4719 15.0053 18.8486 14.3452L18.667 14.1528L18.4854 14.3452C17.8621 15.0054 16.979 15.4165 16 15.4165C15.0212 15.4165 14.1388 15.0052 13.5156 14.3452L13.334 14.1519L13.1514 14.3452ZM16 22.0835C15.3638 22.0835 14.9363 22.084 14.6084 22.1138C14.2911 22.1425 14.141 22.1934 14.042 22.2505C13.852 22.3602 13.6937 22.5185 13.584 22.7085C13.527 22.8075 13.476 22.9572 13.4473 23.2739C13.4175 23.6019 13.417 24.0299 13.417 24.6665V28.5835H18.584V24.6665C18.584 24.0299 18.5825 23.6019 18.5527 23.2739C18.524 22.957 18.4731 22.8075 18.416 22.7085C18.3064 22.5185 18.1489 22.3602 17.959 22.2505C17.86 22.1934 17.7099 22.1425 17.3926 22.1138C17.0646 22.084 16.6366 22.0835 16 22.0835ZM9.96289 3.4165C9.14595 3.41651 8.58935 3.41753 8.15527 3.4624C7.73877 3.50549 7.49963 3.58403 7.30762 3.70264C7.11554 3.82135 6.93784 4.00048 6.71289 4.354C6.4827 4.71582 6.2375 5.20236 5.88281 5.91162L5.87793 5.92139L5.87402 5.93115L4.01855 10.6216C3.80736 11.1555 3.63761 11.6706 3.59082 12.1362C3.54522 12.5903 3.62291 12.9259 3.82715 13.1851C4.17944 13.6318 4.72376 13.9165 5.33398 13.9165C6.39233 13.9163 7.25 13.0579 7.25 11.9995C7.25019 11.5855 7.586 11.2496 8 11.2495C8.4141 11.2495 8.74981 11.5855 8.75 11.9995C8.75 13.0581 9.60846 13.9165 10.667 13.9165C11.7255 13.9164 12.584 13.058 12.584 11.9995C12.5842 11.5855 12.9199 11.2495 13.334 11.2495C13.7478 11.2498 14.0838 11.5856 14.084 11.9995C14.084 13.058 14.9416 13.9164 16 13.9165C17.0586 13.9165 17.917 13.0581 17.917 11.9995C17.9172 11.5855 18.2529 11.2495 18.667 11.2495C19.081 11.2496 19.4168 11.5855 19.417 11.9995C19.417 13.0581 20.2755 13.9165 21.334 13.9165C22.3924 13.9163 23.25 13.0579 23.25 11.9995C23.2502 11.5855 23.586 11.2496 24 11.2495C24.4141 11.2495 24.7498 11.5855 24.75 11.9995C24.75 13.0581 25.6085 13.9165 26.667 13.9165C27.2772 13.9165 27.8206 13.6319 28.1729 13.1851C28.3772 12.9258 28.4548 12.5905 28.4092 12.1362C28.3624 11.6706 28.1927 11.1555 27.9814 10.6216L26.126 5.93115L26.1221 5.92139L26.1172 5.91162L25.6553 5.00244C25.5209 4.74701 25.4023 4.53493 25.2871 4.354C25.0623 4.00049 24.8853 3.82133 24.6934 3.70264C24.5013 3.5839 24.2615 3.5055 23.8447 3.4624C23.4106 3.41755 22.8541 3.4165 22.0371 3.4165H9.96289Z" fill="white" stroke="#1856ED" stroke-width="3" mask="url(#path-1-inside-1_24450_2897)"></path>
</svg>`;

            // Form update start
            var template_inputsSelectors, template_labelValues;
            if (window.location.pathname.includes('/buynow/')) {
                document.body.classList.add('spz_buynow_page');
                template_inputsSelectors = ["#email", "#new-password"];
                template_labelValues = ["Email", "Password"];
                document.querySelector('.form-headline').innerHTML = `Get 50% off your first 3 months`;
            } else {
                template_inputsSelectors = ["#email", "#new-password", "#given-name", "#family-name", "#tel"];
                template_labelValues = ["Email", "Password", "First Name", "Last Name", "Phone"];
                // document.querySelector('.form-headline').innerHTML = `Free Trial`;
                document.querySelector('.form-headline').insertAdjacentHTML('afterend', `<p class="form-subheadline">No credit card required.</p>`);
                if (document.querySelector('.sign-up-form-visible-legal-t-cs')) {
                    document.querySelector('.sign-up-form-visible-legal-t-cs').parentElement.classList.add('spz_privacy_policy');
                    document.querySelector('.sign-up-form-visible-legal-t-cs p').style.display = 'none';
                    document.querySelector('.sign-up-form-visible-legal-t-cs p').insertAdjacentHTML('beforebegin', `<p class="spz_dummy_text">By clicking "Instant Access", you agree to the <a class="spz_terms" href="javascript:void(0)">Terms of Service</a> and acknowledge receipt of our <a class="spz_privacy" href="javascript:void(0)">Privacy Notice</a>.</p>`)
                    document.querySelector('.spz_dummy_text a.spz_terms').addEventListener('click', () => {
                        document.querySelector('[title="Terms & Conditions - modal link"]').click();
                    });
                    document.querySelector('.spz_dummy_text a.spz_privacy').addEventListener('click', () => {
                        document.querySelector('[title="/signup- Privacy Notice - Link"]').click();
                    });
                }
            }


            // Add required to all inputs

            var checkInput = setInterval(() => {
                if (document.querySelectorAll('#sign-up-form input').length > 0 || document.querySelectorAll('#buy-form-em-pwd-v2-pricing input').length > 0) {
                    clearInterval(checkInput);
                    handleInput(template_inputsSelectors, template_labelValues);
                }
            }, 100);

            function handleInput(inputs, template_labelValues) {
                if (!document.querySelector('#main.main-pricing-signup-page')) {
                    document.querySelector('[data-attr-form-field-id="email"]').insertAdjacentElement('beforebegin', document.querySelector('[data-attr-form-field-id="givenName"]'))
                    document.querySelector('[data-attr-form-field-id="email"]').insertAdjacentElement('beforebegin', document.querySelector('[data-attr-form-field-id="familyName"]'))
                }
                inputs.forEach((item, index) => {
                    const parentDiv = document.querySelector(item).parentElement;
                    const input = document.querySelector(item);
                    const existingLabel = parentDiv.parentElement.querySelector('label:not(.label-spz)');
                    if (existingLabel) existingLabel.style.display = 'none';

                    const label = document.createElement('label');
                    label.innerText = template_labelValues[index];
                    label.classList.add('label-spz');
                    label.classList.add(`label-spz-${item.replace(/[^a-zA-Z0-9]/g, '')}`);
                    label.style.width = '';

                    label.addEventListener('click', function (e) {
                        const actualInput = parentDiv.querySelector('input, select, textarea');
                        if (actualInput) actualInput.focus();
                    });
                    //inserting labels after input.
                    parentDiv.insertBefore(label, input.nextSibling);
                    label.parentElement.classList.add('spz-input-wrap')
                    //adding placeholder to all inputs
                    input.setAttribute('placeholder', template_labelValues[index]);
                    if (input.tagName === 'SELECT') {
                        input.addEventListener('change', () => {
                            if (input.value.length > 0) {
                                input.closest(".spz-input-wrap").classList.add("has-value")
                                input.setAttribute('style', 'color:')
                            } else {
                                input.closest(".spz-input-wrap").classList.remove("has-value")
                                input.setAttribute('style', 'color:rgba(0,0,0,0)!important')
                            }
                        })
                        if (input.value !== '') {
                            parentDiv.classList.add('has-value');
                            input.setAttribute('style', 'color:')
                        } else {
                            input.setAttribute('style', 'color:rgba(0,0,0,0)!important')
                        }
                    }
                });
            }
            // Form update end
            // Qualifyinng questions
            const question1Map = [
                'Email marketing',
                'Social media marketing',
                'SMS marketing',
                'Event promotion & ticketing',
                'Ecommerce integrations',
                'Other/Not listed',
                'Other/Not listed'
            ],
                question2Map = [
                    'Non-profit & events',
                    'Small business',
                    'Real estate',
                    'Agency or freelancer',
                    'Franchisor/Owner',
                    'Government & community',
                    'Healthcare',
                    'Education',
                    'Other'
                ];

            function updateCro2Field() {

                const q1Indices = JSON.parse(localStorage.getItem('selectedQ1') || '[]');
                const q2Indices = JSON.parse(localStorage.getItem('selectedQ2') || '[]');
                const inputSelector = 'input[name="CRO2"]';
                const maxRetryTime = 15000; // total time to keep trying (15s)
                const retryInterval = 200; // retry every 200ms
                const startTime = Date.now();

                const combinedValue = [...q1Indices.map(i => ({ index: i, value: question1Map[i], type: 'q1' })),
                ...q2Indices.map(i => ({ index: i, value: question2Map[i], type: 'q2' }))]
                    .filter(item => item.value)
                    .sort((a, b) => a.index - b.index)
                    .map(item => item.value)
                    .join(', ');


                const setValue = () => {
                    const inputEl = document.querySelector(inputSelector);
                    if (inputEl && combinedValue) {
                        inputEl.value = combinedValue;
                        inputEl.setAttribute('value', combinedValue);
                        return true;
                    }
                    return false;
                };

                const intervalId = setInterval(() => {
                    if (setValue() || Date.now() - startTime > maxRetryTime) {
                        clearInterval(intervalId);
                    }
                }, retryInterval);

                // Observe DOM mutations to handle React/Gatsby re-renders
                const observer = new MutationObserver(() => setValue());
                observer.observe(document.body, { childList: true, subtree: true });

                // Stop observing after maxRetryTime
                setTimeout(() => observer.disconnect(), maxRetryTime);
            }
            // If form submits already
            if (localStorage.getItem('spz-2002-form-filled')) {
                document.querySelector('body').classList.add('spz-hide-qualifying-q');
            } else {
                document.querySelector(template_formUniqueSelector).classList.add('spz-hidden');
            }

            // Checking answers listener
            const selectedQ1 = JSON.parse(localStorage.getItem('selectedQ1')) || [];
            const selectedQ2 = JSON.parse(localStorage.getItem('selectedQ2')) || [];
            if (selectedQ1.length > 0) {
                const q1Items = document.querySelectorAll('.question-item.question-1 .answer-item');
                selectedQ1.forEach(idx => {
                    q1Items[idx]?.classList.add('checked');
                });
            }
            if (selectedQ2.length > 0) {
                const q2Items = document.querySelectorAll('.question-item.question-2 .answer-item');
                selectedQ2.forEach(idx => {
                    q2Items[idx]?.classList.add('checked');
                });
            }
            document.querySelectorAll('.question-item.question-1 .answer-item').forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    item.classList.toggle('checked');

                    // Save all selected indices
                    const checkedIndices = Array.from(document.querySelectorAll('.question-item.question-1 .answer-item'))
                        .map((el, idx) => el.classList.contains('checked') ? idx : null)
                        .filter(i => i !== null);

                    localStorage.setItem('selectedQ1', JSON.stringify(checkedIndices));
                });
            });

            // Checking answers listener
            document.querySelectorAll('.question-item.question-2 .answer-item').forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    item.classList.toggle('checked');

                    // Save all selected indices
                    const checkedIndices = Array.from(document.querySelectorAll('.question-item.question-2 .answer-item'))
                        .map((el, idx) => el.classList.contains('checked') ? idx : null)
                        .filter(i => i !== null);

                    localStorage.setItem('selectedQ2', JSON.stringify(checkedIndices));
                });
            });
            //Next question click listener
            document.querySelectorAll('.next-question').forEach((item, index) => {
                item.addEventListener('click', (e) => {
                    item.parentElement.classList.add('spz-hidden');
                    if (e.target.closest('.question-item.question-2')) {
                        document.querySelector(template_formUniqueSelector).classList.remove('spz-hidden');
                        updateCro2Field();
                    } else {
                        item.parentElement.nextElementSibling.classList.remove('spz-hidden');
                    }
                    document.querySelector('html').scrollTo(0, 0);
                });
            });
        }
    }
}
