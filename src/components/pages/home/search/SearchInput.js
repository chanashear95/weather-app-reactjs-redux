import { useState, useEffect } from 'react';

import { searchAutoComplete } from 'services/weather.service';
import { setCurrentLocation } from 'redux/redux.service';

import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

function SearchInput() {

    const [locationSuggestions, setLocationSuggestions] = useState([
        // {
        //     city: "Hong Kong", country: "Hong Kong", key: "1123655",
        // },
        // { city: "Hefei", country: "China", key: "101841" },
        // {
        //     city: "Hong Kong", country: "Hong Kong", key: "1123655",
        // },
        // { city: "Hefei", country: "China", key: "101841" }

    ]);
    const [err, setErr] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearchChange = async (e) => {
        let searchText = e.target.value;
        searchText = searchText.replace(/[^A-Za-z]/ig, '')
        setErr(null);
        setSearchText(searchText);
        if (e.target.value && e.target.value != " ") {
            setLoading(true);
            let autoCompleteData = await searchAutoComplete(searchText);
            if (autoCompleteData) {
                setLocationSuggestions(autoCompleteData);
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
        setLocationSuggestions([]);
        let locationObj = {
            name: location_name,
            location_key: location_key,
        }
        setCurrentLocation(locationObj);
    }

    const handleSearchBlur = () => {
        setErr(null);
        setLocationSuggestions([]);
    }

    return (
        <div className={locationSuggestions.length > 0 || err ? "flex-col search-container relative autocomplete-open" : "flex-col search-container relative"}>
            <input value={searchText} id="search" onBlur={handleSearchBlur} className="search-input" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 || err || loading ?
                <div className="autocomplete-container w-100">
                    {err ? <div className="text-center"><ErrorMsg err={err} /> </div> : loading ? <Loading /> :
                        locationSuggestions.map(location => {
                            return (
                                <p className="suggestion-item clickable"
                                    onClick={() => handleSelectedLocation(location.key, location.name)}
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