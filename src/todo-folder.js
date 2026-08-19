import todoItem from "./todo-item";

class todoFolder {
    constructor(title) {
        this.title = title;
        this.pendingTodos = [];
        this.completedTodos = [];
        this.todosAmount = 0;
    }

    addItem(title, description, dueDate, priority) {
        const item = new todoItem(title, description, dueDate, priority);
        this.pendingTodos.push(item);
    }

    deleteItem(id) {
        // ...
    }
}

export default todoFolder;