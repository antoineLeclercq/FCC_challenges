/*Convert a date range consisting of two dates formatted as YYYY-MM-DD into a more readable format.

The friendly display should use month names instead of numbers and ordinal dates instead of cardinal (1st instead of 1).

Do not display information that is redundant or that can be inferred by the user: if the date range ends in less than a 
year from when it begins, do not display the ending year. If the range ends in the same month that it begins, do not display
the ending year or month.

Additionally, if the date range begins in the current year and ends within one year, the year should not be displayed at the
beginning of the friendly range.*/

// global variable storing all months in array
var monthsSpec = ["January", "February", "March", "April", "May", "June", "July", "August", 
                  "September", "October", "November", "December"];

// global varaible storing edge cases for friendly string day of month
var daysSpec = {
    "01": "1st",
    "02": "2nd",
    "03": "3rd",
    "21": "21st",
    "22": "22nd",
    "23": "23rd"
};

// given date1 and date2 as dates in milliseconds, returns the difference between the two in days
function dateDiffDays (date1, date2) {

    var diffDays = (date2 - date1) / 1000 / 60 / 60 / 24;

    return diffDays;
}

// given a date in milliseconds, returns the details of the date in an object
function getDateDetails(date) {

    var details = {};
    var date_f = new Date(date);

    // store UTC year, month and day in `details`
    details.year = date_f.getUTCFullYear();
    details.month = monthsSpec[date_f.getUTCMonth()];
    details.day = date_f.toUTCString().slice(5,7);

    // if day is not an edge case delete 0 of day if any and add friendly `th`
    if (daysSpec[details.day] === undefined) {

        if (details.day[0] === '0') {
            details.day = details.day[1] + 'th';
        } 
        else {
            details.day = details.day + 'th';
        }
    }
    else {
        // refers to daysSpec for friendly day edge cases
        details.day = daysSpec[details.day];
    }

    return details;
}

function friendly(arr) {
    
    // declare date1 and date 2 as milliseconds date and get their details
    var date1 = Date.parse(arr[0]),
    date1Details = getDateDetails(date1),
    date2 = Date.parse(arr[1]),
    date2Details = getDateDetails(date2),
    currentDate = new Date(),
    arrDates = [];
    
    // prepare the firendly first date
    arrDates.push(date1Details.month + ' ' + date1Details.day);
    
    // if dates are identical, return full friendly first date
    if (arr[0] === arr[1]) {
      
        arrDates[0] += ', ' + date1Details.year;
        return arrDates;
    }
    
    // if diff between date1 and date2 is over a year, return 2 full firendly dates
    if (dateDiffDays(date1, date2) >= 365) {

        arrDates[0] += ', ' + date1Details.year;
        arrDates.push(date2Details.month + ' ' + date2Details.day + ', ' + date2Details.year);

        return arrDates;
    } 
    else {
        // if the two dates have same month and year
        if (date1Details.month === date2Details.month && date1Details.year === date2Details.year) {
            
            // if year of dates is different than current year, indicate year in friendly first date
            if (date1Details.year !== currentDate.getUTCFullYear()) {
                arrDates[0] += ', ' + date1Details.year;
            }
            
            // only indicate the day in the second friendly date
            arrDates.push(date2Details.day);
            
            return arrDates;
        }
        else {
            
            // if year of dates is different than current year, indicate year in friendly first date
            if (date1Details.year !== currentDate.getUTCFullYear()) {
                arrDates[0] += ', ' + date1Details.year;
            }
            
            // indicate month and day in the second friendly date
            arrDates.push(date2Details.month + ' ' + date2Details.day);
            
            return arrDates;
        }
    }
}

friendly(["2022-09-05", "2023-09-04"]);
