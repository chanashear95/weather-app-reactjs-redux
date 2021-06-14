import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../global/navbar/Navbar';
import HomePage from '../pages/home/HomePage';
import FavoritesPage from '../pages/favorites/FavoritesPage';

import './App.css';
import '../../components/pages/home/search/SearchInput.css';
import '../../components/pages/home/weatherDisplay/WeatherDisplay.css';
import '../../components/global/navbar/Navbar.css';
import '../../components/global/navbar/DarkModeToggle.css';
import '../../responsive.css';
import { useEffect, useState } from 'react';
import { getReduxState } from '../../redux/redux.service';
import store from './../../redux/redux';


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
