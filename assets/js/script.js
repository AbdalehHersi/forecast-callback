var searchFormEl = document.querySelector("#search-form");
var historyUl = document.querySelector("#history");
var APIKey ="88f31d759146685c209d6a2df9bae9d2";
var previousCities = [];

function handleSearchFormSubmit(event){
    event.preventDefault();

    var city = document.querySelector('#search-input').value;
    if (city){
        getAPI(city);
    } else {
        alert("Please enter a city");
        return handleSearchFormSubmit;
    };
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getAPI(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    console.log(queryURL);
    fetch(queryURL)
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWeather(data);
            })
        } else {
            alert("Sorry that city was " + response.statusText);
        }
    })
};



function displayWeather(data){
    console.log(data);
}

// function storeCity(){
//     previousCities.push(city);
//     console.log(previousCities);
// }

// var button = document.createElement("button");
// button.classList.add("btn", "text-center", "btn-lg", "btn-outline-secondary");
// button.textContent = "test";
// historyUl.append(button);