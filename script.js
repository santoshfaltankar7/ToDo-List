let inpEle = document.getElementById("inp");
let btnEle = document.getElementById("btn");
let dataDiv = document.getElementById("addTask");

// Filter dropdown
let filterSelect = document.getElementById("filterSelect");

document.addEventListener("DOMContentLoaded", loadTasks);

btnEle.addEventListener("click", add);
filterSelect.addEventListener("change", () => filterTasks(filterSelect.value));

function add() {
    if (inpEle.value.trim() === "") {
        alert("Firstly Enter the Task");
    } else {
        const task = { text: inpEle.value.trim(), completed: false };
        addData(task);
        saveData(task);
        inpEle.value = "";
    }
}

function addData(task) {
    const list = document.createElement("li");
    list.className = "list-group-item d-flex justify-content-between align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function () {
        task.completed = this.checked;
        updateTasks(task.text, task.completed);
        list.classList.toggle("text-decoration-line-through", this.checked);
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-edit";
    editIcon.style.cursor = "pointer";
    editIcon.addEventListener("click", function () {
        const newText = prompt("Edit task:", task.text);
        if (newText) {
            task.text = newText;
            taskText.textContent = newText;
            updateTasks(task.text, task.completed);
        }
    });

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-regular fa-trash-can";
    deleteIcon.style.cursor = "pointer";
    deleteIcon.addEventListener("click", function () {
        removeData(list);
        removeTask(task.text);
    });

    list.appendChild(checkbox);
    list.appendChild(taskText);
    list.appendChild(editIcon);
    list.appendChild(deleteIcon);
    dataDiv.appendChild(list);

    if (task.completed) {
        list.classList.add("text-decoration-line-through");
    }
}

function saveData(task) {
    let tasks = getData();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getData() {
    let tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getData();
    tasks.forEach(task => {
        addData(task);
    });
}

function updateTasks(taskText, completed) {
    let tasks = getData();
    tasks = tasks.map(task => {
        if (task.text === taskText) {
            task.completed = completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeData(listItem) {
    listItem.remove();
}

function removeTask(taskToRemove) {
    let tasks = getData();
    tasks = tasks.filter(task => task.text !== taskToRemove);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
    let tasks = getData();
    dataDiv.innerHTML = ""; 

    tasks.forEach(task => {
        if (filter === "all" ||
            (filter === "complete" && task.completed) ||
            (filter === "pending" && !task.completed)) {
            addData(task);
        }
    });
}