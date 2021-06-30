let initialState = true;

const metricFormatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Set_Metric':
            return true;
        case 'Set_Fahrenheit':
                return false;
        default:
            return state;
    }
}

export default metricFormatReducer;
