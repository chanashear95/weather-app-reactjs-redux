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
        <div style={{border: '1px solid #000'}}>

            <div>
                <p>
                    {metricTemperature ?
                        selectedLocationCurrentConditions.Temperature.Metric.Value
                        :
                        selectedLocationCurrentConditions.Temperature.Imperial.Value
                    }
                    °
                </p>
                <span onClick={switchToFahrenheit}>F°</span> | <span onClick={switchToMetric}>C°</span>
            </div>

            <div>
                <p>{selectedLocationCurrentConditions.WeatherText}</p>
            </div>

            <FiveDayForecast />
        </div>
    )
}

export default WeatherDisplay;