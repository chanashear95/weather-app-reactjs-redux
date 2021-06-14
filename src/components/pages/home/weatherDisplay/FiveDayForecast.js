import { useState, useEffect } from 'react';
import { getFiveDayForecastByLocationKey } from '../../../../services/weather.service';

function FiveDayForecast(props) {

    const [fiveDayForecast, setFiveDayForecast] = useState({
        DailyForecasts: [
            {
                EpochDate: 10673284368,
                Temperature: {
                    Maximum: {
                        Value: 86
                    },
                    Minimum: {
                        Value: 79
                    }
                }
            },
            {
                EpochDate: 10673284368,
                Temperature: {
                    Maximum: {
                        Value: 86
                    },
                    Minimum: {
                        Value: 79
                    }
                }
            },
            {
                EpochDate: 10673284368,
                Temperature: {
                    Maximum: {
                        Value: 86
                    },
                    Minimum: {
                        Value: 79
                    }
                }
            },
            {
                EpochDate: 10673284368,
                Temperature: {
                    Maximum: {
                        Value: 86
                    },
                    Minimum: {
                        Value: 79
                    }
                }
            },
            {
                EpochDate: 10673284368,
                Temperature: {
                    Maximum: {
                        Value: 86
                    },
                    Minimum: {
                        Value: 79
                    }
                }
            },
        ],
        Headline: {}
    });

    //  useEffect( async () => {
    //         await getSelectedLocationFiveDayForecast();
    //  }, [])

    const getSelectedLocationFiveDayForecast = async () => {
        let fiveDayForecast = await getFiveDayForecastByLocationKey(props.selectedLocationKey);
        if (fiveDayForecast) {
            console.log(fiveDayForecast);
        }
    }

    return (
        <div className="flex-row-c">
            {fiveDayForecast.DailyForecasts.map(forecast => {
                return (
                    <div>
                        <p> <strong>H</strong>{forecast.Temperature.Maximum.Value}</p>
                        <p> <strong>L</strong>{forecast.Temperature.Minimum.Value}</p>

                    </div>
                )
            })}
        </div>
    )
}


export default FiveDayForecast;