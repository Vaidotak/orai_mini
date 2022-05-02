let apiKey = '3caf575b23a52e649f756f432846ed3e' // jusu api key
let lang = 'lt' // kalba
let units = 'metric' // naudojama metrine sistema
let city = '' // miestas irasytas inpute

let cityName = document.getElementById('city')
let searchButton = document.getElementById('search')

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener('click', getDataFromApi)

// funkcija kuri gauna duomenis is API
function getDataFromApi() {
    // paimu irasyta miesta is input ir nustatau
    city = cityName.value

    // url yra skirtas pasiimti duomenis is api
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city +
        '&units=' + units +
        '&lang=' + lang +
        '&appid=' + apiKey

    // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
    fetch(url)
        .then(response => response.json())
        // data => jusu kodas
        .then(function (data) {
            //paduodu gautus duomenis i funkcija
            showWeatherInDom(data)
        });
}

// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
    // tikrinu ar mano response yra geras
    if (data.cod === '200') {
        // data tai duomenys, kuriuos mes padavem i funkcija
        // cia atvaizduojam gautus duomenis DOM'e

        // sekantys zingsniai:
        // 1. susikurti div
        // 2. susirinkti is objekto reikiamus duomenis pavyzdiui:
        // miesto pavadinima, laika, oro apibudinima (description)
        //  temperatura min, max

        // cia nustatom icon code is gautu duomenu, kad nustatyi iconCode pirma reikes gautame
        // objekte susirasti icon
        // let iconCode = '';
        // let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'

        console.log(data)
    } else {
        alert('kazkas negerai, patikrinti konsole')
        console.log('Kazkas negerai',data)
    }

}
