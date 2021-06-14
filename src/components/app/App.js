import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from '../global/navbar/Navbar';
import HomePage from '../pages/home/HomePage';
import FavoritesPage from '../pages/favorites/FavoritesPage';

import './App.css';
import '../../components/pages/home/search/SearchInput.css';
import '../../components/pages/home/weatherDisplay/WeatherDisplay.css';
import '../../components/global/navbar/Navbar.css';
import '../../responsive.css';


function App() {
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
