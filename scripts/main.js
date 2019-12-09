const form = document.getElementsByTagName('form')[0];
const shortenedLinkWrapper = document.querySelector('#shortened-links');

form.addEventListener('submit', function(e) {
      e.preventDefault();

      const longUrlField = document.querySelector('#url-field');
      const longUrl = longUrlField.value;
      
      if (!longUrlField.validity.valid) {
            if (e.target.nextElementSibling) {
                  return;
            } else {
                  renderError();
            }
      } else if (longUrlField.validity.valid) {
            getShortUrl(longUrl);
      }  else return;
})

form.addEventListener('input', function(e) {
      const errorBoxExists = e.target.offsetParent.offsetParent.lastChild.className.includes('error-message')
      if (e.target.validity.valid && errorBoxExists) {
            removeErrorBox(e.target)
      } else return
})

shortenedLinkWrapper.addEventListener('click', async (e) => {
      if (!navigator.clipboard) {
            return;
      }

      const shortenedUrl = e.target.offsetParent.previousElementSibling.firstElementChild.textContent;
      try {
            await navigator.clipboard.writeText(shortenedUrl);
            e.target.textContent = 'Copied!';
            e.target.classList.add('btn-clicked');
      } catch (error) {
            console.log('Unable to copy!');
      }      
})

// Functions

const getShortUrl = (url) => {
      fetch('https://rel.ink/api/links/', {
            method: 'POST',
            headers: {
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: url})
      })
      .then((response) => {
            return response.json();
      })
      .then((data) => {
            renderResult(url, data.hashid)
      }) 
      .catch((error) => {
            console.log(error.statusText)
      })
}

renderError = () => {
      const errRefNode = document.getElementById('shortner-wrapper')
      const errorEl = document.createElement('p');
      errorEl.classList.add('error-message')
      errorEl.textContent = 'Please add a link'
      errRefNode.appendChild(errorEl);
}

removeErrorBox = (inputNode) => inputNode.offsetParent.offsetParent.lastChild.remove();

renderResult = (longUrl, shortUrl) => {
      const linksWrapper = document.createElement('div');
      linksWrapper.classList.add('row', 'mt-2', 'bg-light', 'rounded', 'py-3');

      linksWrapper.innerHTML = `
      <div class='col-lg-7'>
            <p>${longUrl}</p>
      </div>
      <div class='col-lg-3 blue-text'>
            <p>https://rel.ink/${shortUrl}</p>
      </div>
      <div class='col-lg-2'>
            <button class='btn btn-copy btn-lg w-100'>Copy</button>
      </div>
      `
      shortenedLinkWrapper.insertBefore(linksWrapper, shortenedLinkWrapper.firstChild);
}