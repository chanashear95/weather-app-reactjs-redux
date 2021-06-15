import { useState, useEffect } from 'react';
import { getFiveDayForecastByLocationKey } from '../../../../services/weather.service'; 
import { WEATHER_OPTIONS } from '../../../../environments';
import ErrorMsg from '../../../global/error_message/ErrorMsg';
import { convertFahrenheitToCelcius } from '../../../../functions/temperature';
import Loading from '../../../global/loading/Loading';

function FiveDayForecast(props) {

    const [fiveDayForecast, setFiveDayForecast] = useState({
        
            "Headline": {
              "EffectiveDate": "2021-06-19T08:00:00+03:00",
              "EffectiveEpochDate": 1624078800,
              "Severity": 7,
              "Text": "Sunny this weekend",
              "Category": "",
              "EndDate": null,
              "EndEpochDate": null,
              "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
              "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
            },
            "DailyForecasts": [
              {
                "Date": "2021-06-14T07:00:00+03:00",
                "EpochDate": 1623643200,
                "Temperature": {
                  "Minimum": {
                    "Value": 71,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 81,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 2,
                  "IconPhrase": "Mostly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 34,
                  "IconPhrase": "Mostly clear",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
              },
              {
                "Date": "2021-06-15T07:00:00+03:00",
                "EpochDate": 1623729600,
                "Temperature": {
                  "Minimum": {
                    "Value": 71,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 81,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 2,
                  "IconPhrase": "Mostly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 34,
                  "IconPhrase": "Mostly clear",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
              },
              {
                "Date": "2021-06-16T07:00:00+03:00",
                "EpochDate": 1623816000,
                "Temperature": {
                  "Minimum": {
                    "Value": 70,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 79,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 2,
                  "IconPhrase": "Mostly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 35,
                  "IconPhrase": "Partly cloudy",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
              },
              {
                "Date": "2021-06-17T07:00:00+03:00",
                "EpochDate": 1623902400,
                "Temperature": {
                  "Minimum": {
                    "Value": 69,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 80,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 2,
                  "IconPhrase": "Mostly sunny",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 35,
                  "IconPhrase": "Partly cloudy",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
              },
              {
                "Date": "2021-06-18T07:00:00+03:00",
                "EpochDate": 1623988800,
                "Temperature": {
                  "Minimum": {
                    "Value": 71,
                    "Unit": "F",
                    "UnitType": 18
                  },
                  "Maximum": {
                    "Value": 81,
                    "Unit": "F",
                    "UnitType": 18
                  }
                },
                "Day": {
                  "Icon": 1,
                  "IconPhrase": "mostly overcast",
                  "HasPrecipitation": false
                },
                "Night": {
                  "Icon": 34,
                  "IconPhrase": "Mostly clear",
                  "HasPrecipitation": false
                },
                "Sources": [
                  "AccuWeather"
                ],
                "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
              }
            ]
          
    });
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(true)

     useEffect( async () => {
            await getSelectedLocationFiveDayForecast();
            let forecastContainer = document.getElementsByClassName('five-day-forecast-container')[0];
            forecastContainer.style.transform = 'translateY(0px)';
     }, [])

    const getSelectedLocationFiveDayForecast = async () => {
        // let fiveDayForecast = await getFiveDayForecastByLocationKey(props.selectedLocationKey);
        if (fiveDayForecast) {
            setFiveDayForecast(fiveDayForecast);
            setLoading(false)
        }
        else{
          let err = 'An error occured. Please try again to see 5 day forecast.';
          setErr(err);
          setLoading(false)
        }
    }

    return (
        <div className="flex-between">
          {err ? <ErrorMsg err={err} /> : loading ? <Loading /> :
            fiveDayForecast.DailyForecasts.map(forecast => {
                return (
                    <div className="daily-forecast">
                      <p>{new Date(forecast.Date).toString().slice(0,3)}</p>
                        <p> <strong>High </strong>{props.metricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Maximum.Value) : forecast.Temperature.Maximum.Value}°</p>
                        <p> <strong>Low </strong>{props.metricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Minimum.Value) : forecast.Temperature.Minimum.Value}°</p>
                      <p>{forecast.Day.IconPhrase}</p>
                      <img className="weather-icon fade-in" src={WEATHER_OPTIONS.find(i => forecast.Day.IconPhrase.includes(i.title.toLowerCase())).icon} />
                    </div>
                )
            })}
        </div>
    )
}


export default FiveDayForecast;