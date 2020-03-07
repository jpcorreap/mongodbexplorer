// Code taken from https://github.com/jpcorreap/smartscheduler/blob/master/public/scripts/fetch.js
const thead = document.getElementById("recordsTableHead");
const tbody = document.getElementById("recordsTableBody");
const form = document.getElementById("insertForm");
const colName = document.getElementById("colNameMachete").innerHTML;
let keys = {};

const renderForm = () => {
  for (let i = 1; i < keys.length; i++) {
    let key = keys[i];

    let div1 = document.createElement("div");
    div1.setAttribute("class", "form-group");

    let div2 = document.createElement("div");
    div2.setAttribute("class", "row");

    let label = document.createElement("label");
    label.setAttribute("class", "col");
    label.textContent = key + ":";

    let input = document.createElement("input");
    input.setAttribute("id", key);
    input.setAttribute("class", "form-control col");
    input.setAttribute("type", "text");
    input.setAttribute("name", key);
    input.setAttribute("placeholder", "Enter " + key);

    div2.appendChild(label);
    div2.appendChild(input);
    div1.appendChild(div2);
    form.appendChild(div1);
  }

  let btn = document.createElement("button");
  btn.setAttribute("onclick", "submitInformation()");
  btn.setAttribute("class", "btn btn-primary");
  btn.textContent = "Insert into " + colName + " collection.";

  form.appendChild(btn);
  document.getElementById("card").style.visibility = "visible";
};

/**
 * Displays data in a table
 * @param {Less than 20 records taken from selected collection} records
 */
const render = records => {
  if (!(Array.isArray(records) && records.length))
    // Condition taked from https://www.geeksforgeeks.org/check-if-an-array-is-empty-or-not-in-javascript/
    console.log("Colección vacía");
  else {
    // Stores all keys of first record. It will be so usefull
    keys = Object.keys(records[0]);

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
      let tr = document.createElement("tr");

      // Iterates over record's values
      for (const item in register) {
        const td = document.createElement("td");
        td.textContent = register[item];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    });

    renderForm();
  }
  document.getElementById("records").style.visibility = "visible";
};

// Function taked from https://docs.mongodb.com/manual/reference/method/db.collection.count
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const submitInformation = () => {
  let obj = {};

  for (let i = 1; i < keys.length; i++) {
    let key = keys[i];
    obj[key] = document.getElementById(key).value;
    //console.log("Got value ", key, obj[key]);
  }

  let text = JSON.stringify(obj);
  console.log(text);
  text = text.replace('"[', "[");
  text = text.replace(']"', "]");

  console.log("Se va a mandar el query ", text);

  fetch(colName + "/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: text
  });

  // Sleeps two seconds to update table
  sleep(2000).then(() => window.location.replace(colName));
};

/**
 * Kind of main function
 * It executes client render for table and form
 */
function viewRecords() {
  fetch(colName + "/records")
    .then(req => req.json())
    .then(data => render(data));
}
