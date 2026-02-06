if (window.location.pathname != '/') {


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
    hiddenValue('#2002 | Constant Contact | Free Trial | Qualifying Questions', 'SPZ_2002_V2')

    const template_triageData = [
        //Question 1 start
        {
            questionHeading: "What do you want to achieve with your marketing?",
            answers: [
                {
                    answerText: `Win more new customers`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconevent-promotion_1.svg'
                },
                {
                    answerText: `Increase repeat <br> business`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconecommerce-integrations_1.svg'
                },
                {
                    answerText: `Boost donations<br> & sales`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconnon0profit_1.svg'
                },
                {
                    answerText: `Grow brand<br> awareness`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720321/constantcontact/2002/iconeducation_5.svg'
                },
                {
                    answerText: `Build an online <br>following`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/icondedicated-in_house-team_1.svg'
                },
                {
                    answerText: `Other /<br>not sure`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconother_1.svg'
                }
            ]
        },
        //Question 1 end
        //Question 2 start
        {
            questionHeading: "Have you done any marketing before?",
            answers: [
                {
                    answerText: `No, this is my first <br>email campaign`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720327/constantcontact/2002/iconeducation_9.svg'
                },
                {
                    answerText: `A little,<br> I’ve tried a few things`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720322/constantcontact/2002/iconeducation_6.svg'
                },
                {
                    answerText: `Yes, I do it regularly`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720325/constantcontact/2002/iconeducation_8.svg'
                },
                {
                    answerText: `Not sure`,
                    answerImage: 'https://res.cloudinary.com/spiralyze/image/upload/v1761720320/constantcontact/2002/iconother_1.svg'
                }
            ]
        }
        //Question 2 end
    ]

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

    //DEV 1/6. Put your asana task URL here
    const asana_URL = `https://app.asana.com/1/77217210692853/project/1199937683692504/task/1211388351064864?focus=true`

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
        document.body.classList.add('spz_2002_v2');
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
                'Win more new customers',
                'Increase repeat business',
                'Boost donations & sales',
                'Grow brand awareness',
                'Build an online following',
                'Other/not sure'
            ],
                question2Map = [
                    'No, this is my first email campaign',
                    'A little, I’ve tried a few things',
                    'Yes, I do it regularly',
                    'Not sure'
                ];

            function updateCro2Field() {

                const q1Indices = JSON.parse(localStorage.getItem('selectedQ1') || '[]');
                const q2Index = localStorage.getItem('selectedQ2');

                const q1Values = q1Indices.map(i => question1Map[i]).filter(Boolean);
                const q2Value = question2Map[q2Index] || '';
                const combinedValue = [...q1Values, q2Value].filter(Boolean).join(', ');
                const inputSelector = 'input[name="CRO2"]';
                const maxRetryTime = 15000; // total time to keep trying (15s)
                const retryInterval = 200; // retry every 200ms
                const startTime = Date.now();


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
                if (document.querySelector('.question-item.question-1')) {
                    document.querySelector('.question-item.question-1').classList.add('spz-hidden');
                }
            } else {
                document.querySelector(template_formUniqueSelector).classList.add('spz-hidden');
            }

            // Checking answers listener
            const selectedQ1 = JSON.parse(localStorage.getItem('selectedQ1')) || [];
            const selectedQ2 = localStorage.getItem('selectedQ2');
            if (selectedQ1.length > 0) {
                const q1Items = document.querySelectorAll('.question-item.question-1 .answer-item');
                selectedQ1.forEach(idx => {
                    q1Items[idx]?.classList.add('checked');
                });
            }
            if (selectedQ2) {
                const q2Items = document.querySelectorAll('.question-item.question-2 .answer-item');
                q2Items[selectedQ2]?.classList.add('checked');
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
                    document.querySelectorAll('.question-item.question-2 .answer-item').forEach((ele) => {
                        ele.classList.remove('checked');
                    });
                    const clickedItem = e.currentTarget;
                    clickedItem.classList.add('checked');

                    // Save selected index
                    localStorage.setItem('selectedQ2', index);
                    document.querySelector('.question-item.question-2').classList.add('spz-hidden');
                    document.querySelector(template_formUniqueSelector).classList.remove('spz-hidden');
                    updateCro2Field();
                    document.querySelector('html').scrollTo(0, 0);
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
