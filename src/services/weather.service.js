import { weather_env, proxy_url } from 'environments';

export const searchAutoComplete = async (searchText) => {
    let encodedUrl = encodeURIComponent(`${weather_env.base_url}/locations/v1/cities/autocomplete?apikey=${weather_env.api_key}&q=${searchText}`);
    return await fetch(`${proxy_url}${encodedUrl}`, {
        method: "GET",
        headers: {
            'Content-Type' : 'application/json',
        }
    }).then(async res => {
        if(res.status == 200){
            return await res.json().then(data => {
                if(!data.Code){
                let suggestedLocations = [];
                data.map(location => {
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
            else{
                return false; // bakashot
            }
            });
        }
        else{
            return false;
        }
    }).catch(e => console.log(e));
}

export const getCurrentConditionsByLocationKey = async (location_key) => {
    let encodedUrl = encodeURIComponent(`${weather_env.base_url}/currentconditions/v1/${location_key}?apikey=${weather_env.api_key}`);
    return await fetch(`${proxy_url}${encodedUrl}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    }).then(res => {
        if(res.status == 200){
            return res.json().then(data => {
                if(data.Code){
                return  false; //no more bakashot
                }
                else{
                    return data[0]; 
                }
            })
        }
        else{
            return false;
        }
    }).catch(e => false);
}

export const getFiveDayForecastByLocationKey = async (location_key) => {
    let encodedUrl = encodeURIComponent(`${weather_env.base_url}/forecasts/v1/daily/5day/${location_key}?apikey=${weather_env.api_key}`);
    return await fetch(`${proxy_url}${encodedUrl}`, {
        method: "GET",
        headers: {
            "Content-Type" : 'application/json'
        }
    }).then(res => {
        if(res.status == 200){
            return res.json().then(data => {
                if(data){
                    console.log(data)
                return data;
                }
                else{
                    return false; //no more bakashot
                }
            })
        }
        else{
            return false;
        }
    }).catch(e => false);
}