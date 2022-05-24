let apiKey = "3caf575b23a52e649f756f432846ed3e"; // mano api key
let lang = "lt"; // kalba
let units = "metric"; // naudojama metrinė sistema
let city = ""; // miestas įrašytas inpute

let cityName = document.getElementById("city")
let searchButton = document.getElementById("search")

// iš local storage paimu vertę ir įdedu į inputą
cityName.value = localStorage.getItem('miestas')

if(localStorage.getItem('miestas') != null){
  if(localStorage.getItem('miestas').length){
    getDataFromApi()
  }
}
// uždedu click eventą ant search mygtuko
searchButton.addEventListener("click", getDataFromApi);

// funkcija, kuri gauna duomenis iš API
function getDataFromApi() {
  // paimu įrašytą miestą iš input ir nustatau
  city = cityName.value.trimEnd();
  
  // išsaugau įvestą miestą į local storage
  localStorage.setItem("miestas", city)
  

  // url yra skirtas pasiimti duomenis iš api
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

  // su fetch funkcija pasiimu duomenis iš api (asinchroninė funkcija)
  fetch(url)
    .then((response) => response.json())
    // data => mano kodas
    .then(function (data) {
      //paduodu gautus duomenis į funkciją
      showWeatherInDom(data);
    });

}

// funkcija, kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
  // tikrinu ar mano response yra geras
  if (data.cod === "200") {
    // data tai duomenys, kuriuos mes padavėm į funkciją
    // čia atvaizduojam gautus duomenis DOM'e
    const temperatura = Math.round(data.list[0].main.temp);
    const temperaturaMin = Math.round(data.list[0].main.temp_min);
    const temperaturaMax = Math.round(data.list[0].main.temp_max);
    const vejasSpeed = Math.round(data.list[0].wind.speed);
    const vejasGust = Math.round(data.list[0].wind.gust);
    console.log(data.list[0].wind.deg)
    const orasWeather = data.list[0].weather[0].description.toUpperCase();
    const orasFeelsLike = Math.round(data.list[0].main.feels_like);
    const slegis = data.list[0].main.pressure;
    const weatherIcon = data.list[0].weather[0].icon;
    const iconUrl =
      "./SVG/" +
      weatherIcon +
      ".svg";

    function getCardinalDirection(angle) {
      const directions = [
        "↓", "↙", "←", "↖", "↑", "↗", "→", "↘"];
      return directions[Math.round(angle / 45) % 8];
    }
    console.log(getCardinalDirection(data.list[0].wind.deg));
    const windDirect = getCardinalDirection(data.list[0].wind.deg);

    // paleidžiu pagrindinį konteinerį
    domContainer(data)

    // sukuriami papildomi blokai ateities temperatūrai parodyti
    showWeather2days(1, 20, 2)

    function domContainer(data) {
      const container = document.createElement("div");
      container.setAttribute("id", "container");
      container.style.backgroundColor = "#FEEFC3";
      container.style.backgroundImage = "url('pattern8@2x.png')";
      //container.style.minWidth = "100%";
      container.style.maxWidth = "60%";
      container.style.margin = "auto";
      container.style.marginTop = "5px"
      container.style.marginBottom = "5px"
      container.style.borderRadius = "10px"
      //container.style.fontFamily = 'fantasy'
      container.style.color = 'dimgray'
      container.style.padding = "2%";
      container.style.opacity = "95%";
      container.style.fontSize = "3vh";

      // prieš appendinant ištrinamas ankstesnis sukurtas konteineris
      if (document.getElementById("container")) {
        document.getElementById("container").remove();
      }

      document.body.appendChild(container);

      const containerH1 = document.createElement("H1")
      containerH1.innerText = data.city.name.toUpperCase()
      container.prepend(containerH1)

      const containerHeader = document.createElement("div");
      containerHeader.setAttribute("id", "container-header");
      containerHeader.style.display = "flex";
      containerHeader.style.alignItems = "center";
      container.appendChild(containerHeader);

      const infoWeather = document.createElement("H2");
      infoWeather.style.padding = "2%";
      infoWeather.innerHTML = orasWeather
      container.appendChild(infoWeather);

      const tempDabar = document.createElement("div");
      tempDabar.style.borderRadius = "10px";
      tempDabar.style.backgroundColor = "#f5f5f5";
      tempDabar.style.color = "#9c8468";
      tempDabar.style.padding = "2%";
      tempDabar.style.marginBottom = "2%";
      tempDabar.style.textAlign = 'start'
      tempDabar.setAttribute("id", "tempnow");
      tempDabar.innerHTML =
        feelsSign + ` ` + orasFeelsLike + ` ` + tempSign + `` + `,` + ` ` + langPressure + ` ` + slegis + ` hPa`;
      container.appendChild(tempDabar);

      const vejas = document.createElement("div");
      vejas.className = "vejas";
      vejas.style.borderRadius = "10px";
      vejas.style.backgroundColor = "#f5f5f5";
      vejas.style.padding = "2%";
      vejas.style.marginBottom = "2%";
      vejas.style.textAlign = 'start'
      vejas.innerHTML =
        windSpeed + ` ` +
        vejasSpeed +
        ` ` + mS + ` ` + windDirect + ` ` + ` ` + gusT + ` ` +
        vejasGust +
        ` ` + mS
      container.appendChild(vejas);

      const img = document.createElement("img");
      img.className = "top-img"
      img.style.textAlign = "center";
      //img.style.width = '20vw'
      img.src = iconUrl;
      containerHeader.prepend(img);

      // Temperatūra. Pagrindinis rodmuo
      const tempDabarBig = document.createElement("div");
      tempDabarBig.setAttribute("id", "temp-big");
      //tempDabarBig.style.fontSize = "15vh";
      tempDabarBig.style.padding = "2%";
      tempDabarBig.classList.add('pagrindine-temperatura')
      tempDabarBig.innerHTML = temperatura + `` + tempSign
      containerHeader.appendChild(tempDabarBig);
    }

  } else {
    alert("kazkas negerai, patikrinti konsole");
    console.log("Kazkas negerai", data);
  }

  function showWeather2days(indexReiksme, indexIlgis, indexPlius) {
    for (let i = indexReiksme; i < indexIlgis; i += indexPlius) {

      //let dateFromApi = '2022-02-02 21:00:00';
      let formatdateString = 'dddd, MMMM DD HH:mm';
      let formatdateString1 = 'LLL';
      let trueFutureDate = moment(data.list[i].dt_txt).locale('lt').format(formatdateString1)
      
      console.log(data.list[i])
      console.log(moment(data.list[i].dt_txt).format(formatdateString))

      const futureWeatherIcon = data.list[i].weather[0].icon
      const futureIconUrl =
        "./animated/" +
        futureWeatherIcon +
        ".svg";
      futureWeatherIcon
      const futureWeather = document.createElement("div")
      futureWeather.className = "future-weather";
      const futureWeatherLeft1 = document.createElement("div")
      futureWeatherLeft1.setAttribute("id", "futureWeatherLeft1")
      futureWeatherLeft1.style.color = 'grey'
      futureWeatherLeft1.style.fontSize = '2.2vh';
      futureWeatherLeft1.classList.add('future-weather1')
      futureWeatherLeft1.innerHTML = trueFutureDate;
      futureWeather.appendChild(futureWeatherLeft1);

      const futureWeatherLeft2 = document.createElement("div")
      futureWeatherLeft2.setAttribute("id", "futureWeatherLeft2")
      futureWeatherLeft2.style.display = "flex"
      futureWeatherLeft2.style.justifyContent = "center"
      futureWeather.appendChild(futureWeatherLeft2)

      const futureimg = document.createElement("img");
      futureimg.setAttribute("id", "futureimg");
      futureimg.style.textAlign = "center";
      futureimg.src = futureIconUrl;
      futureWeatherLeft2.prepend(futureimg)
      console.log(data.list[i].weather[0].description)

      const futureWeatherRight1 = document.createElement("div");
      futureWeatherRight1.setAttribute("id", "futureWeatherRight1");
      //futureWeatherRight1.style.backgroundColor = "#FFF7DF";
      futureWeatherRight1.style.minWidth = "22%";
      futureWeatherRight1.style.display = "flex";
      futureWeatherRight1.style.justifyContent = "center";
      futureWeatherRight1.style.color = 'grey'
      //futureWeatherRight1.style.fontFamily = 'fantasy'
      futureWeatherRight1.style.alignItems = "center";
      futureWeatherRight1.innerHTML =
        Math.round(data.list[i].main.temp) + ` ` + tempSign
      futureWeather.appendChild(futureWeatherRight1);
      const futureWeatherRight2 = document.createElement("div");
      futureWeatherRight2.setAttribute("id", "futureWeatherRight2");
      futureWeatherRight2.style.minWidth = "22%";
      futureWeatherRight2.style.display = "flex";
      futureWeatherRight2.style.justifyContent = "center";
      futureWeatherRight2.style.alignItems = "center";
      futureWeatherRight2.style.color = 'grey'
      futureWeatherRight2.innerHTML =
        Math.round(data.list[i].wind.speed) + ` ` + mS +  ` ` +getCardinalDirection(data.list[i].wind.deg);
      futureWeather.appendChild(futureWeatherRight2);
      futureWeather.style.backgroundColor = "#FFFFFF";
      futureWeather.style.padding = "2px";
      futureWeather.style.margin = "5px";
      futureWeather.style.fontSize = "2.5vh";
      futureWeather.style.display = "flex";
      futureWeather.style.flexBasis = "0";
      futureWeather.style.flexGrow = " 1";
      futureWeather.style.flexShrink = " 1";
      futureWeather.style.columnGap = "10px";
      futureWeather.style.border = "0.1px solid #888888";
      futureWeather.style.justifyContent = "space-evenly";
      document.getElementById("container").appendChild(futureWeather);

    }
  }

}
let feelsSign = 'jutiminė'
let windSpeed = 'vėjo greitis'
let mS = 'm/s'
let gusT = 'gūsiais'
let tempSign = '°C'
let windSpeedImperial = 'mph'
let langPressure = 'slėgis'
document.getElementById('language').addEventListener('change', function () {
  lang = this.value
  if (lang === 'en') {
    feelsSign = 'feels like'
    windSpeed = 'wind speed'
    gusT = 'gust'
    langPressure = 'pressure'
  }
  if (lang === 'ua') {
    feelsSign = 'відчуває, як'
    windSpeed = 'швидкість вітруd'
    mS = 'м/с'
    gusT = 'порив'
    langPressure = 'тиск'
  }
  if (lang === 'lt') {
    feelsSign = 'jutiminė'
    windSpeed = 'vėjo greitis'
    gusT = 'gūsiais'
    langPressure = 'slėgis'
  }
})
document.getElementById('units').addEventListener('change', function () {
  units = this.value
  if (units === 'imperial') {
    tempSign = '°F'
    mS = 'mph'
  }
  if (units === 'standart') {
    tempSign = '°K'
    mS = 'm/s'
  }
  if (units === 'metric') {
    tempSign = '°C'
    mS = 'm/s'
  }
})

let infodiv = document.createElement('div');
  infodiv.className = "alert";
  infodiv.innerHTML = "Labas! Paieškos laukelyje įvesk miestą, kurio temperatūrą nori sužinoti";
      
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
              console.log(day.toLocaleString("lt-LT", options))
              return day.toLocaleString("lt-LT", options)
              
          } else {
              return day.toLocaleString("lt-LT", { weekday: "long" })
          }
      }