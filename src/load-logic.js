import { addNewProject, updateSidebarCounters, removeProject, deleteItem, updateSidebarTitles } from "./update-page.js";
import { loadProject } from "./load-page.js";
import { isToday } from "date-fns";

let hidden = false;

function loadLogic(projectsData) {
    loadInbox(projectsData);
    loadToday(projectsData);
    loadSidebarLogic(projectsData);
    selectProjects(projectsData);
    loadMainContentLogic(projectsData);
    selectInboxProject(projectsData);
    loadRenameProjectForm(projectsData);
    loadSortButtons(projectsData);
}

// Sidebar

function loadSidebarLogic(projectsData) {
    loadNewProjectForm(projectsData);
    loadHideButton(projectsData);
}


function loadNewProjectForm(projectsData) {
    const addProjectBtn = document.querySelector("#new-project");
    const newProjectDialog = document.querySelector("#new-project-dialog");
    const newProjectForm = document.querySelector("#new-project-form");
    const cancelBtn = document.querySelector('#new-project-form button[value="cancel"]');

    addProjectBtn.addEventListener("click", () => {
        newProjectDialog.showModal();
    });

    cancelBtn.addEventListener("click", (event) => {
        newProjectDialog.close();
        newProjectForm.reset();
    });

    newProjectForm.addEventListener("submit", (event) => {
        const formData = new FormData(newProjectForm);
        const projectTitle = formData.get("projectTitle").trim();

        newProjectForm.reset();
        projectsData.createProject(projectTitle);
        addNewProject(projectsData.projects.at(-1), hidden);
        selectProjects(projectsData);
    });
}


function loadRenameProjectForm(projectsData) {
    const renameProjectBtn = document.querySelector("#rename-project");
    const renameProjectDialog = document.querySelector("#rename-project-dialog");
    const renameProjectForm = document.querySelector("#rename-project-form");
    const cancelBtn = document.querySelector('#rename-project-form button[value="cancel"]');
    const inputElement = document.querySelector('#rename-project-form input[type="text"]');

    renameProjectBtn.addEventListener("click", () => {
        renameProjectDialog.showModal();
        inputElement.value = projectsData.selectedProject.title;
    });

    cancelBtn.addEventListener("click", (event) => {
        renameProjectDialog.close();
        renameProjectForm.reset();
    });

    renameProjectForm.addEventListener("submit", (event) => {
        const formData = new FormData(renameProjectForm);
        const projectTitle = formData.get("projectTitle").trim();

        renameProjectForm.reset();
        projectsData.selectedProject.title = projectTitle;
        completeProjectLoad(projectsData.selectedProject, projectsData);
        updateSidebarTitles(projectsData);
    });
}


function loadHideButton(projectsData) {
    const hideBtn = document.querySelector("#hide-projects");

    hideBtn.addEventListener("click", () => {
        hideBtn.classList.toggle("hidden");

        const toHide = document.querySelectorAll("#projects-tree nav li");
        toHide.forEach(project => {
            project.classList.toggle("hidden-project");
        });

        hidden = !hidden;
    });
}


function selectProjects(projectsData) {
    const projects = document.querySelectorAll("#sidebar li");
    projects.forEach(project => {
        project.addEventListener("click", (event) => {
            // Removing class from current selected element
            
            const selected = document.querySelector(".selected-project");
            selected.classList.remove("selected-project");

            project.classList.add("selected-project");
            projectsData.selectedProject = project.dataset.id;
            completeProjectLoad(projectsData.selectedProject, projectsData);
        });
    });
}


function selectInboxProject(projectsData) {
    const inbox = document.querySelector("#navigation-main li:first-of-type");
    inbox.classList.add("selected-project");
    projectsData.selectedProject = inbox.dataset.id;
    completeProjectLoad(projectsData.inbox, projectsData);
}


// Main content

function loadMainContentLogic(projectsData) {
    addTask(projectsData);
    projectDeletion(projectsData);
    deselectMoreOptions();
}


function addTask(projectsData) {
    const addTaskBtn = document.querySelector("#add-task");
    const newTaskDialog = document.querySelector("#new-task-dialog");
    const newTaskForm = document.querySelector("#new-task-form");
    const cancelBtn = document.querySelector('#new-task-form button[value="cancel"]');

    addTaskBtn.addEventListener("click", () => {
        newTaskDialog.showModal();
    });

    cancelBtn.addEventListener("click", (event) => {
        newTaskDialog.close();
        newTaskForm.reset();
    });

    newTaskForm.addEventListener("submit", (event) => {
        const formData = new FormData(newTaskForm);
        const taskTitle = formData.get("taskTitle").trim();
        const taskDueDate = new Date(formData.get("taskDueDate"));
        const taskPriority = +formData.get("taskPriority");
        const taskDescription = formData.get("taskDescription");

        newTaskForm.reset();
        // Adding to current project
        projectsData.selectedProject.addItem(taskTitle, taskDescription, taskDueDate, taskPriority);

        // Adding to inbox folder
        projectsData.inbox.addDetailedItem(projectsData.selectedProject.id, projectsData.selectedProject.todosList.at(-1).id, taskTitle, taskDescription, taskDueDate, taskPriority, [], false);
        

        // Adding to today folder
        if (isToday(taskDueDate)) {
            projectsData.today.addDetailedItem(projectsData.selectedProject.id, projectsData.selectedProject.todosList.at(-1).id, taskTitle, taskDescription, taskDueDate, taskPriority, [], false);
        }

        sortProject(projectsData.selectedProject, projectsData);
        sortProject(projectsData.inbox, projectsData);

        completeProjectLoad(projectsData.selectedProject, projectsData);
        updateSidebarCounters(projectsData);
    });
}


function projectDeletion(projectsData) {
    const deleteProjectBtn = document.querySelector("#delete-project");

    deleteProjectBtn.addEventListener("click", () => {
        if (deleteProjectBtn.classList.contains("confirm-deletion")) {
            removeProject(projectsData.selectedProject);
            projectsData.deleteProject(projectsData.selectedProject.id);
            loadInbox(projectsData);
            loadToday(projectsData);
            selectInboxProject(projectsData);
        }
        else {
            deleteProjectBtn.classList.add("confirm-deletion");
            deleteProjectBtn.textContent = "Confirm Deletion";
        }
    });
}


function deselectMoreOptions() {
    // Adds event listener to window object to deselect more options menu after clicking away
    
    window.addEventListener("click", (event) => {
        if (!event.target.matches(".more-btn") && !event.target.matches(".more-options-menu")) {
            const dropdowns = document.querySelectorAll(".more-options-menu");
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("visible");
            });
        }
    });
}


function deleteButtons(projectsData) {
    // Logic for delete todo item button

    const deletionBtns = document.querySelectorAll(".deletion-button");
    deletionBtns.forEach(button => {
        button.addEventListener("click", (event) => {
            const itemId = event.target.parentElement.parentElement.parentElement.dataset.id;
            const itemFolder = projectsData.getProject(projectsData.inbox.getItem(itemId).projectId);

            itemFolder.deleteItem(itemId);
            projectsData.inbox.deleteItem(itemId);
            if (isToday(projectsData.selectedProject.getItem(itemId).dueDate)) {
                projectsData.today.deleteItem(itemId);
            }

            updateSidebarCounters(projectsData);
            deleteItem(projectsData, itemId);
        });
    });
}


function loadInbox(projectsData) {
    // Loads Inbox folder with all todos in memory

    projectsData.inbox.emptyTodoList();
    
    for (const project of projectsData.projects) {
        for (const item of project.todosList) {
            // Add item with exact same properties
            projectsData.inbox.addDetailedItem(item.projectId, item.id, item.title, item.description, item.dueDate, item.priority, item.checkList, item.isCompleted);
        }
    }

    const sidebarTasksCounter = document.querySelector("#inbox-tasks-counter");
    sidebarTasksCounter.textContent = projectsData.inbox.todosAmount;

    sortProject(projectsData.inbox, projectsData);
}


function loadToday(projectsData) {
    // Loads Today folder with all todos with today's due date in memory
    
    projectsData.today.emptyTodoList();

    for (const project of projectsData.projects) {
        for (const item of project.todosList) {
            // Add item with exact same properties
            if (isToday(item.dueDate)) {
                projectsData.today.addDetailedItem(item.projectId, item.id, item.title, item.description, item.dueDate, item.priority, item.checkList, item.isCompleted);
            }
        }
    }

    const sidebarTasksCounter = document.querySelector("#today-tasks-counter");
    sidebarTasksCounter.textContent = projectsData.today.todosAmount;
}


function loadSortButtons(projectsData) {
    const sortBtns = document.querySelectorAll(".sort-options li");

    sortBtns.forEach(sortBtn => {
        sortBtn.addEventListener("click", (event) => {
            const currentSortBtn = document.querySelector(".sort-options .selected");
            if (currentSortBtn) {
                currentSortBtn.classList.remove("selected");
            }
            event.target.classList.add("selected");

            switch(event.target.id) {
                case "due-date":
                    projectsData.sortMode = 0;
                    break;
                case "name":
                    projectsData.sortMode = 1;
                    break;
                case "priority":
                    projectsData.sortMode = 2;
                    break;
                case "project":
                    projectsData.sortMode = 3;
                    break;
            }

            completeProjectLoad(projectsData.selectedProject, projectsData);
        });
    });
}


function sortProject(project, projectsData) {
    switch(projectsData.sortMode) {
        case 0:
            project.sortByDueDate();
            break;
        case 1:
            project.sortByName();
            break;
        case 2:
            project.sortByPriority();
            break;
        case 3:
            project.sortByProject(projectsData);
            break;
    }   
}


function completeProjectLoad(project, projectsData) {
    // Loads project and everything it needs to work properly

    sortProject(project, projectsData);
    loadProject(project, projectsData);
    deleteButtons(projectsData);
}


export { completeProjectLoad };
export default loadLogic;