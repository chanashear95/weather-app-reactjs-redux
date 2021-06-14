import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../global/navbar/Navbar';
import HomePage from '../pages/home/HomePage';
import FavoritesPage from '../pages/favorites/FavoritesPage';

import './App.css';
import '../../components/pages/home/search/SearchInput.css';
import '../../components/pages/home/weatherDisplay/WeatherDisplay.css';
import '../../components/global/navbar/Navbar.css';
import '../../responsive.css';
import { useEffect } from 'react';
import { getReduxState } from '../../redux/redux.service';
import store from './../../redux/redux';


function App() {

  useEffect(() => {
    store.subscribe(()=>{
          let state = getReduxState();
            console.log(state);
    })
    // let state = store.getState();
    // console.log(state);
    // let store = subscribeToStore();
    // console.log(store)
  }, [])

  return (
    <div>
      <Router>
            <Navbar />
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/favorites" render={() => <FavoritesPage />} />
      </Router>
    </div>
  );
}

export default App;
