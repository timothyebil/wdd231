const menuButton = document.getElementById('menuButton');
const animNav = document.getElementById('animNav');

menuButton.addEventListener('click', () => {
    animNav.classList.toggle('open');
    // Alternates hamburger symbol and X symbol for visual quality
    menuButton.innerHTML = animNav.classList.contains('open') ? '&#10006;' : '&#9776;';
});
