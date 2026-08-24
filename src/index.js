import "./styles.css";
import "./dialogForms.css";
import ProjectsData from "./projects-data.js";
import loadPage from "./load-page.js";
import loadLogic from "./load-logic.js";


class Main {
    static start() {
        const projectsData = new ProjectsData();

        // Test data
        projectsData.createProject("General");
        projectsData.projects[0].addItem("Example 3", "Test", new Date(2026, 7, 24), 0);
        projectsData.projects[0].addItem("Example 1", "Example 1 description", new Date(), 3);
        projectsData.projects[0].addItem("Example 2", "Example 2 description", new Date(2014, 4, 14), 1);
        projectsData.projects[0].todosList[1].changeCompletionStatus();
        // End of test data

        loadPage(projectsData);
        loadLogic(projectsData);
    }
}

Main.start();