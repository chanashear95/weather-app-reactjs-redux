import { createStore, combineReducers } from 'redux';
import darkModeReducer from 'redux/reducers/darkMode.reducer';
import chosenLocationReducer from 'redux/reducers/chosenLocation.reducer';


 const allReducers = combineReducers({
    darkMode: darkModeReducer,
    chosenLocation: chosenLocationReducer,
})

//Store

let store = createStore(allReducers)

export default store; 
