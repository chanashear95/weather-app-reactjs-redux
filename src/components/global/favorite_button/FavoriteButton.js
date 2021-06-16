import { useState } from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { local_favorites_key } from 'environments';

function FavoriteButton(props) {

    const [showAddedToFavoritesMessage, setShowAddedToFavoritesMessage] = useState(false);
    const [showRemovedFromFavoritesMessage, setShowRemovedFromFavoritesMessage] = useState(false);

    const addOrRemoveFromFavorites = () => {
        let favorites;
        if (window.localStorage.getItem(local_favorites_key)) {
            favorites = JSON.parse(window.localStorage.getItem(local_favorites_key));
        }
        else {
            favorites = [];
        }
        if (props.isFavorite) {
            let favIdx = favorites.findIndex(i => i.location_key == props.location.location_key);
            if (favIdx !== -1) {
                favorites.splice(favIdx, 1);
                setShowRemovedFromFavoritesMessage(true);
            }
        }
        else {
            favorites.push({ name: props.location.name, location_key: props.location.location_key });
            setShowAddedToFavoritesMessage(true);
        }
        favorites = JSON.stringify(favorites);
        window.localStorage.setItem(local_favorites_key, favorites);
        props.refreshFavorites(props.location.location_key);
    }

    const closeAddedToFavoritesMessage = () => {
        setShowAddedToFavoritesMessage(false);
    }

    const closeRemoveFromFavoritesMessage = () => {
        setShowRemovedFromFavoritesMessage(false);
    }

    return (
        <div style={{ zIndex: 10 }}>
            {props.isFavorite ?
                <FavoriteIcon onClick={addOrRemoveFromFavorites} className="favorite-btn clickable" />
                :
                <FavoriteBorderIcon className="favorite-btn clickable" onClick={addOrRemoveFromFavorites} />
            }

            <Snackbar open={showAddedToFavoritesMessage} autoHideDuration={6000} onClose={closeAddedToFavoritesMessage}>
                <MuiAlert className="added-favorites-msg" onClose={closeAddedToFavoritesMessage} severity="success">
                    {props.location.name} has been added to favorites!
                </MuiAlert>
            </Snackbar>

            <Snackbar open={showRemovedFromFavoritesMessage} autoHideDuration={6000} onClose={closeRemoveFromFavoritesMessage}>
                <MuiAlert className="removed-favorites-msg" onClose={closeRemoveFromFavoritesMessage} severity="success">
                    {props.location.name} was removed from favorites!
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

export default FavoriteButton;