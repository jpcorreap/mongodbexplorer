alert("HOLA");

function showRecords() {
  const colName = document.getElementById("collectionSelection").value;
  console.log("Seleccionó la collection " + "'" + colName + "'");

  window.location.replace(window.location.pathname + "/collection/" + colName);
}
