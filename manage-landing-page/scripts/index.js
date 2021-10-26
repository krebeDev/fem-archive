const menuToggler = document.querySelector(".menu-toggler");
const mobileIndicators = document.querySelectorAll(".mobile-indicator");
const cards = document.querySelectorAll(".testimonial-card");
const rightSlide = document.querySelector('.right');
const leftSlide = document.querySelector('.left');
const signUpForm = document.querySelector('.sign-up-form');
const errorMessage = document.querySelector('.error-message');


menuToggler.addEventListener("click", function() {
  const navMenu = document.querySelector(".navbar-menu");
  if (this.classList.contains('open-icon')) {
    navMenu.classList.remove('collapse');
    this.classList.replace('open-icon', 'close-icon');
  } else {
      navMenu.classList.add('collapse');
      this.classList.replace('close-icon', 'open-icon');
    }
});
  
rightSlide.addEventListener('click', () => handleScroll(-350))
  
leftSlide.addEventListener('click', () => handleScroll(350));

mobileIndicators.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    removeClass(cards, 'show');
    removeClass(mobileIndicators, 'active');
    addClass(cards[index], 'show');
    addClass(dot, 'active');
  })
})

signUpForm.addEventListener('submit', function() {
  const email = document.querySelector('#email').value;
  event.preventDefault();
  
  if (checkEmail(email)) {
    alert('Thank you for checking out this demo');
    this.reset();
  } else {
    addClass(errorMessage, 'show');
  }
})

signUpForm.addEventListener('change', function(e) {
  if (errorExists && checkEmail(e.target.value)) {
    errorMessage.classList.remove('show');
  }
});

function handleScroll(left) {
  const testimonialRow = document.querySelector('.testimonial-row');
  testimonialRow.scroll({
  left,
  behavior: 'smooth',
})
};

function removeClass(elems, eClass) {
  elems.forEach(elem => elem.classList.remove(eClass))
}

function addClass(elem, eClass) {
  elem.classList.add(eClass);
}

function checkEmail(email) {
  const emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (emailFormat.test(email.trim()));
}

function errorExists() {
  return errorMessage.classList.contains('show');
}