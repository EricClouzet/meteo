$(document).ready(function() {
    let dateActuelle = new Date();
   
           let dateLocale = dateActuelle.toLocaleString(navigator.language, {
               weekday: 'long',
               year: 'numeric',
               month: 'long',
               day: 'numeric',
               hour: 'numeric',
               minute: 'numeric',
               second: 'numeric'
           });
   
           $('#dateLocale').text(dateLocale);
           
           var langue = "francais";
   
           var url = 'https://api.openweathermap.org/data/2.5/weather?q=Toulouse&appid=7f42d425391d93110bff703059411d37&units=metric&lang=' + navigator.language;
           var urlAir = 'https://api.waqi.info/feed/toulouse/?token=a82f22c985cbf8e6f455eea670eb8c0226c87c84';
   
           function erreur() {
               pays = "FR";
               recevoirTemperature(url), recevoirAir(urlAir);
           }
   
           let ville = "Toulouse";
           
           $("#anglais").click(() => {
           if(langue == "francais") {
           url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=7f42d425391d93110bff703059411d37&units=metric&lang=en';
               recevoirTemperature(url);
                recevoirAirUk(urlAir);
           $("#anglais").attr("src" , "images/fr.png");
           $("#meteoPour").text("Weather for");
           $("#jour").text("Today ");
           $("#changerVille").text("Change city");
           $("#geo").text("Geolocate me");
           $("#tempRessenti").text("Felt temperature");
           $("#tempMin").text("Minimum temperature");
           $("#tempMax").text("Maximum temperature");
           $("#qualiteAir").text("Air quality");
           langue = "anglais";
           }
               else if (langue == "anglais"){
                   location.reload();
               }
           });
   
           $("#changer").click(() => {
               let ville = prompt("Entrez le nom d'une ville svp");
               $("#iconeLocalisation").fadeOut(500);
               url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=7f42d425391d93110bff703059411d37&units=metric&lang=' + navigator.language;
               urlAir = 'https://api.waqi.info/feed/' + ville + '/?token=a82f22c985cbf8e6f455eea670eb8c0226c87c84';   
               recevoirTemperature(url);
               recevoirAir(urlAir);
           });
   
           window.addEventListener("load", recevoirTemperature(url), recevoirAir(urlAir));
   
           function recevoirTemperature(url) {
               $.ajax({
                   url: url,
                   type: 'GET',
                   dataType: 'json',
                   success: (data) => {
                       $('#temperature_label').text(data.main.temp);
                       $('#temperature_ressenti').text(data.main.feels_like);
                       $('#temperature_minimale').text(data.main.temp_min);
                       $('#temperature_maximale').text(data.main.temp_max);
                       $('#image').attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
                       $('#climat').text(data.weather[0].description);
                       let ville = data.name;
                       $('#ville').text(ville);
                       $('#pays').text(data.sys.country);
                       if (data.sys.country != "FR") {
                           $('#photos').addClass("wrapPhotoAutres");
                       }
                       else {
                          $('#photos').addClass("wrapPhoto");
                       }
                   },
                   error: () => {
                       alert('Un problème est intervenu, merci de revenir plus tard.');
                   }
               });
           }
   
           // POUR L'AIR :
           function recevoirAir(urlAir) {
               $.ajax({
                   url: urlAir,
                   type: 'GET',
                   dataType: 'json',
                   success: (reponse) => {
                       let pm = reponse.data.aqi;
                       $('#pm').text(pm);
   
                       if (pm <= 50) {
                           $("#couleurAir").css({"background-color":"rgba(0, 153, 102, 0.6)","margin-right":"10px"});
                           $("#qualite").text("Bonne");
                       }
                       if (pm > 50 && pm <= 100) {
                           $("#couleurAir").css({"background-color":"rgba(255, 222, 51, 0.6)", "margin-right": "10px"});
                           $("#qualite").text("Moyenne");
                       }
                       if (pm > 100 && pm <= 150) {
                           $("#couleurAir").css({"background-color":"rgba(255, 153, 51, 0.6)","margin-right":"10px"});
                           $("#qualite").text("Malsain pour les groupes sensibles");
                       }
                       if (pm > 150 && pm <= 200) {
                           $("#couleurAir").css({"background-color":"rgba(204, 0, 51, 0.6)","margin-right":"10px"});
                           $("#qualite").text("Malsain, tout le monde peut commencer à ressentir des effets sur la santé");
                       }
                       if (pm > 200 && pm <= 300) {
                           $("#couleurAir").css({"background-color":"rgba(102, 0, 153, 0.6)","margin-right":"10px"});
                           $("#qualite").text("Très malsain, avertissements sanitaires en cas de situation d'urgence");
                       }
                   },
                   error: () => {
                       alert('Un problème est intervenu, merci de revenir plus tard.');
                   }
               });
   
           }
           
   //UK :
           function recevoirAirUk(urlAir) {
               $.ajax({
                   url: urlAir,
                   type: 'GET',
                   dataType: 'json',
                   success: (reponse) => {
                       let pm = reponse.data.aqi;
                       $('#pm').text(pm);
   
                       if (pm <= 50) {
                           $("#couleurAir").css("background-color", "rgba(0, 153, 102, 0.6)");
                           $("#qualite").text("Good, air quality is considered satisfactory");
                       }
                       if (pm > 50 && pm <= 100) {
                           $("#couleurAir").css("background-color", "rgba(255, 222, 51, 0.6)");
                           $("#qualite").text("Moderate, for some pollutants there may be a moderate health concern for a very small number of people");
                       }
                       if (pm > 100 && pm <= 150) {
                           $("#couleurAir").css("background-color", "rgba(255, 153, 51, 0.6)");
                           $("#qualite").text("Unhealthy for Sensitive Groups");
                       }
                       if (pm > 150 && pm <= 200) {
                           $("#couleurAir").css("background-color", "rgba(204, 0, 51, 0.6)");
                           $("#qualite").text("Unhealthy, everyone may begin to experience health effects");
                       }
                       if (pm > 200 && pm <= 300) {
                           $("#couleurAir").css("background-color", "rgba(102, 0, 153, 0.6)");
                           $("#qualite").text("Very Unhealthy, health warnings of emergency conditions");
                       }
                   },
                   error: () => {
                       alert('Un problème est intervenu, merci de revenir plus tard.');
                   }
               });
   
           }
   
           //Geolocalisation :
           $("#btnGeolocalisation").click(() => {
               if ("geolocation" in navigator) {
   
                   navigator.geolocation.getCurrentPosition((position) => {
                       var lon = position.coords.longitude;
                       var lat = position.coords.latitude;
   
                       var url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + lon + '&lat=' + lat + '&appid=7f42d425391d93110bff703059411d37&units=metric&lang=' + navigator.language;
                       var urlAir = 'https://api.waqi.info/feed/geo:' + lat + ';' + lon + '/?token=a82f22c985cbf8e6f455eea670eb8c0226c87c84';
                       $("#iconeLocalisation").fadeIn(500);
                       recevoirTemperature(url), recevoirAir(urlAir);
   
                   }, erreur, options);
               } else {
                   pays = "FR";
                   url = 'https://api.openweathermap.org/data/2.5/weather?q=Toulouse&appid=7f42d425391d93110bff703059411d37&units=metric&lang=' + navigator.language;
                   urlAir = 'https://api.waqi.info/feed/toulouse/?token=a82f22c985cbf8e6f455eea670eb8c0226c87c84';
                   recevoirTemperature(url), recevoirAir(urlAir);
               }
               var options = {
                   enableHighAccuracy: true
               }
           });
   
   });