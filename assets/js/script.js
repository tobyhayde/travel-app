
// EVERYTHING BELOW THIS LINE IS DEALING WITH THE SEARCH BAR FUNCITONALITY
// attempts to get the data from the fetch API into a look up dictionary to allow for comparison between user input, country name, and country iso2.
// iso2 required to get country specific information (capital and currency) from the API
var myLookUpDictionary = {};
var countryCode = {};
var countryName = {};
var countryCapital = {};
var countryCurrency = {};

var searchBarInputEl = document.querySelector("#search-bar-input");
var searchBarErrorEl = document.querySelector("search-bar-error");

var createLookUpDictionary = function() {
    debugger;
    fetch("https://api.countrystatecity.in/v1/countries/", {
        headers: {
            "X-CSCAPI-KEY": "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw=="
        }})
        .then(function(response) {
            response.json().then(function(data){
                myLookUpDictionary = data;
                
                // if the "Submit" button is clicked, then the input field text should be used to find the matching country name and country code (iso2)
                submitBtn.addEventListener("click", searchInputCheck());
            });
        });

}

var getCountryData = function(countryCode) {
    fetch("https://api.countrystatecity.in/v1/countries/" + countryCode, {
                    headers: {
                        "X-CSCAPI-KEY": "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw=="
                    }})
                    .then(function(response) {
                        response.json().then(function(data){
                            var countryName = data.name;
                            var countryCapital = data.capital;
                            var countryCurrency = data.currency;
                            displayCountryName(countryName);
                            displayCountryPicture(countryName);
                            displayCountryCapital(countryCapital);
                            displayCountryCurrency(countryCurrency);
                    });
                });
}

// logic to determine if user input into search bar can be matched with a iso2 country code from the API
var searchInputCheck = function() {
    // if text input is blank, then the blank div above the search bar should be populated with an error message: "Please enter a country name."
    if (searchBarInputEl === "") {
        searchBarErrorEl.textContent = "Please enter a country name.";
    } else {
        // if the text input is not blank, then the div about the search bar should be made blank ("") and the following loop should run
        searchBarErrorEl.textContent = "";
        // loop through myLookUpDictionary to see if user input matches with any country names
        for (var i = 0; i < myLookUpDictionary.length + 1; i++) {
            if (i === 250) {
                // if there is no match found, then the error div above the search bar area should populate with only the following error message: "No results found. Please check that the country name is spelled correctly or try a different country name!"
                searchBarErrorEl.textContent = "No results found. Please check that the country name is spelled correctly or try a different country name!";
            } else if (searchBarInputEl === myLookUpDictionary[i].name) {
                // if a match is found, then the code should pull in the country name and the iso2 country code from the myLookUpDictionary and populate the variables
                countryCode = myLookUpDictionary[i].iso2;
                getCountryData(countryCode);
                break;
            }
        }
    }
}

createLookUpDictionary();