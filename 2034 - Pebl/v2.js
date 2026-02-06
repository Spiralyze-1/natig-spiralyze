(function () {
    const squeezePage = 'both';
    const expName = "2034";
    const variantName = `variant2_#${expName}`;
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

const testNumber = "2034";
const testType = "v2";

waitForElement("#block--unique-id-25661", (docEl) => {
    const body = document.body;
    const className = `spz_${testNumber}_${testType}`;

    if (!body.classList.contains(className)) {
        body.classList.add(className);
    }

    docEl.querySelector(".component-content").innerHTML = `
    <div class="spz-hero-content">
      <div class="spz-hero-content-inner">
        <strong>Build global teams quickly and easily</strong>
        <p>Pebl's AI-powered EOR platform simplifies building and managing teams in 185+ countries, enabling fast, seamless growth across borders.</p>
        <div class="spz-btn-list">
          <a target="_blank" class="btn btn-pacific spz2034_v2" href="https://signup.hellopebl.com/self-signup" rel="noopener">Request a quote</a>
          <a target="_blank" class="nav-link-button-watch-demo btn btn-ghost-dark spz2034_v2" href="https://hellopebl.com/demo/" rel="noopener">Watch demo</a>
        </div>
      </div>
    </div>
    <div class="spz-hero-logos spz-hero-logos-colored">
      <div class="spz-hero-wrapper">
        <strong>Trusted by global leaders</strong>
        <div class="spz-logo-track">
            <ul class="spz-logo-list">
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_01.svg" alt="LastPass" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_02.svg" alt="crunchbase" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_03.svg" alt="attentive" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_04.svg" alt="Materialize" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_05.svg" alt="consensys" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769703805/pebl/2034/logo_22.svg" alt="Penguin Random House" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_07.svg" alt="anuvu" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_08.svg" alt="Linksys" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_09.svg" alt="Glaukos" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_10.svg" alt="Paige" width="120" height="40"/></li>
            </ul>
            <ul aria-hidden class="spz-logo-list">
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_01.svg" alt="LastPass" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_02.svg" alt="crunchbase" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_03.svg" alt="attentive" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_04.svg" alt="Materialize" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_05.svg" alt="consensys" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769703805/pebl/2034/logo_22.svg" alt="Penguin Random House" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_07.svg" alt="anuvu" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_08.svg" alt="Linksys" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_09.svg" alt="Glaukos" width="120" height="40"/></li>
              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_10.svg" alt="Paige" width="120" height="40"/></li>
            </ul>
          </div>
      </div>
    </div>
  `;

    document.querySelector('.node__content .layout:nth-child(2)').innerHTML = `
    <div class="spz-hero-logos spz-hero-logos-black">
      <div class="spz-hero-wrapper">
        <strong>Trusted by global leaders</strong>
	    	<div class="spz-logo-track">
	            <ul class="spz-logo-list">
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_01_black.svg" alt="LastPass" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_02_black.svg" alt="crunchbase" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_03_black.svg" alt="attentive" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_04_black.svg" alt="Materialize" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_05_black.svg" alt="consensys" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_06_black.svg" alt="Penguin Random House" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_07_black.svg" alt="anuvu" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_08_black.svg" alt="Linksys" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_09_black.svg" alt="Glaukos" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_10_black.svg" alt="Paige" width="120" height="40"/></li>
	            </ul>
	            <ul aria-hidden class="spz-logo-list">
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_01_black.svg" alt="LastPass" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_02_black.svg" alt="crunchbase" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_03_black.svg" alt="attentive" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_04_black.svg" alt="Materialize" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769096875/pebl/2034/logo_05_black.svg" alt="consensys" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1770028424/pebl/2034/logo_06_black.svg" alt="Penguin Random House" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_07_black.svg" alt="anuvu" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160902/pebl/2034/logo_08_black.svg" alt="Linksys" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_09_black.svg" alt="Glaukos" width="120" height="40"/></li>
	              <li><img src="https://res.cloudinary.com/spiralyze/image/upload/v1769160903/pebl/2034/logo_10_black.svg" alt="Paige" width="120" height="40"/></li>
	            </ul>
	        </div>
      </div>
    </div>
  `;

    if (document.readyState === "complete") {
        setTimeout(initCarousel, 100);
    } else {
        window.addEventListener("load", initCarousel, { once: true });
    }
});