  // TODO: Add code to display the current date in the header of the page.
function displayTime () {
  var todayTimeHeader = dayjs();
  $('#currentDay').text(todayTimeHeader.format('dddd, MMMM D h:mm:ss A'))
}


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var template = document.querySelector("#time-block-template");
  // for-loop to rotate through hours of workday
  var today = dayjs().format()
  var number = 9;
  for(var i = 0; i < 9; i++) {
    var timeBlock = template.content.cloneNode(true);
    // select save button
    var $saveButton = $(timeBlock).find("button");
    // select DOM element with "hour of day" time and add one onto the time each loop
    var $timeNumber = $(timeBlock).find('#hour');
    var textBox = $(timeBlock).find("textarea")
    textBox.text("Hey, You Got This.");
    if (number >= 9 && number < 12) {
      var hourMilitary = parseInt(dayjs(today).format('H'))
      if (number > hourMilitary) {
        textBox.addClass('future');
        textBox.removeClass('past');
        textBox.removeClass('present');
      } else if (number === hourMilitary) {
        textBox.addClass('present');
        textBox.removeClass('past');
        textBox.removeClass('future');
      } else {
        textBox.addClass('past');
        textBox.removeClass('future');
        textBox.removeClass('present');
      }
      $timeNumber.text(number + "AM")
      number++;
    } else if (number === 12) {
      if (number > hourMilitary) {
        textBox.addClass('future');
        textBox.removeClass('past');
        textBox.removeClass('present');
      } else if (number === hourMilitary) {
        textBox.addClass('present');
        textBox.removeClass('past');
        textBox.removeClass('future');
      } else {
        textBox.addClass('past');
        textBox.removeClass('future');
        textBox.removeClass('present');
      }
      $timeNumber.text(number + "PM")
      number = 1;
    } else if (number >= 1 && number <= 5) {
      var hourStandard = parseInt(dayjs(today).format('h'))
      if (number > hourStandard) {      
      textBox.addClass('future');
      textBox.removeClass('past');
      textBox.removeClass('present');
    } else if (number === hourStandard) {
      textBox.addClass('present');
      textBox.removeClass('past');
      textBox.removeClass('future');
    } else {
      textBox.addClass('past');
      textBox.removeClass('future');
      textBox.removeClass('present');
    }
      $timeNumber.text(number + "PM")
      number++;
    } else {
      return;
    }
    // if(hour < number) {
    //   textBox.addClass('past');
    //   textBox.removeClass('future');
    //   textBox.removeClass('present');
    // } else if(number === hour) {
    //   textBox.addClass('past');
    //   textBox.removeClass('future');
    //   textBox.removeClass('present');
    // } else {
    //   textBox.addClass('past');
    //   textBox.removeClass('future');
    //   textBox.removeClass('present');
    // }
    $saveButton.attr("data-block", $timeNumber.text())
    $("#time-block-container").append(timeBlock);
  } 

  $("#time-block-container").on('click', "button", function() {
    let eventInput = $(this).siblings("textarea").val();
    localStorage.setItem("events", JSON.stringify(eventInput))
  }) 

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  displayTime();
  setInterval(displayTime, 1000)  
});