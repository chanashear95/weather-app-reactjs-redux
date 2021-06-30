import { convertFahrenheitToCelcius, getWeatherIconFromWeatherText } from 'functions/temperature';
import 'components/fiveDayForecast/five-day-forecast.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function FiveDayForecast({ forecast }) {

  const isMetricTemperature = useSelector(state => state.metricFormat);

  useEffect(() => {
    if (forecast) {
      let forecastContainer = document.getElementsByClassName('five-day-forecast-container')[0];
      if (forecastContainer) {
        forecastContainer.style.transform = 'translateY(0px)';
      }
    }
  }, [forecast]);


  return (
    <div className="five-day-forecast-container">
      <div className="flex-between">
        {
          forecast.DailyForecasts.map((forecast, idx) => {
            return (
              <div key={'daily-forecast' + idx} className="daily-forecast">
                <p>{new Date(forecast.Date).toString().slice(0, 3)}</p>
                <p> <strong>High </strong>{isMetricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Maximum.Value) : forecast.Temperature.Maximum.Value}°</p>
              <p> <strong>Low </strong>{isMetricTemperature ? convertFahrenheitToCelcius(forecast.Temperature.Minimum.Value) : forecast.Temperature.Minimum.Value}°</p>
                <p>{forecast.Day.IconPhrase}</p>
                <img alt={forecast.Day.IconPhrase} className="weather-icon fade-in" src={getWeatherIconFromWeatherText(forecast.Day.IconPhrase)} />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default FiveDayForecast;