import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { darkModeActionsCreator } from 'store/actionsConfig';
import Switch from '@material-ui/core/Switch';
import 'components/global/navbar/DarkModeToggle.css';

function DarkModeToggle() {

    const darkMode = useSelector(state => state.darkMode);
    const dispatch = useDispatch();
    const { turnDarkModeOn, turnDarkModeOff } = bindActionCreators(darkModeActionsCreator, dispatch);

    const handleDarkModeToggle = () => {
        if(darkMode){
            turnDarkModeOff();
        }
        else {
            turnDarkModeOn();
        }
    }

    return (
        <div className="darkmode-toggle-container">
            <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
                color="default"
                className={darkMode ? 'toggle active' : 'toggle'}
            />
            <p className="dark-mode-text">Dark Mode</p>
        </div>
    )
}

export default DarkModeToggle;