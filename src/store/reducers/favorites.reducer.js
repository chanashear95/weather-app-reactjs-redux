import { getFavorites } from "services/favorites.service";

let defaultState = getFavorites();

const favoritesReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'Update_Favorites':
            state = action.favorites;
            break;
        default:
            return state;
    }
    return state;
}

export default favoritesReducer;
