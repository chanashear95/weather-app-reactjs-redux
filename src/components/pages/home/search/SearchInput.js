import { useState } from 'react';

import { searchAutoComplete } from '../../../../services/weather.service';
import { setCurrentLocation } from '../../../../redux/redux.service';

function SearchInput() {

    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handleSearchChange = async (e) => {
        let searchText = e.target.value;
        let autoCompleteData = await searchAutoComplete(searchText);
        if (autoCompleteData) {
            setLocationSuggestions(autoCompleteData);
        }
        else {
            //auto search data err
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

    return (
        <div className="flex-col search-container">
            <input className="search-input w-100" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 ?
                <div className="autocomplete-container w-100">
                    {locationSuggestions.map(location => {
                        return (
                            <p className="suggestion-item clickable"
                                onClick={() => handleSelectedLocation(location.key, location.name)}
                                key={location.location_key}>
                                {location.city}, {location.country}
                            </p>
                        )
                    })}
                </div>
                : ""}
        </div>
    )
}

export default SearchInput;