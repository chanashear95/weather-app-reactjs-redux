import { WEATHER_API_ENV, PROXY_URL } from 'environments';

export const getSearchAutoCompleteData = async (searchText) => {
    let encodedUrl = encodeURIComponent(`${WEATHER_API_ENV.base_url}/locations/v1/cities/autocomplete?apikey=${WEATHER_API_ENV.api_key}&q=${searchText}`);
    try {
        let res = await fetch(`${PROXY_URL}${encodedUrl}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.status === 200) {
            let data = await res.json();
            if (!data.Code) {
                let suggestedLocations = [];
                data.forEach(location => {
                    suggestedLocations.push(
                        {
                            city: location.LocalizedName,
                            country: location.Country.LocalizedName,
                            location_key: location.Key,
                        }
                    )
                })
                return suggestedLocations;
            }
            else {
                return 'max limit';
            }
        }
    }
    catch (e) {
        return false;
    }
}

export const getCurrentConditionsByLocationKey = async (location_key) => {
    let encodedUrl = encodeURIComponent(`${WEATHER_API_ENV.base_url}/currentconditions/v1/${location_key}?apikey=${WEATHER_API_ENV.api_key}`);
    try {
        let res = await fetch(`${PROXY_URL}${encodedUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            let data = await res.json();
            if (data.Code) {
                return 'max limit';
            }
            else {
                return data[0];
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}

export const getFiveDayForecastByLocationKey = async (location_key) => {
    let encodedUrl = encodeURIComponent(`${WEATHER_API_ENV.base_url}/forecasts/v1/daily/5day/${location_key}?apikey=${WEATHER_API_ENV.api_key}`);
    try {
        let res = await fetch(`${PROXY_URL}${encodedUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            }
        });
        if (res.status === 200) {
            let data = await res.json();
            if (data) {
                return data;
            }
            else {
                return 'max limit';
            }
        }
        else {
            return false;
        }
    }
    catch (e) {
        return false;
    }
}

export const getConditionsByGeoLocation = async (lat, long) => {
    let encodedUrl = encodeURIComponent(`${WEATHER_API_ENV.base_url}/locations/v1/cities/geoposition/search?apikey=${WEATHER_API_ENV.api_key}&q=${lat}%2C%20${long}`);
    try{
        let res = await fetch(`${PROXY_URL}${encodedUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            let data = await res.json();
            if (!data.Code) {
                return data;
            }
            else {
                return 'max limit';
            }
        }
        else{
            return false;
        }
    }
    catch(e){
        return false;
    }
}