const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

// const api_key = `AIzaSyDjs1lWZ90EouKbmoGQbgWI1CC6P3DTXqQ`;

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        console.log("no task added");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
    <div class="taskForm">
        <label>
        <input type="checkbox">
        <span>${task}</span>
        </label>
        
        <div class="actionClick">
            <span class="edit-btn">Edit</span>
            <span class="delete-btn">Delete</span>
        </div>

    </div>
    `;

    listContainer.appendChild(li);

    // clear the input field
    inputBox.value = " ";

    // attach event listeners to the new task
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    // strike out the completed task
    checkbox.addEventListener("click", () => {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editBtn.addEventListener("click", () => {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });
    updateCounters();
}

// add task when pressing Enter key
inputBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});