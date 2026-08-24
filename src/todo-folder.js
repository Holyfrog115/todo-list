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
        const item = new TodoItem(title, description, dueDate, priority);
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

    sortByDueDate() {
        this.todosList.sort((a, b) => b.dueDate - a.dueDate);
    }

    emptyTodoList() {
        this.todosList = [];
        this.todosAmount = 0;
        this.#idItem = {};
    }
}

export default TodoFolder;