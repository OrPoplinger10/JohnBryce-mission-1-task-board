//========== Catching buttons, form, div, empty array ==========//
const formUser = document.querySelector("form");
const createTask = document.getElementById("buttonOne");
const missionBoard = document.querySelector(".mission-list");
let taskList = []; 
//====== for load on refresh ======//
 taskList = getFromLocal(); 

 //========== Using a click event ==========//
createTask.addEventListener("click", handleCreateTask);

//======= check if local storage is not empty, if so it call to display function and render thr notes to screen =======//
if (taskList !== null) {
    window.onbeforeunload = displayBoardOnScreen(taskList);
  }
//======= Instructions for the click event ======//
function handleCreateTask(event) {
  event.preventDefault();
  const data = getDataFromUser();
  saveInLocalStorage(data);
  displayBoardOnScreen();
  checkEmptyFields();
  formUser.reset();
}

 //====== Get user data from FORM =======//
function getDataFromUser() {
  data = {};
  const formData = new FormData(formUser);
   formData.forEach((value, key) => {
    data[key] = value;
  });
  //====== Give random id for each new task=======//
  const idRandom = Math.floor(Math.random()* 1000000)
   data["ID"] = idRandom;
    return data;
}

//====== Check if the fields is empty =======//
function checkEmptyFields() {
 const formDateField = document.forms["myForm"]["formDate"].value;
 const formHourField = document.forms["myForm"]["formHour"].value;
    if (formDateField === "" ) {
       alert("Please insert date");  
    }
    if (formHourField === "" ) {
      alert("Please insert hour");  
  }
}

//====== Save the data on local storage =======//
function saveInLocalStorage(data) {
    taskList = JSON.parse(localStorage.getItem("taskList")); 
     if (taskList) {
        taskList = [...taskList, data]; 
     } else {
        taskList = [data]; 
     }
     localStorage.setItem("taskList", JSON.stringify(taskList));
  
} 

//====== Get Data Back From Storage to Show =======//
function getFromLocal() {
  taskList = JSON.parse(localStorage.getItem("taskList"));
    return taskList;
}

//====== Show the task board on the screen =======//
function displayBoardOnScreen(taskList) {
  missionBoard.innerHTML = ""; 
  taskList = getFromLocal(); 
   taskList.forEach((mission) => {
  const newCard = createMissionBoard(mission); 
    missionBoard.appendChild(newCard); 
});
}

//====== Create the mission board =======//
function createMissionBoard(data) {
  const newBoard = document.createElement("div");
   newBoard.classList.add("col-5", "mission-card");
   newBoard.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" 
     stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18">
    </line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    <p class = "date">${data.formDate}</p>
     <p class = "hour">${data.formHour}</p>
     <div class ="scroller"
     <p class= "text">${data.diaryMission}</p></div>`;
     newBoard.id =`task-${data.Id}`;
    const deleteBoard = newBoard.firstElementChild;
     deleteBoard.addEventListener("click", () => removeBoard(data));
       return newBoard;
};

//======= The process of deleting a task board from the screen and from the local storage =======//
function removeBoard(data){
 const removeIndex = findMissionWithID(data.id);
 const removeMissionCard = findBoardWithID(data.id);

taskList.splice(removeIndex, 1);
missionBoard.removeChild(removeMissionCard);

const removeStorage = JSON.stringify(taskList) ;
 window.localStorage.setItem("taskList", removeStorage);
}

function findMissionWithID(taskID){
 for (let i = 0; i < taskList.length; i++){
 if(taskList[i].ID == taskID ){
    return i;
}
}
}


function findBoardWithID(taskID){
    return document.querySelector(`#task-${taskID}`);
     

}

