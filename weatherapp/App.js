import React from 'react';
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


import { Constants, Location, Permissions } from 'expo';
import { fetchOpenWeatherCity, fetchOpenWeatherGPS } from './util/api'
import Getimageweather from './util/getimageweather'
import SearchInput from './Component/src/SearchInput';
import Unit from './util/tempunit'

export default class App extends React.Component {
    state = {
        loading: false,
        error: false,
        location: '',
        lowTemp: 0,
        highTemp: 0,
        weather: '',
      

      };
      




      
      componentDidMount() {
        this.handleGetLocation();
      }

      handleGetLocation = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          this.setState({error: true});
        }
        const {coords} = await Location.getCurrentPositionAsync({});
        this.handleUpdateGPS(coords);
      }

      handleUpdateLocation = async city => {
        if (!city) return;
    
        this.setState({ loading: true }, async () => {
          try {
            const { location, weather, lowTemp, highTemp } = await fetchOpenWeatherCity(city);
            
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




    render() {
        const { loading, error, location, weather, lowTemp, highTemp, unit = Unit.FAHRENHEIT, decimalPlaces = 0 } = this.state;
        return (
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