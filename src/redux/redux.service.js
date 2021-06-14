import  store  from './redux';
import { darkModeActions } from './reducers/darkMode.reducer';
import { chosenLocationActions } from './reducers/chosenLocation.reducer';


export const getReduxState = () =>{
    return store.getState();
  }

  export const setCurrentLocation = (locationObj) =>{
    store.dispatch({
      type: chosenLocationActions.setChosenLocation,
      current_location: locationObj
    })
  }

  export const setDarkMode = () =>{
    store.dispatch({
      type: darkModeActions.setDarkMode,
    })
  }

  export const setLightMode = () =>{
    store.dispatch({
      type: darkModeActions.setLightMode,
    })
  }
