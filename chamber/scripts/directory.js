document.addEventListener("DOMContentLoaded", () => {
    // 1. Structural DOM Element Node Reference Selection Queries
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
    const viewGridBtn = document.getElementById("viewGrid");
    const viewListBtn = document.getElementById("viewList");
    const displayArticle = document.getElementById("directoryDisplay");
    
    const yearSpan = document.getElementById("yearNode");
    const modParagraph = document.getElementById("modNode");

    // 2. Mobile Dynamic Hamburger Slide Menu Channel Interaction Mechanics
    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            primaryNav.classList.toggle("open");
            navToggle.textContent = primaryNav.classList.contains("open") ? "✖" : "☰";
        });
    }

    // 3. Automated Document Metadata Spans Configuration
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modParagraph) modParagraph.textContent = `Last Modified: ${document.lastModified}`;

    // 4. Asynchronous Data Fetch Engine Pipeline (fetch + async/await)
    const dataUrl = "data/members.json";

    async function fetchChamberMembers() {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) throw new Error(`HTTP Endpoint Access Exception Status: ${response.status}`);
            const membersArray = await response.json();
            renderDirectory(membersArray);
        } catch (error) {
            console.error("Asynchronous data operations error:", error);
            if (displayArticle) {
                displayArticle.innerHTML = `<p class="error-msg">Failed to retrieve business directory entries loop data feeds.</p>`;
            }
        }
    }

    // 5. Dynamic Node Renderer (Populating Semantic Content Layout Elements)
    function renderDirectory(members) {
        if (!displayArticle) return;
        displayArticle.innerHTML = "";

        members.forEach(member => {
            const card = document.createElement("section");
            card.className = "directory-card";
            
            const tiers = { 1: "Standard Member", 2: "Silver Partner", 3: "Gold Partner" };
            const tierClass = { 1: "tier-member", 2: "tier-silver", 3: "tier-gold" };

            card.innerHTML = `
                <div class="card-image-box">
                    <img src="images/member-logos/${member.image}" alt="${member.name} Corporate Emblem" loading="lazy" width="180" height="100">
                </div>
                <h3>${member.name}</h3>
                <p class="company-tagline">"${member.tagline}"</p>
                <div class="company-details">
                    <p><b>Address:</b> ${member.address}</p>
                    <p><b>Phone:</b> ${member.phone}</p>
                    <p class="company-web-link"><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
                </div>
                <span class="membership-badge ${tierClass[member.membershipLevel]}">${tiers[member.membershipLevel]}</span>
            `;
            displayArticle.appendChild(card);
        });
    }

    // 6. Layout Mode Switch State Logic Controllers (Grid Card vs Imageless List Row)
    if (viewGridBtn && viewListBtn && displayArticle) {
        viewGridBtn.addEventListener("click", () => {
            displayArticle.className = "grid-mode";
            viewGridBtn.classList.add("active");
            viewListBtn.classList.remove("active");
        });

        viewListBtn.addEventListener("click", () => {
            displayArticle.className = "list-mode";
            viewListBtn.classList.add("active");
            viewGridBtn.classList.remove("active");
        });
    }

    // Execute the directory pipeline operations stream
    fetchChamberMembers();
});
