export const onlyAllowEnglishLetters = (text) => {
    let formattedText = text.replace(/[^A-Za-z|| ]/ig, '')
    return formattedText;
}