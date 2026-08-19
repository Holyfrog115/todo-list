import TodoFolder from "./todo-folder.js";

class ProjectsData {
    constructor() {
        this.projects = [];
        this.inbox = new TodoFolder("Inbox");
        this.today = new TodoFolder("Today");
    }

    createProject(title) {
        this.projects.push(new TodoFolder(title));
    }

    deleteProject(id) {
        // ...
    }
}

export default ProjectsData;