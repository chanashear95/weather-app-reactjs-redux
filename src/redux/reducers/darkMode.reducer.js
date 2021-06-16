export const darkModeActions = {
    setDarkMode: 'Dark_Mode',
    setLightMode:  'Light_Mode',
}

const darkModeReducer = (state = false, action) => {
    switch (action.type) {
        case "Dark_Mode":
            state = true;
            break;
        case 'Light_Mode':
            state = false;
            break;
        default:
            return state;
    }
    return state;
}

export default darkModeReducer;