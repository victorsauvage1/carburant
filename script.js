
let map = L.map('map').setView([48.8566,2.3522], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap'
}).addTo(map);

async function search(){

let city = document.getElementById("city").value;

let url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=" + city + "&rows=20";

let response = await fetch(url);
let data = await response.json();

displayStations(data.records);
}

function displayStations(records){

let results = document.getElementById("results");
results.innerHTML = "";

if(!records || records.length === 0){
results.innerHTML = "<p>Aucune station trouvée</p>";
return;
}

records.forEach(station=>{

let info = station.fields;

if(!info.geom) return;

let lat = info.geom[0];
let lon = info.geom[1];

let marker = L.marker([lat,lon]).addTo(map);

marker.bindPopup(info.adresse || "Station");

let div = document.createElement("div");
div.className="station";

div.innerHTML=`
<h3>${info.adresse || "Station"}</h3>
<p>${info.ville || ""}</p>
<p class="price">Diesel : ${info.prix_gazole || "N/A"} €</p>
`;

results.appendChild(div);

});

}

function locate(){

if(!navigator.geolocation){
alert("Géolocalisation non supportée");
return;
}

navigator.geolocation.getCurrentPosition(pos=>{

let lat = pos.coords.latitude;
let lon = pos.coords.longitude;

map.setView([lat,lon],12);

L.marker([lat,lon]).addTo(map).bindPopup("Vous êtes ici").openPopup();

});

}
