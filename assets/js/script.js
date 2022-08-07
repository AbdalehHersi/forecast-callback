var searchFormEl = document.querySelector("#search-form");
var historyUl = document.querySelector("#history");
var APIKey ="88f31d759146685c209d6a2df9bae9d2";
var previousCities = [];
var currentDate = moment().format("DD-MM-YYYY");
var currentCity = document.querySelector("#currentCity")
var currentTemp  = document.querySelector("#temp-span");
var currentUVindex  = document.querySelector("#uv-span");
var currentWind  = document.querySelector("#wind-span");
var currentHum  = document.querySelector("#hum-span");


function handleSearchFormSubmit(event){
    event.preventDefault();

    var city = document.querySelector('#search-input').value;
    if (city){
        currentCity.textContent = city + " " + currentDate;
        getAPI(city);
    } else {
        alert("Please enter a city");
        return handleSearchFormSubmit;
    };
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getAPI(city){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";
    console.log(queryURL);
    fetch(queryURL)
    .then(function(response){
        if(response.ok){
            storeCity(city);
            response.json().then(function(data){
                displayWeather(data, queryURL);
            })
        } else {
            alert("Sorry that city was " + response.statusText);
        }
    })
};



function displayWeather(data, queryURL){
    console.log(data, queryURL);


    currentHum.textContent = data.main.humidity + "%";
    currentTemp.textContent = data.main.temp + "°C";
    currentWind.textContent = data.wind.speed + " m/s";
    var currentCityLat = data.coord.lat;
    var currentCityLon = data.coord.lon;
    console.log(currentCityLat, currentCityLon);
    var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentCityLat + "&lon=" + currentCityLon + "&appid=" + APIKey;
    console.log(queryOneCall);
    fetch(queryOneCall)
    .then(function(response){
        response.json().then(function(data2){
            currentUVindex.textContent = data2.current.uvi;
            if (currentUVindex.textContent < 2){
                currentUVindex.classList.remove("warning");
                currentUVindex.classList.remove("danger");
                currentUVindex.classList.add("safe");

            } else if (currentUVindex.textContent > 3 && currentUVindex < 7){
                currentUVindex.classList.remove("safe");
                currentUVindex.classList.remove("danger");
                currentUVindex.classList.add("warning");

            } 
            else if(currentUVindex.textContent < 8){
                currentUVindex.classList.remove("safe");
                currentUVindex.classList.remove("warning");
                currentUVindex.classList.add("danger");

            };
        })
    })
    // 
    var icon = document.querySelector("#wicon");
    var iconCode = data.weather[0].icon;
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    console.log(icon);
    icon.src = iconURL;
}

function storeCity(city){
    previousCities.push(city);
    localStorage.setItem("cityArr", JSON.stringify(previousCities));
    displayHistory();
}

function displayHistory(){
    historyUl.textContent = '';
    var storedArr = JSON.parse(localStorage.getItem("cityArr"));
    for (var i = 0; i < storedArr.length; i++){
        console.log(storedArr[i]);
        var buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "text-center", "btn-lg", "btn-outline-secondary");
        buttonEl.textContent = storedArr[i];
        historyUl.append(buttonEl);
    }
    document.querySelectorAll(".btn").forEach(item => {
        item.addEventListener('click', function(){
            var city = this.textContent;
            getAPI(city);
        })
      })
}

displayHistory();