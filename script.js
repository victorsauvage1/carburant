async function search(){

let city = document.getElementById("city").value;

let url = "https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&q=" + city + "&rows=10";

let response = await fetch(url);

let data = await response.json();

let results = document.getElementById("results");

results.innerHTML = "";

if(!data.records || data.records.length === 0){
results.innerHTML = "<p>Aucune station trouvée</p>";
return;
}

data.records.forEach(station => {

let info = station.fields;

let div = document.createElement("div");

div.className = "station";

div.innerHTML = `
<h3>${info.adresse || "Station"}</h3>
<p>${info.ville || ""}</p>
<p class="price">Diesel : ${info.prix_gazole || "N/A"} €</p>
`;

results.appendChild(div);

});

}
