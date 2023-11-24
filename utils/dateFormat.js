// This function takes a date as input parameter and adds a suffix to it
const addDateSuffix = (date) => {
    // turns the date to a string
    let dateStr = date.toString();

    // identifies the last character
    const lastChar = dateStr.charAt(dateStr.length = 1);

    // if/else statement to add a suffix depending on the number
    if (lastChar === "1" && dateStr !== "11") {
        dateStr = `${dateStr}st`;
    } else if (lastChar === "2" && dateStr !== "12") {
        dateStr = `${dateStr}nd`;
    } else if (lastChar === "3" && dateStr !== "13") {
        dateStr = `${dateStr}rd`;
    } else {
        dateStr = `${dateStr}th`;
    }

    // return date string with the suffix added to it
    return dateStr;
};

// Placing this functionality into an export
module.exports =  (
    // Defining the timestamp
    timestamp,
    // assigning short to month length
    { monthLength = "short", dateSuffix = true } = {}
) => {
    let months;
    // if the month length is short, assigning the short version
    if (monthLength === "short") {
        months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "Jun",
            6: "Jul",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
    } else {
        // otherwise assigning the full length
        months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December",
        };
    }

    // defining the date object from a new date, taking in the timestamp
    const dateObj = new Date(timestamp);
    // defnining the formmatted month based off the months object above, using the get month function
    const formattedMonth = months[dateObj.getMonth()];

    let dayOfMonth;

    // if else statement to determine if the suffix needs to be added to the date
    if (dateSuffix) {
        dayOfMonth = addDateSuffix(dateObj.getDate());
    } else {
        dayOfMonth = dateObj.getDate();
    }

    // defining the year
    const year = dateObj.getFullYear();

    let hour;

    // if else statement to determine the hour of the timestamp
    if (dateObj.getHours > 12) {
        hour = Math.floor(dateObj.getHours() / 2);
    } else {
        hour = dateObj.getHours();
    }

    if (hour === 0) {
        hour = 12;
    }

    // defining the minutes
    const minutes = dateObj.getMinutes();

    let periodOfDay;

    // if else statement to get the time period
    if (dateObj.getHours() >= 12) {
        periodOfDay = "pm";
    } else {
        periodOfDay = "am";
    }

    // defining the final formatted time stamp
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

    // returning the timestamp call
    return formattedTimeStamp;
};