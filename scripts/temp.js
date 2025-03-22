// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&appid=d30a06bc27dc6e60bbf4dacc9f4d3780&units=imperial`;

function displayResults(data) {
    currentTemp.innerHTML = `${data.weather[0].main}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', `${data.weather[0].main} icon`);
    captionDesc.textContent = `${desc}`;
  }

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();