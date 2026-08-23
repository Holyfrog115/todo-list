import { addNewProject, updateSidebarCounters, removeProject } from "./update-page.js";
import { loadProject } from "./load-page.js";

let hidden = false;

function loadLogic(projectsData) {
    loadSidebarLogic(projectsData);
    selectProjects(projectsData);
    loadMainContentLogic(projectsData);
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
    const confirmBtn = document.querySelector("#confirmBtn");

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
            loadProject(projectsData.selectedProject);
        });
    });
}


function selectInboxProject(projectsData) {
    const inbox = document.querySelector("#navigation-main li:first-of-type");
    inbox.classList.add("selected-project");
    projectsData.selectedProject = inbox.dataset.id;
    loadProject(projectsData.selectedProject);
}


// Main content

function loadMainContentLogic(projectsData) {
    addTask(projectsData);
    projectDeletion(projectsData);
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
        projectsData.selectedProject.addItem(taskTitle, taskDescription, taskDueDate, taskPriority);
        loadProject(projectsData.selectedProject);
        updateSidebarCounters(projectsData);
    });
}


function projectDeletion(projectsData) {
    const deleteProjectBtn = document.querySelector("#delete-project");

    deleteProjectBtn.addEventListener("click", () => {
        removeProject(projectsData.selectedProject);
        projectsData.deleteProject(projectsData.selectedProject.id);
        selectInboxProject(projectsData);
    });
}

export default loadLogic;