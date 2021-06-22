import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import graphics from 'images/no_favorites_graphics.png';
import FavoriteCityBox from 'components/pages/favorites/FavoriteCityBox';

function FavoritesList() {

    const favorites = useSelector(state => state.favorites);

    return (
        <Fragment>
            {
                favorites.length > 0 ?
                    <div className="favorites-list grid-4-col">
                        {favorites.map(favorite => {
                            return (
                                <FavoriteCityBox key={favorite.location_key} favorite={favorite} />
                            )
                        })}
                    </div>
                    :
                    <div className='text-center'>
                        <p> You have not added any cities to your favorites list yet. </p>
                        <img alt="Weather Icon" style={{ width: 100 }} src={graphics} />
                    </div>
            }
        </Fragment>
    )
}

export default FavoritesList;