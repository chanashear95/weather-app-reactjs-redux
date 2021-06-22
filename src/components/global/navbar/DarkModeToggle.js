import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from '@material-ui/core/Switch';
import { darkModeActions } from 'store/actionsConfig';
import 'components/global/navbar/DarkModeToggle.css';

function DarkModeToggle() {

    const isDarkModeOn = useSelector(state => state.darkMode);
    const dispatch = useDispatch();
    const { turnDarkModeOn, turnDarkModeOff } = bindActionCreators(darkModeActions, dispatch);

    const handleDarkModeToggle = () => {
        if (isDarkModeOn) {
            turnDarkModeOff();
        }
        else {
            turnDarkModeOn();
        }
    }

    return (
        <div className="darkmode-toggle-container">
            <Switch
                checked={isDarkModeOn}
                onChange={handleDarkModeToggle}
                color="default"
                className={isDarkModeOn ? 'toggle active' : 'toggle'}
            />
            <p className="dark-mode-text">Dark Mode</p>
        </div>
    )
}

export default DarkModeToggle;