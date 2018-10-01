var mymap            = L.map('mapid');
var popup            = L.popup();
var latlngs          = Array();
var limpar           = document.getElementById('limpar')
var desenharLinha    = document.getElementById('desenharLinhas')
var download         = document.getElementById('download')

limpar.onclick              = function() {
   mymap.eachLayer(function(layer){
      mymap.removeLayer(layer)
  });
  latlngs = Array()
  getLocation()
};
desenharLinha.onclick              = function() {
   if(latlngs.length < 2){
      alert("insira ao menos dois pontos para desenhar")
   }else{
      desenharLinhas()
   }
};
download.onclick              = function() {
   donwloadPontos()
};
function getLocation() {
   if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(showPosition);
   } else {
       x.innerHTML = "Geolocation is not supported by this browser.";
   }
}
function showPosition(position) {
   console.log(position)
   mymap = mymap.setView([position.coords.latitude, position.coords.longitude], 13);
   L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
   maxZoom: 18,
   id: 'mapbox.streets',
   accessToken: 'pk.eyJ1IjoiamNzYWxpbm8iLCJhIjoiY2ptcGtpaTlqMWdiZDNxcGswdGJ4dmQwayJ9.khYLDAmDeN5P6tfiVzJNiA'
   }).addTo(mymap);

   
   mymap.on('click', onMapClick);
}
function onMapClick(e) {
   console.log(e)
   var mark = L.marker([ e.latlng.lat, e.latlng.lng],{draggable: true}).addTo(mymap);
   latlngs.push(mark.getLatLng());
    
}
function connectTheDots(data){
   var c = [];
   for(var i in data._layers) {
       var x = data._layers[i]._latlng.lat;
       var y = data._layers[i]._latlng.lng;
       c.push([x, y]);
   }
   return c;
}
function desenharLinhas(){
   console.log(latlngs)
   L.polyline(latlngs, {color: 'blue'}).addTo(mymap);
}
function donwloadPontos(){
   if(latlngs.length >= 1){
      var pontos = ""
      latlngs.forEach(element => {
         pontos += "["+element.lat+","+element.lng+"],"+String.fromCharCode(13)+String.fromCharCode(10)
      });
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";

      var json = JSON.stringify(pontos),
         blob = new Blob([pontos], {type: "text/plain;charset=utf-8"}),
         url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "pontos.txt";
      a.click();
      window.URL.revokeObjectURL(url);
   }else{
      alert("Marque ao menos 1 ponto no mapa")
   }
}
getLocation()