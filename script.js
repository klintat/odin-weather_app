const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const logoImgElement = document.querySelector('.logo-img');
const locationElement = document.querySelector('.location');
const dateElement = document.querySelector('.date');
const imgConditionElement = document.querySelector('.img-container');
const temperatureElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.conditions');
const humidityElement = document.querySelector('.humidity');
const windGustElement = document.querySelector('.wind-gust');
const errorDiv = document.getElementById('error-display');
const infoElement = document.getElementById('weather-info');

const apiKey = '3EZLMUSY9PTYHGFT5TDGRXCNR';

const iconLocation = document.createElement('img');
iconLocation.src = './images/location.png';
iconLocation.classList.add('iconLocation');

const iconHumidity = document.createElement('img');
iconHumidity.src = './images/humidity.png';
iconHumidity.classList.add('iconHumidity');

const iconWind = document.createElement('img');
iconWind.src = './images/wind.png';
iconWind.classList.add('iconWind');

const iconConditionImg = document.createElement('img');
imgConditionElement.classList.add('iconConditionImg');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        logoImgElement.style.visibility = 'hidden';
        errorDiv.style.visibility = 'hidden';
        infoElement.style.visibility = 'visible';
        getWeather(location);
        locationInput.value = '';
    }
})

async function getWeather(location){
    location = locationInput.value;
    const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;

    try {
        const response = await fetch(weatherURL, {mode:"cors"});

        if (!response.ok) {
            throw new Error(`Location not found!`);
        }

        const data = await response.json();
        console.log(data)

        const currentLocation = data.resolvedAddress;
        locationElement.innerText = currentLocation;
        locationElement.appendChild(iconLocation);

        const date = data.days[0].datetime;
        let currentDate = new Date(date);
        let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let formatedDate = weekdays[currentDate.getDay()];
        dateElement.innerText = formatedDate;

        const tempF = data.currentConditions.temp;
        const tempC = (tempF-32) * (5/9);
        temperatureElement.innerText = tempC.toFixed(1) + " °C";

        const conditions = data.currentConditions.conditions;
        conditionElement.innerText = conditions;

        const humidityF = data.currentConditions.humidity;
        const humidity = (humidityF-32) * (5/9);
        humidityElement.innerText = humidity.toFixed(1) + " %";
        humidityElement.appendChild(iconHumidity);

        const windGust = data.currentConditions.windgust;
        windGustElement.innerText = windGust + " km/h";
        windGustElement.appendChild(iconWind);

        const iconCondition = data.currentConditions.icon;
        iconConditionImg.src= `./images/weather/${iconCondition}.png `;
        imgConditionElement.appendChild(iconConditionImg);

    } catch (error) {
        console.error('Error caught:', error);
        displayError(error);
    }
}

function displayError(error) {
   errorDiv.innerText = `An error occurred: ${error.message}`;
   errorDiv.style.visibility = 'visible';
   logoImgElement.style.visibility = 'visible';
   infoElement.style.visibility = 'hidden';
}