import { useEffect, useState } from 'react';
import { local_favorites_key } from '../../../environments';

import FavoriteCityBox from './FavoriteCityBox';

function FavoritesList(){

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if(window.localStorage.getItem(local_favorites_key)){
            let favorites = JSON.parse(window.localStorage.getItem(local_favorites_key))
            setFavorites(favorites); 
        }
    }, [])

    return(
        <div>
            {favorites.map(favorite => {
                return(
                    <FavoriteCityBox favorite={favorite}/>
                )
            })}
        </div>
    )
}

export default FavoritesList;