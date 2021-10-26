const signUpForm = document.querySelector('#sign-up-form');
const errorMessage = document.querySelector('.error-message');

signUpForm.addEventListener('submit', (e) => {
      let userEmail = document.querySelector('#email-id').value;
      e.preventDefault();
      if (checkEmail(userEmail)) {
            alert('Thank you... but this is only a demo page!');
      } else {
            showError(errorMessage);
      }
});

signUpForm.addEventListener('change', (e) => {
      if (errorExists(errorMessage) && checkEmail(e.target.value)) {
            hideError(errorMessage);
      } else return;
})


// Functions

const checkEmail = (email) => {
      const eFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return (eFormat.test(email.trim()));
}

const showError = (error) => error.classList.remove('hide');
const errorExists = (error) => !error.className.includes('hide');
const hideError = (error) => error.classList.add('hide');