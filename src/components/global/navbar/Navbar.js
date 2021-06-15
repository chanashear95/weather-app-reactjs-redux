import { Link } from 'react-router-dom';
import DarkModeToggle from 'components/global/navbar/DarkModeToggle';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

function Navbar() {
    return (
        <nav className="flex-between padding-h-20 navbar">
            <div className=" padding-h-20">
                <Link to="/">

                    Weather Forecast</Link>
            </div>

            <div className="flex-row-c">
                <div className="padding-h-20 nav-item">
                    <Link to="/">
                        {window.innerWidth < 500 ? <HomeIcon  /> :
                            "Home"
                        }
                    </Link>
                </div>

                <div className="padding-h-20 nav-item">
                    <Link to="/favorites">
                        {window.innerWidth < 500 ? <FavoriteIcon /> :
                            "Favorites"}
                    </Link>
                </div>
                <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar;