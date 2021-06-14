import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCurrentConditionsByLocationKey } from "../../../services/weather.service";
import { setCurrentLocation } from '../../../redux/redux.service';

import overcast from '../../../images/weatherIcons/overcast.png';


import Skeleton from '@material-ui/lab/Skeleton';

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
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.favorite.location_key);
        if (currentConditions) {
            setCurrentConditions(currentConditions[0])
        }
        else{
            //err data
        }
        setLoading(false);
    }, [])

    const updateCurrentLocation = () => {
        setCurrentLocation(props.favorite);
    }

    return (
        loading ? <Skeleton animation="wave" height={'250px'} width={'200px'}/> :
        <Link onClick={updateCurrentLocation} to="/">
            <div>
                <p>{props.favorite.name}</p>
                <img src={overcast} />
                <p>{currentConditions.Temperature.Imperial.Value} F° / {currentConditions.Temperature.Metric.Value} C°</p>
            </div>
        </Link>
    )
}

export default FavoriteCityBox;