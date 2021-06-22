import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chosenLocationActionsCreator } from 'store/actionsConfig';
import { Link } from 'react-router-dom';

import { getCurrentConditionsByLocationKey } from "services/weather.service";
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
    const dispatch = useDispatch();
    const { updateChosenLocation } = bindActionCreators(chosenLocationActionsCreator, dispatch);

    useEffect(() => {
        const getCurrentConditions = async () => {
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
        }
        getCurrentConditions();
    }, [props])

    const handleClickLocation = () => {
        updateChosenLocation(props.favorite);
    }

    return (
        <div className={`favorite-card flex-col fade-in relative ${getWeatherIconByTime(localTime)}-weather`}>

            {
                err || loading ? ""
                    :
                    <FavoriteButton
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
                                {getWeatherIconByTime(localTime) === 'night' ?
                                    <img alt="Night" src={moon} className="weather-icon" /> :
                                    <img alt={currentConditions.WeatherText} className="weather-icon" src={getWeatherIconFromWeatherText(currentConditions.WeatherText)} />
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