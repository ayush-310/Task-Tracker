const taskName = document.getElementById("taskName");
const addButton = document.querySelector("button");
const tasksContainer = document.querySelector(".tasks");

let tasks = [];

function renderTasks() {
    // Clear existing tasks before re-rendering
    tasksContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("div");
        taskItem.className = "task-item";

        taskItem.innerHTML = `
        <input type="checkbox" class="checkbox" ${task.status === "completed" ? "checked" : ""}>
        <p class="task-text">${task.text}</p>
         <img class="delete" src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="delete">`;

        // Checkbox status change
        const checkbox = taskItem.querySelector(".checkbox");
        const taskText = taskItem.querySelector(".task-text");
        taskText.style.textDecoration = task.status === "completed" ? "line-through" : "none";
        checkbox.addEventListener("change", () => {
            tasks[index].status = checkbox.checked ? "completed" : "pending";
            renderTasks();
        });

        // Delete button
        const deleteButton = taskItem.querySelector(".delete");
        deleteButton.addEventListener("click", () => {
            /* The line `tasks.splice(index, 1);` is removing an element from the `tasks` array at the
            specified `index`. */
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                renderTasks();
            }
        });

        tasksContainer.appendChild(taskItem);
    });
}

function checkIfHasOnlyWhitespace(text) {

    if (text.trim() === "" || text.length <= 3 || text.length > 50) {
        alert("Please enter a valid task.");
        return true;
    }
    return false;
}

function createTaskElement() {
    const taskText = taskName.value.trim();

    if (taskText && !checkIfHasOnlyWhitespace(taskText)) {
        tasks.push({ text: taskText, status: "pending" });
        renderTasks();
        taskName.value = "";
    }
}

addButton.addEventListener("click", createTaskElement);
