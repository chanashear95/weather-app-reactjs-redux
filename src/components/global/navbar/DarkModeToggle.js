import { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';

import { getReduxState, setDarkModeRedux, setLightModeRedux } from 'redux/redux.service';

function DarkModeToggle() {

    const [darkModeOn, setDarkModeOn] = useState(false);

    useEffect(() => {
        let darkModeOn = getReduxState().darkMode;
        setDarkModeOn(darkModeOn);
    }, [])

    const handleDarkModeToggle = () => {
        setDarkModeOn(prevDarkMode => !prevDarkMode);
    }

    useEffect(() => {
        if (darkModeOn) {
            setDarkModeRedux();
        }
        else {
            setLightModeRedux();
        }
    }, [darkModeOn])

    return (
        <div className="darkmode-toggle-container">
            <Switch
                checked={darkModeOn}
                onChange={handleDarkModeToggle}
                color="default"
                className={darkModeOn ? 'toggle active' : 'toggle'}
            />
            <p className="dark-mode-text">Dark Mode</p>
        </div>
    )
}

export default DarkModeToggle;