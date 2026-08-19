class CheckListItem {
    #isCompleted;

    constructor(title) {
        this.title = title;
        this.#isCompleted = false;
    }

    changeCompletionStatus() {
        this.#isCompleted = !this.#isCompleted;
    }

    get isCompleted() {
        return this.#isCompleted;
    }
}


class todoItem {
    #isCompleted;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = [];
        this.#isCompleted = false;
    }

    changeCompletionStatus() {
        this.#isCompleted = !this.#isCompleted;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    addCheckListItem(checkListItem) {
        this.checkList.push(checkListItem);
    }

    deleteCheckListItem(id) {
        this.checkList.splice(id, 1);
    }
} 


export default todoItem;