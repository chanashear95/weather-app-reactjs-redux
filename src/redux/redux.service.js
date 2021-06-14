import  store  from './redux';
import { darkModeActions } from './reducers/darkMode.reducer';
import { chosenLocationActions } from './reducers/chosenLocation.reducer';


export const getReduxState = () =>{
    return store.getState();
  }

  export const setCurrentLocation = (location) =>{
    store.dispatch({
      type: chosenLocationActions.setChosenLocation(),
      location: location
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
