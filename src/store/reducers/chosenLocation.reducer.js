let defaultState = {location_key: "", name: ""}

const chosenLocationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'Set_Chosen_Location':
            let updatedState = {...state};
            updatedState = action.current_location;
            return updatedState;
        default:
            return state;
    }
}

export default chosenLocationReducer;