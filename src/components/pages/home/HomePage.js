import { useState } from 'react';

import SearchInput from "./search/SearchInput";
import WeatherDisplay from './weatherDisplay/WeatherDisplay';

function HomePage(props){

    const [selectedLocationKey, setSelectedLocationKey] = useState('1123655');

    return(
        <div>
            <SearchInput />
            <WeatherDisplay selectedLocationKey={selectedLocationKey}/>
        </div>
    )
}


export default HomePage;