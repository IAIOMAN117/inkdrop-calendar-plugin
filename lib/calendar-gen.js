"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTodayCalendar = createTodayCalendar;
exports.getToday = getToday;




function createTodayCalendar() {
    const { cm } = inkdrop.getActiveEditor()
    const calendar = getToday();

    
    cm.replaceSelection(calendar);
    return true
}

/**
 * 
 * @param {} dw 
 * @param {*} d 
 * @param {*} m 
 * @param {*} y 
 */
function getToday() {
    var today = new Date(2020,6,1);
    
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const month = today.toLocaleString('default', { month: 'long' });
    
    const daysInMonth = new Date(yyyy, mm, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7) ;


    
                  
    var firstDay =  
        new Date(today.getFullYear(), today.getMonth(), 1).getDay();
          
    var lastDay =  
       new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();


    const mon = 'Mon';
    const tue = 'Tue';
    const wed = 'Wed';
    const thu = 'Thu';
    const fri = 'Fri';
    const sat = 'Sat';
    const sun = 'Sun';
        

    let monthTable = '';

    //first week test

    let weekDayIndex = firstDay;
    let weekIndex = 0;
    
    if(weekDayIndex > 0)
    {
        for( let i = 0; i < weekDayIndex ; i ++) {
            monthTable += '| . ';
        }        
    }
    for( let i = 1; i <= daysInMonth; i++) {

        if( i == dd) {
            monthTable += `| ** &laquo ${i} &raquo ** `;
        } else {
            monthTable += `| ${i} `;
        }

        weekDayIndex++;
        if(weekDayIndex >= 7) {
            monthTable += `\n` ;

            weekDayIndex = 0;
            weekIndex ++;
        }
    }

    
    var x = `
##### ${month} ${yyyy}

days in month: ${daysInMonth}
weeks in month: ${weeksInMonth}

first in month: ${firstDay}
last in month: ${lastDay}

| ${ sun } | ${ mon } | ${ tue } | ${ wed } | ${ thu } | ${ fri } | ${ sat } |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: |
${ monthTable }
`;
    return x;
}