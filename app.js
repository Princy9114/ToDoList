let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: 'content task 1',
        status: 'doing'
    },
    {
        content: 'content task 2',
        status: 'complete'
    }
];

//check it has data listTask in localstorage
if(localStorage.getItem('listTask') != null){
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

//This function is used to save your task to localstorage so that it will not disappear when reloding the browser
function saveLocalStorage(){
    localStorage.setItem('listTask', JSON.stringify(listTask));
}

btnAdd.onclick = function(event){
    //every time click the create btn the page has a reload add this code to fit it
    event.preventDefault();
    // get data content task you write
    let content = document.getElementById('task').value;
    //we only continue if the content not empty
    if (content != ''){
        //use unshift to add to the beginning of the array
        listTask.unshift({
            content: content,
            status: 'doing'
        })
    }
    // function addTaskToHTML to refresh page
    addTaskToHTML();
    // after adding, delete the content in the form
    document.getElementById('task').value = '';
    //when reload or close the browser, newly added data is not saved
    //because the value in the listTask array is different from the original
    //run the saveLocalStorage function to update data listTask array in localStorage
    saveLocalStorage();
}

//create a function to put task dates out of HTML
function addTaskToHTML(){
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = `
        <div class="complete-icon" onClick="completeTask(${index})">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"/>
            </svg>
            <div class="content">${task.content}</div>
            <div class="close-icon" onClick="deleteTask(${index})">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
            </div>
        </div>`;
        // add new task in class Task
        list.appendChild(newTask);
    })
}
addTaskToHTML();
//when click on compelte icon, run function completeTask to change status of task
//index is order position this task in array
function completeTask(index){
    // i chnage status task in listTask has position index
    listTask[index].status = 'complete';
    //run addTaskToHTML to reload
    addTaskToHTML();
    //every time dates listtask change.
    //please run the savelocalstorage function again so that it saves the new data
    saveLocalStorage();
}

//when click close icon, run delete function 
function deleteTask(index){
    //use filter to filter out tasks loaction is different from the passed index
    listTask = listTask.filter((task, newIndex) => {return newIndex != index});
    addTaskToHTML();
    // run saveLocalStorage to save new data
    saveLocalStorage();
}