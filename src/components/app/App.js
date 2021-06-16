import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getConditionsByGeoLocation } from 'services/weather.service';
import { getReduxState, setCurrentLocation } from 'redux/redux.service';
import store from 'redux/redux';

import Loading from 'components/global/loading/Loading';
import Navbar from 'components/global/navbar/Navbar';
import HomePage from 'components/pages/home/HomePage';
import FavoritesPage from 'components/pages/favorites/FavoritesPage';

import 'components/app/App.css';
import 'components/global/navbar/Navbar.css';
import 'components/global/navbar/DarkModeToggle.css';
import 'components/pages/home/search/SearchInput.css';
import 'components/pages/home/weatherDisplay/WeatherDisplay.css';
import 'components/pages/favorites/Favorites.css';
import 'components/global/favorite_button/FavoriteButton.css';
import 'components/global/loading/Loading.css';
import 'responsive.css';

function App() {

  const [darkModeOn, setDarkModeOn] = useState(false)
  const [isLocationSet, setIsLocationSet] = useState(false);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      if (pos.coords) {
        await getLocationByCoordinates(pos.coords);
      }
      else {
        initDefaultLocation();
      }
    })
    store.subscribe(() => {
      let reduxState = getReduxState();
      setDarkModeOn(reduxState.darkMode);
    })
  })

  const getLocationByCoordinates = async (coords) => {
    let locationData = await getConditionsByGeoLocation(coords.latitude, coords.longitude);
    if (locationData) {
      let locationObj = {
        name: locationData.EnglishName,
        location_key: locationData.Key,
      }
      setCurrentLocation(locationObj);
      setIsLocationSet(true);
    }
    else {
      initDefaultLocation();
    }
  }

  const initDefaultLocation = () => {
    setCurrentLocation({ location_key: "215854", name: "Tel Aviv" });
    setIsLocationSet(true);
  }

  const refreshComponents = () => {
    setTime(Date.now());
  }

  return (
    <div className={darkModeOn ? 'app-darkmode' : ''}>
      {!isLocationSet ? <div className="full-page-load"> <Loading /> </div> :
        <Router>
          <Navbar key={'nav' + time} refresh={refreshComponents} />
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/favorites" render={() => <FavoritesPage />} />
        </Router>
      }
    </div>
  );
}

export default App;
