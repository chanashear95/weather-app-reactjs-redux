import { LOCAL_FAVORITES_KEY } from 'environments';

export const getFavorites = () => {
    if(window.localStorage.getItem(LOCAL_FAVORITES_KEY)){
        return JSON.parse(window.localStorage.getItem(LOCAL_FAVORITES_KEY));
    }
    else{
        return [];
    }
}

export const updateLocalFavorites = (favoritesArr) => {
    window.localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favoritesArr));
}