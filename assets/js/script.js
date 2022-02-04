
// EVERYTHING BELOW THIS LINE IS DEALING WITH THE SEARCH BAR FUNCITONALITY
// attempts to get the data from the fetch API into a look up dictionary to allow for comparison between user input, country name, and country iso2.
// iso2 required to get country specific information (capital and currency) from the API
var myLookUpDictionary = {};
var countryCode = {};
var searchBarInputEl = document.querySelector("#search-bar-input");
var searchBarErrorEl = document.querySelector("search-bar-error");

var createLookUpDictionary = function() {
    fetch("https://api.countrystatecity.in/v1/countries/", {
        headers: {
            "X-CSCAPI-KEY": "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw=="
        }})
        .then(function(response) {
            response.json().then(function(data){
                myLookUpDictionary = data;
                //console.log(myLookUpDictionary);
            });
        });
}

createLookUpDictionary();

var getCountryData = function(countryCode) {
    fetch("https://api.countrystatecity.in/v1/countries/" + countryCode, {
                    headers: {
                        "X-CSCAPI-KEY": "NE03N3E0Y0dxMnRiMzJXV0xubWNRaWpNVkJOZExEOEpRdWd1dGZWYw=="
                    }})
                    .then(function(response) {
                        response.json().then(function(data){
                            var countryCapital = data.capital;
                            var countryCurrency = data.currency;
                            displayCountryCapital(countryCapital);
                            displayCountryCurrency(countryCurrency);
                    });
                });
}

// logic to determine if user input into search bar can be matched with a iso2 country code from the API
var searchInputCheck = function() {
    // if text input is blank, then the blank div above the search bar should be populated with an error message: "Please enter a country name."
    if (searchBarInputEl.value === "") {
        searchBarErrorEl.text = "Please enter a country name.";
    } else {
        // if the text input is not blank, then the div about the search bar should be made blank ("") and the following loop should run
        searchBarErrorEl.text = "";
        // loop through myLookUpDictionary to see if user input matches with any country names
        for (var i = 0; i < myLookUpDictionary.length; i++) {
            if (searchBarInputEl.value === myLookUpDictionary[i].name) {
                // if a match is found, then the code should pull in the country name and the iso2 country code from the myLookUpDictionary and populate the variables
                countryCode = myLookUpDictionary[i].iso2;
                getCountryData;
            } else {
                // if there is no match found, then the error div above the search bar area should populate with only the following error message: "No results found. Please check that the country name is spelled correctly or try a different country name!"
                searchBarErrorEl.text = "No results found. Please check that the country name is spelled correctly or try a different country name!";
            }
        }
    }
}

// if the "Submit" button is clicked, then the input field text should be used to find the matching country name and country code (iso2)
submitBtn.addEventListener("click", searchInputCheck());




// the below information was taken from the API and is being kept while in development just in case it's needed

// name: 'Afghanistan', iso2: 'AF'
// name: 'Aland Islands', iso2: 'AX'
// name: 'Albania', iso2: 'AL'
// name: 'Algeria', iso2: 'DZ'
// name: 'American Samoa', iso2: 'AS'
// name: 'Andorra', iso2: 'AD'
// name: 'Angola', iso2: 'AO'
// name: 'Anguilla', iso2: 'AI'
// name: 'Antarctica', iso2: 'AQ'
// name: 'Antigua And Barbuda', iso2: 'AG'
// name: 'Argentina', iso2: 'AR'
// name: 'Armenia', iso2: 'AM'
// name: 'Aruba', iso2: 'AW'
// name: 'Australia', iso2: 'AU'
// name: 'Austria', iso2: 'AT'
// name: 'Azerbaijan', iso2: 'AZ'
// name: 'Bahamas The', iso2: 'BS'
// name: 'Bahrain', iso2: 'BH'
// name: 'Bangladesh', iso2: 'BD'
// name: 'Barbados', iso2: 'BB'
// name: 'Belarus', iso2: 'BY'
// name: 'Belgium', iso2: 'BE'
// name: 'Belize', iso2: 'BZ'
// name: 'Benin', iso2: 'BJ'
// name: 'Bermuda', iso2: 'BM'
// name: 'Bhutan', iso2: 'BT'
// name: 'Bolivia', iso2: 'BO'
// name: 'Bosnia and Herzegovina', iso2: 'BA'
// name: 'Botswana', iso2: 'BW'
// name: 'Bouvet Island', iso2: 'BV'
// name: 'Brazil', iso2: 'BR'
// name: 'British Indian Ocean Territory', iso2: 'IO'
// name: 'Brunei', iso2: 'BN'
// name: 'Bulgaria', iso2: 'BG'
// name: 'Burkina Faso', iso2: 'BF'
// name: 'Burundi', iso2: 'BI'
// name: 'Cambodia', iso2: 'KH'
// name: 'Cameroon', iso2: 'CM'
// name: 'Canada', iso2: 'CA'
// name: 'Cape Verde', iso2: 'CV'
// name: 'Cayman Islands', iso2: 'KY'
// name: 'Central African Republic', iso2: 'CF'
// name: 'Chad', iso2: 'TD'
// name: 'Chile', iso2: 'CL'
// name: 'China', iso2: 'CN'
// name: 'Christmas Island', iso2: 'CX'
// name: 'Cocos (Keeling) Islands', iso2: 'CC'
// name: 'Colombia', iso2: 'CO'
// name: 'Comoros', iso2: 'KM'
// name: 'Congo', iso2: 'CG'
// name: 'Democratic Republic of the Congo', iso2: 'CD'
// name: 'Cook Islands', iso2: 'CK'
// name: 'Costa Rica', iso2: 'CR'
// name: "Cote D'Ivoire (Ivory Coast)", iso2: 'CI'
// name: 'Croatia', iso2: 'HR'
// name: 'Cuba', iso2: 'CU'
// name: 'Cyprus', iso2: 'CY'
// name: 'Czech Republic', iso2: 'CZ'
// name: 'Denmark', iso2: 'DK'
// name: 'Djibouti', iso2: 'DJ'
// name: 'Dominica', iso2: 'DM'
// name: 'Dominican Republic', iso2: 'DO'
// name: 'East Timor', iso2: 'TL'
// name: 'Ecuador', iso2: 'EC'
// name: 'Egypt', iso2: 'EG'
// name: 'El Salvador', iso2: 'SV'
// name: 'Equatorial Guinea', iso2: 'GQ'
// name: 'Eritrea', iso2: 'ER'
// name: 'Estonia', iso2: 'EE'
// name: 'Ethiopia', iso2: 'ET'
// name: 'Falkland Islands', iso2: 'FK'
// name: 'Faroe Islands', iso2: 'FO'
// name: 'Fiji Islands', iso2: 'FJ'
// name: 'Finland', iso2: 'FI'
// name: 'France', iso2: 'FR'
// name: 'French Guiana', iso2: 'GF'
// name: 'French Polynesia', iso2: 'PF'
// name: 'French Southern Territories', iso2: 'TF'
// name: 'Gabon', iso2: 'GA'
// name: 'Gambia The', iso2: 'GM'
// name: 'Georgia', iso2: 'GE'
// name: 'Germany', iso2: 'DE'
// name: 'Ghana', iso2: 'GH'
// name: 'Gibraltar', iso2: 'GI'
// name: 'Greece', iso2: 'GR'
// name: 'Greenland', iso2: 'GL'
// name: 'Grenada', iso2: 'GD'
// name: 'Guadeloupe', iso2: 'GP'
// name: 'Guam', iso2: 'GU'
// name: 'Guatemala', iso2: 'GT'
// name: 'Guernsey and Alderney', iso2: 'GG'
// name: 'Guinea', iso2: 'GN'
// name: 'Guinea-Bissau', iso2: 'GW'
// name: 'Guyana', iso2: 'GY'
// name: 'Haiti', iso2: 'HT'
// name: 'Heard Island and McDonald Islands', iso2: 'HM'
// name: 'Honduras', iso2: 'HN'
// name: 'Hong Kong S.A.R.', iso2: 'HK'
// name: 'Hungary', iso2: 'HU'
// name: 'Iceland', iso2: 'IS'
// name: 'India', iso2: 'IN'
// name: 'Indonesia', iso2: 'ID'
// name: 'Iran', iso2: 'IR'
// name: 'Iraq', iso2: 'IQ'
// name: 'Ireland', iso2: 'IE'
// name: 'Israel', iso2: 'IL'
// name: 'Italy', iso2: 'IT'
// name: 'Jamaica', iso2: 'JM'
// name: 'Japan', iso2: 'JP'
// name: 'Jersey', iso2: 'JE'
// name: 'Jordan', iso2: 'JO'
// name: 'Kazakhstan', iso2: 'KZ'
// name: 'Kenya', iso2: 'KE'
// name: 'Kiribati', iso2: 'KI'
// name: 'North Korea', iso2: 'KP'
// name: 'South Korea', iso2: 'KR'
// name: 'Kuwait', iso2: 'KW'
// name: 'Kyrgyzstan', iso2: 'KG'
// name: 'Laos', iso2: 'LA'
// name: 'Latvia', iso2: 'LV'
// name: 'Lebanon', iso2: 'LB'
// name: 'Lesotho', iso2: 'LS'
// name: 'Liberia', iso2: 'LR'
// name: 'Libya', iso2: 'LY'
// name: 'Liechtenstein', iso2: 'LI'
// name: 'Lithuania', iso2: 'LT'
// name: 'Luxembourg', iso2: 'LU'
// name: 'Macau S.A.R.', iso2: 'MO'
// name: 'Macedonia', iso2: 'MK'
// name: 'Madagascar', iso2: 'MG'
// name: 'Malawi', iso2: 'MW'
// name: 'Malaysia', iso2: 'MY'
// name: 'Maldives', iso2: 'MV'
// name: 'Mali', iso2: 'ML'
// name: 'Malta', iso2: 'MT'
// name: 'Man (Isle of)', iso2: 'IM'
// name: 'Marshall Islands', iso2: 'MH'
// name: 'Martinique', iso2: 'MQ'
// name: 'Mauritania', iso2: 'MR'
// name: 'Mauritius', iso2: 'MU'
// name: 'Mayotte', iso2: 'YT'
// name: 'Mexico', iso2: 'MX'
// name: 'Micronesia', iso2: 'FM'
// name: 'Moldova', iso2: 'MD'
// name: 'Monaco', iso2: 'MC'
// name: 'Mongolia', iso2: 'MN'
// name: 'Montenegro', iso2: 'ME'
// name: 'Montserrat', iso2: 'MS'
// name: 'Morocco', iso2: 'MA'
// name: 'Mozambique', iso2: 'MZ'
// name: 'Myanmar', iso2: 'MM'
// name: 'Namibia', iso2: 'NA'
// name: 'Nauru', iso2: 'NR'
// name: 'Nepal', iso2: 'NP'
// name: 'Bonaire, Sint Eustatius and Saba', iso2: 'BQ'
// name: 'Netherlands', iso2: 'NL'
// name: 'New Caledonia', iso2: 'NC'
// name: 'New Zealand', iso2: 'NZ'
// name: 'Nicaragua', iso2: 'NI'
// name: 'Niger', iso2: 'NE'
// name: 'Nigeria', iso2: 'NG'
// name: 'Niue', iso2: 'NU'
// name: 'Norfolk Island', iso2: 'NF'
// name: 'Northern Mariana Islands', iso2: 'MP'
// name: 'Norway', iso2: 'NO'
// name: 'Oman', iso2: 'OM'
// name: 'Pakistan', iso2: 'PK'
// name: 'Palau', iso2: 'PW'
// name: 'Palestinian Territory Occupied', iso2: 'PS'
// name: 'Panama', iso2: 'PA'
// name: 'Papua New Guinea', iso2: 'PG'
// name: 'Paraguay', iso2: 'PY'
// name: 'Peru', iso2: 'PE'
// name: 'Philippines', iso2: 'PH'
// name: 'Pitcairn Island', iso2: 'PN'
// name: 'Poland', iso2: 'PL'
// name: 'Portugal', iso2: 'PT'
// name: 'Puerto Rico', iso2: 'PR'
// name: 'Qatar', iso2: 'QA'
// name: 'Reunion', iso2: 'RE'
// name: 'Romania', iso2: 'RO'
// name: 'Russia', iso2: 'RU'
// name: 'Rwanda', iso2: 'RW'
// name: 'Saint Helena', iso2: 'SH'
// name: 'Saint Kitts And Nevis', iso2: 'KN'
// name: 'Saint Lucia', iso2: 'LC'
// name: 'Saint Pierre and Miquelon', iso2: 'PM'
// name: 'Saint Vincent And The Grenadines', iso2: 'VC'
// name: 'Saint-Barthelemy', iso2: 'BL'
// name: 'Saint-Martin (French part)', iso2: 'MF'
// name: 'Samoa', iso2: 'WS'
// name: 'San Marino', iso2: 'SM'
// name: 'Sao Tome and Principe', iso2: 'ST'
// name: 'Saudi Arabia', iso2: 'SA'
// name: 'Senegal', iso2: 'SN'
// name: 'Serbia', iso2: 'RS'
// name: 'Seychelles', iso2: 'SC'
// name: 'Sierra Leone', iso2: 'SL'
// name: 'Singapore', iso2: 'SG'
// name: 'Slovakia', iso2: 'SK'
// name: 'Slovenia', iso2: 'SI'
// name: 'Solomon Islands', iso2: 'SB'
// name: 'Somalia', iso2: 'SO'
// name: 'South Africa', iso2: 'ZA'
// name: 'South Georgia', iso2: 'GS'
// name: 'South Sudan', iso2: 'SS'
// name: 'Spain', iso2: 'ES'
// name: 'Sri Lanka', iso2: 'LK'
// name: 'Sudan', iso2: 'SD'
// name: 'Suriname', iso2: 'SR'
// name: 'Svalbard And Jan Mayen Islands', iso2: 'SJ'
// name: 'Swaziland', iso2: 'SZ'
// name: 'Sweden', iso2: 'SE'
// name: 'Switzerland', iso2: 'CH'
// name: 'Syria', iso2: 'SY'
// name: 'Taiwan', iso2: 'TW'
// name: 'Tajikistan', iso2: 'TJ'
// name: 'Tanzania', iso2: 'TZ'
// name: 'Thailand', iso2: 'TH'
// name: 'Togo', iso2: 'TG'
// name: 'Tokelau', iso2: 'TK'
// name: 'Tonga', iso2: 'TO'
// name: 'Trinidad And Tobago', iso2: 'TT'
// name: 'Tunisia', iso2: 'TN'
// name: 'Turkey', iso2: 'TR'
// name: 'Turkmenistan', iso2: 'TM'
// name: 'Turks And Caicos Islands', iso2: 'TC'
// name: 'Tuvalu', iso2: 'TV'
// name: 'Uganda', iso2: 'UG'
// name: 'Ukraine', iso2: 'UA'
// name: 'United Arab Emirates', iso2: 'AE'
// name: 'United Kingdom', iso2: 'GB'
// name: 'United States', iso2: 'US'
// name: 'United States Minor Outlying Islands', iso2: 'UM'
// name: 'Uruguay', iso2: 'UY'
// name: 'Uzbekistan', iso2: 'UZ'
// name: 'Vanuatu', iso2: 'VU'
// name: 'Vatican City State (Holy See)', iso2: 'VA'
// name: 'Venezuela', iso2: 'VE'
// name: 'Vietnam', iso2: 'VN'
// name: 'Virgin Islands (British)', iso2: 'VG'
// name: 'Virgin Islands (US)', iso2: 'VI'
// name: 'Wallis And Futuna Islands', iso2: 'WF'
// name: 'Western Sahara', iso2: 'EH'
// name: 'Yemen', iso2: 'YE'
// name: 'Zambia', iso2: 'ZM'
// name: 'Zimbabwe', iso2: 'ZW'
// name: 'Kosovo', iso2: 'XK'
// name: 'Curaçao', iso2: 'CW'
// name: 'Sint Maarten (Dutch part)', iso2: 'SX'