// API Key: 7afb4c5ab853916fad78aa45143c0ef7

function getWeatherData(city){
    fetchAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=7afb4c5ab853916fad78aa45143c0ef7`
    fetch(fetchAPI)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}

getWeatherData('Atlanta')