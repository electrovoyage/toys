const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

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

const date = new Date(Date.now())

const script_status_label = document.querySelector('.script-status')
const script_date_label = document.querySelector('.script-date')

year = date.getFullYear()
shouldbreak = false
currentmonth = date.getMonth()

msnow = Date.now()

for (time = msnow + MILLISECONDS_IN_A_DAY; time <= msnow + 366 * MILLISECONDS_IN_A_DAY; time += MILLISECONDS_IN_A_DAY) {
    dt = new Date(time)
    month = dt.getMonth()
    year = dt.getFullYear()
    shouldbreak = dt.getDay() == 5 && dt.getDate() == 13
    if (shouldbreak) {break}
}

if (!shouldbreak) {
    //throw new Error('failed to find next Friday the 13th')
    script_status_label.innerHTML = "Failed to find next Friday the 13th!"
    script_date_label.innerHTML = "electrovoyage's code might be crappy. Please report this!"
    return
}

script_date_label.innerHTML = `${MONTHS[month]} of ${year}`

window.onload = onloaded