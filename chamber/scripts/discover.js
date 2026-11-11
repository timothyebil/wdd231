import { attractions } from '../data/discover.mjs';

// 1. localStorage Visitor Message Logic
const visitBanner = document.querySelector('#visitBanner');
const visitMessage = document.querySelector('#visitMessage');
const closeVisitBtn = document.querySelector('#closeVisitBtn');

if (visitMessage) {
    const msPerDay = 86400000;
    const now = Date.now();
    const lastVisit = Number(localStorage.getItem('liraChamberLastVisit'));

    if (!lastVisit) {
        visitMessage.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const diffMs = now - lastVisit;
        if (diffMs < msPerDay) {
            visitMessage.textContent = 'Back so soon! Awesome!';
        } else {
            const days = Math.floor(diffMs / msPerDay);
            const dayWord = days === 1 ? 'day' : 'days';
            visitMessage.textContent = `You last visited ${days} ${dayWord} ago.`;
        }
    }

    localStorage.setItem('liraChamberLastVisit', now.toString());
}

if (closeVisitBtn && visitBanner) {
    closeVisitBtn.addEventListener('click', () => {
        visitBanner.style.display = 'none';
    });
}

// 2. Render 8 Attraction Cards with Named Grid Areas
const gridContainer = document.querySelector('#discoverGrid');
const modal = document.querySelector('#discoverModal');
const modalTitle = document.querySelector('#modalTitle');
const modalAddress = document.querySelector('#modalAddress');
const modalDesc = document.querySelector('#modalDesc');
const closeModalBtn = document.querySelector('#closeDiscoverModal');

if (gridContainer) {
    attractions.forEach((place, index) => {
        const card = document.createElement('article');
        card.classList.add('chamber-card', 'discover-card', `area-${place.id}`);

        // Do not lazy-load the first 2 cards above the fold for faster LCP
        const loadingAttr = index < 2 ? '' : 'loading="lazy"';

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="${place.image}" alt="${place.name}" width="300" height="200" ${loadingAttr}>
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" class="toggle-btn learn-btn">Learn More</button>
        `;

        const btn = card.querySelector('.learn-btn');
        btn.addEventListener('click', () => {
            if (modal && modalTitle && modalAddress && modalDesc) {
                modalTitle.textContent = place.name;
                modalAddress.textContent = `📍 ${place.address}`;
                modalDesc.textContent = place.description;
                modal.showModal();
            }
        });

        gridContainer.appendChild(card);
    });
}

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}
