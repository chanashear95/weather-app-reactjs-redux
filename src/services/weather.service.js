
import { weather_env, proxy_url } from '../environments';

export const searchAutoComplete = async (searchText) => {
    // return await fetch(`${proxy_url}${weather_env.base_url}/locations/v1/cities/autocomplete?apikey=${weather_env.api_key}&q=${searchText}`, {
    //     method: "GET",
    //     headers: {
    //         'Content-Type' : 'application/json',
    //     }
    // }).then(async res => {
    //     if(res.status == 200){
    //         return await res.json().then(data => {
    //             let suggestedLocations = [];
    //             data.map(location => {
    //                 suggestedLocations.push(
    //                     {
    //                         city: location.LocalizedName,
    //                         country: location.Country.LocalizedName,
    //                         key: location.Key,
    //                     }
    //                 )
    //             })
    //             return suggestedLocations;
    //         });
    //     }
    //     else{
    //         return false;
    //     }
    // }).catch(e => console.log(e));

    return [{city: 'Hong Kong', country: 'Hong Kong', key: '1123655'}, {city: 'Hefei', country: 'China', key: '101841'}];
}

export const getCurrentConditionsByLocationKey = async (location_key) => {
    return await fetch(`${proxy_url}${weather_env.base_url}/currentconditions/v1/${location_key}?apikey=${weather_env.api_key}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => {
        if(res.status == 200){
            return res.json().then(data => {
                return data;
            })
        }
        else{
            return false;
        }
    }).catch(e => false);
}

export const getFiveDayForecastByLocationKey = async (location_key) => {
    return await fetch(`${proxy_url}${weather_env.base_url}/forecasts/v1/daily/5day/${location_key}?apikey=${weather_env.api_key}`, {
        method: "GET",
        headers: {
            "Content-Type" : 'application/json'
        }
    }).then(res => {
        if(res.status == 200){
            return res.json().then(data => {
                return data;
            })
        }
        else{
            return false;
        }
    }).catch(e => false);
}