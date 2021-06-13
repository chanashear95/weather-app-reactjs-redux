import SearchInput from "../../global/search/SearchInput";
import ForecastContainer from "./forecast/ForecastContainer";

function HomePage(props){
    return(
        <div>
            <SearchInput />
            <ForecastContainer />
        </div>
    )
}


export default HomePage;