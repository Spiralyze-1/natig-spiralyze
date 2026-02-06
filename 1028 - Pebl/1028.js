(function () {
  //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

  // Set the value of the squeezePage variable as needed:
  // true  – if you are using a squeeze page (i.e., the page contains a form)
  // false – if you are not using a squeeze page (i.e., the page does not contain a form)
  // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

  const squeezePage = true // true / false / 'both'
  const expName = '1028' //experiment name should be 1001, 1002, 1003 etc.
  const variantName = `variant_#` + expName //variantName should be _variant, _true_control etc.
  const clientDomain = '.hellopebl.com' //domain should be .spiralyze.com

  const formHiddenValue = variantName
  if (squeezePage === true) {
    window.squeezePageValue = formHiddenValue
  } else if (squeezePage === false) {
    hiddenValue(expName, variantName)
  } else if (squeezePage === 'both') {
    hiddenValue(expName, variantName)
    window.squeezePageValue = formHiddenValue
  }
  function hiddenValue(currentExperimentName, currentExperimentValue) {
    function setCookie(name, value, days) {
      var expires = ''
      if (days) {
        var date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + ';domain=' + clientDomain + ';path=/'
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
    var ExistingExperimentNameList = ExistingExperimentName ? ExistingExperimentName.split(',') : []

    if (!ExistingExperimentName) {
      setCookie('ExperimentName', currentExperimentName, 1)
      setCookie('ExperimentValue', currentExperimentValue, 1)
    } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) == -1) {
      setCookie('ExperimentName', ExistingExperimentName + ',' + currentExperimentName, 1)
      setCookie('ExperimentValue', ExistingExperimentValue + ',' + currentExperimentValue, 1)
    } else if (ExistingExperimentNameList.length > 0 && ExistingExperimentNameList.indexOf(currentExperimentName) > -1) {
      var existingNames = ExistingExperimentName.split(',')
      var existingValues = ExistingExperimentValue.split(',')
      var index = existingNames.indexOf(currentExperimentName)
      existingValues[index] = currentExperimentValue
      setCookie('ExperimentName', existingNames.join(','), 1)
      setCookie('ExperimentValue', existingValues.join(','), 1)
    }
  }
})()

function waitForElement(cssSelector, callback) {
    var stop,
        elementCached,
        timeout,
        check = function () {
            try {
                elementCached = document.querySelector(cssSelector);
                if (stop) return;
                if (elementCached) {
                    callback(elementCached);
                    clearTimeout(timeout);
                } else {
                    window.requestAnimationFrame(check);
                }
            } catch (err) {
                console.log(err);
            }
        };
    window.requestAnimationFrame(check);
    timeout = setTimeout(function () {
        stop = true;
    }, 10000);
}


// Example test: Test number = 5038, Test type = v (variation)
const testNumber = '1028';
const testType = 'v1';

/* Do not change above this line */

waitForElement('#marketo-form-2790-0', (body) => {
    document.body.classList.add(`spz_${testNumber}_${testType}`);
    const mainContent = document.querySelector('.component-content')
    const formTitle = document.querySelector('.main-text-wrap > h1')
    const locationDescriptor = document.querySelector('.mktoFieldcalendlyRoutingPersonLocation')?.children[0]
    const revenueDescriptor = document.querySelector('.mktoFieldcalendlyRoutingRevenue')?.children[1]
    const fieldEmailParent = document.querySelector('.mktoFieldEmail')
    const fieldPhoneParent = document.querySelector('.mktoFieldPhone')
    const textAreaParent = document.querySelector('.mktoFieldHow_can_we_help__c')
    const checkboxInput = document.querySelector('.marketo-checkbox > div > label')
    const rightSideParent = document.querySelector('.content-wrapper')
    const submitButton = document.querySelector('.book-meeting-button')
    const allLabels = document.querySelectorAll('.mktoLabel')

    // add logo at the top
    if(mainContent){
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
        `)
    }


    if(formTitle){
        // change h1 heading text
        formTitle.textContent = 'Get a demo'
    
        // apply g2 review
        formTitle.insertAdjacentHTML('afterend', `
            <div class='spz__trust-badge'>
                <img src='https://res.cloudinary.com/spiralyze/image/upload/v1762508626/pebl/1028/g2_logosvg.svg' alt='G2 logo'>
                <img src='https://res.cloudinary.com/spiralyze/image/upload/v1763037939/pebl/1028/rating_1.svg' alt='G2 stars'>
                <div class="spz__trust-badge__text-content">
                    <strong>4.7</strong>
                    <p>(288 reviews)</p>
                </div>
            </div>    
        `)
    }

    // form field manipulations
    console.log("Form apply start")
    if(fieldEmailParent && locationDescriptor){
        fieldEmailParent.appendChild(locationDescriptor)
        console.log("First location changed")
    }
    if(fieldPhoneParent && revenueDescriptor){
        fieldPhoneParent.appendChild(revenueDescriptor)
        console.log("Second location changed")
    }

    // add comment implementation
    if(textAreaParent){
        const textAreaBody = textAreaParent.querySelector('.mktoFieldDescriptor')
        if(textAreaBody){
            textAreaBody.classList.add('temp_hide')
        }

        textAreaParent.insertAdjacentHTML('afterbegin', `
            <div class='spz__add-comment'>
                <svg width="21" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.832 1.5V7a2.5 2.5 0 002.5 2.5h5.5v1h-5.5a2.5 2.5 0 00-2.5 2.5v5.5h-1V13a2.5 2.5 0 00-2.5-2.5h-5.5v-1h5.5a2.5 2.5 0 002.5-2.5V1.5h1z" fill="#171717" stroke="#171717"/></svg>
                <p>Add a comment</p>
            </div>    
        `)


        const addCommentBtn = document.querySelector('.spz__add-comment')
        if(addCommentBtn){
            addCommentBtn.addEventListener('click', () => {
                addCommentBtn.classList.add('temp_hide')
                textAreaBody.querySelector('#LblHow_can_we_help__c').textContent = 'My comment'
                textAreaBody.classList.remove('temp_hide')
            })
        }

        const textArea = textAreaParent.querySelector('textarea')
        textArea.addEventListener("input", () => {
            textArea.style.height = "56px";          // reset height
            textArea.style.height = textArea.scrollHeight + "px"; 
        });
    }


    // checkbox content
    if(checkboxInput){
        checkboxInput.textContent = 'Looking for a job'
    }

    // right side content
    if(rightSideParent){
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
        `
    }

    // submit button
    if(submitButton){
        submitButton.innerHTML = `
            <span>
                Submit
            </span>
        `
    }

    // remove semicolon from labels
    if (allLabels) {
        allLabels.forEach(item => {
            // Remove : and *
            let text = item.textContent.replace(/[:*]/g, "").trim();

            const parts = text.split(/\s+/);

            if (parts.length > 1) {
                text = parts[0] + " " + parts[1].toLowerCase();
            }

            item.textContent = text;
        });
    }

    


    // Add this after the initial changes
    const observer = new MutationObserver((mutationsList) => {
	    for (const mutation of mutationsList) {
            if(!document.body.classList.contains(`spz_${testNumber}_${testType}`)){
                document.body.classList.add(`spz_${testNumber}_${testType}`);
            }
            if(document.querySelector('#marketo-form-2790-0')){
                console.log('Form field re-added, re-applying changes');
                // Re-run your field manipulation code here
                const locationDescriptor = document.querySelector('.mktoFieldcalendlyRoutingPersonLocation')?.children[0]
                const revenueDescriptor = document.querySelector('.mktoFieldcalendlyRoutingRevenue')?.children[1]
                const fieldEmailParent = document.querySelector('.mktoFieldEmail')
                const fieldPhoneParent = document.querySelector('.mktoFieldPhone')
                if(fieldEmailParent && locationDescriptor){
                    fieldEmailParent.appendChild(locationDescriptor)
                    console.log("First location changed")
                }
                if(fieldPhoneParent && revenueDescriptor){
                    fieldPhoneParent.appendChild(revenueDescriptor) 
                    console.log("Second location changed")
                }
            }
            if(!document.querySelector('.spz__add-comment')){
                const textAreaParent = document.querySelector('.mktoFieldHow_can_we_help__c')
                const textAreaBody = textAreaParent.querySelector('.mktoFieldDescriptor')
                if(textAreaBody){
                    textAreaBody.classList.add('temp_hide')
                }

                textAreaParent.insertAdjacentHTML('afterbegin', `
                    <div class='spz__add-comment'>
                        <svg width="21" height="20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.832 1.5V7a2.5 2.5 0 002.5 2.5h5.5v1h-5.5a2.5 2.5 0 00-2.5 2.5v5.5h-1V13a2.5 2.5 0 00-2.5-2.5h-5.5v-1h5.5a2.5 2.5 0 002.5-2.5V1.5h1z" fill="#171717" stroke="#171717"/></svg>
                        <p>Add a comment</p>
                    </div>    
                `)


                const addCommentBtn = document.querySelector('.spz__add-comment')
                if(addCommentBtn){
                    addCommentBtn.addEventListener('click', () => {
                        addCommentBtn.classList.add('temp_hide')
                        textAreaBody.querySelector('#LblHow_can_we_help__c').textContent = 'My comment'
                        textAreaBody.classList.remove('temp_hide')
                    })
                }
            }
            if(!document.querySelector('.book-meeting-button').querySelector('span')){
                document.querySelector('.book-meeting-button').innerHTML = `
                    <span>
                        Submit
                    </span>
                `
            }

            if(document.querySelector('.marketo-checkbox > div > label').textContent !== "Looking for a job"){
                document.querySelector('.marketo-checkbox > div > label').textContent = "Looking for a job"
            }
        }
	})

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
