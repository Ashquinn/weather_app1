// API Key: 7afb4c5ab853916fad78aa45143c0ef7
let citySearch = document.getElementById('cityInput')
const todayContainer = document.getElementById('mainWeatherDisplay')
const searchBtn = document.getElementById('searchBtn')
const cardDeck = document.getElementById('cardDeck')

function getWeatherData(e){
    e.preventDefault()
    let cityName = citySearch.value
    saveCity(cityName)
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=7afb4c5ab853916fad78aa45143c0ef7`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        let currentCity = document.createElement('h1');
        let todayTemp = document.createElement('p');
        let todayHumidity = document.createElement('p');
        let todayWind = document.createElement('p');

        currentCity.textContent = `${cityName}`
        todayTemp.textContent = `Temp: ${data.list[0].main.temp} ˚F`
        todayHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
        todayWind.textContent = `Wind speed: ${data.list[0].wind.speed} MPH`
        //weatherIcon.textContent = data.list[i+1].main.temp;

        todayContainer.textContent = '';
        todayContainer.appendChild(currentCity);
        todayContainer.appendChild(todayTemp);
        todayContainer.appendChild(todayHumidity);
        todayContainer.appendChild(todayWind);

        cardDeck.innerHTML = '';


        for (let i = 3; i <= data.list.length ; i+=8) {
        
        
        //Create a conditional to only allow function to run if input is a number
        // let forecast = document.createElement('h2')
        let weatherCards = document.createElement('div')
        let cardBody = document.createElement('div')
        let currentTemp = document.createElement('p')
        let tempHiLo = document.createElement('p')
        let humidity = document.createElement('p')
        let date = document.createElement('h5')
        let weatherIcon = document.createElement('p'); 

        // forecast.textContent = '5 Day Forecast:'
        currentTemp.textContent = `Temp: ${data.list[i].main.temp} ˚F`
        console.log(data.list[i].dt_txt)
        tempHiLo.textContent = `Temp Hi-Lo: ${data.list[i].main.temp_max}˚F/${data.list[i].main.temp_min}˚F`;
        humidity.textContent = `Humidity: ${data.list[i].main.humidity}%`
        date.textContent = data.list[i].main.temp;
        weatherIcon.textContent = data.list[i].main.temp;

        // mainWeatherContainer.appendChild(forecast)
        //Check if you can get the 5 day forecast text to render properly

        //cardBody.appendChild(date);
        cardBody.appendChild(currentTemp);
        cardBody.appendChild(tempHiLo);
        cardBody.appendChild(humidity);
        //cardBody.appendChild(weatherIcon);
        cardBody.setAttribute('class', 'card-body text-white bg-primary rounded');

        weatherCards.appendChild(cardBody);
        weatherCards.setAttribute('class', 'card');

        cardDeck.appendChild(weatherCards)
        console.log(data)
        }
    })
}
function saveCity(newCity) {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
    savedCities.push(newCity)
    localStorage.setItem('savedCities', JSON.stringify(savedCities))
}
function displaySearch() {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
    for (let i = 0; i < savedCities.length; i++){
        console.log(savedCities[i])
    }
}
displaySearch()
searchBtn.addEventListener("click", getWeatherData);