function waitForElement(selector, callback, timeout = 5000) {
    const el = document.querySelector(selector);
    if (el) return callback(el);

    const observer = new MutationObserver((_, obs) => {
        const el = document.querySelector(selector);
        if (el) {
            obs.disconnect();
            callback(el);
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), timeout);
}

const testNumber = "4002";
const testType = "v1";
const accordionTitles = ["Bills", "Expenses", "Invoicing", "Collaboration", "Integrations", "Partner Perks"]

waitForElement('.tables-section', () => {
    const body = document.body
    const className = `spz_${testNumber}_${testType}`

    if (!body.classList.contains(className)) {
        body.classList.add(className)
    }

    const bankingAccordion = document.querySelector('section.tables-section>div>div:nth-child(2)>div')
    const otherAccordions = document.querySelectorAll('section.tables-section>div>div:nth-child(3)>div')


    if (bankingAccordion) {
        bankingAccordion.insertAdjacentHTML('afterbegin', `
            <div class="spz-accordion spz-banking-accordion is-active">
                <h4>Banking</h4>
                <img alt="" class="rt-w-[15px] rt-h-[15px]" src="/images/icons/icon-chevron-open-accordion.svg">
            </div>    
        `)
        console.log("applied")
    }

    waitForElement('section.tables-section>div>div:nth-child(3)', () => {
        console.log(document.querySelector('section.tables-section>div>div:nth-child(3)'))
        document.querySelector('section.tables-section>div>div:nth-child(3)').addEventListener('click', (e) => {
            const closestTrigger = e.target.closest('.rt-duration-300')
            if (e.target.tagName !== 'BUTTON') {
                closestTrigger.querySelector('button').click()
            }
            if (!closestTrigger.querySelector('.spz-accordion')) {
                const title = closestTrigger.querySelector('span.rt-font-semibold').textContent
                closestTrigger.insertAdjacentHTML('afterbegin', `
                    <div class="spz-accordion">
                        <h4>${title}</h4>
                        <img alt="" class="rt-w-[15px] rt-h-[15px]" src="/images/icons/icon-chevron-open-accordion.svg">
                    </div>    
                `)
            }
        })


    })

})