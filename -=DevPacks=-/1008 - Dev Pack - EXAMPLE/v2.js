function isDesktop() {
    return window.innerWidth >= 1024;
}

function resizeChanges() {
    if (window.location.href === 'https://www.awrusa.com/') {
        if (window.innerWidth >= 1024) {
            if (document.querySelector('.spz_1008_v2 [class$="__render-components"] > div')) {
                document.querySelector('.spz_1008_v2 [class$="__render-components"] > div').classList.add('awr-hero');
            }
            var checkEle = setInterval(() => {
                if (document.querySelector('.awr-hero')) {
                    clearInterval(checkEle);
                    document.querySelector('.awr-hero').classList.remove('bg-white');
                    document.querySelector('.awr-hero').classList.add('spz-bg-awr-offWhite');
                    if (document.querySelector('.awr-rich-text')) {
                        document.querySelector('.awr-rich-text').parentElement.classList.add('awr-hero__text-panel', 'awr-hero__text-panel--left');
                    }
                    document.querySelector('.awr-hero.spz-bg-awr-offWhite .awr-hero__text-panel--left').nextElementSibling.classList.add('awr-hero__image-panel--full-bleed', 'awr-hero__image-panel');
                    if (!document.querySelector('.awr-hero__image-panel--full-bleed picture') && document.querySelector('.awr-hero__image-panel--full-bleed')) {
                        document.querySelector('.awr-hero__image-panel--full-bleed').insertAdjacentHTML('afterbegin', `<picture><source media="(max-width:768px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275834.webp" type="image/webp"><source media="(max-width:899.98px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275751.webp" type="image/webp"><img src="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/hero_1440_img_6.webp" alt="awr homepage redesign" class="awr-hero__image"></picture>`);
                    } else {
                        if (document.querySelector('.awr-hero__image-panel--full-bleed')) {
                            document.querySelector('.awr-hero__image-panel--full-bleed picture').remove();
                            document.querySelector('.awr-hero__image-panel--full-bleed').insertAdjacentHTML('afterbegin', `<picture><source media="(max-width:768px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275834.webp" type="image/webp"><source media="(max-width:899.98px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275751.webp" type="image/webp"><img src="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/hero_1440_img_6.webp" alt="awr homepage redesign" class="awr-hero__image"></picture>`);
                        }
                    }
                    if (document.querySelector('.spz-banner-tags')) {
                        document.querySelector('.spz-banner-tags').remove();
                    }
                    updateButtonText();
                }
            }, 100);
        } else {
            if (!document.querySelector('.spz-banner-tags')) {
                document.querySelector('.awr-rich-text h2').insertAdjacentHTML('afterend', `<ul class="spz-banner-tags"><li>Water</li><li>Sewer</li><li>Gas</li><li>Electric</li><br class="desktop-break"><li>Heating & Cooling</li><li>Appliances</li><li>Plumbing</li></ul>`);
            }
            var checkEle = setInterval(() => {
                if (document.querySelector('.awr-hero')) {
                    clearInterval(checkEle);
                    document.querySelector('.awr-hero').classList.remove('bg-white');
                    document.querySelector('.awr-hero').classList.add('spz-bg-awr-blue');
                    document.querySelector('.awr-hero.spz-bg-awr-blue .awr-hero__text-panel--left').nextElementSibling.classList.add('awr-hero__image-panel--full-bleed', 'awr-hero__image-panel');
                    if (!document.querySelector('.awr-hero__image-panel--full-bleed picture') && document.querySelector('.awr-hero__image-panel--full-bleed')) {
                        document.querySelector('.awr-hero__image-panel--full-bleed').insertAdjacentHTML('afterbegin', `<picture>
                        <source media="(max-width:768px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275835.webp" type="image/webp">
                        <source media="(max-width:899.98px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275828.webp" type="image/webp">
                        <img src="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/hero_1440_img_7.webp" alt="awr homepage redesign" class="awr-hero__image">
                    </picture>`);
                    } else {
                        if (document.querySelector('.awr-hero__image-panel--full-bleed')) {
                            document.querySelector('.awr-hero__image-panel--full-bleed picture').remove();
                            document.querySelector('.awr-hero__image-panel--full-bleed').insertAdjacentHTML('afterbegin', `<picture>
                            <source media="(max-width:768px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275835.webp" type="image/webp">
                            <source media="(max-width:899.98px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275828.webp" type="image/webp">
                            <img src="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/hero_1440_img_7.webp" alt="awr homepage redesign" class="awr-hero__image">
                        </picture>`);
                        }
                    }
                }
            }, 100);
        }
        document.querySelector('.awr-rich-text h2').textContent = `Get fast repairs from vetted techs. Permits & other requirements done for you. 24/7 phone support. One year warranty. `;
    }
}

function updateButtonText() {
    const btnTextEl = document.querySelector('.spz_1008_v2 form.awr-find-your-protection-plan__wrapper button span p');
    if (btnTextEl && btnTextEl.textContent !== 'See Pricing') {
        btnTextEl.textContent = 'See Pricing';
    }
}

function heroBannerMainV1() {
    if (!document.body.classList.contains('spz_1008_v2') && window.location.href === 'https://www.awrusa.com/') {
        document.body.classList.add('spz_1008_v2');

        const heroInterval = setInterval(() => {
            if (document.querySelector('.spz_1008_v2 [class$="__render-components"] > div')) {
                clearInterval(heroInterval);
                document.querySelector('.spz_1008_v2 [class$="__render-components"] > div').classList.add('awr-hero');
                document.querySelector('.awr-hero').classList.remove('bg-white');
                document.querySelector('.awr-hero').classList.add('spz-bg-awr-offWhite');
            }


            document.querySelector('.awr-rich-text').parentElement.classList.add('awr-hero__text-panel', 'awr-hero__text-panel--left');

            if (document.querySelector('.spz_1008_v2 .awr-hero')) {
                document.querySelector('.awr-rich-text h1').innerHTML = `Protect your`;
                if (!document.querySelector('.spz_animated_headline')) {
                    document.querySelector('.awr-rich-text h1').insertAdjacentHTML('afterend', `<div class="spz_animated_headline swiper">
                    <div class="content__list swiper-wrapper">
                            <div class="swiper-slide content__list__item">water & sewer lines</div>
                            <div class="swiper-slide content__list__item">HVAC systems</div>
                            <div class="swiper-slide content__list__item">gas & electrical systems</div>
                            <div class="swiper-slide content__list__item">appliance</div>
                        </div>
                    </div>`);

                    getScript(
                        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js",
                        function () {
                            var swiper = new Swiper(".spz_animated_headline", {
                                direction: 'vertical',
                                effect: 'slide',
                                slidesPerView: 1,
                                loop: true,
                                arrows: false,
                                allowTouchMove: false,
                                draggable: false,
                                autoplay: {
                                    delay: 2000,
                                    disableOnInteraction: false,
                                },
                            });
                        }
                    )
                }

                function getScript(source, callback) {
                    var el = document.createElement("script");
                    el.onload = callback;
                    el.src = source;
                    document.body.appendChild(el);
                }

                setTimeout(() => {
                    const mainHero = document.querySelector('.awr-hero.spz-bg-awr-offWhite > div');
                    if (mainHero) {
                        mainHero.classList.add('awr-hero__container');
                    }
                }, 100);


                if (!document.querySelector('.spz_awz-hero__subHead')) {
                    document.querySelector('.awr-rich-text h1').insertAdjacentHTML('beforebegin', `<span class="spz_awz-hero__subHead">A Leading Home Warranty Provider</span>`);
                }

                resizeChanges();


                document.querySelector('form.awr-find-your-protection-plan__wrapper input#zip-code').setAttribute('placeholder', 'Zip Code');

                // adding previous class to image panel
                // document.querySelector('.awr-hero.spz-bg-awr-offWhite .awr-hero__text-panel--left').nextElementSibling.classList.add('awr-hero__image-panel--full-bleed', 'awr-hero__image-panel');

                if (!document.querySelector('.awr-hero__image-panel--full-bleed picture') && document.querySelector('.awr-hero__image-panel--full-bleed')) {
                    document.querySelector('.awr-hero__image-panel--full-bleed').insertAdjacentHTML('afterbegin', `<picture><source media="(max-width:768px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275834.webp" type="image/webp"><source media="(max-width:899.98px)" srcset="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/frame_1171275751.webp" type="image/webp"><img src="//res.cloudinary.com/spiralyze/image/upload/f_auto/oncourse/1001/hero_1440_img_6.webp" alt="awr homepage redesign" class="awr-hero__image"></picture>`);
                }

                updateButtonText();
            }
        }, 10);
        bindCardClick();
    }
}

function cardClickHandler(e) {
    if (
        e.target.matches('.spz_1008_v2 form.awr-find-your-protection-plan__wrapper button') ||
        e.target.closest('.spz_1008_v2 form.awr-find-your-protection-plan__wrapper button')
    ) {
        setTimeout(() => {
            const errorMsg = document.querySelector('.awr-find-your-protection-plan__input-error');
            if (errorMsg) {
                const formWrapper = document.querySelector('.spz_1008_v2 form.awr-find-your-protection-plan__wrapper');
                if (formWrapper) {
                    formWrapper.classList.add('spz_invalid_zip');
                }
            }
        }, 100);
    }
}

let cardClickBound = false;

function bindCardClick() {
    if (!cardClickBound) {
        window.addEventListener('click', cardClickHandler);
        cardClickBound = true;
    }
}

function unbindCardClick() {
    if (cardClickBound) {
        window.removeEventListener('click', cardClickHandler);
        cardClickBound = false;
    }
}

function removeTest() {
    if (document.querySelector('.awr-rich-text h1')) {
        document.querySelector('.awr-rich-text h1').innerHTML = `<span class="text-awr-blue-700">Protect</span> your home from the unexpected.`;
    }

    if (document.querySelector('.awr-hero.spz-bg-awr-blue')) {
        document.querySelector('.awr-hero').classList.remove('spz-bg-awr-blue');
        document.querySelector('.awr-hero').classList.add('bg-white');
    } else if (document.querySelector('.awr-hero.spz-bg-awr-offWhite')) {
        document.querySelector('.awr-hero').classList.remove('spz-bg-awr-offWhite');
        document.querySelector('.awr-hero').classList.add('bg-white');
    }


    if (document.querySelector('.spz_awz-hero__subHead')) {
        document.querySelector('.spz_awz-hero__subHead').remove();
    }

    if (document.querySelector('.spz-banner-tags')) {
        document.querySelector('.spz-banner-tags').remove();
    }

    if (document.querySelector('form.awr-find-your-protection-plan__wrapper input#zip-code')) {
        document.querySelector('form.awr-find-your-protection-plan__wrapper input#zip-code').setAttribute('placeholder', 'Enter ZIP Code');
        document.querySelector('form.awr-find-your-protection-plan__wrapper button span p').textContent = `Explore Plans`;
    }



    if (document.querySelector('.awr-hero__image-panel--full-bleed picture')) {
        document.querySelector('.awr-hero__image-panel--full-bleed picture').remove();
    }
    if (document.querySelector('.awr-hero__image')) {
        document.querySelector('.awr-hero__image').setAttribute('src', 'https://images.contentstack.io/v3/assets/bltaad0a1193351f4c1/blt483324c984b00584/658da5eab782f0061d584b2c/Frame_538.svg');
    }

    if (document.querySelector('.spz_1008_v2 .awr-hero')) {
        document.querySelector('.spz_1008_v2 [class$="__render-components"] > div').classList.remove('awr-hero');
    }

    if (document.body.classList.contains('spz_1008_v2')) {
        document.body.classList.remove('spz_1008_v2');
    }


    unbindCardClick();
}

var pageList = [
    "https://www.awrusa.com/"
];

let testRemoved = false;
let isProcessing = false; // Add this flag

function observerForLoadingBlock() {
    var target = document.body;
    if (!target) return;

    const config = {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
    };

    let running = false;

    const callback = function (mutationsList, observer) {
        const currentPage = window.location.href.split("?")[0].split("#")[0];

        if (running || isProcessing) return; // Check both flags

        if (pageList.includes(currentPage)) {
            running = true;
            isProcessing = true; // Set processing flag
            testRemoved = false;

            console.log("Mutation detected: Run spz_1008_v2");
            heroBannerMainV1();

            setTimeout(() => {
                running = false;
                isProcessing = false; // Reset processing flag
            }, 500);
        } else {
            if (!testRemoved) {
                isProcessing = true; // Set processing flag
                console.log("URL not in list or not desktop, running removeTest()");
                removeTest();
                testRemoved = true;

                setTimeout(() => {
                    isProcessing = false; // Reset processing flag
                }, 100);
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(target, config);
}

observerForLoadingBlock();


window.addEventListener('resize', function () {
    resizeChanges();
});

window.addEventListener('popstate', () => {
    setTimeout(function () {
        heroBannerMainV1();
        updateButtonText();
    }, 800);
});
