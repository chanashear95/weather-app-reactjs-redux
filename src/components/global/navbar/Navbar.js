import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

function Navbar() {
    return (
        <nav className="flex-between padding-h-20 navbar">
             <div className=" padding-h-20">
                    <Link to="/">Weather Forcast</Link>
                </div>

            <div className="flex-row-c">
                <div className="padding-h-20 nav-item">
                    <Link to="/">Home</Link>
                </div>

                <div className="padding-h-20 nav-item">
                    <Link to="/favorites">Favorites</Link>
                </div>
                    <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar;