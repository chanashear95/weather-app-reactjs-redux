import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chosenLocationActionsCreator } from 'store/actionsConfig';
import { searchAutoComplete } from 'services/weather.service';
import { onlyAllowEnglishLetters } from 'functions/textFormatting';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

import 'components/pages/home/search/SearchInput.css';

function SearchInput() {

    const dispatch = useDispatch();
    const { updateChosenLocation } = bindActionCreators(chosenLocationActionsCreator, dispatch);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [err, setErr] = useState(null);

    const handleSearchChange = async (e) => {
        if (err) {
            setErr(null);
        }
        let searchText = e.target.value;
        searchText = onlyAllowEnglishLetters(searchText);
        setSearchText(searchText);
        if (searchText && searchText !== " ") {
            setLoading(true);
            let autoCompleteData = await searchAutoComplete(searchText);
            if (autoCompleteData) {
                if (autoCompleteData !== 'max limit') {
                    setLocationSuggestions(autoCompleteData);
                }
                else {
                    let err = 'API has reached its daily limit.';
                    setErr(err);
                }
            }
            else {
                setLoading(false);
                let err = 'An error occured. Please try again.';
                setErr(err);
            }
        }
    }

    useEffect(() => {
        if (locationSuggestions || err) {
            setLoading(false);
        }
    }, [locationSuggestions, err]);

    const handleSelectedLocation = (location_key, location_name) => {
        let locationObj = {
            name: location_name,
            location_key: location_key,
        }
        updateChosenLocation(locationObj);
        setSearchText('');
        setLocationSuggestions([]);
    }

    const handleCloseDropDown = () => {
        setErr(null);
        setLocationSuggestions([]);
    }

    return (
        <div className={`flex-col search-container relative ${locationSuggestions.length > 0 || err ? 'autocomplete-open' : ''}`}>
            <input onClick={handleCloseDropDown} autoComplete={"off"} value={searchText} id="search" className="search-input" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 || err || loading ?
                <div className="autocomplete-container">
                    {
                        err ?
                            <div className="text-center"><ErrorMsg err={err} /> </div> :
                            loading ?
                                <Loading /> :
                                locationSuggestions.map(location => {
                                    return (
                                        <p className="suggestion-item clickable"
                                            onClick={() => handleSelectedLocation(location.location_key, location.city)}
                                            key={location.location_key}>
                                            {location.city}, {location.country}
                                        </p>
                                    )
                                })
                    }
                </div>
                : ""}
        </div>
    )
}

export default SearchInput;