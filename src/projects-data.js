import TodoFolder from "./todo-folder.js";

class ProjectsData {
    #idProject = {};
    #selectedProject;
    #sortMode;
    constructor() {
        this.projects = [];
        this.inbox = new TodoFolder("Inbox");
        this.today = new TodoFolder("Today");
        this.#sortMode = 0;
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

    set sortMode(mode) {
        if (mode < 0 || mode > 3) {
            return;
        }
        else {
            this.#sortMode = mode;
        }
    }

    get sortMode() {
        return this.#sortMode;
    }
}

export default ProjectsData;