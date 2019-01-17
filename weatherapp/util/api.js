
/** fetches data from URL open weather
 * grab the city name from the api
 */
export const fetchOpenWeatherCity = async city => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1327715149e61ca76a89d587a5806f58&units=metric`,
    );
    
    /** once the task is complete the await will tell program to cancel the async and continue running */
    const { main, weather, name } = await response.json();
  /** it will return this after completion */
    return {
      location: name,
      weather: weather[0].main,
      lowTemp: main.temp_min,
      highTemp: main.temp_max
  
  
    };
  };
  /** fetching data from the URL Open weather
   * Fetches long and lat for current location
  */
  export const fetchOpenWeatherGPS = async coords => {
    /** debuggin purposes tryting to fetch the coordinates long and lat */
    console.log(coords);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=1327715149e61ca76a89d587a5806f58&units=metric`,
    );
    /** awaits means exists the aync tells the program to continue runngin
     * when a given task is complete
     * {main, weather, name } are the keys written in the link above
     */
        const { main, weather, name } = await response.json();
  
    return {
      
      location: name,
      /** fetched the specific weather for example if its foggy */
      weather: weather[0].main,
      lowTemp: main.temp_min,
      highTemp: main.temp_max
    };
  };
  