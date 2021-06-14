export const chosenLocationActions = {
    setChosenLocation: 'Set_Chosen_Location',
}

let defaultState = {location_key: "215854", name: "Tel Aviv"}

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