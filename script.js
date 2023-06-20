// declaring our variables
const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

// adding Task
const addTask = () => {
    const taskName = newTaskInput.value.trim();

    // error message if the field is empty.
    error.style.display = "none";
    if(!taskName){
        setTimeout( () => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `<div class = "task">
        <input type= "checkbox" class= "task-check">
        <span class= "taskname">${taskName}</span>

        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    taskCount++;
    displayCount(taskCount);
    


    // delete button scripting.
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach( deleteBtn => {
        deleteBtn.onclick = () => {
            deleteBtn.parentNode.remove();
            if(taskCount > 0){
                taskCount--;
            }else{
                taskCount = 0;
            }
            displayCount(taskCount);
        }
    });

    // edit button scripting.
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach( editBtn => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }

            newTaskInput.value = targetElement.
            previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount--;
            displayCount(taskCount);
        }
    });

    // task check scripting
    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach(box => {
        box.onchange = () => {
            box.nextElementSibling.classList.toggle("completed");
            if(box.checked){
                taskCount--;
            }else{
                taskCount++;
            }
            displayCount(taskCount);
        }
    });
    // displayCount(taskCount);
    newTaskInput.value = "";
}


addBtn.addEventListener("click", addTask);





