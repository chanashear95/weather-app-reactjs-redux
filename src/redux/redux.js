import { createStore, combineReducers } from 'redux';
import darkModeReducer from './reducers/darkMode.reducer';
import chosenLocationReducer from './reducers/chosenLocation.reducer';


 const allReducers = combineReducers({
    darkMode: darkModeReducer,
    chosenLocation: chosenLocationReducer,
})

//Store

let store = createStore(allReducers)

export default store; 
