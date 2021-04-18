// API Key: 7afb4c5ab853916fad78aa45143c0ef7
let citySearch = document.getElementById('cityInput')
const mainWeatherContainer = document.getElementById('mainWeatherDisplay')
const searchBtn = document.getElementById('searchBtn')
const cardDeck = document.getElementById('cardDeck')


function getWeatherData(e){
    e.preventDefault()
    let cityName = citySearch.value
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=7afb4c5ab853916fad78aa45143c0ef7`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // for (let i = 0; i < 4; i++)
        let i = 0
        
        let forecast = document.createElement('h2')
        let weatherCards = document.createElement('div')
        let cardBody = document.createElement('div')
        let currentTemp = document.createElement('p')
        let tempHiLo = document.createElement('p')
        let humidity = document.createElement('p')
        let windspeed = document.createElement('p')
        let date = document.createElement('h5')
        let weatherIcon = document.createElement('p'); 

        forecast.textContent = '5 Day Forecast:'
        currentTemp.textContent = `Temp: ${data.list[i].main.temp} ˚F`
        tempHiLo.textContent = `Temp Hi-Lo: ${data.list[i].main.temp_max}˚F/${data.list[i].main.temp_min}˚F`;
        humidity.textContent = `Humidity: ${data.list[i].main.humidity}%`
        windspeed.textContent = data.list[i].wind.speed;
        date.textContent = data.list[i].main.temp;
        weatherIcon.textContent = data.list[i].main.temp;

        mainWeatherContainer.appendChild(forecast)

        //cardBody.appendChild(date);
        cardBody.appendChild(currentTemp);
        cardBody.appendChild(tempHiLo);
        cardBody.appendChild(humidity);
        cardBody.appendChild(windspeed);
        //cardBody.appendChild(weatherIcon);
        cardBody.setAttribute('class', 'card-body text-white bg-primary');

        weatherCards.appendChild(cardBody);
        weatherCards.setAttribute('class', 'card');

        cardDeck.appendChild(weatherCards)
    })
}

searchBtn.addEventListener("click", getWeatherData);