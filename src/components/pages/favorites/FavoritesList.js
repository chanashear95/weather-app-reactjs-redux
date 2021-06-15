import { useEffect, useState, Fragment } from 'react';
import { local_favorites_key } from 'environments';
import FavoriteCityBox from 'components/pages/favorites/FavoriteCityBox';
import graphics from 'images/no_favorites_graphics.png';
import { Link } from 'react-router-dom';

function FavoritesList() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, [])

    const getFavorites = () => {
        if (window.localStorage.getItem(local_favorites_key)) {
            let favorites = JSON.parse(window.localStorage.getItem(local_favorites_key))
            setFavorites(favorites);
        }
    }

    return (
        <Fragment>
            {favorites.length < 1 ?
                <div className='text-center'>
                    <p> You have not added any cities to your favorites list yet. </p>
                    <img style={{ width: 100 }} src={graphics} />
                    <div className="text-center">
                        <Link to="/">
                            <button className="purple-btn clickable">Back Home</button>
                        </Link>
                    </div>
                </div>
                :
                <div className="favorites-list grid-4-col">
                    {favorites.map(favorite => {
                        return (
                            <FavoriteCityBox getFavorites={getFavorites} favorite={favorite} />
                        )
                    })}
                </div>
            }
        </Fragment>
    )
}

export default FavoritesList;