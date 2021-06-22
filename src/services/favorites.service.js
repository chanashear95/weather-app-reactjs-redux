import { LOCAL_FAVORITES_KEY } from 'environments';

export const getFavorites = () => {
    if(window.localStorage.getItem(LOCAL_FAVORITES_KEY)){
        return JSON.parse(window.localStorage.getItem(LOCAL_FAVORITES_KEY));
    }
    else{
        return [];
    }
}

export const addToFavorites = (name, location_key) => {
    let favorites = getFavorites();
    favorites.push({
        name: name,
        location_key: location_key
    })
    window.localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favorites));
}


export const removeFromFavorites = (location_key) => {
    let favorites = getFavorites();
    let idx = favorites.findIndex(i => i.location_key === location_key);
    if(idx !== -1){
        favorites.splice(idx, 1);
        window.localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(favorites));
    }
}