import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const counrtyList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(evt) {
  const searchCountre = evt.target.value.trim();
  
  if (!searchCountre) {
    countryInfo.innerHTML = '';
    counrtyList.innerHTML = '';
    return;
  }


  fetchCountries(searchCountre)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        countryInfo.innerHTML = '';
        counrtyList.innerHTML = marcupList(data);
        
      } else {
        counrtyList.innerHTML = '';
        countryInfo.innerHTML = marcupInfo(data);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function resetEl() {
  counrtyList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function marcupList(data) {
  return data
    .map(({ flags, name }) => {
     return `<li class="country-item">
  <img src="${flags.svg}" width="36" height="24" alt="Flafs ${name.official}">
  <h2 class="title-item"> ${name.official} </h2>
</li>`;
    })
    .join('');
}

function marcupInfo(data) {
   return data
    .map(( {flags, name, capital, population, languages}) => {
  return `<div class="country-item">
  <img src="${flags.svg}" width="36" height="24" alt="Flafs ${name.official}">
  <h2 class="title-item"> ${name.official} </h2>
</div>
<p> <b>Capital:</b> ${capital}</p>
<p> <b>Population:</b> ${population}</p>
<p> <b>Languages:</b> ${Object.values(languages)}</p>`;
  })
}
