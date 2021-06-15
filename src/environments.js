
import overcast from './images/weatherIcons/overcast.png';
import sunny from './images/weatherIcons/sun.png';

export const weather_env = {
    api_key: "TMlFvjdYEcBBxWfsGWWZlZ1CnyRY0sax",
    base_url: 'http://dataservice.accuweather.com'
}

export const proxy_url = "http://www.whateverorigin.org/get?url=";

export const local_favorites_key = 'wthr@pp';


export const WEATHER_OPTIONS = [
    {
        title: 'Clear',
        icon: '',
        bg_color: '#abdaea'
    },
    {
        title: 'Overcast',
        icon: overcast,
        bg_color: '#a1adb8'
    },
    {
        title: 'Sunny',
        icon: sunny,
        bg_color: '#abdaea'
    },
]