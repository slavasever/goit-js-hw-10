export function fetchCountries(name) {
  const requestOptions = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });
  const url = `https://restcountries.com/v3.1/name/${name}?${requestOptions}`;

  return fetch(url).then(responce => {
    if (!responce.ok) {
      throw new Error(responce.status);
    }
    return responce.json();
  });
}
