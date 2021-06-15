import { useState } from 'react';

import { searchAutoComplete } from '../../../../services/weather.service';
import { setCurrentLocation } from '../../../../redux/redux.service';

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

    const handleSearchChange = async (e) => {
        let searchText = e.target.value;
        let autoCompleteData = await searchAutoComplete(searchText);
        console.log(autoCompleteData)
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
        <div className={locationSuggestions.length > 0 ? "flex-col search-container relative autocomplete-open" : "flex-col search-container relative"}>
            <input className="search-input" placeholder="Search..." onChange={handleSearchChange} />
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