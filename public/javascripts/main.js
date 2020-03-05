function showCollections() {
  const dbName = $("#databaseSelection").val();
  console.log("Seleccionó la base de datos " + "'" + dbName + "'");

  window.location.replace("http://www.google.com/" + dbName);
}
