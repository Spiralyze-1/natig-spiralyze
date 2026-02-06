(function () {
    const squeezePage = true;
    const expName = "8002";
    const variantName = `variant_#${expName}`;
    const clientDomain = ".hellopebl.com";

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
        const setCookie = (name, value, days) => {
            const expires = days
                ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}`
                : "";
            document.cookie = `${name}=${value || ""}${expires};domain=${clientDomain};path=/`;
        };

        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
            return match ? match[2] : null;
        };

        const existingName = getCookie("ExperimentName");
        const existingValue = getCookie("ExperimentValue");
        const nameList = existingName ? existingName.split(",") : [];
        const index = nameList.indexOf(currentExperimentName);

        if (!existingName) {
            setCookie("ExperimentName", currentExperimentName, 1);
            setCookie("ExperimentValue", currentExperimentValue, 1);
        } else if (index === -1) {
            setCookie("ExperimentName", `${existingName},${currentExperimentName}`, 1);
            setCookie("ExperimentValue", `${existingValue},${currentExperimentValue}`, 1);
        } else {
            const names = existingName.split(",");
            const values = existingValue.split(",");
            values[index] = currentExperimentValue;
            setCookie("ExperimentName", names.join(","), 1);
            setCookie("ExperimentValue", values.join(","), 1);
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

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
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
            updateCarousel();
        }
    }

    function startAutoScroll() {
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

    // Pause autoscroll on hover
    const carouselContainer = document.querySelector('.spz-carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);
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