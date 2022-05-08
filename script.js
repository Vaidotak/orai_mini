let apiKey = "3caf575b23a52e649f756f432846ed3e"; // jusu api key
let lang = "lt"; // kalba
let units = "metric"; // naudojama metrine sistema
let city = ""; // miestas irasytas inpute

let cityName = document.getElementById("city");
let searchButton = document.getElementById("search");

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener("click", getDataFromApi);

// funkcija kuri gauna duomenis is API
function getDataFromApi() {
  // paimu irasyta miesta is input ir nustatau
  city = cityName.value;

  // url yra skirtas pasiimti duomenis is api
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

  // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
  fetch(url)
    .then((response) => response.json())
    // data => jusu kodas
    .then(function (data) {
      //paduodu gautus duomenis i funkcija
      showWeatherInDom(data);
    });
}

// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
  // tikrinu ar mano response yra geras
  if (data.cod === "200") {
    // data tai duomenys, kuriuos mes padavem i funkcija
    // cia atvaizduojam gautus duomenis DOM'e
    const temperatura = Math.round(data.list[0].main.temp);
    const vejasSpeed = Math.round(data.list[0].wind.speed);
    const vejasGust = Math.round(data.list[0].wind.gust);
    const orasWeather = data.list[0].weather[0].description.toUpperCase();
    const orasFeelsLike = Math.round(data.list[0].main.feels_like);
    const slegis = data.list[0].main.pressure;
    const weatherIcon = data.list[0].weather[0].icon;
    const iconUrl =
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
      weatherIcon +
      ".svg";

    dom(data);

    function dom(data) {
      const container = document.createElement("div");
      container.setAttribute("id", "container");
      container.style.backgroundColor = "#FEEFC3";
      container.style.minWidth = "400px";
      container.style.maxWidth = "50%";
      container.style.margin = "auto";
      container.style.padding = "2%";
      container.style.opacity = "80%";
      container.style.fontSize = "3vh";

      if (document.getElementById("container")) {
        document.getElementById("container").remove();
      }

      document.body.appendChild(container);

      const containerH1 = document.createElement("H1")
      containerH1.innerText = data.city.name.toUpperCase()
      container.prepend(containerH1)

      const containerHeader = document.createElement("div");
      containerHeader.style.display = "flex";
      containerHeader.style.alignItems = "center";
      container.appendChild(containerHeader);

      const infoWeather = document.createElement("H2");
      infoWeather.style.padding = "2%";
      infoWeather.innerText = orasWeather;
      container.appendChild(infoWeather);

    //   let htmlElements = ""
    //     for (let i = 0; i < 1; i++) {
    //     htmlElements += '<div id="weather">Tekstas1</div>'
        
    //     htmlElements += '<div id="pressure">Tekstas2</div>'
    //     htmlElements += '<div id="wind">Tekstas3</div>'
    //     }
    //     let pirmas = document.getElementById('weather')
    //     pirmas.innerHTML = 'orasWeather'
    //     let containerDiv = document.getElementById("container")
    //     containerHeader.innerHTML = htmlElements

      const population = document.createElement("div")
      population.style.borderRadius = "10px";
     
      population.style.padding = "2%";
      population.style.margin = "2%";
      population.innerHTML = data.city.population
      container.appendChild(population);

      const personImg = document.createElement('img')
      personImg.setAttribute('id', 'personimg')
      const personImgUrl = 'person-solid.svg'
      personImg.src = personImgUrl
      population.appendChild(personImg)

      const windImgUrl = document.createElement('img')
      const PressureImgUrl = document.createElement('img')

      const tempDabar = document.createElement("div");
      tempDabar.style.borderRadius = "10px";
      tempDabar.style.backgroundColor = "#AECBFA";
      tempDabar.style.padding = "2%";
      tempDabar.style.margin = "2%";
      tempDabar.setAttribute("id", "tempnow");
      tempDabar.innerHTML =
        `Juntamoji ` + orasFeelsLike + ` °C, oro slėgis ` + slegis + ` hPa`;
      container.appendChild(tempDabar);

      const vejas = document.createElement("div");
      vejas.style.borderRadius = "10px";
      vejas.style.backgroundColor = "#AECBFA";
      vejas.style.padding = "2%";
      vejas.style.margin = "2%";
      vejas.innerHTML =
        `Vėjo greitis ` +
        vejasSpeed +
        ` m/s.` +
        ` Gūsiais ` +
        vejasGust +
        ` m/s`;
      container.appendChild(vejas);

      const img = document.createElement("img");
      img.style.textAlign = "center";
      img.src = iconUrl;
      containerHeader.prepend(img);

      // Temperatūra. Pagrindinis rodmuo
      const tempDabarBig = document.createElement("div");
      //tempDabarBig.style.borderRadius = '10px'
      tempDabarBig.style.fontSize = "13vh";
      tempDabarBig.style.padding = "2%";
      tempDabarBig.innerHTML = temperatura + ` °C `;
      containerHeader.appendChild(tempDabarBig);
    }

    for (let i = 2; i < 40; i += 4) {
      const futureWeatherIcon = data.list[i].weather[0].icon
      const futureIconUrl =
        "http://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/" +
        futureWeatherIcon +
        ".svg";
      futureWeatherIcon
      const futureWeather = document.createElement("div")
      const futureWeatherLeft1 = document.createElement("div")
      futureWeatherLeft1.setAttribute("id", "futureWeatherLeft1")
      futureWeatherLeft1.style.backgroundColor = "#FFF7DF";
      futureWeatherLeft1.style.minWidth = "22%";
      futureWeatherLeft1.style.fontSize = "2.5vh";
      futureWeatherLeft1.innerHTML = data.list[i].dt_txt
      futureWeather.appendChild(futureWeatherLeft1);
      const futureWeatherLeft2 = document.createElement("div")
      futureWeatherLeft2.setAttribute("id", "futureWeatherLeft2")
      futureWeatherLeft2.style.backgroundColor = "#FFF7DF"
      futureWeatherLeft2.style.display = "flex"
      futureWeatherLeft2.style.justifyContent = "center"
      futureWeather.appendChild(futureWeatherLeft2)

      const futureimg = document.createElement("img");
      futureimg.setAttribute("id", "futureimg");
      futureimg.style.textAlign = "center";
      futureimg.src = futureIconUrl;
      futureWeatherLeft2.prepend(futureimg);

      const futureWeatherRight1 = document.createElement("div");
      futureWeatherRight1.setAttribute("id", "futureWeatherRight1");
      futureWeatherRight1.style.backgroundColor = "#FFF7DF";
      futureWeatherRight1.style.minWidth = "22%";
      futureWeatherRight1.style.display = "flex";
      futureWeatherRight1.style.justifyContent = "center";
      futureWeatherRight1.style.alignItems = "center";
      futureWeatherRight1.innerHTML =
        Math.round(data.list[i].main.temp) + ` °C`;
      futureWeather.appendChild(futureWeatherRight1);
      const futureWeatherRight2 = document.createElement("div");
      futureWeatherRight2.setAttribute("id", "futureWeatherRight2");
      futureWeatherRight2.style.backgroundColor = "#FFF7DF";
      futureWeatherRight2.style.minWidth = "22%";
      futureWeatherRight2.style.display = "flex";
      futureWeatherRight2.style.justifyContent = "center";
      futureWeatherRight2.style.alignItems = "center";
      futureWeatherRight2.innerHTML =
        Math.round(data.list[0].wind.speed) + ` m/s`;
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

      //let naujasArray = data.map(data.list[i])
      //console.log(naujasArray)
      //let tempForecast = data.list[i].dt_txt
      //console.log(tempForecast)
      console.log(data.city.name);
    }
  } else {
    alert("kazkas negerai, patikrinti konsole");
    console.log("Kazkas negerai", data);
  }
}
function searchByLocation() {
  //console.log("searchByLocation()");
}
