//DEV 1/5. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/project/1210751323511158/task/1211940394648450?focus=true`;
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
    // {
    //   breakPoint: 1440,
    //   url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_1440.webp",
    // },
    // {
    //   breakPoint: 1024,
    //   url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_1032.webp",
    // },
    // {
    //   breakPoint: 768,
    //   url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_768.webp",
    // },
    // {
    //   breakPoint: 320,
    //   url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/9001/integration_360.webp",
    // },
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
hiddenValue('#9001 | Constant Contact | Home (Int) | Hero Tiles', 'SPZ_9001_V1')

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
const testType = 'v1'
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
    const wrapper = document.querySelector('.spz_stats-wrapper');
    const slider = document.querySelector('.spz_stats-body');
    const slides = document.querySelectorAll('.spz_stats-list_item');
    const dots = document.querySelectorAll('.spz_stats-dot');

    if (!wrapper || !slider || slides.length === 0) return;

    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false; // Track if user actually moved
    let startTranslate = 0;
    let isSliderActive = false;
    let eventListenersAttached = false;

    // Minimum distance to consider as a drag (in pixels)
    const DRAG_THRESHOLD = 10;

    // Check if slider should be active
    function shouldActivateSlider() {
      return window.innerWidth < 768;
    }

    // Update slider position
    function updateSlider(animate = true) {
      if (!isSliderActive) return;

      if (animate) {
        slider.style.transition = 'transform 0.3s ease-out';
      } else {
        slider.style.transition = 'none';
      }

      const translateX = -currentIndex * 100;
      slider.style.transform = `translateX(${translateX}%)`;

      // Update pagination
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    // Go to specific slide
    function goToSlide(index) {
      if (!isSliderActive) return;
      currentIndex = index;
      updateSlider(true);
    }

    // Next slide with infinite loop
    function nextSlide() {
      if (!isSliderActive) return;
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider(true);
    }

    // Previous slide with infinite loop
    function prevSlide() {
      if (!isSliderActive) return;
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider(true);
    }

    // Touch/Mouse events for dragging
    function handleStart(e) {
      if (!isSliderActive) return;

      isDragging = true;
      hasMoved = false; // Reset movement flag
      startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      currentX = startX; // Initialize currentX
      startTranslate = -currentIndex * 100;

      // Don't add dragging class yet - wait for movement
      slider.style.transition = 'none';
    }

    function handleMove(e) {
      if (!isDragging || !isSliderActive) return;

      currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
      const diff = currentX - startX;

      // Check if user has moved beyond threshold
      if (!hasMoved && Math.abs(diff) > DRAG_THRESHOLD) {
        hasMoved = true;
        wrapper.classList.add('dragging');
      }

      // Only update position if user has moved
      if (hasMoved) {
        e.preventDefault();
        const diffPercent = (diff / wrapper.offsetWidth) * 100;
        slider.style.transform = `translateX(${startTranslate + diffPercent}%)`;
      }
    }

    function handleEnd(e) {
      if (!isDragging || !isSliderActive) return;

      isDragging = false;
      wrapper.classList.remove('dragging');

      // Only change slide if user actually dragged (not just clicked)
      if (hasMoved) {
        const diff = currentX - startX;
        const threshold = wrapper.offsetWidth * 0.2; // 20% of width

        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            prevSlide();
          } else {
            nextSlide();
          }
        } else {
          // Didn't drag far enough, snap back
          updateSlider(true);
        }
      } else {
        // Was just a click, not a drag - do nothing (or snap back)
        updateSlider(true);
      }

      hasMoved = false; // Reset for next interaction
    }

    // Pagination click handler
    function handleDotClick(e) {
      if (!isSliderActive) return;
      const index = parseInt(e.target.dataset.index);
      goToSlide(index);
    }

    // Attach event listeners
    function attachEventListeners() {
      if (eventListenersAttached) return;

      // Mouse events
      wrapper.addEventListener('mousedown', handleStart);
      wrapper.addEventListener('mousemove', handleMove);
      wrapper.addEventListener('mouseup', handleEnd);
      wrapper.addEventListener('mouseleave', handleEnd);

      // Touch events
      wrapper.addEventListener('touchstart', handleStart, { passive: true });
      wrapper.addEventListener('touchmove', handleMove, { passive: false });
      wrapper.addEventListener('touchend', handleEnd);

      // Pagination clicks
      dots.forEach((dot) => {
        dot.addEventListener('click', handleDotClick);
      });

      eventListenersAttached = true;
    }

    // Activate slider mode
    function activateSlider() {
      isSliderActive = true;
      currentIndex = 0;
      attachEventListeners();
      updateSlider(false);
    }

    // Deactivate slider mode
    function deactivateSlider() {
      isSliderActive = false;
      isDragging = false;
      hasMoved = false;
      wrapper.classList.remove('dragging');

      slider.style.transform = '';
      slider.style.transition = '';

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots.length > 0) {
        dots[0].classList.add('active');
      }
    }

    // Handle resize/orientation change
    function handleResize() {
      const shouldBeActive = shouldActivateSlider();

      if (shouldBeActive && !isSliderActive) {
        activateSlider();
      } else if (!shouldBeActive && isSliderActive) {
        deactivateSlider();
      } else if (shouldBeActive && isSliderActive) {
        updateSlider(false);
      }
    }

    // Debounced resize handler
    let resizeTimer;
    function debouncedResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    }

    // Listen for resize and orientation changes
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 200);
    });

    // Initialize
    attachEventListeners();
    if (shouldActivateSlider()) {
      activateSlider();
    } else {
      deactivateSlider();
    }

    // Cleanup function
    return function cleanup() {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }


  // Auto-center tile on click (mobile only) - Optimized
  function setupTileAutoCenter() {
    const tilesContainer = document.querySelector('.spz_9001_v1 .tiles-items');
    const tileItems = document.querySelectorAll('.spz_9001_v1 .tile-item');

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

  // CTA class spz9001_v1
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
        heroFormButton.classList.add('spz9001_v1');
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

  waitForElement(template_heroSelector, (docForm) => {
    if (docForm && !document.querySelector('#spz-stats')) {
      docForm.insertAdjacentHTML('afterend', `
      <div id="spz-stats">
        <div class="spz_stats-wrapper">
          <ul class="spz_stats-body">
            <li class="spz_stats-list_item">
              <strong>87B</strong>
              <small>customer emails sent annually</small>
            </li>
            <li class="spz_stats-list_item">
              <strong>Up to 30x ROI</strong>
              <small>seen by Constant Contact users*</small>
            </li>
            <li class="spz_stats-list_item">
              <strong>98%</strong>
              <small>best-in-class inbox rate</small>
            </li>
            <li class="spz_stats-list_item">
              <strong>1.5M</strong>
              <small>social posts created</small>
            </li>
          </ul>
        </div>
        <div class="spz_stats-pagination">
          <span class="spz_stats-dot active" data-index="0"></span>
          <span class="spz_stats-dot" data-index="1"></span>
          <span class="spz_stats-dot" data-index="2"></span>
          <span class="spz_stats-dot" data-index="3"></span>
        </div>
      </div>
    `);

      // Initialize slider for mobile
      initStatsSlider();
    }
  })

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

  setupTileAutoCenter();

}

waitForElement('body', () => {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
        document.body.classList.add(`spz_${testNumber}_${testType}`)
      }

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
