window.addEventListener('load', () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'; // Use a proxy to avoid CORS errors
      const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=YOUR_API_KEY`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const location = data.name;
          const temperature = Math.round(data.main.temp - 273.15);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;

          document.getElementById("location").textContent = location;
          document.getElementById("temperature").textContent = `${temperature}°C`;
          document.getElementById("description").textContent = description;
          document.getElementById("weather-icon").src = `https://openweathermap.org/img/w/${icon}.png`;
        });
    });
  }
});
