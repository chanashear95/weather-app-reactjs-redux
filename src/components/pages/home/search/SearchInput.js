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
        console.log(location_key);
    }

    return (
        <div>
            <input placeholder="Search..." onChange={handleSearchChange} />
            {locationSuggestions.length > 0 ?
                <div>
                    {locationSuggestions.map(location => {
                        return (
                            <p onClick={() => handleSelectedLocation(location.key)} key={location.key}>{location.city}, {location.country}</p>
                        )
                    })}
                </div>
                : ""}
        </div>
    )
}

export default SearchInput;