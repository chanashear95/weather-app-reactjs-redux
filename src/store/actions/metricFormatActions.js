export const setMetric = () => {
    return (dispatch) => {
        dispatch({
            type: 'Set_Metric',
        })
    }
}

export const setFahrenheit = () => {
    return (dispatch) => {
        dispatch({
            type: 'Set_Fahrenheit'
        })
    }
}