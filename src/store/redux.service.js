import  store  from 'store/redux';
import { darkModeActions } from 'store/reducers/darkMode.reducer';
import { chosenLocationActions } from 'store/reducers/chosenLocation.reducer';
import { favoritesActions } from 'store/reducers/favorites.reducer';


export const getReduxState = () =>{
    return store.getState();
  }

  export const setCurrentLocation = (locationObj) =>{
    store.dispatch({
      type: chosenLocationActions.setChosenLocation,
      current_location: locationObj
    })
  }

  export const setDarkModeRedux = () =>{
    store.dispatch({
      type: darkModeActions.setDarkMode,
    })
  }

  export const setLightModeRedux = () =>{
    store.dispatch({
      type: darkModeActions.setLightMode,
    })
  }

  export const updateFavorites = (favorites) => {
    store.dispatch({
      type: favoritesActions.updateFavorites,
      favorites: favorites
    })
  }
