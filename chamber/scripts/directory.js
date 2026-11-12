/**
 * ==========================================================================
 * WDD 231 Chamber Portal - Shared Navigation, Footer & Directory Engine
 * ==========================================================================
 */

// 1. Mobile Navigation Toggle
const navToggle = document.querySelector('#navToggle');
const primaryNav = document.querySelector('#primaryNav');

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('open');
        navToggle.textContent = primaryNav.classList.contains('open') ? '✕' : '☰';
    });
}

// 2. Dynamic Footer Dates
const yearNode = document.querySelector('#yearNode');
const modNode = document.querySelector('#modNode');

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}
if (modNode) {
    modNode.textContent = `Last Modified: ${document.lastModified}`;
}

// 3. Directory View Switcher & Member Card Loader
const dataUrl = 'data/members.json';
const displayArea = document.querySelector('#directoryDisplay');
const btnGrid = document.querySelector('#viewGrid');
const btnList = document.querySelector('#viewList');

if (btnGrid && btnList && displayArea) {
    btnGrid.addEventListener('click', () => {
        displayArea.classList.add('grid-mode');
        displayArea.classList.remove('list-mode');
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
    });

    btnList.addEventListener('click', () => {
        displayArea.classList.add('list-mode');
        displayArea.classList.remove('grid-mode');
        btnList.classList.add('active');
        btnGrid.classList.remove('active');
    });
}

async function getDirectoryData() {
    if (!displayArea) return;

    try {
        const response = await fetch(dataUrl);
        if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
        const data = await response.json();
        buildBusinessCards(data.members);
    } catch (error) {
        console.error('Error loading directory members:', error);
        displayArea.innerHTML = `<p class="error">Unable to load chamber members at this time.</p>`;
    }
}

function buildBusinessCards(businessArray) {
    displayArea.innerHTML = '';

    businessArray.forEach(company => {
        let tierLabel = 'Member';
        if (company.membershipLevel === 3) tierLabel = 'Gold';
        if (company.membershipLevel === 2) tierLabel = 'Silver';

        const card = document.createElement('section');
        card.classList.add('directory-card', `tier-${tierLabel.toLowerCase()}`);

        card.innerHTML = `
            <div class="card-image-box">
                <img src="${company.image}" alt="${company.name} logo" width="150" height="75" loading="lazy">
            </div>
            <h3>${company.name}</h3>
            <p class="company-tagline">Verified Lira Chamber Business Partner</p>
            <span class="membership-badge">${tierLabel} Partner</span>
            <div class="company-details">
                <p>📍 ${company.address}</p>
                <p>📞 ${company.phone}</p>
                <p class="company-web-link"><a href="${company.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        `;
        displayArea.appendChild(card);
    });
}

getDirectoryData();
