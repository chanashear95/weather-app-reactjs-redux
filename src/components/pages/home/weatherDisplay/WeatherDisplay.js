import { useEffect, useState, Fragment } from 'react';

import { convertMilitaryTimeTo12Hour, getWeatherIconByTime } from 'functions/dateAndTime';
import { getWeatherIconFromWeatherText } from 'functions/temperature';
import { getCurrentConditionsByLocationKey } from 'services/weather.service';
import { getReduxState } from 'redux/redux.service';
import store from 'redux/redux'
import { local_favorites_key } from 'environments';

import moon from 'images/weatherIcons/moon.png';

import FiveDayForecast from 'components/pages/home/weatherDisplay/FiveDayForecast';
import ErrorMsg from 'components/global/error_message/ErrorMsg';
import FavoriteButton from 'components/global/favorite_button/FavoriteButton';
import Loading from 'components/global/loading/Loading';

function WeatherDisplay() {

    const [selectedLocationCurrentConditions, setSelectedLocationCurrentConditions] = useState(null);
    const [metricTemperature, setMetricTemperature] = useState(true);
    const [isFavorite, setFavorite] = useState(false);
    const [err, setErr] = useState(null);
    const [localTime, setLocalTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reduxTempCompareState, setReduxTempCompareState] = useState(null);

    useEffect(async () => {
        let reduxState = getReduxState();
        await getSelectedLocationCurrentConditions(reduxState.chosenLocation);
        checkIfLocationIsFavorite(reduxState.chosenLocation.location_key);
        store.subscribe(async () => {
            let updatedState = getReduxState();
            setReduxTempCompareState(updatedState.chosenLocation);
        })
    }, [])

    useEffect(async () => {
        if (selectedLocationCurrentConditions) {
            if (reduxTempCompareState.location_key !== selectedLocationCurrentConditions.location_key) {
                setLoading(true);
                await getSelectedLocationCurrentConditions(reduxTempCompareState);
                checkIfLocationIsFavorite(reduxTempCompareState.location_key);
            }
        }
    }, [reduxTempCompareState])

    const getSelectedLocationCurrentConditions = async (locationObj) => {
        let currentConditions = await getCurrentConditionsByLocationKey(locationObj.location_key);
        if (currentConditions) {
            if (currentConditions !== 'max limit') {
                currentConditions.location_key = locationObj.location_key;
                currentConditions.name = locationObj.name;
                setSelectedLocationCurrentConditions(currentConditions);
                setReduxTempCompareState(currentConditions);
                setLocalTime(currentConditions.LocalObservationDateTime.slice(11, 16));
                setLoading(false)
            }
            else {
                let err = 'API has reached its daily limit.';
                setErr(err);
            }
        }
        else {
            let err = "An error occurred. Please try again to see the forecast.";
            setErr(err);
            setLoading(false);
        }
    }

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

    const toggleTemperatureFormat = () => {
        setMetricTemperature(prevFormat => !prevFormat);

    }

    return (
        <Fragment>
            {(() => {
                if (loading) {
                    return <Loading />
                }
                else {
                    return (
                        <div className={`weather-display-container relative ${getWeatherIconByTime(localTime)}-weather`}>
                            {
                                err ?
                                    <ErrorMsg err={err} /> :
                                    <Fragment>
                                        <FavoriteButton
                                            refreshFavorites={checkIfLocationIsFavorite}
                                            isFavorite={isFavorite}
                                            location={{ name: selectedLocationCurrentConditions.name, location_key: selectedLocationCurrentConditions.location_key }}
                                        />
                                        <div className="location-info-display">
                                            <div className="flex-row-start">
                                                <p className="chosen-location-title">{selectedLocationCurrentConditions.name}</p>
                                                {
                                                    getWeatherIconByTime(localTime) == 'night' ? <img src={moon} className="weather-icon fade-in" /> :
                                                        <img className="weather-icon fade-in" src={getWeatherIconFromWeatherText(selectedLocationCurrentConditions.WeatherText)} />
                                                }
                                            </div>
                                            <p>{new Date(selectedLocationCurrentConditions.LocalObservationDateTime).toString().slice(0, 15)}</p>
                                            <p>{convertMilitaryTimeTo12Hour(localTime)}
                                                <small>{Number(localTime.slice(0, 2)) >= 12 ? "P.M" : 'A.M'}</small>
                                            </p>
                                            <p style={{ fontSize: 18 }} className="fade-in">
                                                Good {getWeatherIconByTime(localTime)}
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
                                            <span className={metricTemperature ? "clickable metric-toggle" : "metric-toggle"} onClick={toggleTemperatureFormat}>F°</span>
                                            <span>|</span>
                                            <span className={metricTemperature ? "metric-toggle" : "clickable metric-toggle"} onClick={toggleTemperatureFormat}>C°</span>
                                        </div>
                                    </Fragment>
                            }
                            <div className="five-day-forecast-container">
                                <FiveDayForecast metricTemperature={metricTemperature} selectedLocationKey={selectedLocationCurrentConditions.location_key} />
                            </div>
                        </div>
                    )
                }
            })()}
        </Fragment>
    )
}

export default WeatherDisplay;