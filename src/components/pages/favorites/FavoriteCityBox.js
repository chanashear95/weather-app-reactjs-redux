import { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import { getCurrentConditionsByLocationKey } from "../../../services/weather.service";
import { setCurrentLocation } from '../../../redux/redux.service';
import { WEATHER_OPTIONS } from '../../../environments';
import ErrorMsg from '../../global/error_message/ErrorMsg';
import FavoriteButton from "../../global/favorite_button/FavoriteButton";
import Loading from '../../global/loading/Loading';

function FavoriteCityBox(props) {

    const [currentConditions, setCurrentConditions] = useState(
        {
            "LocalObservationDateTime": "2021-06-14T19:05:00+03:00",
            "EpochTime": 1623686700,
            "WeatherText": "Overcast",
            "WeatherIcon": 1,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": true,
            "Temperature": {
                "Metric": {
                    "Value": 25.1,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Imperial": {
                    "Value": 77,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "MobileLink": "http://m.accuweather.com/en/tr/alanya/316940/current-weather/316940?lang=en-us",
            "Link": "http://www.accuweather.com/en/tr/alanya/316940/current-weather/316940?lang=en-us"
        }
    );
    const [err, setErr] = useState(null);
    const [localTime, setLocalTime] = useState('09:30')
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.favorite.location_key);
        if (currentConditions) {
            setCurrentConditions(currentConditions[0])
            let localTime = currentConditions[0].LocalObservationDateTime.slice(11, 16);
            setLocalTime(localTime);
        }
        else {
            let err = 'Could not display weather. Please try again.';
            setErr(err);
        }
        setLoading(false);
    }, [])

    const updateCurrentLocation = () => {
        setCurrentLocation(props.favorite);
    }

    const refreshFavorites = () => {
        props.getFavorites();
    }

    return (
            <div className={Number(localTime.slice(0, 2)) > 5 && Number(localTime.slice(0, 2)) < 12 ? "favorite-card flex-col fade-in relative morning-weather"
                :
                Number(localTime.slice(0, 2)) >= 12 && Number(localTime.slice(0, 2)) < 20 ? "favorite-card flex-col fade-in relative afternoon-weather" :
                    "favorite-card flex-col fade-in relative night-weather"
            }>
              
{err || loading ? "" : <FavoriteButton refreshFavorites={refreshFavorites} isFavorite={true} location={{name: props.favorite.name, location_key: props.favorite.location_key}}/>}
        <Link onClick={updateCurrentLocation} to="/">
                <div className="purple-overlay"></div>

                
                {err ?<div className="center error"> <ErrorMsg err={err} /> </div> : loading ?  <Loading /> :
                    <div className="text-center">
                        <p className="favorite-city-title">{props.favorite.name}</p>
                        <img className="weather-icon" src={WEATHER_OPTIONS.find(i => i.title == currentConditions.WeatherText).icon} />
                        <p>{currentConditions.WeatherText}</p>
                        <p className="favorite-temeperature">{currentConditions.Temperature.Imperial.Value} F° / {currentConditions.Temperature.Metric.Value} C°</p>
                    </div>
                }
                        </Link>       
            </div>
    )
}

export default FavoriteCityBox;