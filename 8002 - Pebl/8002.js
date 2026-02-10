(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = true; // true / false / 'both'
    const expName = "8002"; //experiment name should be 1001, 1002, 1003 etc.
    const variantName = `variant_#` + expName; //variantName should be _variant, _true_control etc.
    const clientDomain = ".hellopebl.com"; //domain should be .spiralyze.com

    /***********************************
      ************************************
      DO NOT TOUCH
      BEYOND THIS LINE
      ******************************
      ******************************/
    const formHiddenValue = variantName;
    if (squeezePage === true) {
        window.squeezePageValue = formHiddenValue;
    } else if (squeezePage === false) {
        hiddenValue(expName, variantName);
    } else if (squeezePage === "both") {
        hiddenValue(expName, variantName);
        window.squeezePageValue = formHiddenValue;
    }
    function hiddenValue(currentExperimentName, currentExperimentValue) {
        function setCookie(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie =
                name +
                "=" +
                (value || "") +
                expires +
                ";domain=" +
                clientDomain +
                ";path=/";
        }

        function getCookie(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        var ExistingExperimentName = getCookie("ExperimentName");
        var ExistingExperimentValue = getCookie("ExperimentValue");
        var ExistingExperimentNameList = ExistingExperimentName
            ? ExistingExperimentName.split(",")
            : [];

        if (!ExistingExperimentName) {
            setCookie("ExperimentName", currentExperimentName, 1);
            setCookie("ExperimentValue", currentExperimentValue, 1);
        } else if (
            ExistingExperimentNameList.length > 0 &&
            ExistingExperimentNameList.indexOf(currentExperimentName) == -1
        ) {
            setCookie(
                "ExperimentName",
                ExistingExperimentName + "," + currentExperimentName,
                1
            );
            setCookie(
                "ExperimentValue",
                ExistingExperimentValue + "," + currentExperimentValue,
                1
            );
        } else if (
            ExistingExperimentNameList.length > 0 &&
            ExistingExperimentNameList.indexOf(currentExperimentName) > -1
        ) {
            var existingNames = ExistingExperimentName.split(",");
            var existingValues = ExistingExperimentValue.split(",");
            var index = existingNames.indexOf(currentExperimentName);
            existingValues[index] = currentExperimentValue;
            setCookie("ExperimentName", existingNames.join(","), 1);
            setCookie("ExperimentValue", existingValues.join(","), 1);
        }
    }
})();


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

const carouselData = [
    {
        rating: 5,
        mainText: "Makes hiring simple, compliant, and stress-free. Seamless implementation, smooth onboarding, and reduced manual work.",
        shortName: "RS",
        fullName: "Rishabh S.",
        position: "Analyst Investment Banking"
    },
    {
        rating: 5,
        mainText: "A leader in global employment solutions. Ensures accurate and compliant payroll processing across multiple countries, with automated payments, tax management, and regulatory compliance.",
        shortName: "PC",
        fullName: "Petro C.",
        position: "Support Supervisor"
    },
    {
        rating: 4.5,
        mainText: "You can onboard global talent in minutes! Helps companies expand globally without borders. A great experience.",
        shortName: "MK",
        fullName: "Markus K.",
        position: "Programmer Manager"
    },
    {
        rating: 5,
        mainText: "Manages the complexities of each country's labor laws, tax requirements, and regulations, simplifying HR processes and saving time and resources.",
        shortName: "SZ",
        fullName: "Savely Z.",
        position: "System Analyst"
    },
    {
        rating: 5,
        mainText: "A comprehensive, seamless, and exceptionally reliable platform. The onboarding process is simple, and the integration with local compliance regulations is a major advantage.",
        shortName: "CB",
        fullName: "Cintia B.",
        position: "Sales Development Representative"
    },
]

const testNumber = "8002";
const testType = "v1";

console.log("Working 8002 - v1 |", new Date(Date.now()).toUTCString())

waitForElement(".sc-fMqXUf", (rootEl) => {
    const body = document.body;
    const className = `spz_${testNumber}_${testType}`;

    if (!body.classList.contains(className)) {
        body.classList.add(className);
    }

    // Generate carousel slides
    const carouselSlides = carouselData.map((item, index) => {
        const stars = generateStars(item.rating);
        return `
            <div class="spz-carousel-slide">
                <div>
                    <div class="spz-slide-stars">
                        <div>${stars}</div>
                        <div>${item.rating}/5</div>
                    </div>
                    <p class="spz-slide-text">${item.mainText}</p>
                </div>
                <div class="spz-slide-author">
                    <div class="spz-author-avatar">${item.shortName}</div>
                    <div class="spz-author-info">
                        <div class="spz-author-name">${item.fullName}</div>
                        <div class="spz-author-position">${item.position}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    rootEl.insertAdjacentHTML('afterend', `
        <div class="spz-content-wrapper">
            <div class="spz-review-container">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1769806459/pebl/8002/g2_logosvg.svg" alt="G2 logo">
                <img src="https://res.cloudinary.com/spiralyze/image/upload/v1769806470/pebl/8002/rating_2.svg" alt="Stars">
                <p>
                    <b>4.7</b>
                    <span>(288 reviews)</span>
                </p>
            </div>
            <strong class="spz-carousel-headline">Join top organizations using Pebl to streamline global HR</strong>
            <div class="spz-carousel-container">
                <div class="spz-carousel-wrapper">
                    <div class="spz-carousel-track">
                        ${carouselSlides}
                    </div>
                </div>
                <div class="spz-carousel-controls">
                    <button class="spz-carousel-prev" aria-label="Previous slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M7.41406 4.13225e-07L8.82812 1.41406L5.53523 4.70696C4.90526 5.33692 5.35143 6.41406 6.24234 6.41406L20.4141 6.41406L20.4141 8.41406L6.24234 8.41406C5.35143 8.41406 4.90527 9.4912 5.53523 10.1212L8.82812 13.4141L7.41406 14.8281L-2.35667e-07 7.41406L7.41406 4.13225e-07Z" fill="#171717"/>
                        </svg>
                    </button>
                    <div class="spz-carousel-counter">
                        <span class="spz-current-slide">1</span> / <span class="spz-total-slides">${carouselData.length}</span>
                    </div>
                    <button class="spz-carousel-next" aria-label="Next slide">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M13 14.8281L11.5859 13.4141L14.8788 10.1212C15.5088 9.4912 15.0626 8.41406 14.1717 8.41406L-4.68127e-07 8.41406L-2.69432e-07 6.41406L14.1717 6.41406C15.0626 6.41406 15.5088 5.33692 14.8788 4.70696L11.5859 1.41406L13 7.23272e-07L20.4141 7.41406L13 14.8281Z" fill="#171717"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>    
    `);

    // Initialize carousel functionality
    initCarousel();
});

function generateStars(rating) {
    const isFullStars = rating == 5;

    if (isFullStars) {
        return (
            `<img src="https://res.cloudinary.com/spiralyze/image/upload/v1769806394/pebl/8002/rating_1.svg" alt="stars">`
        )
    }

    return (
        `<img src="https://res.cloudinary.com/spiralyze/image/upload/v1769806378/pebl/8002/rating.svg" alt="stars">`
    )
}

function initCarousel() {
    let currentIndex = 0;
    const track = document.querySelector('.spz-carousel-track');
    const slides = document.querySelectorAll('.spz-carousel-slide');
    const totalSlides = slides.length;
    const prevBtn = document.querySelector('.spz-carousel-prev');
    const nextBtn = document.querySelector('.spz-carousel-next');
    const currentSlideSpan = document.querySelector('.spz-current-slide');

    let slideWidth = 614; // Default width for desktop
    let gap = 20; // Gap between slides
    let autoScrollInterval;
    const autoScrollDelay = 5000; // 5 seconds between slides

    function getSlideWidth() {
        const width = window.innerWidth;
        return width >= 768 ? 614 : 306;
    }

    function updateCarousel() {
        slideWidth = getSlideWidth();
        gap = (slideWidth == 306 ? 12 : 20)
        const offset = -(currentIndex * (slideWidth + gap));
        track.style.transform = `translateX(${offset}px)`;
        currentSlideSpan.textContent = currentIndex + 1;
    }

    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            // Loop back to first slide
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop back to last slide
            currentIndex = totalSlides - 1;
        }
        updateCarousel();
    }

    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval first
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, autoScrollDelay);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoScroll(); // Reset timer when user manually navigates
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoScroll(); // Reset timer when user manually navigates
        });
    }

    // Initial setup
    updateCarousel();
    startAutoScroll(); // Start autoscroll

    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
}