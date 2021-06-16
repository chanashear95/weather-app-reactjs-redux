import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import { getCurrentConditionsByLocationKey } from "services/weather.service";
import { setCurrentLocation } from 'redux/redux.service';
import { getWeatherIconByTime } from 'functions/dateAndTime';
import { getWeatherIconFromWeatherText } from "functions/temperature";

import moon from 'images/weatherIcons/moon.png';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import FavoriteButton from "components/global/favorite_button/FavoriteButton";
import Loading from 'components/global/loading/Loading';


function FavoriteCityBox(props) {

    const [currentConditions, setCurrentConditions] = useState(null);
    const [err, setErr] = useState(null);
    const [localTime, setLocalTime] = useState('09:30')
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.favorite.location_key);
        if (currentConditions) {
            if (currentConditions !== 'max limit') {
                setCurrentConditions(currentConditions)
                let localTime = currentConditions.LocalObservationDateTime.slice(11, 16);
                setLocalTime(localTime);
            }
            else {
                let err = 'API has reached its daily limit.';
                setErr(err);
            }
        }
        else {
            let err = 'Could not display weather. Please try again.';
            setErr(err);
        }
        setLoading(false);
    }, [])

    const handleClickLocation = () => {
        setCurrentLocation(props.favorite);
    }

    const refreshFavorites = () => {
        props.getFavorites();
    }

    return (
        <div className={`favorite-card flex-col fade-in relative ${getWeatherIconByTime(localTime)}-weather`}>

            {err || loading ? "" :
                <FavoriteButton
                    refreshFavorites={refreshFavorites}
                    isFavorite={true}
                    location={{ name: props.favorite.name, location_key: props.favorite.location_key }}
                />
            }

            <Link onClick={handleClickLocation} to="/">
                <div className="purple-overlay"></div>

                {
                    err ?
                        <div className="center error"> <ErrorMsg err={err} /> </div> :
                        loading ?
                            <Loading />
                            :
                            <div className="text-center">
                                <p className="favorite-city-title">{props.favorite.name}</p>
                                {getWeatherIconByTime(localTime) == 'night' ?
                                    <img src={moon} className="weather-icon" /> :
                                    <img className="weather-icon" src={getWeatherIconFromWeatherText(currentConditions.WeatherText)} />
                                }
                                <p>{currentConditions.WeatherText}</p>
                                <p className="favorite-temeperature">{currentConditions.Temperature.Imperial.Value} F° / {currentConditions.Temperature.Metric.Value} C°</p>
                            </div>
                }
            </Link>

        </div>
    )
}

export default FavoriteCityBox;