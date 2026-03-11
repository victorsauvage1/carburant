
async function search(){

let city = document.getElementById("city").value;

let url = "https://api.prix-carburants.etalab.gouv.fr/search/?q=" + city;

let response = await fetch(url);
let data = await response.json();

let results = document.getElementById("results");
results.innerHTML = "";

if(!data.results){
results.innerHTML = "<p>Aucun résultat</p>";
return;
}

data.results.forEach(station => {

let div = document.createElement("div");
div.className = "station";

div.innerHTML = `
<h3>${station.name || "Station"}</h3>
<p>${station.address || ""}</p>
<p class="price">${station.price || "N/A"} €</p>
`;

results.appendChild(div);

});

}
