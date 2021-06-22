import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import 'components/global/navbar/Navbar.css';
import DarkModeToggle from 'components/global/navbar/DarkModeToggle';

const navLinks = [
    {
        id: '1',
        title: 'Home',
        icon: <HomeIcon />,
        inner_url: '/',
    },
    {
        id: '2',
        title: 'Favorites',
        icon: <FavoriteIcon />,
        inner_url: '/favorites'
    }
];

function Navbar() {

    return (
        <nav className="flex-between padding-h-20 navbar">
            <div className=" padding-h-20">
                <Link to="/">Weather Forecast</Link>
            </div>

            <div className="flex-row-c">
                {navLinks.map(link => {
                    return (
                        <div key={link.id} className="padding-h-20 nav-item">
                            <Link to={link.inner_url}>
                                {window.innerWidth < 500 ? link.icon : link.title}
                            </Link>
                        </div>
                    )
                })}
                <DarkModeToggle />
            </div>
        </nav>
    )
}

export default Navbar;