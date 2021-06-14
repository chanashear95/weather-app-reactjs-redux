import { useEffect, useState } from 'react';

import { getCurrentConditionsByLocationKey } from '../../../../services/weather.service';

import FiveDayForecast from './FiveDayForecast';

function WeatherDisplay(props) {

    const [loading, setLoading] = useState();
    const [selectedLocationCurrentConditions, setSelectedLocationCurrentConditions] = useState({
        HasPrecipitation: false,
        IsDayTime: true,
        Temperature: {
            Imperial: {
                Value: 82,
            },
            Metric: {
                Value: 28,
            }
        },
        WeatherText: "Overcast"
    });
    const [metricTemperature, setMetricTemperature] = useState(true);

    //  useEffect( async () => {
    //      await getSelectedLocationCurrentConditions();
    //  }, [])

    const getSelectedLocationCurrentConditions = async () => {
        let currentConditions = await getCurrentConditionsByLocationKey(props.selectedLocationKey);
        if (currentConditions) {
            console.log(currentConditions[0]);
        }
    }

    const switchToFahrenheit = () => {
        setMetricTemperature(false);
    }

    const switchToMetric = () => {
        setMetricTemperature(true);
    }

    return (
        <div className="weather-display-container relative">

            <div>
                <p className="chosen-location-title">Tel Aviv</p>
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
                }
                    °
                </p>
            <span className={metricTemperature ? "clickable metric-toggle" : "metric-toggle"} onClick={switchToFahrenheit}>F°</span> | <span className={metricTemperature ? "metric-toggle" : "clickable metric-toggle"} onClick={switchToMetric}>C°</span>
            </div>

           
            <div className="five-day-forecast-container">
                <FiveDayForecast />
            </div>
        </div>
    )
}

export default WeatherDisplay;