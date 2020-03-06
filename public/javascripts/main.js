function showCollections() {
  const dbName = document.getElementById("databaseSelection").value;
  console.log("Seleccionó la base de datos " + "'" + dbName + "'");

  window.location.replace("/set/" + dbName);
}
