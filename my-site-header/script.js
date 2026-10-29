// Select elements from the DOM
const menuButton = document.getElementById('menu-btn');
const navigationMenu = document.getElementById('nav-menu');

// Define specific standardized target Unicode glyph code constants
const ICON_HAMBURGER = '&#9776;'; // ☰
const ICON_CLOSE     = '&#10006;'; // ✖

/**
 * Handle state changes when click interactions register
 */
menuButton.addEventListener('click', () => {
    // Toggle class identifier injection
    navigationMenu.classList.toggle('open');
    
    // Evaluate operational visual visibility flags inside context structures
    if (navigationMenu.classList.contains('open')) {
        menuButton.innerHTML = ICON_CLOSE;
    } else {
        menuButton.innerHTML = ICON_HAMBURGER;
    }
});
