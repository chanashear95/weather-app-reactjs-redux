import { WEATHER_API_ENV, ERROR_MESSAGES } from 'environments';
import axios from 'axios';

export const getSearchAutoCompleteData = async (searchText, cancelTokenSource) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/locations/v1/cities/autocomplete?apikey=${WEATHER_API_ENV.api_key}&q=${searchText}`;
    try {
        let res = await axios.get(requestUrl, {
            cancelToken: cancelTokenSource.token
        });
        if (!res.status === 200) {
            return false;
        }
        if (res.data.Code) {
            return ERROR_MESSAGES.maxApiLimit;
        }
        if (!res.data) {
            return false;
        }
        let suggestedLocations = res.data.map(location => {
            let locationObj =
            {
                city: location.LocalizedName,
                country: location.Country.LocalizedName,
                location_key: location.Key,
                displayedText: location.LocalizedName + ',' + location.Country.LocalizedName,
                id: location.Key
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
            return ERROR_MESSAGES.serverError;
        }
        if (res.data.Code) {
            return ERROR_MESSAGES.maxApiLimit;
        }
        return res.data[0];
    }
    catch (e) {
        return ERROR_MESSAGES.serverError;
    }
}

export const getFiveDayForecastByLocationKey = async (location_key) => {
    let requestUrl = `${WEATHER_API_ENV.base_url}/forecasts/v1/daily/5day/${location_key}?apikey=${WEATHER_API_ENV.api_key}`;
    try {
        let res = await axios.get(`${requestUrl}`);
        if (!res.status === 200) {
            return ERROR_MESSAGES.serverError;
        }
        if (res.data.Code) {
            return ERROR_MESSAGES.maxApiLimit;
        }
        return res.data;
    }
    catch (e) {
        return ERROR_MESSAGES.serverError;
    }
}

export const getCurrentLocationConditionsAndFiveDayForecast = async (location_key) => {
    try {
        let [currentConditions, fiveDayForecast] = await axios.all([getCurrentConditionsByLocationKey(location_key), getFiveDayForecastByLocationKey(location_key)]);
        if (currentConditions === ERROR_MESSAGES.maxApiLimit || fiveDayForecast === ERROR_MESSAGES.maxApiLimit) {
            return ERROR_MESSAGES.maxApiLimit;
        }
        if (currentConditions === ERROR_MESSAGES.serverError || fiveDayForecast === ERROR_MESSAGES.serverError) {
            return ERROR_MESSAGES.serverError;
        }
        return { currentConditions: currentConditions, fiveDayForecast: fiveDayForecast };
    }
    catch (e) {
        return ERROR_MESSAGES.serverError;
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
            return ERROR_MESSAGES.maxApiLimit;
        }
        return res.data;
    }
    catch (e) {
        return false;
    }
}