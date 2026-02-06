(function () {
  const squeezePage = true;
  const expName = '1028';
  const variantName = `variant_#${expName}`;
  const clientDomain = '.hellopebl.com';

  const formHiddenValue = variantName;
  
  if (squeezePage === true) {
    window.squeezePageValue = formHiddenValue;
  } else if (squeezePage === false) {
    hiddenValue(expName, variantName);
  } else if (squeezePage === 'both') {
    hiddenValue(expName, variantName);
    window.squeezePageValue = formHiddenValue;
  }

  function hiddenValue(currentExperimentName, currentExperimentValue) {
    function setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = '; expires=' + date.toUTCString();
      document.cookie = `${name}=${value || ''}${expires};domain=${clientDomain};path=/`;
    }

    function getCookie(name) {
      const nameEQ = name + '=';
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trimStart();
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length);
      }
      return null;
    }

    const ExistingExperimentName = getCookie('ExperimentName');
    const ExistingExperimentValue = getCookie('ExperimentValue');
    const ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(',') : [];

    if (!ExistingExperimentName) {
      setCookie('ExperimentName', currentExperimentName, 1);
      setCookie('ExperimentValue', currentExperimentValue, 1);
    } else {
      const index = ExistingExperimentNameList.indexOf(currentExperimentName);
      
      if (index === -1) {
        setCookie('ExperimentName', `${ExistingExperimentName},${currentExperimentName}`, 1);
        setCookie('ExperimentValue', `${ExistingExperimentValue},${currentExperimentValue}`, 1);
      } else {
        const existingNames = ExistingExperimentNameList;
        const existingValues = ExistingExperimentValue.split(',');
        existingValues[index] = currentExperimentValue;
        setCookie('ExperimentName', existingNames.join(','), 1);
        setCookie('ExperimentValue', existingValues.join(','), 1);
      }
    }
  }
})();

function waitForElement(cssSelector, callback) {
  let stop = false;
  let elementCached;
  
  const check = function () {
    if (stop) return;
    
    elementCached = document.querySelector(cssSelector);
    if (elementCached) {
      callback(elementCached);
    } else {
      requestAnimationFrame(check);
    }
  };
  
  requestAnimationFrame(check);
  
  setTimeout(() => {
    stop = true;
  }, 10000);
}

const testNumber = '1028';
const testType = 'v1';
const bodyClass = `spz_${testNumber}_${testType}`;

waitForElement('#marketo-form-2790-0', () => {
    document.body.classList.add(bodyClass);
    
    // Cache selectors
    const mainContent = document.querySelector('.component-content');
    const formTitle = document.querySelector('.main-text-wrap > h1');
    const rightSideParent = document.querySelector('.content-wrapper');
    const submitButton = document.querySelector('.book-meeting-button');
    const allLabels = document.querySelectorAll('.mktoLabel');
    const checkboxInput = document.querySelector('.marketo-checkbox > div > label');
    
    // Add logo
    if (mainContent) {
        mainContent.insertAdjacentHTML('beforebegin', `
            <div class="spz__company-logo">
                <a href="https://hellopebl.com/">
                    <picture>
                        <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo.svg">
                        <source media="(max-width: 767px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/v1761075224/pebl/1028/logo_1.svg">
                        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo.svg" alt="Home">
                    </picture>
                </a>
            </div>    
        `);
    }

    if (formTitle) {
        formTitle.textContent = 'Get a demo';
        formTitle.insertAdjacentHTML('afterend', `
            <div class='spz__trust-badge'>
                <img src='https://res.cloudinary.com/spiralyze/image/upload/v1762508626/pebl/1028/g2_logosvg.svg' alt='G2 logo'>
                <img src='https://res.cloudinary.com/spiralyze/image/upload/v1763037939/pebl/1028/rating_1.svg' alt='G2 stars'>
                <div class="spz__trust-badge__text-content">
                    <strong>4.7</strong>
                    <p>(288 reviews)</p>
                </div>
            </div>    
        `);
    }

    // Function to manipulate form fields
    function manipulateFormFields() {
        const locationDescriptor = document.querySelector('.mktoFieldcalendlyRoutingPersonLocation')?.children[0];
        const revenueDescriptor = document.querySelector('.mktoFieldcalendlyRoutingRevenue')?.children[1];
        const fieldEmailParent = document.querySelector('.mktoFieldEmail');
        const fieldPhoneParent = document.querySelector('.mktoFieldPhone');
        
        if (fieldEmailParent && locationDescriptor) {
            fieldEmailParent.appendChild(locationDescriptor);
        }
        if (fieldPhoneParent && revenueDescriptor) {
            fieldPhoneParent.appendChild(revenueDescriptor);
        }
    }
    
    manipulateFormFields();

    // Add comment implementation
    const textAreaParent = document.querySelector('.mktoFieldHow_can_we_help__c');
    let wasApplied = false
    if (textAreaParent) {
        const textAreaBody = textAreaParent.querySelector('.mktoFieldDescriptor');
        if (textAreaBody) {
            textAreaBody.classList.add('temp_hide');
        }

        textAreaParent.insertAdjacentHTML('afterbegin', `
            <div class='spz__add-comment'>
                <svg width="21" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.832 1.5V7a2.5 2.5 0 002.5 2.5h5.5v1h-5.5a2.5 2.5 0 00-2.5 2.5v5.5h-1V13a2.5 2.5 0 00-2.5-2.5h-5.5v-1h5.5a2.5 2.5 0 002.5-2.5V1.5h1z" fill="#171717" stroke="#171717"/></svg>
                <p>Add a comment</p>
            </div>    
        `);

        const addCommentBtn = textAreaParent.querySelector('.spz__add-comment');
        if (addCommentBtn) {
            addCommentBtn.addEventListener('click', () => {
                addCommentBtn.classList.add('temp_hide');
                textAreaBody.querySelector('#LblHow_can_we_help__c').textContent = 'My comment';
                textAreaBody.classList.remove('temp_hide');
            }, { once: true });
        }

        /* const textArea = textAreaParent.querySelector('textarea');
        if (textArea) {
            wasApplied = true
            textArea.addEventListener("input", function() {
                if(this.scrollHeight < 56) return
                this.style.height = "56px";
                this.style.height = this.scrollHeight + "px";
            });
        } */
    }

    if (checkboxInput) {
        checkboxInput.textContent = 'Looking for a job';
    }

    if (rightSideParent) {
        rightSideParent.innerHTML = `
            <div class='spz__main-image'>
                <picture>
                    <source media="(min-width: 768px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/1028/ui_img.webp">
                    <source media="(max-width: 767px)" srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/1028/ui_img_1.webp">
                    <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/pebl/1028/ui_img.webp" alt="Pebl product visualization">
                </picture>
            </div>
            <div class='spz__partners-logos'>
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo_01.svg" alt="LastPass logo">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo_02.svg" alt="Crunchbase logo">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo_03.svg" alt="Attentive logo">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo_04.svg" alt="Materialize logo">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761075222/pebl/1028/logo_05.svg" alt="Consensys logo">
            </div>    
        `;
    }

    if (submitButton) {
        submitButton.innerHTML = '<span>Submit</span>';
    }

    if (allLabels.length) {
        allLabels.forEach(item => {
            let text = item.textContent.replace(/[:*]/g, "").trim();
            const parts = text.split(/\s+/);
            if (parts.length > 1) {
                text = parts[0] + " " + parts[1].toLowerCase();
            }
            item.textContent = text;
        });
    }

    // Optimized observer with debouncing
    let debounceTimer;
    const observer = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            if (!document.body.classList.contains(bodyClass)) {
                document.body.classList.add(bodyClass);
            }
            
            if (document.querySelector('#marketo-form-2790-0')) {
                manipulateFormFields();
            }
            
            if (!document.querySelector('.spz__add-comment') && document.querySelector('.mktoFieldHow_can_we_help__c')) {
                const textAreaParent = document.querySelector('.mktoFieldHow_can_we_help__c');
                const textAreaBody = textAreaParent.querySelector('.mktoFieldDescriptor');
                if (textAreaBody) {
                    textAreaBody.classList.add('temp_hide');
                    textAreaParent.insertAdjacentHTML('afterbegin', `
                        <div class='spz__add-comment'>
                            <svg width="21" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.832 1.5V7a2.5 2.5 0 002.5 2.5h5.5v1h-5.5a2.5 2.5 0 00-2.5 2.5v5.5h-1V13a2.5 2.5 0 00-2.5-2.5h-5.5v-1h5.5a2.5 2.5 0 002.5-2.5V1.5h1z" fill="#171717" stroke="#171717"/></svg>
                            <p>Add a comment</p>
                        </div>    
                    `);
                    
                    const addCommentBtn = textAreaParent.querySelector('.spz__add-comment');
                    if (addCommentBtn) {
                        addCommentBtn.addEventListener('click', () => {
                            addCommentBtn.classList.add('temp_hide');
                            textAreaBody.querySelector('#LblHow_can_we_help__c').textContent = 'My comment';
                            textAreaBody.classList.remove('temp_hide');
                        }, { once: true });
                    }
                }
            }
            
            const btn = document.querySelector('.book-meeting-button');
            if (btn && !btn.querySelector('span')) {
                btn.innerHTML = '<span>Submit</span>';
            }

            const checkbox = document.querySelector('.marketo-checkbox > div > label');
            if (checkbox && checkbox.textContent !== "Looking for a job") {
                checkbox.textContent = "Looking for a job";
            }

            /* if(!wasApplied){
                const textArea = document.querySelector('.mktoFieldHow_can_we_help__c textarea');
                if (textArea) {
                    wasApplied = true
                    textArea.addEventListener("input", function() {
                        if(this.scrollHeight < 56) return
                        this.style.height = "56px";
                        this.style.height = this.scrollHeight + "px";
                    });
                }
            } */
        }, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});