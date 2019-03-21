const apiKey = '558723668267d7a6a5e72566b75d0998';
const googleApyKey = 'AIzaSyBohQMj6NidVIzbrLQSbo9LZEw29ICHJK4'
const country_code = 'ZA';
const units='metric';
let lat, long, city;

window.addEventListener('DOMContentLoaded',()=>{
    getLocation();
    setContent();
});
function getLocation() {
    navigator.geolocation.getCurrentPosition(setContent);
};
async function setContent(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;

    let appData = document.querySelectorAll('.app-data');
    let background = document.querySelector('main');
    let tempElem = document.querySelector('#temperature');
    let windSpeedElem = document.querySelector('#wind-speed');
    let cityElem = document.querySelector('#city');

    let weatherCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}`);
    let data = await weatherCall.json();

    let locationCall = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&result_type=locality&key=${googleApyKey}`);
    let locationData = await locationCall.json();

    let temperature = Math.floor(data.main.temp);
    let windSpeed = data.wind.speed * 3.6;
    if (locationData.results[0] != undefined) {
        city = locationData.results[0].address_components[0].long_name;
    } else {
        city = data.name;
    }
    
    if (temperature > 15) {
        background.classList.add('hot');
        for (let i = 0; i < appData.length; i++) {
            appData[i].classList.add('hot-font');
        };
    } else {
        background.classList.add('cold');
        for (let i = 0; i < appData.length; i++) {
            appData[i].classList.add('cold-font');
        };
    };
    cityElem.textContent = city;
    tempElem.textContent = temperature;
    windSpeedElem.textContent = windSpeed;
};