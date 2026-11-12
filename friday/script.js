const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const script_status_label = document.querySelector('.script-status')
const script_date_label = document.querySelector('.script-date')

MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

function postfix(day) {
    lastdigit = day % 10
    if (day < 20 || lastdigit > 3) {
        return 'th'
    } else {
        return ['st', 'nd', 'rd'][lastdigit - 1]
    }
}

function calculateFriday(startDate, ahead) {
    console.log(`got ahead=${ahead} date=${startDate}`)
    const date = startDate

    let year = date.getFullYear()
    let shouldbreak = false

    let msnow = date.valueOf();
    let month;

    // Only start searching from tomorrow onwards
    for (time = msnow + MILLISECONDS_IN_A_DAY; time <= msnow + 366 * MILLISECONDS_IN_A_DAY; time += MILLISECONDS_IN_A_DAY) {
        dt = new Date(time)
        month = dt.getMonth()
        year = dt.getFullYear()
        shouldbreak = dt.getDay() == 5 && dt.getDate() == 13
        if (shouldbreak)
            break
    }

    if (!shouldbreak) {
        if (ahead)
            throw new Error("failed to find next Friday the 13th: scanned 366 ahead days and found none");
        else {
            script_status_label.innerHTML = "Failed to find next Friday the 13th!"
            script_date_label.innerHTML = "electrovoyage's code might be crappy. Please report this!"
        }
    }

    // If we're only checking forward, just return the date.
    if (ahead)
        return new Date(year, month, 13);

    // If the next Friday the 13th we found is in the current
    // month, search for one more.
    let extraText = ''
    if (month == startDate.getMonth()) {
        nextFri13 = calculateFriday(new Date(year, month, 13), true);
        nextMonth = nextFri13.getMonth();
        nextYear = nextFri13.getFullYear();
        extraText = ` (next in ${MONTHS[nextMonth]} of ${nextYear})`
    }

    script_date_label.innerHTML = `${MONTHS[month]} of ${year}${extraText}`
}

function beginCalculateFriday() {
    try {
        calculateFriday(new Date(Date.now()), false)
    } catch(e) {
        script_status_label.innerHTML = "Failed to find next Friday the 13th!"
        script_date_label.innerHTML = "electrovoyage's code broke. Please report the error you see in F12 > Console!"
        console.error(e)
    }
}

window.onload = beginCalculateFriday