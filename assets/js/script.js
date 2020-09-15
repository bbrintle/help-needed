var fahrenheit, humidity, windSpeed, log, lat, uvURL, newCityObject, cityName;

var cityInput = $("#city-input");
var searchBtn = document.getElementById("searchBtn");
var currentCityArray = [];



function clearSearchInput(){
    cityInput.val("");
};

function pullAPI(cityName){

    var APIKey = "07a5be9b6278338d5fd01e132774742f"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + '&appid=' + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            newCityObject = getLocationWeatherData(response);
            //uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + APIKey + '&lat=' + lat + '&lon=' + log;
            //var uvIndex = getUVIndexData(uvURL);
            //console.log(uvIndex);
            return newCityObject;
        });
};

function getLocationWeatherData(element){
    fahrenheit = ((element.main.temp - 273.15) * (9/5) + 32).toFixed(2);
    humidity = element.main.humidity;
    windSpeed = element.wind.speed + " MPH";
    log = element.coord.lon;
    lat = element.coord.lat;
    cityName = element.name;

    var cityObject = {
        cityName: cityName,
        fahrenheit: fahrenheit,
        humidity: humidity,
        windSpeed: windSpeed,
        log: log,
        lat: lat
    }
    displayWeatherInfo(cityObject);
    clearSearchInput();
};

function displayWeatherInfo(cityObject){
    var cityText = $('#city-text');
    cityText.text(cityObject.cityName + " (" +  moment().format('MM/DD/YYYY') + ")");

    var displayTemp = $('#display-temp');
    displayTemp.text("Tempreature: " + cityObject.fahrenheit + " °F");

    var displayHumid = $('#display-humidity');
    displayHumid.text("Humidity: " + cityObject.humidity);

    var displayWindSpeed= $('#display-wind-speed');
    displayWindSpeed.text("Wind Speed: " + cityObject.windSpeed);
}

searchBtn.addEventListener('click', function() {
    if(cityInput.val()){
        if(currentCityArray.indexOf(cityInput.val()) !== -1){
            //do nothing because it is already on the list.
        }else {

            currentCityArray.push(cityInput.val());
            var newCityDiv = document.createElement('div');
            newCityDiv.textContent = cityInput.val();
            newCityDiv.classList.add('city-box');
            $("#city-list").append(newCityDiv);

            //call the API infromation using the city name from input/box value
            pullAPI(cityInput.val())
            pull5DayAPI(cityInput.val())
        }
    }else{
        //do nothing
    }
});

function pull5DayAPI(cityName){

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=07a5be9b6278338d5fd01e132774742f";
    var numOfForecastBoxes = 0;

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
            //display first forcasted day
            for (var i = 0; numOfForecastBoxes < 5; i += 8){
                var newForecastDiv = $("<div>");
                var daysOut = response.list[i].dt_txt.slice(0,10);
                var getDate = daysOut.slice(5, -3) + "/" + daysOut.slice(8) + "/" + daysOut.slice(0,4);
                var dateElement = $("<h5>");
                dateElement.text(getDate);
                newForecastDiv.append(dateElement);
                newForecastDiv.attr("class", "forecast-box");
                $("#display-forecast").append(newForecastDiv);
                numOfForecastBoxes++
            }
                
        });
};


// function getUVIndexData(uvURL){
//     $.ajax({
//         url: uvURL,
//         method: "GET"
//     }).then(function(response){ 
//         console.log(response.value)
//         return response.value;
//     });
// }