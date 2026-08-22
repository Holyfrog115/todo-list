import TodoItem from "./todo-item.js";

class TodoFolder {
    #id;
    constructor(title) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.pendingTodos = [];
        this.completedTodos = [];
        this.todosAmount = 0;
    }

    addItem(title, description, dueDate, priority) {
        const item = new TodoItem(title, description, dueDate, priority);
        this.pendingTodos.push(item);
        this.todosAmount++;
    }

    deleteItem(id) {
        // ...
    }

    get id() {
        return this.#id;
    }
}

export default TodoFolder;