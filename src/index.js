import "./styles.css";
import "./dialogForms.css";
import ProjectsData from "./projects-data.js";
import loadPage from "./load-page.js";
import loadLogic from "./load-logic.js";


class Main {
    static start() {
        const projectsData = new ProjectsData();

        // Test data
        projectsData.createProject("Test");
        projectsData.projects[0].addItem("Example 3", "Test", new Date(2026, 7, 24), 0);

        projectsData.selectedProject.addItem("Example 1", "Example 1 description", new Date(), 3);
        projectsData.selectedProject.addItem("Example 2", "Example 2 description", new Date(2014, 4, 14), 1);
        // projectsData.selectedProject.todosList[1].changeCompletionStatus();
        // End of test data

        loadPage(projectsData);
        loadLogic(projectsData);
    }
}

Main.start();