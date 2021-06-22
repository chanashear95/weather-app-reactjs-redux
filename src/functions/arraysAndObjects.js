export const checkIfArraysAreEqual = (arr1, arr2) => {
    arr1 = sortFavoritesAlphabetically(arr1);
    arr2 = sortFavoritesAlphabetically(arr2);
    let isMatch = Array.isArray(arr1) &&
    Array.isArray(arr2) &&
    arr1.length === arr2.length &&
    arr1.every((val, index) => val === arr2[index]);
    if(isMatch){
        return true;
    }
    else{
        return false;
    }
}

export const sortFavoritesAlphabetically = (favoritesArr) => {
    favoritesArr.sort((a, b)=>{
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
    })
    return favoritesArr;
}