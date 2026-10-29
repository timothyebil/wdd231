// Dynamically populate copyright year and last modified statement
document.addEventListener("DOMContentLoaded", () => {
    const currentYearSpan = document.querySelector("#currentyear");
    const lastModifiedP = document.querySelector("#lastModified");

    // Populate current year
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Populate last modified date string
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
    }
});
