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
    document.querySelector('body').classList.add('spz_236_v1')

    if (window.location.href.includes('/store/camtasia')) {
    	addModal()
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (window.location.href.includes('/store/camtasia')) {
            	addModal()
            }
        }
    })

    const config = {
        childList: true,
        attributes: true,
        subtree: true,
        characterData: true
    };
    observer.observe(document.body, config);
    

    function addModal() {
        if (!document.querySelector('.spz_236_modal_content')) {
            const modalHTML = `
                    <div class="spz_236_modal_content">
                        <button class="spz_236_modal_close" data-bs-dismiss="modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2.39691 2.55394L2.46991 2.46994C2.5969 2.34293 2.76526 2.2657 2.94436 2.2523C3.12347 2.2389 3.30144 2.29023 3.44591 2.39694L3.52991 2.46994L7.99991 6.93894L12.4699 2.46894C12.5391 2.39734 12.6219 2.34025 12.7134 2.30098C12.805 2.26172 12.9034 2.24108 13.003 2.24026C13.1026 2.23944 13.2013 2.25846 13.2935 2.29622C13.3856 2.33397 13.4693 2.3897 13.5397 2.46015C13.6101 2.53061 13.6657 2.61437 13.7034 2.70656C13.7411 2.79875 13.76 2.89752 13.7591 2.9971C13.7582 3.09669 13.7375 3.19509 13.6981 3.28658C13.6588 3.37806 13.6016 3.46079 13.5299 3.52994L9.06091 7.99994L13.5309 12.4699C13.6578 12.5971 13.7348 12.7655 13.748 12.9446C13.7613 13.1237 13.7098 13.3016 13.6029 13.4459L13.5299 13.5299C13.4029 13.657 13.2346 13.7342 13.0555 13.7476C12.8764 13.761 12.6984 13.7097 12.5539 13.6029L12.4699 13.5299L7.99991 9.06094L3.52991 13.5309C3.3884 13.6675 3.19891 13.743 3.00226 13.7412C2.80561 13.7394 2.61754 13.6604 2.47855 13.5213C2.33956 13.3822 2.26077 13.194 2.25916 12.9974C2.25754 12.8007 2.33323 12.6113 2.46991 12.4699L6.93891 7.99994L2.46891 3.52994C2.34205 3.40283 2.265 3.23441 2.25179 3.0553C2.23858 2.8762 2.29007 2.6983 2.39691 2.55394L2.46991 2.46994L2.39691 2.55394Z" fill="#1A1A1A"/>
                            </svg>
                        </button>
                        <div class="spz_236_modal_body">
                            <div class="spz_236_modal_image">
                                <picture>
                                    <source 
                                        media="(min-width: 769px)" 
                                        srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/image_1441.webp"
                                    >
                                    <source 
                                        media="(min-width: 361px)" 
                                        srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/image_769.webp"
                                    >
                                    <source 
                                        media="(max-width: 360px)" 
                                        srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/image_361.webp"
                                    >
                                    <img 
                                        src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/image_769.webp" 
                                        alt="Camtasia Interface"
                                    >
                                </picture>
                            </div>
                            <div class="spz_236_modal_text">
                                <div class="spz_236_camtasia_logo" viewBox="0 0 120 30">
                                    <picture>
                                        <source srcset="https://res.cloudinary.com/spiralyze/image/upload/v1757359873/techsmithcamtasia/236/camtasia__logo-short.svg" type="image/svg+xml">
                                        <source srcset="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/camtasia__logo-short_webp.webp" type="image/webp">
                                        <img src="https://res.cloudinary.com/spiralyze/image/upload/f_auto/techsmithcamtasia/236/camtasia__logo-short_webp.webp" alt="Camtasia Logo">
                                    </picture>
                                </div>
                                <h2 class="spz_236_modal_title">Record and edit for free!</h2>
                                <p class="spz_236_modal_description">Experience Camtasia— no credit card required. Get the free desktop editor with watermarked exports or use the online recorder today.</p>
                                <a href="https://www.techsmith.com/camtasia/download" class="spz236_v spz_236_start_btn">Start Recording</a>
                            </div>
                        </div>
                    </div>
            `;

	        const existingModalContent = document.querySelector('#exit-intent-modal .modal-content');
            if (existingModalContent) {
                console.log("worked")
                existingModalContent.innerHTML = modalHTML;
                document.querySelector('#exit-intent-modal').setAttribute('data-backdrop', 'true');
            }

        }
    }
});