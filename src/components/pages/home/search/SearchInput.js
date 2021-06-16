import { useState, useEffect } from 'react';

import { searchAutoComplete } from 'services/weather.service';
import { setCurrentLocation } from 'redux/redux.service';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

function SearchInput() {

    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [err, setErr] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearchChange = async (e) => {
        if (err) {
            setErr(null);
        }
        let searchText = e.target.value;
        searchText = searchText.replace(/[^A-Za-z|| ]/ig, '')
        setSearchText(searchText);
        if (e.target.value && e.target.value != " ") {
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
        setLoading(false);
    }, [locationSuggestions]);

    const handleSelectedLocation = (location_key, location_name) => {
        let locationObj = {
            name: location_name,
            location_key: location_key,
        }
        setCurrentLocation(locationObj);
        setSearchText('');
        setLocationSuggestions([]);
    }

    const handleCloseDropDown = (e) => {
        setErr(null);
        setLocationSuggestions([]);
    }

    return (
        <div className={`flex-col search-container relative ${locationSuggestions.length > 0 || err ? 'autocomplete-open' : ''}`}>
            <input onClick={handleCloseDropDown} autoComplete={"off"} value={searchText} id="search" className="search-input" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 || err || loading ?
                <div className="autocomplete-container w-100">
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