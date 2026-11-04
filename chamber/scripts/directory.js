const jsonPath = "data/members.json";
const displayContainer = document.querySelector("#directoryDisplay");
const gridButton = document.querySelector("#viewGrid");
const listButton = document.querySelector("#viewList");

// Asynchronous data retrieval engine
async function fetchAndRenderMembers() {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`Network status error: ${response.status}`);
        }
        const data = await response.json();
        renderDirectoryCards(data.members);
    } catch (error) {
        console.error("Error gathering member directory records:", error);
        displayContainer.innerHTML = `<p class="error-msg">Unable to process directory data records at this time.</p>`;
    }
}

// Helper to resolve numeric values to membership label tiers
function getMembershipTier(level) {
    switch(level) {
        case 3: return "Gold";
        case 2: return "Silver";
        case 1: 
        default: return "Member";
    }
}

// UI DOM Component generator
function renderDirectoryCards(membersList) {
    displayContainer.innerHTML = ""; 
    
    membersList.forEach(member => {
        const cardSection = document.createElement("section");
        cardSection.className = "directory-card";
        
        const tierLabel = getMembershipTier(member.membershipLevel);
        
        cardSection.innerHTML = `
            <img src="${member.image}" alt="${member.name} Corporate Logo" width="150" height="75" loading="lazy">
            <h3>${member.name}</h3>
            <p class="street-address">${member.address}</p>
            <p class="phone-number">${member.phone}</p>
            <p class="membership-badge">Tier: <span class="tier-${tierLabel.toLowerCase()}">${tierLabel}</span></p>
            <p class="web-routing"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        `;
        
        displayContainer.appendChild(cardSection);
    });
}

// View toggle mechanics
gridButton.addEventListener("click", () => {
    displayContainer.classList.add("grid-mode");
    displayContainer.classList.remove("list-mode");
    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    displayContainer.classList.add("list-mode");
    displayContainer.classList.remove("grid-mode");
    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

// Run engine on load
fetchAndRenderMembers();
