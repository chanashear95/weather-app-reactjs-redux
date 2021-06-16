import  store  from 'redux/redux';
import { darkModeActions } from 'redux/reducers/darkMode.reducer';
import { chosenLocationActions } from 'redux/reducers/chosenLocation.reducer';


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
