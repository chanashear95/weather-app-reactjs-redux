
import overcast from 'images/weatherIcons/overcast.png';
import sunny from 'images/weatherIcons/sun.png';
import rain from 'images/weatherIcons/rain.png';
import snow from 'images/weatherIcons/snow.png';


export const weather_env = {
    api_key: "eyfyYGh6pFLJh4gPVi6jaVNITBnC4DlO",
    base_url: 'http://dataservice.accuweather.com'
}

export const proxy_url = "https://let-me-in-cors.herokuapp.com/api/?url=";

export const local_favorites_key = 'wthr@pp';


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
        icon: snow
    }
]