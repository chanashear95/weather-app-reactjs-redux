import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { favoritesActions } from 'store/actionsConfig';

import 'components/global/favorite_button/FavoriteButton.css';

function FavoriteButton(props) {

    const dispatch = useDispatch();
    const { addToFavorites, removeFromFavorites } = bindActionCreators(favoritesActions, dispatch);
    const [showAddedToFavoritesMessage, setShowAddedToFavoritesMessage] = useState(false);
    const [showRemovedFromFavoritesMessage, setShowRemovedFromFavoritesMessage] = useState(false);

    const addOrRemoveFromFavorites = () => {
        if (props.isFavorite) {
            removeFromFavorites(props.location.location_key);
            setShowRemovedFromFavoritesMessage(true);
        }
        else {
            addToFavorites({name: props.location.name, location_key: props.location.location_key});
            setShowAddedToFavoritesMessage(true);
        }
    }

    const closeAddedToFavoritesMessage = () => {
        setShowAddedToFavoritesMessage(false);
    }

    const closeRemoveFromFavoritesMessage = () => {
        setShowRemovedFromFavoritesMessage(false);
    }

    return (
        <div style={{ zIndex: 10 }}>
            {
                props.isFavorite ?
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