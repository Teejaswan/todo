const $ = (id) => document.getElementById(id);

function onadd() {
  let newtask = $("inputbox").value;
  console.log(newtask);
  while (newtask == "") {
    newtask = prompt("Please enter a vaild task below!");
  }

  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  if (taskarr == null) {
    let data = [newtask];
    localStorage.setItem("taskname", JSON.stringify(data));
  } else {
    taskarr.push(newtask);
    localStorage.setItem("taskname", JSON.stringify(taskarr));
  }

  $("inputbox").value = "";
  display();
}

function display() {
  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  let html = "";
  let addedtask = $("tasks");
  taskarr.forEach((element, i) => {
    html += `<li class="task">
        <input type="checkbox"  onclick = "Checkbox(${i})" id="check">
        <p>${element}</p>
        <div class="options">
        <button class="button" onclick="Update(${i})">Update</button>
        <button class="buttond" onclick="Delete(${i})">Delete</button>
        </div>
        </li>`;
  });
  addedtask.innerHTML = html;
}

function Delete(i) {
  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  taskarr.splice(i, 1);
  localStorage.setItem("taskname", JSON.stringify(taskarr));
  display();
}

function Update(i) {
  let updateindex = $("index");
  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  updateindex.value = i;
  $("inputbox").value = taskarr[i];
  $("inputbox").focus();
  $("add").style.display = "none";
  $("save").style.display = "block";
}
function save() {
  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  let updateindex = $("index").value;

  taskarr[updateindex] = $("inputbox").value;
  if (taskarr[updateindex] != "") {
    localStorage.setItem("taskname", JSON.stringify(taskarr));
    $("inputbox").value = "";
  } else {
    alert("Can't save an empty task!");
  }
  $("save").style.display = "none";
  $("add").style.display = "block";

  display();
}
function Clear() {
  let taskarr = JSON.parse(localStorage.getItem("taskname"));
  taskarr = [];
  localStorage.setItem("taskname", JSON.stringify(taskarr));
  display();
}
function Checkbox(i) {
  if ($("check").checked == true) {
    alert("TASK COMPLETED!");
    Delete(i);
  }
}

// Add or Save on enter key press

function onenter({ key }) {
  if (key == "Enter") {
    if (getComputedStyle($("add")).getPropertyValue("display") == "block")
      $("add").click();
    else $("save").click();
  }
}
