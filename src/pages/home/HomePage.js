import HomeWeatherContainer from "pages/home/homeWeatherContainer/HomeWeatherContainer";
import LocationSearchContainer from "pages/home/locationSearchContainer/LocationSearchContainer";

function HomePage() {
    return (
        <div className="page-content-container flex-col">
            <LocationSearchContainer />
            <HomeWeatherContainer />
        </div>
    )
}

export default HomePage;