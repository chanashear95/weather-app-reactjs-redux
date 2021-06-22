import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { chosenLocationActionsCreator } from 'store/actionsConfig';
import { getConditionsByGeoLocation } from 'services/weather.service';

import Loading from 'components/global/loading/Loading';
import Navbar from 'components/global/navbar/Navbar';
import HomePage from 'components/pages/home/HomePage';
import FavoritesPage from 'components/pages/favorites/FavoritesPage';

import 'components/app/App.css';
import 'responsive.css';

function App() {

  const darkMode = useSelector(state => state.darkMode);
  const [isLocationSet, setIsLocationSet] = useState(false);
  const dispatch = useDispatch();
  const { updateChosenLocation } = bindActionCreators(chosenLocationActionsCreator, dispatch);
  const [mount, setMount] = useState(false);

  const updateLocation = useCallback((locationObj) => {
    updateChosenLocation(locationObj);
  }, [updateChosenLocation]);

  useEffect(() => {
    const getLocationByCoordinates = async (coords) => {
      let locationData = await getConditionsByGeoLocation(coords.latitude, coords.longitude);
      if (locationData) {
        let locationObj = {
          name: locationData.EnglishName,
          location_key: locationData.Key,
        }
        if (!mount) {
          setMount(true);
          updateLocation(locationObj);
        }

        setIsLocationSet(true);
      }
      else {
        initDefaultLocation();
      }
    }

    const initDefaultLocation = () => {
      updateLocation({ location_key: "215854", name: "Tel Aviv" });
      setIsLocationSet(true);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => getLocationByCoordinates(pos.coords), initDefaultLocation);
    }
    else {
      initDefaultLocation();
    }
  }, [mount, updateLocation]);



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
