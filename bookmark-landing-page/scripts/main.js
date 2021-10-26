const tabs = document.querySelectorAll('.features__tab');
const tabContents = document.querySelectorAll('.features__tab__content');

accordion = document.querySelectorAll('.faqs__accordion__block');

const contactForm = document.querySelector('.contact__cta')
const errorWrapper = document.querySelector('.error-wrapper');

tabs.forEach(tab => {
      tab.addEventListener('click', () => {
            if (!isActive(tab, 'active')) {
                  deactivateStates(tabs, 'tab--active');
                  hidePrevious(tabContents, 'active');
                  activateState(tab, 'tab--active');
                  showTabContents(tabContents, tab, 'active'); 
            } else return;
      })
})

accordion.forEach(faq => {
      faq.addEventListener('click', () => {
            faq.lastElementChild.classList.toggle('active');
            arrow(faq).classList.toggle('arrow--active');
      })
})


contactForm.addEventListener('input', e => {
      if (validEmail(e.target) && errorMessageExists(errorWrapper)) {
            removeErrorMessage(errorWrapper.firstElementChild);
            removeStateClass(emailField, 'invalid--field')
      }
})

contactForm.addEventListener('submit', e => {
      const emailField = document.querySelector('#email-field');
      
      if(!validEmail(emailField)) {
            e.preventDefault();
            
            if (errorMessageExists(errorWrapper)) {
                  return
            } else {
                  renderError(errorWrapper);
                  activateState(emailField, 'invalid--field');
            }
      }
}, false)


// Functions  

isActive = (target, tState) => target.className.includes(tState);

deactivateStates = (allTabs, tState) => {
      allTabs.forEach(tab => { 
            if (tab.className.includes(tState)) {
                  removeStateClass(tab, tState);
            } else return;    
      })                
}

hidePrevious = (allTabContents, cState) => {
      allTabContents.forEach(content => {
            if (content.className.includes(cState)) {
                  removeStateClass(content, cState);
            } else return;
      })
}

showTabContents = (allTabContents, originTab, cState) => {
      allTabContents.forEach(content => {
            if (content.id.includes(originTab.id)) {
                  content.classList.add(cState);
            }
      }) 
}

removeStateClass = (el, sClass) => el.classList.remove(sClass);

activateState = (el, sClass) => el.classList.add(sClass);

validEmail = (entry) => entry.validity.valid;

errorMessageExists = (wrapper) => wrapper.hasChildNodes();

const arrow = (parent) => parent.firstElementChild.firstElementChild.nextElementSibling.firstElementChild;

removeErrorMessage = (wrapper) => wrapper.remove();

renderError = (wrapper) => wrapper.innerHTML = `<p class='email-error'> Whoops. Make sure it's an email` 