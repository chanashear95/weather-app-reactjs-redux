import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getReduxState } from 'redux/redux.service';
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

function App() {

  const [darkModeOn, setDarkModeOn] = useState(false)

  useEffect(() => {
    store.subscribe(()=>{
          let reduxState = getReduxState();
          setDarkModeOn(reduxState.darkMode);
    })
  }, [])

  return (
    <div className={darkModeOn ? 'app-darkmode' : ''}>
      <Router>
            <Navbar />
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/favorites" render={() => <FavoritesPage />} />
      </Router>
    </div>
  );
}

export default App;
