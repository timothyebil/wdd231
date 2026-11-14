/**
 * ==========================================================================
 * WDD 231 Chamber Portal - Shared Navigation, Footer & Directory Engine
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
    const viewGridBtn = document.getElementById("viewGrid");
    const viewListBtn = document.getElementById("viewList");
    const displayContainer = document.getElementById("directoryDisplay");
    const yearSpan = document.getElementById("yearNode");
    const modParagraph = document.getElementById("modNode");

    // Responsive Navigation Toggle
    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");
            navToggle.textContent = isOpen ? "✖" : "☰";
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // Dynamic Footer Dates
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modParagraph) modParagraph.textContent = `Last Modified: ${document.lastModified}`;

    // Async/Await JSON Fetch
    const dataUrl = "./data/members.json";

    async function fetchChamberMembers() {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const members = await response.json();
            renderDirectory(members);
        } catch (error) {
            console.error("Failed to fetch member directory:", error);
            if (displayContainer) {
                displayContainer.innerHTML = `<p class="error-msg">Unable to load chamber members at this time.</p>`;
            }
        }
    }

    // Render Member Cards
    function renderDirectory(members) {
        if (!displayContainer) return;
        displayContainer.innerHTML = "";

        const tierLabels = { 1: "Member", 2: "Silver", 3: "Gold" };
        const tierClasses = { 1: "tier-member", 2: "tier-silver", 3: "tier-gold" };

        members.forEach((member) => {
            const card = document.createElement("section");
            card.className = `directory-card ${tierClasses[member.membershipLevel] || "tier-member"}`;

            card.innerHTML = `
                <div class="card-image-box">
                    <img src="images/member-logos/${member.image}" alt="${member.name} Logo" loading="lazy" width="180" height="90">
                </div>
                <h3>${member.name}</h3>
                <p class="company-tagline">${member.tagline || ""}</p>
                <div class="company-details">
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p class="company-web-link"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                </div>
                <span class="membership-badge">${tierLabels[member.membershipLevel] || "Member"} Tier</span>
            `;

            displayContainer.appendChild(card);
        });
    }

    // Grid / List Layout Toggle
    if (viewGridBtn && viewListBtn && displayContainer) {
        viewGridBtn.addEventListener("click", () => {
            displayContainer.classList.remove("list-mode");
            displayContainer.classList.add("grid-mode");
            viewGridBtn.classList.add("active");
            viewListBtn.classList.remove("active");
        });

        viewListBtn.addEventListener("click", () => {
            displayContainer.classList.remove("grid-mode");
            displayContainer.classList.add("list-mode");
            viewListBtn.classList.add("active");
            viewGridBtn.classList.remove("active");
        });
    }

    fetchChamberMembers();
});
