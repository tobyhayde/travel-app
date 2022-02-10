var myLookUpDictionary = [];

var countryCode = "";
var countryName = "";
var countryCapital = "";
var countryCurrency = "";

var imageSource = "";
var imageSrcAltText = "";
var imageSrcAuthor = "";
var imageSrcAuthorURL = "";
var pictureData = [];
var pictureDataSrc = "";

var searchBarInput = "";

var savedCountrySearches = [];
var savedSearchesModalEl = document.getElementById("savedSearchesModal");
var savedSearchesBtnEl = document.getElementById("savedSearchesBtn");
var closeBtn = document.getElementsByClassName("close")[0];

var searchBarInputEl = document.querySelector("#search-bar-input");
var searchBarErrorEl = document.querySelector("#search-bar-error");
var searchBtnEl = document.querySelector("#search-btn");

var capitalNameEl = document.querySelector("#capital-name-container");
var currencyNameEl = document.querySelector("#currency-name-container");
var countryNameEl = document.querySelector("#country-name-container");
var imageDisplayEl = document.querySelector("#image-display-container");
var saveBtnEl = document.querySelector("#save-btn");

var savedSearchDisplayEl = document.querySelector("#saved-searches-container");

// formats the input from the text search field to match it with the name key/value pair from the countrystatecity api.
// I used the format of the code from this stackoverflow chain: https://stackoverflow.com/questions/32589197/how-can-i-capitalize-the-first-letter-of-each-word-in-a-string-using-javascript
var formatUserInput = function () {
  searchBarInput = searchBarInputEl.value;
  var splitWords = searchBarInput.toLowerCase().split(" ");

  for (var i = 0; i < splitWords.length; i++) {
    splitWords[i] =
      splitWords[i].charAt(0).toUpperCase() + splitWords[i].substring(1);
  }

  searchBarInput = splitWords.join(" ");
};

// if another search was preformed, this removes all previously created elements from the previous search
var resetSearchInput = function () {
  var previousCountryNameEl = document.querySelector("#country-name");
  var previousCountryName = document.querySelector("#country-name-container");
  var previousCountryImage = document.querySelector("#image-display-container");
  var previousCountryCapital = document.querySelector(
    "#capital-name-container"
  );
  var previousCountryCurrency = document.querySelector(
    "#currency-name-container"
  );

  if (previousCountryNameEl) {
    previousCountryName.innerHTML = "";
    previousCountryImage.innerHTML = "";
    previousCountryCapital.innerHTML = "";
    previousCountryCurrency.innerHTML = "";
    saveBtnEl.style.display = "none";
  }
};
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
      getCountryImage(countryName);
      displayCountryName(countryName);
      displayCountryCapital(countryCapital);
      displayCountryCurrency(countryCurrency);
      displaySaveBtn();

      // removes the user input from the search text field
      searchBarInputEl.value = "";
    });
  });
};

// this sets the data that is retrieved from the Pexels API
var getCountryImage = function () {
  fetch(
    "https://api.pexels.com/v1/search?query=" + countryName + "&per_page=1",
    {
      headers: {
        Authorization:
          "563492ad6f917000010000018a9b5cfabca64242bcbb90cb97ec70ca",
      },
    }
  ).then(function (response) {
    response.json().then(function (data) {
      // pushes the data into an array
      pictureData = data.photos;
      pictureDataSrc = pictureData[0].src;

      // grabs data from the array
      imageSource = pictureDataSrc.medium;
      imageSrcAltText = pictureData[0].alt;
      imageSrcAuthor = pictureData[0].photographer;
      imageSrcAuthorURL = pictureData[0].photographer_url;
      displayCountryImage(countryName);
    });
  });
};

// logic to determine if user input into search bar can be matched with a iso2 country code from the API
var searchInputCheck = function () {
  resetSearchInput();
  // if text input is blank, then the blank div by the search bar should be populated with an error message: "Please enter a country name."
  if (!searchBarInputEl.value) {
    searchBarErrorEl.textContent = "Please enter a country name.";
  } else {
    // if the text input is not blank, then the div by the search bar should be made blank ("") and the following loop should run
    searchBarErrorEl.textContent = "";
    // calls the function to reformat user input in case it doesn't match the myLookUpDictionary names
    formatUserInput();
    // loop through myLookUpDictionary to see if user input matches with any country names
    for (var i = 0; i < myLookUpDictionary.length + 1; i++) {
      if (i === 250) {
        // if there is no match found, then the error div by the search bar area should populate with only the following error message: "No results found. Please check that the country name is spelled correctly or try a different country name!"
        searchBarErrorEl.textContent =
          "No results found. Please check that the country name is spelled correctly or try a different country name!";
      } else if (searchBarInput === myLookUpDictionary[i].name) {
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
  //countryDisplayName.className = NEED TO BE DECIDED
  countryDisplayName.setAttribute("id", "country-name");
  countryDisplayName.innerHTML = "<h3>" + countryName + "</h3>";

  countryNameEl.appendChild(countryDisplayName);
};

// displays an image relating to the country searched for by the user
var displayCountryImage = function () {
  var countryImageDisplay = document.createElement("img");
  countryImageDisplay.setAttribute("id", "country-image");
  countryImageDisplay.setAttribute("src", imageSource);
  countryImageDisplay.setAttribute("alt", imageSrcAltText);

  var countryImageCopyright = document.createElement("p");
  countryImageCopyright.setAttribute("id", "image-copyright");
  countryImageCopyright.innerHTML =
    "<a href='https://www.pexels.com'>Photos provided by Pexels.</a> Photo taken by <a href='" +
    imageSrcAuthorURL +
    "'>" +
    imageSrcAuthor +
    "</a>";

  imageDisplayEl.appendChild(countryImageDisplay);
  imageDisplayEl.appendChild(countryImageCopyright);
};

// displays the country capital when the search function is run
var displayCountryCapital = function () {
  var capitalHeader = document.createElement("div");
  //capitalHeader.className = NEED TO BE DECIDED
  capitalHeader.setAttribute("id", "capital-name-header");
  capitalHeader.innerHTML = "<h5>Capital City:</h5>";

  var capitalName = document.createElement("div");
  //capitalHeader.className = NEED TO BE DECIDED
  capitalName.setAttribute("id", "capital-name");
  capitalName.innerHTML = "<p>" + countryCapital + "</p>";

  capitalNameEl.appendChild(capitalHeader);
  capitalNameEl.appendChild(capitalName);
};

// displays the country currency when the search function is run
var displayCountryCurrency = function () {
  var currencyHeader = document.createElement("div");
  currencyHeader.className = "em";
  currencyHeader.setAttribute("id", "currency-name-header");
  currencyHeader.innerHTML = "<h5>Currency:</h5>";

  var currencyName = document.createElement("div");
  currencyName.className = "strong";
  currencyName.setAttribute("id", "currency-name");
  currencyName.innerHTML = "<p>" + countryCurrency + "</p>";

  currencyNameEl.appendChild(currencyHeader);
  currencyNameEl.appendChild(currencyName);
};

var displaySaveBtn = function () {
  saveBtnEl.style.display = "block";
};

// saving searches
var saveSearch = function () {
  var countryData = {
    name: countryName,
    code: countryCode,
  };
  console.log(countryName);
  savedCountrySearches.push(countryData);
  localStorage.setItem(
    "savedCountrySearches",
    JSON.stringify(savedCountrySearches)
  );
};

// response.json().then(function (data) {
//   myLookUpDictionary = data;
//   // saves a copy of the look up dictionary to localStorage
//   localStorage.setItem(
//     "myLookUpDictionary",
//     JSON.stringify(myLookUpDictionary)

var checkSavedData = function () {
  console.log("button clicked");
  localStorage.getItem("savedCountrySearches");
  if (savedCountrySearches.length == 0) {
    saveSearch();
  } else {
    console.log("the check for previous save");
    for (var i = 0; i < savedCountrySearches.length; i++) {
      if (countryName === savedCountrySearches[i].name) {
        console.log("in the middle of checking");
        searchBarErrorEl.textContent = "This search has already been saved!";
        return;
      }
    }
    saveSearch();
  }
};

var loadPreviousSavedSearches = function () {
  var savedData = localStorage.getItem("savedCountrySearches");
  console.log("saved searches loading?");
  if (!savedData) {
    return false;
  }
  console.log("saved searches loaded");
  savedCountrySearches = JSON.parse(savedData);
};

// saved searches modal functionality

// When the user clicks the "Saved Searches" button, the modal should open and either display an error message or all of the saved search data
savedSearchesBtnEl.onclick = function () {
  savedSearchesModalEl.style.display = "block";

  if (!savedCountrySearches) {
    savedSearchDisplayEl.textContent = "There are no saved searches.";
  }
};

// When the user clicks on the "X" in the upper-right corner, the modal should close
closeBtn.onclick = function () {
  savedSearchesModalEl.style.display = "none";
};

// When the user clicks anywhere outside of the modal, the modal should close
window.onclick = function (event) {
  if (event.target == savedSearchesModalEl) {
    savedSearchesModalEl.style.display = "none";
  }
};

// When clicking on the "Clear All Saved Searches" button, the array holding the saved data should be reset
var clearAllSavedSearches = function () {};

createLookUpDictionary();
loadPreviousSavedSearches();
// if the "Search" button is clicked, then the input field text should be used to find the matching country name and country code (iso2)
searchBtnEl.addEventListener("click", searchInputCheck);
saveBtnEl.addEventListener("click", checkSavedData);
