import { getFavorites, updateLocalFavorites } from "services/favorites.service";

let initialState = getFavorites();

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Add_To_Favorites':
            let updatedState = [...state, action.locationObj];
            updateLocalFavorites(updatedState);
            return updatedState;
        case 'Remove_From_Favorites':
            let newState = [...state];
            let locationIdx = newState.findIndex(i => i.location_key === action.locationKey);
            if (locationIdx !== -1) {
                newState.splice(locationIdx, 1);
                updateLocalFavorites(newState);
                return newState;
            }
        default:
            return state;
    }
}

export default favoritesReducer;
