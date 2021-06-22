export const updateFavorites = (favorites) => {
    return (dispatch) => {
        dispatch({
            type: 'Update_Favorites',
            favorites: favorites
        })
    }
}