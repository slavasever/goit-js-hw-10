import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import manyCountriesMarkup from './many_countries_markup.hbs';
import { renderMarkupCountry } from './renderMarkupCountry';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(evt) {
  const inputValue = evt.target.value.trim();

  if (inputValue === '') {
    clearCountryMarkup();
    clearCountriesMarkup();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      }
      if (countries.length >= 2) {
        clearCountryMarkup();
        renderMarkupCountries(countries);
      } else {
        clearCountriesMarkup();
        renderMarkupCountry(countries, refs.countryInfo);
      }
    })
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderMarkupCountries(countries) {
  const markup = countries
    .map(country => {
      return manyCountriesMarkup(country);
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function clearCountriesMarkup() {
  refs.countryList.innerHTML = '';
}

function clearCountryMarkup() {
  refs.countryInfo.innerHTML = '';
}
