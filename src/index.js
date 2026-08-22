import "./styles.css";
import ProjectsData from "./projects-data.js";
import loadPage from "./load-page.js";


class Main {
    static start() {
        const projectsData = new ProjectsData();

        // Test data
        projectsData.createProject("Test");

        loadPage(projectsData);
    }
}

Main.start();