import { useState, useEffect } from 'react';

import { getFiveDayForecastByLocationKey } from 'services/weather.service';
import { convertFahrenheitToCelcius, getWeatherIconFromWeatherText } from 'functions/temperature';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

function FiveDayForecast(props) {

  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSelectedLocationFiveDayForecast = async () => {
      let fiveDayForecast = await getFiveDayForecastByLocationKey(props.selectedLocationKey);
      if (fiveDayForecast) {
        if (fiveDayForecast !== 'max limit') {
          setFiveDayForecast(fiveDayForecast);
          setLoading(false)
        }
        else {
          let err = 'API has reached its daily limit.';
          setErr(err);
        }
      }
      else {
        let err = 'An error occured. Please try again to see 5 day forecast.';
        setErr(err);
        setLoading(false)
      }
    }
    getSelectedLocationFiveDayForecast();
  }, [props.selectedLocationKey]);

  useEffect(()=>{
    return () => setFiveDayForecast(null);
  }, [])

  useEffect(() => {
    if (fiveDayForecast) {
      let forecastContainer = document.getElementsByClassName('five-day-forecast-container')[0];
      if (forecastContainer) {
        forecastContainer.style.transform = 'translateY(0px)';
      }
    }
  }, [fiveDayForecast]);


  return (
    <div className="flex-between">
      {
        err ?
          <ErrorMsg err={err} /> :
          loading ?
            <Loading /> :
            fiveDayForecast.DailyForecasts.map((forecast, idx) => {
              return (
                <div key={'daily-forecast' + idx} className="daily-forecast">
                  <p>{new Date(forecast.Date).toString().slice(0, 3)}</p>
                  <p> <strong>High </strong>{props.metricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Maximum.Value) : forecast.Temperature.Maximum.Value}°</p>
                  <p> <strong>Low </strong>{props.metricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Minimum.Value) : forecast.Temperature.Minimum.Value}°</p>
                  <p>{forecast.Day.IconPhrase}</p>
                  <img alt={forecast.Day.IconPhrase} className="weather-icon fade-in" src={getWeatherIconFromWeatherText(forecast.Day.IconPhrase)} />
                </div>
              )
            })}
    </div>
  )
}

export default FiveDayForecast;