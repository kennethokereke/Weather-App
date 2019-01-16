export default class TemperatureUnit {
    
  
    static get FAHRENHEIT() {
      return 'Fahrenheit';
    }
  
    
  
    static getSymbolForUnit(unit) {
      switch (unit) {
        
        case TemperatureUnit.FAHRENHEIT:
          return '°F';
       
      }
    }
  
    static convertCelciusToFahrenheit(value) {
      return (1.8 * value) + 32;
    }
}