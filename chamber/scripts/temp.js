const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#desc");
const forecastContainer = document.querySelector("#forecast");

const apiKey = "d30a06bc27dc6e60bbf4dacc9f4d3780";
const lat = 5.04;
const lon = 7.91;

// Current Weather API URL
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

// Forecast API URL
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}

function displayCurrentWeather(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;
  const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let desc = data.weather[0].description;

  weatherIcon.setAttribute("src", iconsrc);
  weatherIcon.setAttribute("alt", `${data.weather[0].main} icon`);
  captionDesc.textContent = desc;
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error("Failed to fetch forecast data");

    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

function displayForecast(data) {
  const forecastDays = {};

  data.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // Extract date
    const time = entry.dt_txt.split(" ")[1]; // Extract time

    if (!forecastDays[date] && time === "12:00:00") {
      forecastDays[date] = entry.main.temp;
    }
  });

  // Display the next 3 days
  forecastContainer.innerHTML = "";
  let count = 0;
  for (let date in forecastDays) {
    if (count < 3) {
      const forecastItem = document.createElement("p");
      forecastItem.textContent = `${new Date(date).toLocaleDateString("en-US", { weekday: "long" })}: ${forecastDays[date]}°F`;
      forecastContainer.appendChild(forecastItem);
      count++;
    }
  }
}

// Fetch data
getCurrentWeather();
getForecast();




  