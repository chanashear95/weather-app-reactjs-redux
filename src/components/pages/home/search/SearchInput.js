import { useState } from 'react';
import { searchAutoComplete } from '../../../../services/weather.service';


function SearchInput(props) {

    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handleSearchChange = async (e) => {
        let searchText = e.target.value;
        let autoCompleteData = await searchAutoComplete(searchText);
        if (autoCompleteData) {
            setLocationSuggestions(autoCompleteData);
        }
        else{
            //auto search data err
        }
    }

    const handleSelectedLocation = (location_key) => {
        setLocationSuggestions([]);
        props.selectLocation(location_key);
    }

    return (
        <div className="flex-col search-container">
            <input className="search-input w-100" placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 ?
                <div className="autocomplete-container w-100">
                    {locationSuggestions.map(location => {
                        return (
                            <p className="suggestion-item clickable" onClick={() => handleSelectedLocation(location.key)} key={location.key}>{location.city}, {location.country}</p>
                        )
                    })}
                </div>
                : ""}
        </div>
    )
}

export default SearchInput;