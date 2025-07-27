function isValidDateTime(dateTimeStr) {
    // Require full ISO datetime format: YYYY-MM-DDTHH:MM[:SS]
    const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

    // Reject if format doesn't match
    if (!isoDateTimeRegex.test(dateTimeStr)) return false;

    // Now check if it's a valid Date
    const date = new Date(dateTimeStr);
    return !isNaN(date.getTime());
}

function isAfter(dateTime1, dateTime2) {
    return new Date(dateTime1).getTime() > new Date(dateTime2).getTime();
}



module.exports = {
    isAfter,
    isValidDateTime,
};
