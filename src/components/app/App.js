import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { chosenLocationActions } from 'store/actionsConfig';
import { getConditionsByGeoLocation } from 'services/weather.service';
import { DEFAULT_LOCATION_KEY } from 'environments';

import Loading from 'components/global/loading/Loading';
import Navbar from 'components/global/navbar/Navbar';
import HomePage from 'pages/home/HomePage';
import FavoritesPage from 'pages/favorites/FavoritesPage';

import 'components/app/app.css';
import 'responsive.css';

function App() {

  const darkMode = useSelector(state => state.darkMode);
  const dispatch = useDispatch();
  const { updateChosenLocation } = bindActionCreators(chosenLocationActions, dispatch);
  const [isLocationSet, setIsLocationSet] = useState(false);

  useEffect(() => {

    const getLocationDataByCoordinates = async (coords) => {
      let locationData = await getConditionsByGeoLocation(coords.latitude, coords.longitude);
      if (locationData) {
        let locationObj = {
          name: locationData.EnglishName,
          location_key: locationData.Key,
        }
        updateChosenLocation(locationObj);
        setIsLocationSet(true);
      }
      else {
        initDefaultLocation();
      }
    }

    const initDefaultLocation = () => {
      updateChosenLocation(DEFAULT_LOCATION_KEY); 
      setIsLocationSet(true);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => getLocationDataByCoordinates(pos.coords), initDefaultLocation);
    }
    else {
      initDefaultLocation();
    }

  }, []);

  return (
    <div className={darkMode ? 'app-darkmode' : ''}>
      {!isLocationSet ? <div className="full-page-load"> <Loading /> </div> :
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
