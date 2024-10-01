const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function fetchWeatherByCity() {
    const city = document.getElementById('locationInput').value;
    if (city) {
        fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => alert('Error fetching weather data: ' + error));
    } else {
        alert('Please enter a city name');
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`${baseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => alert('Error fetching weather data: ' + error));
        }, () => {
            alert('Unable to retrieve your location');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity} %`;
        document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        alert('City not found');
    }
}
