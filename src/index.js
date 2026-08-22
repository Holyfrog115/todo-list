import "./styles.css";
import "./dialogForms.css";
import ProjectsData from "./projects-data.js";
import loadPage from "./load-page.js";
import loadLogic from "./load-logic.js";


class Main {
    static start() {
        const projectsData = new ProjectsData();

        // Test data
        // projectsData.createProject("Test");

        loadPage(projectsData);
        loadLogic(projectsData);
    }
}

Main.start();