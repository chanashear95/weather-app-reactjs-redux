import { useEffect, useState, Fragment } from "react";
import { Link } from 'react-router-dom';
import { getCurrentConditionsByLocationKey } from "../../../services/weather.service";
import { setCurrentLocation } from '../../../redux/redux.service';
import { WEATHER_OPTIONS } from '../../../environments';
import ErrorMsg from '../../global/error_message/ErrorMsg';

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

    useEffect(async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.favorite.location_key);
        if (currentConditions) {
            setCurrentConditions(currentConditions[0])
        }
        else {
            let err = 'Could not display weather. Please try again.';
            setErr(err);
        }
    }, [])

    const updateCurrentLocation = () => {
        setCurrentLocation(props.favorite);
    }

    return (
        <Link onClick={updateCurrentLocation} to="/">
            <div style={{ backgroundColor: WEATHER_OPTIONS.find(i => i.title == currentConditions.WeatherText).bg_color }} className="favorite-card flex-col fade-in relative">
                <div className="purple-overlay"></div>
                {err ? <ErrorMsg err={err}/> :
                    <Fragment>
                        <p className="favorite-city-title">{props.favorite.name}</p>
                        <img className="weather-icon" src={WEATHER_OPTIONS.find(i => i.title == currentConditions.WeatherText).icon} />
                        <p>{currentConditions.WeatherText}</p>
                        <p className="favorite-temeperature">{currentConditions.Temperature.Imperial.Value} F° / {currentConditions.Temperature.Metric.Value} C°</p>
                    </Fragment>
                }
            </div>
        </Link>
    )
}

export default FavoriteCityBox;