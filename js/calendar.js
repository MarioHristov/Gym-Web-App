// Get the calendar container element
const calendarContainer = document.getElementById('calendar-grid');
const weekRange = document.getElementById('week-range');
// Initialize the current month and year
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDate = new Date().getDate();
let currentWeek = 0;
let firstTimeLoad = true;
// Function to generate the calendar for a given month and year
function renderCalendar(calendar) {
  // Clear the calendar grid
  calendarContainer.innerHTML = '';
  var currentWeekRange = null;

  if (firstTimeLoad) {
    currentWeekRange = getCurrentWeek(calendar, new Date(currentYear, currentMonth, currentDate, 0, 0, 0, 0));
    firstTimeLoad = false;
  }

  else{
    currentWeekRange = calendar[currentWeek];
  }
  var formattedDate = currentWeekRange[0].getDate().toString().padStart(2, '0') + '.' + (currentWeekRange[0].getMonth() + 1).toString().padStart(2, '0') + '.' + currentWeekRange[0].getFullYear() + ' to ' + currentWeekRange[currentWeekRange.length - 1].getDate().toString().padStart(2, '0') + '.' + (currentWeekRange[currentWeekRange.length - 1].getMonth() + 1).toString().padStart(2, '0') + '.' + currentWeekRange[currentWeekRange.length - 1].getFullYear();
  
  var formattedDates = formatDates(currentWeekRange);

  var html = '';

  html += '<table>';
  let currentDateFull = new Date().getDate().toString().padStart(2, '0') + '.' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '.' + new Date().getFullYear();
  html += `<tr><th>&nbsp</th><th><div meta:date = ${formattedDates[0]} ${formattedDates[0] === currentDateFull? 'class="current-date"' : '' }>Monday</div></th><th><div meta:date = ${formattedDates[1]} ${formattedDates[1] === currentDateFull? 'class="current-date"' : '' }>Tuesday</div></th><th><div meta:date = ${formattedDates[2] } ${formattedDates[2] === currentDateFull? 'class="current-date"' : '' }>Wednesday</div></th><th><div meta:date = ${formattedDates[3]} ${formattedDates[3] === currentDateFull? 'class="current-date"' : '' }>Thursday</div></th><th><div meta:date = ${formattedDates[4]} ${formattedDates[4] === currentDateFull? 'class="current-date"' : '' }>Friday</div></th><th><div meta:date = ${formattedDates[5]} ${formattedDates[5] === currentDateFull? 'class="current-date"' : '' }>Saturday</div></th><th><div meta:date = ${formattedDates[6]} ${formattedDates[6] === currentDateFull? 'class="current-date"' : '' }>Sunday</div></th></tr>`;

  for (var hour = 8; hour <= 22; hour++) {
    html += '<tr>';
    html += '<td>' + `${hour < 10? '0' + hour: hour}` + ':00</td>';

    for (var i = 0; i < 7; i++) {
      html += '<td></td>';
    }

    html += '</tr>';
  }

  html += '</table>';

  calendarContainer.innerHTML = html;
  weekRange.innerHTML = formattedDate;
}
function formatDates(dates){
  formattedDates = [];
  for(let i = 0; i < dates.length; i++)
  {
    let formatDate = dates[i].getDate().toString().padStart(2, '0') + '.' + (dates[i].getMonth() + 1).toString().padStart(2, '0') + '.' + dates[i].getFullYear();
    formattedDates.push(formatDate);
  }
  return formattedDates;
}
function getCurrentWeek(calendar, fulldate) {
  var foundDate = null;
  for (var i = 0; i < calendar.length; i++) {
    for (var j = 0; j < calendar[i].length; j++) {
      if (calendar[i][j] && fulldate && calendar[i][j].getTime() === fulldate.getTime()) {
        foundDate = calendar[i];

        if (currentWeek === 0) {
          currentWeek = i;
        }

        break;
      }
    }
    if (foundDate) {
      break;
    }
  }
  return foundDate;
}

//Generating calendar
function generateCalendar(month, year) {
  let offset = new Date(year, month, 1).getDay() === 1 ? 0: 7 - new Date(year, month, 1).getDay() + 1;

  console.log(currentWeek);

  let monthStartingDate = new Date(year, month, 1 + offset);
  let nextMonthFirstDay = new Date(year, month + 1, 1);

  let daysFromNextMonth = getDaysFromNextMonth(nextMonthFirstDay, month + 1, year, 7 - nextMonthFirstDay.getDay());
  let daysFromCurrentMonth = getDaysFromCurrentMonth(monthStartingDate.getDate(), month, year, new Date(nextMonthFirstDay.getTime() - 1).getDate());
  
  return weeks(daysFromCurrentMonth, daysFromNextMonth);
}
function getDaysFromPreviousMonth(previousMonthStartingDate, month, year, daysToGet) {
  let monthLastDate = new Date(previousMonthStartingDate.getTime() - 1).getDate();
  let dates = [];
  
  for (let i = monthLastDate; i > monthLastDate - daysToGet - 1; i--) {
    dates.push(new Date(year, month, i));
  }
  return dates;
}

function getDaysFromNextMonth(previousMonthEndingDate, month, year, daysToGet) {
  let monthFirstDate = new Date(previousMonthEndingDate.getTime() + 1).getDate();
  let dates = [];
  for (let i = monthFirstDate; i <= monthFirstDate + daysToGet; i++) {
    dates.push(new Date(year, month, i));
  }
  return dates;
}

function getDaysFromCurrentMonth(firstDay, month, year, lastDay) {
  let dates = [];
  for (let i = firstDay; i <= lastDay; i++) {
    dates.push(new Date(year, month, i));
  }
  return dates;
}

function weeks(array1, array2) {
  var combinedArray = array1.concat(array2); // Combine the three arrays into a single array

  var smallerArrays = [];
  var lengthOfSmallerArrays = 7;
  var totalArrays = Math.ceil(combinedArray.length / lengthOfSmallerArrays);

  // Rearrange the arrays: array1, array2, array
  combinedArray = array1.concat(array2);
  for (var i = 0; i < totalArrays; i++) {
    var startIndex = i * lengthOfSmallerArrays;
    var endIndex = startIndex + lengthOfSmallerArrays;
    var smallerArray = combinedArray.slice(startIndex, endIndex);
    smallerArrays.push(smallerArray);
  }
  return smallerArrays;
}

//Generating calendar
// Function to handle next month navigation
function nextWeek() {
  currentWeek++;
  let calendar = generateCalendar(currentMonth, currentYear);
  if (currentWeek > calendar.length - 1) {
    currentWeek = 0;
    currentMonth++;
    
  }
  renderCalendar(generateCalendar(currentMonth, currentYear));
}

// Function to handle previous month navigation
function previousWeek() {
  currentWeek--;
  if (currentWeek < 0) {
    currentMonth--;
    currentWeek = generateCalendar(currentMonth, currentYear).length - 1;
    
  }
  renderCalendar(generateCalendar(currentMonth, currentYear));
}

// Add event listeners to navigation buttons
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', nextWeek);

const previousButton = document.getElementById('previous-button');
previousButton.addEventListener('click', previousWeek);

// Initial calendar generation
document.addEventListener('DOMContentLoaded', function(){
  console.log("?")
  renderCalendar(generateCalendar(currentMonth, currentYear));
});
