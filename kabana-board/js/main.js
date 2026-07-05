"use strict";

/**
 * KANBAN BOARD – Main Application Script
 *
 * Features:
 *  - Persistent data model using localStorage (3 columns: todo, inprogress, done)
 *  - Add tasks via modal dialog with column selection
 *  - Drag & drop to reorder within columns and move between columns
 *  - Jira‑style drag image (clone follows cursor)
 *  - Full event delegation and custom rendering
 *  - Frosted glass modal with smooth animations (CSS)
 */

/* ============================================================
 * 1. DOM ELEMENT REFERENCES
 * ============================================================ */
const addTaskBtn = document.querySelector("#add-task-btn");
const modalOverlay = document.querySelector("#modalOverlay");
const closeModalBtn = document.querySelector("#closeModalBtn");
const taskInput = document.querySelector("#task-model-input");
const taskSelect = document.querySelector("#task-model-option");
const createBtn = document.querySelector("#create");


/* ============================================================
 * 2. DATA PERSISTENCE (localStorage)
 * ============================================================ */
function getKanban() {
  const raw = localStorage.getItem("kanban-data");
  if (raw) {
    return JSON.parse(raw);
  }

  const defaultData = {
    todo: [
      { id: 1, task: "Learn Git", createdAt: new Date().toISOString() },
      { id: 2, task: "Learn Node", createdAt: new Date().toISOString() }
    ],
    inprogress: [],
    done: [
      { id: 3, task: "Setup project", createdAt: new Date().toISOString() }
    ]
  };
  saveKanban(defaultData);
  return defaultData;
}

function saveKanban(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}

function getNextId(data) {
  let maxId = 0;
  for (const tasks of Object.values(data)) {
    for (const task of tasks) {
      if (task.id > maxId) maxId = task.id;
    }
  }
  return maxId + 1;
}


/* ============================================================
 * 3. BOARD RENDERING
 * ============================================================ */
function renderBoard() {
  const data = getKanban();
  document.querySelectorAll(".task-list").forEach(ul => (ul.innerHTML = ""));

  for (const [colName, tasks] of Object.entries(data)) {
    const ul = document.querySelector(`ul[data-column="${colName}"]`);
    if (!ul) continue;

    const fragment = document.createDocumentFragment();
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.task;
      li.classList.add("task-item");
      li.dataset.id = task.id;
      li.draggable = true;

      // Task text
      const span = document.createElement("span");
      span.textContent = task.task

      // Delete button (hidden by default, shown on hover)
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "delete-btn";
      delBtn.textContent = "×";
      delBtn.setAttribute("aria-label", "Delete task");

      li.appendChild(span);
      li.appendChild(delBtn);
      fragment.appendChild(li);
    });

    ul.appendChild(fragment);
  }

  setupDragAndDrop();
}


/* ============================================================
 * 4. DRAG & DROP (Jira‑style + full column drop zones)
 * ============================================================ */

/**
 * Called after every render to attach fresh listeners to the
 * .column sections (the entire column is a drop zone).
 */
function setupDragAndDrop() {
  const columns = document.querySelectorAll(".column");

  // Drag start – delegated on the document
  document.removeEventListener("dragstart", handleDragStart);
  document.addEventListener("dragstart", handleDragStart);

  // Each column section acts as a drop zone
  columns.forEach(col => {
    col.removeEventListener("dragover", handleDragOver);
    col.removeEventListener("dragleave", handleDragLeave);
    col.removeEventListener("drop", handleDrop);
    col.addEventListener("dragover", handleDragOver);
    col.addEventListener("dragleave", handleDragLeave);
    col.addEventListener("drop", handleDrop);
  });

  // Global drag end cleanup
  document.removeEventListener("dragend", handleDragEnd);
  document.addEventListener("dragend", handleDragEnd);
}

/**
 * Start dragging: hide the original card, create a clone
 * that follows the cursor as the drag image.
 */
function handleDragStart(e) {
  const taskItem = e.target.closest("li.task-item");
  if (!taskItem) return;

  e.dataTransfer.setData("text/plain", taskItem.dataset.id);
  e.dataTransfer.effectAllowed = "move";

  // Hide the original card
  taskItem.classList.add("dragging");

  // Create a live clone to use as the drag image (Jira‑style)
  const clone = taskItem.cloneNode(true);
  clone.classList.add("drag-clone");
  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);

  // Set the clone as the drag image, centered under the cursor
  e.dataTransfer.setDragImage(clone, clone.offsetWidth / 2, clone.offsetHeight / 2);

  // Remove the clone from the DOM after the image is captured
  setTimeout(() => {
    if (clone.parentNode) clone.remove();
  }, 0);
}

/**
 * Allow dropping by preventing default.
 * Highlight the column the cursor is over.
 */
function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";

  document.querySelectorAll(".column").forEach(col =>
    col.classList.remove("drag-over")
  );
  e.currentTarget.classList.add("drag-over");
}

/**
 * Remove the highlight when the cursor leaves the column.
 */
function handleDragLeave(e) {
  const col = e.currentTarget;
  if (!col.contains(e.relatedTarget)) {
    col.classList.remove("drag-over");
  }
}

/**
 * Perform the move/reorder logic.
 */
function handleDrop(e) {
  e.preventDefault();
  const colSection = e.currentTarget;   // the <section> we dropped on
  colSection.classList.remove("drag-over");

  const draggedId = Number(e.dataTransfer.getData("text/plain"));
  if (!draggedId) return;

  const targetColumn = colSection.dataset.column;
  const data = getKanban();

  // Find source column and task
  let sourceColumn = null;
  let draggedTaskIndex = -1;
  let draggedTask = null;

  for (const [col, tasks] of Object.entries(data)) {
    const idx = tasks.findIndex(t => t.id === draggedId);
    if (idx !== -1) {
      sourceColumn = col;
      draggedTaskIndex = idx;
      draggedTask = tasks[idx];
      break;
    }
  }
  if (!draggedTask) return;

  // Determine drop position
  const dropTargetLi = e.target.closest("li.task-item");
  let targetIndex = data[targetColumn].length;   // default: end of list

  if (dropTargetLi) {
    const targetId = Number(dropTargetLi.dataset.id);
    if (targetId === draggedId) return;          // dropped on itself

    const idx = data[targetColumn].findIndex(t => t.id === targetId);
    if (idx !== -1) targetIndex = idx;
  }

  // Remove any leftover dragging class before data changes
  document.querySelectorAll(".task-item.dragging").forEach(li =>
    li.classList.remove("dragging")
  );

  // Apply the move/reorder
  if (sourceColumn === targetColumn) {
    const tasks = data[targetColumn];
    tasks.splice(draggedTaskIndex, 1);
    if (draggedTaskIndex < targetIndex) targetIndex--;
    tasks.splice(targetIndex, 0, draggedTask);
  } else {
    data[sourceColumn].splice(draggedTaskIndex, 1);
    data[targetColumn].splice(targetIndex, 0, draggedTask);
  }

  saveKanban(data);
  renderBoard();

  // Animate the newly placed card
  const movedLi = document.querySelector(`li[data-id="${draggedId}"]`);
  if (movedLi) {
    movedLi.classList.add("drop-flash");
    movedLi.addEventListener("animationend", () => {
      movedLi.classList.remove("drop-flash");
    }, { once: true });
  }
}

/**
 * Global drag end – ensure all highlights and hidden cards are reset.
 */
function handleDragEnd() {
  document.querySelectorAll(".task-item.dragging").forEach(li =>
    li.classList.remove("dragging")
  );
  document.querySelectorAll(".column").forEach(col =>
    col.classList.remove("drag-over")
  );
}


/* ============================================================
 * 5. MODAL DIALOG (Add Task)
 * ============================================================ */
function openModal() {
  taskInput.value = "";
  taskInput.classList.remove("error");
  modalOverlay.classList.add("show");
  taskInput.focus();
  document.addEventListener("keydown", escHandler);
}

function closeModal() {
  modalOverlay.classList.remove("show");
  document.removeEventListener("keydown", escHandler);
  addTaskBtn.focus();
}

function escHandler(e) {
  if (e.key === "Escape") closeModal();
}

function addTaskFromModal() {
  const text = taskInput.value.trim();
  if (text === "") {
    taskInput.classList.add("error");
    taskInput.placeholder = "Please enter a task!";
    return;
  }

  const column = taskSelect.value;
  const data = getKanban();
  const newTask = {
    id: getNextId(data),
    task: text,
    createdAt: new Date().toISOString()
  };

  data[column].push(newTask);
  saveKanban(data);
  closeModal();
  renderBoard();
}


/* ============================================================
 * 6. EVENT LISTENERS (Modal & UI)
 * ============================================================ */
addTaskBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
createBtn.addEventListener("click", addTaskFromModal);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskFromModal();
  }
});
taskInput.addEventListener("input", () => {
  taskInput.classList.remove("error");
  taskInput.placeholder = "Task title...";
});



/* ============================================================
 * 7. INITIAL RENDER
 * ============================================================ */
renderBoard();