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
var h3_1  = document.querySelector("#h3-1");
var h3_2  = document.querySelector("#h3-2");
var h3_3  = document.querySelector("#h3-3");
var h3_4  = document.querySelector("#h3-4");
var h3_5  = document.querySelector("#h3-5");

    //  global variables

function handleSearchFormSubmit(event){
    event.preventDefault(); //  prevent form from reloading page

    var city = document.querySelector('#search-input').value;
    if (city){
        currentCity.textContent = city + " " + currentDate;
        getAPI(city, true);
    } else {
        alert("Please enter a city");
        return handleSearchFormSubmit;
    };
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getAPI(city, isStoreCity){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=metric";
    fetch(queryURL)
    .then(function(response){
        if(response.ok){    // status 200-299
            console.log(isStoreCity)
            if(isStoreCity){
                storeCity(city);
            }
            response.json().then(function(data){        // convert to usable data
                displayWeather(data, queryURL);
            })
        } else {
            alert("Sorry that city was " + response.statusText);
        }
    })
};



function displayWeather(data, queryURL){


    currentHum.textContent = data.main.humidity + "%";
    currentTemp.textContent = data.main.temp + "°C";
    currentWind.textContent = data.wind.speed + " m/s";
    var currentCityLat = data.coord.lat;    //  from first api call
    var currentCityLon = data.coord.lon;
    var queryOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentCityLat + "&lon=" + currentCityLon + "&appid=" + APIKey + "&units=metric";   //  second api call
    var icon = document.querySelector("#wicon");
    var iconCode = data.weather[0].icon;    //  target icon
    var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
    icon.src = iconURL;
    fetch(queryOneCall)
    .then(function(response){
        response.json().then(function(data2){
            currentUVindex.textContent = data2.current.uvi;
            if (currentUVindex.textContent < 2){    //  target css classes to indicate warning colors
                currentUVindex.classList.remove("warning");
                currentUVindex.classList.remove("danger");
                currentUVindex.classList.add("safe");

            } else if (currentUVindex.textContent > 3 && currentUVindex.textContent < 7){
                currentUVindex.classList.remove("safe");
                currentUVindex.classList.remove("danger");
                currentUVindex.classList.add("warning");

            } 
            else if(currentUVindex.textContent < 8){
                currentUVindex.classList.remove("safe");
                currentUVindex.classList.remove("warning");
                currentUVindex.classList.add("danger");
            };
                            //      card 1      //  
            h3_1.textContent = moment(data2.daily[1].dt, "X").format("DD-MM-YYYY");
            var icon1 = document.querySelector("#wicon1");
            var iconCode1 = data2.daily[1].weather[0].icon;
            icon1.src = "http://openweathermap.org/img/w/" + iconCode1 + ".png";
            var temp0 = document.querySelector("#temp-span0");
            temp0.textContent = data2.daily[1].temp.day + "°C";
            var hum0 = document.querySelector("#hum-span0");
            hum0.textContent = data2.daily[1].humidity + "%";
            var wind0 = document.querySelector("#wind-span0");
            wind0.textContent = data2.daily[1].wind_speed + " m/s";
                                        //
                            //      card 2      //
            h3_2.textContent = moment(data2.daily[2].dt, "X").format("DD-MM-YYYY");
            var icon2 = document.querySelector("#wicon2");
            var iconCode2 = data2.daily[2].weather[0].icon;
            icon2.src = "http://openweathermap.org/img/w/" + iconCode2 + ".png";
            var temp1 = document.querySelector("#temp-span1");
            temp1.textContent = data2.daily[2].temp.day + "°C";
            var hum1 = document.querySelector("#hum-span1");
            hum1.textContent = data2.daily[2].humidity + "%";
            var wind1 = document.querySelector("#wind-span1");
            wind1.textContent = data2.daily[2].wind_speed + " m/s";
                                        //
                            //      card 3      //
            h3_3.textContent = moment(data2.daily[3].dt, "X").format("DD-MM-YYYY");
            var icon3 = document.querySelector("#wicon3");
            var iconCode3 = data2.daily[3].weather[0].icon;
            icon3.src = "http://openweathermap.org/img/w/" + iconCode3 + ".png";
            var temp2 = document.querySelector("#temp-span2");
            temp2.textContent = data2.daily[3].temp.day + "°C";
            var hum2 = document.querySelector("#hum-span2");
            hum2.textContent = data2.daily[3].humidity + "%";
            var wind2 = document.querySelector("#wind-span2");
            wind2.textContent = data2.daily[3].wind_speed + " m/s";
                                        //
                            //      card 4      //
            h3_4.textContent = moment(data2.daily[4].dt, "X").format("DD-MM-YYYY");
            var icon4 = document.querySelector("#wicon4");
            var iconCode4 = data2.daily[4].weather[0].icon;
            icon4.src = "http://openweathermap.org/img/w/" + iconCode4 + ".png";
            var temp3 = document.querySelector("#temp-span3");
            temp3.textContent = data2.daily[4].temp.day + "°C";
            var hum3 = document.querySelector("#hum-span3");
            hum3.textContent = data2.daily[4].humidity + "%";
            var wind3 = document.querySelector("#wind-span3");
            wind3.textContent = data2.daily[4].wind_speed + " m/s";
                                        //
                            //      card 5      //
            h3_5.textContent = moment(data2.daily[5].dt, "X").format("DD-MM-YYYY");
            var icon5 = document.querySelector("#wicon5");
            var iconCode5 = data2.daily[5].weather[0].icon;
            icon5.src = "http://openweathermap.org/img/w/" + iconCode5 + ".png";
            var temp4 = document.querySelector("#temp-span4");
            temp4.textContent = data2.daily[5].temp.day + "°C";
            var hum4 = document.querySelector("#hum-span4");
            hum4.textContent = data2.daily[5].humidity + "%";
            var wind4 = document.querySelector("#wind-span4");
            wind4.textContent = data2.daily[5].wind_speed + " m/s";
                                        //
        })
    })    
}

function storeCity(city){
    previousCities.push(city);  //  store list of cities in local storage
    localStorage.setItem("cityArr", JSON.stringify(previousCities));
    displayHistory();
}

function displayHistory(){
    historyUl.textContent = ''; //  empty list
    var storedArr = JSON.parse(localStorage.getItem("cityArr"));
    for (var i = 0; i < storedArr.length; i++){
        var buttonEl = document.createElement("button");
        buttonEl.classList.add("btn", "text-center", "btn-lg", "btn-outline-secondary");
        buttonEl.textContent = storedArr[i];
        historyUl.append(buttonEl);
    }
    document.querySelectorAll(".btn").forEach(item => {
        item.addEventListener('click', function(){
            var city = this.textContent;
            currentCity.textContent = city + " " + currentDate;
            getAPI(city, false);
        })
      })
}

displayHistory();