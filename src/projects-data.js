import TodoFolder from "./todo-folder.js";

class ProjectsData {
    #idProject = {};
    #selectedProject;
    constructor() {
        this.projects = [];
        this.inbox = new TodoFolder("Inbox");
        this.today = new TodoFolder("Today");
        this.#selectedProject = this.inbox;
        this.#idProject[this.inbox.id] = this.inbox;
        this.#idProject[this.today.id] = this.today;
    }

    createProject(title) {
        this.projects.push(new TodoFolder(title));
        this.#idProject[this.projects.at(-1).id] = this.projects.at(-1);
    }

    deleteProject(id) {
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].id == id) {
                this.projects.splice(i, 1);
                break;
            }
        }
    }

    getProject(id) {
        return this.#idProject[id];
    }

    set selectedProject(id) {
        this.#selectedProject = this.#idProject[id];
    }

    get selectedProject() {
        return this.#selectedProject;
    }
}

export default ProjectsData;