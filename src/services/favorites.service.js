import { local_favorites_key } from 'environments';

export const getFavorites = () => {
    if(window.localStorage.getItem(local_favorites_key)){
        return JSON.parse(window.localStorage.getItem(local_favorites_key));
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
    window.localStorage.setItem(local_favorites_key, JSON.stringify(favorites));
}


export const removeFromFavorites = (location_key) => {
    let favorites = getFavorites();
    let idx = favorites.findIndex(i => i.location_key === location_key);
    if(idx !== -1){
        favorites.splice(idx, 1);
        window.localStorage.setItem(local_favorites_key, JSON.stringify(favorites));
    }
}