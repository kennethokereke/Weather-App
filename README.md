# Weather-App
React Native Weather App using openweather API

<img src="https://github.com/CS691team3/CS691team3project/blob/master/assets/weatherapp.jpg" alt="alt text" width="250" height="250" 
data-canonical-src="https://github.com/CS691team3/CS691team3project/blob/master/assets/weatherapp.jpg"> 

## Requirements
The following packages are required to run this application example:
* [Node.js](https://nodejs.org)
* [Expo](https://expo.io) mobile app

## Installation

### 1. Clone this repository
First, clone this repository to your local computer:

```bash
git clone https://github.com/kennethokereke/Weather-App.git
```

### 2. Install the dependencies
Next, `CD` to the project directory and install all of the dependencies:

```bash
# Go to the project directory
cd Weather-App
Then cd weatherapp

# Install all of the dependencies
yarn install
```

# Just in case you do not have yarn install

### Download Yarn
* [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)

## 3. Set your Open Weather Map API key
If you haven't had an Open Weather Map account, signup for free [here](https://home.openweathermap.org/users/sign_up). Log in with your Open Weather Map account and get your API key [here](https://home.openweathermap.org/api_keys).

Open the folder util and then the api.js file. Then paste your Open Weather Map API key here:

```js
// api.js

export const fetchOpenWeatherCity = async city => {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid={API KEY HERE. DONT NOT ADD BRACKETS AROUND YOUR KEY THIS IS AN EXAMPLE}&units=metric`,
    );
    
 export const fetchOpenWeatherGPS = async coords => {
    console.log(coords);
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid={ ADD YOUR KEY HERE }&units=metric`,
    );
    
```

### 4. Run the application 🎉

Finally, run the packager to build the javascript files:

```bash
yarn start
```

### 5. Expo Users (like myself)

```bash
expo start
```

Click on either the ios simulator or the andriod emulator 

Make sure you connect your phone to the same network as your computer. 

