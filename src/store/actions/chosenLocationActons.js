  
export const updateChosenLocation = (location) => {
    return (dispatch) => {
        dispatch({
            type: 'Set_Chosen_Location',
            current_location: location
        })
    }
}