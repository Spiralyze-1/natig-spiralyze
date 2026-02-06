console.log("Test SPZ_1008_V2 loading...")
//DEV 1/5. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/project/1210751323511158/task/1211982874665906?focus=true`;
//DEV 2/5. Find the class or ID of the control hero section and place it below in "#change_me".  e.g. "#form_123456" or ".form_123456"
const template_heroSelector = "#features-checkbox-section"
//DEV 3/5. Choose where you redesigned hero section should appear accroding to control hero section row #4
const template_position = "afterbegin"; //"beforebegin", "beforeend", "afterend"
const template_additionalSection = {
    //[7] Interface image after the hero section https://share.cleanshot.com/SR5ZgNQ1
    interfaceImage: [
        {
            breakPoint: 1440,
            url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_1440.webp",
        },
        {
            breakPoint: 1024,
            url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_1032.webp",
        },
        {
            breakPoint: 768,
            url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_768.webp",
        },
        {
            breakPoint: 320,
            url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_360.webp",
        },
    ],
};

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
hiddenValue('#1008 | Constant Contact | Home (Int) | Hero Tiles', 'SPZ_1008_V2')

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
                console.log("Error:", err)
            }
        }
    window.requestAnimationFrame(check)
    timeout = setTimeout(function () {
        stop = true
    }, 10000)
}

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
const testNumber = '1008'
const testType = 'v2'
function addHero(template_heroSelector, template_additionalSection) {

    const formTemplate = `
            <div id="section-partners">
              ${template_additionalSection.interfaceImage.length > 0
            ? `<div class="interface-image-wrap">
                    <picture>
                        ${template_additionalSection.interfaceImage
                .map(
                    (item) =>
                        `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
                )
                .join("")}
                        <img src="${template_additionalSection.interfaceImage[0].url
            }" alt="Constant Contact Email Marketing" />
                    </picture>
                </div>
                `
            : ``
        }
        </div>
      `;

    function initStatsSlider() {
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) return;

        const statsBody = document.querySelector('.spz_stats-body');
        if (!statsBody) return;


        const items = Array.from(statsBody.querySelectorAll('.spz_stats-list_item'));
        const CLONE_SETS = 20; // 20 sets = 80 items total

        // Clone many times
        for (let i = 0; i < CLONE_SETS; i++) {
            items.forEach(item => {
                statsBody.appendChild(item.cloneNode(true));
            });
        }

        let position = 0;
        const SPEED = 0.2; // Adjust speed here

        function animate() {
            position -= SPEED;
            statsBody.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }

        // Critical: no transitions
        statsBody.style.transition = 'none';

        requestAnimationFrame(animate);
    }

    if (document.querySelector(template_heroSelector)) {
        document
            .querySelector(template_heroSelector)
            .insertAdjacentHTML('afterend', formTemplate);
    }

    waitForElement('#centered-cta-siteContactEmailLogin', () => {
        const input = document.querySelector('#centered-cta-siteContactEmailLogin');
        if (input) {
            input.addEventListener('blur', (e) => {
                setTimeout(() => {
                    e.target.setSelectionRange(0, 0);
                    e.target.scrollLeft = 0;
                }, 0);
            });
        }
    });

    waitForElement("#centered-cta-signupform", (docForm) => {
        if (docForm && !document.querySelector('#spz-stats')) { // ← Check if already added
            document.querySelector('.container--features-checkbox-section').insertAdjacentHTML('afterend', `
			    <div id="spz-stats">
			      <ul class="spz_stats-body">
			        <li class="spz_stats-list_item">
			          <div>
			            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1764752137/constantcontact/9001/sent.svg" alt="sent icon"/>
			            <strong>87 billion</strong>
			          </div>
			          <div>
			            <small>customer emails sent annually</small>
			          </div>
			        </li>
			        <li class="spz_stats-list_item">
			          <div>
			            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1764752137/constantcontact/9001/chart-up.svg" alt="chart-up icon"/>
			            <strong>Up to 30x ROI</strong>
			          </div>
			          <div>
			            <small>seen by Constant Contact users*</small>
			          </div>
			        </li>
			        <li class="spz_stats-list_item">
			          <div>
			            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1764752137/constantcontact/9001/target.svg" alt="target icon"/>
			            <strong>98%</strong>
			          </div>
			          <div>
			            <small>best-in-class inbox rate</small>
			          </div>
			        </li>
			        <li class="spz_stats-list_item">
			          <div>
			            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1764752137/constantcontact/9001/thumbs-up.svg" alt="thumbs-up icon"/>
			            <strong>1.5 million</strong>
			          </div>
			          <div>
			            <small>social posts created</small>
			          </div>
			        </li>
			      </ul>
			    </div>
			  `);

            // Initialize slider for mobile
            initStatsSlider();
        }
    })
}

waitForElement('body', () => {
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
                document.body.classList.add(`spz_${testNumber}_${testType}`)
            }

            const targetElement = document.querySelector('.type-callout > span')
            // Check if target exists AND BOTH hero elements don't exist yet
            if (targetElement &&
                targetElement.textContent == "Automate email, social, & text marketing." &&
                !document.querySelector('#spz-stats') &&
                !document.querySelector('#section-partners')) {
                addHero(template_heroSelector, template_additionalSection);
            }

            // Add bottom message check here
            const faqSection = document.querySelector('#section-frequently-asked-questions');
            const messageSection = document.querySelector('#section-bottom-message');

            if (faqSection && !messageSection) {
                faqSection.insertAdjacentHTML('afterend', `
                    <section id="section-bottom-message">
                        <p>*Based on internal ROl calculation (September 2024 - September 2025). Individual results may vary.</p>
                    </section>
                `);
            }
        }
    })
    const config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    };
    observer.observe(document.body, config)
})