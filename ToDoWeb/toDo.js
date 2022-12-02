
const addToDoBtn = document.getElementById("button");
const toDoInput = document.getElementsByTagName("input")[0];
const toDoContainer = document.getElementById("to-do-container-1");
const doneContainer= document.getElementById("done-container-2")
const select = document.getElementById("select")
const local = document.getElementById("local");
const remote = document.getElementById("remote");
let completed = false;

function createToDo(text) {
  const divElement = document.createElement("div");
  divElement.classList.add("to-do-instance");
  const checkBox  = document.createElement("input");
  checkBox.type= "checkbox";

checkBox.addEventListener("click",function(){
  if(checkBox.checked){
  completed=true;
  if( completed===true){
    doneToDo(text);
    divElement.remove();
  }
 }
})

  const pElement = document.createElement("p");
  pElement.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => divElement.remove());

  divElement.appendChild(checkBox);
  divElement.appendChild(pElement);
  divElement.appendChild(deleteBtn);

  toDoContainer.appendChild(divElement);

}
function doneToDo(text) {
  const divDone = document.createElement("div");
  divDone.classList.add("done-instance");

  const checkBox  = document.createElement("input");
  checkBox.type= "checkbox";
  checkBox.checked=true;

  checkBox.addEventListener("click",function(){
    if(!checkBox.checked){
        completed=false;
      if( completed===false){
        createToDo(text);
        divDone.remove();
      }
     }
  })
  const pElement = document.createElement("p");
  pElement.textContent = text +"-"+ new Date().getDate() +"/"+(new Date().getMonth()+1) + "/" + new Date().getFullYear() ;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => divElement.remove());
  divDone.appendChild(checkBox);
  divDone.appendChild(pElement);
  divDone.appendChild(deleteBtn);
  doneContainer.appendChild(divDone);

}

function addToDo() {
  const validText = toDoInput.value.trim();
  if (validText) {
    createToDo(validText);
    toDoInput.value = "";
  }
  else {
    alert("please type in some text");
  }

}

addToDoBtn.addEventListener("click", addToDo);
toDoInput.focus(); 


select.addEventListener("click",function(){
  if(select.value==="Remote ToDo"){
  fetch('https://jsonplaceholder.typicode.com/todos/')
    .then((res) => res.json()).then(data=>{
              data.forEach(el => {
                if(el.id<=10){
                  if(el.completed===false){
                 createToDo(el.title)
            
            
                }else{
                  doneToDo(el.title)
                }}
              })})
}else if (select.value==="Local ToDo"){
  window.location.reload()
}})
