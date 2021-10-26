const toggleButton = document.querySelector('.menu-toggler');
const mobileMenu = document.querySelector('.nav-menu');

const toggleMenu = () => mobileMenu.classList.toggle('hide');

toggleButton.addEventListener('click', toggleMenu);