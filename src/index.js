import "./styles.css";
import ProjectsData from "./projects-data";
import loadMain from "./load-page.js";


class main {
    constructor() {
        this.projectsData = new ProjectsData();
    }

    start() {
        loadMain();
    }
}