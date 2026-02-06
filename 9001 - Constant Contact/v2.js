//DEV 1/5. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/project/1210751323511158/task/1212286411602136?focus=true`;
//DEV 2/5. Find the class or ID of the control hero section and place it below in "#change_me".  e.g. "#form_123456" or ".form_123456"
const window_pathname = window.location.pathname.split('/')[1];
// if(window_pathname == "uk"){
//     document.querySelector('section').setAttribute('id', 'uk-homepage-hero-section')
// }
const template_heroSelector = window_pathname == "uk" ? '.section-3KuHTr8R64VM5c1b83BxmM' : `#${window_pathname}-homepage-hero-section`;
console.log("Template", window_pathname)
//DEV 3/5. Choose where you redesigned hero section should appear accroding to control hero section row #4
const template_position = "afterbegin"; //"beforebegin", "beforeend", "afterend"
//DEV 4/5. Fill hero content object values. See comments inside for details
const template_heroContent = {
  //[1] Hero eyebrow https://share.cleanshot.com/F7hVvW3B
  contentSuperHeading: "",
  //[2] TrustBadge https://share.cloudinary.com/z57hpqZD
  trustBadge: [
    // {
    //   breakPoint: 768,
    //   url: "https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/trustpilot-logo.svg",
    // },
  ],
  //[3] Hero heading https://share.cleanshot.com/phmyLc70
  contentHeading: "Automate all your social & email marketing.",//
  //[4] Hero subheading https://share.cleanshot.com/QcDrCXGs
  contentSubHeading: "What are you most interested in?",
  //[5] Tiles section
  tiles: {
    // Tiles section heading
    tilesHeading: ``,
    tilesItems: [
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117288/constantcontact/9001/envelopesimpleopen_1.svg`,
        imageAlt: `email-marketing`,
        tileHeading: `Email marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/instagramlogo.svg`,
        imageAlt: `social-media-marketing`,
        tileHeading: `Social media marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/ai-content-generator.svg`,
        imageAlt: `ai-content-generation`,
        tileHeading: `AI content generation`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117288/constantcontact/9001/confetti_1.svg`,
        imageAlt: `event-marketing-and-ticketing`,
        tileHeading: `Event marketing & ticketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/shoppingbagopen.svg`,
        imageAlt: `ecommerce-marketing`,
        tileHeading: `Ecommerce marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/listdashes.svg`,
        imageAlt: `list-building`,
        tileHeading: `List building`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1763117289/constantcontact/9001/projectorscreenchart_1.svg`,
        imageAlt: `reporting-and-analytics`,
        tileHeading: `Reporting & analytics`,
      },
    ],
  },
  //[6] Hero CTA - Removed as you're using form
  heroCTA: undefined,
};
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
  //[8] Social proof logos with heading after interface image - Removed
  socialProofLogos: undefined,
  trustBadgeRow: [
    {
      breakPoint: 768,
      url: "https://res.cloudinary.com/spiralyze/image/upload/v1760538992/constantcontact/1001/1440.svg",
    },
    {
      breakPoint: 0,
      url: "https://res.cloudinary.com/spiralyze/image/upload/v1760538992/constantcontact/1001/360.svg",
    },
  ]
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
hiddenValue('#9001 | Constant Contact | Home (Int) | Hero Tiles', 'SPZ_9001_V2')

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
  }, 10000)
}

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
const testNumber = '9001'
const testType = 'v2'
function addHero(formData, whereToPut, template_heroSelector, template_additionalSection) {

  const heroSection = document.querySelector(template_heroSelector)
  const heroForm = document.querySelector('#centered-cta-signupform')

  const formTemplate = `
		<div class="spz-bg-wrap">
		<div class="column-content__eyebrow"><h1 class="column-content__intro-text margin-bottom-0"><span>Email Marketing</span></h1></div>
			  <div class="content-section">
	            ${formData.contentSuperHeading.replace(/\s/g, "").length !== 0
      ? `<div class="content-superheading">${formData.contentSuperHeading}</div>`
      : ""
    }
	            ${formData.trustBadge.length !== 0
      ? `<div class="trust-badge">
	            	<picture>
		              ${formData.trustBadge
        .map(
          (item) =>
            `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
        )
        .join("")}
		              <img src="${formData.trustBadge[0].url}" alt="Trustpilot Logo" />
                      </picture>
                      <div class="spz-baseline-rating">
			    		<img src="https://res.cloudinary.com/spiralyze/image/upload/v1763117287/constantcontact/9001/stars.svg" alt="Trustpilot Rating Stars">
			    		<span>4.0</span>
			    		<span>(1,366 reviews)</span>
		    		</div>
	            </div>`
      : ""
    }
	            ${formData.contentHeading.replace(/\s/g, "").length !== 0
      ? `<h1 class="content-heading">${formData.contentHeading}</h1>`
      : ""
    }
	            ${formData.contentSubHeading.replace(/\s/g, "").length !== 0
      ? `<div class="content-subheading">${formData.contentSubHeading}</div>`
      : ""
    }
	          </div>
	          ${formData.tiles.length !== 0
      ? `<div class="tiles-wrap">
	            			<div class="tiles-heading">${formData.tiles.tilesHeading}</div>
	            			<div class="tiles-items">
	            				${formData.tiles.tilesItems
        .map((item) => {
          return `<div class="tile-item">
                                       <div class='spz-tiles-check'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="5.25" stroke="white" stroke-width="1.5"></rect>
                                                <path d="M5.71436 10.3636L8.83936 14L15.7144 6" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>
                                        </div>
                                        <img src="${item.tileImageURL}" class="tile-image" alt="${item.imageAlt}"/>
	            						<div class="wrap-tile-info">
		            						<div class="tile-heading">${item.tileHeading}</div>
		            					</div>
	            					</div>`;
        })
        .join("")}
	            			</div>
	            		</div>`
      : ``
    }
	        ${typeof formData.heroCTA !== "undefined"
      ? `<div class="hero-cta-wrap">
	                	<input type="email" id="spz-email" placeholder="Email"/>
	                	<a href=${formData.heroCTA.CTAHref} class="hero-cta">${formData.heroCTA.CTAText}</a>
	                </div>`
      : ""
    }
	        ${typeof template_additionalSection.socialProofLogos !== "undefined"
      ? `<div class="social-proof-logos">
                    <div class="social-proof-heading">${template_additionalSection.socialProofLogos.socialProofHeading
      }</div>
                    <picture>
                        ${template_additionalSection.socialProofLogos.socialProofImages
        .map(
          (item) =>
            `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
        )
        .join("")}
                        <img src="${template_additionalSection.socialProofLogos.socialProofImages[0].url
      }" alt="Constant Contact Email Marketing" />
                    </picture>
                </div>
                `
      : ``
    }
           
          </div>
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

  // Auto-center tile on click (mobile only) - Optimized
  function setupTileAutoCenter() {
    const tilesContainer = document.querySelector('.spz_9001_v2 .tiles-items');
    const tileItems = document.querySelectorAll('.spz_9001_v2 .tile-item');

    if (!tilesContainer || !tileItems.length) return;

    // Cache mobile check
    let isMobileCache = null;
    const checkMobile = () => {
      if (isMobileCache === null) {
        isMobileCache = tilesContainer.scrollWidth > tilesContainer.clientWidth;
      }
      return isMobileCache;
    };

    // Reset cache on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => isMobileCache = null, 200);
    }, { passive: true });

    // Use event delegation for better performance
    tilesContainer.addEventListener('click', function (e) {
      const tileItem = e.target.closest('.tile-item');
      if (!tileItem) return;

      e.stopPropagation();

      // Toggle active state
      tileItem.classList.toggle('active');

      // Auto-center on mobile
      if (checkMobile()) {
        tileItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, { passive: false });
  }

  // CTA class spz9001_v2
  if (heroSection && heroForm) {
    // Check if form already exists to prevent duplicates
    if (document.querySelector('.spz-bg-wrap #centered-cta-signupform')) {
      return;
    }

    // Clone the form instead of moving it
    const heroFormClone = heroForm.cloneNode(true);

    // Add a unique identifier to prevent duplicate appending
    heroFormClone.setAttribute('data-spz-cloned', 'true');

    // Hide original form
    heroForm.style.display = 'none';

    // Clear hero section and add cloned form
    heroSection.innerHTML = '';

    // Use a flag to prevent multiple appends
    let formAppended = false;

    waitForElement('.spz-bg-wrap', () => {
      // Double-check if form was already appended
      if (formAppended) {
        return;
      }

      const spzBgWrap = document.querySelector('.spz-bg-wrap');

      // Check if form already exists in spz-bg-wrap
      if (spzBgWrap.querySelector('#centered-cta-signupform')) {
        formAppended = true;
        return;
      }

      // Create wrapper div for form content
      const formWrapper = document.createElement('div');
      formWrapper.className = 'spz_form_wrapper';

      // Move all children of cloned form into wrapper
      while (heroFormClone.firstChild) {
        formWrapper.appendChild(heroFormClone.firstChild);
      }

      // Append wrapper to cloned form
      heroFormClone.appendChild(formWrapper);

      spzBgWrap.appendChild(heroFormClone);
      formAppended = true;

      // Modify form inputs after appending
      const heroFormInput = heroFormClone.querySelector('input');
      if (heroFormInput) {
        heroFormInput.placeholder = 'Email';
        heroFormInput.removeAttribute('required');
      }

      const heroFormButton = heroFormClone.querySelector('button');
      if (heroFormButton) {
        heroFormButton.textContent = 'Free trial';
        heroFormButton.classList.add('spz9001_v2');
      }

      heroFormInput.addEventListener('blur', function (event) {
        if (event.target.value) {
          event.target.value = event.target.value.trim()
        }
      })

      // Safari specific issue - remove active state in page initialization
      window.addEventListener('pageshow', function (event) {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
          const button = heroFormButton;
          if (button) {
            button.blur();
            button.classList.remove('active');
          }
        }
      }, { once: true });
    });
  }
  if (document.querySelector(template_heroSelector)) {
    document
      .querySelector(template_heroSelector)
      .insertAdjacentHTML(whereToPut, formTemplate);
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
      docForm.insertAdjacentHTML('afterend', `
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

  setupTileAutoCenter();
}


waitForElement('body', () => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
        document.body.classList.add(`spz_${testNumber}_${testType}`)
      }
      // if(window_pathname == "uk" && 
      // !document.querySelector('section').setAttribute('id', 'uk-homepage-hero-section')){
      // 	console.log("added")
      // 	document.querySelector('section').setAttribute('id', 'uk-homepage-hero-section')
      // }
      const targetElement = document.querySelector('.type-callout > span')
      if (targetElement && targetElement.textContent == "Grow your business with email marketing and more.") {
        addHero(
          template_heroContent, //object with the data
          template_position, //any value you pass using insertAdjacentHTML
          template_heroSelector,
          template_additionalSection
        );
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

waitForElement(template_heroSelector, () => {
  document.body.classList.add(`spz_${testNumber}_${testType}`)
})

waitForElement("#ca-stats-test-section-cards", (block) => {
  const allParagraphs = block.querySelectorAll("p")
  if (allParagraphs) {
    allParagraphs.forEach(item => {
      if (item.innerText === "customer emails sent in 2024") {
        item.textContent = "customer emails sent annually"
      }
    });
  }
})
