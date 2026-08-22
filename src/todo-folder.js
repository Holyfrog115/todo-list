import TodoItem from "./todo-item.js";

class TodoFolder {
    constructor(title) {
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
}

export default TodoFolder;