import "./styles.css";
import ProjectsData from "./projects-data.js";
import loadMain from "./load-page.js";


class main {
    constructor() {
        this.projectsData = new ProjectsData();
    }

    start() {
        loadMain();
    }
}