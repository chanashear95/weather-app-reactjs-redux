import { WEATHER_API_ENV, errorMessages } from 'environments';
import axios from 'axios';

export const getSearchAutoCompleteData = async (searchText) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/locations/v1/cities/autocomplete?apikey=${WEATHER_API_ENV.api_key}&q=${searchText}`;
    try {
        let res = await axios.get(requestUrl);
        if (!res.status === 200) {
            return false;
        }
        if (res.data.Code) {
            return errorMessages.maxApiLimit;
        }
        let suggestedLocations = res.data.map(location => {
            let locationObj =
            {
                city: location.LocalizedName,
                country: location.Country.LocalizedName,
                location_key: location.Key,
            }
            return locationObj;
        })
        return suggestedLocations;
    }
    catch (e) {
        return false;
    }
}

export const getCurrentConditionsByLocationKey = async (location_key) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/currentconditions/v1/${location_key}?apikey=${WEATHER_API_ENV.api_key}`;
    try {
        let res = await axios.get(`${requestUrl}`);
        if (!res.status === 200) {
            return false;
        }
        if (res.data.Code) {
            return errorMessages.maxApiLimit;
        }
        return res.data[0];
    }
    catch (e) {
        return false;
    }
}

export const getFiveDayForecastByLocationKey = async (location_key) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/forecasts/v1/daily/5day/${location_key}?apikey=${WEATHER_API_ENV.api_key}`;
    try {
        let res = await axios.get(`${requestUrl}`);
        if (!res.status === 200) {
            return false;
        }
        if (res.data.Code) {
            return errorMessages.maxApiLimit;
        }
        return res.data;
    }
    catch (e) {
        return false;
    }
}

export const getCurrentLocationConditionsAndFiveDayForecast = async (location_key) => {
    try {
        return await Promise.all([getCurrentConditionsByLocationKey(location_key), getFiveDayForecastByLocationKey(location_key)]).then(res => {
            let currentConditions = res[0];
            let fiveDayForecast = res[1];
            if (currentConditions === errorMessages.maxApiLimit || fiveDayForecast === errorMessages.maxApiLimit) {
                return errorMessages.maxApiLimit;
            }
            if (!currentConditions || !fiveDayForecast) {
                return false;
            }
            return { currentConditions: currentConditions, fiveDayForecast: fiveDayForecast };
        })
    }
    catch (e) {
        return false;
    }
}

export const getConditionsByGeoLocation = async (lat, long) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/locations/v1/cities/geoposition/search?apikey=${WEATHER_API_ENV.api_key}&q=${lat}%2C%20${long}`;
    try {
        let res = await axios.get(`${requestUrl}`);
        if (!res.status === 200) {
            return false;
        }
        if (res.data.Code) {
            return errorMessages.maxApiLimit;
        }
        return res.data;
    }
    catch (e) {
        return false;
    }
}