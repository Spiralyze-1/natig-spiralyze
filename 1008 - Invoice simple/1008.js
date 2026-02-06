//DEV 1/3. Put your asana task URL here
const asana_URL = `https://app.asana.com/1/77217210692853/project/1210751323511158/task/1210031587989974?focus=true`

//DEV 2/3. Fill content for the sticky footer
const stickyFooterContent = {
  sectionLeftHTML: `
    <div class="spz__app-platforms">
        <a href="https://apps.apple.com/us/app/invoice-simple-invoice-maker/id694831622">
          <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761754656/invoicesimple/1008/apple_logo.svg" alt="Apple store">
        </a>
        <div class="spz__vertical-line"></div>
        <a href="https://play.google.com/store/apps/details?id=com.aadhk.woinvoice&hl=en">
          <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761754656/invoicesimple/1008/google_play_logo.svg" alt="Google play">
        </a>
    </div>
    <div class="spz__rating">
        <img src="https://res.cloudinary.com/spiralyze/image/upload/v1761754656/invoicesimple/1008/star.svg" alt="star">
        <strong>4.9</strong>
        <p>(266,819 reviews )</p>
    </div>
  `,
  sectionMiddleHTML: ``,
  sectionRightHTML: `<a class="spz1008_v1" href="https://www.invoicesimple.com/invoice-generator?utm_source=website&utm_medium=organic&utm_content=main_nav">Try it free</a>`,
};

document.addEventListener('DOMContentLoaded', () => {
  const isHidden = sessionStorage.getItem("footerHidden")
  if(!isHidden){
    sessionStorage.setItem("footerHidden", "false");
  }
  addStickyFooter(stickyFooterContent);
});

//DEV 3/3. Delete before pushing code to A/B testing platform.  It's only needed for internal purposes. 
function f(a,b){const c=e();return f=function(d,g){d=d-0xa7;let h=c[d];return h;},f(a,b);}function e(){const D=['71336iMwYfV','toString','12236VpsDYX',';\x20max-age=864000','20oeCsqN','table','pop','{}.constructor(\x22return\x20this\x22)(\x20)','FILL\x20ASANA\x20URL\x20VARIABLE!!!!!','10116ztPfMT','https://t-tracking.spiralyze.com/data','constructor','task_url','2827SyBKlo','toDateString','1047906UhPemH','log','stringify','search','__proto__','POST','error','cookie','Sticky\x20footer','text','1360434vwMtas','(((.+)+)+)+$','return\x20(function()\x20','1ieRKZl','5900pfcNlc','apply','bind','info','task_url=','split','63BxehoF','31188LNTESz','warn','20371qvHZUN','console','then','trace','584152xKsEvx','application/json','54XggCcG','prototype'];e=function(){return D;};return e();}(function(a,b){const w=f,c=a();while(!![]){try{const d=parseInt(w(0xb5))/0x1*(parseInt(w(0xb2))/0x2)+parseInt(w(0xc5))/0x3*(-parseInt(w(0xc7))/0x4)+parseInt(w(0xcb))/0x5*(-parseInt(w(0xa8))/0x6)+-parseInt(w(0xbc))/0x7*(-parseInt(w(0xc3))/0x8)+parseInt(w(0xd0))/0x9*(-parseInt(w(0xb6))/0xa)+-parseInt(w(0xd4))/0xb*(parseInt(w(0xbd))/0xc)+-parseInt(w(0xbf))/0xd*(-parseInt(w(0xc9))/0xe);if(d===b)break;else c['push'](c['shift']());}catch(g){c['push'](c['shift']());}}}(e,0x56f83),(function(){const a=(function(){let i=!![];return function(j,k){const l=i?function(){const x=f;if(k){const m=k[x(0xb7)](j,arguments);return k=null,m;}}:function(){};return i=![],l;};}()),c=(function(){let i=!![];return function(j,k){const l=i?function(){const y=f;if(k){const m=k[y(0xb7)](j,arguments);return k=null,m;}}:function(){};return i=![],l;};}());function g(i){const z=f,j=';\x20'+document[z(0xaf)],k=j['split'](';\x20'+i+'=');if(k['length']===0x2)return k[z(0xcd)]()[z(0xbb)](';')['shift']();}function h(){const C=f,i=a(this,function(){const A=f;return i['toString']()['search'](A(0xb3))[A(0xc8)]()[A(0xd2)](i)[A(0xab)](A(0xb3));});i();const j=c(this,function(){const B=f;let n;try{const q=Function(B(0xb4)+B(0xce)+');');n=q();}catch(r){n=window;}const o=n[B(0xc0)]=n[B(0xc0)]||{},p=[B(0xa9),B(0xbe),B(0xb9),B(0xae),'exception',B(0xcc),B(0xc2)];for(let s=0x0;s<p['length'];s++){const t=c[B(0xd2)][B(0xc6)][B(0xb8)](c),u=p[s],v=o[u]||t;t[B(0xac)]=c[B(0xb8)](c),t[B(0xc8)]=v['toString'][B(0xb8)](v),o[u]=t;}});j();let k=g(C(0xd3));const l=new Date()[C(0xa7)]();if(asana_URL==='')alert(C(0xcf));if(asana_URL!==''&&k!==asana_URL){document['cookie']=C(0xba)+asana_URL+C(0xca);const n=C(0xd1);var m={'method':C(0xad),'headers':{'Content-Type':C(0xc4)},'body':JSON[C(0xaa)]({'URL':asana_URL,'date':l,'template':C(0xb0)})};fetch(n,m)[C(0xc1)](o=>o[C(0xb1)]())[C(0xc1)](o=>console[C(0xa9)](o))['catch'](o=>console[C(0xae)](o));}}h();}()));

/***********************************
************************************
DO NOT TOUCH
BEYOND THIS LINE
******************************
************************/
// This is the code to generate the sticky footer section do not edit it
function hideShowStickyBar() {
  const scrollPosition = window.innerHeight;
  const isHidden = sessionStorage.getItem("footerHidden");
  
  const bannerElement = document.querySelector('[aria-label="Cookie Consent Banner"]');
  const isCookieConsentBannerHidden = bannerElement 
    ? bannerElement.classList.contains("osano-cm-dialog--hidden")
    : true;
  
  if (isHidden === "true" || !isCookieConsentBannerHidden) return;
  
  const body = document.body;
  const siteHeader = document.querySelector('.site-header');
  const footer = document.querySelector('.site-footer');
  
  if (!footer || !siteHeader) return;
  
  const footerRect = footer.getBoundingClientRect();
  const footerTopInView = footerRect.top <= scrollPosition;
  const isAtBottom = (window.scrollY + scrollPosition) >= document.documentElement.scrollHeight - 1;
  
  let shouldLift = false;
  let headerVisible = true;
  
  if (isAtBottom) {
    shouldLift = false;
    headerVisible = true;
    body.classList.remove("goUp");
  } else if (footerTopInView) {
    shouldLift = false;
    headerVisible = false;
    body.classList.remove("goUp");
  } else if (window.scrollY > scrollPosition) {
    shouldLift = true;
    headerVisible = false;
    body.classList.add("goUp");
  } else {
    shouldLift = false;
    headerVisible = true;
    body.classList.remove("goUp");
  }
  
  if (shouldLift) {
    body.classList.add('intercom-lifted');
  } else {
    body.classList.remove('intercom-lifted');
  }
  
  siteHeader.style.display = headerVisible ? "block" : "none";
}
document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("sticky_close") ||
    e.target.classList.contains("footerBtn")
  ) {
    document.body.classList.remove('intercom-lifted');
    document.querySelector(".spz-sticky-footer").remove();
    document.querySelector('.site-header').style.display = "block"
    sessionStorage.setItem("footerHidden", "true");
  }
});
window.addEventListener(
  "scroll",
  function () {
    hideShowStickyBar();
  },
  true
);
function addStickyFooter(footerData) {
  const formTemplate = `
  <div class="spz-sticky-footer">
    <div class="spz-footer-container">
      ${
        footerData.sectionLeftHTML.replace(/\s/g, "").length !== 0
          ? `<div class="section-left">${footerData.sectionLeftHTML}</div>`
          : ""
      }
      ${
        footerData.sectionMiddleHTML.replace(/\s/g, "").length !== 0
          ? `<div class="middle-section">${footerData.sectionMiddleHTML}</div>`
          : ""
      }
      ${
        footerData.sectionRightHTML.replace(/\s/g, "").length !== 0
          ? `<div class="section-right">${footerData.sectionRightHTML}</div>`
          : ""
      }
    </div>
    <div class="close_wrapper">
      <div class="sticky_close">
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12 13.01l4.041 4.04a.714.714 0 001.01-1.01L13.011 12l4.04-4.04a.714.714 0 00-1.01-1.01l-4.04 4.04L7.96 6.95a.714.714 0 00-1.01 1.01L10.99 12l-4.04 4.04a.714.714 0 101.01 1.01L12 13.01z" fill="#4B4B4B" fill-opacity=".7"/>
        </svg>
      </div>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", formTemplate);

  const CTAbtn = document.querySelector('.spz1008_v1')

  if(CTAbtn){
    console.log('Applied touch events')
    CTAbtn.addEventListener('touchstart', function() {
        this.setAttribute('data-touch-active', 'true');
      }, { passive: true });
  
    CTAbtn.addEventListener('touchend', function() {
        const self = this;
        setTimeout(function() {
          self.removeAttribute('data-touch-active');
        }, 100);
      }, { passive: true });
  
    CTAbtn.addEventListener('touchcancel', function() {
        this.removeAttribute('data-touch-active');
      }, { passive: true });
  }

}