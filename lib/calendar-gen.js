"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddCalendar = AddCalendar;
exports.buildCalendar = buildCalendar;




function AddCalendar(date) {
    const { cm } = inkdrop.getActiveEditor()

    if (date) {


    } else {
        date = new Date();
        date.setHours(0, 0, 0);
    }

    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    const calendar = buildCalendar(y, m, d);


    cm.replaceSelection(calendar);
    return true
}

/**
 * Get current date calendar
 */
function buildCalendar(y, m, d) {
    var pastMonth = new Date(y, m, d); //Grab the current Date
    pastMonth.setDate(1); //Set it to the first of the month
    pastMonth.setHours(-1);
    const daysInPastMonth = pastMonth.getDate();

    var today = new Date(y, m, d, 0, 0, 0);

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });

    const daysInMonth = new Date(yyyy, mm, 0, 0, 0, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);

    const firstDay =
        new Date(today.getFullYear(), today.getMonth(), 1).getDay();

    const lastDay =
        new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();


    const baseDate = new Date(Date.UTC(2017, 0, 1)); // just a Monday
    var weekDays = [];

    for (let i = 0; i < 7; i++) {
        weekDays.push(baseDate.toLocaleDateString('default', { weekday: 'short' }));
        baseDate.setDate(baseDate.getDate() + 1);
    }



    let monthTable = '';
    let weekDayIndex = firstDay;

    if (weekDayIndex > 0) { // add last days of previous month, if any
        let day = daysInPastMonth - weekDayIndex;
        for (let i = 0; i < weekDayIndex; i++) {
            monthTable += `| <small>~~${day + 1}~~</small> `;
            day++;
        }
    }
    for (let i = 1; i <= daysInMonth; i++) {

        if (i == dd) {
            monthTable += `| ** &laquo ${i} &raquo ** `;
        } else {
            monthTable += `| ${i} `;
        }

        weekDayIndex++;
        if (weekDayIndex >= 7) {
            monthTable += `\n`;

            weekDayIndex = 0;
        }
    }
    if (weekDayIndex != 0) { //add first days for next month, if any
        let day = 1;
        for (let i = weekDayIndex; i < 7; i++) {
            monthTable += `| <small>~~${day}~~</small> `;
            day++;
        }
    }


    var x = `
##### ${month} ${yyyy}

| ${ weekDays[0] } | ${ weekDays[1] } | ${ weekDays[2] } | ${ weekDays[3] } | ${ weekDays[4] } | ${ weekDays[5] } | ${ weekDays[6] } |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
${ monthTable }
`;
    return x;
}