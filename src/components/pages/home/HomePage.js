import { useState } from 'react';

import SearchInput from "./search/SearchInput";
import WeatherDisplay from './weatherDisplay/WeatherDisplay';

function HomePage(props){

    const [selectedLocationKey, setSelectedLocationKey] = useState('1123655');

    const getSelectedLocationFromSearch = (location_key) => {
        setSelectedLocationKey(location_key);
    }

    return(
        <div className="page-content-container flex-col">
            <SearchInput selectLocation={getSelectedLocationFromSearch}/>
            <WeatherDisplay selectedLocationKey={selectedLocationKey}/>
        </div>
    )
}


export default HomePage;