const getElem = (item) => document.querySelector(item);

const themeSwitch = getElem('.theme-switch');
const themeName = getElem('.theme-name')
const countriesContainer = getElem('.countries');
const countryContainer = getElem('.country');
const countriesInfo = getElem('.countries__info');
const countrySearch = getElem('#search-country');
const filterRegion = getElem('#filter-region');
const returnBtn = getElem('.btn');

const alphaCodes = [];

document.addEventListener('load', getCountries(countriesInfo), false);

getUserTheme();

themeSwitch.addEventListener('click', toggleTheme, false);


countrySearch.addEventListener('input', (e) => {
      const  cards = document.querySelectorAll('.card'); //*
      cards.forEach(card => {
            const countryName = card.children[1].children[0].textContent;
            countryName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1 ? card.style.display = '' : card.style.display = 'none';
      });
});


// .card is being redeclared yet in another local scope
// It cannot be accessed globally because it was dynamically created
// Card targeting needs refactoring.

filterRegion.addEventListener('change', (e) => {
      const  cards = document.querySelectorAll('.card'); //*
      cards.forEach(card => {
            const region = card.children[1].children[2].textContent;
            region.toLowerCase().includes(e.target.value.toLowerCase()) ? card.style.display = '' : card.style.display = 'none';
            
      });     
});


countriesInfo.addEventListener('click', (e) => {
      const alpha3Code = e.target.dataset.alphaCode;
      countriesContainer.style.display = 'none';
      getCountry(alpha3Code);
      countryContainer.style.display = 'block';
});


returnBtn.addEventListener('click', () => {
      countryContainer.style.display = 'none';
      countriesContainer.style.display = 'block';
});



// Functions

function getCountries(refNode) {
      return fetch('https://restcountries.eu/rest/v2/all').then((response) => {
                  return response.json();
            }).then((countries) => {
                  countries.forEach(country => {
                        renderCountriesInfo(
                              refNode,
                              country.alpha3Code,
                              country.flag, 
                              country.name, 
                              formatNum(country.population),
                              country.region, 
                              country.capital);

                              getAlphaCodes(country);
                  })
            }).catch((error) => {
                  console.log(error.statusText);
            })
}


function getAlphaCodes(country) {
      alphaCodes.push({name: country.name, code: country.alpha3Code});
}


function getCountry(countryCode) {
      return fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`).then((response) => {
                  return response.json();
            }).then((country) => {
                  renderCountryDetails(
                        country.flag, 
                        country.name, 
                        country.nativeName,
                        formatNum(country.population),
                        country.region, 
                        country.subregion, 
                        country.capital, 
                        country.topLevelDomain.toString(),
                        getStringInObj(country.currencies, 'name'),
                        getStringInObj(country.languages, 'name'),
                        getBorderName(country.borders));
            }).catch((error) => {
                  console.log(error.statusText);
            })
}


/**
 * Returns string from an object.
 * @param {object} obj The object to process.
 * @param {string} item The object key whose value is to be returned in new array.
 * @generate {array} arrVal An array of the items.
 * @returns {string} strVal, The final string value.
 */
function getStringInObj (obj, item) {
      const arrVal = obj.map(av => av[item]);
      const strVal = arrVal.join(', ');
      return strVal;
}


function getCountryName (countryCode) {
      let name = '';
      alphaCodes.forEach(country => {
            if(country.code.toLowerCase() === countryCode.toLowerCase()) {
                  name = country.name;
                  return name;
            } else return
      }) 
        
     return name;
}

function getBorderName(borderCodes) {
      let name = '';
      nameArr = [];
      borderCodes.forEach(code => {
            name = getCountryName(code);
            nameArr.push(`<span class='border--item'>${name}</span>`);
      })
      
      return nameArr.join(' ');
}

const formatNum = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

const addClass = (el, eClass) => el.classList.add(eClass);

const addAttr = (el, attr, val) => el.setAttribute(attr, val);

const createEl = (el) => document.createElement(el);

/**
 * Generates DOM element for each array element, assigns the values of each of the array elements to the DOM elements.
 * @param {array} arr The array to loop over
 * @param {DOM element} el The type of HTML element to create.
 * @param {DOM parent Node} elParent The parent node to append the element created.
 */
function createExt(arr, el, elParent) {
      arr.forEach(item => {
            const infoText = createEl(el);
            infoText.innerHTML = item;
            elParent.appendChild(infoText);
      })
}


/**
 * Returns HTML elements to display countries data.
 * @param {DOM Node} pNode Parent node to append child elements. 
 * @param {number} alpha3Code Saved to target each country. Added as custom data attribute to every element.
 * @param {img tag} flag The country flag.
 * @param {string} name The country name.
 * @param {number} population The population figure.
 * @param {string} region The continent in which country exists.
 * @param {string} capital The capital city of country.
 * This function may need refactoring.
 */

function renderCountriesInfo(pNode, alpha3Code, flag, name, population, region, capital) {
      const info = [
            `<span class = 'text--title'>Population:</span> ${population}`,
            `<span class = 'text--title'>Region:</span> ${region}`,
            `<span class = 'text--title'>Capital:</span> ${capital}`
      ]
      

      const initElem = (type, eClass) => {
            const el = document.createElement(type);
            addAttr(el, 'data-alpha-code', `${alpha3Code}`);
            addClass(el, eClass);
            return el;
      }

      const card = initElem('div', 'card');
      const infoFlag = initElem('img', 'card-img-top');
      const bodywrapper = initElem('div', 'card-body');
      const infoName = initElem('h4');

      addClass(card, 'shadow');
      addAttr(infoFlag, 'src', `${flag}`);

      card.appendChild(infoFlag);
      card.appendChild(bodywrapper);
      bodywrapper.appendChild(infoName);

      infoName.textContent = `${name}`;

      createExt(info, 'p', bodywrapper);

     return pNode.appendChild(card);
}


function renderCountryDetails(flag, name, 
      nativeName, population, region, subRegion, 
      capital, tld, currencies, languages, border)  {

      const countryFlag = getElem('.country__flag');
      const nameField = getElem('.country__name');
      const natNameFld = getElem('.native-name-val');
      const populationFld = getElem('.population-val');
      const regionFld = getElem('.region-val');

      const subRegFld = getElem('.sub-region-val');
      const capitalFld = getElem('.capital-val');
      const tldFld = getElem('.tld-val');
      const currenciesFld = getElem('.currencies-val');
      const languagesFld = getElem('.languages-val');
      const bordersFld = getElem('.border-val');

      const detailFields = [nameField, natNameFld, populationFld, regionFld, 
            subRegFld, capitalFld, tldFld, currenciesFld, languagesFld];

      const detailValues = [name, nativeName, population, region, 
            subRegion, capital, tld, currencies, languages];

      countryFlag.setAttribute('src', `${flag}`);
      countryFlag.setAttribute('alt', `${name} flag`); 

      for (let i = 0; i <= detailFields.length - 1; i++) {
            detailFields[i].textContent = detailValues[i];
      }

      bordersFld.innerHTML = border;
      }


function getUserTheme() {
      const userTheme = localStorage.getItem('theme');
      userTheme ? setTheme(userTheme === 'theme-dark') : '';
}


function toggleTheme() {
      setTheme(themeName.textContent === 'Dark Mode');
}


function setTheme(condition) {
      if (condition) {
            document.documentElement.className = 'theme-dark';
            themeName.textContent = 'Light Mode';
            localStorage.setItem('theme', 'theme-dark');
      } else {
            document.documentElement.className = 'theme-light';
            themeName.textContent = 'Dark Mode'
            localStorage.setItem('theme', 'theme-light');
      }
}
