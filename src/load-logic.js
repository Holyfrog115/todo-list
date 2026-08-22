import { loadSidebar } from "./load-page.js";

function loadLogic(projectsData) {
    loadSidebarLogic(projectsData);
}


function loadSidebarLogic(projectsData) {
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
        loadSidebar(projectsData);
    });
}


export default loadLogic;