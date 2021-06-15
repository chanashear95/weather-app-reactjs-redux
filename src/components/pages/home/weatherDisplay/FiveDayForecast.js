import { useState, useEffect } from 'react';
import { getFiveDayForecastByLocationKey } from '../../../../services/weather.service'; 
import { WEATHER_OPTIONS } from '../../../../environments';

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

     useEffect( async () => {
            await getSelectedLocationFiveDayForecast();
     }, [])

    const getSelectedLocationFiveDayForecast = async () => {
        // let fiveDayForecast = await getFiveDayForecastByLocationKey(props.selectedLocationKey);
        if (fiveDayForecast) {
            console.log(fiveDayForecast);
        }
    }

    return (
        <div className="flex-between">
            {fiveDayForecast.DailyForecasts.map(forecast => {
                return (
                    <div className="daily-forecast">
                      <p>Mon</p>
                        <p> <strong>High </strong>{forecast.Temperature.Maximum.Value}°</p>
                        <p> <strong>Low </strong>{forecast.Temperature.Minimum.Value}°</p>
                      <p>{forecast.Day.IconPhrase}</p>
                      <img className="weather-icon fade-in" src={WEATHER_OPTIONS.find(i => forecast.Day.IconPhrase.includes(i.title.toLowerCase())).icon} />
                    </div>
                )
            })}
        </div>
    )
}


export default FiveDayForecast;