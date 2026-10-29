const menuButton = document.getElementById('menuButton');
const animNav = document.getElementById('animNav');

menuButton.addEventListener('click', () => {
    animNav.classList.toggle('open');
    menuButton.textContent = animNav.classList.contains('open') ? '✕' : '☰';
});
