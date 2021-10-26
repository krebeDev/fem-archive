const form = document.querySelector('form');
const email = document.querySelector('#emailaddress');
let error = document.querySelector('.on-error');

email.addEventListener('input', function(e) {
    if (email.validity.valid) {
        error.innerHTML = '';
        error.className = 'on-error';
    }
}, false);

form.addEventListener('submit', function(e) {
    if (!email.validity.valid) {
        error.innerHTML = 'Please provide a valid email';
        e.preventDefault();
        email.focus();
    }
}, false)