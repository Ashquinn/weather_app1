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
        let weatherIcon = document.createElement('img')

        currentCity.textContent = `${cityName} (${moment(data.list[0].dt_txt).format('MMM Do, YYYY')})`;
        todayTemp.textContent = `Temp: ${data.list[0].main.temp} ˚F`
        todayHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
        todayWind.textContent = `Wind speed: ${data.list[0].wind.speed} MPH`
        weatherIcon.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")

        todayContainer.textContent = '';
        todayContainer.appendChild(currentCity);
        todayContainer.appendChild(todayTemp);
        todayContainer.appendChild(todayHumidity);
        todayContainer.appendChild(todayWind);
        todayContainer.appendChild(weatherIcon)

        cardDeck.innerHTML = '';


        for (let i = 3; i <= data.list.length ; i+=8) {
        
        
        let weatherCards = document.createElement('div')
        let cardBody = document.createElement('div')
        let forecastIcon = document.createElement('img')
        let currentTemp = document.createElement('p')
        let tempHiLo = document.createElement('p')
        let humidity = document.createElement('p')
        let date = document.createElement('h5')
        let weatherIcon = document.createElement('p'); 

        date.textContent = `(${moment(data.list[i].dt_txt).format('MMM Do, YYYY')})`
        forecastIcon.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
        currentTemp.textContent = `Temp: ${data.list[i].main.temp} ˚F`
        tempHiLo.textContent = `Temp Hi-Lo: ${data.list[i].main.temp_max}˚F/${data.list[i].main.temp_min}˚F`;
        humidity.textContent = `Humidity: ${data.list[i].main.humidity}%`
        weatherIcon.textContent = data.list[i].main.temp;

        cardBody.appendChild(date);
        cardBody.appendChild(forecastIcon);
        cardBody.appendChild(currentTemp);
        cardBody.appendChild(tempHiLo);
        cardBody.appendChild(humidity);
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