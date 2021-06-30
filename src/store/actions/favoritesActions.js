export const addToFavorites = (locationObj) => {
    return (dispatch) => {
        dispatch({
            type: 'Add_To_Favorites',
            locationObj: locationObj
        })
    }
}

export const removeFromFavorites = (locationKey) => {
    return (dispatch) => {
        dispatch({
            type: 'Remove_From_Favorites',
            locationKey: locationKey,
        })
    }
}