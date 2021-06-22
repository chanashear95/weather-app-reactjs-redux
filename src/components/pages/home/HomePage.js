import SearchInput from "components/pages/home/search/SearchInput";
import WeatherDisplay from 'components/pages/home/weatherDisplay/WeatherDisplay';

function HomePage() {
    return (
        <div className="page-content-container flex-col">
            <SearchInput />
            <WeatherDisplay />
        </div>
    )
}

export default HomePage;