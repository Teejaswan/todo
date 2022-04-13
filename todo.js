
function onadd(){
    
    let newtask = document.getElementById("inputbox").value;
    console.log(newtask);
    if(newtask == ''){
        alert("Please enter a task!");
    }
    else{
        let taskarr = JSON.parse(localStorage.getItem('taskname'));
        if(taskarr==null){
            let data =[newtask];
            localStorage.setItem('taskname',JSON.stringify(data));
        }
        else{
            taskarr.push(newtask);
            localStorage.setItem('taskname',JSON.stringify(taskarr));
        }
    }
    document.getElementById("inputbox").value='';
    display();
}

function display(){
    let taskarr = JSON.parse(localStorage.getItem('taskname'));
    let html = '';
    let addedtask = document.getElementById("tasks");
    taskarr.forEach((element,i) => {
        html += `<li class="task">
        <input type="checkbox"  onclick = "Checkbox(${i})" id="check">
        <p>${element}</p>
        <div class="options">
        <button class="button" onclick="Update(${i})">Update</button>
        <button class="buttond" onclick="Delete(${i})">Delete</button>
        </div>
        </li>`;
    });
    addedtask.innerHTML=html;
}

function Delete(i){
    let taskarr = JSON.parse(localStorage.getItem('taskname'));
    taskarr.splice(i,1);
    localStorage.setItem('taskname',JSON.stringify(taskarr));
    display();
}

function Update(i){
    let updateindex = document.getElementById("index");
    let taskarr = JSON.parse(localStorage.getItem('taskname'));
    updateindex.value = i;
    document.getElementById("inputbox").value= taskarr[i];
    document.getElementById("add").style.display = "none";
    document.getElementById("save").style.display = "block";
}
function save(){
    let taskarr = JSON.parse(localStorage.getItem('taskname'));
    let updateindex = document.getElementById("index").value;
   
    taskarr[updateindex] = document.getElementById("inputbox").value;
    if(taskarr[updateindex] != ''){
    localStorage.setItem('taskname',JSON.stringify(taskarr));
    document.getElementById("inputbox").value='';
    }
    else{
        alert("Can't save an empty task!");
        
    }
    document.getElementById("save").style.display = "none";
    document.getElementById("add").style.display = "block";

    display();
}
function Clear(){
    let taskarr = JSON.parse(localStorage.getItem('taskname'));
    taskarr = [];
    localStorage.setItem('taskname',JSON.stringify(taskarr));
    display();
}
function Checkbox(i){
    if(document.getElementById("check").checked == true){
        alert("TASK COMPLETED!")
        Delete(i);
    }
}