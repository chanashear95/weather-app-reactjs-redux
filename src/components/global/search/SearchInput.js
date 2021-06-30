import 'components/global/search/SearchInput.css';

function SearchInput({searchText, handleSearchChange}) {

    const handleInputChange = (e) => {
        let val = e.target.value;
        handleSearchChange(val);
    }

    return (
        <input autoComplete={"off"} value={searchText} id="search" className="search-input" placeholder="Search..." onChange={handleInputChange} />

    )
}

export default SearchInput;