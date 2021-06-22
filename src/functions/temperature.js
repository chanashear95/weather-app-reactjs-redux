import { WEATHER_OPTIONS, DEFAULT_WEATHER_ICON } from 'environments';

export const convertFahrenheitToCelcius = (degreesInFahrenheit) => {
    return parseInt((degreesInFahrenheit - 32) * (5/9));
}

export const getWeatherIconFromWeatherText = (weatherText) => { //Takes a string of weather description returns image url
    let weatherObj = WEATHER_OPTIONS.find(i => weatherText.toLowerCase().includes(i.title.toLowerCase()));
    if(weatherObj){
        return weatherObj.icon;
    }
    else{
        return DEFAULT_WEATHER_ICON;
    }
}