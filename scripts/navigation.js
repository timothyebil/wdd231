// Toggle navigation menu visibility on small viewports
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#animNav');

menuButton.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuButton.classList.toggle('open');
    
    // Accessibility management
    const expanded = mainNav.classList.contains('open');
    menuButton.setAttribute('aria-expanded', expanded);
    
    if (expanded) {
        menuButton.textContent = '✕';
    } else {
        menuButton.textContent = '☰';
    }
});
