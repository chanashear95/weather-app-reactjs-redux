import { useEffect, useState, Fragment } from 'react';
import { local_favorites_key } from 'environments';
import graphics from 'images/no_favorites_graphics.png';
import FavoriteCityBox from 'components/pages/favorites/FavoriteCityBox';

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
            {favorites.length > 0 ?
                <div className="favorites-list grid-4-col">
                    {favorites.map(favorite => {
                        return (
                            <FavoriteCityBox key={favorite.location_key} getFavorites={getFavorites} favorite={favorite} />
                        )
                    })}
                </div>
                :
                <div className='text-center'>
                    <p> You have not added any cities to your favorites list yet. </p>
                    <img style={{ width: 100 }} src={graphics} />
                </div>
            }
        </Fragment>
    )
}

export default FavoritesList;