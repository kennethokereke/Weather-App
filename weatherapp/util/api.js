export const fetchOpenWeatherCity = async city => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1327715149e61ca76a89d587a5806f58&units=metric`,
    );
    
    const { main, weather, name } = await response.json();
  
    return {
      location: name,
      weather: weather[0].main,
      lowTemp: main.temp_min,
      highTemp: main.temp_max
  
  
    };
  };
  
  export const fetchOpenWeatherGPS = async coords => {
    console.log(coords);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=1327715149e61ca76a89d587a5806f58&units=metric`,
    );
    const { main, weather, name } = await response.json();
  
    return {
      location: name,
      weather: weather[0].main,
      lowTemp: main.temp_min,
      highTemp: main.temp_max
    };
  };
  