
import overcast from 'images/weatherIcons/overcast.png';
import sunny from 'images/weatherIcons/sun.png';
import rain from 'images/weatherIcons/rain.png';
import snow from 'images/weatherIcons/snow.png';


export const WEATHER_API_ENV = {
    api_key: "eyfyYGh6pFLJh4gPVi6jaVNITBnC4DlO",
    base_url: 'http://dataservice.accuweather.com'
}

// export const PROXY_URL = "https://let-me-in-cors.herokuapp.com/api/?url=";

export const LOCAL_FAVORITES_KEY = 'wthr@pp';


export const WEATHER_OPTIONS = [
    {
        title: 'Clear',
        icon: sunny,
    },
    {
        title: 'Overcast',
        icon: overcast,
    },
    {
        title: 'Sunny',
        icon: sunny,
    },
    {
        title: 'Cloud',
        icon: overcast,
    },
    {
        title: 'Rain',
        icon: rain
    },
    {
        title: 'Storms',
        icon: rain
    },
    {
        title: 'Snow',
        icon: snow
    },
    {
        title: 'Shower',
        icon: rain
    }
]

export const DEFAULT_WEATHER_ICON = overcast;

export const ERROR_MESSAGES = {
    maxApiLimit: 'API has reached its max daily limit. Please try again tomorrow.',
    serverError: 'An error has occurred. Please try again.'
}

export const DEFAULT_LOCATION_KEY = '215854';