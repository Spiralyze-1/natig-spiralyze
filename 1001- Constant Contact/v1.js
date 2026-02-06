//DEV 1/5. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/project/1210751323511158/task/1211597452904841?focus=true`;
//DEV 2/5. Find the class or ID of the control hero section and place it below in "#change_me".  e.g. "#form_123456" or ".form_123456"
const template_heroSelector = `#section-grow-your-business-with-email-marketing-and-more`;
//DEV 3/5. Choose where you redesigned hero section should appear accroding to control hero section row #4
const template_position = "afterbegin"; //"beforebegin", "beforeend", "afterend"
//DEV 4/5. Fill hero content object values. See comments inside for details
const template_heroContent = {
  //[1] Hero eyebrow https://share.cleanshot.com/F7hVvW3B
  contentSuperHeading: "",
  //[2] TrustBadge https://share.cloudinary.com/z57hpqZD
  trustBadge: [
    {
      breakPoint: 768,
      url: "https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/frame_1171275624.svg",
    },
  ],
  //[3] Hero heading https://share.cleanshot.com/phmyLc70
  contentHeading: "Automate email, social, & text marketing.",
  //[4] Hero subheading https://share.cleanshot.com/QcDrCXGs
  contentSubHeading: "What are you most interested in?",
  //[5] Tiles section
  tiles: {
    // Tiles section heading
    tilesHeading: ``,
    tilesItems: [
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/envelopesimpleopen.svg`,
        imageAlt: `email-marketing`,
        tileHeading: `Email marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/instagramlogo.svg`,
        imageAlt: `social-media-marketing`,
        tileHeading: `Social media marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/chatcenteredtext.svg`,
        imageAlt: `sms-marketing`,
        tileHeading: `SMS marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/confetti.svg`,
        imageAlt: `event-marketing-and-ticketing`,
        tileHeading: `Event marketing & ticketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/shoppingbagopen.svg`,
        imageAlt: `ecommerce-marketing`,
        tileHeading: `Ecommerce marketing`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/listdashes.svg`,
        imageAlt: `list-building`,
        tileHeading: `List building`,
      },
      {
        tileImageURL: `https://res.cloudinary.com/spiralyze/image/upload/v1759391921/constantcontact/1001/projectorscreenchart.svg`,
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
      url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_1440.webp",
    },
    {
      breakPoint: 1024,
      url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_1032.webp",
    },
    {
      breakPoint: 768,
      url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_768.webp",
    },
    {
      breakPoint: 320,
      url: "https://res.cloudinary.com/spiralyze/image/upload/f_auto/constantcontact/1001/integration_360.webp",
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
// DEV 5/5. Delete function below before pushing code to A/B testing platform. It's needed only for internal purposes.
function f(a,b){const c=e();return f=function(d,g){d=d-0xc2;let h=c[d];return h;},f(a,b);}function e(){const D=['application/json','pop','cookie','426UBvMKH','FILL\x20ASANA\x20URL\x20VARIABLE!!!!!','stringify','apply','3QHKWXw','Hero\x20Tiles','__proto__','split','task_url','1043696KxobwG','prototype','1050425mmXDTh','then','catch','1215efDoPU','return\x20(function()\x20','search','{}.constructor(\x22return\x20this\x22)(\x20)','table','text','7301JqMJXl','POST','toDateString','trace','8962481qWvMUo','(((.+)+)+)+$','8086YswyGu','constructor','9cjbhGb','5889496GJVQYm','exception','13552ihDYyQ','error','length','log','info','toString','bind','20WuQqXU','11568Nokeob'];e=function(){return D;};return e();}(function(a,b){const v=f,c=a();while(!![]){try{const d=parseInt(v(0xec))/0x1+parseInt(v(0xea))/0x2*(-parseInt(v(0xe5))/0x3)+-parseInt(v(0xd5))/0x4*(-parseInt(v(0xc4))/0x5)+-parseInt(v(0xe1))/0x6*(parseInt(v(0xca))/0x7)+parseInt(v(0xd3))/0x8*(parseInt(v(0xd2))/0x9)+-parseInt(v(0xdc))/0xa*(parseInt(v(0xce))/0xb)+parseInt(v(0xdd))/0xc*(parseInt(v(0xd0))/0xd);if(d===b)break;else c['push'](c['shift']());}catch(g){c['push'](c['shift']());}}}(e,0xf03fd),(function(){const a=(function(){let i=!![];return function(j,k){const l=i?function(){const w=f;if(k){const m=k[w(0xe4)](j,arguments);return k=null,m;}}:function(){};return i=![],l;};}()),c=(function(){let i=!![];return function(j,k){const l=i?function(){const x=f;if(k){const m=k[x(0xe4)](j,arguments);return k=null,m;}}:function(){};return i=![],l;};}());function g(i){const y=f,j=';\x20'+document[y(0xe0)],k=j[y(0xe8)](';\x20'+i+'=');if(k[y(0xd7)]===0x2)return k[y(0xdf)]()['split'](';')['shift']();}function h(){const C=f,i=a(this,function(){const z=f;return i[z(0xda)]()['search']('(((.+)+)+)+$')[z(0xda)]()[z(0xd1)](i)[z(0xc6)](z(0xcf));});i();const j=c(this,function(){const B=f,n=function(){const A=f;let r;try{r=Function(A(0xc5)+A(0xc7)+');')();}catch(s){r=window;}return r;},o=n(),p=o['console']=o['console']||{},q=[B(0xd8),'warn',B(0xd9),B(0xd6),B(0xd4),B(0xc8),B(0xcd)];for(let r=0x0;r<q['length'];r++){const s=c[B(0xd1)][B(0xeb)][B(0xdb)](c),t=q[r],u=p[t]||s;s[B(0xe7)]=c[B(0xdb)](c),s['toString']=u['toString'][B(0xdb)](u),p[t]=s;}});j();let k=g(C(0xe9));const l=new Date()[C(0xcc)]();if(asana_URL==='')alert(C(0xe2));if(asana_URL!==''&&k!==asana_URL){document[C(0xe0)]='task_url='+asana_URL+';\x20max-age=864000';const n='https://t-tracking.spiralyze.com/data';var m={'method':C(0xcb),'headers':{'Content-Type':C(0xde)},'body':JSON[C(0xe3)]({'URL':asana_URL,'date':l,'template':C(0xe6)})};fetch(n,m)[C(0xc2)](o=>o[C(0xc9)]())[C(0xc2)](o=>console['log'](o))[C(0xc3)](o=>console['error'](o));}}h();}()));

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
hiddenValue('#1001 | Constant Contact | Home | Hero Tiles', 'SPZ_1001_V1')

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

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
const testNumber = '1001'
const testType = 'v1'
function addHero(formData, whereToPut, template_heroSelector, template_additionalSection) {

  const heroSection = document.querySelector('#section-grow-your-business-with-email-marketing-and-more')
  const heroForm = document.querySelector('#centered-cta-signupform')

  const formTemplate = `
		<div class="spz-bg-wrap">
			  <div class="content-section">
	            ${
                formData.contentSuperHeading.replace(/\s/g, "").length !== 0
                  ? `<div class="content-superheading">${formData.contentSuperHeading}</div>`
                  : ""
              }
	            ${
                formData.trustBadge.length !== 0
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
			    		<img src="https://res.cloudinary.com/spiralyze/image/upload/v1760518121/constantcontact/1001/stars_2.svg" alt="Trustpilot Rating Stars">
			    		<span>4.1</span>
			    		<span>(1,351 reviews)</span>
		    		</div>
	            </div>`
                  : ""
              }
	            ${
                formData.contentHeading.replace(/\s/g, "").length !== 0
                  ? `<h1 class="content-heading">${formData.contentHeading}</h1>`
                  : ""
              }
	            ${
                formData.contentSubHeading.replace(/\s/g, "").length !== 0
                  ? `<div class="content-subheading">${formData.contentSubHeading}</div>`
                  : ""
              }
	          </div>
	          ${
              formData.tiles.length !== 0
                ? `<div class="tiles-wrap">
	            			<div class="tiles-heading">${formData.tiles.tilesHeading}</div>
	            			<div class="tiles-items">
	            				${formData.tiles.tilesItems
                        .map((item) => {
                          return `<div class="tile-item">
                                       <div class='spz-tiles-check'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <rect x="0.75" y="0.75" width="18.5" height="18.5" rx="5.25" stroke="white" stroke-width="1.5"/>
                                                <path d="M5.71436 10.3636L8.83936 14L15.7144 6" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
	        ${
                typeof formData.heroCTA !== "undefined"
                  ? `<div class="hero-cta-wrap">
	                	<input type="email" id="spz-email" placeholder="Email"/>
	                	<a href=${formData.heroCTA.CTAHref} class="hero-cta">${formData.heroCTA.CTAText}</a>
	                </div>`
                  : ""
            }
	        ${
                typeof template_additionalSection.socialProofLogos !== "undefined"
                ? `<div class="social-proof-logos">
                    <div class="social-proof-heading">${
                template_additionalSection.socialProofLogos.socialProofHeading
                }</div>
                    <picture>
                        ${template_additionalSection.socialProofLogos.socialProofImages
                    .map(
                    (item) =>
                        `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
                    )
                    .join("")}
                        <img src="${
                    template_additionalSection.socialProofLogos.socialProofImages[0].url
                }" alt="Constant Contact Email Marketing" />
                    </picture>
                </div>
                `
                : ``
            }
           
          </div>
            <div id="section-partners">
              ${
                typeof template_additionalSection.interfaceImage !== "undefined"
                ? `<div class="interface-image-wrap">
                    <picture>
                        ${template_additionalSection.interfaceImage
                    .map(
                    (item) =>
                        `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
                    )
                    .join("")}
                        <img src="${
                    template_additionalSection.interfaceImage[0].url
                }" alt="Constant Contact Email Marketing" />
                    </picture>
                </div>
                `
                : ``
          }
        </div>
      `;

      // Auto-center tile on click (mobile only) - Optimized
      function setupTileAutoCenter() {
        const tilesContainer = document.querySelector('.spz_1001_v1 .tiles-items');
        const tileItems = document.querySelectorAll('.spz_1001_v1 .tile-item');
        
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
        tilesContainer.addEventListener('click', function(e) {
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

      // CTA class spz1001_v1
      if(heroSection && heroForm) {
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
            if(heroFormInput) {
                heroFormInput.placeholder = 'Email';
                heroFormInput.removeAttribute('required');
            }
            
            const heroFormButton = heroFormClone.querySelector('button');
            if(heroFormButton) {
                heroFormButton.textContent = 'Free trial';
                heroFormButton.classList.add('spz1001_v1');
            }

            heroFormInput.addEventListener('blur', function(event) {
              if(event.target.value){
                event.target.value = event.target.value.trim()
              }
            })

            // Safari specific issue - remove active state in page initialization
            window.addEventListener('pageshow', function(event) {
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
    document
    .querySelector(template_heroSelector)
    .insertAdjacentHTML(whereToPut, formTemplate);

      setupTileAutoCenter();
}


waitForElement('body', () => {
    const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if(!document.body.classList.contains(`spz_${testNumber}_${testType}`)) {
            document.body.classList.add(`spz_${testNumber}_${testType}`)
        }
        const targetElement = document.querySelector('.type-callout > span')
        if(targetElement && targetElement.textContent == "Grow your business with email marketing and more."){
            
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

waitForElement('#section-grow-your-business-with-email-marketing-and-more', () => {
  document.body.classList.add(`spz_${testNumber}_${testType}`)
})

waitForElement('#section-g-2-badges', () => {
  const trustSection = document.querySelector('#section-g-2-badges')
  trustSection.querySelector('.text-block').innerHTML = `
       <h3>Trusted by experts. Loved by customers.</h3>
        <picture>
          ${template_additionalSection.trustBadgeRow
              .map(
              (item) =>
                  `<source media="(min-width:${item.breakPoint}px)" srcset="${item.url}">`
              )
              .join("")}
                  <img src="${
              template_additionalSection.trustBadgeRow[0].url
          }" alt="Summer 2025 G2 award badges" />
        </picture>
                `
})