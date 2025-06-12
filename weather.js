document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const loader = document.getElementById("loader");
  const weatherIcon = document.getElementById("weather-icon"); // optional, if you add <img id="weather-icon" />

  const API_KEY = "217b50ae77b5c5d77af3e09e0da2e448";

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    showLoader(true);
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    } finally {
      showLoader(false);
    }
  });

  function showLoader(show) {
    loader.classList.toggle("hidden", !show);
  }

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    // If you added an <img id="weather-icon" />, enable this:
    if (weatherIcon) {
      weatherIcon.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      weatherIcon.alt = weather[0].main;
    }

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
