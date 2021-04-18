// API Key: 7afb4c5ab853916fad78aa45143c0ef7
let citySearch = document.getElementById('cityInput')
const mainWeatherContainer = document.getElementById('mainWeatherDisplay')
const weatherCards = document.getElementById('miniWeatherCard')
const searchBtn = document.getElementById('searchBtn')


function getWeatherData(){
    let cityName = citySearch.value
   
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=7afb4c5ab853916fad78aa45143c0ef7`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.temp)
    })
}

searchBtn.addEventListener("click", getWeatherData);