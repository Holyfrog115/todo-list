import { format, isToday, isYesterday, isTomorrow } from "date-fns"; 
import { completeProjectLoad, openDetailsWindowListener } from "./load-logic.js";


function loadPage(projectsData) {
    // Loads whole page

    loadSidebar(projectsData);
}


function loadSidebar(projectsData) {
    // Loads sidebar

    const inbox = document.querySelector("#navigation-main li:first-of-type");
    inbox.dataset.id = projectsData.inbox.id;
    inbox.classList.add("selected-project");
    const inboxCounter = document.querySelector("#inbox-tasks-counter");
    inboxCounter.textContent = projectsData.inbox.todosAmount;

    const today = document.querySelector("#navigation-main li:last-of-type");
    today.dataset.id = projectsData.today.id;
    const todayCounter = document.querySelector("#today-tasks-counter");
    todayCounter.textContent = projectsData.today.todosAmount;


    const ul = document.querySelector("#projects-list");
    ul.replaceChildren();
    for (const project of projectsData.projects) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z"/></svg>`;
        
        const folderName = document.createElement("div");
        folderName.textContent = project.title;
        folderName.classList.add("folder-name");

        const tasksCounter = document.createElement("div");
        tasksCounter.textContent = project.todosAmount;
        tasksCounter.classList.add("tasks-counter");

        listItem.append(folderName, tasksCounter);
        listItem.dataset.id = project.id;
        ul.appendChild(listItem);
    }
}


function loadProject(project, projectsData) {
    // Loads Main content with tasks

    const deletionBtn = document.querySelector("#delete-project");
    deletionBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-440v-80h560v80H200Z"/></svg> Delete Project`;
    deletionBtn.classList.remove("confirm-deletion");

    if (project.title == "Inbox" || project.title == "Today") {
        const addTaskBtn = document.querySelector("#add-task");
        const deleteProjectBtn = document.querySelector("#delete-project");
        const renameProjectBtn = document.querySelector("#rename-project");
        deleteProjectBtn.classList.add("hidden");
        addTaskBtn.classList.add("hidden");
        renameProjectBtn.classList.add("hidden");
    }
    else {
        const addTaskBtn = document.querySelector("#add-task");
        const deleteProjectBtn = document.querySelector("#delete-project");
        const renameProjectBtn = document.querySelector("#rename-project"); 
        deleteProjectBtn.classList.remove("hidden");
        addTaskBtn.classList.remove("hidden");
        renameProjectBtn.classList.remove("hidden");
    }

    const projectTitle = document.querySelector("#header-block h2");
    projectTitle.textContent = project.title;

    const activeItems = document.querySelector("#active-items");
    if (project.isSearching) {
        activeItems.textContent = `Showing ${project.searchedTodosAmount} items out of ${project.todosAmount} total`;
    }
    else {
        activeItems.textContent = `Showing ${project.todosAmount} active items`;
    }

    const pendingTasks = document.querySelector("#pending-tasks ul");
    pendingTasks.replaceChildren();
    const completedTasks = document.querySelector("#completed-tasks ul")
    completedTasks.replaceChildren();

    const todos = project.isSearching ? project.searchingTodos : project.todosList;
    
    for (const item of todos) {
        if (item.isCompleted) {
            addTodoItem(project, item, completedTasks, projectsData);
        }
        else {
            addTodoItem(project, item, pendingTasks, projectsData);
        }
    }
}

function addTodoItem(project, item, list, projectsData) {
    const leftPart = document.createElement("div");
    leftPart.classList.add("left");

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    if (item.isCompleted) {
        checkBox.checked = true;
    }

    // Task's completion status change
    checkBox.addEventListener("click", (event) => {
        const itemId = event.target.parentElement.parentElement.dataset.id;
        const itemFolder = projectsData.getProject(projectsData.inbox.getItem(itemId).projectId);

        itemFolder.getItem(itemId).changeCompletionStatus();
        projectsData.inbox.getItem(itemId).changeCompletionStatus();
        if (isToday(itemFolder.getItem(itemId).dueDate)) {
            projectsData.today.getItem(itemId).changeCompletionStatus();
        }

        completeProjectLoad(project, projectsData);
    });

    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");

    const taskTitle = document.createElement("h4");
    taskTitle.classList.add("title");
    taskTitle.textContent = item.title;

    const todoData = document.createElement("div");
    todoData.classList.add("todo-data");

    const projectName = document.createElement("div");
    projectName.classList.add("project-name");
    projectName.textContent = projectsData.getProject(item.projectId).title;

    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date");

    if (!item.isCompleted) {
        if (isToday(item.dueDate)) {
            dueDate.textContent = "Today";
            dueDate.classList.add("today-date");
        }
        else if (isYesterday(item.dueDate)) {
            dueDate.textContent = "Yesterday";
        }
        else if (isTomorrow(item.dueDate)) {
            dueDate.textContent = "Tomorrow";
        }
        else {
            dueDate.textContent = format(item.dueDate, "MMM d");
        }
    }
    else {
        dueDate.textContent = format(item.dueDate, "yyyy/MM/dd");
    }
    

    todoData.append(projectName, dueDate);
    todoContainer.append(taskTitle, todoData);
    leftPart.append(checkBox, todoContainer);

    const rightPart = document.createElement("div");
    rightPart.classList.add("right");

    const priority = document.createElement("div");
    if (!item.isCompleted) {
        priority.classList.add("priority");
        switch(item.priority) {
            case 1:
                priority.classList.add("low");
                priority.textContent = "LOW";
                break;
            case 2:
                priority.classList.add("medium");
                priority.textContent = "MED";
                break;
            case 3:
                priority.classList.add("high");
                priority.textContent = "HIGH";
                break;
        }
    }

    const moreBtn = document.createElement("button");
    moreBtn.classList.add("more-btn");
    moreBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>`;

    const moreOptionsMenu = document.createElement("div");
    moreOptionsMenu.classList.add("more-options-menu");

    const detailsBtn = document.createElement("button");
    detailsBtn.classList.add("details-button");
    detailsBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M423.5-703.5Q400-727 400-760t23.5-56.5Q447-840 480-840t56.5 23.5Q560-793 560-760t-23.5 56.5Q513-680 480-680t-56.5-23.5ZM420-120v-480h120v480H420Z"/></svg> More Details`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-button");
    editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg> Edit Task`;

    const deletionBtn = document.createElement("button");
    deletionBtn.classList.add("deletion-button");
    deletionBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> Delete Item`;

    moreOptionsMenu.append(detailsBtn, editBtn, deletionBtn);

    moreBtn.addEventListener("click", (event) => {
        const moreOptions = event.target.parentElement.querySelector(".more-options-menu");
        const dropdowns = document.querySelectorAll(".more-options-menu");
        dropdowns.forEach(dropdown => {
            if (dropdown != moreOptions){
                dropdown.classList.remove("visible");
            }
        });
        moreOptions.classList.toggle("visible");
    });

    rightPart.append(priority, moreBtn, moreOptionsMenu);

    const itemList = document.createElement("li");
    itemList.dataset.id = item.id;
    openDetailsWindowListener(itemList, projectsData);
    if (item.isSelected) {
        itemList.classList.add("selected");
    }
    itemList.append(leftPart, rightPart);

    list.appendChild(itemList);
}


function loadTaskDetails(itemId, projectsData) {
    // Loads task's details

    const item = projectsData.selectedProject.getItem(itemId);

    const projectTitle = document.querySelector(".task-details #project-title");
    projectTitle.textContent = projectsData.getProject(item.projectId).title;
    
    const taskTitle = document.querySelector(".task-details #task-title");
    taskTitle.textContent = item.title;

    const taskDescription = document.querySelector(".task-details #task-description");
    taskDescription.textContent = item.description;

    const taskdueDate = document.querySelector(".task-details #due-date-value");
    taskdueDate.textContent = format(item.dueDate, "yyyy/MM/dd");

    const taskPriority = document.querySelector(".task-details #priority-value");
    taskPriority.classList.remove("high", "medium", "low", "none");

    switch (item.priority) {
        case 3:
            taskPriority.textContent = "HIGH";
            taskPriority.classList.add("high");
            break;
        case 2:
            taskPriority.textContent = "MED";
            taskPriority.classList.add("medium");
            break;
        case 1:
            taskPriority.textContent = "LOW";
            taskPriority.classList.add("low");
            break;
        default:
            taskPriority.textContent = "NONE";
            taskPriority.classList.add("none");
    } 

    const taskSubtaskHeader = document.querySelector(".task-details #subtask-header");
    taskSubtaskHeader.textContent = `SUBTASKS (${item.completedCheckListItems}/${item.checkList.length})`;

    const subtasks = document.querySelector(".task-details .subtask-section ul");
    subtasks.replaceChildren();
    for (const subtask of item.checkList) {
        const li = document.createElement("li");
        li.classList.add("subtask");
        if (subtask.isCompleted) {
            li.classList.add("completed");
        }
        li.dataset.id = subtask.id;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (li.classList.contains("completed")) {
            checkbox.checked = true;
        }
        checkbox.addEventListener("click", () => {
            item.changeCheckListItemCompletion(subtask.id);
            taskSubtaskHeader.textContent = `SUBTASKS (${item.completedCheckListItems}/${item.checkList.length})`;
            li.classList.toggle("completed");
        });

        const subtaskTitle = document.createElement("h4");
        subtaskTitle.classList.add("subtask-title");
        subtaskTitle.textContent = subtask.title;

        const deletionBtn = document.createElement("button");
        deletionBtn.classList.add("delete-subtask-btn");
        deletionBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
        deletionBtn.addEventListener("click", (event) => {
            const subtaskId = event.target.parentElement.dataset.id;
            const itemId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
            const item = projectsData.selectedProject.getItem(itemId);
            item.deleteCheckListItem(subtaskId);
            loadTaskDetails(itemId, projectsData);
        });

        li.append(checkbox, subtaskTitle, deletionBtn);
        subtasks.append(li);
    }
}


export { loadProject, loadTaskDetails };
export default loadPage;