import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getReduxState, setCurrentLocation } from 'redux/redux.service';
import store from 'redux/redux';

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
import 'responsive.css';

import { getConditionsByGeoLocation } from 'services/weather.service';
import Loading from 'components/global/loading/Loading';

function App() {

  const [darkModeOn, setDarkModeOn] = useState(false)
  const [locationSet, setLocationSet] = useState(false);

  useEffect(async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      if (pos.coords) {
        await getLocationByCoordinates(pos.coords)
      }
      else {
        setCurrentLocation({ location_key: "215854", name: "Tel Aviv" });
      }
      setLocationSet(true);
    });
    store.subscribe(() => {
      let reduxState = getReduxState();
      setDarkModeOn(reduxState.darkMode);
    })
  }, [])

  const getLocationByCoordinates = async (coords) => {
    let conditions = await getConditionsByGeoLocation(coords.latitude, coords.longitude);
    if (conditions) {
      let locationObj = {
        name: conditions.EnglishName,
        location_key: conditions.Key,
      }
      setCurrentLocation(locationObj);
    }
  }

  return (
    <div className={darkModeOn ? 'app-darkmode' : ''}>
      {!locationSet ? <div className="full-page-load"> <Loading /> </div> :
        <Router>
          <Navbar />
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/favorites" render={() => <FavoritesPage />} />
        </Router>
      }
    </div>
  );
}

export default App;
