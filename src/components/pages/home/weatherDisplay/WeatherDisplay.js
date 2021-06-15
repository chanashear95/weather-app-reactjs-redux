import { useEffect, useState, Fragment } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { getCurrentConditionsByLocationKey } from '../../../../services/weather.service';
import { getReduxState } from '../../../../redux/redux.service';
import { local_favorites_key, WEATHER_OPTIONS } from '../../../../environments';

import FiveDayForecast from './FiveDayForecast';
import ErrorMsg from '../../../global/error_message/ErrorMsg';

function WeatherDisplay() {

    const [loading, setLoading] = useState(false);
    const [selectedLocationCurrentConditions, setSelectedLocationCurrentConditions] = useState({
            "LocalObservationDateTime": "2021-06-14T22:12:00+02:00",
            "EpochTime": 1623701520,
            "WeatherText": "Clear",
            "WeatherIcon": 33,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": false,
            "Temperature": {
              "Metric": {
                "Value": 11.2,
                "Unit": "C",
                "UnitType": 17
              },
              "Imperial": {
                "Value": 52,
                "Unit": "F",
                "UnitType": 18
              }
            },
            "MobileLink": "http://m.accuweather.com/en/zw/harare/353558/current-weather/353558?lang=en-us",
            "Link": "http://www.accuweather.com/en/zw/harare/353558/current-weather/353558?lang=en-us",
        location_key: '215854',
        name: 'Tel Aviv'
    });
    const [metricTemperature, setMetricTemperature] = useState(true);
    const [isFavorite, setFavorite] = useState(false);
    const [showAddedToFavoritesMessage, setShowAddedToFavoritesMessage] = useState(false);
    const [showRemovedFromFavoritesMessage, setShowRemovedFromFavoritesMessage] = useState(false);
    const [err, setErr] = useState(null);
    const [localTime, setLocalTime] = useState('09:30');

    useEffect(async () => {
        let reduxState = getReduxState();
        // await getSelectedLocationCurrentConditions(reduxState.chosenLocation);
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
            currentConditions.location_key = locationObj.location_key;
            currentConditions.name = locationObj.name;
            setSelectedLocationCurrentConditions(currentConditions);
            setLocalTime(currentConditions.LocalObservationDateTime.slice(11,16));
            setLoading(false)
        }
        else {
            let err = "An error occurred. Please try again to see the forecast.";
            setErr(err);
        }
    }

    const switchToFahrenheit = () => {
        setMetricTemperature(false);
    }

    const switchToMetric = () => {
        setMetricTemperature(true);
    }

    const addOrRemoveFromFavorites = () => {
        let favorites;
        if (window.localStorage.getItem(local_favorites_key)) {
            favorites = JSON.parse(window.localStorage.getItem(local_favorites_key));
        }
        else {
            favorites = [];
        }
        if (isFavorite) {
            let favIdx = favorites.findIndex(i => i.location_key == selectedLocationCurrentConditions.location_key);
            favorites.splice(favIdx, 1);
            setShowRemovedFromFavoritesMessage(true);
        }
        else {
            favorites.push({ name: selectedLocationCurrentConditions.name, location_key: selectedLocationCurrentConditions.location_key });
            setShowAddedToFavoritesMessage(true);
        }
        favorites = JSON.stringify(favorites);
        window.localStorage.setItem(local_favorites_key, favorites);
        checkIfLocationIsFavorite(selectedLocationCurrentConditions.location_key);
    }

    const closeAddedToFavoritesMessage = () => {
        setShowAddedToFavoritesMessage(false);
    }

    const closeRemoveFromFavoritesMessage = () => {
        setShowRemovedFromFavoritesMessage(false);
    }

    return (
        <Fragment>
            {(() => {
                if (loading) {
                    return <p>Loading...</p>
                }
                else {
                    return (
                        <div 
                        className={Number(localTime.slice(0,2)) > 5 && Number(localTime.slice(0,2)) < 12 ? "weather-display-container relative morning-weather" 
                                    : Number(localTime.slice(0,2)) >= 12 && Number(localTime.slice(0,2)) < 20 ? "weather-display-container relative afternoon-weather" 
                                    : "weather-display-container relative night-weather" 
                                    }
                        
                        >
                            <Snackbar open={showAddedToFavoritesMessage} autoHideDuration={60000} onClose={closeAddedToFavoritesMessage}>
                                <MuiAlert className="added-favorites-msg" onClose={closeAddedToFavoritesMessage} severity="success">
                                    {selectedLocationCurrentConditions.name} has been added to favorites!
                                </MuiAlert>
                            </Snackbar>

                            <Snackbar open={showRemovedFromFavoritesMessage} autoHideDuration={60000} onClose={closeRemoveFromFavoritesMessage}>
                                <MuiAlert className="removed-favorites-msg" onClose={closeRemoveFromFavoritesMessage} severity="success">
                                    {selectedLocationCurrentConditions.name} was removed from favorites!
                                 </MuiAlert>
                            </Snackbar>

                            {err ? <ErrorMsg err={err} /> :
                                <Fragment>
                                    {isFavorite ? <FavoriteIcon onClick={addOrRemoveFromFavorites} className="favorite-btn clickable" /> :
                                        <FavoriteBorderIcon className="favorite-btn clickable" onClick={addOrRemoveFromFavorites} />}

                                    <div className="location-info-display">
                                        <div className="flex-row-start">
                                            <p className="chosen-location-title">Tel Aviv</p>
                                            <img className="weather-icon fade-in" src={WEATHER_OPTIONS.find(i => i.title == selectedLocationCurrentConditions.WeatherText).icon} />
                                        </div>
                                        <p>Monday June 14, 2021</p>
                                        <p>12:30 <small>PM</small></p>

                                    </div>

                                    <div className="text-center current-conditions-container">
                                        <p className="current-conditions-text">{selectedLocationCurrentConditions.WeatherText}</p>
                                        <p className="current-conditions-degrees">
                                            {metricTemperature ?
                                                selectedLocationCurrentConditions.Temperature.Metric.Value
                                                :
                                                selectedLocationCurrentConditions.Temperature.Imperial.Value
                                            }°
                                </p>
                                        <span className={metricTemperature ? "clickable metric-toggle" : "metric-toggle"} onClick={switchToFahrenheit}>F°</span> |
                                <span className={metricTemperature ? "metric-toggle" : "clickable metric-toggle"} onClick={switchToMetric}>C°</span>
                                    </div>
                                </Fragment>
                            }

                            <div className="five-day-forecast-container">
                                <FiveDayForecast />
                            </div>

                        </div>
                    )
                }
            })()}
        </Fragment>
    )
}

export default WeatherDisplay;