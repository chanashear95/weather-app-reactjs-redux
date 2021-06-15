import { useState, useEffect } from 'react';

import { searchAutoComplete } from '../../../../services/weather.service';
import { setCurrentLocation } from '../../../../redux/redux.service';

import ErrorMsg from '../../../global/error_message/ErrorMsg';

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

    const handleSearchChange = async (e) => {
        let searchText = e.target.value;
        let autoCompleteData = await searchAutoComplete(searchText);
        console.log(autoCompleteData)
        if (autoCompleteData) {
            setLocationSuggestions(autoCompleteData);
        }
        else {
            let err = 'An error occured. Please try again.';
            setErr(err);
        }
    }

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
            <input id="search" onBlur={handleSearchBlur} className="search-input" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 || err ?
                <div className="autocomplete-container w-100">
                    {err ? <div className="text-center"><ErrorMsg err={err}/> </div>: 
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