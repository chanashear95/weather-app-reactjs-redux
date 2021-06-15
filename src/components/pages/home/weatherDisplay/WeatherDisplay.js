import { useEffect, useState, Fragment } from 'react';
import { getCurrentConditionsByLocationKey } from 'services/weather.service';
import { getReduxState } from 'redux/redux.service';
import { local_favorites_key, WEATHER_OPTIONS } from 'environments';

import FiveDayForecast from 'components/pages/home/weatherDisplay/FiveDayForecast';
import ErrorMsg from 'components/global/error_message/ErrorMsg';
import FavoriteButton from 'components/global/favorite_button/FavoriteButton';
import Loading from 'components/global/loading/Loading';
import store from 'redux/redux'
function WeatherDisplay() {

    const [selectedLocationCurrentConditions, setSelectedLocationCurrentConditions] = useState(null
        //     "LocalObservationDateTime": "2021-06-14T22:12:00+02:00",
        //     "EpochTime": 1623701520,
        //     "WeatherText": "Sunny",
        //     "WeatherIcon": 33,
        //     "HasPrecipitation": false,
        //     "PrecipitationType": null,
        //     "IsDayTime": false,
        //     "Temperature": {
        //       "Metric": {
        //         "Value": 11.2,
        //         "Unit": "C",
        //         "UnitType": 17
        //       },
        //       "Imperial": {
        //         "Value": 52,
        //         "Unit": "F",
        //         "UnitType": 18
        //       }
        //     },
        //     "MobileLink": "http://m.accuweather.com/en/zw/harare/353558/current-weather/353558?lang=en-us",
        //     "Link": "http://www.accuweather.com/en/zw/harare/353558/current-weather/353558?lang=en-us",
        // location_key: '215854',
        // name: 'Tel Aviv'
    );
    const [metricTemperature, setMetricTemperature] = useState(true);
    const [isFavorite, setFavorite] = useState(false);
    const [err, setErr] = useState('');
    const [localTime, setLocalTime] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(async () => {
        let reduxState = getReduxState();
        store.subscribe(async()=>{
            setLoading(true)
            let reduxState = getReduxState();
            await getSelectedLocationCurrentConditions(reduxState.chosenLocation);
            checkIfLocationIsFavorite(reduxState.chosenLocation.location_key);
      })
      await getSelectedLocationCurrentConditions(reduxState.chosenLocation);
      checkIfLocationIsFavorite(reduxState.chosenLocation.location_key);
    }, [])

    const checkIfLocationIsFavorite = (location_key) => {
        if (window.localStorage.getItem(local_favorites_key)) {
            let favorites = JSON.parse(window.localStorage.getItem(local_favorites_key));
            if (favorites.findIndex(i => i.location_key == location_key) !== -1) {
                setFavorite(true);
            }
            else {
                setFavorite(false);
            }
        }
    }

    const getSelectedLocationCurrentConditions = async (locationObj) => {
        let currentConditions = await getCurrentConditionsByLocationKey(locationObj.location_key);
        if (currentConditions) {
            console.log(currentConditions)
            currentConditions.location_key = locationObj.location_key;
            currentConditions.name = locationObj.name;
            setSelectedLocationCurrentConditions(currentConditions);
            setLocalTime(currentConditions.LocalObservationDateTime.slice(11,16));
            setLoading(false)
        }
        else {
            let err = "An error occurred. Please try again to see the forecast.";
            setErr(err);
            setLoading(false);
        }
    }

    const switchToFahrenheit = () => {
        setMetricTemperature(false);
    }

    const switchToMetric = () => {
        setMetricTemperature(true);
    }

    return (
        <Fragment>
            {(() => {
                if (loading) {
                    return <Loading />
                }
                else {
                    return (
                        <div 
                        className={!localTime ?"weather-display-container relative morning-weather" : Number(localTime.slice(0,2)) > 5 && Number(localTime.slice(0,2)) < 12 ? "weather-display-container relative morning-weather" 
                                    : Number(localTime.slice(0,2)) >= 12 && Number(localTime.slice(0,2)) < 20 ? "weather-display-container relative afternoon-weather" 
                                    : "weather-display-container relative night-weather" 
                                    }
                        
                        >
                           

                            {err ? <ErrorMsg err={err} />  :
                                <Fragment>
                                    <FavoriteButton refreshFavorites={checkIfLocationIsFavorite} isFavorite={isFavorite} location={{name: selectedLocationCurrentConditions.name, location_key: selectedLocationCurrentConditions.location_key}}/>
                                    <div className="location-info-display">
                                        <div className="flex-row-start">
                                <p className="chosen-location-title">{selectedLocationCurrentConditions.name}</p>
                                            <img className="weather-icon fade-in" src={WEATHER_OPTIONS.find(i => selectedLocationCurrentConditions.WeatherText.toLowerCase().includes(i.title.toLowerCase())) ? WEATHER_OPTIONS.find(i => selectedLocationCurrentConditions.WeatherText.toLowerCase().includes(i.title.toLowerCase())).icon: ""} />
                                        </div>
                                        <p>Monday June 14, 2021</p>
                                        <p>12:30 <small>PM</small></p>
                                        <p style={{fontSize: 18}} className="fade-in">
                                            {Number(localTime.slice(0,2)) > 5 && Number(localTime.slice(0,2)) < 12 ? "Good Morning" 
                                            : Number(localTime.slice(0,2)) >= 12 && Number(localTime.slice(0,2)) < 20 ? "Good Afternoon" :
                                            "Good Night"    
                                        }
                                        </p>

                                    </div>

                                    <div className="text-center current-conditions-container">
                                        <p className="current-conditions-text">{selectedLocationCurrentConditions.WeatherText}</p>
                                        <p className="current-conditions-degrees">
                                            {metricTemperature ?
                                               parseInt(selectedLocationCurrentConditions.Temperature.Metric.Value) + '° C'
                                                : 
                                                parseInt(selectedLocationCurrentConditions.Temperature.Imperial.Value) + '° F'
                                            }
                                </p>
                                        <span className={metricTemperature ? "clickable metric-toggle" : "metric-toggle"} onClick={switchToFahrenheit}>F°</span> |
                                <span className={metricTemperature ? "metric-toggle" : "clickable metric-toggle"} onClick={switchToMetric}>C°</span>
                                    </div>
                                </Fragment>
                            }
                            {selectedLocationCurrentConditions ? 
                            <div className="five-day-forecast-container">
                                <FiveDayForecast metricTemperature={metricTemperature} selectedLocationKey={selectedLocationCurrentConditions.location_key}/>
                            </div>
                            : ""}

                        </div>
                    )
                }
            })()}
        </Fragment>
    )
}

export default WeatherDisplay;