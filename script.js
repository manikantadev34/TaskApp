// Theme Toggle
const toggleButton = document.getElementById("Themes");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}

toggleButton.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
});

// Task Management
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("button1"); // Ensure there's an Add button in HTML
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
  tasks.forEach(renderTask);
});

addButton.addEventListener("click", addTask); // Fix: Add event listener to the Add button
inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = inputBox.value.trim();
  if (!taskText) return alert("You must write something...");

  const newTask = { id: Date.now(), text: taskText, completed: false };
  tasks.push(newTask);
  saveTasks();
  renderTask(newTask);
  inputBox.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.innerHTML = `
    <span>${task.text}</span>
    <button class="icon-btn edit"><i class="fas fa-edit"></i></button>
    <button class="icon-btn delete"><i class="fas fa-trash"></i></button>
  `;

  li.querySelector(".edit").addEventListener("click", () => editTask(task, li));
  li.querySelector(".delete").addEventListener("click", () => deleteTask(task, li));
  
  listContainer.appendChild(li);
}

function editTask(task, li) {
  const span = li.querySelector("span");
  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.addEventListener("blur", () => {
    task.text = input.value;
    span.textContent = task.text;
    saveTasks();
    li.replaceChild(span, input);
  });
  li.replaceChild(input, span);
  input.focus();
}

function deleteTask(task, li) {
  tasks = tasks.filter(t => t.id !== task.id);
  li.remove();
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAll() {
  tasks = [];
  listContainer.innerHTML = "";
  saveTasks();
}
