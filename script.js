// var for url query section
var city = null;
// array to store search history
var searchHist = ["denver", "new york", "los angeles"];
// create button for history click
var cityHist = $("<button>");
// var to create weather icons
var currIcon = $("<img>");
// var to store weather icon code
var currIconCode = null;
// URL for weather icon
var iconUrl = "https://openweathermap.org/img/wn/" + currIconCode + "@2x.png";
// incrementer for moment.js for 5day forecast
var dayInc = 1;
// var to set current date
var currDate = moment().format("L");
// button click event listner for search
$("#searchBtn").on("click", function () {
  event.preventDefault();
  city = $("#search").val();
  // render history busttons
  renderHist();
  // make call and render current weather for search loacation
  currentWeatherCall();
  // call and render 5 day forecast for search location
  forecastCall();
});
// function to make call and render current weather for search loacation
function currentWeatherCall() {
  $("#curr-icon").empty();
  // set url for current weather API URL
  var weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=5d8fc476fadf80408832e74b2c7ff757";
  $.ajax({
    url: weatherURL,
    method: "GET",
  }).then(function (response) {
    var currIcon = $("<img>");
    var currIconCode = response.weather[0].icon;
    var iconUrl =
      "https://openweathermap.org/img/wn/" + currIconCode + "@2x.png";
    currIcon.attr("src", iconUrl);
    // render current weather section
    $("#curr-icon").append(currIcon);
    $("#current-city").text(response.name + " " + currDate);
    $("#current-temp").text("Temp: " + response.main.temp + "℉");
    $("#current-humid").text("Humidity: " + response.main.humidity + "%");
    $("#current-wind").text("Wind Speed: " + response.wind.speed + " mph");
    // set latitude from current weatehr response
    var lat = response.coord.lat;
    // set longitude from current weather response
    var lon = response.coord.lon;
    // UV index API URL
    uvURL =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&APPID=5d8fc476fadf80408832e74b2c7ff757";
    // call to get uv index
    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (uvResponse) {
      // render uv index text
      $("#current-uv").text("UV Index: " + uvResponse.value);
    });
  });
}
// function to call and render 5 day forecast for search location
function forecastCall() {
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&APPID=5d8fc476fadf80408832e74b2c7ff757";
  $.ajax({
    url: forecastURL,
    method: "GET",
  }).then(function (response) {
    // remove items from forecast section
    $("#forecast").empty();
    // loop to render 5 day forecast cards
    for (var i = 0; i < response.list.length; i = i + 8) {
      // create 5 day forcast card elements
      var forecastCard = $("<div>");
      var date = $("<h5>");
      var icon = $("<img>");
      var temp = $("<p>");
      var humidity = $("<p>");
      // add text and class to card elements
      var iconCode = response.list[i].weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      forecastCard.addClass("card bg-primary text-white p-3");
      // date.text(response.list[i].dt_txt)
      date.text(moment().add(dayInc, "days").format("L"));
      icon.attr("src", iconUrl);
      temp.text("Temp: " + response.list[i].main.temp + "℉");
      humidity.text("Humidity: " + response.list[i].main.humidity + "%");
      // append card elemnts to html
      $("#forecast").append(forecastCard);
      forecastCard.append(date);
      forecastCard.append(icon);
      forecastCard.append(temp);
      forecastCard.append(humidity);
      dayInc++;
    }
  });
}
function renderHist() {
  searchHist.push(city);
  $("#search-history").empty();
  localStorage.setItem("cities", JSON.stringify(searchHist));
  // loop to create search history list
  for (var i = 0; i < searchHist.length; i++) {
    //  create search history elemnt
    var cityHist = $("<div>");
    // Adding list class
    cityHist.addClass("list-group-item list-group-item-action");
    // Add an id for save
    cityHist.attr("id", "searchHist[i]");
    // Add the items text with a value of searchHist at index i
    cityHist.text(searchHist[i]);
    // Add list item to HTML
    $("#search-history").append(cityHist);
  }
}
function load() {
  // get local storage items
  citiesString = localStorage.getItem("cities");
  // parse local storage string back into array
  searchHist = JSON.parse(citiesString);
  // dont run code if LS is empty
  if (searchHist != null) {
    $("#search-history").empty();
    // loop to create search history list from ls
    for (var i = 0; i < searchHist.length; i++) {
      //  create search history elemnt
      var cityHist = $("<div>");
      // Adding list class
      cityHist.addClass("list-group-item list-group-item-action");
      // Add the items text with a value of citiesFromLs at index i
      cityHist.text(searchHist[i]);
      // Add list item to HTML
      $("#search-history").append(cityHist);
    }
    // set citcy to last searched city for on load recall
    city = searchHist[searchHist.length - 1];
    console.log(city);
    currentWeatherCall();
    forecastCall();
  } else {
    searchHist = [""];
  }
}
// load page with last city searched or first time starting page
load();
