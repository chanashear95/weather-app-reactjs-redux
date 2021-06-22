export const turnDarkModeOn = () => {
    return (dispatch) => {
        dispatch({
            type: 'Set_Dark_Mode',
        })
    }
}

export const turnDarkModeOff = () => {
    return (dispatch) => {
        dispatch({
            type: 'Set_Light_Mode',
        })
    }
}