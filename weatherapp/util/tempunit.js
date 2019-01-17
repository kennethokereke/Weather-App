export default class TemperatureUnit {
    
    
    static get FAHRENHEIT() {
      return 'Fahrenheit';
    }
  
    
    /**Getting the Fahrenhiet symbol */
    static getSymbolForUnit(unit) {
      switch (unit) {
        
        case TemperatureUnit.FAHRENHEIT:
          return '°F';
       
      }
    }
  /** converting the value to Fahrenheit */
    static convertCelciusToFahrenheit(value) {
      return (1.8 * value) + 32;
    }
}