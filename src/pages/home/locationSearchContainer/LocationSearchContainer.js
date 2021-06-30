import SearchInput from "components/global/search/SearchInput";
import AutoCompleteDropDown from "components/global/search/AutoCompleteDropDown";

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import { chosenLocationActions } from 'store/actionsConfig';
import { getSearchAutoCompleteData } from 'services/weather.service';
import { onlyAllowEnglishLetters } from 'functions/textFormatting';

function LocationSearchContainer() {

    const dispatch = useDispatch();
    const { updateChosenLocation } = bindActionCreators(chosenLocationActions, dispatch);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [err, setErr] = useState(null);
    const [cancelTokenSource, setCancelTokenSource] = useState(null);
    const [timer, setTimer] = useState(null);

    const handleLocationSearchChange = (text) => {
        if (timer) {
            clearTimeout(timer);
        }
        if (err) {
            setErr(null);
        }
        let formattedInputValue = onlyAllowEnglishLetters(text);
        setSearchText(formattedInputValue);
    }

    const getAutoCompleteData = useCallback(async () => {
        setIsLoading(true);
        if (cancelTokenSource) {
            cancelTokenSource.cancel(); //Cancelling previous request
            setCancelTokenSource(null);
        }
        let newCancelTokenSource = axios.CancelToken.source();
        let autoCompleteData = await getSearchAutoCompleteData(searchText, newCancelTokenSource);
        if (!autoCompleteData) {
            setLocationSuggestions([]);
            let err = 'No cities found.';
            setErr(err);
            setIsLoading(false);
            return;
        }
        setLocationSuggestions(autoCompleteData);
        setCancelTokenSource(cancelTokenSource);
        setIsLoading(false);
    }, [searchText]);

    useEffect(() => {
        if (searchText && searchText !== " ") {
            let timer = setTimeout(() => {
                getAutoCompleteData();
            }, 300);
            setTimer(timer);
        }
        else {
            setLocationSuggestions([]);
        }
    }, [searchText, getAutoCompleteData]);

    const handleSelectLocation = (obj) => {
        let locationObj = {
            name: obj.city,
            location_key: obj.location_key,
        }
        updateChosenLocation(locationObj);
        setSearchText('');
        setLocationSuggestions([]);
    }

    useEffect(() => {
        return () => {
            clearTimeout(timer);
        }
    })

    return (
        <div className="relative">
            <div className="pb-40">
                <SearchInput searchText={searchText} handleSearchChange={handleLocationSearchChange} />
            </div>
            <AutoCompleteDropDown autoCompleteData={locationSuggestions} isLoading={isLoading} handleSelectItem={handleSelectLocation} err={err} />
        </div>
    )
}

export default LocationSearchContainer;