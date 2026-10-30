document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuButton");
    const animNav = document.getElementById("animNav");

    if (menuButton && animNav) {
        menuButton.addEventListener("click", () => {
            animNav.classList.toggle("open");
            
            if (animNav.classList.contains("open")) {
                menuButton.textContent = "✖";
                menuButton.setAttribute("aria-expanded", "true");
            } else {
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }
});
