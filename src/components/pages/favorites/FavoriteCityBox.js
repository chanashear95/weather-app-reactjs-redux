import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCurrentConditionsByLocationKey } from "../../../services/weather.service";
import { setCurrentLocation } from '../../../redux/redux.service';

function FavoriteCityBox(props) {

    const [currentConditions, setCurrentConditions] = useState(
        {
            "LocalObservationDateTime": "2021-06-14T19:05:00+03:00",
            "EpochTime": 1623686700,
            "WeatherText": "Sunny",
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

    useEffect(async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.favorite.location_key);
        if (currentConditions) {
            setCurrentConditions(currentConditions[0])
        }
    }, [])

    const updateCurrentLocation = () => {
        setCurrentLocation(props.favorite);
    }

    return (
        <Link onClick={updateCurrentLocation} to="/">
            <div>
                <p>{props.favorite.name}</p>
                <p>{currentConditions.Temperature.Imperial.Value} F° / {currentConditions.Temperature.Metric.Value} C°</p>
            </div>
        </Link>
    )
}

export default FavoriteCityBox;