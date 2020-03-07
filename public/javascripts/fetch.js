// Code taken from https://github.com/jpcorreap/smartscheduler/blob/master/public/scripts/fetch.js
const thead = document.getElementById("recordsTableHead");
const tbody = document.getElementById("recordsTableBody");

function cleanTBody() {
  let child = tbody.lastElementChild;
  while (child) {
    tbody.removeChild(child);
    child = tbody.lastElementChild;
  }
}

function cleanTHead() {
  let child = thead.lastElementChild;
  while (child) {
    thead.removeChild(child);
    child = thead.lastElementChild;
  }
}

const render = records => {
  cleanTBody();

  if (!(Array.isArray(records) && records.length))
    // Condition taked from https://www.geeksforgeeks.org/check-if-an-array-is-empty-or-not-in-javascript/
    console.log("Colección vacía");
  else {
    // Stores all keys of first record. It will be so usefull
    const keys = Object.keys(records[0]);

    // Creates header's tr
    let tr = document.createElement("tr");
    keys.forEach(column => {
      let th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.textContent = column;
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    // Creates a table row for each register
    records.forEach(register => {
      console.log(register, typeof register);
      let tr = document.createElement("tr");

      // Iterates over record's values
      for (const item in register) {
        const td = document.createElement("td");
        td.textContent = register[item];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });
  }
  document.getElementById("records").style.visibility = "visible";

  console.log("Lo que llegó aquí fue ", records);
};

function viewRecords() {
  let colName = document.getElementById("colNameMachete").innerHTML;
  console.log("Entró, entró, entró a viewRecords de index.js");
  fetch(colName + "/records")
    .then(req => req.json())
    .then(data => render(data));
}
