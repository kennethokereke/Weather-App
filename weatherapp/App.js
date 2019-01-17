import React from 'react';
/** elements in React native  */
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Button
} from 'react-native';

/** importing files to greab their data similar to a struct in Swift
 * In a way its a communication between other JS files
  */
import { Constants, Location, Permissions } from 'expo';
import { fetchOpenWeatherCity, fetchOpenWeatherGPS } from './util/api'
import Getimageweather from './util/getimageweather'
import SearchInput from './Component/src/SearchInput';
import Unit from './util/tempunit'

export default class App extends React.Component {
   /** an array */
    state = {
        loading: false,
        error: false,
        location: '',
        lowTemp: 0,
        highTemp: 0,
        weather: '',
      

      };
      




     /**the first function that loads when the app starts */
      componentDidMount() {
         /* Detect location */
        this.handleGetLocation();
      }
       /* Detect current location */
      handleGetLocation = async () => {
        /** Expo will ask for your permission to access current location
         * Why is status in {brackets} because with in the Object array I am only
         * looking for status
         * 
         */
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          this.setState({error: true});
        }
        /** Grabbing the object coords */
        const {coords} = await Location.getCurrentPositionAsync({});
        this.handleUpdateGPS(coords);
      }
      /** async fetches data to update location*/
      handleUpdateLocation = async city => {
        if (!city) return;
        /** It will be loading */
        this.setState({ loading: true }, async () => {
          try {
            const { location, weather, lowTemp, highTemp } = await fetchOpenWeatherCity(city);
            /** if complete it will update*/
            this.setState({
              loading: false,
              error: false,
              location,
              weather,
              lowTemp,
              highTemp
            });
            /** If fails an error will show */
          } catch (e) {
            this.setState({
              loading: false,
              error: true,
            });
          }
        });
      };
      
      /** Not in the instruction wanted to fetch data to update current location when
       * app is just opening
       */
      handleUpdateGPS = async coords => {
        if (!coords) return;
        this.setState({ loading: true }, async () => {
          try {
            const { location, weather, lowTemp, highTemp} = await fetchOpenWeatherGPS(coords);
            
            this.setState({
              loading: false,
              error: false,
              location,
              weather,
              lowTemp,
              highTemp
            });
          } catch (e) {
            this.setState({
              loading: false,
              error: true,
            });
          }
        });
      };  



     /**Renders returns JSX  */
    render() {
        const { loading, error, location, weather, lowTemp, highTemp, unit = Unit.FAHRENHEIT, decimalPlaces = 0 } = this.state;
        return (
          /** data here will be displayed in app */
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <StatusBar barStyle="light-content" />
            <ImageBackground
              source={Getimageweather(weather)}
              style={styles.imageContainer}
              imageStyle={styles.image}
            >    
              <View style={styles.detailsContainer}>
                <ActivityIndicator animating={loading} color="white" size="large" />
    
                {!loading && (
                  <View>
                    {error && (
                      <Text style={[styles.smallText, styles.textStyle]}>
                        Could not load weather, please try a different city.
                      </Text>
                    )}
    
                    {!error && (
                      <View>
                        
                        <Text style={[styles.largeText, styles.textStyle]}>
                          {location}
                        </Text>
               
                        
                        <Text style={[styles.smallText, styles.textStyle]}>
                          {weather}
                        </Text>
                
                       
                        <Text style={[styles.largeText, styles.textStyle]}>
                          {Unit.convertCelciusToFahrenheit(highTemp).toFixed(decimalPlaces)}{Unit.getSymbolForUnit(unit)}
                        </Text> 
                        <Text style = {styles.textStyle}>High </Text>
                         <Text style={[styles.largeText, styles.textStyle]}>
                        {Unit.convertCelciusToFahrenheit(lowTemp).toFixed(decimalPlaces)}{Unit.getSymbolForUnit(unit)}
                        </Text>
                        <Text style = {styles.textStyle}>Low </Text>
                        
                      </View>
                    )}
    
                    <SearchInput
                      placeholder="Search any city"
                      onSubmit={this.handleUpdateLocation}
                    />
                   
                  </View>
                )}
              </View>
            </ImageBackground>
          </KeyboardAvoidingView>
        );
    }

}

/** Stylesheet is treated to design your app. 
 * Flex works the same way in React Native as it does 
 * in CSS on the web */

const styles = StyleSheet.create({
container: {
    flex:1,
    backgroundColor: '#34495E',
},
imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
},
textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },

  button: {
    
        height: 60,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 10,
    
  }
});