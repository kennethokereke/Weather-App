
/** Created an array of images with properties */
const images  = {
    Clear : require('../assets/clear.jpg'),
    Hail : require('../assets/hail.jpg'),
    'Heavy Cloud' : require('../assets/heavy-cloud.jpg'),
    'Light Cloud' : require('../assets/light-cloud.jpg'),
    'Cloud' : require('../assets/light-cloud.jpg'),
    'Heavy rain' : require('../assets/heavy-rain.jpg'),
    'Light Rain' : require('../assets/light-rain.jpg'),
    Rain : require('../assets/light-rain.jpg'),
    Showers : require('../assets/showers.jpg'),
    Sleet : require('../assets/sleet.png'),
    Snow : require('../assets/snow.jpg'),
    Thunder : require('../assets/thunder.jpg'),
    Haze: require('../assets/clear.jpg'),
    Clouds : require('../assets/fog.jpg'),
    Fog : require('../assets/fog.jpg'),
    Mist : require('../assets/mist.jpg')

};
export default weather => images[weather];