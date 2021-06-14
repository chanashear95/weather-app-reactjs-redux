export const chosenLocationActions = {
    setChosenLocation: 'Set_Chosen_Location',
}

const chosenLocationReducer = (state = {}, action) => {
    let tempState = {...state};
    switch (action.type) {
        case 'Set_Chosen_Location':
            tempState = action.location;
            break;
        default:
            return state;
    }
    return tempState;
}

export default chosenLocationReducer;