import "./styles.css";
import "./dialogForms.css";
import "./task-details.css"
import ProjectsData from "./projects-data.js";
import loadPage from "./load-page.js";
import loadLogic from "./load-logic.js";


class Main {
    static start() {
        const projectsData = new ProjectsData();

        // Test data
        projectsData.createProject("General");
        projectsData.projects[0].addItem("Water plants", "", new Date(2026, 7, 28), 2);
        projectsData.projects[0].addItem("Back up phone photos to cloud", "Clear out duplicate and blurry shots, and run a complete sync to cloud storage to free up local phone space", new Date(2026, 7, 28), 0);
        projectsData.projects[0].addItem("Go to the gym", "Don't forget to call Saul 30 minutes prior", new Date(2026, 6, 17), 2);
        projectsData.projects[0].addItem("Go to the supermarket", "Pick up weekly groceries and household supplies based on the shopping list", new Date(2026, 7, 29), 3);
        projectsData.projects[0].addItem("Prepare weekly meal prep & grocery run", "Plan out balanced dinners for Monday through Thursday, restock missing staples, and batch-cook weekday lunches to save time during the work week.", new Date(2026, 7, 30), 1);

        projectsData.createProject("Shopping List");
        projectsData.projects[1].addItem("Weekly Grocery Restock", "Buy weekly food essentials, fresh ingredients, and pantry staples needed for upcoming home-cooked meals.", new Date(2026, 7, 29), 3);
        projectsData.projects[1].addItem("Household & Cleaning Supplies", "Restock essential cleaning products, paper goods, and bathroom supplies before running out of stock.", new Date(2026, 7, 29), 2);
        projectsData.projects[1].addItem("Buy cable ties", "", new Date(2026, 7, 29), 1);

        projectsData.projects[0].todosList[0].changeCompletionStatus();
        projectsData.projects[1].todosList.at(-1).changeCompletionStatus();
        // End of test data

        loadPage(projectsData);
        loadLogic(projectsData);
    }
}

Main.start();