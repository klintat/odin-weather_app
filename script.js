const info = document.querySelector(".info");

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Riga%20city?unitGroup=metric&key=3EZLMUSY9PTYHGFT5TDGRXCNR&contentType=json', {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // console.log(response.currentConditions.conditions);
        info.src = response.currentConditions.conditions;
    });