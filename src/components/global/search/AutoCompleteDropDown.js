import ErrorMsg from 'components/global/error_message/ErrorMsg';
import Loading from 'components/global/loading/Loading';

function AutoCompleteDropDown({ autoCompleteData, isLoading, handleSelectItem, err }) {

    return (
        <div>
            {autoCompleteData.length > 0 || err || isLoading ?
                <div className="autocomplete-container">
                    {
                        err ?
                            <div className="text-center"><ErrorMsg err={err} /> </div> :
                            isLoading ?
                                <Loading /> :
                                autoCompleteData.map(obj => {
                                    return (
                                        <p className="suggestion-item clickable"
                                            onClick={() => handleSelectItem(obj)}
                                            key={obj.id}>
                                            {obj.displayedText}
                                        </p>
                                    )
                                })
                    }
                </div>
                : ""}
        </div>
    )
}

export default AutoCompleteDropDown;