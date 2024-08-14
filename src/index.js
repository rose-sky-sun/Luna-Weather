function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temp-value");
    temperatureElement.innerHTML = response.data.temperature.current;
}


function searchCity(city) {
   let apiKey = "2a48ab03df66cfdeo2cf2td262aab2a0"
   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-bar");
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = searchInput.value;
    searchCity(searchInput.value);
}

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", handleSearchSubmit);