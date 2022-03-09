export function renderMarkupCountry(countries, ref) {
  const markup = countries
    .map(({ flags, capital, population, languages, name }) => {
      // const lang = Object.values(country.languages).join(', ');
      return `<div class="flex-container">
    <img src="${flags.png}" alt="country flag" class="flag-img">
    <h1>${name.official}</h1>
</div>
<div class="flex-container">
    <h3 class="header">capital:</h3>
    <p>${capital}</p>
</div>
<div class="flex-container">
    <h3 class="header">population:</h3>
    <p>${population}</p>
</div>
<div class="flex-container">
    <h3 class="header">languages:</h3>
    <p>${Object.values(languages).join(', ')}</p>
</div>`;
    })
    .join('');
  ref.innerHTML = markup;
}
