window.onload = function () {
  var cityUserInput = document.querySelector(".userinput");
  var cityName = document.querySelector('.cityname');
  var temprature = document.querySelector('.temprature-value');
  var weatherDescription = document.querySelector('.weather-description');
  var cloudsPercent = document.querySelector('.cloudspercent');
  var searchButton = document.querySelector('.searchbtn');
  var icon = document.querySelector('.weather-icon');
  var apiKey = "33bb4b857e441736ff840b48683a28bd";
  var todaysDate = document.querySelector('.dmy');
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var daysinShort = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var today = new Date();
  var day = days[today.getDay()];
  var date = today.getDate();
  var month = months[today.getMonth() + 1];
  var year = today.getFullYear();


  let setValues = () => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityUserInput.value + "&units=metric&appid=" + apiKey)
      .then(response => response.json())
      .then(weatherData => {
        var tempValue = weatherData['main']['temp'];
        var nameValue = weatherData['name'];
        var descValue = weatherData['weather'][0]['main'];
        var cloudpercent = weatherData['clouds']['all'];
        var iconValue = weatherData['weather'][0]['icon'];
        cityName.innerHTML = nameValue;
        temprature.innerHTML = Math.round(tempValue) + "°";
        weatherDescription.innerHTML = descValue;
        cloudsPercent.innerHTML = cloudpercent + "% Clouds";
        icon.src = "https://openweathermap.org/img/wn/" + iconValue + ".png";
        cityUserInput.value = "";
      })
      .catch(err => alert("Wrong city name!"));

  }

  let setFutureWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityUserInput.value + "&units=metric&appid=" + apiKey)
      .then(response => response.json())
      .then(forecastData => {
        const weeklytempvals = [];
        const weeklyiconvals = [];
        const weeklydayvals = [];
        for (let i = 5; i <= 40; i = i + 8) {
          var weeklyTempValuesArr = Math.round(forecastData['list'][i + 2]['main']['temp']);
          var weeklyIconValsArr = forecastData['list'][i + 2]['weather'][0]['icon'];
          var weeklyDayValsArr = (forecastData['list'][i + 2]['dt_txt']).slice(0, 10);
          weeklytempvals.push(weeklyTempValuesArr);
          weeklyiconvals.push(weeklyIconValsArr);
          weeklydayvals.push(weeklyDayValsArr);
        }
        // console.log(weeklydayvals);
        const weeklyDayvalupdated = [];
        for (let k = 0; k < weeklydayvals.length; k++) {
          const dayvalue = new Date(weeklydayvals[k]);
          const weekday = dayvalue.getDay();
          weeklyDayvalupdated.push(weekday);
        }
        for (let j = 0; j < weeklytempvals.length; j++) {
          document.querySelector('.weeklyTempval-' + j).innerHTML = weeklytempvals[j] + "°";
          document.querySelector('.weeklyIconval-' + j).src = "https://openweathermap.org/img/wn/" + weeklyiconvals[j] + ".png";
          document.querySelector('.weeklyDayval-'+j).innerHTML = daysinShort[weeklyDayvalupdated[j]];
        }
      })
      .catch(err => console.log(err));
  }

  window.onload = function () {
    setValues('chennai');
    setFutureWeather('chennai');
  }
  cityUserInput.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      setValues();
      setFutureWeather();
    }
  });

  searchButton.addEventListener("click", function () {
    setValues();
    setFutureWeather();
  });





  var currentAllData = day + ", " + month + " " + date + ", " + year;

  todaysDate.innerHTML = currentAllData;


}

