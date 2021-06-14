import { Link } from 'react-router-dom';
import { setDarkMode } from '../../../redux/redux.service';


function Navbar(props) {

   const settDarkMode = () => {
        setDarkMode();
    }
    return (
        <nav className="flex-between padding-h-20 navbar">
            <div>
                <p>Weather Forecast</p>
            </div>

            <div>
                <div className="d-inline-block padding-h-20">
                    <Link to="/">Home</Link>
                </div>

                <div className="d-inline-block padding-h-20">
                    <Link to="/favorites">Favorites</Link>
                </div>
            </div>
            <p onClick={settDarkMode} className="clickable">Dark Mode</p>
        </nav>
    )
}


export default Navbar;