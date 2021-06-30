let initialState = false;

const darkModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "Set_Dark_Mode":
            return true;
        case 'Set_Light_Mode':
            return false;
        default:
            return state;
    }
}

export default darkModeReducer;