import TodoItem from "./todo-item.js";

class TodoFolder {
    #id;
    #idItem = {};
    #isSearching;
    constructor(title) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.todosList = [];
        this.searchedTodos = [];
        this.#isSearching = false;
        this.todosAmount = 0;
        this.searchedTodosAmount = 0;
    }

    addItem(title, description, dueDate, priority) {
        const item = new TodoItem(this.#id, title, description, dueDate, priority);
        this.todosList.push(item);
        this.todosAmount++;
        this.#idItem[item.id] = item;
    }

    addDetailedItem(projectsId, id, title, description, dueDate, priority, checkList, isCompleted) {
        // Adds items using all properites

        const item = new TodoItem("","","","");
        item.changeData(projectsId, id, title, description, dueDate, priority, checkList, isCompleted);
        this.todosList.push(item);
        this.todosAmount++;
        this.#idItem[item.id] = item;
    }

    deleteItem(id) {
        for (let i = 0; i < this.todosAmount; i++) {
            if (this.todosList[i].id == id) {
                this.todosList.splice(i, 1);
                this.todosAmount--;
                break;
            }
        }
    }

    get id() {
        return this.#id;
    }

    getItem(id) {
        return this.#idItem[id];
    }

    emptyTodoList() {
        this.todosList = [];
        this.todosAmount = 0;
        this.#idItem = {};
    }

    sortByDueDate() {
        this.todosList.sort((a, b) => b.dueDate - a.dueDate);
    }

    sortByName() {
        this.todosList.sort((a, b) => {
            if (a.title.toUpperCase() < b.title.toUpperCase()) {
                return -1;
            }
            if (a.title.toUpperCase() > b.title.toUpperCase()) {
                return 1;
            }

            return 0;
        });
    }

    sortByPriority() {
        this.todosList.sort((a, b) => b.priority - a.priority);
    }

    sortByProject(projectsData) {
        this.todosList.sort((a, b) => {
            const aProjectTitle = projectsData.getProject(a.projectId).title;
            const bProjectTitle = projectsData.getProject(b.projectId).title;

            if (aProjectTitle.toUpperCase() < bProjectTitle.toUpperCase()) {
                return -1;
            }
            if (aProjectTitle.toUpperCase() > bProjectTitle.toUpperCase()) {
                return 1;
            }

            return 0;
        });
    }

    get isSearching() {
        return this.#isSearching;
    }

    searchTodos(search) {
        this.searchingTodos = this.todosList.filter(item => item.title.toLowerCase().includes(search));
        this.searchedTodosAmount = this.searchingTodos.length;
    }    

    startSearch(search) {
        this.#isSearching = true;
        this.searchTodos(search);
    }

    stopSearching() {
        this.#isSearching = false;
    }
}

export default TodoFolder;