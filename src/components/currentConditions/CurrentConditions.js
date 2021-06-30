import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { convertMilitaryTimeTo12Hour, getWeatherIconByTime } from 'functions/dateAndTime';
import { getWeatherIconFromWeatherText } from 'functions/temperature';

import moon from 'images/weatherIcons/moon.png';

import FavoriteButton from 'components/global/favorite_button/FavoriteButton';

import 'components/currentConditions/current-conditions.css';
import { metricFormatActions } from 'store/actionsConfig';

function CurrentConditions({ conditions, isLocationFavorite, localTime }) {

    const chosenLocation = useSelector(state => state.chosenLocation);
    const { setMetric, setFahrenheit } = bindActionCreators(metricFormatActions, useDispatch());
    const isMetricTemperature = useSelector(state => state.metricFormat);

    return (
        <Fragment>
            <FavoriteButton
                isFavorite={isLocationFavorite}
                location={chosenLocation}
            />
            <div className="location-info-display">
                <div className="flex-row-start">
                    <p className="chosen-location-title">{chosenLocation.name}</p>
                    {localTime ?
                        getWeatherIconByTime(localTime) === 'night' ? <img alt="Night" src={moon} className="weather-icon fade-in" /> :
                            <img alt={conditions.WeatherText} className="weather-icon fade-in" src={getWeatherIconFromWeatherText(conditions.WeatherText)} />
                        : ""}
                </div>
                <p>{new Date(conditions.LocalObservationDateTime).toString().slice(0, 15)}</p>
                <p>{localTime ? convertMilitaryTimeTo12Hour(localTime) : ""}
                    <small>{localTime ? Number(localTime.slice(0, 2)) >= 12 ? "P.M" : 'A.M' : ""}</small>
                </p>
                <p style={{ fontSize: 18 }} className="fade-in">
                    Good {localTime ? getWeatherIconByTime(localTime) : ""}
                </p>
            </div>

            <div className="text-center current-conditions-container">
                <p className="current-conditions-text">{conditions.WeatherText}</p>
                <p className="current-conditions-degrees">
                    {isMetricTemperature ?
                        parseInt(conditions.Temperature.Metric.Value) + '° C'
                        :
                        parseInt(conditions.Temperature.Imperial.Value) + '° F'
                    }
                </p>
                <span className={isMetricTemperature ? "clickable metric-toggle" : "metric-toggle"} onClick={setFahrenheit}>F°</span>
                <span>|</span>
                <span className={isMetricTemperature ? "metric-toggle" : "clickable metric-toggle"} onClick={setMetric}>C°</span>
            </div>
        </Fragment>
    )
}

export default CurrentConditions;