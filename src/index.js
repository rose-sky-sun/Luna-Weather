function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed}km/h`;
    iconElement.innerHTML = `<img id="temp-icon" src="${response.data.condition.icon_url}">`;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
}

//added a funtion to format date
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = days[date.getDay()];

    //if minutes is less than 10 -- fix the format for time
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
    
}

function searchCity(city) {
   let apiKey = "2a48ab03df66cfdeo2cf2td262aab2a0"
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");

    searchCity(searchInput.value);
}

//function for getting forecast data via API
function getForecast (city) {
    let apiKey = "2a48ab03df66cfdeo2cf2td262aab2a0"
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

//function to call for injecting html to page
function displayForecast(response) {
    console.log(response.data);

    let forecastElement = document.querySelector("#forecast");

    let days = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue']; // dummy data before integrating API
    let forecastHtml = "";

    days.forEach(function(day) {
        forecastHtml =
            forecastHtml +
         `
            <div class="daily-forecast" >
                <div class="forecast-day">${day}</div>
                <div class="forecast-icon">🌤️</div>
                <div class="forecast-temps">
                    <div class="forecast-temp"><strong>15°</strong></div>
                    <div class="forecast-temp">9°</div>
                </div>
            </div>
        `;
    });

    forecastElement.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchSubmit);

searchCity("Oslo");




