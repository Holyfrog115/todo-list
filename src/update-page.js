function addNewProject(project, hidden) {
    const ul = document.querySelector("#projects-list");

    const listItem = document.createElement("li");
    listItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z"/></svg>`;
    
    const folderName = document.createElement("div");
    folderName.textContent = project.title;
    folderName.classList.add("folder-name");

    const tasksCounter = document.createElement("div");
    tasksCounter.textContent = project.todosAmount;
    tasksCounter.classList.add("tasks-counter");

    if (hidden) {
        listItem.classList.add("hidden-project");
    }

    listItem.append(folderName, tasksCounter);
    listItem.dataset.id = project.id;
    ul.appendChild(listItem);
}

function removeProject(project) {
    const projects = document.querySelectorAll("#projects-tree li");

    projects.forEach(item => {
        if (item.dataset.id == project.id) {
            item.remove();
            return;
        }
    });
}


function updateSidebarCounters(projectsData) {
    const inboxCounter = document.querySelector("#inbox-tasks-counter");
    inboxCounter.textContent = projectsData.inbox.todosAmount;

    const todayCounter = document.querySelector("#today-tasks-counter");
    todayCounter.textContent = projectsData.today.todosAmount;


    const tasksCounters = document.querySelectorAll(".tasks-counter");
    tasksCounters.forEach(counter => {
        const projectId = counter.parentElement.dataset.id;
        counter.textContent = projectsData.getProject(projectId).todosAmount;
    });
}


function updateSidebarTitles(projectsData) {
    const projectsTitles = document.querySelectorAll("#projects-tree .folder-name");

    projectsTitles.forEach(projectTitle => {
        const title = projectsData.getProject(projectTitle.parentElement.dataset.id).title;
        projectTitle.textContent = title;
    });
}


function deleteItem(projectsData, id) {
    const tasks = document.querySelectorAll(".tasks-block li");

    for (const task of tasks) {
        if (task.dataset.id == id) {
            task.remove();
            const tasksCounter = document.querySelector("#active-items");
            tasksCounter.textContent = `Showing ${projectsData.selectedProject.todosAmount} active items`
            break;
        }
    }
}


export { addNewProject, updateSidebarCounters, removeProject, deleteItem, updateSidebarTitles };