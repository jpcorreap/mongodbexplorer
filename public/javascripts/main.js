function showCollections() {
  const elementSelection = document.getElementById("databaseSelection");
  const dbName = elementSelection.value;
  const dbSize = elementSelection.getAttribute("data-search");

  console.log("Seleccionó la base de datos " + "'" + dbName + "'");
  //console.log("La base de datos ", dbName, " pesa ", dbSize);
  window.location.replace("/database/" + dbName);
}
