// Inheritance
class Task {
    constructor(id, title, date) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = ""; // Initialize description as an empty string
    }

    addDescription(description) {
        this.description = description;
    }
}

class SpecialTask extends Task {
    constructor(id, title, date, priority) {
        super(id, title, date);
        this.priority = priority;
    }
}

// Use these classes to structure the todoList.
const todoList = [
    new Task(1, "I finished the javascript, congratulations to me", new Date().toDateString()),
    new SpecialTask(2, "The Node.js language is my game", new Date().toDateString(), "Medium")
];

function displayTodoList() {
    console.log("Current Todo List:");
    for (let count = 0; count < todoList.length; count++) {
        const task = todoList[count];
        console.log(`ID: ${task.id}, Title: ${task.title}, Date: ${task.date}, Description: ${task.description}`);
        if (task instanceof SpecialTask) {
            console.log(`Priority: ${task.priority}`);
        }
    }
}

// Shallow and Deep Copy
// console.log(typeof copy_todolist); object
// const copy_todolist = [...todoList];
const copy_todolist = JSON.parse(JSON.stringify(todoList));
copy_todolist[1].title = "The First task in js";

function addTodoItem(title, callback) {
    // new to-do item
    const new_id = todoList.length + 1;
    const date = new Date().toDateString();
    const new_item = new Task(new_id, title, date);
    todoList.push(new_item);
    displayTodoList();
    // console.log(`Added new task: ${title}`);
    if (callback) {
        callback(new_item);
    }
}

function call_back(task) {
    console.log(`Added new task with id: ${task.id}, title: ${task.title}, date: ${task.date}`);
}

//addTodoItem("learn nodejs", call_back); // call function
// console.log(typeof setTimeout)

function saveToServer(todoList) {
    return new Promise(function(accept, reject) {
        // is to do empty ===0 --> reject
        if (todoList.length === 0) {
            reject("empty");
        }
        // else accept
        else {
            function save_todolist() {
                accept("accept save");
            }
        }
        // saving the todoList with a delay using Time delay method.
        setTimeout(save_todolist, 3000); // 3sec
    });
}

async function S_To_Do_List(todoList) {
    // saving 
    console.log("save todo list");
    try {
        // call saveToServer(todoList) 
        const result = await saveToServer(todoList);
        console.log(result);
    } catch (error) {
        console.error("Error save", error);
    }
}

// Auto-Delete Last Item --> pop
// console.log(typeof setInterval)
function delete_last_item() {
    if (todoList.length > 0) {
        // delete the last item
        const delete_item = todoList.pop();
        console.log(`The item was automatically deleted: ID ${delete_item.id}, Title: ${delete_item.title}, Date: ${delete_item.date}`);
    } else {
        console.log("The list is empty");
    }
}

setInterval(delete_last_item, 30000);

// Add Description Attribute
function addDescriptions(todoList) {
    for (let i = 0; i < todoList.length; i++) {
        todoList[i].addDescription(`Description ${i + 1}`);
    }
    displayTodoList();
}

addDescriptions(todoList);
