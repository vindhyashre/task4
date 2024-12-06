// Select DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load tasks from localStorage when the app starts
document.addEventListener("DOMContentLoaded", loadTasks);

// Handle form submission to add a new task
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = input.value.trim();

  if (task) {
    addTaskToDOM(task);
    saveTaskToLocalStorage(task);
    input.value = "";
  }
});

// Add a task to the DOM
function addTaskToDOM(task, isCompleted = false) {
  const li = document.createElement("li");
  li.textContent = task;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Mark as complete
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskCompletionInLocalStorage(task);
  });

  // Delete task button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeTaskFromLocalStorage(task);
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Save a task to localStorage
function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((taskObj) => addTaskToDOM(taskObj.task, taskObj.completed));
}

// Toggle task completion in localStorage
function toggleTaskCompletionInLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.map((t) =>
    t.task === task ? { ...t, completed: !t.completed } : t
  );
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Remove a task from localStorage
function removeTaskFromLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((t) => t.task !== task);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

// Get tasks from localStorage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
