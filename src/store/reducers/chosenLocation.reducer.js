let defaultState = {location_key: "", name: ""}

const chosenLocationReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'Set_Chosen_Location':
            state = action.current_location
            break;
        default:
            return state;
    }
    return state;
}

export default chosenLocationReducer;