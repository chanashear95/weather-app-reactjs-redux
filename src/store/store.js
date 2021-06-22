import { createStore, combineReducers, applyMiddleware } from 'redux';
import darkModeReducer from 'store/reducers/darkMode.reducer';
import chosenLocationReducer from 'store/reducers/chosenLocation.reducer';
import favoritesReducer from 'store/reducers/favorites.reducer';
import thunk from 'redux-thunk';

 const allReducers = combineReducers({
    darkMode: darkModeReducer,
    chosenLocation: chosenLocationReducer,
    favorites: favoritesReducer,
})

let store = createStore(allReducers, {}, applyMiddleware(thunk));

export default store; 
