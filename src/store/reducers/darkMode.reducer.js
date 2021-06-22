export const darkModeActions = {
    setDarkMode: 'Set_Dark_Mode',
    setLightMode:  'Set_Light_Mode',
}

const darkModeReducer = (state = false, action) => {
    switch (action.type) {
        case "Set_Dark_Mode":
            state = true;
            break;
        case 'Set_Light_Mode':
            state = false;
            break;
        default:
            return state;
    }
    return state;
}

export default darkModeReducer;