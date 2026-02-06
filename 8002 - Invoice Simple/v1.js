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

waitForElement('body', (docBody) => {
    console.log("TEST 8002 started")

    /* waitForElement('.invoice-actions button', () => {
        const btns = document.querySelectorAll('.invoice-actions button')
        if(window.location.pathname == "/invoice-generator"){
            console.log("Found btns:", btns)
            console.log("Clicking on preview button")
            btns.forEach(btn => {
                if(btn.textContent == "Preview"){
                    console.log("here is the Preview btn")
                    btn.click()
                }
            })
        }
    })

    waitForElement('.invoice-actions button', () => {
        // redirect to /edit page
        if(window.location.pathname.includes("/invoices/") && !window.location.pathname.includes("/edit") && !window.localStorage.getItem('invoiceId')){
            console.log("We are on preview page")
            const id = window.location.pathname.split("/")[2]
            console.log("Found id =", id)
            window.localStorage.setItem('invoiceId', id)
            window.location.href = `https://app.invoicesimple.com/invoices/${id}/edit`
        }
    }) */

    // user clicks on preview btn
    /* if(window.location.pathname.includes("/invoices/") && !window.location.pathname.includes("/edit") && window.localStorage.getItem('invoiceId').length > 0){
        console.log("User clicked on preview btn")
        document.body.classList.remove('spz_8002_v')
    } */

    // if(!window.location.pathname.includes("/invoices/") && !window.location.pathname.includes("/edit")) return

    if(!window.localStorage.getItem('firstReloaded')){
        window.localStorage.setItem('firstReloaded', true)
        window.location.reload()
    }

    // add body
    if(!document.body.classList.contains('spz_8002_v')){
        document.querySelector('body').classList.add('spz_8002_v');
    }

    // Handle both invoice generator URLs
    // if (window.location.href.includes('/invoice-generator')) {
    //     waitForElement('[data-sentry-component="DocumentPageContainer"]', () => {
    //         addForm();
    //     });
    // }

    // Handle app domain invoices edit pages
    if (window.location.href.includes('https://app.invoicesimple.com/invoices/') && window.location.pathname.includes('/edit')) {
        // document.querySelector('body').classList.add('spz_8002_edit_page');
        waitForElement('[data-sentry-component="DocumentPageContainer"]', () => {
            addForm();
        });
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if ((window.location.href.includes('/invoice-generator') || (window.location.href.includes('https://app.invoicesimple.com/invoices/') && window.location.pathname.includes('/edit'))) && !document.querySelector('.spz_8002_form_wrapper')) {
                addForm();
                if(!document.body.classList.contains('spz_8002_v')){
                    document.querySelector('body').classList.add('spz_8002_v');
                }
                console.log("worked-main")
            }
            // if (document.querySelector('[for="company-address-address2"]') && document.querySelector('[for="company-address-address2"]').textContent != 'City, State') {
            //     console.log("worked-1")
            //     document.querySelector('[for="company-address-address2"]').textContent = 'City, State';
            //     document.querySelector('[for="company-address-address2"]').closest('.input-with-label-wrapper').classList.add('spz_hidden');
            // }
            // if (document.querySelector('[for="company-address-address3"]') && document.querySelector('[for="company-address-address3"]').textContent != 'Zip code') {
            //     console.log("worked-2")
            //     document.querySelector('[for="company-address-address3"]').textContent = 'Zip code';
            //     document.querySelector('[for="company-address-address3"]').closest('.input-with-label-wrapper').classList.add('spz_hidden');
            // }
            if(window.location.pathname.includes("/invoices/") && !window.location.pathname.includes("/edit") && window.localStorage.getItem('invoiceId').length > 0 && document.body.classList.contains('spz_8002_v')){
                console.log("User clicked on preview btn")
                document.body.classList.remove('spz_8002_v')
            }
        }
    });

    // Configuration options for the observer
    const config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    };
    observer.observe(document.body, config);

    function emailValidation(wrapper, input, selector) {
        if (input.getAttribute('id') == selector) {
            const email = input.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let isPassed = false
            
            if (!emailRegex.test(email)) {
                wrapper.classList.add('invalid_alert');
                wrapper.classList.add('focus');
    
                const oldMessage = wrapper.querySelector('.invalid_message');
                if (oldMessage) oldMessage.remove();
    
                wrapper.insertAdjacentHTML('beforeend', `
                    <div class="invalid_message">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"> <path d="M2.6756 13.9453H13.3275C13.5005 13.9453 13.6705 13.9004 13.821 13.815C13.9714 13.7296 14.0971 13.6066 14.1859 13.458C14.2746 13.3095 14.3232 13.1405 14.3271 12.9675C14.3309 12.7946 14.2898 12.6236 14.2078 12.4712L8.88216 2.58062C8.50435 1.87937 7.49873 1.87937 7.12092 2.58062L1.79529 12.4712C1.71328 12.6236 1.67218 12.7946 1.67603 12.9675C1.67987 13.1405 1.72853 13.3095 1.81723 13.458C1.90593 13.6066 2.03166 13.7296 2.18211 13.815C2.33256 13.9004 2.5026 13.9453 2.6756 13.9453Z" stroke="#DF0000" stroke-linecap="round" stroke-linejoin="round"/> <path d="M7.82043 6.10626L7.99981 9.91877L8.17887 6.10783C8.17998 6.08346 8.1761 6.05913 8.16749 6.03632C8.15887 6.0135 8.14569 5.99268 8.12876 5.97514C8.11182 5.95759 8.09149 5.94367 8.06899 5.93425C8.0465 5.92483 8.02232 5.92009 7.99793 5.92033C7.97397 5.92056 7.9503 5.92559 7.92832 5.93513C7.90634 5.94466 7.88649 5.9585 7.86994 5.97583C7.8534 5.99317 7.84049 6.01364 7.83199 6.03604C7.82348 6.05844 7.81956 6.08232 7.82043 6.10626Z" stroke="#DF0000" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8 12.4141C7.87639 12.4141 7.75555 12.3774 7.65277 12.3087C7.54999 12.2401 7.46988 12.1424 7.42258 12.0282C7.37527 11.914 7.36289 11.7884 7.38701 11.6671C7.41113 11.5459 7.47065 11.4345 7.55806 11.3471C7.64547 11.2597 7.75683 11.2002 7.87807 11.1761C7.99931 11.152 8.12497 11.1643 8.23918 11.2116C8.35338 11.2589 8.45099 11.339 8.51967 11.4418C8.58834 11.5446 8.625 11.6654 8.625 11.7891C8.625 11.9548 8.55915 12.1138 8.44194 12.231C8.32473 12.3482 8.16576 12.4141 8 12.4141Z" fill="#DF0000"/> </svg>
                        <span>Please enter a valid email.</span>
                    </div>
                `);
                console.log("Invalid email");
            } else {
                wrapper.classList.remove('invalid_alert');
    
                // Remove error message if valid
                const oldMessage = wrapper.querySelector('.invalid_message');
                if (oldMessage) oldMessage.remove();

                isPassed = true
            }
            return isPassed
        }
    }

    function formReplacer(goingToStep) {
        const formSteps = document.querySelectorAll('.form_step')
        formSteps.forEach(item => {
            item.classList.forEach(cls => {
                if (cls !== 'form_step') {
                    item.classList.remove(cls);
                }
            })
        })

        formSteps[goingToStep - 1].classList.add(`form_step${goingToStep}`)
    }

    function assignListenersForDeleteRow() {
        const deleteBtns = document.querySelectorAll('[aria-label="Delete Item"]')
        deleteBtns.forEach((item, index) => {
            const parentItemRow = item.closest('.item-row')
            /* item.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
                    <path d="M1 6.33333H22.3333M9 11.6667V19.6667M14.3333 11.6667V19.6667M2.33333 6.33333L3.66667 22.3333C3.66667 23.0406 3.94762 23.7189 4.44772 24.219C4.94781 24.719 5.62609 25 6.33333 25H17C17.7072 25 18.3855 24.719 18.8856 24.219C19.3857 23.7189 19.6667 23.0406 19.6667 22.3333L21 6.33333M7.66667 6.33333V2.33333C7.66667 1.97971 7.80714 1.64057 8.05719 1.39052C8.30724 1.14048 8.64638 1 9 1H14.3333C14.687 1 15.0261 1.14048 15.2761 1.39052C15.5262 1.64057 15.6667 1.97971 15.6667 2.33333V6.33333" stroke="#D22730" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            ` */
            // custom delete button
            if(!parentItemRow.querySelector('.item-row-amount .spz-custom-btn')){
                const customButton = document.createElement('button')
                customButton.classList.add('spz-custom-btn')
                customButton.type = 'button'
                customButton.innerHTML = `
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26" fill="none">
                        <path d="M1 6.33333H22.3333M9 11.6667V19.6667M14.3333 11.6667V19.6667M2.33333 6.33333L3.66667 22.3333C3.66667 23.0406 3.94762 23.7189 4.44772 24.219C4.94781 24.719 5.62609 25 6.33333 25H17C17.7072 25 18.3855 24.719 18.8856 24.219C19.3857 23.7189 19.6667 23.0406 19.6667 22.3333L21 6.33333M7.66667 6.33333V2.33333C7.66667 1.97971 7.80714 1.64057 8.05719 1.39052C8.30724 1.14048 8.64638 1 9 1H14.3333C14.687 1 15.0261 1.14048 15.2761 1.39052C15.5262 1.64057 15.6667 1.97971 15.6667 2.33333V6.33333" stroke="#D22730" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `
                parentItemRow.querySelector('.item-row-amount').insertAdjacentElement('beforeend', customButton)
                // parentItemRow.querySelector('.item-row-actions').remove()
            }

            item.addEventListener('click', () => {
                const parentTd = item.parentElement
                
                const observer = new MutationObserver((mutations, obs) => {
                    const confirmBtn = parentTd.querySelector('[aria-label="Delete Item Confirm"]')
                    if (confirmBtn) {
                        confirmBtn.click()
                        obs.disconnect()
                    }
                })
                
                observer.observe(parentTd, {
                    childList: true,
                    subtree: true
                })
                
                setTimeout(() => observer.disconnect(), 2000)
            })
        })

        document.querySelectorAll('.spz-custom-btn').forEach((item, index) => {
            item.addEventListener('click', (e) => {
                const parentRow = e.target.closest('.item-row');
                
                const deleteButton = parentRow.querySelector('.btn-delete');
                
                console.log(index + ")", deleteButton);
                
                if (deleteButton) {
                    deleteButton.click();
                }
            })
        })
    }

    function initSelectWrappers() {
        const selectWrappers = document.querySelectorAll('.spz_8002_v .select-with-label-wrapper');
        
        selectWrappers.forEach(wrapper => {
            const selectControl = wrapper.querySelector('.react-select__control');
            const valueContainer = wrapper.querySelector('.react-select__value-container');
            
            if (!selectControl) return;
            
            // Check if select has value
            function checkFilled() {
                const hasValue = wrapper.querySelector('.react-select__single-value') !== null;
                if (hasValue) {
                    wrapper.classList.add('filled');
                } else {
                    wrapper.classList.remove('filled');
                }
            }
            
            // Focus event
            selectControl.addEventListener('mousedown', () => {
                wrapper.classList.add('focusSelect');
            });
            
            // Blur event - using MutationObserver to detect when dropdown closes
            const observer = new MutationObserver(() => {
                const isFocused = selectControl.classList.contains('react-select__control--is-focused');
                if (!isFocused) {
                    wrapper.classList.remove('focusSelect');
                    checkFilled();
                }
                const rateInput = document.querySelector('[data-sentry-component="TaxRateInput"]')
                const discountInput = document.querySelector('[data-sentry-component="DiscountAmountInput"]')
                const discountPercentInput = document.querySelector('[data-sentry-component="DiscountPercentInput"]')
                const currencyInput = document.querySelector('.currency-select__value-container')
                if(rateInput && !rateInput.classList.contains('input-with-label-wrapper')){
                    rateInput.classList.add('input-with-label-wrapper')
                }
                if(discountInput && !discountInput.classList.contains('input-with-label-wrapper')){
                    discountInput.classList.add('input-with-label-wrapper', 'relative', 'my-3')
                }
                if(discountPercentInput && !discountPercentInput.classList.contains('input-with-label-wrapper')){
                    discountPercentInput.classList.add('input-with-label-wrapper', 'relative', 'my-3')
                }                     
            });
            
            observer.observe(selectControl, {
                attributes: true,
                attributeFilter: ['class']
            });
            
            // Check initial state
            checkFilled();
            
            // Also observe value changes
            const valueObserver = new MutationObserver(checkFilled);
            if (valueContainer) {
                valueObserver.observe(valueContainer, {
                    childList: true,
                    subtree: true
                });
            }
        });
    }

    function convertTableToDiv(tableSelector) {
        const table = document.querySelector(tableSelector);
        
        if (!table) {
            console.error(`Table not found: ${tableSelector}`);
            return;
        }

        // Helper function to convert element and preserve attributes
        function convertElement(element, newClass) {
            const div = document.createElement('div');
            div.className = newClass;
            
            // Copy all attributes
            Array.from(element.attributes).forEach(attr => {
                if (attr.name !== 'class') {
                    div.setAttribute(attr.name, attr.value);
                } else {
                    // Preserve existing classes along with new class
                    div.className = `${newClass} ${attr.value}`.trim();
                }
            });
            
            div.innerHTML = element.innerHTML;
            element.replaceWith(div);
            return div;
        }

        // Convert table structure
        const tableDiv = convertElement(table, 'spz-table');
        
        tableDiv.querySelectorAll('thead').forEach(el => convertElement(el, 'spz-thead'));
        tableDiv.querySelectorAll('tbody').forEach(el => convertElement(el, 'spz-tbody'));
        tableDiv.querySelectorAll('tfoot').forEach(el => convertElement(el, 'spz-tfoot'));
        tableDiv.querySelectorAll('tr').forEach(el => convertElement(el, 'spz-row'));
        tableDiv.querySelectorAll('th').forEach(el => convertElement(el, 'spz-header-cell'));
        tableDiv.querySelectorAll('td').forEach(el => convertElement(el, 'spz-cell'));

        console.log('Table converted successfully');
        return tableDiv;
    }


    function addForm() {
        if (!document.querySelector('.spz_8002_form_wrapper') && document.querySelector('[data-sentry-component="DocumentPageContainer"]')) {
            document.querySelector('[data-sentry-component="DocumentPageContainer"]').insertAdjacentHTML('beforebegin', `
                <div class="spz_8002_form_wrapper">
                    <div class="steps_wrapper">
                        <div class="step step_1">
                            <div class="step_no">1</div>
                            <div class="step_label">Business Info</div>
                        </div>
                        <div class="step step_2">
                            <div class="step_no">2</div>
                            <div class="step_label">Customer Info</div>
                        </div>
                        <div class="step step_3">
                            <div class="step_no">3</div>
                            <div class="step_label">Line Items & Billing</div>
                        </div>
                        <div class="step step_4">
                            <div class="step_no">4</div>
                            <div class="step_label">Send to Customer</div>
                        </div>
                    </div>
                    <div class="prev_cta">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M7.82484 13L12.7248 17.9C12.9248 18.1 13.0208 18.3333 13.0128 18.6C13.0048 18.8667 12.9005 19.1 12.6998 19.3C12.4998 19.4833 12.2665 19.5793 11.9998 19.588C11.7332 19.5967 11.4998 19.5007 11.2998 19.3L4.69984 12.7C4.59984 12.6 4.52884 12.4917 4.48684 12.375C4.44484 12.2583 4.42451 12.1333 4.42584 12C4.42718 11.8667 4.44818 11.7417 4.48884 11.625C4.52951 11.5083 4.60018 11.4 4.70084 11.3L11.3008 4.69999C11.4842 4.51665 11.7135 4.42499 11.9888 4.42499C12.2642 4.42499 12.5015 4.51665 12.7008 4.69999C12.9008 4.89999 13.0008 5.13765 13.0008 5.41299C13.0008 5.68832 12.9008 5.92565 12.7008 6.12499L7.82484 11H18.9998C19.2832 11 19.5208 11.096 19.7128 11.288C19.9048 11.48 20.0005 11.7173 19.9998 12C19.9992 12.2827 19.9032 12.5203 19.7118 12.713C19.5205 12.9057 19.2832 13.0013 18.9998 13H7.82484Z" fill="#5C5C5C"/>
                        </svg>      
                        <span>Back</span>
                    </div>
                    <div class="form_outer_wrapper">
                        <div class="form_wrapper">
                            <div class="form_step form_step1">
                                <h2 class="step_title">Add Your Company Details</h2>
                                <div class="form_fields_wrapper">
                                </div>
                                <div class="step_cta step1_cta">next <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6569 12.711L4.99994 18.368L3.58594 16.954L8.53594 12.004L3.58594 7.05401L4.99994 5.64001L10.6569 11.297C10.8444 11.4845 10.9497 11.7389 10.9497 12.004C10.9497 12.2692 10.8444 12.5235 10.6569 12.711Z" fill="white"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="form_step form_step2">
                                <h2 class="step_title">Enter Customer Info</h2>
                                <div class="form_fields_wrapper_customer">
                                </div>
                                <div class="step_nav">
                                    <div class="step_cta step2_cta">
                                        next <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6569 12.711L4.99994 18.368L3.58594 16.954L8.53594 12.004L3.58594 7.05401L4.99994 5.64001L10.6569 11.297C10.8444 11.4845 10.9497 11.7389 10.9497 12.004C10.9497 12.2692 10.8444 12.5235 10.6569 12.711Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="form_step form_step3">
                                <h2 class="step_title">Add Line Items & Billing Info</h2>
                                <div class="form_fields_wrapper_billing">
                                </div>
                                <div class="step_nav">
                                    <div class="step_cta step3_cta">
                                        next <svg xmlns="http://www.w3.org/2000/svg" width="13" height="24" viewBox="0 0 13 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6569 12.711L4.99994 18.368L3.58594 16.954L8.53594 12.004L3.58594 7.05401L4.99994 5.64001L10.6569 11.297C10.8444 11.4845 10.9497 11.7389 10.9497 12.004C10.9497 12.2692 10.8444 12.5235 10.6569 12.711Z" fill="white"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="form_step form_step4">
                                <h2 class="step_title">Preview & Send!</h2>
                                <div class="form_fields_wrapper_final">
                                </div>
                                <div class="step_nav">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="spz_invoice_preview">
                            <div class="step_3_additional"></div>
                            <img src="https://i.ibb.co/BKnCywMC/Frame-1171276358.jpg" alt="image_temporary" />
                        </div>
                    </div>
                </div>    
            `);
            document.querySelector('.spz_8002_form_wrapper').setAttribute('currStep', '1');
            document.querySelector('.step.step_1').classList.add('active');
            document.querySelector('.prev_cta').classList.add('spz_hidden');

            // Move form inside form wrapper
            document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper').insertAdjacentElement('afterbegin', document.querySelector('.invoice-detail-body'));
            const removeClasses = ['grid', 'grid-cols-2', 'gap-9']
            document.querySelector('.spz_8002_form_wrapper .invoice-detail-header').classList.remove(...removeClasses)

            // Toggle to show fields
            if (document.querySelector('.toggle-additional-details')) {
                document.querySelector('.toggle-additional-details').click();
                document.querySelector('.toggle-additional-details').closest('.input-with-label-wrapper').classList.add('spz_hidden');
                var checkExpandedFields = setInterval(() => {
                    if (document.querySelector('#company-website')) {
                        clearInterval(checkExpandedFields);
                        document.querySelector('.toggle-additional-details').closest('.input-with-label-wrapper').classList.add('spz_hidden');
                        document.querySelectorAll('.input-with-label-wrapper input').forEach((input) => {
                            if (input.value.length > 0) {
                                input.closest('.input-with-label-wrapper').classList.add('filled');
                            } else {
                                input.closest('.input-with-label-wrapper').classList.remove('filled');
                            }
                        });
                    } else {
                        document.querySelector('.toggle-additional-details').click();
                    }
                }, 100);
            }

            // Form step 1
            if (document.querySelector('[for="company-business-number"]')) {
                document.querySelector('[for="company-business-number"]').closest('.input-with-label-wrapper').classList.add('spz_hidden');
            }
            if (document.querySelector('[for="company-name"]')) {
                document.querySelector('[for="company-name"]').textContent = 'Business Name';
            }

            if (document.querySelector('.input-with-label-wrapper input')) {
                document.querySelectorAll('.input-with-label-wrapper input').forEach((input) => {
                    if (input.value.length > 0) {
                        input.closest('.input-with-label-wrapper').classList.add('filled');
                    } else {
                        input.closest('.input-with-label-wrapper').classList.remove('filled');
                    }
                });
            }

            document.addEventListener('focusin', (e) => {
                if (e.target.matches('.input-with-label-wrapper input')) {
                    e.target.closest('.input-with-label-wrapper').classList.add('focus');
                    console.log("focusin")
                }
            });

            document.addEventListener('focusout', (e) => {
                if (e.target.matches('.input-with-label-wrapper input')) {
                    const input = e.target;
                    const wrapper = input.closest('.input-with-label-wrapper');
                    console.log("focusout", input.getAttribute('id'))
                    
                    wrapper.classList.remove('focus');
                    
                    if (input.value.length > 0) {
                        wrapper.classList.add('filled');
                    } else {
                        wrapper.classList.remove('filled');
                    }
                    
                    emailValidation(wrapper, input, 'company-email')
                    emailValidation(wrapper, input, 'client-email')
                }
            });
            
            document.addEventListener('input', (e) => {
                if (e.target.matches('.input-with-label-wrapper input')) {
                    const input = e.target;
                    const wrapper = input.closest('.input-with-label-wrapper');
                    console.log("input")
                    
                    if (input.value.length > 0) {
                        wrapper.classList.add('filled');
                    } else {
                        wrapper.classList.remove('filled');
                    }
                }
                if(e.target.id === 'client-address-address1'){
                    if(document.querySelector('#client-address-address2')) document.querySelector('#client-address-address2').closest('.input-with-label-wrapper').remove();
                    if(document.querySelector('#client-address-address3')) document.querySelector('#client-address-address3').closest('.input-with-label-wrapper').remove();
                }
            });

            document.addEventListener('click', (e) => {
                if (e.target.closest('.step1_cta')) {
                    const emailValidatedInput = document.querySelector('#company-email')
                    if(!emailValidatedInput) return
                    const wrapper = emailValidatedInput.closest('.input-with-label-wrapper')
                    const input = wrapper.querySelector('input')
                    const isPassed = emailValidation(wrapper, input, 'company-email')
                    if(!isPassed) return
                    console.log("Clicked on next and success 1")
                    document.querySelector('.spz_8002_form_wrapper').setAttribute('currstep', '2');
                    // changes step points, has nothing to do with actual forms
                    document.querySelector('.steps_wrapper .step_1').classList.add('complete');
                    document.querySelector('.steps_wrapper .step_1').classList.remove('active');
                    document.querySelector('.steps_wrapper .step_2').classList.add('active');
                    // replace the first form with second
                    document.querySelector('.prev_cta').classList.remove('spz_hidden');
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper_customer').insertAdjacentElement('afterbegin', document.querySelector('.invoice-detail-body'));
                    // wrapping name input with a wrapper
                    const bodyForm = document.querySelectorAll('.invoice-detail-header > div:not(.invoice-contact-business) > div');
                    if(bodyForm.length > 4){
                        bodyForm.forEach((item, index) => {
                            if(index == 0 || index == 5 || index == 6){
                                item.remove()
                                return
                            }
                            if(!item.classList.contains('input-with-label-wrapper')){
                                const wrapper = document.createElement('div');
                                wrapper.classList.add('input-with-label-wrapper');
                                item.replaceWith(wrapper);
                                wrapper.appendChild(item);
                            }
                        })
                    }

                    // if (document.querySelector('[for="client-mobile"]')) {
                    //     document.querySelector('[for="client-mobile"]').closest('.input-with-label-wrapper').classList.add('spz_hidden');
                    // }
                    // if (document.querySelector('[for="client-fax"]')) {
                    //     document.querySelector('[for="client-fax"]').closest('.input-with-label-wrapper').classList.add('spz_hidden');
                    // }
                }
            })

            document.addEventListener('click', (e) => {
                if (e.target.closest('.step2_cta')) {
                    const emailValidatedInput = document.querySelector('#client-email')
                    if(!emailValidatedInput) return
                    const wrapper = emailValidatedInput.closest('.input-with-label-wrapper')
                    const input = wrapper.querySelector('input')
                    const isPassed = emailValidation(wrapper, input, 'client-email')
                    if(!isPassed) return
                    document.querySelector('.spz_8002_form_wrapper').setAttribute('currStep', '3');
                    // changes step points, has nothing to do with actual forms
                    document.querySelector('.steps_wrapper .step_2').classList.add('complete');
                    document.querySelector('.steps_wrapper .step_2').classList.remove('active');
                    document.querySelector('.steps_wrapper .step_3').classList.add('active');

                    document.querySelector('.step_3_additional').classList.add('active_additional_side')
                    
                    /* document.querySelectorAll('[data-sentry-component="SettingHeader"]').forEach(item => {
                        item.nextElementSibling.classList.add('input-with-label-wrapper')
                    }) */

                    // trash can
                    assignListenersForDeleteRow()
                    const invoiceItems = document.querySelector('.invoice-items')
                    if (invoiceItems) {
                        const observer = new MutationObserver((mutations) => {
                            mutations.forEach((mutation) => {
                                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                                    setTimeout(() => {
                                        assignListenersForDeleteRow()
                                    }, 100)
                                }
                            })
                        })
                        
                        observer.observe(invoiceItems, {
                            childList: true,
                            subtree: false
                        })
                    }

                    


                    // passing form
                    /* if(!document.querySelector('.step_3_additional').contains(document.querySelector('[data-sentry-element="Desktop"]>div>.col-span-1'))){
                        document.querySelector('.step_3_additional').insertAdjacentElement('afterbegin', document.querySelector('[data-sentry-element="Desktop"]>div>.col-span-1'))
                        console.log("=================passed the form")
                    } */


                    const targetElement = document.querySelector('.step_3_additional');
                    const sourceElement = document.querySelector('[data-sentry-element="Desktop"]>div>.col-span-1');
                    console.log("source=  ", sourceElement)

                    if (targetElement && sourceElement && !targetElement.contains(sourceElement)) {
                        targetElement.insertAdjacentElement('afterbegin', sourceElement);
                        console.log("=================passed the form");
                    } else if (!sourceElement) {
                        console.warn("Source element not found");
                    } else if (!targetElement) {
                        console.warn("Target element not found");
                    } else {
                        console.log("Element already in correct position");
                    }

                    const list = document.querySelector(".item-quantity-header").closest('tr').querySelectorAll('th')
                    list.forEach((item, index) => {
                        console.log("Item text content", index, item.textContent)
                        item.textContent = item.textContent[0].toUpperCase() + item.textContent.slice(1).toLowerCase()
                    })
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper_billing').insertAdjacentElement('afterbegin', document.querySelector('.invoice-detail-body'));
                
                    // right side
                    const rightSidebarBlocks = document.querySelectorAll('[data-sentry-component^="SettingsSidebar"] > .block')
                    console.log("Right Sidebar blocks: ", rightSidebarBlocks)
                    rightSidebarBlocks.forEach(item => {
                        if(!item.children[1].classList.contains('.tax-setting-inclusive-container')){
                            item.children[1].classList.add('select-with-label-wrapper', "relative")
                        }
                        if(item.children[0].textContent === "Discount"){
                            item.children[1].querySelector('label').textContent = "Discount"
                        }
                    })
                    
                    const currencyLabel = document.querySelector('.currency-select-header')
                    currencyLabel.parentElement.classList.add('spz-currency-block', 'relative')
                    if(!document.querySelector('.spz-currency-label')){
                        currencyLabel.parentElement.insertAdjacentHTML('afterbegin', `
                            <p class="spz-currency-label">Currency</p>    
                        `)
                    }
                    currencyLabel.outerHTML = currencyLabel.outerHTML.replace(/^<div/, '<label').replace(/<\/div>$/, '</label>');

                    initSelectWrappers()
                }
            });

            document.addEventListener('click', (e) => {
                if (e.target.closest('.step3_cta')) {
                    document.querySelector('.spz_8002_form_wrapper').setAttribute('currStep', '4');
                    // changes step points, has nothing to do with actual forms
                    document.querySelector('.steps_wrapper .step_3').classList.add('complete');
                    document.querySelector('.steps_wrapper .step_3').classList.remove('active');
                    document.querySelector('.steps_wrapper .step_4').classList.add('active');

                    // document.querySelector('.spz_8002_v .form_wrapper').style.maxWidth = "643px"
                    document.querySelector('.step_3_additional').classList.remove('active_additional_side')
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper_billing').classList.add('spz_hidden')

                    if(!document.querySelector('.first-row-step4')){

                        //passing form
                        // first row invoice header + add logo
                        const firstRow = document.createElement('div')
                        firstRow.className = 'first-row-step4 input-with-label-wrapper'
                        document.querySelector('.form_fields_wrapper_final').appendChild(firstRow)
                        firstRow.insertAdjacentElement('beforeend', document.querySelector('.invoice-title'))
                        // firstRow.insertAdjacentElement('beforeend', document.querySelector('[data-sentry-component="InvoicePhotoList"]'))
                        firstRow.insertAdjacentElement('beforeend', document.querySelector('.photo-drop'))
                        document.querySelector('.photo-drop').style.minWidth = "163px"
                        document.querySelector('.photo-drop').style.minHeight = "52px"
                        firstRow.querySelector('.invoice-title').insertAdjacentHTML('afterbegin', 
                        `
                        <label>Invoice Name</label>
                        `
                    )

                    firstRow.querySelector('.dropzone-symbols').innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 12.9982H13V17.9982C13 18.2634 12.8946 18.5178 12.7071 18.7053C12.5196 18.8929 12.2652 18.9982 12 18.9982C11.7348 18.9982 11.4804 18.8929 11.2929 18.7053C11.1054 18.5178 11 18.2634 11 17.9982V12.9982H6C5.73478 12.9982 5.48043 12.8929 5.29289 12.7053C5.10536 12.5178 5 12.2634 5 11.9982C5 11.733 5.10536 11.4787 5.29289 11.2911C5.48043 11.1036 5.73478 10.9982 6 10.9982H11V5.99823C11 5.73301 11.1054 5.47866 11.2929 5.29112C11.4804 5.10359 11.7348 4.99823 12 4.99823C12.2652 4.99823 12.5196 5.10359 12.7071 5.29112C12.8946 5.47866 13 5.73301 13 5.99823V10.9982H18C18.2652 10.9982 18.5196 11.1036 18.7071 11.2911C18.8946 11.4787 19 11.733 19 11.9982C19 12.2634 18.8946 12.5178 18.7071 12.7053C18.5196 12.8929 18.2652 12.9982 18 12.9982Z" fill="#333333"/>
                            </svg>
                            <p>Add Logo</p>
                            `
                    }

                    // second row invoice number, date, terms
                    if(!document.querySelector('.second-row-step4')){
                        const secondRow = document.createElement('div')
                        secondRow.className = 'second-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(secondRow)
                        secondRow.insertAdjacentElement('beforeend', document.querySelector('.invoice-detail-terms'))
                        
                        const classsesToRemove = ['grid', 'grid-cols-2', 'gap-9', 'pb-3']
                        secondRow.querySelector('.invoice-detail-terms').classList.remove(...classsesToRemove)
    
                        const outerDiv = secondRow.querySelector('.invoice-detail-terms');
                        const innerDiv = outerDiv.querySelector('.invoice-detail-terms > div');
    
                        if (innerDiv) {
                            while (innerDiv.firstChild) {
                                outerDiv.insertBefore(innerDiv.firstChild, innerDiv);
                            }
                            innerDiv.remove();
                        }
    
                        const container = document.querySelector('.invoice-detail-terms');
    
                        if (container && container.children.length >= 3) {
                            const wrapper1 = document.createElement('div');
                            wrapper1.className = 'terms-group-first-second';
                            
                            const wrapper2 = document.createElement('div');
                            wrapper2.className = 'terms-group-third';
                            
                            wrapper1.appendChild(container.children[0]);
                            wrapper1.appendChild(container.children[0]);
    
                            wrapper1.children[0].querySelector('label').textContent = 'Invoice Number'
                            wrapper1.children[1].className = 'input-with-label-wrapper date-picker-wrapper flex items-center relative filled'
                            
                            wrapper2.appendChild(container.children[0]);
    
                            wrapper2.children[0].className = "flex items-center w-full"
                            
                            container.appendChild(wrapper1);
                            container.appendChild(wrapper2);
                        }
                    }
                    
                    if(!document.querySelector('.third-row-step4')){
                        // third row palitre
                        const thirdRow = document.createElement('div')
                        thirdRow.className = 'third-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(thirdRow)
                        thirdRow.insertAdjacentElement('beforeend', document.querySelector('.color-select-container'))
                        
                        // const colorPickerWrapper = [...document.querySelectorAll('button p')].find(p => p.textContent.trim() === 'Custom Color').parentElement.parentElement
                        // console.log("COLOR_PICKER", colorPickerWrapper)
                        console.log("widget btn", document.querySelector('#color-widget-button'))
                        if(document.querySelector('#color-widget-button')){
                            const colorPickerWrapper = document.querySelector('#color-widget-button').parentElement.parentElement
                            colorPickerWrapper.className = "color_picker_wrapper"
                            const colorPickerButton = colorPickerWrapper.children[0]
                            colorPickerButton.classList.add("color_picker_button")
                            thirdRow.querySelector('.color-select-container').insertAdjacentElement('beforeend', colorPickerWrapper)
                        }
                    }

                    if(!document.querySelector('.fourth-row-step4')){
                        // fourth row photo drop
                        const fourthRow = document.createElement('div')
                        fourthRow.className = 'fourth-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(fourthRow)
                        fourthRow.insertAdjacentElement('beforeend', document.querySelector('[data-sentry-component="InvoicePhotoList"]'))
                    }

                    if(!document.querySelector('.fifth-row-step4')){
                        // fifth row signature
                        const fifthRow = document.createElement('div')
                        fifthRow.className = 'fifth-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(fifthRow)
                        fifthRow.insertAdjacentElement('beforeend', document.querySelector('[data-sentry-component="InvoiceSignature"]'))
                        document.querySelector('[data-testid="invoice-signature"] > div > div').textContent = "Add Signature"
                    }

                    if(!document.querySelector('.sixth-row-step4')){
                        // sixth row notes
                        const sixthRow = document.createElement('div')
                        sixthRow.className = 'sixth-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(sixthRow)
                        sixthRow.insertAdjacentElement('beforeend', document.querySelector('[data-sentry-component="InvoiceNotes"]'))
                    }

                    if(!document.querySelector('.seventh-row-step4')){
                        // seventh row action btns
                        const seventhRow = document.createElement('div')
                        seventhRow.className = 'seventh-row-step4'
                        document.querySelector('.form_fields_wrapper_final').appendChild(seventhRow)
    
                        seventhRow.insertAdjacentHTML('beforeend', `
                            <button id="spz-pdf-click">
                                <span>PDF</span>
                                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icons-file.svg" alt="PDF icon">
                            </button>
                            <button id="spz-preview-click">
                                <span>PREVIEW</span>
                                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icon-preview.svg" alt="Preview icon">
                            </button>
                            <button id="spz-email-invoice-click">
                                <span>EMAIL INVOICE</span>
                                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icon-email.svg" alt="Email invoice icon">
                            </button>
                        `)

                        document.querySelector('#spz-pdf-click').addEventListener("click", () => {
                            document.querySelector('[title="Download a PDF copy of the invoice to your device"]').click()
                        })

                        document.querySelector('#spz-preview-click').addEventListener("click", () => {
                            document.querySelectorAll('.invoice-actions > div > button').forEach(item => {
                                if(item.textContent == "Preview"){
                                    item.click()
                                }
                            })
                        })

                        document.querySelector('#spz-email-invoice-click').addEventListener("click", () => {
                            document.querySelector('[data-sentry-component="ButtonEmailDocument"]').click()

                        })
                        
                       /*  const targetElement = seventhRow.querySelector('.flex.flex-row.gap-1 > [title="Download a PDF copy of the invoice to your device"]');
                        const buttonToMove = seventhRow.querySelector('.sticky-outer-wrapper .invoice-actions > button');
                        
                        // Check if we've already processed this
                        if (targetElement && buttonToMove && !targetElement.hasAttribute('data-button-inserted')) {
                            targetElement.insertAdjacentElement('afterend', buttonToMove);
                            targetElement.setAttribute('data-button-inserted', 'true');
                        } else if (targetElement?.hasAttribute('data-button-inserted')) {
                            console.log('Button already inserted, skipping');
                        }
                        // seventhRow.querySelector('.flex.flex-row.gap-1 > [title="Download a PDF copy of the invoice to your device"]').insertAdjacentElement('afterend', seventhRow.querySelector('.sticky-outer-wrapper .invoice-actions > button'))
                        
                        const actionBtns = seventhRow.querySelectorAll('.invoice-actions button')
                        
                        console.log("actionBtns:", actionBtns) */


                        
                        
                        /* actionBtns[1].innerHTML = `
                            <span>PDF</span>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icons-file.svg" alt="PDF icon">
                        `
                        actionBtns[2].innerHTML = `
                            <span>PREVIEW</span>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icon-preview.svg" alt="Preview icon">
                        `
                        actionBtns[3].innerHTML = `
                            <span>EMAIL INVOICE</span>
                            <img src="https://res.cloudinary.com/spiralyze/image/upload/v1755011857/invoicesimple/8002/icon-email.svg" alt="Email invoice icon">
                        ` */
                    }
                }
            });

            document.addEventListener('click', (e) => {
            if (e.target.closest('.prev_cta')) {
                const wrapper = document.querySelector('.spz_8002_form_wrapper');
                let curr = parseInt(wrapper.getAttribute('currStep'));
                if (curr > 1) {
                    wrapper.setAttribute('currStep', curr - 1);


                    // update steps UI
                    document.querySelector(`.steps_wrapper .step_${curr}`).classList.remove('active');
                    document.querySelector(`.steps_wrapper .step_${curr - 1}`).classList.add('active');
                    document.querySelector(`.steps_wrapper .step_${curr - 1}`).classList.remove('complete');
                }
                if(curr == 2) {
                    document.querySelector('.prev_cta').classList.add('spz_hidden');
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper').insertAdjacentElement('afterbegin', document.querySelector('.invoice-detail-body'));
                }
                if(curr == 3){
                    document.querySelector('.step_3_additional').classList.remove('active_additional_side')
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper_customer').insertAdjacentElement('afterbegin', document.querySelector('.invoice-detail-body'));
                }
                if(curr == 4){
                    document.querySelector('.step_3_additional').classList.add('active_additional_side')
                    document.querySelector('.spz_8002_form_wrapper .form_fields_wrapper_billing').classList.remove('spz_hidden')
                    document.querySelector('.spz_8002_v .form_wrapper').style.maxWidth = ""
                }
            }
            });
        }
    }
});