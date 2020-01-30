// from data.js
var tableData = data;

// YOUR CODE HERE!
// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $stateInput = document.querySelector("#state");
var $cityInput = document.querySelector("#city");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $dateInput = document.querySelector("#date");

var $searchBtn = document.querySelector("#search");
var $clearBtn = document.querySelector("#clear");

// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Add an event listener to the searchButton, call handleClearButtonClick when clicked
$clearBtn.addEventListener("click", handleClearButtonClick);

// When the user presses the Enter key (keyCode=13), handle it the same as pressing the Search button
addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    console.log("enter key pressed " + $stateInput.value + " " + $cityInput.value + " " + $shapeInput.value)
    // Trigger the button element with a click
    //document.getElementById("myBtn").click();
    handleSearchButtonClick();
  }
});


// Set filteredSightings to all the data initially
var filteredSightings = sightingsData;




// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  console.log("inside renderTable: filteredSightings length: " + filteredSightings.length)

  for (var i = 0; i < pageList.length; i++) {
    // Get get the current object and its fields
    var sighting = pageList[i];
    var fields = Object.keys(sighting);
    // Create a new row in the tbody
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the sighting object, create a new cell at set its inner text to be the current value at the current sighting's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = sighting[field];
    }
  }
}

//clear the filters and render the table with all the filteredData
function handleClearButtonClick() {
  //set all inputs to blank
  $cityInput.value = "";
  $stateInput.value = "";
  $countryInput.value = "";
  $shapeInput.value = "";
  $dateInput.value = "";
  filteredSightings = sightingsData;
  loadList();
}


//filter by multiple inputs
function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var inputCity = $cityInput.value.trim().toLowerCase();
  var inputState = $stateInput.value.trim().toLowerCase();
  var inputCountry = $countryInput.value.trim().toLowerCase();
  var inputShape = $shapeInput.value.trim().toLowerCase();
  //convert the date to internal format
  var inputDate = Date.parse($dateInput.value);

  // reset filteredSightings to the entire data set
  filteredSightings = sightingsData;

  // Set filteredSightings to an array of all sightings whose "date" matches the filter
  if (inputDate > 0) {
    console.log('getting ready to filter on date');
    console.log(inputDate);
    filteredSightings = filteredSightings.filter(function(results) {
      var resultsDate = Date.parse(results.datetime);
      // If true, add the data to the filteredSightings
      return resultsDate === inputDate;
    }
  )};

  // now filter on country
  if (inputCountry !== "") {
    console.log('getting ready to filter on country')
    filteredSightings = filteredSightings.filter(function(results) {
      var resultsCountry = results.country.toLowerCase();
      // If true, add the data to the filteredSightings
      return resultsCountry === inputCountry;
    }
  )};

  // now filter on state
  if (inputState !== "") {
    console.log('getting ready to filter on state')
    filteredSightings = filteredSightings.filter(function(results) {
      var resultsState = results.state.toLowerCase();
      // If true, add the data to the filteredSightings
      return resultsState === inputState;
    }
  )};

  //now filter those results (filteredStates) on city if provided
  if (inputCity !== "") {
    console.log('getting ready to filter on city')
    filteredSightings = filteredSightings.filter(function(results) {
      var resultsCity = results.city.toLowerCase();
      // If true, add the data to filteredSightings
      return resultsCity === inputCity;
    }
  )}

  //now filter those results on shape if provided
  if (inputShape !== "") {
    console.log('getting ready to filter on shape')
    filteredSightings = filteredSightings.filter(function(results) {
      var resultsShape = results.shape.toLowerCase();
      // If true, add the data to filteredSightings
      return resultsShape === inputShape;
    }
  )}

  console.log("filteredSightings length: " + filteredSightings.length)

  
  //need to display the first page of data after filtering
  firstPage();

  //loadList();
  //renderTable();
};

// Render the table for the first time on page load
loadList();