import { format, isToday, isYesterday, isTomorrow } from "date-fns"; 


function loadPage(projectsData) {
    // Loads whole page

    loadSidebar(projectsData);
    loadProject(projectsData.selectedProject);
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


function loadInbox(projectsData) {
    let totalItems = 0;
    
    for (const project of projectsData.projects) {
        totalItems += project.todosAmount;

        loadProject(project);
    }

    const projectTitle = document.querySelector("#header-block h2");
    projectTitle.textContent = projectsData.inbox.title;

    const activeItems = document.querySelector("#active-items");
    activeItems.textContent = `Showing ${totalItems} active items`;
}


function loadToday(projectsData) {
    let totalItems = 0;
    
    for (const project of projectsData.projects) {
        // TODO
        
    }

    const projectTitle = document.querySelector("#header-block h2");
    projectTitle.textContent = projectsData.today.title;
}


function loadProject(project) {
    // Loads Main content with tasks

    const projectTitle = document.querySelector("#header-block h2");
    projectTitle.textContent = project.title;

    const activeItems = document.querySelector("#active-items");
    activeItems.textContent = `Showing ${project.todosAmount} active items`

    const pendingTasks = document.querySelector("#pending-tasks ul");
    pendingTasks.replaceChildren();
    const completedTasks = document.querySelector("#completed-tasks ul")
    completedTasks.replaceChildren();
    
    for (const item of project.todosList) {
        if (item.isCompleted) {
            addTodoItem(project, item, completedTasks);
        }
        else {
            addTodoItem(project, item, pendingTasks);
        }
    }
}

function addTodoItem(project, item, list) {
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
        project.getItem(itemId).changeCompletionStatus();
        loadProject(project);
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
    projectName.textContent = project.title;

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

    rightPart.append(priority, moreBtn);

    const itemList = document.createElement("li");
    itemList.dataset.id = item.id;
    itemList.append(leftPart, rightPart);

    list.appendChild(itemList);
}


function loadTaskDetails() {
    // Loads task's details

}


export { loadProject };
export default loadPage;