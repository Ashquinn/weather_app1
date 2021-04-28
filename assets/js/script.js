// API Key: 7afb4c5ab853916fad78aa45143c0ef7
let citySearch = document.getElementById('cityInput')
const todayContainer = document.getElementById('mainWeatherDisplay')
const searchBtn = document.getElementById('searchBtn')
const cardDeck = document.getElementById('cardDeck')

//This function calls the weather API and renders the current forecast along with the five day forcast
function getWeatherData(e){
    e.preventDefault()
    let cityName = citySearch.value
    saveCity(cityName)
    
    //API call too openweathermap database to retrieve data to render for the forecast.
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=7afb4c5ab853916fad78aa45143c0ef7`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //Creates elements to append todays weather.
        //console.log(data)
        let currentCity = document.createElement('h1');
        let todayTemp = document.createElement('p');
        let todayHumidity = document.createElement('p');
        let todayWind = document.createElement('p');
        let weatherIcon = document.createElement('img')

        //Setting the text content and weather icon for todays weather/.
        currentCity.textContent = `${cityName} (${moment(data.list[0].dt_txt).format('MMM Do, YYYY')})`;
        todayTemp.textContent = `Temp: ${data.list[0].main.temp} ˚F`
        todayHumidity.textContent = `Humidity: ${data.list[0].main.humidity}%`
        todayWind.textContent = `Wind speed: ${data.list[0].wind.speed} MPH`
        weatherIcon.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png")

        //Appending all text content to the 'todayContainer'. This will display the current weather to the application.
        todayContainer.textContent = '';
        todayContainer.appendChild(currentCity);
        todayContainer.appendChild(todayTemp);
        todayContainer.appendChild(todayHumidity);
        todayContainer.appendChild(todayWind);
        todayContainer.appendChild(weatherIcon)

        cardDeck.innerHTML = '';

        //The for loop will iterate through the data retrieved from the API call. 'i' is defined as 3 so that we are given the weather when the time is 12:00PM, the API returns data in 3 hour increments so if i is 3 then we will be retrieving the 4th index of the weather array which is the weather for 12:00PM.
        for (let i = 3; i <= data.list.length ; i+=8) {
        
        //The following lines of code are used to create the elements for each weather card and set the text content/attribute for each card. 
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

        //Appends text content to the card bdy which will hold the data for the next five days. 
        cardBody.appendChild(date);
        cardBody.appendChild(forecastIcon);
        cardBody.appendChild(currentTemp);
        cardBody.appendChild(tempHiLo);
        cardBody.appendChild(humidity);
        cardBody.setAttribute('class', 'card-body text-white bg-primary rounded');

        //Appends the card body the the weather cards container.
        weatherCards.appendChild(cardBody);
        weatherCards.setAttribute('class', 'card');

        //Appends the weather cards to the cardDeck.
        cardDeck.appendChild(weatherCards)
        console.log(data)
        }
    })
}
//This function will save each searched city to local storage. 
function saveCity(newCity) {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
    savedCities.push(newCity)
    localStorage.setItem('savedCities', JSON.stringify(savedCities))
}
//This function will display the cities from local storage onto the console. This verifies that local storage has received the data.
function displaySearch() {
    let savedCities = JSON.parse(localStorage.getItem('savedCities')) || []
    for (let i = 0; i < savedCities.length; i++){
        console.log(savedCities[i])
    }
}

displaySearch()
searchBtn.addEventListener("click", getWeatherData);