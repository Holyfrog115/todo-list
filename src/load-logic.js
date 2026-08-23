import { addNewProject } from "./update-page.js";
import { loadProject } from "./load-page.js";

let hidden = false;

function loadLogic(projectsData) {
    loadSidebarLogic(projectsData);
    selectProjects(projectsData);
}


function loadSidebarLogic(projectsData) {
    loadNewProjectForm(projectsData);
    loadHideButton(projectsData);
}


function loadNewProjectForm(projectsData) {
    const addProjectBtn = document.querySelector("#new-project");
    const newProjectDialog = document.querySelector("#new-project-dialog");
    const newProjectForm = document.querySelector("#new-project-form");
    const cancelBtn = document.querySelector('button[value="cancel"]');
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
        
        console.log(projectTitle);

        if (!projectTitle) {
            event.preventDefault();
            return;
        }

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

export default loadLogic;