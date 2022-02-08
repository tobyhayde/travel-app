// EVERYTHING BELOW THIS LINE IS DEALING WITH THE SEARCH BAR FUNCITONALITY
// attempts to get the data from the fetch API into a look up dictionary to allow for comparison between user input, country name, and country iso2.
// iso2 required to get country specific information (capital and currency) from the API
var myLookUpDictionary = [];
var countryCode = "";
var countryName = "";
var countryCapital = "";
var countryCurrency = "";

var searchBarInputEl = document.querySelector("#search-bar-input");
var searchBarErrorEl = document.querySelector("#search-bar-error");
var searchBtnEl = document.querySelector("#search-btn");
var capitalNameEl = document.querySelector("#capital-name-container");
var currencyNameEl = document.querySelector("#currency-name-container");
var countryNameEl = document.querySelector("#country-name-container");

//var resetSearchInput = function () {
 // countryName = "";
  //countryCapital = "";
 // countryCurrency = ""
//}
// function creates the look up dictionary to compare user input against the country name in order to obtain the country code(iso2)
var createLookUpDictionary = function () {
  // checks to see if the user already has a copy of the look up dictionary that the app can use. If not, then it will save a copy to localStorage
  if (!localStorage.getItem("myLookUpDictionary")) {
    fetch("https://api.countrystatecity.in/v1/countries/", {
      headers: {
        "X-CSCAPI-KEY":
          "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw==",
      },
    }).then(function (response) {
      response.json().then(function (data) {
        myLookUpDictionary = data;
        // saves a copy of the look up dictionary to localStorage
        localStorage.setItem(
          "myLookUpDictionary",
          JSON.stringify(myLookUpDictionary)
        );
      });
    });
  } else {
    // loads the copy of the look up dictionary from the user's localStorage
    var storedLookUpDictionary = localStorage.getItem("myLookUpDictionary");
    myLookUpDictionary = JSON.parse(storedLookUpDictionary);
    console.log(myLookUpDictionary);
    return;
  }
};

var getCountryData = function (countryCode) {
  fetch("https://api.countrystatecity.in/v1/countries/" + countryCode, {
    headers: {
      "X-CSCAPI-KEY":
        "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw==",
    },
  }).then(function (response) {
    response.json().then(function (data) {
      countryName = data.name;
      countryCapital = data.capital;
      countryCurrency = data.currency;
      displayCountryName(countryName);
      displayCountryCapital(countryCapital);
      //displayCountryPicture(countryName);
      displayCountryCurrency(countryCurrency);
    });
  });
};

// logic to determine if user input into search bar can be matched with a iso2 country code from the API
var searchInputCheck = function () {
  // if text input is blank, then the blank div by the search bar should be populated with an error message: "Please enter a country name."
  if (!searchBarInputEl.value) {
    searchBarErrorEl.textContent = "Please enter a country name.";
  } else {
    // if the text input is not blank, then the div by the search bar should be made blank ("") and the following loop should run
    searchBarErrorEl.textContent = "";
    // loop through myLookUpDictionary to see if user input matches with any country names
    for (var i = 0; i < myLookUpDictionary.length + 1; i++) {
      if (i === 250) {
        // if there is no match found, then the error div by the search bar area should populate with only the following error message: "No results found. Please check that the country name is spelled correctly or try a different country name!"
        searchBarErrorEl.textContent =
          "No results found. Please check that the country name is spelled correctly or try a different country name!";
      } else if (searchBarInputEl.value === myLookUpDictionary[i].name) {
        // if a match is found, then the code should pull in the country name and the iso2 country code from the myLookUpDictionary and populate the variables
        countryCode = myLookUpDictionary[i].iso2;
        getCountryData(countryCode);
        break;
      }
    }
  }
};

// displays the country name when the search function is run
var displayCountryName = function () {
  var countryDisplayName = document.createElement("div");
  //capitalHeader.className = NEED TO BE DECIDED
  countryDisplayName.setAttribute = "country-name";
  countryDisplayName.innerHTML = "<h3>" + countryName + "</h3>";

  countryNameEl.appendChild(countryDisplayName);
};

// displays the country capital when the search function is run
var displayCountryCapital = function () {
  var capitalHeader = document.createElement("div");
  //capitalHeader.className = NEED TO BE DECIDED
  capitalHeader.setAttribute = "capital-name-header";
  capitalHeader.innerHTML = "<h5>Capital City:</h5>";

  var capitalName = document.createElement("div");
  //capitalHeader.className = NEED TO BE DECIDED
  capitalName.setAttribute = "capital-name";
  capitalName.innerHTML = "<p>" + countryCapital + "</p>";

  capitalNameEl.appendChild(capitalHeader);
  capitalNameEl.appendChild(capitalName);
};

// displays the country currency when the search function is run
var displayCountryCurrency = function () {
  var currencyHeader = document.createElement("div");
  currencyHeader.className = "em"
  currencyHeader.setAttribute = "currency-name-header";
  currencyHeader.innerHTML = "<h5>Currency:</h5>";

  var currencyName = document.createElement("div");
  currencyName.className = "strong"
  currencyName.setAttribute = "currency-name";
  currencyName.innerHTML = "<p>" + countryCurrency + "</p>";

  currencyNameEl.appendChild(currencyHeader);
  currencyNameEl.appendChild(currencyName);
};

createLookUpDictionary();
// if the "Search" button is clicked, then the input field text should be used to find the matching country name and country code (iso2)
searchBtnEl.addEventListener("click", searchInputCheck);
