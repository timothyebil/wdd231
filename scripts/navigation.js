document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("animNav");

    menuButton.addEventListener("click", () => {
        const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
        menuButton.setAttribute("aria-expanded", !expanded);
        navMenu.classList.toggle("show");
        
        // Toggles hamburger character to an 'X' close indicator
        menuButton.textContent = navMenu.classList.contains("show") ? "✕" : "☰";
    });
});
