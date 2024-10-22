const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temp');
const conditionElement = document.querySelector('.conditions');
const humidityElement = document.querySelector('.humidity');
const windGustElement = document.querySelector('.wind-gust');
const icon = document.querySelector('img');

const apiKey = '3EZLMUSY9PTYHGFT5TDGRXCNR';

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        getWeather(location);
    }
})

async function getWeather(location){
    location = locationInput.value;
    const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${apiKey}`;
    
    try{
        const response = await fetch(weatherURL,{mode:"cors"});
        const data = await response.json();
        console.log(data)

        const currentLocation = data.resolvedAddress;
        locationElement.innerText = currentLocation;

        const tempF = data.currentConditions.temp;
        const tempC = (tempF-32) * (5/9);
        temperatureElement.innerText = tempC.toFixed(1) + " C";

        const conditions = data.currentConditions.conditions;
        conditionElement.innerText = conditions;

        const humidityF = data.currentConditions.humidity;
        const humidity = (humidityF-32) * (5/9);
        humidityElement.innerText = "Humidity: " + humidity.toFixed(1);

        const windGust = data.currentConditions.windgust;
        windGustElement.innerText = "Wind gust: " + windGust;

        // icon.src =  data.currentConditions.icon
    
    }catch(error){
        throw newError("Location not found")
    }
}