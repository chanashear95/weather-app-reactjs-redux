import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { chosenLocationActions } from 'store/actionsConfig';
import { getSearchAutoCompleteData } from 'services/weather.service';
import { onlyAllowEnglishLetters } from 'functions/textFormatting';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

import 'components/pages/home/search/SearchInput.css';

function SearchInput() {

    const dispatch = useDispatch();
    const { updateChosenLocation } = bindActionCreators(chosenLocationActions, dispatch);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [err, setErr] = useState(null);

    const handleSearchChange = async (e) => {
        if (err) {
            setErr(null);
        }
        let inputValue = e.target.value;
        let formattedInputValue = onlyAllowEnglishLetters(inputValue);
        setSearchText(formattedInputValue);
        if (formattedInputValue && formattedInputValue !== " ") {
            setIsLoading(true);
            let autoCompleteData = await getSearchAutoCompleteData(formattedInputValue);
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
                setIsLoading(false);
                let err = 'An error occured. Please try again.';
                setErr(err);
            }
            setIsLoading(false);
        }
    }

    const handleSelectLocation = (location_key, location_name) => {
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
            {locationSuggestions.length > 0 || err || isLoading ?
                <div className="autocomplete-container">
                    {
                        err ?
                            <div className="text-center"><ErrorMsg err={err} /> </div> :
                            isLoading ?
                                <Loading /> :
                                locationSuggestions.map(location => {
                                    return (
                                        <p className="suggestion-item clickable"
                                            onClick={() => handleSelectLocation(location.location_key, location.city)}
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