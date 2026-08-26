class CheckListItem {
    #isCompleted;
    #id;

    constructor(title) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.#isCompleted = false;
    }

    changeCompletionStatus() {
        this.#isCompleted = !this.#isCompleted;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    get id() {
        return this.#id;
    }
}


class TodoItem {
    #isCompleted;
    #id;
    #projcetId;
    #completedCheckListItems;
    #idCheckList = {};

    constructor(projectId, title, description, dueDate, priority) {
        this.#id = crypto.randomUUID();
        this.#projcetId = projectId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = [];
        this.#completedCheckListItems = 0;
        this.#isCompleted = false;
    }

    changeCompletionStatus() {
        this.#isCompleted = !this.#isCompleted;
    }

    get isCompleted() {
        return this.#isCompleted;
    }

    addCheckListItem(title) {
        const checkListItem = new CheckListItem(title);
        this.checkList.push(checkListItem);
        this.#idCheckList[checkListItem.id] = checkListItem;
    }

    deleteCheckListItem(id) {
        this.checkList.splice(id, 1);
    }

    get id() {
        return this.#id;
    }

    changeData(projectId, id, title, description, dueDate, priority, checkList, isCompleted) {
        this.#projcetId = projectId;
        this.#id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkList = checkList;
        this.#isCompleted = isCompleted;
    }

    get projectId() {
        return this.#projcetId;
    }

    get completedCheckListItems() {
        return this.#completedCheckListItems;
    }

    changeCheckListItemCompletion(id) {
        this.#idCheckList[id].changeCompletionStatus();

        if (this.#idCheckList[id].isCompleted) {
            this.#completedCheckListItems++;
        }
        else {
            this.#completedCheckListItems--;
        }
    }
} 


export default TodoItem;