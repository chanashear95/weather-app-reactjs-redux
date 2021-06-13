import { Link } from 'react-router-dom';


function Navbar(props) {
    return (
        <nav className="flex-between padding-h-20">
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
        </nav>
    )
}


export default Navbar;