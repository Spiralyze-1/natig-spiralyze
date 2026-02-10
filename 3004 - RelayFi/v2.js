// #3004 | Relay | Home | Bento - Variant 2
// https://app.asana.com/1/77217210692853/task/1211867523594527

const bentoConfig = {
    insertBefore: 'main section:nth-of-type(3)', // Insert after hero section
    ctaUrl: 'https://app.relayfi.com/v3/register/user',
    baseUrl: 'https://res.cloudinary.com/spiralyze/image/upload/f_auto/relay/3004/',
    images: {
        checkingSavings: {
            fourK: 'copy_20.webp',
            desktop: 'copy_11.webp',
            tablet: 'copy_5.webp',
            mobile: 'copy_8.webp',
            alt: 'Business checking and savings'
        },
        creditDebit: {
            fourK: 'copy_23.webp',
            desktop: 'copy_14.webp',
            tablet: 'copy_16.webp',
            mobile: 'copy_4.webp',
            alt: 'Credit and debit'
        },
        spendManagement: {
            fourK: 'copy_19.webp',
            desktop: 'copy_12.webp',
            tablet: 'copy_9.webp',
            mobile: 'copy_10.webp',
            alt: 'Spend management'
        },
        accountsPayable: {
            fourK: 'copy_22.webp',
            desktop: 'copy_13.webp',
            tablet: 'copy_1.webp',
            mobile: 'copy_3.webp',
            alt: 'Accounts payable'
        },
        accountsReceivable: {
            fourK: 'copy_21.webp',
            desktop: 'copy_15.webp',
            tablet: 'copy_6.webp',
            mobile: 'copy_7.webp',
            alt: 'Accounts receivable'
        },
        integrations: {
            fourK: 'copy_18.webp',
            desktop: 'copy_17.webp',
            tablet: 'copy_2.webp',
            mobile: 'copy.webp',
            alt: 'Integrations'
        }
    }
};

// Initialize Bento section when page is ready
const initBento = setInterval(() => {
    const targetSection = document.querySelector(bentoConfig.insertBefore);

    if (targetSection && !document.querySelector('.spz-bento-section-v2')) {
        clearInterval(initBento);
        document.body.classList.add('spz_3004_v2');
        insertBentoSection();
    }
}, 100);

// Timeout to stop checking after 10 seconds
setTimeout(() => clearInterval(initBento), 10000);

// Generate responsive picture element
function generatePicture(imageConfig) {
    const { baseUrl } = bentoConfig;
    const { fourK, desktop, tablet, mobile, alt } = imageConfig;

    return `
    <picture>
      <source media="(min-width: 1920px)" srcset="${baseUrl}${fourK}">
      <source media="(min-width: 1025px)" srcset="${baseUrl}${desktop}">
      <source media="(min-width: 768px)" srcset="${baseUrl}${tablet}">
      <img src="${baseUrl}${mobile}" alt="${alt}" loading="lazy">
    </picture>
  `;
}

// Create and insert the Bento section
function insertBentoSection() {
    const bentoHTML = `
    <section class="spz-bento-section-v2">
      <div class="spz-bento-container">
        <h2 class="spz-bento-heading">All your banking &&nbsp<br>finance in one place</h2>
        
        <div class="spz-bento-grid">
          <!-- Row 1: Large + Small -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Business checking & savings</h3>
                <p class="spz-card-description">Open up to 20 checking accounts and separate incoming deposits for taxes, payroll, bills, and more. Always know what's safe to spend and auto-transfer what's left into savings so you never waste a cent.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.checkingSavings)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Credit & debit</h3>
                <p class="spz-card-description">Issue up to 50 debit cards and 20 credit cards. Easily keep funds organized by linking cards to spend categories, vendors, and more.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.creditDebit)}
              </div>
            </div>
          </div>
          
          <!-- Row 2: Small + Large -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Spend management</h3>
                <p class="spz-card-description">Auto-capture receipts and track spending. Avoid chasing after receipts or digging through emails. Control costs with spend limits and approved vendors.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.spendManagement)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Accounts payable</h3>
                <p class="spz-card-description">Automatically upload bills including vendor names, amounts, and more. No more typing in vendor data so you can close the books faster. Create approval rules that let team members speed up bill pay while you stay in control.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.accountsPayable)}
              </div>
            </div>
          </div>
          
          <!-- Row 3: Large + Small -->
          <div class="spz-bento-row">
            <div class="spz-bento-card spz-card-light spz-card-large">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Accounts receivable</h3>
                <p class="spz-card-description">Get paid faster and streamline invoicing by creating, sending, and tracking invoices in one place. Encourage timely payments by tracking overdue invoices and sending requests and reminders.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.accountsReceivable)}
              </div>
            </div>
            
            <div class="spz-bento-card spz-card-dark spz-card-small">
              <div class="spz-card-content">
                <h3 class="spz-card-title">Integrations</h3>
                <p class="spz-card-description">Connect to QuickBooks, Xero, Gusto, Plaid, Yodlee, and Dext. Use your Relay account to send and receive payments on Expensify, Wave, FreshBooks, and more.</p>
              </div>
              <div class="spz-card-image">
                ${generatePicture(bentoConfig.images.integrations)}
              </div>
            </div>
          </div>
        </div>
        
        <div class="spz-bento-cta-v2">
          <a href="${bentoConfig.ctaUrl}" class="spz-bento-button spz3004_v2">Get Started</a>
        </div>
      </div>
    </section>
  `;

    const targetSection = document.querySelector(bentoConfig.insertBefore);
    if (targetSection) {
        targetSection.insertAdjacentHTML('afterbegin', bentoHTML);
    }
}

// Add hover effects to CTA button
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.spz-bento-button')) {
        e.target.closest('.spz-bento-button').classList.add('spz-hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.spz-bento-button')) {
        e.target.closest('.spz-bento-button').classList.remove('spz-hover');
    }
});