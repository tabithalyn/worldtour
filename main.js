let searchBtn = document.getElementById('search-btn');
let countryInp = document.getElementById('country-inp');
let searchWrapper = document.querySelector('.search-wrapper');

searchBtn.addEventListener('click', () => {
  let countryName = countryInp.value;
  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalURL);
  searchWrapper.style.width = "42%";
  searchWrapper.style.fontSize = "0.7em";
  searchWrapper.style.marginTop = "-10px";

  
  fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <table>
        <tbody>
          <tr>
            <td>
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Capital</h4>
                  <span>${data[0].capital[0]}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Continent</h4>
                  <span>${data[0].continents[0]}</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Population</h4>
                  <span>${data[0].population.toLocaleString()}</span>
                </div>
              </div>
            </td>
            <td>
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Currency</h4>
                  <span>${data[0].currencies[Object.keys(data[0].currencies)].name} (${Object.keys(data[0].currencies)[0]})</span>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <div class="wrapper">
                <div class="data-wrapper">
                  <h4>Common Languages</h4>
                  <span>${Object.values(data[0].languages)
                    .toString()
                    .split(',')
                    .join(', ')}</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        </table>
          <a href="https://www.lonelyplanet.com/${countryName}" target="_blank">Learn More on Lonely Planet</a>
      `;
    })
    .catch(() => {
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be blank!</h3>`;
      } else {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      }
    });
});

var input = document.querySelector('.country-search');
input.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('search-btn').click();
    searchWrapper.style.width = "42%";
    searchWrapper.style.fontSize = "0.7em";
    searchWrapper.style.marginTop = "-10px";
  }
});