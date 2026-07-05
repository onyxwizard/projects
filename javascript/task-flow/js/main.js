"use strict";

// ============================================================
// TASKFLOW – Phase 2.5 (Confirmation Modal)
// Features: add, toggle, delete (with modal), inline edit,
//            drag‑and‑drop, filter bar.
// ============================================================

// ---------- DOM Element References ----------
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const storage = localStorage;

let currentFilter = "all";

// ---------- Storage Helpers ----------
function getRawData() {
  return storage.getItem("data");
}

function getTasks() {
  const raw = getRawData();
  if (!raw) return [];
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    const oldMap = parsed;
    const tasksArray = Object.entries(oldMap).map(([id, task]) => ({
      id: Number(id),
      ...task,
    }));
    saveTasks(tasksArray);
    return tasksArray;
  }
  return parsed;
}

function saveTasks(tasks) {
  storage.setItem("data", JSON.stringify(tasks));
}

function toggleTaskCompleted(id) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
  }
}

function deleteTaskById(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}

function updateTaskText(id, newText) {
  const tasks = getTasks();
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.task = newText;
    saveTasks(tasks);
  }
}

// ---------- Validation ----------
function validateAndGetText() {
  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.placeholder = "Please enter a task!";
    taskInput.classList.add("error");
    return false;
  }
  taskInput.placeholder = "What do you need to do?";
  taskInput.classList.remove("error");
  return text;
}

// ---------- Filter Bar ----------
function createFilterBar() {
  const container = document.querySelector(".container");
  const filterDiv = document.createElement("div");
  filterDiv.id = "filter-bar";

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  filters.forEach(({ label, value }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.dataset.filter = value;
    if (value === currentFilter) btn.classList.add("active");
    filterDiv.appendChild(btn);
  });

  document.querySelector("#task-form").after(filterDiv);
}

// ---------- Rendering ----------
function renderList() {
  const tasks = getTasks();

  let filteredTasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else {
    filteredTasks = tasks;
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = "";
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.draggable = true;
    li.dataset.id = task.id;

    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.task;

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.textContent = "×";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    fragment.appendChild(li);
  });

  taskList.innerHTML = "";
  taskList.appendChild(fragment);
}

// ---------- Inline Editing (same as before) ----------
function startEditing(span) {
  const li = span.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  const currentText = span.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("edit-input");
  input.oldValue = currentText;
  input.dataset.taskId = id;

  span.replaceWith(input);
  input.focus();
  input.select();

  input.addEventListener("keydown", onEditKeydown);
  input.addEventListener("blur", onEditBlur);
}

function onEditKeydown(event) {
  const input = event.currentTarget;
  if (event.key === "Enter") {
    event.preventDefault();
    commitEdit(input);
  } else if (event.key === "Escape") {
    cancelEdit(input);
  }
}

function onEditBlur(event) {
  commitEdit(event.currentTarget);
}

function commitEdit(input) {
  const newText = input.value.trim();
  const id = Number(input.dataset.taskId);
  if (newText === "") {
    cancelEdit(input);
    return;
  }
  updateTaskText(id, newText);
  document.dispatchEvent(new CustomEvent("tasksUpdated"));
}

function cancelEdit(input) {
  const span = document.createElement("span");
  span.textContent = input.oldValue;
  input.replaceWith(span);
}

// ---------- Confirmation Modal ----------
let activeModal = null;  // track currently open modal to avoid duplicates

function showDeleteConfirmation(taskId) {
  // If a modal already exists, remove it first
  if (activeModal) closeModal();

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  // Create modal box
  const modal = document.createElement("div");
  modal.className = "modal";

  const message = document.createElement("p");
  message.textContent = "Are you sure you want to delete this task?";

  const btnNo = document.createElement("button");
  btnNo.type = "button";
  btnNo.textContent = "No, keep it";
  btnNo.className = "btn-secondary";

  const btnYes = document.createElement("button");
  btnYes.type = "button";
  btnYes.textContent = "Yes, delete";
  btnYes.className = "btn-danger";

  modal.appendChild(message);
  modal.appendChild(btnNo);
  modal.appendChild(btnYes);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  activeModal = overlay;

  // Focus the safe button (No)
  btnNo.focus();

  // Close function – removes modal and cleans up
  const closeModal = () => {
    if (activeModal) {
      document.removeEventListener("keydown", escHandler);
      activeModal.remove();
      activeModal = null;
    }
  };

  // Escape key handler
  const escHandler = (e) => {
    if (e.key === "Escape") closeModal();
  };
  document.addEventListener("keydown", escHandler);

  // Click on overlay (outside modal) closes
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // No button closes
  btnNo.addEventListener("click", closeModal);

  // Yes button deletes and closes
  btnYes.addEventListener("click", () => {
    deleteTaskById(taskId);
    closeModal();
    document.dispatchEvent(new CustomEvent("tasksUpdated"));
  });
}

function closeModal() {
  if (activeModal) {
    document.removeEventListener("keydown", escHandler); // will be cleaned by activeModal logic
    activeModal.remove();
    activeModal = null;
  }
}

// ---------- Event Listeners ----------
document.addEventListener("DOMContentLoaded", () => {
  createFilterBar();
  renderList();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = validateAndGetText();
  if (!taskText) return;

  const tasks = getTasks();
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    task: taskText,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  taskInput.value = "";
  document.dispatchEvent(new CustomEvent("tasksUpdated"));
});

taskList.addEventListener("change", (e) => {
  if (e.target.matches("input[type='checkbox']")) {
    const li = e.target.closest("li");
    if (!li) return;
    toggleTaskCompleted(Number(li.dataset.id));
    document.dispatchEvent(new CustomEvent("tasksUpdated"));
  }
});

// Delete button – now triggers modal instead of immediate delete
taskList.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button || button.textContent !== "×") return;
  const li = button.closest("li");
  if (!li) return;
  const id = Number(li.dataset.id);
  showDeleteConfirmation(id);   // <-- MODAL instead of direct delete
});

taskList.addEventListener("dblclick", (e) => {
  const span = e.target.closest("span");
  if (!span) return;
  const li = span.closest("li");
  if (!li || li.querySelector("input.edit-input")) return;
  startEditing(span);
});

taskInput.addEventListener("input", () => {
  taskInput.placeholder = "What do you need to do?";
  taskInput.classList.remove("error");
});

// Drag‑and‑Drop (unchanged)
taskList.addEventListener("dragstart", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  e.dataTransfer.setData("text/plain", li.dataset.id);
});

taskList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const li = e.target.closest("li");
  taskList.querySelectorAll("li.drag-over").forEach(el => el.classList.remove("drag-over"));
  if (li) li.classList.add("drag-over");
});

taskList.addEventListener("drop", (e) => {
  e.preventDefault();
  const draggedId = Number(e.dataTransfer.getData("text/plain"));
  const targetLi = e.target.closest("li");
  if (!targetLi || !draggedId) return;
  const draggedLi = taskList.querySelector(`li[data-id="${draggedId}"]`);
  if (!draggedLi || draggedLi === targetLi) return;

  taskList.insertBefore(draggedLi, targetLi);

  const tasks = getTasks();
  const fromIdx = tasks.findIndex(t => t.id === draggedId);
  const toIdx = tasks.findIndex(t => t.id === Number(targetLi.dataset.id));
  if (fromIdx === -1 || toIdx === -1) return;
  const [moved] = tasks.splice(fromIdx, 1);
  tasks.splice(fromIdx < toIdx ? toIdx - 1 : toIdx, 0, moved);
  saveTasks(tasks);
  document.dispatchEvent(new CustomEvent("tasksUpdated"));
});

taskList.addEventListener("dragend", () => {
  taskList.querySelectorAll("li.drag-over").forEach(el => el.classList.remove("drag-over"));
});

// Filter bar clicks
document.addEventListener("click", (e) => {
  const btn = e.target.closest("#filter-bar button");
  if (!btn) return;
  const filter = btn.dataset.filter;
  if (!filter || filter === currentFilter) return;
  document.querySelectorAll("#filter-bar button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = filter;
  document.dispatchEvent(new CustomEvent("tasksUpdated"));
});

document.addEventListener("tasksUpdated", renderList);