import { useEffect, useState } from 'react';
import { local_favorites_key } from '../../../environments';
import FavoriteCityBox from './FavoriteCityBox';
import graphics from '../../../images/no_favorites_graphics.png';
import { Link } from 'react-router-dom';

function FavoritesList() {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (window.localStorage.getItem(local_favorites_key)) {
            let favorites = JSON.parse(window.localStorage.getItem(local_favorites_key))
            setFavorites(favorites);
        }
    }, [])

    return (
        <div className="favorites-list">
            {favorites.length < 1 ?
                <div className='text-center'>
                    <p> You have not added any cities to your favorites list yet. </p>
                    <img style={{ width: 100 }} src={graphics} />
                    <div className="text-center">
                        <Link to="/">
                            <button>Back Home</button>
                        </Link>
                    </div>
                </div>
                :
                favorites.map(favorite => {
                    return (
                        <FavoriteCityBox favorite={favorite} />
                    )
                })}
        </div>
    )
}

export default FavoritesList;