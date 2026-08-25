import TodoItem from "./todo-item.js";

class TodoFolder {
    #id;
    #idItem = {};
    constructor(title) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.todosList = [];
        this.todosAmount = 0;
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
}

export default TodoFolder;