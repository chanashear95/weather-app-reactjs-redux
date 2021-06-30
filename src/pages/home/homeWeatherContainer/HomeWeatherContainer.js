import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getWeatherIconByTime } from 'functions/dateAndTime';
import { getCurrentLocationConditionsAndFiveDayForecast } from 'services/weather.service';

import 'pages/home/homeWeatherContainer/home-weather-container.css';

import FiveDayForecast from 'components/fiveDayForecast/FiveDayForecast';
import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';
import { ERROR_MESSAGES } from 'environments';
import CurrentConditions from 'components/currentConditions/CurrentConditions';

function HomeWeatherContainer() {

    const favorites = useSelector(state => state.favorites);
    const chosenLocation = useSelector(state => state.chosenLocation);
    const [currentConditions, setCurrentConditions] = useState(null);
    const [fiveDayForecast, setFiveDayForecast] = useState(null);
    const [isFavorite, setFavorite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [localTime, setLocalTime] = useState(null);

    const getLocationWeatherData = useCallback(async () => {
        setLoading(true);
        let weatherData = await getCurrentLocationConditionsAndFiveDayForecast(chosenLocation.location_key);
        if (Object.values(ERROR_MESSAGES).indexOf(weatherData) !== -1) {
            setErr(weatherData);
            setLoading(false);
            return;
        }
        setCurrentConditions(weatherData.currentConditions);
        setFiveDayForecast(weatherData.fiveDayForecast);
        setLocalTime(weatherData.currentConditions.LocalObservationDateTime.slice(11, 16));
        setLoading(false);
    }, [chosenLocation]);

    useEffect(() => {
        getLocationWeatherData();
    }, [chosenLocation, getLocationWeatherData]);

    useEffect(() => {
        if (favorites.findIndex(i => i.location_key === chosenLocation.location_key) !== -1) {
            setFavorite(true);
        }
        else {
            setFavorite(false);
        }
    }, [favorites, chosenLocation]);

    return (
        <div>
            {loading ? <Loading /> : err ? <ErrorMsg err={err} /> :
                <div className={`home-weather-container relative ${getWeatherIconByTime(localTime)}-weather`}>
                    <CurrentConditions conditions={currentConditions} isLocationFavorite={isFavorite} localTime={localTime} />
                    <FiveDayForecast forecast={fiveDayForecast} />
                </div>
            }
        </div>
    )
}

export default HomeWeatherContainer;