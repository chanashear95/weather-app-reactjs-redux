import SearchInput from "./search/SearchInput";
import WeatherDisplay from './weatherDisplay/WeatherDisplay';

function HomePage(){

    return(
        <div className="page-content-container flex-col">
            <SearchInput />
            <WeatherDisplay />
        </div>
    )
}

export default HomePage;