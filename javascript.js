let input =document.querySelector(".input"); 
let add =document.querySelector(".add");
let tasks =document.querySelector(".tasks");
let arrayOfTasks=[]; // array that stores the tasks

// if local storage have items get these items
if(localStorage.getItem("tasks")){
    arrayOfTasks =JSON.parse(localStorage.getItem("tasks"));
}
getdataFromLocalStorage();  // draw this items in the page 



//add task button
add.onclick=function(){
    if(input.value != ""){
        addTasksToArray(input.value);
        input.value=""; // after add the task i clear the input field
    }
}


// events delete and update
tasks.addEventListener("click" ,(e)=>{
    
    //remove button
    if(e.target.classList.contains("del")){
        deletetask(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    //when click on task it will be completed
    if(e.target.classList.contains("task")){
        completedOrNot(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
})



// function that add tasks to array and to the local storage then draw it in the page
function addTasksToArray(taskText){
    const mytask={ // object that contains task data
        id : Date.now(),
        title : taskText,
        completed : false,
    };
    arrayOfTasks.push(mytask);
    addElementsToTasksDiv(arrayOfTasks);
    addTasksToLocalStorage(arrayOfTasks);
}



// add tasks to the empty div tasks in the page
function addElementsToTasksDiv(arrayOfTasks){
    tasks.innerHTML="";
    arrayOfTasks.forEach((element) => {
        let div=document.createElement("div") ;
        div.className="task";
        // if enter on the task
        if(element.completed){
            div.className="task done";
        }
        div.setAttribute("data-id",element.id); 
        div.appendChild(document.createTextNode(element.title));

        let span=document.createElement("span");
        span.className="del";
        span.appendChild(document.createTextNode("delete  x"));

        div.appendChild(span);

        tasks.appendChild(div);
    });
}



function addTasksToLocalStorage(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}



function getdataFromLocalStorage(){
    let data =window.localStorage.getItem("tasks");
    if(data){
        let tasks=JSON.parse(data);
        addElementsToTasksDiv(tasks);
    }
}


function deletetask(taskid){
    arrayOfTasks=arrayOfTasks.filter((element)=>element.id != taskid);
    addTasksToLocalStorage(arrayOfTasks);
}


//function that save the status of task if completed or not
function completedOrNot(taskid){
    for(let i=0 ;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id ==taskid){
            arrayOfTasks[i].completed ==false? (arrayOfTasks[i].completed=true) : (arrayOfTasks[i].completed=false);
        }
    }
    addTasksToLocalStorage(arrayOfTasks);
}


function deleteall(){
    tasks.innerHTML="";
    localStorage.clear();
    arrayOfTasks=[];
}