function loadPage(projectsData) {
    // Loads whole page

    loadSidebar(projectsData)
}


function loadSidebar(projectsData) {
    // Loads sidebar

    const inbox = document.querySelector("#navigation-main li:first-of-type");
    inbox.dataset.id = projectsData.inbox.id;
    inbox.classList.add("selected-project");
    const inboxCounter = document.querySelector("#inbox-tasks-counter");
    inboxCounter.textContent = projectsData.inbox.todosAmount;

    const today = document.querySelector("#navigation-main li:last-of-type");
    today.dataset.id = projectsData.today.id;
    const todayCounter = document.querySelector("#today-tasks-counter");
    todayCounter.textContent = projectsData.today.todosAmount;


    const ul = document.querySelector("#projects-list");
    ul.replaceChildren();
    for (const project of projectsData.projects) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z"/></svg>`;
        
        const folderName = document.createElement("div");
        folderName.textContent = project.title;
        folderName.classList.add("folder-name");

        const tasksCounter = document.createElement("div");
        tasksCounter.textContent = project.todosAmount;
        tasksCounter.classList.add("tasks-counter");

        listItem.append(folderName, tasksCounter);
        listItem.dataset.id = project.id;
        ul.appendChild(listItem);
    }
}


function loadTasksSection() {
    // Loads Main content with tasks

    
}


function loadTaskDetails() {
    // Loads task's details

}


export default loadPage;