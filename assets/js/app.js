let cityform = document.querySelector('.cityForm')
let city = document.querySelector('.city')
let dataFromApi = document.querySelector('.dataFromApi')
let apiURL = 'http://api.weatherapi.com/v1/current.json?key=2efe9d2eb7014db8a7d135137210611&q='
let loader = document.querySelector('.loader');
cityform.addEventListener('submit', (event) => {
    showLoader();
    let cityName = city.value;

    let newApiUrl = apiURL + cityName;

    fetch(newApiUrl)
        .then((response) => {
            hideLoader();
            if (response.status === 200) {
                hideLoader();
                return response.json();
            } else { return showError(); }
        })
        .then((data) => {
            let view = '';
            // view += `Today in ${data.location.name} is ${data.current.temp_c} <sup>o</sup>C`;
            view += `<div class="main-info">`;
            //icon
            view += `<div class="icon">`;
            view += `<img src="${data.current.condition.icon}" alt=""></icon>`;
            view += `</div>`;
            view += `<div class="temp">${data.current.temp_c}<sup>o</sup>C `;

            view += `</div>`;
            view += `<div class="info">`
            view += `<p>Humidity: <b>${data.current.humidity}%</b></p>`
            view += `<p>Wind:<b>${data.current.wind_kph}km/h</b></p>`
            view += `<p>Feels like:<b>${data.current.feelslike_c}<sup>o</sup>C </b></p>`
            view += `</div>`;
            view += `</div>`;

            dataFromApi.innerHTML = view;
        });
    event.preventDefault();
    // blokuje reload strony
})

function showError() {
    dataFromApi.innerHTML = `<div class="error">Upss.. Something went wrong. Check city name and press Enter</div>`
}

function showLoader() { loader.style.display = `block` };
function hideLoader() { loader.style.display = `none` };
let pageLoader = document.querySelector('.pageLoader')
window.addEventListener('load'), () => {
    pageLoader.style.display = 'none';
}