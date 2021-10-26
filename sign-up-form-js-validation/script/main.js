const form = document.querySelector('form');

// Check if input entries are valid, and ensure there is no error message on each field
form.addEventListener('input', function(e){
      if (e.target.validity.valid && e.target.nextElementSibling) {
            removeError(e.target);
      }
});

// Submit button events
form.addEventListener('submit', function(e) {
      const inputFields = document.querySelectorAll('input');

      // Loop through all input fields to check for invalid fields
      inputFields.forEach(function(input) {
            if (!input.validity.valid) {
                  e.preventDefault();

                  // Check if there already exists an error message
                  if (input.nextElementSibling) { 
                        return
                  } 
                  else {
                        showError(input, input.placeholder);
                  }
            }
      });
});

// Functions

removeError = (inputNode) => inputNode.nextElementSibling.remove();

showError = (inputNode, value) => {
      const errMessage = ' cannot be empty';
      const messageEl = document.createElement('p');
      messageEl.classList.add('error-message');
      if (value.includes('Email')) {
            messageEl.innerHTML = 'Looks like this is not an email';
      } else {
            messageEl.innerHTML = value + errMessage;
      }
      inputNode.parentNode.appendChild(messageEl);
}