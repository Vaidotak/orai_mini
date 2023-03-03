let apiKey = "3caf575b23a52e649f756f432846ed3e";
let lang = "lt"; 
let units = "metric";
let city = "";

let cityName = document.getElementById("city");
let searchButton = document.getElementById("search");

cityName.value = localStorage.getItem("miestas");

if (localStorage.getItem("miestas") != null) {
  if (localStorage.getItem("miestas").length) {
    getDataFromApi();
  }
}

searchButton.addEventListener("click", getDataFromApi);

function getDataFromApi() {
  city = cityName.value.trimEnd();
  localStorage.setItem("miestas", city);

  cityName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      getDataFromApi();
    }
  });

  let url =
    "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" +
    city +
    "&units=" +
    units +
    "&lang=" +
    lang +
    "&appid=" +
    apiKey;

  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      showWeatherInDom(data);
    });
}

function showWeatherInDom(data) {
    if (data.cod === "200") {
    const temperatura = Math.round(data.list[0].main.temp);
    const vejasSpeed = Math.round(data.list[0].wind.speed);
    const vejasGust = Math.round(data.list[0].wind.gust);
    const orasWeather = data.list[0].weather[0].description.toUpperCase();
    const orasFeelsLike = Math.round(data.list[0].main.feels_like);
    const slegis = data.list[0].main.pressure;
    const slegisGrnd = data.list[0].main.grnd_level;
    const weatherIcon = data.list[0].weather[0].icon;
    const iconUrl =
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
      weatherIcon +
      ".svg";
console.log(data.list)
    function getCardinalDirection(angle) {
      const directions = ["↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
      return directions[Math.round(angle / 45) % 8];
    }
    
    const windDirect = getCardinalDirection(data.list[0].wind.deg);

    // paleidžiu pagrindinį konteinerį
    domContainer(data);

    // sukuriami papildomi blokai ateities temperatūrai parodyti
    showWeather2days(1, 20, 2);

    function domContainer(data) {
      const container = document.createElement("div");
      container.setAttribute("id", "container");
      const konteineriukas = container.classList
      konteineriukas.add("konteineriukas");
      
      // prieš appendinant ištrinamas ankstesnis sukurtas konteineris
      if (document.getElementById("container")) {
        document.getElementById("container").remove();
      }

      document.body.appendChild(container);

      const containerH1 = document.createElement("H1");
      containerH1.innerText = data.city.name.toUpperCase() + ` `+ feelsSign.toLowerCase() +
      ` ` +
      orasFeelsLike +
      ` ` +
      tempSign;
      container.prepend(containerH1);

      const containerHeader = document.createElement("div");
      containerHeader.setAttribute("id", "container-header");
      containerHeader.style.display = "flex";
      containerHeader.style.alignItems = "center";
      container.appendChild(containerHeader);

      const infoWeather = document.createElement("H2");
      infoWeather.style.padding = "2%";
      infoWeather.innerHTML = orasWeather;
      container.appendChild(infoWeather);

const tempDabar = document.createElement("H2");
tempDabar.style.padding = "1%";
tempDabar.setAttribute("id", "tempnow");

const slegisPazemiui = document.createTextNode(
    langPressure +
    "\n" + // Pridedame naują eilutę
    slegisGrnd +
    ` hPa`
);

tempDabar.appendChild(slegisPazemiui);
container.appendChild(tempDabar);

      const vejas = document.createElement("H2");
      vejas.className = "vejas";
      vejas.style.padding = "1%";
      //vejas.style.marginBottom = "2%";
      vejas.innerHTML =
        windSpeed +
        ` ` +
        vejasSpeed +
        ` ` +
        mS +
        ` ` +
        windDirect +
        ` ` +
        ` ` +
        gusT +
        ` ` +
        vejasGust +
        ` ` +
        mS;
      container.appendChild(vejas);

      const img = document.createElement("img");
      img.className = "top-img";
      img.style.textAlign = "center";
      //img.style.width = '20vw'
      img.src = iconUrl;
      containerHeader.prepend(img);

      // Temperatūra. Pagrindinis rodmuo
      const tempDabarBig = document.createElement("div");
      tempDabarBig.setAttribute("id", "temp-big");
      tempDabarBig.style.padding = "2%";
      tempDabarBig.classList.add("pagrindine-temperatura");
      tempDabarBig.innerHTML = temperatura + `` + tempSign;
      containerHeader.appendChild(tempDabarBig);
    }
  } else {
    alert("kazkas negerai, patikrinti konsole");
    console.log("Kazkas negerai", data);
  }

  function showWeather2days(indexReiksme, indexIlgis, indexPlius) {
    for (let i = indexReiksme; i < indexIlgis; i += indexPlius) {
      let formatdateString = "ddd, MMMM DD, HH:mm";
      let formatdateString1 = "LLL";
      let trueFutureDate = moment(data.list[i].dt_txt)
        .locale("lt")
        .format(formatdateString);

      const temperaturaMin = Math.round(data.list[i].main.temp_min);
      const temperaturaMax = Math.round(data.list[i].main.temp_max);
  
      const futureWeatherIcon = data.list[i].weather[0].icon;
      const futureIconUrl =
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
        futureWeatherIcon +
        ".svg";
      futureWeatherIcon;
      const futureWeather = document.createElement("div");
      futureWeather.className = "future-weather";
      const futureWeatherLeft1 = document.createElement("div");
      futureWeatherLeft1.setAttribute("id", "futureWeatherLeft1");
      //futureWeatherLeft1.style.color = "grey";
      //futureWeatherLeft1.style.fontSize = "2.2vh";
      futureWeatherLeft1.classList.add("future-weather1");
      futureWeatherLeft1.innerHTML = trueFutureDate;
      futureWeather.appendChild(futureWeatherLeft1);

      const futureWeatherLeft2 = document.createElement("div");
      futureWeatherLeft2.setAttribute("id", "futureWeatherLeft2");
      futureWeatherLeft2.style.display = "flex";
      futureWeatherLeft2.style.justifyContent = "center";
      futureWeather.appendChild(futureWeatherLeft2);

      const futureimg = document.createElement("img");
      futureimg.setAttribute("id", "futureimg");
      futureimg.style.textAlign = "center";
      futureimg.src = futureIconUrl;
      futureWeatherLeft2.prepend(futureimg);
      console.log(data.list[i].weather[0].description);

      const futureWeatherRight1 = document.createElement("div");
      futureWeatherRight1.setAttribute("id", "futureWeatherRight1");
      //futureWeatherRight1.style.backgroundColor = "#FFF7DF";
      futureWeatherRight1.style.minWidth = "22%";
      futureWeatherRight1.style.display = "flex";
      futureWeatherRight1.style.justifyContent = "center";
      futureWeatherRight1.style.color = "grey";
      //futureWeatherRight1.style.fontFamily = 'fantasy'
      futureWeatherRight1.style.alignItems = "center";
      futureWeatherRight1.innerHTML =
        Math.round(data.list[i].main.temp) + ` ` + tempSign;
      futureWeather.appendChild(futureWeatherRight1);
      const futureWeatherRight2 = document.createElement("div");
      futureWeatherRight2.setAttribute("id", "futureWeatherRight2");
      futureWeatherRight2.style.minWidth = "22%";
      futureWeatherRight2.style.display = "flex";
      futureWeatherRight2.style.justifyContent = "center";
      futureWeatherRight2.style.alignItems = "center";
      futureWeatherRight2.style.color = "grey";
      futureWeatherRight2.innerHTML =
        Math.round(data.list[i].wind.speed) +
        ` ` +
        mS +
        ` ` +
        getCardinalDirection(data.list[i].wind.deg);
      futureWeather.appendChild(futureWeatherRight2);
      const vejosKryptis = futureWeather.classList
      vejosKryptis.add("vejosKryptis");
      document.getElementById("container").appendChild(futureWeather);
    }
  }
}
let feelsSign = "JUTIMINĖ";
let windSpeed = "VĖJO GREITIS";
let mS = "m/s";
let gusT = "GŪSIAIS";
let tempSign = "°C";
let windSpeedImperial = "mph";
let langPressure = "atmosferos slėgis žemės paviršiuje";

let infodiv = document.createElement("div");
infodiv.className = "alert";
infodiv.innerHTML =
  "Labas! Paieškos laukelyje įvesk miestą, kurio temperatūrą nori sužinoti";

document.body.append(infodiv);
setTimeout(() => infodiv.remove(), 3000);

function createDate(dt, type) {
  let day = new Date(dt * 1000);
  if (type == "long") {
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    console.log(day.toLocaleString("lt-LT", options));
    return day.toLocaleString("lt-LT", options);
  } else {
    return day.toLocaleString("lt-LT", { weekday: "long" });
  }
}
