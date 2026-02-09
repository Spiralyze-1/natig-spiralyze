(function () {
    //Add the following code of experiment. This code will set the cookie with the experiment name and variant name.

    // Set the value of the squeezePage variable as needed:
    // true  – if you are using a squeeze page (i.e., the page contains a form)
    // false – if you are not using a squeeze page (i.e., the page does not contain a form)
    // 'both' – if you want to set both the cookie and the hidden field value (i.e., the page has a form and you also want to set a cookie)

    const squeezePage = 'both'; // true / false / 'both'
    const expName = "2034"; //experiment name should be 1001, 1002, 1003 etc.
    const variantName = `variant2_#` + expName; //variantName should be _variant, _true_control etc.
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
});