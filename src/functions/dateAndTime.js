export const convertMilitaryTimeTo12Hour = (militaryTime) => { //Takes time as a string e.g- "17:30"
    let hour = Number(militaryTime.slice(0, 2));
    if (hour > 12) {
        hour = hour - 12;
    }
    let hourString = hour > 9 ? hour.toString() : "0" + hour;
    let formattedTime = `${hourString}:${militaryTime.slice(-2)}`;
    return formattedTime;
}

export const getWeatherIconByTime = (time) => { //Takes time as a string e.g- "17:30"
    let hour = Number(time.slice(0, 2));
    if (hour >= 5 && hour < 12) {
        return 'morning';
    }
    else if (hour >= 12 && hour < 20) {
        return 'afternoon';
    }
    else {
        return 'night';
    }
}