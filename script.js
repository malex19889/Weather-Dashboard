// $("#searchBtn").on("click", function () {
//   event.preventDefault();
//   var city = $("#search").val();
//   console.log(city);
//   var queryURL = "http://api.openweathermap.org/data/2.5/uvi/weather?q=" + city + "&units=imperial&APPID=5d8fc476fadf80408832e74b2c7ff757";
//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     console.log(response);
//     var info = response
//     $("#current-city").text(response.name)
//     $("#current-temp").text("Temp: "+response.main.temp)
//     $("#current-humid").text("Humidity: "+response.main.humidity)
//     $("#current-wind").text("Wind Speed: "+response.wind.speed)
//     $("#current-uv")
//   });
// });
$("#searchBtn").on("click", function () {
  event.preventDefault();
  var city = $("#search").val();
  console.log(city);
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=5d8fc476fadf80408832e74b2c7ff757";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    for (var i = 0; i < response.list.length;) {
        console.log(response.list[i]);
       // create 5 day forcast cards
       var forecastCard = $("<div>");
       var date = $("<h5>");
       var icon = $("<img>");
       var temp = $("<p>");
       var humidity = $("<p>");
      // add text and class to card elements
       var iconCode = response.list[i].weather[0].icon;
       var iconUrl = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png"
      forecastCard.addClass("card bg-primary text-white p-3");
      date.text(response.list[i].dt_txt)
      icon.attr("src",iconUrl)
      temp.text(response.list[i].main.temp)
      humidity.text(response.list[i].main.humidity)
      // append card elemnts to html
      $("#forecast").append(forecastCard)
      forecastCard.append(date)
      forecastCard.append(icon)
      forecastCard.append(temp)
      forecastCard.append(humidity)
        i = i+8;
      }
  });
});

function renderCards() {
   
}