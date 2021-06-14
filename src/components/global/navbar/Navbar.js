import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';


function Navbar(props) {

    return (
        <nav className="flex-between padding-h-20 navbar">
            <div>
                <p>Weather Forecast</p>
            </div>

            <div className="flex-row-c">
                <div className=" padding-h-20">
                    <Link to="/">Home</Link>
                </div>

                <div className="padding-h-20">
                    <Link to="/favorites">Favorites</Link>
                </div>
                    <DarkModeToggle />
            </div>
        </nav>
    )
}


export default Navbar;