document.addEventListener("DOMContentLoaded", () => {
    // 0. Responsive Navigation & Dynamic Footer Dates
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
    const yearSpan = document.getElementById("yearNode");
    const modParagraph = document.getElementById("modNode");

    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");
            navToggle.textContent = isOpen ? "✖" : "☰";
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modParagraph) modParagraph.textContent = `Last Modified: ${document.lastModified}`;

    // 1. Set Hidden Form Load Timestamp on join.html
    const timestampInput = document.getElementById("formTimestamp");
    if (timestampInput) {
        const now = new Date();
        timestampInput.value = now.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    // 2. Open & Close Membership Tier Modals
    const openButtons = document.querySelectorAll(".modal-open-btn");
    const closeButtons = document.querySelectorAll(".modal-close-btn");

    openButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside dialog backdrop
    document.querySelectorAll("dialog.tier-modal").forEach((dialog) => {
        dialog.addEventListener("click", (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog =
                rect.top <= e.clientY &&
                e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX &&
                e.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                dialog.close();
            }
        });
    });

    // 3. Parse URL Parameters on thankyou.html
    const resultsContainer = document.getElementById("applicationSummary");
    if (resultsContainer) {
        const params = new URLSearchParams(window.location.search);
        const tierNames = {
            np: "NP Membership (Non-Profit)",
            bronze: "Bronze Membership",
            silver: "Silver Membership",
            gold: "Gold Membership"
        };

        const fname = params.get("fname") || "Applicant";
        const lname = params.get("lname") || "";
        const orgtitle = params.get("orgtitle") || "Not specified";
        const email = params.get("email") || "Not provided";
        const phone = params.get("phone") || "Not provided";
        const organization = params.get("organization") || "Not provided";
        const membership = tierNames[params.get("membership")] || "Standard";
        const timestamp = params.get("timestamp") || new Date().toLocaleString();

        resultsContainer.innerHTML = `
            <div class="summary-card">
                <h2>Application Confirmation Receipt</h2>
                <p>Thank you, <strong>${fname} ${lname}</strong>! Your membership application for <strong>${organization}</strong> has been received by the Lira Chamber of Commerce.</p>
                <dl class="summary-list">
                    <dt>Applicant Name:</dt>
                    <dd>${fname} ${lname}</dd>

                    <dt>Organizational Title:</dt>
                    <dd>${orgtitle}</dd>

                    <dt>Email Address:</dt>
                    <dd>${email}</dd>

                    <dt>Mobile Phone:</dt>
                    <dd>${phone}</dd>

                    <dt>Business / Organization:</dt>
                    <dd>${organization}</dd>

                    <dt>Selected Membership Level:</dt>
                    <dd>${membership}</dd>

                    <dt>Submission Timestamp:</dt>
                    <dd>${timestamp}</dd>
                </dl>
                <a href="index.html" class="cta-btn">Return to Home Portal</a>
            </div>
        `;
    }
});
